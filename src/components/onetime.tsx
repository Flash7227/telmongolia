import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Loader from "./ui/loader";

import { useState, useEffect } from "react";
import { onetime } from "@/api/rest";


const formSchema = z.object({
  onetime: z.string().min(1, {
    message: "Хүлээн авсан кодоо бичнэ үү!",
  }),
  password: z.string().min(1, {
    message: "Та шинэ нууц үгээ оруулна уу!",
  }),
  user_id: z.string()
});

const Onetime = ({user_id, handleOpenOnetimeChange}:{user_id:string, handleOpenOnetimeChange:any}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(()=>{
    setOpen(true);
  },[])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onetime: "",
      password: "",
      user_id: user_id
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await onetime(values);
    setLoading(false);
    toast({
      title: "Login",
      description: res["message"],
    });
    if (res["result"] === "ok") {
      handleOpenChange();
    }
  }
  const handleOpenChange = () => {
    handleOpenOnetimeChange(false);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={()=>handleOpenChange()}>
      <DialogContent className="sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle>Шинэ нууц үг үүсгэх</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="onetime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Нэг удаагийн код" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Шинэ нууц үг" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="hidden"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Үргэлжлүүлэх</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Onetime;
