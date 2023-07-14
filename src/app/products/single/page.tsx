import Breadcrumb from "@/components/ui/breadcrumb";


const breadcrumb =  ["Өрхийн хэрэглэгч", "Бүтээгдэхүүн", "Суурин утас"];
const Page = () => {
    return (
        <div>
            <Breadcrumb data={breadcrumb}/>
            Enter
        </div>
    );
}

export default Page;