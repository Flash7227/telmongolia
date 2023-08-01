"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Cards from "./cards";
import CheckBill from "./checkBill";
import { useState } from "react";

const Shortcut = ({title, desc, icon, url}:{title:string, desc:string, icon:string, url?:string}) => {
    const [cards, setCards] = useState(false);
    const [bill, setBill] = useState(false);

    const router = useRouter()
    const handleClick=()=>{
        if(url){
            if(url == 'cards'){
                setCards(true);
            }else if(url == 'bill'){
                setBill(true);
            }else{
                router.push(url);
            }
        }
    }
    return (
        <div onClick={handleClick} className="h-[166px] w-[176px] bg-transperant border border-brand-1/20 rounded-2xl p-2 hover:shadow-md hover:shadow-brand-2/50 cursor-pointer hover:-translate-y-2 transition-all duration-300 relative group flex items-center justify-center">
            {cards && <Cards onCardClose={()=>setCards(false)}/>}
            {bill && <CheckBill onModalClose={()=>setBill(false)}/>}
            <ul className="flex flex-col justify-center items-center gap-2 2xl:gap-4 tracking-tight">
                <li className="relative h-20 w-20 border-b border-brand-1/20">
                    <Image src={"/assets/shortcuts/"+icon} fill alt={icon} className="p-4 object-contain"/>
                </li>
                <div className="flex flex-col justify-center items-center">
                    <li className="text-lg font-semibold text-brand-1 uppercase">{title}</li>
                    <li className=" text-slate-800 font-medium text-[14px] text-right">{desc}</li>
                </div>
            </ul>
        </div>
    );
}

export default Shortcut;