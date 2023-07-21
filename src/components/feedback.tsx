import { AiFillFacebook, AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import Link from "next/link";

const Feedback = () => {
    return (
        <div className="hidden fixed top-1/2 right-0 mr-4 lg:flex flex-col z-40">
            <ul className="text-[30px] 2xl:text-[36px] flex flex-col gap-1 -mt-12 bg-slate-100 rounded-2xl p-2">
                <Link href="https://www.facebook.com/TelecomMongoliaCompany/"
                    target="_blank"
                    rel="noreferrer">
                    <AiFillFacebook className="text-[#4267B2]"/>
                </Link>
                <Link href="https://www.youtube.com/@odgerelgan"
                    target="_blank"
                    rel="noreferrer">
                    <AiFillYoutube className="text-[#FF0000]"/>
                </Link>
                <Link href="https://twitter.com/mtc_telecom"
                    target="_blank"
                    rel="noreferrer">
                    <AiOutlineTwitter className="text-[#00acee]"/>
                </Link>
            </ul>
            {/* <div className="relative mt-10">
                <button className="-rotate-90 bg-sky-500 hover:bg-brand-2/80 rounded-sm text-slate-50 px-2 py-1 absolute right-0 -mr-7 text-[14px]">
                    Feedback
                </button>
            </div> */}
           
        </div>
    );
}

export default Feedback;