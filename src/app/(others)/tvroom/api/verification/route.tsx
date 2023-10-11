import { NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'

export async function POST(request: Request) {
    const req = await request.json();
    const code  = Math.floor(1000 + Math.random() * 9000);
        let query = `insert into verification (email, verified, code, created_at) values ('${req.email}', false, '${code}', TIMESTAMP(CURRENT_TIMESTAMP));`;
        const verification = await excuteQuery({
            query: query
        });
        if(verification){
            const emailing = await sendMail(req.email, code);
            return NextResponse.json({res:'success', data:emailing, desc:'Баталгаажуулах код илгээгдлээ!'});
        }
        
    return NextResponse.json({res:'error', desc: 'Алдаа!'});
}

async function sendMail(to:string, code:number){
    "use strict";
    const nodemailer = require("nodemailer");
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "tvroom@mtcone.net",
          pass: "muhamed123",
        },
        tls: {rejectUnauthorized: true},
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"TVROOM" <tvroom@mtcone.net>', // sender address
          to: `${to}`, // list of receivers
          subject: "Баталгаажуулах код", // Subject line
          html: `
            <div>Таны баталгаажуулах код - ${code}</div>
          ` // html body
        });
        logToTable(to, info.messageId, 1);
        return info.messageId;
        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      }
      
      return await main().catch(console.error);
      
}
async function logToTable(username:string, description:any, type:any){
  let query = `insert into email_log (email, description, type, created_at) values ('${username}', '${description}', '${type}', TIMESTAMP(CURRENT_TIMESTAMP));`;
  const email_log = await excuteQuery({
      query: query
  });
}