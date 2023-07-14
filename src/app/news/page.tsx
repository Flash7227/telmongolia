"use client";
import { getNews } from "@/api/rest";
import { useState, useEffect } from "react";
import Image from "next/image";

const Page = () => {
    interface NewsType{
        data: [],
        currentPage: number,
        currentPageSize: number,
        totalDatas: number,
        totalPages: number
    }
    const [news, setNews] = useState<NewsType>();
    const getData = async (page:number) => {
        const res = await getNews(page);
        setNews(res);
    }
    useEffect(()=>{
        getData(1);
    },[])
    return (
        <div>
            {
                news && 
                <div className="grid grid-cols-3">
                    {
                        news['data'].map(d=>(
                            <div key={d['id']} className="w-[300px]  border border-slate-100 m-4">
                                <div className="relative h-[200px] w-[300px]">
                                    <Image src={process.env.API2 + '/uploads/' + d['cover_img']} className="object-cover" fill alt={d['title']} sizes="(max-width: 300px) 100vw"/>
                                </div>
                                <div className="text-sm w-full h-[40px] overflow-ellipsis overflow-hidden">{d['title']}</div>
                                <div>{d['created_at']}</div>
                            </div>
                        ))
                    }
                </div>
              
            }
            
        </div>
    );
}

export default Page;