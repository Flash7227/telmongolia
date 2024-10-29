import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../../pdfTable";

const breadcrumb = ["Ил тод байдал", "Компанийн засаглалын тайлан"];
const duties = [
    ['Компанийн засаглалын тайлан 20240515', 'iltodbaidal/MTC2023-КЗ_ТАЙЛАН.PDF'],
    ['ЭБАТ-ны цалин хөлс', 'iltodbaidal/ЭБАТ-ны цалин хөлс.pdf']    
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