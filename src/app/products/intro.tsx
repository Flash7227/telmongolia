import Image from "next/image";
const Intro = ({
  title,
  bundle,
  desc,
  logo,
}: {
  title: string;
  bundle: string;
  desc: string;
  logo: string;
}) => {
  return (
    <div className="bg-indigo-50 rounded-xl right-0 left-0 py-[60px] bg-[url('/assets/images/overlay.png')] bg-center bg-no-repeat">
      <div className="container flex gap-4 z-20 relative justify-center">
        <div className="flex-1 leading-relaxed space-y-4 my-4 max-w-[700px]">
          <h1 className="text-brand-1 text-7xl font-bold">{title}</h1>
          <h3 className="text-brand-3 text-2xl font-semibold uppercase">
            {bundle}
          </h3>
          <p className="tracking-tight text-lg">{desc}</p>
        </div>
        <div className="absolute right-0 top-0 md:relative h-[100px] w-[100px] md:h-[300px] md:w-[300px] origin-bottom -rotate-6 p-4 opacity-70 md:opacity-100">
          <Image
            src={"/assets/images/products/" + logo}
            fill
            alt={bundle}
            className="object-contain"
            sizes="(max-width: 300px) 40vw"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
