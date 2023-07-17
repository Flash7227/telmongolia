import Caraosel from "@/components/caraosel";
import Shortcut from "@/components/shortcut";
import Slogans from "@/components/slogans";

const Home = () => {
  return (
    <div>
       <div className="mt-4 md:block">
        <Caraosel />
      </div>
      <div className="flex justify-center gap-4 md:gap-8 2xl:gap-16 flex-wrap items-center my-4 2xl:my-8">
        <Shortcut title="Төлбөр" desc="Төлөх" icon="payment.png" />
        <Shortcut title="Карт" desc="Авах" icon="card.png"/>
        <Shortcut title="Захиалга" desc="Өгөх" icon="order.png"/>
        <Shortcut title="Дугаар" desc="Захиалах" icon="number.png"/>
      </div>
      {/* <Slogans /> */}
    </div>
  );
}

export default Home;