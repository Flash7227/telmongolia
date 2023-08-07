import { getUserUsage } from "@/api/server";
import { BiCoinStack, BiTime, BiFlag, BiCalendarEvent } from "react-icons/bi";

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
const Usage = async ({ userId, token }: { userId: string; token: string }) => {
  const userUsage = await getUserUsage({ userId, token });

  return (
    <div>
      {
        userUsage &&
        <div>
          <Card
            value={remainingUnit(userUsage.data.counter)}
            title="Нэгж"
            icon={<BiCoinStack />}
          />
          {userUsage.data["subs"]["subs"]["svcDomain"] === 5 ||
          userUsage.data["subs"]["subs"]["svcDomain"] === 1 ? (
            <Card
              value={remainingMinute(userUsage.data.counter)}
              title="Үлдсэн минут"
              icon={<BiTime />}
            />
          ) : (
            userUsage.data["subs"]["subs"]["svcDomain"] === 4 && (
              <Card
                value={userUsage.data.speed}
                title="Хурд"
                icon={<BiCoinStack />}
              />
            )
          )}
          <Card
            title="Төлөв"
            value={stateToWord(userUsage.data.account.state)}
            icon={<BiFlag />}
          />
          <Card
            value={formatDate(userUsage.data.account.accExpireAt)}
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
      <li className="text-brand-3 font-semibold text-[14px] mt-2">{title}</li>
      <li className="font-bold text-xl">{value}</li>
    </ul>
  </div>
);

export default Usage;
