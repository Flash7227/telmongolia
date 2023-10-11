import Image from "next/image";
import FormData from "./formData";
const Page = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-4 items-center justify-center my-4">
                <h5 className="text-white font-semibold tracking-tight">TV ROOM</h5>
                <Image src="/assets/images/products/iptv.png" alt="iptv" height={200} width={240}/>
                <h1 className="text-[28px] text-white tracking-tight font-semibold">Нууц үг сэргээх</h1>
                <FormData/>
            </div>
        </div>
    );
}

export default Page;