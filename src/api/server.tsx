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
