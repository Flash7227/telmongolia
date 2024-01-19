import { useState, useEffect } from "react";
const ReturnPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
        const mobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(mobile()){
          setIsMobile(true);
        }
      },[])
    return (
        <div className="text-white text-center flex flex-col gap-4 items-center justify-center">
            <h1 className="text-[14px]">
                Таны нууц үг <span className="text-green-400 text-[18px] font-semibold">амжилттай</span> засагдлаа! 
            </h1>

            <a href={isMobile ? "https://ms.tvroom.mn/web/close" : "https://tvroom.mn"} className="bg-pink-500 h-[120px] w-[120px] flex items-center justify-center rounded-full p-2 text-[18px] font-bold hover:bg-pink-500/90 transition-colors">Буцах</a>
        </div>
    );
}

export default ReturnPage;