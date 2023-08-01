import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BiSearch } from "react-icons/bi";
import { checkBill } from "@/api/rest";
import { format_date2 } from "@/lib/helper";

const formSchema = z.object({
  id: z.string(),
});

const CheckBill = (props: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  interface BillDataType {
    userId: string;
    type: string;
    subs: string;
    accExpireAt: string;
    amount: [];
  }

  const [billData, setBillData] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });

  const handleOpenChange = () => {
    setOpen(false);
    props.onModalClose(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await checkBill(values);
    console.log(res);
    setLoading(false);
    if (res["result"] === "ok") {
      setBillData(res["data"]);
    } else {
      toast({
        title: "Payment",
        description: res["message"],
      });
      setBillData({});
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => handleOpenChange()}>
      <DialogContent className="sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle className="text-brand-1">Төлбөр</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-center"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-normal">
                    Та үйлчилгээний эсвэл гэрээний дугаараа оруулна уу.
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <BiSearch className="mr-1" />
              Хайх
            </Button>
          </form>
        </Form>
        {Object.keys(billData).length > 0 && (
          <div className="p-4 border border-brand-1/20 rounded-2xl shadow-sm">
            <h5 className="text-center text-[14px] font-medium text-brand-2 uppercase">Төлбөрийн мэдээлэл</h5>
            <table className="text-[14px] w-full table-auto">
              <tbody>
                <tr>
                  <td className="w-[180px] font-medium text-brand-1">Үйлчилгээний дугаар</td>
                  <td className="p-2">{billData["userId" as keyof typeof billData]}</td>
                </tr>
                <tr>
                  <td className="font-medium text-brand-1">
                    {billData["type" as keyof typeof billData] ===
                    "Урьдчилсан төлбөрт"
                      ? "Дуусах хугацаа"
                      : "Хамрах хугацаа"}
                  </td>
                  <td className="p-2">
                    {billData["type" as keyof typeof billData] ===
                    "Урьдчилсан төлбөрт"
                      ? billData["accExpireAt" as keyof typeof billData]
                      : format_date2(
                          billData["chargedMonth" as keyof typeof billData]
                        )}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-brand-1">Төлбөрийн төрөл</td>
                  <td className="p-2">
                    {billData["type" as keyof typeof billData]}
                    {billData["subs" as keyof typeof billData] &&
                      " /" + billData["subs" as keyof typeof billData]}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-brand-1">Суурь хураамж</td>
                  <td className="p-2">
                    {billData["amount" as keyof typeof billData]["amount"]}₮
                  </td>
                </tr>
                <tr>
                  <td className="font-medium text-brand-1">Нэмэлт үйлчилгээ</td>
                  <td className="p-2">{billData["amount" as keyof typeof billData]["vas"]}₮</td>
                </tr>
                <tr>
                  <td className="font-bold text-brand-1">НИЙТ ТӨЛБӨР</td>
                  <td className="p-2 font-semibold">
                    {billData["amount" as keyof typeof billData]["total"]}₮
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-right mt-2">
              <Button className="bg-brand-2 hover:bg-brand-2/80">Төлбөр төлөх</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckBill;
