"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: "Нууц үг доор хаяж 4 тэмдэгт байх хэрэгтэй.",
  }),
  verificationcode: z.string().optional(),
});

const FormData = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      verificationcode: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Имэйл</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="email" />
              </FormControl>
              <FormDescription>
                Энэ хаягаараа нэвтрэнэ.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Нууц үг</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="verificationcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Баталгаажуулах код</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Имэйл хаяг руу илгээгдэнэ.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          {isCodeSent ? (
            <Button type="submit" variant={"tvroom"}>
              Бүртгүүлэх
            </Button>
          ) : (
            <Button type="submit" variant={"tvroom"}>
              Баталгаажуулах код авах
            </Button>
          )}

          <a
            href="https://tvroom.mn"
            className="flex gap-1 items-center tracking-tight text-pink-600 border border-pink-600 hover:bg-pink-600 hover:text-white h-10 px-4 py-2 rounded-md ing-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
          >
            <AiOutlineArrowLeft size={14} />
            Буцах
          </a>
        </div>
      </form>
    </Form>
  );
};

export default FormData;
