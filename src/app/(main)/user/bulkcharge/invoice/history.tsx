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

const History = (props: any) => {
  const [data, setData] = useState([]);
  const handleClose = () => {
    props.onHistoryClose(false);
  };
  const fetch = async () => {
    const res = await InvoiceHistory(props.custId, props.token);
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
  return (
    <Dialog open={props.open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px] max-h-[440px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Нэхэмжлэхийн түүх</DialogTitle>
            <div>
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
                                <Button className="flex gap-1 text-[14px]"><BiDownload/> Татах</Button>
                                <Button className="flex gap-1 text-[14px]"><BiQr/>Төлөх</Button>
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
