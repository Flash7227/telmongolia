import Breadcrumb from "@/components/ui/breadcrumb";
import PdfTable from "../pdfTable";

const breadcrumb = ["Компанийн засаглал", "Эрх зүйн акт"];
const duties = [
    ['МОНГОЛЫН ЦАХИЛГААН ХОЛБОО ХК-ИЙН ДҮРЭМ', 'erhzui/Компанийн дүрэм.pdf'],
    ['“МОНГОЛЫН ЦАХИЛГААН ХОЛБОО” ХУВЬЦААТ КОМПАНИЙН ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛИЙН ҮЙЛ АЖИЛЛАГААНЫ ЖУРАМ', 'erhzui/1n.pdf'],
    ['Ажлын гүйцэтгэлийг үнэлэх журам', 'erhzui/MTC_2017-A-169.pdf'],
    ['Ажилтан сонгон шалгаруулах журам', 'erhzui/Ажилтан сонгон шалгаруулах журам.pdf'],
    ['Хэрэглэгчдэд үйлчилгээ үзүүлэх журам', 'erhzui/Хэрэглэгчдэд үйлчилгээ үзүүлэх журам (2).pdf'],
    ['Компанийн засаглалын кодексийг хэрэгжүүлэх хөтөлбөр', 'erhzui/15n.pdf'],
    ['Ёс зүйн дүрэм', 'erhzui/2.pdf'],
    ['Залгамж халааны бодлогын баримт бичиг', 'erhzui/3.pdf'],
    ['Нэр дэвшүүлэх хорооны журам', 'erhzui/14n.pdf'],
    ['Цалин урамшууллын хорооны журам', 'erhzui/13n.pdf'],
    ['Аудитын хорооны журам', 'erhzui/12n.pdf'],
    ['Дотоод хяналтын бодлогын баримт бичиг', 'erhzui/11n.pdf'],
    ['Ногдол ашгийн журам', 'erhzui/10n.pdf'],
    ['Хувьцаа эзэмшигчдийн хурлын журам', 'erhzui/9.pdf'],
    ['Комплайнсын хяналтын журам', 'erhzui/9n.pdf'],
    ['Төлөөлөн удирдах зөвлөлийн нарийн бичгийн даргын үйл ажиллагааны журам', 'erhzui/11.pdf'],
    ['Мэдээллийн ил тод байдал, тайлагналын журам', 'erhzui/8n.pdf'],
    ['Эрсдэлийн удирдлагын журам', 'erhzui/7n.pdf'],
    ['Дотоод аудитын журам', 'erhzui/14.pdf'],
    ['Ажилтны санал, хүсэлт, гомдлыг хүлээн авах, шийдвэрлэх журам', 'erhzui/2n.pdf'],
    ['Оролцогч талуудтай хамтран ажиллах бодлогын баримт бичиг', 'erhzui/3n.pdf'],
    ['Хөрөнгө оруулагчидтай харилцах хөтөлбөр', 'erhzui/4n.pdf'],
    ['Их хэмжээнии болон сонирхлын зөрчилтэи хэлцэл хиих журам', 'erhzui/5n.pdf'],
    ['Гүйцэтгэх захирлын үйл ажиллагааны журам', 'erhzui/6n.pdf'],
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