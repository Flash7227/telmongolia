import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Calculated = (props:any) => {
    return (
        <div>
            <p>Төлбөр</p>
<Table className="max-w-[740px] border text-[13px]">
  <TableHeader className="bg-gray-200">
    <TableRow>
      <TableHead className="max-w-[140px]">Бараа</TableHead>
      <TableHead>Дүн (НӨАТ-гүй)</TableHead>
      <TableHead className="max-w-[140px]">НӨАТ</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        props.data && 
        // <div>{JSON.stringify(props.data)}</div>
        (props.data['charge']).map((d:any, index:number)=>(
            <TableRow>
                <TableCell>{d['pymCdName']}</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
          </TableRow>
        ))
    }

  </TableBody>
</Table>
        </div>
    )
}

export default Calculated;