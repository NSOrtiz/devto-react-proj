import { getPostId } from "@/pages/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "sonner";


export default function PostDetail(){
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (router.query.id) {
            setId(router.query.id);
        }
    }, [router.query.id])

    useEffect(() => {
        if (id){
            getPostId(id)
            .then((post)=>{
                setPost(post);
            }) 
            .catch ((error) => {
                    toast.error("Error al obtener el post");
                    console.error("[ getPostId error ]", error);
                })
        }
    }, [id]);

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "long" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return(
        <Layout>
            <main>
            
                    <article className="w-full max-w-[600px] flex flex-col justify-center bg-white border border-gray-200 rounded-md">
                        <img
                            src={post.image}
                            alt="Post Image"
                            className="h-[300px] w-[600px] border border-gray-200 rounded-t-md"
                        />
                        <div className="flex flex-row items-center gap-2 m-5">
                            <img
                                src={post.user.profilePic}
                                alt="Profile"
                                className="h-10 w-10 rounded-full"
                            />
                            <div>
                                <p className="text-sm font-semibold">{post.user.username}</p>
                                <p className="text-xs">{formatDate(post.created_at)}</p>
                            </div>
                        </div>

                        <h1 className="ml-16 mr-16 mb-2 font-bold text-2xl">{post.title}</h1>
                        <p>{post.body}</p>

                        <div className="ml-16 mb-2">
                            <Tags />
                        </div>

                        <div className="mb-5">
                            <Reactions />
                        </div>
                    </article>
               

            </main>
        </Layout>

    )




}