import Image from "next/image";
const Shortcut = ({title, desc, icon}:{title:string, desc:string, icon:string}) => {
    return (
        <div className="w-[240px] border border-brand-1/20 rounded-2xl p-2 hover:shadow-md hover:shadow-brand-2/30 cursor-pointer hover:-translate-y-2 transition-all">
            <ul className="flex flex-col justify-center items-center gap-4 tracking-tight">
                <li className="text-lg font-semibold text-slate-800">{title}</li>
                <li className="relative h-16 w-16">
                    <Image src={"/assets/shortcuts/"+icon} fill alt={icon} className="object-contain"/>
                </li>
                <li className="h-[54px] text-center text-gray-700 text-sm">{desc}</li>
            </ul>
        </div>
    );
}

export default Shortcut;