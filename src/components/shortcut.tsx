import Image from "next/image";
const Shortcut = ({title, desc, icon}:{title:string, desc:string, icon:string}) => {
    return (
        <div className="w-[160px] md:w-[240px] border border-brand-1/20 rounded-2xl  overflow-hidden p-2 hover:shadow-lg hover:shadow-brand-1/30 cursor-pointer hover:-translate-y-2 transition-all">
            <ul className="flex flex-col justify-center items-center gap-4 tracking-tight">
                <li className="h-20 md:h-6 2xl:h-12 text-lg font-semibold text-slate-800 text-center">{title}</li>
                <li className="relative h-16 w-16">
                    <Image src={"/assets/shortcuts/"+icon} fill alt={icon} className="object-contain"/>
                </li>
                <li className="h-[100px] md:h-[54px] text-center text-gray-700 text-sm">{desc}</li>
            </ul>
        </div>
    );
}

export default Shortcut;