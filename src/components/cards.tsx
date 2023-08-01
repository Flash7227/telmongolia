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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectedCard from "./selectedCard";

const Cards = (props: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [cards, setCards] = useState<any>({});
  const [cardType, setCardType] = useState("ALL");
  const [selectedCard, setSelectedCard] = useState({});

  const handleOpenChange = () => {
    setOpen(false);
    props.onCardClose(false);
  };
  function onCardChange(e: any) {
    setCardType(e.toUpperCase());
  }
  useEffect(() => {
    setLoading(true);
    const res = getCards().then((res) => {
      setLoading(false);
      var groups = ["TYPE"];
      var grouped = {};
      res["data"].forEach(function (a: any) {
        groups
          .reduce(function (o: any, g, i) {
            o[a[g as keyof typeof a] as keyof typeof o] =
              o[a[g]] || (i + 1 === groups.length ? [] : {});
            return o[a[g]];
          }, grouped)
          .push(a);
      });
      setCards(grouped);
      // console.log(grouped);
    });
  }, []);
  const typeName = (raw: string) => {
    if (raw === "ALL") {
      return "Энгийн";
    } else if (raw === "MIP") {
      return "MIP70";
    } else {
      return "Олон улсын";
    }
  };
  const selectCard = (d: any) => {
    // console.log(d);
    setSelectedCard(d);
  };

  return (
    <div>
      {Object.keys(selectedCard).length > 0 ? (
        <SelectedCard
          onCardClose={() => setSelectedCard({})}
          card={selectedCard}
        />
      ) : (
        <Dialog open={open} onOpenChange={() => handleOpenChange()}>
          <DialogContent className="sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle className="text-brand-1">Карт</DialogTitle>
            </DialogHeader>
            <RadioGroup
              defaultValue={cardType}
              className="flex justify-center gap-4"
              onValueChange={onCardChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ALL" id="r1" />
                <Label htmlFor="r1" className="text-[16px]">
                  Энгийн
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="IDD" id="r2" />
                <Label htmlFor="r2" className="text-[16px]">
                  Олон улс
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MIP" id="r3" />
                <Label htmlFor="r3" className="text-[16px]">
                  MIP70
                </Label>
              </div>
            </RadioGroup>
            <Table>
              <TableCaption>Боломжит картны жагсаалт</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Төрөл</TableHead>
                  <TableHead className="w-[100px]">Үнэ</TableHead>
                  <TableHead className="w-[100px]">Хоног</TableHead>
                  <TableHead className="w-[200px]">Тайлбар</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(cards).length > 0 &&
                  cardType &&
                  cards[cardType as keyof typeof cards].map(
                    (d: any, index: number) => (
                      <TableRow
                        key={index}
                        onClick={(e) => selectCard(d)}
                        className="cursor-pointer hover:bg-brand-2/20"
                      >
                        <TableCell>{typeName(d["TYPE"])}</TableCell>
                        <TableCell className="font-medium">
                          {d["PRICE"] + "₮"}
                        </TableCell>
                        <TableCell>{d["DAYS"]}</TableCell>
                        <TableCell>{d["CARD_TYPE"]}</TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Cards;
