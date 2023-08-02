import { getNews } from "@/api/rest";
const HomeNews = async () => {
    const news = await getNews('news', 1);
    return (
        <div className="w-[260px] border rounded-md bg-slate-100 p-4">
            <h5 className="font-semibold text-lg text-brand-1">Сүүлд нэмэгдсэн мэдээлэл</h5>
            <ul className="space-y-6">
                {news['data'].map((d:any, index:number)=>(
                    <li className="line-clamp-2" key={index}>{d.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomeNews;