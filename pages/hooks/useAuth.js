import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";

export default function useAuth(){
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(()=>{
        const tkn = localStorage("token");
        setToken(tkn)
        if(!tkn){
            toast.error("Se necesita incio de sesion");
            router.push("/login");
        }
    }, [router]);
    return token;
    
}