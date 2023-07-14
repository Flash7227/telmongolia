import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";

const Home = () => {
  return (
    <div>
       <div className="mt-4 hidden md:block">
        <Caraosel />
      </div>
      <div className="flex justify-center gap-4 md:gap-8 2xl:gap-16 flex-wrap items-center my-4 2xl:my-8">
        <Shortcut title="Төлбөр Төлөх" desc="Төлбөрөө төлөх хялбар шийдэл" icon="payment.png" />
        <Shortcut title="Карт авах" desc="Картын дугаарыг авах эсвэл шууд утсаа цэнэглэх" icon="card.png"/>
        <Shortcut title="Захиалга өгөх" desc="Сонирхож буй үйлчилгээгээ авч болох эсэхийг шалгуулах" icon="order.png"/>
        <Shortcut title="Дугаар захиалах" desc="Хүссэн дугаараа 5 хоногын хугацаанд захиалж хадгалах" icon="number.png"/>
      </div>
     
      
    </div>
  );
}

export default Home;