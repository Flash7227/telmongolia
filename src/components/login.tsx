"use client";
import { login } from "@/api/rest";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BiUser, BiExit } from "react-icons/bi";
import Cookies from "universal-cookie";
import { useToast } from "@/components/ui/use-toast";
import AuthCheck from "./authCheck";
import Link from "next/link";
import Loader from "./ui/loader";

import { useState, useEffect } from "react";

const formSchema = z.object({
  user_id: z.string().min(6, {
    message: "Та үйлчилгээний дугаараа бүрэн бичнэ үү!",
  }),
  user_pass: z.string().min(1, {
    message: "Та нууц үгээ оруулна уу!",
  }),
  user_pass_login: z.boolean().default(true),
});


const Login = () => {
  const { toast } = useToast();
  const [auth, setAuth]  = useState();
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const temp = AuthCheck();
    setAuth(temp);
  },[])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      user_pass: "",
      user_pass_login: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await login(values);
    setLoading(false);
    toast({
      title: "Login",
      description: res["message"],
    });
    if (res["message"].includes("Successful")) {
      const cookies = new Cookies();
      cookies.set("user", JSON.stringify(res), {
        path: "/",
        expires: new Date(res["expireAt"] * 1000),
      });
      setAuth(res);
      // window.location.href = "/selfcare";
    }
    console.log(res, "report is here");
    // console.log(values);
  }
  function logOut(){
    const cookies = new Cookies();
    cookies.remove('user');
    setAuth(undefined);
    // window.location.href = '/';
  }
  return (
    <div>
       {auth ? (
            <div className="h-full flex group cursor-pointer items-center gap-1 relative after:absolute after:content-[''] after:border-b-4 after:border-brand-2 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">
              <BiUser className="text-lg text-brand-1" />
              {auth['data']['userId']}
              <ul className="absolute top-full right-0 bg-slate-50 rounded-2xl shadow-md py-4 px-8 -ml-8 w-52 text-sm hidden group-hover:block">
                <Link href="/selfcare">
                  <li className="py-2 hover:translate-x-4 hover:list-disc hover:text-brand-2 transition-transform">Хэрэглэгчийн булан</li>
                </Link>
                <button onClick={()=>logOut()}>
                  <li className="py-2 hover:translate-x-4 hover:list-disc hover:text-brand-2 transition-transform flex gap-1 items-center">
                    <BiExit className="text-lg"/>Гарах
                  </li>
                </button>
              </ul>
            </div>
          ) : (
            <Dialog>
            <DialogTrigger className="h-full flex items-center gap-1 relative after:absolute after:content-[''] after:border-b-4 after:border-brand-2 after:top-full after:w-full after:-mt-2 after:scale-x-0 hover:after:scale-x-100 after:transition-all">
              <BiUser className="text-lg text-brand-1" />Нэвтрэх
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
            {loading&&<Loader/>}
              <DialogHeader>
                <DialogTitle>Нэвтрэх цонх</DialogTitle>
              </DialogHeader>
    
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Username</FormLabel> */}
                        <FormControl>
                          <Input placeholder="Үйлчилгээний ID" {...field} />
                        </FormControl>
                        <FormDescription>
                          Жишээ нь: 70008000, ddn-1234567
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
    
                  <FormField
                    control={form.control}
                    name="user_pass"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Нууц Үг</FormLabel> */}
                        <FormControl>
                          <Input
                            placeholder="Нууц үг"
                            {...field}
                            type={`${
                              form.getValues("user_pass_login")
                                ? "password"
                                : "hidden"
                            }`}
                          />
                        </FormControl>
                        {/* <FormDescription>
                            Нууц үгээ мартсан бол нэг удаагийн код сонголтоор шинээр үүсгээрэй
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user_pass_login"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Нууц Үг</FormLabel> */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Label
                            htmlFor="user_pass_login"
                            className="text-gray-500"
                          >
                            Нэг удаагийн код
                          </Label>
                          <FormControl>
                            <Switch
                              id="user_pass_login"
                              name="user_pass_login"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="user_pass_login">Нууц үг</Label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Нэвтрэх</Button>
                </form>
              </Form>

    
            </DialogContent>
          </Dialog>
            
          )}
    </div>
  );
};

export default Login;
