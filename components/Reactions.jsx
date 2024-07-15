import { useEffect, useState } from "react";

export default function Reactions({ postId, reactions: initialReactions }) {
    const [numReactions, setNumReactions] = useState(0);
    const [numComments, setNumComments] = useState(0);

    useEffect(() => {
        if (initialReactions.reactions) {
            setNumReactions(initialReactions.reactions);
            setNumComments(initialReactions.comments);
        } else {
            const reactions = Math.floor(Math.random() * 100) + 1;
            const comments = Math.floor(Math.random() * reactions) + 1;
            setNumReactions(reactions);
            setNumComments(comments);
            localStorage.setItem(`post-${postId}-reactions`, JSON.stringify({ reactions, comments }));
        }
    }, [postId, initialReactions]);

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
        let nvListReactionIcons = []
        let lg = 0;

        if (numReactions <= 4 ){
            lg = numReactions
            nvListReactionIcons = reactionIcons.slice(0, lg);
        } else if (numReactions >= 5){
            lg = 5
            nvListReactionIcons = reactionIcons.slice(0, lg);
        }

        console.log(numReactions)
        console.log(nvListReactionIcons)
       
        return (
            <div className="relative inline-block flex flex-row">
                {nvListReactionIcons.map((icon, idx) => (
                    <label
                        key={`reaction-${idx}`}
                        className={`reactionbubble`}
                        style={{ marginLeft: idx === 0 ? '0' : '-7px' }}
                    >
                        {icon}
                    </label>
                ))}
                <p className="ml-5 font-light text-sm">{numReactions}</p>
            </div>
        ); 
    }

    return (
        <section className="ml-16">
            <div className="flex flex-row">
                    {renderReactions()}
                    {comments()}
                </div>

        </section>
    );
}