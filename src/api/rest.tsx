var baseurl = process.env.BASEURL;
import Cookies from 'universal-cookie';


export async function getCaraosel() {
    try{
        const res = await fetch(process.env.API2 + '/coverimg?type=resident');
        const data = await res.json();
        return data['data'];
    }catch(err){
        console.log('There was an error', err);
    }
}
export async function login({user_id, user_pass, user_pass_login}:{user_id:string, user_pass:any, user_pass_login:boolean}) {
    const values = {user_id, user_pass, user_pass_login};
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/login";
    if (!user_pass_login) {
        url = process.env.API + "/login/create_onetime";
    }
    try{
        const res = await fetch(url, requestOptions);
        // await new Promise((resolve)=> setTimeout(resolve, 1000)) //for testing
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export async function onetime({user_id, onetime, password}:{user_id:string, onetime:string, password:string}){
    const values = {user_id, onetime, password};
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API2 + "/login/onetime";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export function getCookie(){
    const cookies = new Cookies();
    const temp = cookies.get('user');
    if(temp){
        return temp;
    }
    return null;
}
export async function setInfo(obj:any, cust_id:number, type:string){
    Object.keys(obj).forEach(key => {
        if (key !== type) {
            delete obj[key];
        }
    });
    obj['cust_id'] = cust_id;
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    };
    let url = process.env.API + "/cust/" + type;
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getUserInfo =  async ({userId, token}:{userId:string, token:string}) =>  {
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
    let url = process.env.API + "/user/info";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getNews = async (type:string, page:number) => {
    const url = process.env.API2 + '/news?type=' + type + '&customer=resident&page=' + page;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getWorkPlace = async () => {
    const url = process.env.API2 + '/workplace';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getShareHolders = async () => {
    const url = process.env.API2 + '/shareholders?limit=1&page=1';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getShareHoldersNews = async (type:string, page:number) => {
    const url = process.env.API2 + '/' + type + '?limit=6&page=' + page;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getNumbers = async (number:string, grade:string, page:number) =>{
    var url = process.env.API + "/booknumber?status=T&pattern=" + number + "&nitem=36&total&grade=" + grade + "&page=" + page;
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const bookNumber = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/booknumber";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getAddresses = async () => {
    const url = process.env.API + '/neworder/address';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const newOrder = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/neworder";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getCards = async () => {
    const url = process.env.API + '/card/list';
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const cardBuy = async (values:any) => {
    if(values.type == 'buycard'){
        delete values['number'];
    };
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/card/buy";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const checkPayment = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/payment/check";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const checkBill = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/payment";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const paymentPay = async (values:any) => {
    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
    let url = process.env.API + "/payment/pay";
    try{
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}
export const getEachNews = async (id:any, type:string) => {
    const url = process.env.API2 + '/' + type + '?id=' + id;
    console.log(url, 'url is here');
    try{
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }catch(err){
        console.log('There was an error', err);
    }
}