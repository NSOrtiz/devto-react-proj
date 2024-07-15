import { useEffect, useState } from "react";
import { getAllPost } from "@/pages/api";
import { useRouter } from "next/router";
import clsx from "clsx";

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
                setDiscussPosts(filteredPosts.slice(0, 5)); // Limitar a 5 posts
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
                setWatercoolerPosts(filteredPosts.slice(0, 3)); // Limitar a 5 posts
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