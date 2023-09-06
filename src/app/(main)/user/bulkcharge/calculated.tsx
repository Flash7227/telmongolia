"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { newInvoicePrepaid } from "@/api/rest";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { bulkPay } from "@/api/rest";
import Payment from "./payment";


const Calculated = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { toast } = useToast()

  const findAmount = () => {
    let total = 0;
    if (props.data) {
      for (const key in props.data["charge"]) {
        total += props.data["charge"][key]["amount"];
      }
    }
    
    return total.toFixed(2);
  };
  const findVat = () => {
    let total = 0;
    if (props.data) {
      for (const key in props.data["charge"]) {
        total += props.data["charge"][key]["vatAmt"];
      }
    }
    return total.toFixed(2);
  };
  const findTotal = () => {
    let total = 0;
    if (props.data) {
      for (const key in props.data["charge"]) {
        total += props.data["charge"][key]["vatAmt"];
        total += props.data["charge"][key]["amount"];
      }
    }
    return total.toFixed(2);
  };
  const newInvoice = async () => {
    const res = await newInvoicePrepaid(props.custId, props.data, props.token);
    // console.log(res);
    toast({
      title: res['result'],
      description: res['message'] + ' Та үүссэн нэхэмжлэхээ нэхэмжлэх түүх товчийг даран шалгана уу!',
      duration: 15000
    })
  }

  return (
    <div>
      {isPaymentOpen && <Payment onCardClose={()=>setIsPaymentOpen(false)} custId={props.custId} token={props.token} data={props.data}/>}
      <p>Төлбөр</p>

      <div className="flex justify-center gap-2 flex-wrap md:flex-nowrap">
        <Table className="max-w-[740px] border text-[13px]">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="max-w-[140px]">Бараа</TableHead>
              <TableHead>Дүн (НӨАТ-гүй)</TableHead>
              <TableHead className="max-w-[140px]">НӨАТ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data &&
              // <div>{JSON.stringify(props.data)}</div>
              props.data["charge"].map((d: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{d["pymCdName"]}</TableCell>
                  <TableCell>{d["amount"]}</TableCell>
                  <TableCell>{d["vatAmt"]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="min-w-[400px]">
          <table className="text-right text-[14px]">
            <tbody>
              <tr>
                <td className="p-2">Төлөх дүн</td>
                <td className="p-2 border w-[160px]">{findAmount()}</td>
              </tr>
              <tr>
                <td className="p-2">НӨАТ</td>
                <td className="p-2 border">{findVat()}</td>
              </tr>
              <tr className="font-semibold text-brand-1">
                <td className="p-2">Төлөх дүн(НӨАТ орсон)</td>
                <td className="p-2 border">{findTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex mt-4 justify-end gap-2">
          <Button onClick={()=>setIsOpen(true)}>Нэхэмжлэх үүсгэх</Button>
          <Button onClick={()=>setIsPaymentOpen(true)}>Төлбөр төлөх</Button>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Та нэхэмжлэл үүсгэх гэж байна уу?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Үгүй</AlertDialogCancel>
            <AlertDialogAction onClick={newInvoice}>Тийм</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Calculated;
