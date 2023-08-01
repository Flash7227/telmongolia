import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { cardBuy } from "@/api/rest";
import Payment from "./makePayment";

const formSchema = z.object({
  type: z.string(),
  number: z.string().optional(),
  payment: z.string(),
  email: z.string(),
  ebarimt: z.string(),
  card_type: z.string(),
  prefix: z.string(),
});

const SelectedCard = (props: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [paymentData, setPaymentData] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "buycard",
      number: "",
      payment: "qpay",
      email: "",
      ebarimt: "personal",
      card_type: props.card["TYPE"],
      prefix: props.card["PREFIX"],
    },
  });

  const handleOpenChange = () => {
    setOpen(false);
    props.onCardClose(false);
  };
  const typeName = (raw: string) => {
    if (raw === "ALL") {
      return "Энгийн";
    } else if (raw === "MIP") {
      return "MIP70";
    } else {
      return "Олон улсын";
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await cardBuy(values);
    setLoading(false);
    if (res["result"] === "ok") {
      setPaymentData(res['data']);
    }else{
      toast({
        title: "Payment",
        description: res["message"],
      });
    }
  }
  const closePayment = () => {
    setPaymentData({});
  };
  return (
    <div>
      {Object.keys(paymentData).length > 0 ? (
        <Payment paymentdata={paymentData} onPaymentClose={closePayment} />
      ) : (
        <Dialog
          open={open}
          onOpenChange={() => handleOpenChange()}
          defaultOpen={true}
        >
          <DialogContent className="sm:max-w-[525px]">
            {loading && <Loader />}
            <DialogHeader>
              <DialogTitle className="text-brand-1">Сонгосон карт</DialogTitle>
              <div className="py-6">
                <table>
                  <tbody>
                    <tr>
                      <td className="font-semibold w-[140px]">Төрөл</td>
                      <td>{typeName(props.card["TYPE"])}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Үнэ</td>
                      <td>{props.card["PRICE"]}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Тайлбар</td>
                      <td>{props.card["CARD_TYPE"]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-normal">
                          Карт авах хэлбэр
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Карт авах хэлбэр" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {props.card["TYPE"] !== "IDD" && (
                              <SelectItem value="recharge">
                                Шууд цэнэглэх
                              </SelectItem>
                            )}
                            <SelectItem value="buycard">
                              Картаар авах
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.getValues("type") === "recharge" && (
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-normal">
                            Цэнэглэх утасны дугаар
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" required />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="payment"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-600 font-normal">
                          Төлбөрийн хэлбэр
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row gap-2 justify-center"
                            required
                          >
                            <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                              <FormControl>
                                <RadioGroupItem value="qpay" />
                              </FormControl>
                              <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                <img
                                  src="/assets/images/qpay.svg"
                                  className="h-[60px] w-[60px] object-contain"
                                />
                                <span>Qpay хялбар төлөлт</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ebarimt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-normal">
                          Ebarimt төрөл
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row gap-2 justify-center"
                            required
                          >
                            <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                              <FormControl>
                                <RadioGroupItem value="personal" />
                              </FormControl>
                              <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                <img
                                  src="/assets/images/personal.svg"
                                  alt="personal"
                                  className="h-[60px] w-[60px] object-contain"
                                />
                                <span>Хувь хэрэглэгч</span>
                              </FormLabel>
                            </FormItem>
                            <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                              <FormControl>
                                <RadioGroupItem value="business" />
                              </FormControl>
                              <FormLabel className="font-normal flex flex-col justify-center items-center gap-1 text-center">
                                <img
                                  src="/assets/images/corporate.svg"
                                  alt="corporate"
                                  className="h-[60px] w-[60px] object-contain"
                                />
                                <span>Албан байгууллага</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.getValues("type") === "buycard" && (
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-600 font-normal">
                            Цахим шуудангийн хаяг
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              required
                              placeholder="Картын дугаар хүлээн авах email хаяг"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit">Үргэлжлүүлэх</Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SelectedCard;
