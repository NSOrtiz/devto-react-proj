import clsx from "clsx";
import { useEffect } from "react";

const ListTags = ["#javascript", "#vue", "#nuxt", "#react", "#webdev", "#programming","#aws", "#codeopen", "#frontend", "#linux", "testing", "#codepen", "#html", "#ai", "mobile", "#watercooler", "#discuss" ];

export default function Tags({ postId, tags }) {
    function getRandomTags(tags) {
        const lg = 4;
        const shortList = tags.sort(() => 0.5 - Math.random());
        return shortList.slice(0, lg);
    }

    const randomTagsList = tags.length ? tags : getRandomTags(ListTags);

    useEffect(() => {
        if (!tags.length) {
            localStorage.setItem(`post-${postId}-tags`, JSON.stringify(randomTagsList));
        }
    }, [postId, tags, randomTagsList]);

    return (
        <div className="flex flex-row gap-2">
            {randomTagsList.map((tag, idx) => (
                <label key={`tag-${tag}`} className={clsx("font-light text-gray-600 text-sm cursor-pointer p-1 border border-transparent rounded", {
                    "hover:bg-yellow-100 hover:border hover:border-yellow-500 hover:rounded": idx === 0,
                    "hover:bg-green-100 hover:border hover:border-green-500 hover:rounded": idx === 1,
                    "hover:bg-pink-100 hover:border hover:border-pink-500 hover:rounded": idx === 2,
                    "hover:bg-blue-100 hover:border hover:border-blue-500 hover:rounded": idx === 3
                })}>{tag}</label>
            ))}
        </div>
    );
}