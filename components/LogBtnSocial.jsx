const socialbtn =[
    {img: 'https://img.icons8.com/?size=100&id=2u9oG2V1ZieN&format=png&color=000000', text: 'Continue with Apple'},
    {img: 'https://img.icons8.com/?size=100&id=13912&format=png&color=000000', text: 'Continue with Facebook'},
    {img: 'https://img.icons8.com/?size=100&id=uiiE7WgRT2NI&format=png&color=000000', text: 'Continue with Forem'},
    {img: 'https://img.icons8.com/?size=100&id=12599&format=png&color=000000', text: 'Continue with GitHub'},
    {img: 'https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000', text: 'Continue with Google'},
    {img: 'https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000', text: 'Continue with Twitter (X)'},
    {img: 'https://img.icons8.com/?size=100&id=2848&format=png&color=000000', text: 'Sign up with Email'},
];


export function SocialBtns(){
    const socialDataArrayLogin = socialbtn.slice(0, -1);
    return(
        <section className="flex flex-col w-full max-w-screen-sm justify-center mt-5">
            {
                socialDataArrayLogin.map((item, index)=>{
                    return(
                        <span key={index} className="w-full max-w-screen-sm flex flex-row items-center border-[1px] rounded-md mt-2 border-gray-300 p-3 hover:bg-gray-100 cursor-pointer">
                            <div>
                                <img src={item.img} alt="" 
                                className="w-5"/>
                            </div>
                            <p className="w-full text-center font-semibold text-sm">{item.text}</p>
                        </span>
                    )
                })
            }
        </section>
    )
}

export function BtnCreateAcount(){
    
    const dataEmailBtn = socialbtn[socialbtn.length - 1];
    return(
        <section className="flex flex-col w-full max-w-screen-sm justify-center mt-0">
            <span 
            className="w-full max-w-screen-sm flex flex-row items-center border-[1px] rounded-md mt-2 border-gray-300 p-3 hover:bg-gray-100 cursor-pointer">
                <div>
                    <img src={dataEmailBtn.img} alt="" 
                    className="w-5"/>
                </div>
                    <p className="w-full text-center font-semibold text-sm">{dataEmailBtn.text}</p>
            </span>
        </section>
    )
}