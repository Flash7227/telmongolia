import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Breadcrumb from "@/components/ui/breadcrumb";
import { getWorkPlace } from "@/api/rest";
import { format_date } from "@/lib/helper";

const breadcrumb = ["Хүний нөөц"];

const Page = async () => {
    function isExpired(d:any){
        var current = Math.floor(new Date().getTime() / 1000);
        var exp = Math.floor(new Date(d).getTime() / 1000);
        if(exp < current){
          return false;
        }
        return true;
      }

    var works = await getWorkPlace();
    if(works){
        works = await (works.data).filter((each:any) => isExpired(each.expires_at));
    }
    return (
        <div>
              <Breadcrumb data={breadcrumb} />
              <Table>
                <TableCaption>Нээлттэй ажлын байрны жагсаалт</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead>id</TableHead>
                    <TableHead>Ажлын байрны нэр</TableHead>
                    <TableHead>Алба</TableHead>
                    <TableHead className="w-[440px]">Гүйцэтгэх үндсэн үүрэг</TableHead>
                    <TableHead className="w-[100px]">Дуусах огноо</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        works && 
                        works.map((d:any, index:number)=>(
                            <TableRow key={index}>
                                <TableCell className="font-medium">{d.workplace_id}</TableCell>
                                <TableCell>{d.workplace_name}</TableCell>
                                <TableCell>{d.workplace_type}</TableCell>
                                <TableCell>{d.workplace_role}</TableCell>
                                <TableCell>{format_date(d.expires_at)}</TableCell>
                            </TableRow>
                        ))
                    }
             
                </TableBody>
                </Table>
        </div>
    );
}

export default Page;