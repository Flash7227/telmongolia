import Link from "next/link";
const Footer = () => {
    return (
        <div className="border-t border-brand-1/20 text-slate-50 text-xs bg-brand-1">
            <div className="container md:flex items-center justify-between py-3">
                <ul className="hidden md:flex flex-wrap gap-2">
                    <Link href="/aboutus" className="md:border-r border-slate-50 pr-2">
                        <li>Бидний тухай</li>
                    </Link>
                    <Link href="https://shilendans.gov.mn/organization/42441" target="_blank" rel="noreferrer" className="md:border-r border-slate-50 pr-2">
                        <li>Шилэн данс</li>
                    </Link>
                    <Link href="/shareholders" className="md:border-r border-slate-50 pr-2">
                        <li>Хувьцаа эзэмшигчдэд</li>
                    </Link>
                    <Link href="/company" className="md:border-r border-slate-50 pr-2">
                        <li>Компанийн засаглал</li>
                    </Link>
                    <Link href="/locations" className="md:border-r border-slate-50 pr-2">
                        <li>Салбарын байршил</li>
                    </Link>
                    <Link href="/hr" className="md:border-r border-slate-50 pr-2">
                        <li>Хүний нөөц</li>
                    </Link>
                    <Link href="/contact" className="pr-2">
                        <li>Холбоо барих</li>
                    </Link>
                </ul>
                <ul className="text-xs text-center">
                    <li>© 1921 - 2023 Монголын Цахилгаан Холбоо ХК</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;