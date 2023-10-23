"use client"
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  function domainToName(domain:number){
    if(domain == 1){
        return "Багц";
    }else if(domain == 3){
        return "КаТв";
    }else if(domain == 4){
        return "Интернет";
    }else if(domain ==  5){
        return "Утас";
    }else{
        return domain;
    }
  }
import Detail from "./detail";
const TableList = (props:any) => {
    const [selected, setSelected] = useState();
    function handleSelectedChange(){
        setSelected(undefined);
    }
    return (
        <>
                <Table className="text-[13px] text-[#797979] font-normal border mt-2 prepaid">
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Үйлчилгээний дугаар</TableHead>
            <TableHead>Үндсэн тариф</TableHead>
            <TableHead>Үйлчилгээний төрөл</TableHead>
            <TableHead>Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {props.productList &&
        props.productList.map((d: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{d["subs"]["userId"]}</TableCell>
              <TableCell>{d["subs"]["prodName"]}</TableCell>
              <TableCell>{domainToName(d["subs"]["svcDomain"])}</TableCell>
              <TableCell>
                  <div className="bg-brand-1/80 w-28 py-1 text-white rounded-md text-center hover:bg-brand-2/80 cursor-pointer" onClick={()=>setSelected(d["subs"]["userId"])}>Дэлгэрэнгүй</div>
              </TableCell>
          </TableRow>
          ))}
          </TableBody>
          </Table>
          {
            selected && <Detail selected={selected} handleSelectedChange={handleSelectedChange} token={props.token}/>
          }
        </>

    );
}

export default TableList;