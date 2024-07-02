import { useRouter } from "next/router";
import { SocialBtns, BtnCreateAcount } from "@/components/LogBtnSocial";
import { LogHeader, LogFooter } from "@/components/LogHeaderFooter";
import { useEffect, useState } from "react";

export default function CreateAcountPage(){

    const router=useRouter();

    function handleFormCreatAcount(){
        router.push("/create_newuser")
    }

    function handleLogIn(){
        router.push("/login")
    }

    useEffect(()=>{
        document.title = "Welcome!-Dev Community";
    }, []);

    return(
        <main className="flex flex-col items-center m-5 h-dvh">
            <LogHeader/>
            <SocialBtns/>
            <button 
            className="w-full flex flex-col items-center"
            onClick={handleFormCreatAcount}>
                <BtnCreateAcount/>
            </button>
            <LogFooter/>
            <div className="flex flex-row mt-5 gap-2">
                <span>Already have an account?</span>
                <span onClick={handleLogIn} className="text-blue-600 cursor-pointer">Log in</span>
            </div>

        </main>
    )

}