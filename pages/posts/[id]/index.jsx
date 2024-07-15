import { getPostId } from "@/pages/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

import Tags from "@/components/Tags";
import Reactions from "@/components/Reactions";

export default function PostDetail(){
    const router = useRouter();
    const { id } = router.query; 
    console.log(id)

    const [post, setPost] = useState(null);
    const [tags, setTags] = useState([]);
    const [reactions, setReactions] = useState({})
    
    useEffect(() => {
        if (id){
            const savedTags = localStorage.getItem(`post-${id}-tags`);
            const savedReactions = localStorage.getItem(`post-${id}-reactions`);
            if (savedTags) setTags(JSON.parse(savedTags));
            if (savedReactions) setReactions(JSON.parse(savedReactions));
            getPostId(id)
            .then((response)=>{
                if (response.success) {
                    setPost(response.data.post);
                } else {
                    toast.error("Error fetching post");
                }

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

    if (!post) {
        return <div>Loading...</div>;
    }

    return(
        <Layout>
            <main>
                <article className="w-full max-w-[600px] flex flex-col justify-center bg-white border border-gray-200 rounded-md">
                        <img
                            src={post.image}
                            alt={post.title}
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
                            <Tags postId={post._id} tags={tags} />
                        </div>

                        <div className="mb-5">
                            <Reactions postId={post._id} reactions={reactions} />
                        </div>
                </article>

            </main>
            
        </Layout>

    )




}