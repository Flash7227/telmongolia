"use client";
import { useState, useEffect } from "react";
import { pstGetProductList } from "@/api/rest";
import { Button } from "@/components/ui/button";
import TableList from "./tableList";

const Postpaid = (props: any) => {
  const [productList, setProductList] = useState();
  const getProductList = async () => {
    const res = await pstGetProductList(props.custId, props.token);
    setProductList(res["data"]);
  };
  useEffect(() => {
    getProductList();
  }, []);
  const downloadInvoice = () => {};
  return (
    <div>
      {productList && (
        <>
          <TableList productList={productList['pst']} token={props.token}/>
          <div className="flex justify-end gap-2 my-2">
            <a href={`${process.env.API}/pst_invoice.php?bill_id=${productList['pst'][0]['subs']['billAcntId']}`} download={true} className="bg-brand-1 text-white flex justify-center items-center px-2 rounded-md hover:bg-brand-1/90 transition-colors">Нэхэмлэх татах</a>
            <Button>Төлбөр төлөх - {productList['amount']}₮</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Postpaid;
