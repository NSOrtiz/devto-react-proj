import Navbar from "./NavHeader";
export default function Layout({children}){
    return(
        <div>
            <Navbar/>
            {children}
        </div>
    )
}