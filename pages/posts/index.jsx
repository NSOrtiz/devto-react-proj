import { useEffect, useState } from "react";
import { getAllPost } from "../api";
import { toast } from "sonner";
import Tags from "@/components/Tags";
import Reactions from "@/components/Reactions";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function AllPosts() {
    const [posts, setPosts] = useState([])
    const [tagsMap, setTagsMap] = useState({}); 
    const [reactionsMap, setReactionsMap] = useState({});

    const [filter, setFilter] = useState("Relevant");
    const [filteredPosts, setFilteredPosts] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getAllPost()
            .then((props) => {
                setPosts(props);
            })
            .catch((error) => {
                toast.error("Error getting posts");
                console.error("[getAllPost error]", error);
            });
    }, []);

    useEffect(() => {
        const tags = {};
        const reactions = {};

        posts.forEach((post) => {
            const postId = post._id;

            const savedTags = localStorage.getItem(`post-${postId}-tags`);
            const savedReactions = localStorage.getItem(`post-${postId}-reactions`);

            if (savedTags) {
                tags[postId] = JSON.parse(savedTags);
            }
            if (savedReactions) {
                reactions[postId] = JSON.parse(savedReactions);
            }
        });

        setTagsMap(tags);
        setReactionsMap(reactions);
    }, [posts]);

    useEffect(() => {
        let filtered = [...posts];
        if (filter === "Latest") {
            filtered = posts
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 7);
        } else if (filter === "Top") {
            filtered = posts
                .sort((a, b) => {
                    const reactionsA = reactionsMap[a._id]?.reactions || 0;
                    const reactionsB = reactionsMap[b._id]?.reactions || 0;
                    return reactionsB - reactionsA;
                })
                .slice(0, 7);
        }
        setFilteredPosts(filtered);
    }, [filter, posts, reactionsMap]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    };

    function handleTitleClick(id) {
        router.push(`/posts/${id}`);
    }

    return (
        <main className="flex justify-center flex-col w-full items-center">
            <div className="flex flex-row gap-2 text-lg ml-5 mb-2 w-full ">
                {["Relevant", "Latest", "Top"].map(option => (
                    <label
                        key={option}
                        className={clsx(
                            "rounded-md p-2 cursor-pointer",
                            filter === option ? "font-bold bg-white text-blue-600" : "text-gray-700 hover:bg-white hover:text-blue-600"
                        )}
                        onClick={() => setFilter(option)}
                    >
                        {option}
                    </label>
                ))}
            </div>
            <section className="w-full flex flex-col-reverse justify-center items-center gap-2">
                {(filter === "Relevant" ? posts : filteredPosts).map((item, idx) => (
                    <article key={`data-${idx}`} className="w-full flex flex-col justify-center bg-white border border-gray-200 rounded-md">
                        {idx === posts.length - 1 && (
                            <img src={item.image} alt="" className="h-[300px] w-full border border-gray-200 rounded-t-md" />
                        )}
                        <div className="flex flex-row items-center gap-2 m-5">
                            <img src={item.user.profilePic} alt="" className="h-10 w-10 rounded-full" />
                            <div>
                                <p className="text-sm font-semibold cursor-pointer p-1 hover:bg-gray-100 hover:rounded-sm">{item.user.username}</p>
                                <p className="text-xs">{formatDate(item.created_at)}</p>
                            </div>
                        </div>
                        <label className="ml-16 mr-16 mb-2 font-bold text-2xl cursor-pointer hover:text-blue-700"
                            onClick={() => handleTitleClick(item._id)}>
                            {item.title}
                        </label>
                        <div className="ml-16 mb-2">
                            <Tags postId={item._id} tags={tagsMap[item._id] || []} />
                        </div>
                        <div className="mb-5">
                            <Reactions postId={item._id} reactions={reactionsMap[item._id] || {}} />
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
