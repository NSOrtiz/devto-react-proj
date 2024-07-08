import { useEffect, useState } from "react";

export default function Reactions() {
    const [numReactions, setNumReactions] = useState(0);
    const [numComments, setNumComments] = useState(0);

    useEffect(() => {
        const reactions = Math.floor(Math.random() * 100) + 1;
        const comments = Math.floor(Math.random() * reactions) + 1;
        setNumReactions(reactions);
        setNumComments(comments);
    }, []);

    function comments() {
        return (
            <div className="flex flex-row ml-16 gap-2 cursor-pointer">
                <label>🗨️</label>
                <p className="font-light text-sm">{numComments} comments</p>
            </div>
        );
    }

    function renderReactions() {
        const reactionIcons = ["💖", "🦄", "🤯", "🙌", "🔥"];
        const reactionsToShow = Math.min(numReactions, reactionIcons.length);

        return (
            <div className="relative inline-block">
                {reactionIcons.slice(0, reactionsToShow).map((icon, idx) => (
                    <label
                        key={`reaction-${idx}`}
                        className={`reactionbubble absolute top-0 left-${idx * 3} z-50`}
                    >
                        {icon}
                    </label>
                ))}
                <p className="ml-20 font-light text-sm">{numReactions}</p>
            </div>
        );
    }

    return (
        <section className="ml-16">
            {numReactions < 4 && (
                <div className="flex flex-row">
                    {renderReactions()}
                    {comments()}
                </div>
            )}
            {numReactions >= 4 && (
                <div className="relative inline-block flex flex-row ">
                    {renderReactions()}
                    {comments()}
                </div>
            )}
        </section>
    );
}