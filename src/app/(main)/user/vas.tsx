import { getUserVas } from "@/api/server";

const reGroup = (dat:any) =>{
    var obj1 = {
     'prodName':'Дугаар илрүүлэх',
     'monthlyFee': null
    };
    var obj2 = {
     'prodName':'Яриан дунд дуудлага ирснийг мэдэгдэх',
     'monthlyFee': null
    };
    var obj3 = {
     'prodName':'Ярьж байхдаа дуудсан хэрэглэгчийн дугаарыг илрүүлэх',
     'monthlyFee': null
    };
    var obj4 = {
     'prodName':'Нууцалсан дугаарыг илрүүлэх',
     'monthlyFee': null
    };
    var obj5 = {
     'prodName':'Эзэнгүй байгаагаа мэдэгдэх',
     'monthlyFee': null
    };
    var obj6 = {
     'prodName':'Хариу өгөөгүй үед дуудлага шилжүүлэх',
     'monthlyFee': null
    };
    var obj7 = {
     'prodName':'Завгүй байхад дуудлага шилжүүлэх',
     'monthlyFee': null
    };
     var filter = dat.filter((d:any)=>
         d['prodName'].includes('BUNDLE')
     )
     var others = dat.filter((d:any)=>
         !d['prodName'].includes('BUNDLE')
     )
     var total = [];
     if(filter.length > 1){
         //when there is more than 1 bundled vas
         //good luck understanding logic of below
         var filter7 = filter.filter((fil:any)=>
             fil['prodName'].includes('7')
         );
         var filter5 = filter.filter((fil:any)=>
             fil['prodName'].includes('5')
         );
         var filter3 = filter.filter((fil:any)=>
             fil['prodName'].includes('3')
         );
         // console.log(filter3, filter5, filter7);
         if(filter3.length > 0){
             filter = filter3;
         }else if(filter5.length > 0){
             filter = filter5;
         }else if(filter7.length > 0){
             filter = filter7;
         }
     }
     if(filter[0]){
         if(filter[0]['prodName'].includes('1')){
             total.push(obj1);
         }else if(filter[0]['prodName'].includes('3')){
             total.push(obj1, obj2, obj3);
         }else if(filter[0]['prodName'].includes('5')){
             total.push(obj1, obj2, obj3, obj4, obj5);
         }else if(filter[0]['prodName'].includes('7')){
             total.push(obj1, obj2, obj3, obj4, obj5, obj6, obj7);
         }else{
             total.push(filter[0]);
         }
     }
     total = others.concat(total);
     return total;
 }


const Vas = async ({userId, token}:{userId:string, token:string}) => {
    const userVas = await getUserVas({userId, token});
    const vas = await reGroup(userVas['data']);
    
    return (
        <div>
            <h1 className="text-brand-1 uppercase font-semibold text-[14px]">Нэмэлт үйлчилгээнүүд</h1>
            <table className="tracking-tight mt-4">
                <thead className="border-b border-brand-3">
                    <tr className="font-medium uppercase">
                        <td></td>
                        <td>Нэр</td>
                        <td>Үнэ</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody className="text-slate-800 text-[14px]">
                {vas.map((v:any, index:number)=>(
                    <tr key={index}>
                        <td style={{paddingRight: 8}} className="p-2">#</td>
                        <td className="p-2">{v['prodName']}</td>
                        <td className="p-2">{v['monthlyFee']}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Vas;