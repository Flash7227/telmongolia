const Page = ({params }:{params :{each:number}}) => {
    return (
        <div>
            {params.each}
        </div>
    );
}

export default Page;