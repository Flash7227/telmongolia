"use client";
import { useEffect, useState } from "react";
import { getShareHolders } from "@/api/rest";
import Breadcrumb from "@/components/ui/breadcrumb";
import { format_date } from "@/lib/helper";

const breadcrumb = ["Хувьцаа эзэмшигчдэд"];
const Page = () => {
  const [news, setNews] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getShareHolders();
      setNews(res);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <>
        {news && (
          <div>
            <div className="text-center my-4 text-2xl font-semibold text-brand-1 border-b border-brand-1/20 pb-4 tracking-tight">
              {news["data"][0]['title']}
            </div>
            <div className="news" suppressHydrationWarning>
              <div dangerouslySetInnerHTML={{ __html: news["data"][0]['body'] }} />
            </div>
            <div className="text-right font-bold text-sm text-brand-1/80 my-2 uppercase">
              Нийтлэгдсэн {format_date(news["data"][0]['created_at'])}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Page;
