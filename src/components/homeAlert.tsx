"use client"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";
import { getEachNews } from "@/api/rest";
const HomeAlert = () => {
    const { toast } = useToast()
    useEffect(() => {
        const fetchData = async () => {
          // const res = await getEachNews(53, "news");
        //   alert(res['title']);
          toast({
            title: `2024 оны хувьцаа эзэмшигчдийн хурал`,
            description: <a href={`/shareholders`}>Дэлгэрэнгүй</a>,
          })
        };
        const news = fetchData();
      }, []);
    return (
        <></>
    );
}

export default HomeAlert;