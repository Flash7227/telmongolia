import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Өрхийн хэрэглэгч", "MIP70"];
const comments = ["Хамгийн хямд хэрэглэхэд хялбар танай хамт олонд баярлалаа",
                   "Олон жилийн түүхтэй найрсаг хамт олон найдвартай үйлчилгээтэй",
                   "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа"
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="MIP70"
        bundle="IP PHONE"
        desc="MIP70 нь хил хязгааргүй, орон зайнаас үл хамааран дэлхийн хаанаас ч интернэт орчинд телефон яриа хийх, SIP технологид суурилсан урьдчилсан төлбөрт үйлчилгээ юм."
        logo="sip.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Хямд яриа"
            desc="МЦХ ХК-ийн сүлжээнд үнэгүй, бусад сүлжээнд хамгийн хямдаар ярих"
            img="urh/icon5.png"
          />
          <Advantage
            title="Өргөн сонголт"
            desc="Хэрэглэгчийн төхөөрөмжийн өргөн сонголттой"
            img="urh/icon7.png"
          />
          <Advantage
            title="Хялбар"
            desc="Дуудлага хүлээн авагч нь интернэтэд холбогдох шаардлагагүй"
            img="urh/icon6.png"
          />
          <Advantage
            title="Free"
            desc="Гаднаас дуудлага хүлээн авч, яриа хийхэд төлбөргүй"
            img="urh/icon8.png"
          />
        </div>
      </div>
      {/* price plans */}
      <div className="relative my-[60px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
            Багцын тариф
        </h2>
        <p className="text-right">/НӨАТ орсон/</p>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="Багц 1" price={"7,700₮"} list={["MIP 70 дугаар 7008-****", "Анхны холболтын үнэ: 11’000₮", "Дагалдах ярианы эрх: 5000 нэгж, 30 хоног", "Бусад сүлжээнд 44₮", "Дугаар солих /1 удаа/: 3’300₮", "Эрх сэргээх /1 удаа/ 3’300₮"]}/>
        </div>
      </div>
      {/* user comments */}
      <div className="relative my-[60px]">
        <div className="text-2xl font-bold text-brand-1 my-4 flex items-center justify-center gap-2"><BiCommentDetail/> Хэрэглэгчдийн сэтгэгдэл </div>
        <Comment comments={comments} />
      </div>
    </div>
  );
};

export default Page;