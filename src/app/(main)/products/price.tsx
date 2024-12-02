const Price = ({
  title,
  price,
  list,
  alert,
}: {
  title: string;
  price: any;
  list: string[];
  alert?: any;
}) => {
  return (
    <div className="w-[260px] border p-4 rounded-xl text-center bg-brand-1/10 hover:shadow-md hover:shadow-brand-2/60 cursor-pointer transition-shadow bg-cover bg-center bg-no-repeat"
    style={{
        backgroundImage: `url('/assets/images/tarifBG.jpg')`,
      }}>
      <div>
        <div
          className="w-[130px] h-[130px] mx-auto flex items-center justify-center rounded-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/images/price.png')`,
          }}
        ></div>

        <h5 className="text-3xl font-semibold mt-4 text-brand-3 uppercase">
          {title}
        </h5>
        <h4 className="text-2xl font-bold mt-1 text-brand-2">{price}</h4>
        {alert && <div className="text-red-700 text-sm">{alert}</div>}
        <ul className="my-6 text-[14px] flex flex-col gap-6 tracking-tight leading-5 text-slate-900">
          {list.map((d, index: number) => (
            <li key={index}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
