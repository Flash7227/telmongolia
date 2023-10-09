"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { BiDownload, BiQr } from "react-icons/bi";
import Loader from "@/components/ui/loader";
import Payment from "./payment";

const History = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState();

  const handleClose = () => {
    props.onHistoryClose(false);
  };
  const fetch = async () => {
    setLoading(true);
    const res = await InvoiceHistory(props.custId, props.token);
    setLoading(false);
    setData(res["data"]);
  };
  useEffect(() => {
    fetch();
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
  return (
    <Dialog open={props.open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px] max-h-[440px] overflow-y-scroll">
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
                                <a href={`${process.env.API}/ppd_invoice.php?id=${d['ID']}`} download={true} className="flex gap-1 text-[14px] bg-brand-1 items-center px-4 py-2 rounded-md text-white hover:bg-brand-1/80"><BiDownload/> Татах</a>
                                <Button className="flex gap-1 text-[14px]" onClick={()=>paymentType(d["ID"])}><BiQr/>Төлөх</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            }

        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default History;
