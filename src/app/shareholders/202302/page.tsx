import Breadcrumb from "@/components/ui/breadcrumb";
const breadcrumb = ["Хувьцаа эзэмшигчдэд", "2023 оны Хувьцаа эзэмшигчдийн ээлжит бус хурал"];

const Page = () => {
    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <h1 className="my-2 font-semibold">2023 оны Хувьцаа эзэмшигчдийн ээлжит бус хурал</h1>
            <p>
            “Монголын цахилгаан холбоо” хувьцаат компанийн Хувьцаа эзэмшигчдийн ээлжит бус
хурал 2023 оны 10 дугаар сарын 09-ний өдрийн 11:00 цагт Мэдээлэл холбооны сүлжээ ХХК-
ийн хурлын зааланд хуралдана.
<br/>
<br/>
Хуралд оролцох эрхтэй хувьцаа эзэмшигчдийг бүртгэх өдөр: 2023 оны 9 дүгээр сарын 18-ны
өдөр
    
</p>
<br/>

<p>
Ээлжит бус хурлаар хэлэлцэх асуудлууд:<br/>
1. Компанийн хувьцааг нэмж гаргах, олон нийтэд санал болгох тухай;<br/>
2. 2023 оны 2 дугаар сарын 15-ны өдрийн Хувьцаа эзэмшигчдийн ээлжит бус хурлын 02 дугаар
тогтоолыг хүчингүй болсонд тооцох тухай;<br/>
3. Төлөөлөн удирдах зөвлөлийн гишүүнийг сонгох тухай;
</p>

<p>Хурлын материалтай <a className="text-blue-500 cursor-pointer font-semibold" href="/assets/company/ShareholdersMeeting_material_20231009.pdf" target="_blank">энд дарж</a> танилцах боломжтой.</p>

<div className="mt-4">
Холбоо барих:<br/>
Хурал зохион байгуулах комисс<br/>
&emsp;Дарга Ч.Цогтгэрэл,<br/>
&emsp;Гишүүд Х.Цэцэгмаа, Ж.Азбаяр<br/>
Утас: 70102210, 70102244<br/>
И-мэйл: tsetsegmaa@mtcone.net, azlawyer@mtcone.net, ch.tsogtgerel@mtcone.net
</div>
<div className="mt-4">
Тооллогын комисс<br/>
&emsp;Дарга С.Цог,<br/>
&emsp;Гишүүд Т.Бямбасүрэн, Б.Хулан<br/>
Утас: 70102305, 70102211, 70102901<br/>
И-мэйл: tsog@mtcone.net, planning@mtcone.net, khulan@mtcone.net
</div>
        </div>
    );
}

export default Page;