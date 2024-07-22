import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clsx from "clsx";

const links = [
    { href: "/", label: "Dev - Community", authRequired: false },
    { href: "/create_account", label: "Create account", authRequired: false },
    { href: "/create_post", label: "Create post", authRequired: true },
    { href: "/login", label: "Log in", authRequired: false },
];

export default function Navbar() {
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuth(!!token);
    }, []);

    function handlePrincipalPage() {
        router.push("/");
        console.log("refresh")
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setIsAuth(false);
        router.push("/");
    }

    return (
        <header>
            <nav className="grid grid-cols-12 bg-white border-b border-gray-300 p-2">
                {links.map((link) => {
                    if (link.href === "/") {
                        return (
                            <div key={`link-${link.href}`} className="col-span-8 flex flex-row gap-5 items-center">
                                <img
                                    src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
                                    alt=""
                                    className="w-11 h-10 ml-7 cursor-pointer"
                                    onClick={handlePrincipalPage}
                                />
                                <div className="hidden md:block h-10 w-full ">
                                    <div className="flex flex-row items-center p-2 md:w-[350px] border-[1px] border-[#adadb8] bg-transparent rounded-md gap-2">

                                        <img
                                            src="https://img.icons8.com/?size=100&id=KuxJGU4fjVAO&format=png&color=000000"
                                            className="w-[20px] h-[20px]"
                                            alt=""
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    if (link.authRequired && !isAuth) return null;
                    if (isAuth && link.href === "/login") return null;
                    if (isAuth && link.href === "/create_account") return null;
                    return (
                        <a
                            key={`link-${link.href}`}
                            href={link.href}
                            className={clsx(
                                "hidden md:block col-start-9 w-44 font-semibold text-center text-blue-600 border border-blue-600 bg-transparent rounded-md  hover:bg-blue-600 hover:text-white hover:cursor-pointer p-2 ml-2",
                                {
                                     "md:col-start-11 logindecoration hover:!text-blue-800 hover:!bg-indigo-100":
                                        link.label === "Log in",
                                }
                            )}
                        >
                            {link.label}
                        </a>
                    );
                })}
                {isAuth && (
                    <button
                        onClick={handleLogout}
                        className="col-start-12 logindecoration font-semibold rounded-md hover:!text-blue-800 hover:!bg-indigo-100"
                    >
                        Salir
                    </button>
                )}
            </nav>
        </header>
    );
}