"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { RxDot, RxDotFilled } from "react-icons/rx";
import Link from "next/link";


const ImageSlider = ({data}:{data:any}) => {
    const [currenIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if(currenIndex === data.length - 1){
                setCurrentIndex(0);
            }else{
                setCurrentIndex(currenIndex => currenIndex + 1);
            }
            // console.log('counting', currenIndex);
        }, 4000);
        return () => clearInterval(interval);
      }, [currenIndex]);
      
    return (
        <div className="rounded-2xl overflow-hidden">
            <div className='2xl:h-[250px] min-h-[220px] w-full relative'>
                {
                    data.map((d:any, index:number)=>(
                        <div className='h-full w-full absolute transition-all' key={d.id}>
                            <Image src={`${process.env.API2}/uploads/${d.image}`} fill alt={d.image} 
                                className={`object-cover transition-opacity duration-500 ease-in opacity-0 ${currenIndex === index ? ' opacity-100' : 'opacity-0'}`}/>
                        </div>
                    ))
                }
                <div className="absolute flex items-center justify-center bottom-0 left-0 right-0 ">
                    <div className="flex items-center justify-center mb-5 rounded-3xl bg-slate-900/60 transition-all">
                        {
                            data.map((d:any, index:number)=>(
                                <div key={d.id} className="text-slate-50 text-4xl cursor-pointer transition-all" onClick={()=>setCurrentIndex(index)}>
                                    <RxDotFilled className={`transition-all ${currenIndex === index ? 'text-brand-3' :  null}`}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="hidden md:block absolute top-8 left-8">
                    <ul className="text-slate-50 text-xs flex gap-2 items-center font-medium">
                        <li>Trending: </li>
                        <Link href="/order" className="border p-2 rounded-2xl hover:bg-brand-3 hover:border-brand-3 transition-colors">Шинэ хэрэглэгч болох</Link>
                        <Link href="/aboutus" className="border p-2 rounded-2xl hover:bg-brand-3 hover:border-brand-3 transition-colors">Бидний тухай</Link>
                    </ul>
                </div>
                
            </div>
            <div className="bg-brand-2 text-slate-50 text-center font-semibold py-1 text-sm">
                <h5>Харилцаа бүрийг холбоно.</h5>
            </div>
        </div>
    );
}

export default ImageSlider;