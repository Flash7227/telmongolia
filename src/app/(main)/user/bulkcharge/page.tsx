"use client"
import { getCookie } from '@/api/rest';
import { getBulkList } from '@/api/rest';
import { useState, useEffect } from 'react';
import Loader from "@/components/ui/loader";
import Typeselecter from './typeselecter';
import Postpaid from './postpaid';
import Prepaid from './prepaid';
import Breadcrumb from "@/components/ui/breadcrumb";

const breadcrumb = ["Хэрэглэгчийн булан", "Бөөнөөр цэнэглэх"];

const Page = () => {
  const [userData, setUserData] = useState();
  const [products, setProducts] = useState();
  const [selected, setSelected] = useState('');

  const getUserData = async ()=>{
    const res = await getCookie();
    if(res){
      setUserData(res);
      // console.log(res);
    }else{
      window.location.href="/";
    }
  }
  const getProducts = async () =>{
    if(userData){
      const res = await getBulkList(userData['data']['custId'], userData['jwt']);
      if(res){
        setProducts(res['data']);
      }
    }
  }
  useEffect(()=>{
    if(!userData){
      getUserData();
    }
  },[]);

  useEffect(()=>{
    getProducts();
  },[userData]);

  const handleSelectedChange = (d:string) =>{
    setSelected(d);
  }

  return (
    <div>
      <Breadcrumb data={breadcrumb} />
      <a href="/user" className='text-white bg-brand-1/60 p-2 rounded-md'>Буцах</a>
      {
        userData &&
        <ul className='text-slate-700 text-center my-4'>
          <li>Гэрээний дугаар - {userData['data']['custId']}</li>
        </ul>
      }
      
      {
        products && userData ?
        <div className='border p-2 shadow-sm mb-4'>
          <Typeselecter onSelectedChange={handleSelectedChange}/>
            {
              selected === 'prepaid' ?
              <Prepaid data={products} custId={userData['data']['custId']} token={userData['jwt']}/>
              :selected === 'postpaid' &&
              <Postpaid data={products}/>
            }
        </div>
        :
        <Loader/>
      }
    </div>
  );
}

export default Page;