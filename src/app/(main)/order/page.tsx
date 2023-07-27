"use client";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "@/components/ui/loader";
import { getAddresses } from "@/api/rest";
import Breadcrumb from "@/components/ui/breadcrumb";
import { newOrder } from "@/api/rest";

const breadcrumb = ["Захиалга өгөх"];

const formSchema = z.object({
  lastname: z.string(),
  firstname: z.string(),
  registernum: z.string(),
  cust_type: z.string(),
  mobile: z.string(),
  email: z.string(),
  services: z.string().array(),
  city: z.string(),
  district: z.string(),
  khoroo: z.string(),
  apartment: z.string(),
  entrance: z.string(),
  door: z.string(),
  additional: z.string(),
});

const Page = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState({});
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    setLoading(true);
    const res = getAddresses().then((res) => {
      setLoading(false);

      const groups = ["CITY", "DISTRICT", "HOROO"];
      const grouped = {};
      res["data"].forEach(function (a: any) {
        groups
          .reduce(function (o: any, g, i) {
            o[a[g as keyof typeof a] as keyof typeof o] =
              o[a[g]] || (i + 1 === groups.length ? [] : {});
            return o[a[g]];
          }, grouped)
          .push(a);
      });
      setAddresses(grouped);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      registernum: "",
      mobile: "",
      email: "",
      services: [],
      city: "",
      district: "",
      khoroo: "",
      apartment: "",
      entrance: "",
      door: "",
      additional: "",
    },
  });
  const handleFormChange = (e: any) => {
    if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "district") {
      setDistrict(e.target.value);
    }
  };
  function handleLang(e: any) {
    // console.log(e);
    if (e.key == "Backspace") {
      return;
    }
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    // const englishAlphabetAndWhiteSpace = /[A-Za-z ]/g;
    const numberPatter = /^([-0-9])| +$/; //with space, and dash
    if (cyrillicPattern.test(e.key)) {
      // console.log('mn');
    } else {
      if (!numberPatter.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // console.log(values);
    const res = await newOrder(values);
    setLoading(false);
    toast({
      title: "Шинэ захиалга",
      description: res["message"],
    });
    if (res["result"] === "ok") {
      form.reset();
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <Breadcrumb data={breadcrumb} />
      <div className="flex justify-around flex-wrap">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={handleFormChange}
            className="space-y-4 w-[420px] bg-slate-50 shadow-md border border-slate-50 p-4 order-2 md:order-1"
          >
            <h5 className="text-brand-1 text-center">Ерөнхий мэдээлэл</h5>
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Овог</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registernum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Регистерын дугаар</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cust_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Хэрэглэгчийн төрөл</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      required
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="PSN" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Хувь хэрэглэгч
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="BUS" />
                        </FormControl>
                        <FormLabel className="font-normal">Бизнес</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="GOV" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Албан байгууллага
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
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Утасны дугаар</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>И-майл хаяг</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хүсэж буй үйлчилгээ</FormLabel>
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes("telephone")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      "telephone",
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "telephone"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Суурин утас
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes("internet")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, "internet"])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "internet"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Интернет
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes("katv")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, "katv"])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "katv"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            National КаТв
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </FormItem>
              )}
            />
             <h5 className="text-brand-1 mt-4 text-center">Захиалга өгөх хаяг</h5>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хот</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="city"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Хот сонгох" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[300px]">
                      {addresses &&
                        Object.entries(addresses).map((address: any) => (
                          <SelectItem value={address[0]} key={address[0]}>
                            {
                              (
                                Object.values(
                                  Object.values(
                                    address[1]
                                  )[0] as (typeof address)[1]
                                )[0] as (typeof address)[1][0]
                              )[0]["CITY"]
                            }
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Дүүрэг</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="district"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Дүүрэг сонгох" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[300px]">
                      {addresses &&
                        city != "" &&
                        Object.entries(
                          addresses[city as keyof typeof addresses]
                        ).map((address: any) => (
                          <SelectItem value={address[0]} key={address[0]}>
                            {
                              (
                                Object.values(
                                  address[1]
                                )[0] as (typeof address)[1]
                              )[0]["DISTRICT"]
                            }
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="khoroo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хороо</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name="khoroo"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Хороо сонгох" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[300px]">
                      {addresses &&
                        city != "" &&
                        district != "" &&
                        addresses[city as keyof typeof addresses] &&
                        addresses[city as keyof typeof addresses][district] &&
                        Object.entries(
                          addresses[city as keyof typeof addresses][district]
                        ).map((address: any) => (
                          <SelectItem
                            value={address[1][0]["HOROO_NAME"]}
                            key={address[0]}
                          >
                            {address[1][0]["HOROO_NAME"]}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Байр</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entrance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Орц</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="door"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тоот</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэмэлт тайлбар</FormLabel>
                  <FormControl>
                    <Input {...field} required onKeyDown={handleLang} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Захиалах</Button>
          </form>
        </Form>
        <div className="max-w-[400px] my-4 order-1">
          <Alert className="bg-yellow-100/80">
            <BsFillExclamationTriangleFill className="h-4 w-4" />
            <AlertDescription>
              Та энэхүү формыг зөвхөн Монгол хэлээр бөглөнө үү!
            </AlertDescription>
          </Alert>

          <Alert className="bg-cyan-100/80 mt-4">
            <AlertDescription>
              Бид таны хүсэлтийн хариуг таны цахим шуудангаар илгээх тул та
              өөрийн ашигладаг цахим шуудангийн хаягаа хаягаа бичнэ үү! Хариуг
              ажлын өдрийн 4-8 цагийн дотор мэдэгдэнэ.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Page;
