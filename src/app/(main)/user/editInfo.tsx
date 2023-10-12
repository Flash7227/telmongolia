"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { setInfo } from "@/api/rest";

const EditInfo = ({ type, custId, onEdit, oldvalue, token}: { type: string, custId: number, onEdit:any, oldvalue:any, token:any}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    email: z.string(),
    mobile: z.string(),
    ebarimt: z.string(),
  });
  if(type === 'mobile'){
    // oldvalue = parseInt(oldvalue);
    oldvalue = oldvalue.toString();
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: oldvalue,
      mobile: oldvalue,
      ebarimt: oldvalue
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await setInfo(values, custId, type, token);
    setLoading(false);
    toast({
      title: "Result",
      description: JSON.stringify(res["message"]),
    });
    if (res["result"] === "ok") {
      setOpen(false);
      onEdit(true);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-brand-2 text-xl cursor-pointer">
        <BiEditAlt />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        {loading && <Loader />}
        <DialogHeader>
          <DialogTitle>Засвар оруулах</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === "mobile" ? (
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Холбогдох утасны дугаар солих</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Шинэ утга"
                        {...field}
                        required
                        type="tel" //need to tell this to Azaa
                        minLength={8}
                        maxLength={8}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : type === "email" ? (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email хаяг солих</FormLabel>
                    <FormControl>
                      <Input placeholder="Шинэ утга" {...field} required type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="ebarimt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ebarimt автомат хаяг тохируулах</FormLabel>
                    <FormControl>
                      <Input placeholder="Шинэ утга" {...field} required/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit">Засах</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditInfo;
