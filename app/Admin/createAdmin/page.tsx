/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { toast } from "sonner";
import { adminscemacreta, CreateADminFormValues } from "@/lib/zodSecma";
import { AdminResponse } from "@/app/interfaces";
import { useCerateadminMutation } from "@/app/redux/slices/ApiSlice";
import { Mail, Lock, User, UserRound, ShieldPlus } from "lucide-react";
import AdminsList from "../_components/AdminsList";
import { useTranslations } from "next-intl";

export default function CreateAdmin() {
  const t = useTranslations("AdminCreateAdmin");
  const [createAdmin, { isLoading }] = useCerateadminMutation();

  const form = useForm<CreateADminFormValues>({
    resolver: zodResolver(adminscemacreta),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateADminFormValues) => {
    try {
      const result: AdminResponse = await createAdmin(data).unwrap();
      toast.success(result.message || t("success"));
      form.reset();
    } catch (err: any) {
      const message =
        err?.data?.message || err.message || t("error");
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[90vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 p-8 sm:p-14 shadow-2xl">
          <div className="absolute inset-0 bg-[#000000] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-900 opacity-20 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-shrink-0 h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <ShieldPlus className="w-12 h-12 text-white drop-shadow-md" />
            </div>
            <div className="text-center sm:text-start flex-1 space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-sm">
                {t("title")}
              </h1>
              <p className="text-base sm:text-lg text-indigo-100 font-medium max-w-2xl px-4 sm:px-0">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-500 -z-10"></div>
            
            <div className="bg-white dark:bg-[#0f172a]/80 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  {t("createAdmin")}
                </h2>
              </div>
              
              <div className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                              {t("firstName")}
                            </FormLabel>
                            <FormControl>
                              <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors h-[18px] w-[18px]" />
                                <Input
                                  {...field}
                                  placeholder={t("firstNamePlaceholder")}
                                  className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-white dark:focus:bg-slate-900 transition-all shadow-sm"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                              {t("lastName")}
                            </FormLabel>
                            <FormControl>
                              <div className="relative group/input">
                                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors h-[18px] w-[18px]" />
                                <Input
                                  {...field}
                                  placeholder={t("lastNamePlaceholder")}
                                  className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-white dark:focus:bg-slate-900 transition-all shadow-sm"
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                            {t("email")}
                          </FormLabel>
                          <FormControl>
                            <div className="relative group/input">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors h-[18px] w-[18px]" />
                              <Input
                                type="email"
                                {...field}
                                placeholder={t("emailPlaceholder")}
                                className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-white dark:focus:bg-slate-900 transition-all shadow-sm"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
                            {t("password")}
                          </FormLabel>
                          <FormControl>
                            <div className="relative group/input">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-indigo-500 transition-colors h-[18px] w-[18px]" />
                              <Input
                                type="password"
                                {...field}
                                placeholder={t("passwordPlaceholder")}
                                className="pl-12 h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-900/50 dark:border-slate-800 dark:text-white dark:focus:bg-slate-900 transition-all shadow-sm"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 mt-4 rounded-xl font-bold text-base shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] hover:-translate-y-0.5
                        bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>{t("creating")}</span>
                        </div>
                      ) : (
                        t("submitBtn")
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>

          {/* List Column */}
          <div className="lg:col-span-7 h-full">
            <AdminsList />
          </div>
        </div>
      </div>
    </div>
  );
}
