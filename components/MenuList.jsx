import clsx from "clsx"

const MenuOptionsList = [
    {img: '🏠' , label: "Home"},
    {img: '🎙️' , label: "Podcasts"},
    {img: '📽️' , label: "Videos"},
    {img: '🏷️' , label: "Tags"},
    {img: '💡' , label: "DEV Help"},
    {img: '🛍️' , label: "Forem Shop"},
    {img: '❤️' , label: "Advertise on DEV"},
    {img: '🏆' , label: "DEV Challenges"},
    {img: '✨' , label: "DEV Showcase"},
    {img: 'DEV' , label: "About"},
    {img: '📯' , label: "Contact"},
    {img: '📖' , label: "Guides"},
    {img: '🤔' , label: "Software comparisons"}
]

export default function Menu(){
    return(
        <div>
            {
                MenuOptionsList.map((element, index)=>{
                    return(
                        <div key={index} className="flex flex-row gap-2 items-center m-2 cursor-pointer hover:text-blue-800 hover:bg-indigo-100 rounded-md p-1">
                            <label className={clsx("bg-transparent cursor-pointer",{"!bg-black text-white font-semibold text-xs": element.img==='DEV'})}>{element.img}</label>
                            <label className="cursor-pointer">{element.label}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}