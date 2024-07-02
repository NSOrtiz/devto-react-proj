

export function LogHeader(){
    return(
        <section className="flex flex-col items-center" >
                <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png" alt=""
                className="w-[60px]"  />
                <h1 className="font-sans font-bold text-3xl mt-5 text-center">
                Join the DEV Community</h1>
                <p className="mt-2 text-center">
                DEV Community is a community of 1,648,996 amazing developers</p>
            </section>
    )
}

export function LogFooter(){
    return(
        <div className="flex flex-col w-full max-w-screen-sm justify-center mt-5 text-center">
            <p className="text-gray-500 font-thin"  style={{fontStyle: 'italic'}}>
            By signing in, you are agreeing to our privacy policy, <br />  terms of use and code of conduct.
            </p>
            <div className="flex border-b border-gray-300 h-3 mt-3"></div>
        </div>
    )
}