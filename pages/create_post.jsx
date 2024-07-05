import {Source_Code_Pro} from "next/font/google";
import LabelsBtn from "@/components/LabelsPostForm"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import { createPost } from "./api";
import { toast } from "sonner";

const sourcecodepro = Source_Code_Pro({subsets: ["latin"]})

export default function NewPost(){
    const token = useAuth();

    const [postImg, setImg] = useState("")
    const defaultImg= "https://picsum.photos/600/300"

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
        document.title = "New Post-Dev Community";
    }, []);

    function handleImageChange(event) {
        setImg(event.target.value);
    };

    async function onSubmit(data){
        
        if(!data.image){
            data.image = defaultImg
        }

        try {
            if(!token){
                throw new Error("Not logged in. Please log in first.");
            }
            console.log("token:", token);
            const newPost = await createPost({
                image: data.image,
                title: data.title,
                body: data.body,
            })
            console.log('Post created:', newPost)
            reset();
            setImg("");
            toast.success("Post created successfully");
        } catch (error) {
            setError("formError",{message: error.message})
            toast.error("An error occurred. Please try again.");
        }
    }

    return(
        <main className="w-full h-dvh flex flex-col bg-gray-100 ">
            <nav className="w-full h-10 grid grid-cols-6 bg-gray-100 m-2">
                <div className="col-span-2 flex flex-row justify-center items-center gap-5">
                    <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt="" 
                    className="h-9"/>
                    <h1 className="font-semibold"> Create post</h1>
                </div>
                <div className="col-span-2 flex flex-row justify-end items-center gap-1 ">
                    <label className = "font-semibold hover:rounded-md hover:text-blue-600 hover:bg-[#dadff0] hover:cursor-pointer p-2" htmlFor="">Edit</label>
                    <label className = " hover:rounded-md hover:text-blue-600 hover:bg-[#dadff0] hover:cursor-pointer p-2" htmlFor="">Preview</label>
                </div>
                <div className="col-span-2 flex flex-row justify-end items-center mr-5">
                    <button className="items-center hover:rounded-md hover:text-blue-600 hover:bg-[#dadff0] hover:cursor-pointer px-2 py-1" >✕</button>
                </div>
            </nav>
            {
                errors.title && (
                    <span className="bg-red-100 w-full max-w-screen-sm justify-center rounded-md p-2">
                        <p className="text-red-700 font-bold text-xl">Whoops, something went wrong:</p>
                        <p className="text-black text-xs">{errors.title.message}</p>
                    </span>
                )
            }
            {
                errors.body && (
                    <span className="bg-red-100 w-full max-w-screen-sm justify-center rounded-md p-2">
                        <p className="text-red-700 font-bold text-xl">Whoops, something went wrong:</p>
                        <p className="text-black text-xs">{errors.body.message}</p>
                    </span>
                )
            }
            <section className="grid grid-cols-6" >
                <form 
                className="col-span-3 col-start-2 "
                onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white border border-gray-200 rounded-md mt-1">
                        <div className="p-10 flex flex-col justify-center">
                            <img src={postImg || defaultImg} alt="Picture"
                            className="w-[600] h-[300]" />
                            <input 
                            type="text" 
                            name="image"
                            className="w-[600] h-[300]"
                            {...register("image")}
                            value={postImg}
                            onChange={handleImageChange}
                            placeholder="Url picture..."
                            />
                            <textarea 
                            rows="2"
                            name="title"
                            placeholder="New post title here..."
                            className="font-bold text-4xl w-full border-none resize-none focus:outline-none"
                            {...register("title", {
                                required: {value: true, message: "title: can't be blank"}})}/>
                        </div>
                        <div className="w-full h-full bg-gray-100 pl-10"> 
                            <LabelsBtn/>
                        </div>
                        <section className="p-10">
                            <textarea 
                                rows="2"
                                name="body"
                                placeholder="Write yor post content here..."
                                className= {`text-base w-full border-none resize-none focus:outline-none ${sourcecodepro.className}`}
                                {...register("body", {
                                    required: {value: true, message: "content: can't be blank"}})}
                            />
                        </section>
                    </div>

                    <button type="submit"
                    className=" mt-5 w-28 bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700">Publish</button>
                    
                </form>
            </section>
        </main>

    )
}