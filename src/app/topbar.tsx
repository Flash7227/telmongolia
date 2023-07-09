import Link from "next/link";
import { BiGlobe } from "react-icons/bi";
const Topbar = () => {
    return (
        <div className="hidden md:block bg-gradient-to-r from-[#135EA5] from-10% to-[#00AFEF] to-100%">
            <div className="container text-slate-50 flex justify-between items-center tracking-tight">
                <ul className="flex gap-4 text-xs py-2">
                    <Link href="/">MTC Service</Link>
                    <Link href="/">MTC Acadamy</Link>
                    <Link href="/">Data center</Link>
                    <Link href="/">TVROOM</Link>
                    <Link href="/">Үндэсний лавлах 1109</Link>
                </ul>
                <ul className="text-lg">
                    <li>
                        <BiGlobe />
                    </li>
                </ul>
            </div>
            
        </div>
    );
}

export default Topbar;