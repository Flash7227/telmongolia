import Image from "next/image";
const Shortcut = ({title, desc, icon}:{title:string, desc:string, icon:string}) => {
    return (
        <div className="h-[180px] md:h-auto w-[140px] md:w-[220px] border border-brand-1/20 rounded-2xl overflow-hidden p-2 hover:shadow-lg hover:shadow-brand-1/40 cursor-pointer hover:-translate-y-2 transition-all duration-300 relative group flex items-center justify-center">
            {/* <div className="absolute right-0 bottom-0 w-[26px] h-[26px] z-10 bg-brand-2 rounded-full translate-x-[30px] group-hover:translate-x-0 transition-transform duration-500">
            </div> */}
            <ul className="flex flex-col md:flex-row justify-center items-center gap-2 2xl:gap-4 tracking-tight">
                <li className="relative h-14 w-14 2xl:h-[70px] 2xl:w-[70px] 2xl:my-1">
                    <Image src={"/assets/shortcuts/"+icon} fill alt={icon} className="object-contain"/>
                </li>
                <div className="flex flex-col justify-center items-center md:items-end w-[90px]">
                    <li className="text-lg font-semibold text-brand-1 uppercase">{title}</li>
                    <li className=" text-gray-700 text-sm text-right">{desc}</li>
                </div>
            </ul>
        </div>
    );
}

export default Shortcut;