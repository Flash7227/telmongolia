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

const Prepaid = (props: any) => {
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
  function calculate() {
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
    for (var key of Object.keys(bulkArr)) {
      const el = document.querySelectorAll("span[id='"+ key + "']");
      el[0].innerHTML = bulkArr[key]['amount'];
  }
    const finishedArr = Object.values(bulkArr);
    // console.log(finishedArr);
    const res = bulkCalculate(props.custId, finishedArr, props.token);
    console.log(res);
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
    } else {
      if (!numberPatter.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  return (
    <div>
      <Table className="text-[13px] text-[#797979] font-normal">
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Үйлчилгээний дугаар</TableHead>
            <TableHead>Үндсэн тариф</TableHead>
            <TableHead>Дансны үлдэгдэл</TableHead>
            <TableHead>Дуусах огноо</TableHead>
            <TableHead>Суурь хураамж</TableHead>
            <TableHead>Сунгах сар</TableHead>
            <TableHead>Хэрэглээ</TableHead>
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
                />
              </TableCell>
              <TableCell>
                <Input
                  className="w-[100px] h-[30px] bulkremains"
                  name={d["subs"]["userId"]}
                  onKeyDown={checkInput}
                />
              </TableCell>
              <TableCell>
                <span id={d["subs"]["userId"]}>0</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-right">
        <Button onClick={() => calculate()}>Бодох</Button>
      </div>
    </div>
  );
};

export default Prepaid;
