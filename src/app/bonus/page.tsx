"use client";
import { getNews } from "@/api/rest";
import { useState, useEffect } from "react";
import Image from "next/image";
import Breadcrumb from "@/components/ui/breadcrumb";
import { format_date } from "@/lib/helper";
import Link from "next/link";
import Paginator from "@/components/ui/paginator";
import Loader from "@/components/ui/loader";
import { BsFolder2Open } from "react-icons/bs";

const breadcrumb = ["Урамшуулал"];

const Page = () => {
  interface NewsType {
    data: [];
    currentPage: number;
    currentPageSize: number;
    totalDatas: number;
    totalPages: number;
  }
  const [news, setNews] = useState<NewsType>();
  const [loading, setLoading] = useState(false);
  const getData = async (page: number) => {
    setLoading(true);
    const res = await getNews('bonus', page);
    setNews(res);
    setLoading(false);
  };
  useEffect(() => {
    getData(1);
  }, []);
  return (
    <div className="mt-4">
    {loading && <Loader />}
      <Breadcrumb data={breadcrumb} />
      {news && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-self-center items-stretch gap-6">
            {news["data"].map((d) => (
              <Link
                href={"/bonus/" + d["id"]}
                key={d["id"]}
                className="w-[356px] border border-gray-300 mx-auto rounded-2xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-brand-2/70 h-full z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white border-double border-2 border-slate-50 p-4 rounded-2xl font-semibold flex gap-1 items-center">
                    <BsFolder2Open className="text-2xl"/>Дэлгэрэнгүй
                  </span>
                </div>
                <div className="relative h-[200px] w-full z-0 border-b border-slate-100">
                  <Image
                    src={process.env.API2 + "/uploads/" + d["cover_img"]}
                    className="object-cover group-hover:scale-[1.1] transition-transform duration-300"
                    fill
                    alt={d["title"]}
                    sizes="(max-width: 300px) 40vw"
                    quality={70}
                  />
                </div>
                <div className="text-sm font-semibold w-full h-[40px] overflow-ellipsis overflow-hidden mt-4 px-4 tracking-tight text-center">
                  {d["title"]}
                </div>
                <div className="mx-6 my-2 text-center text-gray-500">
                  Нийтлэгдсэн {format_date(d["created_at"])}
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center my-4">
            <Paginator
              totalPages={news.totalPages}
              currentPage={news.currentPage}
              handlePageChange={getData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
