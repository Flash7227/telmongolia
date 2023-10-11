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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import ReturnPage from "./returnPage";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  verificationcode: z.string().optional(),
});

const FormData = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessOver, setIsProcessOver] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      verificationcode: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    let url = "/tvroom/api/verification";
    if (isCodeSent) {
      url = "/tvroom/api/register";
    }
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      if (data["res"] == "success") {
        if (isCodeSent) {
          setIsProcessOver(true);
        } else {
          setIsCodeSent(true);
        }
      }
      toast({
        title: data["res"],
        description: data["desc"],
      });

    } catch (err) {
      console.log("There was an error", err);
    } finally {
      setIsLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      {isProcessOver ? (
        <ReturnPage />
      ) : (
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
                    <Input
                      placeholder=""
                      {...field}
                      type="email"
                      required
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Энэ хаягаараа нэвтрэнэ.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isCodeSent && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Нууц үг</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        disabled={isLoading}
                        required
                        minLength={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {isCodeSent && (
              <FormField
                control={form.control}
                name="verificationcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Баталгаажуулах код
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        disabled={isLoading}
                        required
                      />
                    </FormControl>
                    <FormDescription>
                      Имэйл хаяг руу илгээгдэнэ.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-4">
              {isCodeSent ? (
                <Button type="submit" variant={"tvroom"} disabled={isLoading}>
                  {isLoading && (
                    <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Бүртгүүлэх
                </Button>
              ) : (
                <Button type="submit" variant={"tvroom"} disabled={isLoading}>
                  {isLoading && (
                    <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
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
      )}
    </>
  );
};

export default FormData;
