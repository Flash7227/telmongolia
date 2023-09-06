"use client"
import { useState, useEffect } from "react";
const Typeselecter = (props:any) => {
    const [selected, setSelected] = useState('prepaid');
    useEffect(()=>{
        props.onSelectedChange(selected);
    },[selected])
    return (
        <div>
            <ul className="flex justify-center text-[14px] tracking-tight">
                <li className={`cursor-pointer w-[190px] border border-brand-2 py-2 text-center ${selected === 'prepaid' && 'bg-brand-2 text-white'}`} onClick={()=>setSelected('prepaid')}>Урьдчилсан төлбөрт</li>
                {/* <li className={`cursor-pointer w-[190px] border border-brand-2 py-2 text-center ${selected === 'postpaid' && 'bg-brand-2 text-white'}`} onClick={()=>setSelected('postpaid')}>Дараа төлбөрт</li> */}
            </ul>
        </div>
    );
}

export default Typeselecter;