"use client";
import { useState, useEffect } from "react";
const nums = ["*", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const nums1 = [1, 7];
const nums2 = [1, 0];

const Pad = (props:any) => {
  const [pads, setPads] = useState({
    num1: "*",
    num2: "*",
    num3: "*",
    num4: "*",
    num5: "*",
    num6: "*",
    num7: "*",
    num8: "*",
  });
  const handleChange = (event: any) => {
    setPads({ ...pads, [event.target.name]: event.target.value });
  };
  useEffect(()=>{
    var temp = props.prefix;
    setPads(p => ({...p, num1 : temp[0], num2: temp[1], num3:temp[2], num4:temp[3]}));
  },[props.prefix]);

  useEffect(()=>{
    if(pads.num1 != "*" && pads.num1 != undefined){
      props.onPadChange(pads);
    }
  },[pads]);

  return (
    <div className="flex gap-1 max-w-[400px] mx-auto">
      {Object.keys(pads).map((key: string, index:number) => (
        <select
          key={key}
          value={pads[key as keyof typeof pads]}
          onChange={handleChange}
          name={key}
          className="pad border border-brand-1/40 rounded-sm text-[42px] w-[44px] text-center text-brand-1 font-medium"
          disabled={index >=4 ? false: true}
        >
          {nums.map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Pad;
