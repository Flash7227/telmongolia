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
export const getUserVas =  async ({userId, token}:{userId:string, token:string}) =>  {
    const values = {
        user_id: userId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = baseurl + "/api/1/cust/vas";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getUserUsage =  async ({userId, token}:{userId:string, token:string}) =>  {
    const values = {
        user_id: userId,
        token: token,
      };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = baseurl + "/api/1/cust/info/detail";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getEachNews = async (id:number, type:string) => {
    const url = baseurl + '/api/2/' + type + '?id=' + id;
    console.log(url, 'url is here');
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getEachNewsShareholders = async (id:number) => {
    const url = baseurl + '/api/2/shareholders?id=' + id;
    console.log(url, 'url is here');
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}