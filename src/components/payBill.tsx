import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { paymentPay } from "@/api/rest";
import Payment from "./makePayment";

const formSchema = z.object({
  user_id: z.string(),
  payment: z.string(),
  ebarimt: z.string(),
});

const PayBill = (props:any) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(true);
    const [paymentData, setPaymentData] = useState({});

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          payment: "qpay",
          ebarimt: "personal",
          user_id: props.user_id
        },
      });
    
      const handleOpenChange = () => {
        setOpen(false);
        props.onCardClose(false);
      };

      async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values);
        setLoading(true);
        const res = await paymentPay(values);
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
            <DialogContent className="sm:max-w-[525px] max-h-[90%] overflow-y-scroll">
              {loading && <Loader />}
              <DialogHeader>
                <DialogTitle className="text-brand-1">Төлбөр төлөлт</DialogTitle>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
      
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
                              <FormItem className="w-[140px] h-[120px] p-2 rounded-2xl radiopay">
                                <FormControl>
                                  <RadioGroupItem value="bank" />
                                </FormControl>
                                <FormLabel className="font-normal flex justify-center flex-col items-center gap-1 text-center">
                                  <img
                                    src="/assets/images/bank.svg"
                                    className="h-[60px] w-[60px] object-contain"
                                  />
                                  <span>Банк шилжүүлэг</span>
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
                    <Button type="submit">Үргэлжлүүлэх</Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
}

export default PayBill;