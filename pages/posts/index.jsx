import { useEffect, useState } from "react";
import { getAllPost } from "../api";
import { toast } from "sonner";
import Tags from "@/components/Tags";
import Reactions from "@/components/Reactions";


export default function AllPosts(){
    const [posts, setPosts]=useState([]);
    useEffect(()=>{
        getAllPost()
        .then((props)=>{
            setPosts(props);
        })
        .catch((error)=>{
            toast.error("error to get posts");
            console.error("[ getAllPost error ]", error);
        })
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };
    return(
        <main className="flex justify-center flex-col max-w-screen-sm">
            <div className="flex flex-row gap-2 text-lg ml-5 mb-2">
                <label className="font-bold rounded-md hover:bg-white hover:text-blue-600 p-2">Relevant</label>
                <label className="text-gray-700 rounded-md hover:bg-white hover:text-blue-600 p-2">Latest</label>
                <label className="text-gray-700 rounded-md hover:bg-white hover:text-blue-600 p-2">Top</label>
            </div>
            <section className="w-full flex flex-col-reverse justify-center items-center gap-2" >
                {posts.map((item, idx)=>{
                        return(
                            <article key={`data-${idx}`} className="w-full max-w-[600px] flex flex-col justify-center bg-white border border-gray-200 rounded-md">
                                {
                                    idx === posts.length - 1  && (
                                        <img src={item.image} alt="" 
                                        className="h-[300px] w-[600px] border border-gray-200 rounded-t-md"/>
                                    )
                                }
                                <div className="flex flex-row items-center gap-2 m-5">
                                    <img src={item.user.profilePic} alt="" 
                                    className="h-10 w-10 rounded-full "/>
                                    <div className="">
                                        <p  className="text-sm font-semibold">{item.user.username}</p>
                                        <p className=" text-xs">{formatDate(item.created_at)}</p>

                                    </div>

                                </div>
                                <a className="ml-16 mr-16 mb-2 font-bold text-2xl" href={`/posts/${item.idx}`}>{item.title}</a>
                                <div className="ml-16 mb-2">
                                    <Tags/>
                                </div>
                                <div  className="mb-5">
                                    <Reactions/>
                                </div>
                                {/*<p>{item.body}</p>*/}
                            </article>
                        )
                    })
                }
            </section>
        </main>
    )
}

