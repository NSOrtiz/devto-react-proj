import { useForm } from "react-hook-form";
import { login } from "./api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SocialBtns } from "@/components/LogBtnSocial";
import { LogHeader, LogFooter } from "@/components/LogHeaderFooter";

export default function FormLoginPage(){
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: {errors},
        setError,
        reset,
        setValue,
    } = useForm();

    async function onSubmit(data){
        try{
            const token = await login({email: data.email, password: data.password});
            if(token){
                window.localStorage.setItem("token", token);
                toast.success("Login successful");
                localStorage.setItem("token", token);
                reset();
                router.push("/create_post");
            } else {
                toast.error("Incorrect user or password");
                setError("root.credentials", {
                    type: "manual",
                    message: "Invalid credentials",
            });
            } 
        } catch (error){
            reset();
            toast.error("Failed to login");
            setError("root.credentials", {
                type: "manual",
                message: "Invalid credentials",
            });
            console.error("[login error]", error);
        }
    }

    useEffect(()=>{
        document.title = "Welcome!-Dev Community";
    }, []);

    function handleCreateAccount(){
        router.push("/")
    }

    function handleEmail(event){
        setValue("email", event.target.value.toLowerCase());
    }

    return(
        <main className="flex flex-col items-center m-5 bg-white"> 
            {errors.root?.credentials && (
                <div className="text-red-700 bg-red-100 w-full max-w-screen-sm justify-center mb-5 p-2"> 
                    <h2 className="font-semibold">Unable to login.</h2>
                    <p> If you haven't created an account, we recommend signing up with social authentication below. If you haven't received your confirmation email yet, click here to resend it.
                    Contact us if you continue having trouble.
                    </p>
                </div>
            )}  
            <LogHeader/>
            <SocialBtns/>
            <div className="flex flex-row w-full justify-center m-6 max-w-screen-sm ">
                <div className="flex-grow border-b border-gray-300 h-3"></div>
                <p className="mx-3 h-6 font-thin text-sm">OR</p>
                <div className="flex-grow border-b border-gray-300 h-3"></div>
            </div>
            <form 
            className="w-full max-w-screen-sm"
            onSubmit={handleSubmit(onSubmit)}>
                <div
                className="flex flex-col">
                    <label className="mb-2 font-semibold text-md">Email</label>
                    <input 
                    {...register("email", {
                        required: { value: true, message: "Field required"},
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    type="text"
                    name="email" 
                    className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]"
                    required
                    onChange={handleEmail}/>
                    {errors.email && (
                        <p className="text-red-500 mt-1">{errors.email.message}</p>
                    )}

                    <label className="mb-2 mt-6 font-semibold text-md">Password</label>
                    <input 
                    {...register("password", {
                        required: { value: true, message: "Field required"}
                    })}
                    type="password"
                    name="password"
                    className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]"/>
                    {errors.password && (
                        <p className="text-red-500 mt-1">{errors.password.message}</p>
                    )}
                </div>
                <section className="mt-3 flex flex-row justify-between" >
                    <div
                    className="">
                        <input
                        className=" h-4 w-4 border-[1px] border-gray-300 rounded m-1 cursor-pointer" 
                        type="checkbox" />
                        <label htmlFor=""> Remember me </label>
                    </div>
                    <p className="text-blue-600 cursor-pointer">Forgot password?</p>
                </section>
                <button 
                className=" mt-5 w-full max-w-screen-sm bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700">Log in</button>
            </form>
            <LogFooter/>
            <div className="flex flex-row mt-5 gap-2">
                <span>New to DEV Community?</span>
                <span onClick={handleCreateAccount} className="text-blue-600 cursor-pointer">Create account</span>
            </div>
        </main>
    )
}