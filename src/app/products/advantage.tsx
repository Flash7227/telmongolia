import Image from "next/image";
const Advantage = ({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 tracking-tight py-10 border border-brand-1/20 rounded-2xl w-[360px] cursor-pointer hover:shadow-md hover:-translate-y-2 transition-all hover:shadow-brand-1/20">
      <div className="relative h-[100px] w-[100px]">
        <Image
          src={"/assets/images/products/icons/" + img}
          fill
          alt={title}
          className="object-contain"
          sizes="(max-width: 100px) 40vw"
        />
      </div>
      <h4 className="text-lg font-medium text-slate-800">{title}</h4>
      <span className="text-slate-700">{desc}</span>
    </div>
  );
};

export default Advantage;
