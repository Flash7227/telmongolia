"use client"
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Help1 from './help1'
import Help2 from './help2'
import Help4 from './help4'
import Help5 from './help5'
import Help6 from './help6'
import Help7 from './help7'
import Help8 from './help8'
import Help9 from './help9'
import Help10 from './help10'
import Help11 from './help11'

const helps = [<Help1 key={1}/>, <Help2 key={2}/>, <Help2 key={3}/>, <Help4 key={4}/>, <Help5 key={5}/>, <Help6 key={6}/>, <Help7 key={7}/>, <Help8 key={8}/>, <Help9 key={9}/>, <Help10 key={10}/>, <Help11 key={11}/>];
const Modal = ({help, closeHelp}:{help:number, closeHelp:any}) => {
    const [open, setOpen] = useState(true);
    useEffect(()=>{
        setOpen(true);
      },[])
      const handleOpenChange = () => {
        closeHelp(true);
        setOpen(false);
      }
  return (
    <Dialog open={open} onOpenChange={()=>handleOpenChange()}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>{help}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[480px]">
          {helps[help-1]}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
