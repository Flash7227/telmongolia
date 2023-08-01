import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "./ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { checkPayment } from "@/api/rest";

const Payment = (props: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const handleOpenChange = () => {
    setOpen(false);
    props.onPaymentClose(false);
  };
  const checkPaymentStatus = async ()=>{
    setLoading(true);
    var values = {invoice_id: props.paymentdata['invoice_id']};
    const res = await checkPayment(values);
    setLoading(false);
    toast({
        title: "Payment status",
        description: res["message"],
      });
  }
  return (
    <Dialog
      open={open}
      onOpenChange={() => handleOpenChange()}
      defaultOpen={true}
    >
      <DialogContent className="sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle className="text-brand-1">Төлбөр төлөлт</DialogTitle>
        </DialogHeader>
        {
            props.paymentdata['qr_image'] &&
            <div className="text-center mx-auto">
              <img
                  src={`data:image/jpeg;base64,${props.paymentdata["qr_image"]}`}
                  width={320}
                  height={320}
                  alt="qpay"
              ></img>
              <Button onClick={checkPaymentStatus}>Төлбөр шалгах</Button>
            </div>
        }
      </DialogContent>
    </Dialog>
  );
};

export default Payment;
