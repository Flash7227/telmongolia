"use client"
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { pstGetDetailedData } from "@/api/rest";
  
const Detail = (props:any) => {
    const [details, setDetails] = useState();
    async function getDetailedData(){
        const res = await pstGetDetailedData(props.selected, props.token);

    }
    useEffect(()=>{
        getDetailedData();
    },[])
    return (
        <Dialog open={props.selected ? true : false} onOpenChange={props.handleSelectedChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.selected}</DialogTitle>
          </DialogHeader>
          {
            details && 
            details
          }
        </DialogContent>
      </Dialog>
    );
}

export default Detail;