"use client";
import { getUserInfo } from "@/api/rest";
import {
  BiMobile,
  BiEditAlt,
  BiAt,
  BiCurrentLocation,
  BiSolidUserCircle,
} from "react-icons/bi";
import Image from "next/image";
import EditInfo from "./editInfo";
import { useState, useEffect } from "react";

const Info = ({ userId, token }: { userId: string; token: string }) => {
  const [userInfo, setUserInfo] = useState();
  const getData = async () => {
    const temp = await getUserInfo({ userId, token });
    setUserInfo(temp);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleEdit = async () => {
    getData();
  };
  return (
    <div className="border border-slate-50 p-2 rounded-2xl shadow-sm shadow-brand-1/30 w-[400px]">
      {userInfo && (
        <div>
          <h1 className="flex items-center justify-center gap-2 text-3xl text-brand-1 font-medium">
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
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Info;
