"use client"
import { useEffect, useState } from "react";
import { getUserUsage } from "@/api/rest";
import { BiCoinStack, BiTime, BiFlag, BiCalendarEvent } from "react-icons/bi";
import Cookies from "universal-cookie";

function remainingMinute(obj: []) {
  for (var data of Object.values(obj)) {
    if (data["cntId"] === 1002) {
      var minute = data["cntValue"] / 60;
      return minute;
    }
  }
}
function remainingUnit(obj: []) {
  for (var data of Object.values(obj)) {
    if (data["cntId"] === 1013) {
      return data["cntValue"];
    }
  }
  return 0;
}
function stateToWord(d: number) {
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
function formatDate(d: any) {
  var temp = new Date(d).toLocaleDateString();
  return temp;
}
function logOut(){
  const cookies = new Cookies();
  cookies.remove("user");
  location.href = "/";
}
const Usage = ({ userId, token }: { userId: string; token: string }) => {
  const [usage, setUsage] = useState();
  useEffect(() => {
      const fetchData = async () => {
          const res = await getUserUsage({ userId, token });
          if(res['result'] != 'error'){
            setUsage(res);
          }else{
            logOut();
          }
      };
      fetchData();
    }, []);

  return (
    <div>
      {
        usage &&
        <div>
          <Card
            value={remainingUnit(usage['data']['counter'])}
            title="Нэгж"
            icon={<BiCoinStack />}
          />
          {(usage['data']["subs"]["subs"]["svcDomain"] === 5 ||
          usage['data']["subs"]["subs"]["svcDomain"] === 1) ? (
            <Card
              value={remainingMinute(usage['data']['counter'])}
              title="Үлдсэн минут"
              icon={<BiTime />}
            />
          ) : (
            usage["data"]["subs"]["subs"]["svcDomain"] === 4 && (
              <Card
                value={usage['data']['speed']}
                title="Хурд"
                icon={<BiCoinStack />}
              />
            )
          )}
          <Card
            title="Төлөв"
            value={stateToWord(usage['data']['account']['state'])}
            icon={<BiFlag />}
          />
          <Card
            value={formatDate(usage['data']['account']['accExpireAt'])}
            title="Дуусах огноо"
            icon={<BiCalendarEvent />}
          />
        </div>
      }
    </div>
  );
};

const Card = ({
  title,
  value,
  icon,
}: {
  title: any;
  value?: any;
  icon: any;
}) => (
  <div className="bg-brand-1 hover:bg-brand-2 transition-colors rounded-lg w-[140px] h-[120px] m-4 flex items-center justify-center cursor-pointer group">
    <ul className="flex flex-col items-center justify-center text-slate-50 tracking-tight">
      <li className="text-3xl group-hover:-translate-y-1 transition-transform">
        {icon}
      </li>
      <li className={`text-brand-3 font-semibold text-[14px] mt-2`}>{title}</li>
      <li className={`font-bold text-center ${value && (value.length > 10 ? 'text-[12px]' : 'text-xl')}`}>{value}</li>
    </ul>
  </div>
);


export default Usage;
