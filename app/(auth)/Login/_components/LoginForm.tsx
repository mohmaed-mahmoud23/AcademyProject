"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/app/redux/slices/ApiSlice";
import { LoginResponse } from "@/app/interfaces";
import { LoginFormType, loginSchema } from "@/lib/zodSecma";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const router =useRouter()
  // Init form with Zod resolver
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: true,
    },
  });

  // On submit
const onSubmit = async (data: LoginFormType) => {
  setErrorMessage(""); // امسح أي رسالة خطأ قديمة
  try {
    const result: LoginResponse = await login(data).unwrap();
    console.log("Full login response:", result);

    const token = result.data.accessToken;

    localStorage.setItem("token", token);







    // عرض رسالة نجاح باستخدام toast
    toast.success(result.message);
    form.reset({
      username: "",
      password: "",
      rememberMe: true, // لو عندك rememberMe
    });

    console.log("Token stored:", token);
    console.log("Roles:", result.data.roles);
    if(result.data.roles){
    router.push("/Admin")
    }
  } catch (err: any) {
    console.error("Login error:", err);
    const message = err.data?.message || err.message || "Login failed";
    setErrorMessage(message);

    // عرض toast للخطأ لو حبيت
    toast.error(message);
  }
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
