import Image from "next/image";
const Shortcut = ({title, desc, icon}:{title:string, desc:string, icon:string}) => {
    return (
        <div className="w-[140px] md:w-[200px] border border-brand-1/20 rounded-2xl  overflow-hidden p-2 shadow-lg shadow-brand-1/30 cursor-pointer hover:-translate-y-2 transition-all">
            <ul className="flex flex-col justify-center items-center gap-2  2xl:gap-4 tracking-tight">
                <li className="h-20 md:h-8 text-lg font-semibold text-slate-800 text-center">{title}</li>
                <li className="relative h-14 w-14 2xl:h-16 2xl:w-16 2xl:my-1">
                    <Image src={"/assets/shortcuts/"+icon} fill alt={icon} className="object-contain"/>
                </li>
                <li className="h-[100px] md:h-[60px] 2xl:h-[70px] text-center text-gray-700 text-sm">{desc}</li>
            </ul>
        </div>
    );
}

export default Shortcut;