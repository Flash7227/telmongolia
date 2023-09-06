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
import { InvoiceDownload } from "@/api/rest";
import { InvoicePay } from "@/api/rest";

const History = (props: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const temp = JSON.parse(d);
    let total = 0;
    for (const key in temp) {
      total += temp[key]["vatAmt"];
      total += temp[key]["amount"];
    }
    return total;
  };
  const downloadInvoice = async (id:number) => {
    setLoading(true);
    const res = await InvoiceDownload(props.custId, id, props.token);
    setLoading(true);
    console.log(res);
  }
  const payInvoice = async (id:number) => {
    setLoading(true);
    const res = await InvoicePay(props.custId, id, props.token);
    setLoading(true);
    console.log(res);
  }
  return (
    <Dialog open={props.open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px] max-h-[440px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Нэхэмжлэхийн түүх</DialogTitle>
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
                        <TableCell>{d["cr_date"]}</TableCell>
                        <TableCell>{findTotal(d["charge"])}₮</TableCell>
                        <TableCell>
                            <div className="flex gap-2 justify-center">
                                <Button className="flex gap-1 text-[14px]" onClick={()=>downloadInvoice(d["id"])}><BiDownload/> Татах</Button>
                                <Button className="flex gap-1 text-[14px]" onClick={()=>payInvoice(d["id"])}><BiQr/>Төлөх</Button>
                            </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default History;
