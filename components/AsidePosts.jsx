import { useEffect, useState } from "react";
import { getAllPost } from "@/pages/api";
import { useRouter } from "next/router";
import clsx from "clsx";
import { toast } from "sonner";
import Tags from "@/components/Tags";



export function Discuss(){
    const [discussPosts, setDiscussPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getAllPost()
            .then((posts) => {
                const filteredPosts = posts.filter(post => {
                    const savedTags = localStorage.getItem(`post-${post._id}-tags`);
                    if (savedTags) {
                        const tags = JSON.parse(savedTags);
                        return tags.includes("#discuss");
                    }
                    return false;
                });
                setDiscussPosts(filteredPosts.slice(0, 5));
            })
            .catch((error) => {
                console.error("[getAllPost error]", error);
            });
    }, []);

    const handleTitleClick = (id) => {
        router.push(`/posts/${id}`);
    };

    return (
        <section className="bg-white border border-gray-200 rounded-md flex flex-col p-2 gap-1 mb-2" >
            <div className="border-b border-gray-100">
                <h2 className="font-bold flex flex-col justify-start text-xl">#discuss</h2>
                <p className="text-gray-800 font-thin text-xs mb-4">Discussion threads targeting the whole community</p>
            </div>
            <ul>
                {discussPosts.map((post, index) => (
                    <li key={post._id} className="mb-2 cursor-pointer " onClick={() => handleTitleClick(post._id)}>
                        <p className={clsx("text-black hover:text-blue-600 pt-2 ", {"pb-4 border-b border-gray-100": index !== discussPosts.length - 1})}>{post.title}</p>
                    </li>
                ))}
            </ul>
        </section>
    );

    
}

export function Watercooler(){
    const [watercoolerPosts, setWatercoolerPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getAllPost()
            .then((posts) => {
                const filteredPosts = posts.filter(post => {
                    const savedTags = localStorage.getItem(`post-${post._id}-tags`);
                    if (savedTags) {
                        const tags = JSON.parse(savedTags);
                        return tags.includes("#watercooler");
                    }
                    return false;
                });
                setWatercoolerPosts(filteredPosts.slice(0, 3)); 
            })
            .catch((error) => {
                console.error("[getAllPost error]", error);
            });
    }, []);

    const handleTitleClick = (id) => {
        router.push(`/posts/${id}`);
    };

    return (
        <section className="bg-white border border-gray-200 rounded-md flex flex-col p-2 gap-1" >
            <div className="border-b border-gray-100">
                <h2 className="font-bold flex flex-col justify-start text-xl">#watercooler</h2>
                <p className="text-gray-800 font-thin text-xs mb-4">Light, and off-topic conversation.</p>
            </div>
            <ul>
                {watercoolerPosts.map((post, index) => (
                    <li key={post._id} className="mb-2 cursor-pointer " onClick={() => handleTitleClick(post._id)}>
                        <p className={clsx("text-black hover:text-blue-600 pt-2 ", {"pb-4 border-b border-gray-100": index !== watercoolerPosts.length - 1})}>{post.title}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}


export function UserPosts({userId, username}){
    const [userPost, setUserPost] = useState([]);
    const router = useRouter();
    const [tags, setTags] = useState([]);
    
    useEffect(()=>{
        if(userId){
            const savedTags = localStorage.getItem(`post-${userId}-tags`);
            if (savedTags) setTags(JSON.parse(savedTags));
            dataPosts(userId)
        }
    }, [userId])

    function dataPosts(userId){
        getAllPost()
        .then((posts)=>{
            const filterPosts = posts.filter(post => post.user._id === userId);
            setUserPost(filterPosts);
        })
        .catch((error)=>{
            toast.error("Error getting posts")
            console.error("[getAllPost error]", error);
        });
    }

    function handleTitle(id){
        router.push(`/posts/${id}`);
    }

    return(
        <section className="bg-white border border-gray-200 rounded-md flex flex-col p-2 gap-1" >
            <div className="border-b border-gray-100">
                <h2 className="font-bold flex flex-col justify-start text-xl">More from {username} </h2>
                <p className="text-gray-800 font-thin text-xs mb-4">Light, and off-topic conversation.</p>
            </div>
            <ul>
                {userPost.map((userPost, index) => (
                    <li key={userPost._id} className={clsx("mb-2 cursor-pointer", {"pb-4 border-b border-gray-100": index !== userPost.length - 1})} onClick={() => handleTitle(userPost._id)}>
                        <p className="text-black hover:text-blue-600 pt-2 ">{userPost.title}</p>
                        <Tags postId={userPost._id} tags={tags} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
