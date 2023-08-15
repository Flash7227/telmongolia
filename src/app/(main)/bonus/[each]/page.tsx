"use client"
import { getEachNews } from "@/api/rest";
import { format_date } from "@/lib/helper";
import Breadcrumb from "@/components/ui/breadcrumb";
import parse from 'html-react-parser';


const breadcrumb = ["Урамшуулал"];
const Page = async ({ params }: { params: { each: number } }) => {
  // const news = await getEachNews(params.each, "news");
  const getNews = async ()=> {
    const url = process.env.API2 + '/' + 'news' + '?id=' + params.each;
    try {
      const response = await fetch(url);
      let result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  const news = await getNews();
  return (
    <div className="mt-5">
      <Breadcrumb data={breadcrumb} />
      {news && (
        <div>
          <div className="text-center my-4 text-2xl font-semibold text-brand-1 border-b border-brand-1/20 pb-4 tracking-tight">
            {news.title}
          </div>
          <div className="news" suppressHydrationWarning>
            {parse(news.body)}
          </div>
          <div className="text-right font-bold text-sm text-brand-1/80 my-2 uppercase">
            Нийтлэгдсэн {format_date(news.created_at)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
