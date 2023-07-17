import Image from "next/image";
const Slogans = () => {
    return (
        <div>
            <div className="relative h-[40px] w-full">
                <Image src="/assets/images/motto.png" fill alt="motto" className="object-contain"/>
            </div>
        </div>
    );
}

export default Slogans;