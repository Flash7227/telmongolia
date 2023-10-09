import { NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'

export async function GET(request: Request) {
    let query =  "CREATE TABLE create_users (id BIGINT(20) primary key auto_increment, email VARCHAR(255), password VARCHAR(255), verified boolean, api_status INT(4), created_date TIMESTAMP)";
    const users = await excuteQuery({
        query: query
    });
    query =  "CREATE TABLE verification (id BIGINT(20) primary key auto_increment, email VARCHAR(255), verified boolean, code INT(4), created_date TIMESTAMP)";
    const verify = await excuteQuery({
        query: query
    });
    return NextResponse.json({data:[users, verify]});
}