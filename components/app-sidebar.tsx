"use client";

import * as React from "react";

import {
  IconDashboard,
  IconListDetails,
  IconLogout,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Logo from "@/public/habib-logo.jpg";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslations, useLocale } from "next-intl";
import { ApiSlice, useLogoutMutation } from "@/app/redux/slices/ApiSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import cookieService from "@/lib/cookieService";
import { toast } from "sonner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { toggleSidebar } = useSidebar();

  const router = useRouter();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("logout success");
    } catch {
      console.log("API logout failed");
    }
    cookieService.remove("token", { path: "/" });
    cookieService.remove("refreshToken", { path: "/" });
    dispatch(ApiSlice.util.resetApiState());
    router.replace("/");
  };

  const data = {
    navMain: [
      {
        title: t("dashboard"),
        url: "/Admin",
        icon: IconDashboard,
      },
      {
        title: t("batches"),
        url: "/Admin/Batches",
        icon: IconListDetails,
      },
      {
        title: t("articles"),
        url: "/Admin/articles",
        icon: IconListDetails,
      },
      {
        title: t("createAdmin"),
        url: "/Admin/createAdmin",
        icon: IconListDetails,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props} side="left" mobileSide={isRTL ? "right" : "left"}>

      {/* Header: Logo + Brand + Close Button */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-1 py-1">
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5 flex-1"
              >
                <a href="#">
                  <Image
                    src={Logo}
                    alt="Habib Academy"
                    width={28}
                    height={28}
                    className="rounded-md object-cover"
                  />
                  <span className="text-base font-semibold">{t("brand")}</span>
                </a>
              </SidebarMenuButton>

              <button
                onClick={toggleSidebar}
                className="ms-2 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
                aria-label="Close sidebar"
              >
                <IconX size={16} />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer: Logout + NavUser */}
      <SidebarFooter>
        <div className="px-2 pb-1">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors font-semibold text-sm"
          >
            <IconLogout size={18} />
            <span>{t("logout")}</span>
          </button>
        </div>
        <NavUser />
      </SidebarFooter>

    </Sidebar>
  );
}
