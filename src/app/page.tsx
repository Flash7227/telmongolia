import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";
import Slogans from "@/components/slogans";

const Home = () => {
  return (
    <div>
        <Slogans />
      <div className="container">
        <div className="max-w-[940px] mx-auto my-4">
          <Caraosel />
        </div>
        <div className="flex justify-center gap-4 md:gap-8 2xl:gap-12 flex-wrap items-center mb-4 2xl:my-8">
          <Shortcut title="Төлбөр" desc="Төлөх" icon="payment.png" />
          <Shortcut title="Карт" desc="Авах" icon="card.png"/>
          <Shortcut title="Захиалга" desc="Өгөх" icon="order.png"/>
          <Shortcut title="Дугаар" desc="Захиалах" icon="number.png"/>
        </div>
   
      </div>
    </div>
  );
}

export default Home;