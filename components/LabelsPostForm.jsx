const labels = [
    {label: 'https://img.icons8.com/?size=100&id=Ao9Capo3tPjH&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=zOOh7W99oInA&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=YZXe199Na6nS&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=6502&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=vbJJXz1oQW46&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=63sR2MWpYl9n&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=ts5e28mdzD3N&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=B87EDSHnUWjA&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=IFflkT3P87Rk&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=17439&format=png&color=000000'}, 
    {label: 'https://img.icons8.com/?size=100&id=yF8LPIFelJU7&format=png&color=000000'}, 
     

]

export default function LabelsBtn(){
    return(
        <section className=" flex flex-row gap-1 h-full w-full bg-slate-100">
            {
                labels.map((item)=>{
                    return(
                        <div key={item}>
                            <img src={item.label} className="h-7 w-7 items-center hover:rounded-md hover:text-blue-600 hover:bg-[#dadff0] hover:cursor-pointer p-1" alt="" />
                        </div>
                    )
                })
            }
        </section>
    )

}