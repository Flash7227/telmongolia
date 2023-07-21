import Breadcrumb from "@/components/ui/breadcrumb";
const breadcrumb = ["САЛБАРЫН БАЙРШИЛУУД"];
const Page = () => {
    return (
        <div>
               <Breadcrumb data={breadcrumb} />
               <iframe  title="locations" id="map" src="https://www.google.com/maps/d/u/0/embed?mid=1c03m-VAw6T4KntMDgem37rQUsvVH9vo&ehbc=2E312F" width="100%" height="600" frameBorder="0"></iframe>
        </div>
    );
}

export default Page;