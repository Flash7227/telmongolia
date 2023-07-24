import Breadcrumb from "@/components/ui/breadcrumb";
const breadcrumb = ["Компанийн засаглал", "ТӨЛӨӨЛӨН УДИРДАХ ЗӨВЛӨЛ"];
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <h5 className="text-brand-1 text-center text-xl font-medium tracking-tight my-2">
        Mонгол улсын төрийн өмчийн төлөөллийг хэрэгжүүлж буй гишүүд
      </h5>
      <div className="flex gap-4 flex-wrap">
        <Card
          name="Т.Лхагвасүрэн"
          desc="Төрийн өмчийн бодлого, зохицуулалтын газар, Төрийн өмчийн удирдлага, зохицуулалтын хэлтсийн мэргэжилтэн, ТУЗ-ийн дарга"
          date="4/29/2021"
          datedesc="2021 оны 4 дүгээр сарын 29-ний өдрийн Хувьцаа эзэмшигчдийн
                ээлжит хурлаар дахин сонгогдсон."
          pic="Lkhagvasuren.jpg"
        />
        <Card
          name="А.Молор"
          desc=" Төрийн өмчийн бодлого, зохицуулалтын газар, Төрийн өмчийн
                удирдлага, зохицуулалтын хэлтсийн Удирдлага, төлөөллийн асуудал
                хариуцсан мэргэжилтэн"
          date="4/29/2022"
          datedesc="2022 оны 4 дүгээр сарын 29-ний өдрийн Хувьцаа эзэмшигчдийн
                ээлжит хурлаар сонгогдсон."
          pic="Molor.png"
        />
        <Card
          name="Г.Эрдэнэбулган"
          desc="ЗГ-ийн хэрэг эрхлэх газар, Хууль, эрхзүйн газар, Засгийн газрын
          референт"
          date="4/29/2021"
          datedesc="2021 оны 4 дүгээр сарын 29-ний өдрийн Хувьцаа эзэмшигчдийн
          ээлжит хурлаар дахин сонгогдсон."
          pic="Erdenebulgan.jpg"
        />
        <Card
          name="Ч.Цэвэгдорж"
          desc="ХНХЯ, Төрийн захиргаа, удирдлагын газрын дарга"
          date="4/29/2021"
          datedesc="2021 оны 4 дүгээр сарын 29-ний өдрийн Хувьцаа эзэмшигчдийн
                ээлжит хурлаар дахин сонгогдсон."
          pic="Tsevegdorj.jpg"
        />
         <Card
          name="Ж.Цогтбаяр"
          desc="СЯ, СХЭУГ-ын Санхүүгийн хяналт шалгалтын хэлтсийн дарга"
          date="4/29/2021"
          datedesc="2021 оны 4 дүгээр сарын 29-ний өдрийн Хувьцаа эзэмшигчдийн
                ээлжит хурлаар дахин сонгогдсон."
          pic="Tsogtbayar.jpg"
        />
         <Card
          name="М.Лхагважав"
          desc="Төрийн өмчийн бодлого, зохицуулалтын газар, Төрийн өмчийн хяналт
          шалгалтын хэлтсийн мэргэжилтэн"
          date="4/29/2021"
          datedesc="2021 оны 4 дүгээр сарын 29-ний өдрийн Хувьцаа эзэмшигчдийн
                ээлжит хурлаар дахин сонгогдсон."
          pic="Lkhagvajav.png"
        />
      </div>
      <h5 className="text-brand-1 text-center text-xl font-medium tracking-tight my-2">
        Хараат бус гишүүд
      </h5>
      <div className="flex gap-4 flex-wrap">
        <Card
            name="Ц.НОРОВЖАМЦ"
            desc="“Интер аудит” ХХК-ийн гэрээт
            аудитор"
            date="4/28/2023"
            datedesc="           2023 оны 4 дүгээр сарын 28-ны өдрийн Хувьцаа эзэмшигчдийн
            ээлжит хурлаар дахин сонгогдсон."
            pic="Norovjamts.png"
            />
            <Card
            name="Х.БАЯНБАЙ"
            desc="Акпар-Аудит” компанийн
            Ерөнхий захирал"
            date="4/28/2023"
            datedesc="2023 оны 4 дүгээр сарын 28-ны өдрийн Хувьцаа эзэмшигчдийн
            ээлжит хурлаар сонгогдсон."
            pic="bayanbai.jpg"
            />
            <Card
            name="С.ЦОЛМОН"
            desc="Мандах их сургуулийн Ахисан
            түвшний сургуулийн захирал"
            date="4/28/2023"
            datedesc="     2023 оны 4 дүгээр сарын 28-ны өдрийн Хувьцаа эзэмшигчдийн
            ээлжит хурлаар сонгогдсон."
            pic="tsolmon.jpg"
            />
        </div>
    </div>
  );
};

const Card = ({
  name,
  desc,
  date,
  datedesc,
  pic,
}: {
  name: string;
  desc: string;
  date: string;
  datedesc: string;
  pic: string;
}) => {
  return (
    <div className="w-[280px] flex flex-col justify-center items-center gap-2 border border-brand-1/20 rounded-2xl p-4 cursor-pointer">
      <div className="relative h-[140px] w-[140px] rounded-full shadow-lg bg-white border border-slate-100 overflow-hidden">
        <Image
          src={"/assets/company/images/" + pic}
          fill
          alt={name}
          className="object-contain scale-100"
        />
      </div>
      <div className="font-medium text-base">{name}</div>
      <div className="text-sm tracking-tight text-justify h-[100px]">{desc}</div>
      <div className="mt-4 text-center text-[14px] text-brand-1 font-medium">
        Сонгогдсон <br />
        {date}
      </div>
    </div>
  );
};

export default Page;
