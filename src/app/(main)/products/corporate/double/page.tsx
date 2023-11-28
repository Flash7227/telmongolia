import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Байгууллага", "Хосолсон багц"];
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
        desc="Интернэт болон суурин утас нь албан байгууллага ажил хэргээ хөтлөн явуулах өдөр тутмын салшгүй хэрэглээ болсон. Иймд эрүүл мэндэд сөрөг нөлөөгүй, сүлжээндээ үнэгүй ярих боломжтой суурин утас болон дата хязгааргүй интернэтийн үйлчилгээг хослуулан, өөрийн хэрэглээндээ тохируулан авах боломжтой олон сонголттой хосолсон багцуудыг хэрэглэгч Танд санал болгож байна."
        logo="double.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Хямд зардал"
            desc="Суурин утас болон интернэтийн үйлчилгээг нэг байгууллагаас авч зардал хэмнэгдэнэ"
            img="urh/icon5.png"
          />
          <Advantage
            title="Дата хязгааргүй"
            desc="Шилэн кабелийн сүлжээний дэд бүтэцтэй, дата хэрэглээ хязгааргүй интернэт"
            img="urh/icon6.png"
          />
          <Advantage
            title="Тасралтгүй"
            desc="24 цагийн тасралтгүй, найдвартай ажиллагаа, хяналтын системтэй"
            img="urh/icon14.png"
          />
          <Advantage
            title="Хязгааргүй"
            desc="Сүлжээндээ хязгааргүй болон бусад сүлжээнд ярих минутын эрхтэй"
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
        <h5 className="my-4 text-lg font-medium text-center">Шилэн кабел GPON</h5>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="S Багц" price={"55,000₮"} list={["Анхны холболтын хураамж 16,500₮", "Интернэтийн хурд 10Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 5ш"]}/>
            <Price title="M Багц" price={"99,000₮"} list={["Анхны холболтын хураамж 16,500₮", "Интернэтийн хурд 30Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 400 минут", "Нэмэлт үйлчилгээ 7ш"]}/>
        </div>
        <h5 className="my-4 text-lg font-medium text-center">Физик кабел ADSL</h5>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="S Багц" price="42,900₮" list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 3Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 200 минут", "Нэмэлт үйлчилгээ 3ш"]}/>
            <Price title="M Багц" price={"64,900₮"} list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 4Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 350 минут", "Нэмэлт үйлчилгээ 5ш"]}/>
            <Price title="L Багц" price={"86,900₮"} list={["Анхны холболтын хураамж 22,000₮", "Интернэтийн хурд 5Мbps", "Сүлжээндээ болон 26хххх дугаар руу яриа Хязгааргүй", "Бусад сүлжээнд 500 минут", "Нэмэлт үйлчилгээ 7ш"]}/>
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