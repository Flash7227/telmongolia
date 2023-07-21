import { getShareHolders } from "@/api/rest";
import Breadcrumb from "@/components/ui/breadcrumb";
import { format_date } from "@/lib/helper";

const breadcrumb = ["Хувьцаа эзэмшигчдэд"];
const Page = async() => {
    const news = await getShareHolders();
    return (
        <div>
              <Breadcrumb data={breadcrumb} />
            <div className="text-center my-4 text-2xl font-semibold text-brand-1 border-b border-brand-1/20 pb-4 tracking-tight">{news.data[0].title}</div>
            <div dangerouslySetInnerHTML={{__html:news.data[0].body}} />
            <div className="text-right font-bold text-sm text-brand-1/80 my-2 uppercase">
                Нийтлэгдсэн {format_date(news.data[0].created_at)}
            </div>
        </div>
    );
}

export default Page;