"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"

import { useState, useEffect } from "react";
import { InvoiceHistory } from "@/api/rest";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BiDownload, BiQr, BiTrash } from "react-icons/bi";
import Loader from "@/components/ui/loader";
import Payment from "./payment";
import { removeInvoiceApi } from "@/api/rest";
import { useToast } from "@/components/ui/use-toast"

const History = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState();
  const [invoiceRemove, setInvoiceRemove] = useState();
  const { toast } = useToast()

  const handleClose = () => {
    props.onHistoryClose(false);
  };
  const fetchData = async () => {
    setLoading(true);
    const res = await InvoiceHistory(props.custId, props.token);
    setLoading(false);
    setData(res["data"]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const findTotal = (d: string) => {
    let temp = JSON.parse(d);
    temp = temp['charge'];
    let total = 0;
    for (const key in temp) {
      total += temp[key]["vatAmt"];
      total += temp[key]["amount"];
    }
    return total;
  };
  const paymentType = async (id:any) => {
    setInvoiceId(id);
  }
  const onCardClose = () => {
    setInvoiceId(undefined);
  }
  const invoiceDelete = async () => {
    setLoading(true);
    const res = await removeInvoiceApi(invoiceRemove, props.custId, props.token);
    setLoading(false);
    if(res){
      toast({
        title: res['result'],
        description: res['message'],
      })
      if(res['result'] == 'ok'){
        setInvoiceRemove(undefined);
        fetchData();
      }
    }
  }
  return (
    <Dialog open={props.open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[800px] max-h-[440px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Нэхэмжлэхийн түүх</DialogTitle>
            {
              invoiceId ?
              <Payment invoiceId={invoiceId} token={props.token} onCardClose={onCardClose}/>
              :
              <div>
                {loading && <Loader />}
                <Table className="text-center">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] text-center">
                        Үүсгэсэн огноо
                      </TableHead>
                      <TableHead className="text-center">Дүн</TableHead>
                      <TableHead className="text-center">Үйлдэл</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data &&
                      data.map((d: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{d["CR_DATE"]}</TableCell>
                          <TableCell>{findTotal(d["CHARGE_DETAIL"])}₮</TableCell>
                          <TableCell>
                            <div className="flex gap-2 justify-center">
                                {/* <Button className="flex gap-1 text-[14px]" onClick={()=>downloadInvoice(d["ID"])}><BiDownload/> Татах</Button> */}
                                <Button className="flex gap-1 text-[14px] border-red-400 text-red-400 hover:text-white hover:bg-red-400" size="sm" onClick={()=>setInvoiceRemove(d["ID"])} variant={"outline"}><BiTrash/>Устгах</Button>
                                <a href={`${process.env.API}/ppd_invoice.php?id=${d['ID']}`} download={true} className="flex gap-1 text-[14px] bg-brand-1 items-center px-4 py-2 rounded-md text-white hover:bg-brand-1/80"><BiDownload/> Татах</a>
                                <Button className="flex gap-1 text-[14px]" size="sm" onClick={()=>paymentType(d["ID"])}><BiQr/>Төлөх</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            }

        </DialogHeader>
            <AlertDialog open={invoiceRemove ? true : false} onOpenChange={()=>setInvoiceRemove(undefined)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Та итгэлтэй байна уу?</AlertDialogTitle>
              <AlertDialogDescription>
                Та уг нэхэмжлэхийг устгах гэж байна.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Болих</AlertDialogCancel>
              <Button onClick={invoiceDelete}>Устгах</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogContent>
    </Dialog>
  );
};
export default History;
