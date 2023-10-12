"use client";
import { getUserInfo } from "@/api/rest";
import {
  BiMobile,
  BiAt,
  BiCurrentLocation,
  BiListCheck,
  BiSolidUserCircle,
} from "react-icons/bi";
import Image from "next/image";
import EditInfo from "./editInfo";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { verifyEbarimtApi } from "@/api/rest";
import { useToast } from "@/components/ui/use-toast"

const Info = ({
  userId,
  token,
  custId,
}: {
  userId: string;
  token: string;
  custId: string;
}) => {
  const [userInfo, setUserInfo] = useState();
  const [chargeOpen, setChargeOpen] = useState("");
  const [verifyOpen, setVerifyOpen] = useState(false);
  const { toast } = useToast()

  const getData = async () => {
    const temp = await getUserInfo({ userId, token });
    if (temp["result"] != "error") {
      setUserInfo(temp);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleEdit = async () => {
    getData();
  };
  const openBulkCharge = () => {
    setChargeOpen(custId);
  };
  async function verifyEbarimt(ebarimt_id:any, cust_id:number){
    const res = await verifyEbarimtApi(ebarimt_id, cust_id, token);
    if(res){
      toast({
        title: res['result'],
        description: res['message'],
      })
      if(res['result'] == 'ok'){
        setVerifyOpen(false);
        getData();
      }
    }
  }
  return (
    <div className="border border-slate-50 p-2 rounded-2xl shadow-sm shadow-brand-1/30 w-[400px]">
      {userInfo && (
        <div>
          <h1 className="flex items-center justify-center gap-2 text-3xl text-brand-1 font-medium my-4">
            <BiSolidUserCircle />
            {userInfo["data"]["name"]}
          </h1>
          <ul className="flex items-start mt-4 text-[14px]">
            <li className="flex-1 flex flex-col justify-center items-center text-center">
              <label className="text-brand-1 mb-4 font-medium">Нэр</label>
              {userInfo["data"]["custName"]}
            </li>
            <li className="flex-1 flex flex-col justify-center items-center text-center">
              <label className="text-brand-1 mb-4 font-medium">
                Гэрээний дугаар
              </label>
              {userInfo["data"]["cust_id"]}
            </li>
          </ul>
          <table className="w-[340px] mx-auto text-sm tracking-tight mt-4">
            <tbody>
              <tr>
                <td className="p-2 py-4">
                  <BiMobile className="text-xl text-brand-1" />
                </td>
                <td>{userInfo["data"]["number"]}</td>
                <td>
                  <EditInfo
                    type="mobile"
                    custId={userInfo["data"]["cust_id"]}
                    onEdit={handleEdit}
                    oldvalue={userInfo["data"]["number"]}
                    token={token}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 py-4">
                  <BiAt className="text-xl text-brand-1" />
                </td>
                <td>{userInfo["data"]["email"]}</td>
                <td>
                  <EditInfo
                    type="email"
                    custId={userInfo["data"]["cust_id"]}
                    onEdit={handleEdit}
                    oldvalue={userInfo["data"]["email"]}
                    token={token}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2 py-4">
                  <BiCurrentLocation className="text-xl text-brand-1" />
                </td>
                <td>{userInfo["data"]["address"]}</td>
                <td></td>
              </tr>
              {/* {
                userInfo["data"]["custType"] == 'PSN'
                &&
                <tr>
                <td className="relative h-5 w-5">
                  <Image
                    src="/assets/images/ebarimt.svg"
                    fill
                    alt="ebarimt"
                    className="p-1 object-cover"
                  />
                </td>
                <td className="py-4">
                  {userInfo["data"]["ebarimt_id"] !== null
                    ? userInfo["data"]["ebarimt_id"]
                    : "Ebarimt автомат бүртгэл"}
                </td>
                <td>
                  <EditInfo
                    type="ebarimt"
                    custId={userInfo["data"]["cust_id"]}
                    onEdit={handleEdit}
                    oldvalue={userInfo["data"]["ebarimt_id"] !== null ? userInfo["data"]["ebarimt_id"] : ""}
                  />
                </td>
              </tr>
              } */}
              {userInfo["data"]["custType"] == "PSN" && (
                <tr>
                  <td className="relative h-5 w-5">
                    <Image
                      src="/assets/images/ebarimt.svg"
                      fill
                      alt="ebarimt"
                      className="p-1 object-cover"
                    />
                  </td>
                  <td className="py-4">
                    {userInfo["data"]["ebarimtId_check"] == 0 &&
                      userInfo["data"]["ebarimt_id"] != null && (
                        <div>
                          <div className="px-2">
                            {userInfo["data"]["ebarimt_id"]}
                          </div>
                          <div onClick={()=>setVerifyOpen(true)} className="bg-yellow-400 rounded-sm px-2 text-slate-900 cursor-pointer hover:bg-yellow-400/90 hover:text-white">Баталгаажуулах</div>
                        </div>
                      )}
                      {
                        userInfo["data"]["ebarimtId_check"] == 1 &&
                        userInfo["data"]["ebarimt_id"] != null && (
                          <div className="px-2">{userInfo["data"]["ebarimt_id"]}</div>
                        )
                      }
                  </td>
                  <td>
                    {
                      userInfo["data"]["ebarimtId_check"] == 1
                      &&
                      <EditInfo
                        type="ebarimt"
                        custId={userInfo["data"]["cust_id"]}
                        onEdit={handleEdit}
                        oldvalue={userInfo["data"]["ebarimt_id"] !== null ? userInfo["data"]["ebarimt_id"] : ""}
                        token={token}
                      />
                    }
                </td>
                </tr>
              )}
            </tbody>
          </table>
          <AlertDialog open={verifyOpen} onOpenChange={()=>setVerifyOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Баталгаажуулах уу?</AlertDialogTitle>
          <AlertDialogDescription>
            Та уг ebarimt дугаарыг өөрийн ebarimt хялбар бүртгэл дээр баталгаажуулах гэж байна.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Болих</AlertDialogCancel>
          <Button onClick={()=>verifyEbarimt(userInfo["data"]["ebarimt_id"], userInfo["data"]["cust_id"])}>Баталгаажуулах</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>
      )}
    </div>
  );
};
export default Info;
