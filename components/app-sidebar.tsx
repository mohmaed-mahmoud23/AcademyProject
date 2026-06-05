"use client";

import * as React from "react";
import Image from "next/image";
import Logo from "@/public/habib-logo.jpg";
import {
  IconDashboard,
  IconListDetails,
} from "@tabler/icons-react";

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
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Admin");

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
    <Sidebar collapsible="offcanvas" {...props} side="left">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image src={Logo} alt="Habib Academy Logo" width={20} height={20} className="rounded-full object-cover" />
                <span className="text-base font-semibold">{t("brand")}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
