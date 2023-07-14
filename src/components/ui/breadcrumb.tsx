import { BiHomeAlt } from "react-icons/bi";
const Breadcrumb = ({data}:{data:any}) => {
    return (
        <div className="flex gap-2 items-center uppercase tracking-tight text-[14px] my-4">
            {/* <div className="after:content-['/'] after:pl-1 flex items-center gap-1 text-brand-1">
                <BiHomeAlt className="text-brand-1"/> Нүүр
            </div> */}
            {
                data.map((d:string, index:number)=>{
                    return <div key={index} className={`text-brand-1  ${index !== data.length-1 ? "after:content-['/'] after:pl-1" : "text-brand-3 font-semibold" }`}>
                        {d}
                    </div>;
                })
            }
        </div>
    );
}

export default Breadcrumb;