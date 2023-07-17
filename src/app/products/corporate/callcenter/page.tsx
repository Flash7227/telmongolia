import Breadcrumb from "@/components/ui/breadcrumb";
import Advantage from "../../advantage";
import Intro from "../../intro";
import Comment from "../../comment";
import Price from "../../price";
import { BiCommentDetail } from "react-icons/bi";


const breadcrumb = ["Байгууллага", "Call center"];
const comments = [
                   "Байгууллагын дотоод холбоог бүрэн найдвартай хийж өгсөнд баярлалаа",
                   "Засвар үйлчилгээг түргэн шуурхай засаж өгсөнд танай хамт олонд баярлалаа."
                 ];
const Page = () => {
  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      {/* Introduction section */}
      <Intro
        title="Call center"
        bundle="ДУУДЛАГЫН ТӨВ"
        desc="Call center нь тухайн байгууллагын харилцагчийн үйлчилгээний үүргийг гүйцэтгэх технологийн шийдэл бөгөөд бизнестээ Call center үйлчилгээг нэвтрүүлснээр харилцагчийн үйлчилгээтэй холбоотой зардлыг бууруулан, ажлын бүтээмж, борлуулалтыг нэмэгдүүлж, харилцагчийн сэтгэл ханамжийг сайжруулах чухал ач холбогдолтой юм"
        logo="callcenter.png"
      />
      {/* Advantage section */}
      <div className="relative mt-[30px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
          Давуу талуудаас ...
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center mt-4">
          <Advantage
            title="Тохиромжтой"
            desc="Танай байгууллага нэмэлт төхөөрөмж худалдан авах шаардлагагүйгээр зөвхөн суурин утастай байхад энэ үйлчилгээг авах боломжтой"
            img="urh/icon15.png"
          />
          <Advantage
            title="Элгэсэг"
            desc="Суурин утасгүй тохиолдолд интернэт орчинд дугаар үүсгэж ашиглах боломжтой"
            img="baiguullaga/icon16.png"
          />
          <Advantage
            title="Тохиромжтой"
            desc="Дуудлагын дэлгэрэнгүй тайланг Dashboard /вэб орчинд/ хяналтын самбараас харах боломжтой"
            img="baiguullaga/icon17.png"
          />
          <Advantage
            title="Тохиромжтой"
            desc="Үйлчлүүлэгчдэдээ шаардлагатай мэдээллийг автомат хариулагчаар түргэн шуурхай хүргэж, ярианы бичлэгийг архивлах, сонсох, хянах боломжтой"
            img="baiguullaga/icon18.png"
          />
        </div>
      </div>
      {/* price plans */}
      <div className="relative my-[60px]">
        <h2 className="text-center text-2xl font-bold text-brand-1 my-4">
            Багцын тариф
        </h2>
        <p className="text-right">/НӨАТ орсон/</p>
        <h5 className="my-4 text-lg font-medium text-center">Физик кабел Call center</h5>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="STANDARD Багц" price={"50,000₮"} list={["Толгой дугаар", "Ажлын цагийн тохиргоо", "Автомат хариулагч", "Дуудлага шилжүүлэх", "Техникийн туслалцаа"]}/>
            <Price title="OPERATOR Багц" price={"150,000₮"} list={["Толгой дугаар", "Ажлын цагийн тохиргоо", "Автомат хариулагч", "Дуудлага шилжүүлэх", "Техникийн туслалцаа", "Операторын ачаалал хувиарлах", "Дуудлагыг бүлэглэн ангилах", "Дуудлагын түүх, тайлан", "Оператор түр завсарлах", "IVR хоолой"]}/>
        </div>
        <h5 className="my-4 text-lg font-medium text-center">Шилэн кабел Call center</h5>
        <div className="flex gap-8 justify-center flex-wrap">
            <Price title="S Багц" price={"50,000₮"} list={["Толгой дугаар", "Ажлын цагийн тохиргоо", "Автомат хариулагч", "Дуудлага шилжүүлэх", "Дотуур дугаар - 2ш", "Дуудлага хүлээлгэх - 2ш"]}/>
            <Price title="OPERATOR Багц" price={"150,000₮"} list={["Толгой дугаар", "Ажлын цагийн тохиргоо", "Автомат хариулагч", "Дуудлага шилжүүлэх", "Дотуур дугаар - 5ш", "Дуудлага хүлээлгэх - 5ш", "Дуудлагыг бүлэглэн ангилах", "Дуудлагын түүх, тайлан", "Оператор түр засварлах", "IVR хоолой бичүүлэх"]}/>
            <Price title="BUSINESS Багц" price={"350,000₮"} list={["Толгой дугаар", "Ажлын цагийн тохиргоо", "Автомат хариулагч", "Дуудлага шилжүүлэх", "Нөхцөл зааж дуудлага шилжүүлэх", "Хариу өгөөгүй тохиолдолд дуудлага шилжүүлэх", "Ажлын цагийн тохиргоо", "Яриа хийж байхад дуудлага шилжүүлэх", "Хяналтын самбар, тайлан статистик", "Дуудлагын түүх", "Дуудлагын түүх хадгалах хугацаа"]}/>
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
