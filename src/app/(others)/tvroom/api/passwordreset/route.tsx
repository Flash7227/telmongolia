import { NextResponse } from "next/server";
import excuteQuery from "@/lib/db";

export async function POST(request: Request) {
  const req = await request.json();
  let query = `select * from verification where email = '${req.username}' and verified = 0 order by created_at desc limit 1`;
  const verify = await excuteQuery({
    query: query,
  });
  if (verify.length > 0) {
    if (verify[0]["code"] == req.verificationcode) {
      //create user
      const user_update = await update_user(req.username, req.password);

      if (user_update?.includes("success")) {
        query = `update verification set verified = 1, verified_at = TIMESTAMP(CURRENT_TIMESTAMP) where email = '${req.username}' and verified = 0 and code = ${req.verificationcode}`;
        const verified = await excuteQuery({
          query: query,
        });
        return NextResponse.json({
          res: "success",
          desc: "Амжилттай!",
          data: [user_update, verified],
        });
      } else {
        if(user_update?.includes('resultDescription')){
            return NextResponse.json({
                res: "error",
                desc: "Алдаа! " + JSON.parse(user_update)['resultDescription'],
                data: [user_update],
              });
        }
        return NextResponse.json({
          res: "error",
          desc: "Алдаа!",
          data: [user_update],
        });
      }
    } else {
      return NextResponse.json({
        res: "error",
        desc: "Баталгаажуулах код таарахгүй байна!",
      });
    }
  }
  return NextResponse.json({ res: "error", desc: "Алдаа! Verification table username not found!" });
}

async function getToken() {
  const url = "https://tvroom.mn/api/customer/token";
  const data = { username: "admin", password: "90b2c4d0" };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(url, requestOptions);
    const data = await res.text();
    return data;
  } catch (err) {
    console.log("There was an error", err);
  }
}
async function update_user(username: string, password: string) {
  const userlist = await checkUser(username);
  const url = "https://tvroom.mn/api/customer/modify";
  const data = {
    password: `${password}`,
    user_id: userlist[0]['response']['0']['user_id']
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userlist[1]}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(url, requestOptions);
    const data = await res.text();
    return data;
    //then
  } catch (err) {
    console.log("There was an error", err);
    return 'Try catch error!';
  }
}
async function checkUser(user: any) {
      const token = await getToken();
      const url = `https://tvroom.mn/api/customer/list?username=${user}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      };
      try {
        const res = await fetch(url, requestOptions);
        const data = await res.text();
        return [JSON.parse(data), token];
        //then
      } catch (err) {
        console.log("There was an error", err);
        return 'Try catch error!';
      }
}