import { useRouter } from "next/router";
import Menu from "./MenuList"
import { useEffect, useState } from "react";



export default function AsideMenu(){

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setAuth(!!token);
    }, []);

    const router = useRouter();

    function handleFormCreatAcount(){
        router.push("/create_account")
    }

    function handleLogIn(){
        router.push("/login")
    }

    return(
        <section>
            {!auth && (
                <article className="bg-white border border-gray-200 rounded-md flex flex-col justify-center items-center p-2 gap-1">
                    <h1 className="text-center font-semibold text-lg mt-2">
                    DEV Community is a community of 1,714,462 amazing developers
                    </h1>
                    <p className="text-center text-gray-800 mb-2 ">We're a place where coders share, stay up-to-date and grow their careers.</p>
                    <button className=" w-full font-semibold text-center text-blue-600 border border-blue-600 bg-transparent rounded-md  hover:bg-blue-600 hover:text-white p-2"
                    onClick={handleFormCreatAcount}
                    >Create account</button>
                    <button className="w-full logindecoration hover:text-blue-800 hover:bg-indigo-100 rounded-md p-2"
                    onClick={handleLogIn}
                    >Log in</button>
                </article>
            )
            }
            <Menu/>
        </section>
    )
}