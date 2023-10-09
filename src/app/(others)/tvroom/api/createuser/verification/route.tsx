import { NextResponse } from 'next/server'
import excuteQuery from '@/lib/db'

export async function POST(request: Request) {
    const req = await request.json();
    let query = ``;
    const data = await excuteQuery({
        query: query
    });
    return NextResponse.json({data:data});
}