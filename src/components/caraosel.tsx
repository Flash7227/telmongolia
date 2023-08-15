"use client"
import { getCaraosel } from "../api/rest";
import ImageSlider from "./imageSlider";
import { useEffect, useState } from "react";

const Caraosel = () => {
  const [caraosel, setCaraosel] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCaraosel();
      setCaraosel(res);
    };
    const news = fetchData();
  }, []);
  return (
    <>
      {caraosel && (
        <div>
          <ImageSlider data={caraosel} />
        </div>
      )}
    </>
  );
};

export default Caraosel;
