import { cookies } from 'next/headers'
var baseurl = process.env.BASEURL;
//server cookie checker
export const authCheck = async () => {
    const cookieStore  = cookies();
    const auth = await cookieStore.get('user');
    if(auth){
        return JSON.parse(auth['value']);
    }else{
        return null;
    }
}

export const getEachNewsShareholders = async (id:number) => {
    const url = process.env.API2 + '/shareholders?id=' + id;
    console.log(url, 'url is here');
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}