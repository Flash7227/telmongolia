import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { FaRegFilePdf } from "react-icons/fa";
  
const PdfTable = ({list}:{list:string[][]}) => {
    return (
        <div>
            <Table>
            <TableCaption>Жагсаалт</TableCaption>
            {/* <TableHeader>
                <TableRow>
                <TableHead className="w-[20px]"></TableHead>
                <TableHead>Нэр</TableHead>
                <TableHead className="w-[180px]">Үзэх</TableHead>
                </TableRow>
            </TableHeader> */}
            <TableBody>
                {
                    list.map((d, index:number)=>(
                        <TableRow key={index}>
                            <TableCell className="w-[60px]"><FaRegFilePdf className="text-[22px] text-[#f40f02]"/></TableCell>
                            <TableCell className="text-[14px] tracking-tight font-normal">{d[0]}</TableCell>
                            <TableCell className="w-[100px]">
                                <a className="bg-brand-1 hover:bg-brand-2 transition-colors px-4 py-2 text-slate-50 rounded-2xl" 
                                href={d[1].includes('http')? d[1] :'/assets/company/'+ d[1]} target="_blank" rel="noreferrer">Үзэх</a>
                            </TableCell>
                        </TableRow>
                    ))
                }
  
            </TableBody>
            </Table>
        </div>
    );
}

export default PdfTable;