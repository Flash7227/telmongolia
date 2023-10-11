import { NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'

export async function GET(request: Request) {
    // let query =  "CREATE TABLE create_users (id BIGINT(20) primary key auto_increment, email VARCHAR(255), password VARCHAR(255), verified boolean, api_status INT(4), created_at TIMESTAMP)";
    // const users = await excuteQuery({
    //     query: query
    // });
    let query =  "CREATE TABLE verification (id BIGINT(20) primary key auto_increment, email VARCHAR(255), verified BOOLEAN, code INT(4), created_at TIMESTAMP, verified_at TIMESTAMP)";
    const verify = await excuteQuery({
        query: query
    });
    query =  "CREATE TABLE email_log (id BIGINT(20) primary key auto_increment, email VARCHAR(255), description VARCHAR(255), type INT(4), created_at TIMESTAMP)";
    const email_log = await excuteQuery({
        query: query
    });
    return NextResponse.json({data:[verify, email_log]});
}