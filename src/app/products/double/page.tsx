import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../advantage";
import Intro from "../intro";
import Comment from "../comment";
import Price from "../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Өрхийн хэрэглэгч", "Хосолсон багц"];
const comments = ["Олон жилийн түүхтэй найрсаг хамт олон найдвартай үйлчилгээтэй",
                   "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа.",
                   "Өмнө өөр нэт хэрэглэдэг байсан гацаад тоглож болдоггүй байсан одоо болохоор гацах гэдэг асуудлыг мартсан танайхыг сонгосонд сэтгэл их ханамж 100%"
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="Хосолсон багц"
        bundle="СУУРИН УТАС + ИНТЕРНЭТ"
        desc="Бидний амьдралын өдөр тутмын салшгүй хэрэглээ болсон интернэтээ эрүүл мэндэд сөрөг нөлөөгүй, харилцаа холбооны найдвартай хэрэгсэл болсон суурин утастай хослуулан, гэр бүлийн хэрэгцээндээ тохирох багцуудаас сонгон авч үйлчлүүлээрэй."
        logo="double.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Найдвартай"
            desc="Шилэн кабелийн сүлжээний найдвартай дэд бүтэцтэй"
            img="urh/icon12.png"
          />
          <Advantage
            title="Цар хүрээ өргөн"
            desc="Монгол орон даяар хамгийн өргөн сүлжээтэй"
            img="urh/icon13.png"
          />
          <Advantage
            title="Тасралтгүй"
            desc="24 цагийн тасралтгүй, найдвартай ажиллагаа, хяналтын системтэй"
            img="urh/icon14.png"
          />
        </div>
      </div>
      {/* price plans */}
      <div className="relative my-[60px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
            Багцын тариф
        </h2>
        <p className="text-right">/НӨАТ орсон/</p>
        <h5 className="my-4 text-lg font-medium text-center">Шилэн кабел GPON</h5>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="S Багц" price={"30,000₮"} list={["Анхны холболтын хураамж 16,500₮", "Интернэтийн хурд 10Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 100 минут", "Нэмэлт үйлчилгээ 1ш"]}/>
            <Price title="M Багц" price={"40,000₮"} list={["Анхны холболтын хураамж 16,500₮", "Интернэтийн хурд 30Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 3ш"]}/>
        </div>
        <h5 className="my-4 text-lg font-medium text-center">Физик кабел ADSL</h5>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="S Багц" price="19,800₮ - 24,200₮" list={["Анхны холболтын хураамж Улаанбаатарт 22,000₮, Орон нутагт 16,500₮", "Интернэтийн хурд 2Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 100 минут", "Нэмэлт үйлчилгээ 1ш"]}/>
            <Price title="M Багц" price={"29,700₮ - 38,500₮"} list={["Анхны холболтын хураамж Улаанбаатарт 22,000₮, Орон нутагт 16,500₮", "Интернэтийн хурд 3Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 3ш"]}/>
            <Price title="L Багц" price={"39,600₮ - 49,500₮"} list={["Анхны холболтын хураамж Улаанбаатарт 22,000₮, Орон нутагт 16,500₮", "Интернэтийн хурд 5Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 5ш"]}/>
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