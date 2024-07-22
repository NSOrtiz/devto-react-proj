import { getPostId } from "@/pages/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import UserInfo from "@/components/userinformation";
import { UserPosts } from "@/components/AsidePosts";


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

    const formatDateUser = (dateString) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return(
        <Layout>
            <main className="flex flex-row w-full h-full bg-slate-100 ">

                <section className="w-1/6 flex flex-col items-end p-8 gap-10">
                    {["https://img.icons8.com/?size=100&id=pi2pfVYSOGmk&format=png&color=000000", 
                        "https://img.icons8.com/?size=100&id=143&format=png&color=000000", 
                        "https://img.icons8.com/?size=100&id=bc20TOtEmtiP&format=png&color=000000"
                    ].map(elem =>(
                        <div key={elem} className="flex flex-col gap-1 h-10 w-10 bg-slate-100">
                            <img src={elem} alt="" className="h-8 w-8 items-center hover:rounded-md hover:text-blue-600 hover:bg-[#dadff0] hover:cursor-pointer p-1" />
                        </div>
                    ))

                    }

                </section>


                <article className=" w-3/6 h-fit flex flex-col justify-center bg-white border border-gray-200 rounded-md m-3">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-[300px] w-full border border-gray-200 rounded-t-md"
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
                        <p  className="ml-16" >{post.body}</p>

                        <div className="ml-16 mb-2">
                            <Tags postId={post._id} tags={tags} />
                        </div>

                        <div className="mb-5">
                            <Reactions postId={post._id} reactions={reactions} />
                        </div>
                </article>

                <section className=" flex flex-col w-2/6 m-3 gap-3">

                    <section className=" w-fullh-fit flex flex-col justify-center bg-white border border-gray-200 rounded-md border-t-[30px] border-t-blue-600 px-4 " >
                        <div className="flex flex-row mt-[-10px] items-end gap-2 mb-2">
                            <img src={post.user.profilePic} alt="" className="h-10 w-10 rounded-full" />
                            <p className="text-2xl font-semibold">{post.user.username} </p>
                        </div>
                        <div className="mt-2">
                            <UserInfo/>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-gray-600">JOINED</h3>
                            <p className="text-sm text-gray-600">{formatDateUser(post.user.created_at)}</p>
                        </div>
                    </section>
        
                    <section>
                        <UserPosts userId={post.user._id} username={post.user.username} />
                    </section>
                </section>
            </main>
        </Layout>
    )
}                           