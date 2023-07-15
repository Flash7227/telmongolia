const Loader = () => {
  return (
  
    <div className="absolute inset-0 bg-gray-200/30 w-full h-full flex justify-center items-center z-20">
      <div className="flex w-full h-full  items-center justify-center bg-gray-200/20">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#135EA5] from-10% to-[#00AFEF] to-80%  animate-spin">
          <div className="h-9 w-9 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
