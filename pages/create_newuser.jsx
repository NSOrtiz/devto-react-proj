import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createUser } from "./api";

export default function FormCreateAcount(){
    const [profileImg, setProfileImg] = useState("");
    const defaultImg = "https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"

    const {
        handleSubmit,
        register,
        formState: {errors},
        setError,
        reset,
        setValue,
        clearErrors,
    } = useForm();

    useEffect(()=>{
        document.title = "Welcome!-Dev Community";
    }, []);

    function handleImageChange(event) {
        setProfileImg(event.target.value);
    };

    function handleEmail(event){
        setValue("email", event.target.value.toLowerCase());
        clearErrors("email")
    }

    async function onSubmit(data){
        if (data.pass !== data.password){
        setError("pass",{
            type: "manual", 
            message: "Passwords don't match",
        });
        return; 
        } 

        try{
            const newUser = await createUser({ 
                profilePic: data.profilePic,
                name: data.name,
                username: data.username,
                email : data.email,
                password : data.password

            });
            console.log('User created successfully:', newUser)
            reset();
            setProfileImg("");
            toast.success("User created successfully");
        } catch (error){
            console.error("Error received:", error);
            if(error.message === 'Email already in use'){

                setError("email", {message: 'Email already in use'})
                toast.error("Email already in use");
                return;
            }
            else{
                setError("formError",{message: error.message})
                toast.error("An error occurred. Please try again."); 
            }
        }
    };

    return(
        <main className="w-full h-dvh flex flex-col items-center">
            <form  
            className="flex flex-col w-full max-w-screen-sm border border-gray-200 rounded-md mt-[3rem] p-10"
            onSubmit={handleSubmit(onSubmit)}> 
                <h1 className="font-[700] text-lg">Create your account</h1>
                <label className="mt-5 font-semibold">Profile image</label>
                <div className=" flex flex-row items-center gap-1 p-1 rounded-md border-[1px] border-gray-300  focus:outline-none" >
                    <img src={profileImg || defaultImg} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full"/>
                    <input 
                    type="text" 
                    name="profilePic"
                    className="focus:outline-none"
                    {...register("profilePic")}
                    value={profileImg}
                    onChange={handleImageChange}/>
                </div>

                <div className="mb-2 mt-2 flex flex-row items-center gap-1">
                    <label className="font-semibold">Name </label>
                    <p className="font-semibold text-red-600">*</p>
                </div>
                    <input  
                    type="text"
                    name="name"
                    className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]" 
                    {...register("name", {
                        required: {value: true, message: "Field required"}})}/>
                {errors.name && (
                    <p className="text-red-500 mt-1">{errors.name.message} </p>
                )}

                <div className="mb-2 mt-2 flex flex-row items-center gap-1">
                    <label className="font-semibold">User name </label>
                    <p className="font-semibold text-red-600">*</p>
                </div>
                <input 
                type="text" 
                name="username"
                className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]"
                {...register("username", {
                    required: {value: true, message: "Field required"}})}/>
                {errors.username && (
                    <p className="text-red-500 mt-1">{errors.username.message} </p>
                )}

                <div className="mb-2 mt-2 flex flex-row items-center gap-1">
                    <label className="font-semibold">Email </label>
                    <p className="font-semibold text-red-600">*</p>
                </div>
                <input 
                type="email" 
                name="email"
                className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]"
                {...register("email", {
                    required: {value: true, message: "Field required"},
                    pattern: {value: /^\S+@\S+$/i, message: " Invalid email"}
                })}
                onChange={handleEmail}/>
                {errors.email && (
                    <p className="text-red-500 mt-1">{errors.email.message}</p>
                )}
                
                <div className="mb-2 mt-2 flex flex-row items-center gap-1">
                    <label className="font-semibold">Password </label>
                    <p className="font-semibold text-red-600">*</p>
                </div>
                <input 
                type="password"
                name="password" 
                className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]"
                {...register("password", {
                    required: { value: true, message: "Field required"}
                })}/>
                {errors.password && (
                    <p className="text-red-500 mt-1">{errors.password.message}</p>
                )}

                <div className="mb-2 mt-2 flex flex-row items-center gap-1">
                    <label className="font-semibold">Password Confirmation </label>
                    <p className="font-semibold text-red-600">*</p>
                </div>
                <input 
                type="password"
                name="pass"
                className=" p-1 rounded-md border-[1px] border-gray-300 hover:border-gray-400 focus:outline-none focus:border-blue-600 focus:border-[2px]"
                {...register("pass", {
                    required: { value: true, message: "Field required"}
                })}/>
                {errors.pass && (
                    <p className="text-red-500 mt-1">{errors.pass.message}</p>
                )}
                {errors.formError && (
                    <p className="text-red-500 mt-1">{errors.formError.message}</p>
                )}

                <button 
                type="submit"
                className=" mt-5 w-28 bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700">Sing up</button>
            </form>
        </main>
    )
}