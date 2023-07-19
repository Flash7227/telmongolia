import Image from "next/image";
import Shortcut from "@/components/shortcut";
const Slogans = () => {
    return (
        <div className="relative bg-transparent min-h-[220px] text-center bg-gradient-to-r from-[#135EA5] from-10% to-[#00AFEF] to-100% font-bold  tracking-tight w-full">
        
            <div className="relative h-full w-full z-20 py-10">
                {/* <h1 className=" text-slate-50 text-2xl mb-4 max-w-[400px] mx-auto">Харилцаа бүрийг холбоно.</h1> */}
                <p className="text-base text-slate-200/80">Бид танд</p>
                <h5 className="text-slate-50 text-5xl">Хамгийн найдвартай</h5>
                <p className="text-4xl uppercase text-sky-400 font-bold mt-2">Суурин утас</p>
                    
        {/* <div className="flex justify-center gap-4 md:gap-8 2xl:gap-10 flex-wrap items-center">
          <Shortcut title="Төлбөр" desc="Төлөх" icon="payment.png" />
          <Shortcut title="Карт" desc="Авах" icon="card.png"/>
          <Shortcut title="Захиалга" desc="Өгөх" icon="order.png"/>
          <Shortcut title="Дугаар" desc="Захиалах" icon="number.png"/>
        </div> */}
            </div>
            <div className="absolute w-full bottom-[-1px] z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path className="fill-slate-50 z-0" d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"></path>
                </svg>
            </div>
            <div className="absolute inset-0 z-10">
                <Image src="/assets/images/overlay.png" fill alt="overlay" className="object-contain"/>
            </div>
        </div>
    );
}

export default Slogans;