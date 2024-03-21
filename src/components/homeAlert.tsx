"use client"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";
import { getEachNews } from "@/api/rest";
const HomeAlert = () => {
    const { toast } = useToast()
    useEffect(() => {
        const fetchData = async () => {
          const res = await getEachNews(53, "news");
        //   alert(res['title']);
          toast({
            title: res['title'],
            description: <a href={`/news/${res['id']}`}>Дэлгэрэнгүй</a>,
          })
        };
        const news = fetchData();
      }, []);
    return (
        <></>
    );
}

export default HomeAlert;