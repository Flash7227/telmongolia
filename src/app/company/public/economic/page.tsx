import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Эдийн засгийн ил тод байдал"];
const duties = [
    ['2022 он төлөвлөгөө хэмнэлт хэтрэлт', 'iltodbaidal/2022 он төлөвлөгөө хэмнэлт хэтрэлт.pdf'],
    ['2022-2024 зорилтот түвшин', 'iltodbaidal/2022-2024 зорилтот түвшин.pdf'],
    ['Дунд хугацааны бизнес хөгжлийн стратеги', 'iltodbaidal/Дунд хугацааны бизнес хөгжлийн стратеги.pdf'],
];
const Page = () => {
    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <div>
                <PdfTable list={duties} />
            </div>
        </div>
    );
}

export default Page;