import {authCheck} from '@/api/server';
import { redirect  } from 'next/navigation'
import Info from './info';
import Vas from './vas';
import Usage from './usage';
import Head from 'next/head';

const  Page = async () => {
    const userdata = await authCheck();
    if(!userdata){redirect("/");};
    
    return (
        <div className='mt-4 p-4'>
            <Head>
                <title>Хэрэглэгчийн булан</title>
            </Head>
            <h1 className='text-brand-1 text-4xl font-bold'>
                Хэрэглэгчийн <span className='text-brand-3 italic'>булан</span>
            </h1>
            <div className='flex gap-14 flex-wrap justify-center items-center mt-2'>
                <div>
                    <Info userId={userdata.data.userId} token={userdata.jwt} custId={userdata.data.custId}/>
                    {/* <div className="text-center mt-[40px]">
                        <a href="/user/bulkcharge" className="uppercase text-white bg-brand-1 px-6 py-2 rounded-md hover:bg-brand-2">Бөөнөөр цэнэглэх</a>
                    </div> */}
                </div>
                <Usage userId={userdata.data.userId} token={userdata.jwt}/>
                <Vas userId={userdata.data.userId} token={userdata.jwt}/>
            </div>
        </div>
    );
}

export default Page;