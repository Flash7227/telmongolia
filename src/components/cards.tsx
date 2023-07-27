import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { getCards } from "@/api/rest";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Cards = (props:any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [cards, setCards] = useState<any>({});
  const [cardType, setCardType] = useState('ALL');
  const [selectedCard, setSelectedCard] = useState({});

  const handleOpenChange = () => {
    setOpen(false);
    props.onCardClose(false);
  };
  function onCardChange(e:any){
    setCardType((e).toUpperCase());
    }
  useEffect(()=>{
    const res = getCards().then((res)=>{
        var groups = ['TYPE'];
        var grouped = {};
        res['data'].forEach(function (a:any) {
            groups.reduce(function (o:any, g, i) {
                o[a[g as keyof typeof a] as keyof typeof o] = o[a[g]] || (i + 1 === groups.length ? [] : {});
                return o[a[g]];
            }, grouped).push(a);
        });
        setCards(grouped);
        console.log(grouped);
    });
  },[]);

  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent className="sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle>Карт</DialogTitle>
        </DialogHeader>
        <RadioGroup defaultValue="ALL" className="flex justify-center gap-4" onValueChange={onCardChange}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="ALL" id="r1" />
                <Label htmlFor="r1" className="text-[16px]">Энгийн</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="IDD" id="r2" />
                <Label htmlFor="r2" className="text-[16px]">Олон улс</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="MIP" id="r3" />
                <Label htmlFor="r3" className="text-[16px]">MIP70</Label>
            </div>
        </RadioGroup>
        <ul className='list-disc p-4 max-w-[400px] mx-auto'>
            {   
                (Object.keys(cards).length > 0 && cardType) &&
                    (cards[cardType as keyof typeof cards]).map((d:any, index:number)=>(
                        <li key={index} onClick={(e)=>setSelectedCard(d)} className="w-[300px] p-2 hover:bg-brand-2 hover:text-white transition-colors cursor-pointer">{d['PRICE'] + ' төг /' + d['CARD_TYPE'] + '/'}</li>
                    ))
            }
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default Cards;
