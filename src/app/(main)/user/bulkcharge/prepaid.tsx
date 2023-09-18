import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format_date3 } from "@/lib/helper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { bulkCalculate } from "@/api/rest";
import Calculated from "./calculated";
import { useState, useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import History from "./invoice/history";

const Prepaid = (props: any) => {
  interface calculatedType{
    charge: [],
    chargeDetail: [],
    custId: number,
    custType: string
  }
  const [calculatedData, setCalculatedData] = useState<calculatedType>();
  const [isChanged, setIsChanged] = useState(true);
  const [invoiceHistory, setInvoiceHistory] = useState(false);
  const [beforeCalculation, setBeforeCalculation] = useState<any>([]);
  
  useEffect(()=>{
    if(calculatedData){
        const fresh = document.querySelectorAll(".prepaid span");
        for (var i = 0; i < fresh.length; i++) {
          fresh[i].innerHTML = (0).toString();
        }
          for (var each of calculatedData['chargeDetail']) {
              let lastAmount = 0;
              let lastDiscount = 0;
              let pymCdName:string;
              pymCdName = each['pymCdName'];
              if(pymCdName.includes('discount')){
                const el = document.querySelectorAll("span[id='discount-"+ each['userId'] + "']");
                // console.log('discount here', el[0].innerHTML, each['amount']);
                lastDiscount += parseInt(el[0].innerHTML);
                lastDiscount += each['amount'];
                el[0].innerHTML = lastDiscount.toString();
              }else{
                const el = document.querySelectorAll("span[id='"+ each['userId'] + "']");
                lastAmount += parseInt(el[0].innerHTML);
                lastAmount += each['amount'] + each['vatAmt'];
                el[0].innerHTML = lastAmount.toString();
              }
          }
    }
  },[calculatedData]);

  function domainName(d: any) {
    if (d === 5) {
      return "Суурин утас";
    } else if (d === 4) {
      return "Интернэт";
    } else if (d === 3) {
      return "КаТВ";
    } else if (d === 1) {
      return "Багц";
    }
  }
  function stateToWord(d: any) {
    if (d === 1 || d === 11) {
      return "Идэвхтэй";
    } else if (d === 3 || d === 15) {
      return "Гарах ярианы эрх хаагдсан";
    } else if (d === 8 || d === 16) {
      return "Орох ярианы эрх хаагдсан";
    } else if (d === 20) {
      return "Цуцлагдсан";
    } else if (d === 19) {
      return "Түр тасалсан / Хадгалсан";
    } else if (d === 0) {
      return "Хоосон";
    } else {
      return d;
    }
  }
  const calculate = async () => {
    interface tempInterface{
      user_id: string,
      subs_id: string,
      numOfRecurring: number,
      amount: number
    }
    const bulkmonths = document.getElementsByClassName("bulkmonth");
    let bulkArr = {} as any;
    for (var i = 0; i < bulkmonths.length; i++) {
      if ((bulkmonths[i] as HTMLInputElement).value) {
        if (parseInt((bulkmonths[i] as HTMLInputElement).value) > 0) {
          const filtered = props.data.filter(
            (d: any, index: number) =>
              d["subs"]["userId"] === (bulkmonths[i] as HTMLInputElement).name
          );
          let temp = {} as tempInterface;
          if (filtered.length === 1) {
            temp = {
              user_id: (bulkmonths[i] as HTMLInputElement).name,
              subs_id: filtered[0]['subs']['subsId'],
              numOfRecurring: parseInt(
                (bulkmonths[i] as HTMLInputElement).value
              ),
              amount:
                parseInt(filtered[0]["recurring"]["monthlyFee"]) *
                parseInt((bulkmonths[i] as HTMLInputElement).value),
            };
          }
          Object.assign(bulkArr, {
            [(bulkmonths[i] as HTMLInputElement).name]: temp,
          });
        }
      }
    }
    const bulkremains = document.getElementsByClassName("bulkremains");
    for (var i = 0; i < bulkremains.length; i++) {
      if ((bulkremains[i] as HTMLInputElement).value) {
        if (parseInt((bulkremains[i] as HTMLInputElement).value) > 0) {
          const filtered = props.data.filter(
            (d: any, index: number) =>
              d["subs"]["userId"] === (bulkremains[i] as HTMLInputElement).name
          );
          let temp = {} as tempInterface;
          if (filtered.length === 1) {
            if (
              bulkArr[
                (bulkremains[i] as HTMLInputElement)
                  .name as keyof typeof bulkArr
              ]
            ) {
              bulkArr[(bulkremains[i] as HTMLInputElement).name as keyof typeof bulkArr]['amount'] +=  parseInt((bulkremains[i] as HTMLInputElement).value);
            } else {
              temp = {
                user_id: (bulkremains[i] as HTMLInputElement).name,
                subs_id: filtered[0]['subs']['subsId'],
                numOfRecurring: 0,
                amount: parseInt((bulkremains[i] as HTMLInputElement).value)
              };
              Object.assign(bulkArr, {
                [(bulkremains[i] as HTMLInputElement).name]: temp,
              });
            }
          }
        }
      }
    }
    // console.log(bulkArr);
    const finishedArr = Object.values(bulkArr);
    if(finishedArr.length > 0){
      const res = await bulkCalculate(props.custId, finishedArr, props.token);
      setBeforeCalculation(finishedArr);
      setCalculatedData(res['data']['objects']);
      setIsChanged(false);
    }else{
      refreshFileds();
    }

    // console.log(res);
  }
  const refreshFileds = async () => {
    const fresh = document.querySelectorAll(".prepaid span");
        for (var i = 0; i < fresh.length; i++) {
          fresh[i].innerHTML = (0).toString();
        }
  }

  function checkInput(e: any) {
    // console.log(e);
    if (e.key == "Backspace") {
      return;
    }
    const cyrillicPattern = /^\d+$/;
    // const englishAlphabetAndWhiteSpace = /[A-Za-z ]/g;
    const numberPatter = /^([-0-9])| +$/; //with space, and dash
    if (cyrillicPattern.test(e.key)) {
      // console.log('mn');
      setIsChanged(true);
    } else {
      if (!numberPatter.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  return (
    <div className="mt-2">
      {invoiceHistory && <History onHistoryClose={()=>setInvoiceHistory(false)} open={invoiceHistory} custId={props.custId} token={props.token}/>}
      <div className="border p-2">
      <div className="flex justify-between">
          <Button onClick={()=>setInvoiceHistory(true)}>Нэхэмжлэх түүх</Button>
          <Button onClick={() => calculate()}>Бодох</Button>
        </div>
        <Table className="text-[13px] text-[#797979] font-normal border mt-2 prepaid">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Үйлчилгээний дугаар</TableHead>
              <TableHead>Үндсэн тариф</TableHead>
              <TableHead>Дансны үлдэгдэл</TableHead>
              <TableHead>Дуусах огноо</TableHead>
              <TableHead>Суурь хураамж</TableHead>
              <TableHead>Сунгах сар</TableHead>
              <TableHead>Хэрэглээ</TableHead>
              <TableHead>Хөнгөлөлт</TableHead>
              <TableHead>Төлөх дүн</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.data.map((d: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{d["subs"]["userId"]}</TableCell>
                <TableCell>{d["subs"]["prodName"]}</TableCell>
                {/* <TableCell>{domainName(d['subs']['svcDomain'])}</TableCell> */}
                <TableCell>{d["account"]["remains"]}</TableCell>
                <TableCell>
                  {format_date3(d["account"]["lifecycle"]["accExpireAt"])}
                </TableCell>
                <TableCell>{d["recurring"]["monthlyFee"]}</TableCell>
                <TableCell>
                  <Input
                    className="w-[80px] h-[30px] bulkmonth"
                    name={d["subs"]["userId"]}
                    onKeyDown={checkInput}
                    onChange={()=>setIsChanged(true)}
                    maxLength={2}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="w-[100px] h-[30px] bulkremains"
                    name={d["subs"]["userId"]}
                    onKeyDown={checkInput}
                    onChange={()=>setIsChanged(true)}
                    maxLength={7}
                  />
                </TableCell>
                   
                <TableCell>
                  <span id={'discount-'+d["subs"]["userId"]}>0</span>
                </TableCell>
                <TableCell>
                  <span id={d["subs"]["userId"]}>0</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="border p-2 my-4 relative">
        <div className={`cursor-pointer absolute bg-gray-200 opacity-80 inset-0 ${!isChanged && 'hidden'}`} onClick={calculate}>
        </div>
        <p onClick={calculate} className={`cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg tracking-tight ${!isChanged && 'hidden'} flex gap-1 items-center`}><BiRefresh className="text-2xl"/>Бодолт хийх</p>
        <Calculated data={calculatedData} custId={props.custId} token={props.token} beforeCalculation={beforeCalculation}/>
      </div>
    </div>
  );
};

export default Prepaid;
