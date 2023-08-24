"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
const niceWords = ['Найдвартай байдал', 'Шуурхай үйлчилгээ', 'Найрсаг хамт олон', 'Хямд үнэ', 'Мэргэжилийн үйлчилгээ'];

const Slogans = () => {
    const { toast } = useToast()
    const [currenIndex, setCurrentIndex] = useState(0);
    const [secretCount, setSecrentCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if(currenIndex === niceWords.length - 1){
                setCurrentIndex(0);
            }else{
                setCurrentIndex(currenIndex => currenIndex + 1);
            }
            // console.log('counting', currenIndex);
        }, 3000);
        return () => clearInterval(interval);
      }, [currenIndex]);
      const secretFunction = () =>{
        //dont delete this for love lol
        if(secretCount === 28 ){
            toast({
                title: "Hi Myagmaa",
                description: "М + Ө = <3 2023/08/16",
              })
        }else{
            setSecrentCount(secretCount + 1);
        }
        if(secretCount > 6){
            console.log(secretCount);
        }
      }
    return (
        <div className="relative bg-transparent min-h-[140px] 2xl:min-h-[190px] text-center bg-gradient-to-r from-[#135EA5] from-10% to-[#00AFEF] to-100% font-bold  tracking-tight w-full">
        
            <div className="relative h-full w-full z-20 py-2 2xl:py-8">
                <p className="text-base text-slate-200/80">Бид таны</p>
                <h5 className="text-slate-50 text-4xl">Харилцаа бүрийг <span onClick={()=>secretFunction()}>холбоно</span>.</h5>
                {/* <h5 className="text-slate-50 text-3xl">Харилцаа бүрийг холбоно.</h5> */}
                <div className="relative h-[46px]">
                    {niceWords.map((word, index:number)=>(
                        <p key={index} className={`text-2xl absolute w-full uppercase text-sky-400 font-bold mt-2 transition-transform duration-500 scale-0 ${index === currenIndex ? 'scale-100': 'scale-0'}`}>{word}</p>
                    ))}
                    
                </div>
            </div>
            <div className="absolute w-full bottom-[-1px] z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path className="fill-slate-50 z-0" d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
                </svg>
            </div>
            <div className="absolute inset-0 z-10">
                <Image src="/assets/images/overlay.png" fill alt="overlay" className="object-contain"/>
            </div>
        </div>
    );
}

export default Slogans;