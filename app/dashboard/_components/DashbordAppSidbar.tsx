"use client"

import * as React from "react"
import Image from "next/image"
import Logo from "@/public/habib-logo.jpg"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconPepperOff,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Data object moved inside component to use translations

import { useTranslations } from "next-intl"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("DashboardSidebar")

  const data = {
    navMain: [
      {
        title: t("dashboard"),
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: t("myTracks"),
        url: "/dashboard/BatchesStudent",
        icon: IconDashboard,
      },
    ],
    navClouds: [
      {
        title: t("capture"),
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: t("activeProposals"),
            url: "#",
          },
          {
            title: t("archived"),
            url: "#",
          },
        ],
      },
      {
        title: t("proposal"),
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: t("activeProposals"),
            url: "#",
          },
          {
            title: t("archived"),
            url: "#",
          },
        ],
      },
      {
        title: t("prompts"),
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: t("activeProposals"),
            url: "#",
          },
          {
            title: t("archived"),
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: t("settings"),
        url: "/dashboard/settings",
        icon: IconSettings,
      },
      {
        title: t("getHelp"),
        url: "#",
        icon: IconHelp,
      },
      {
        title: t("search"),
        url: "#",
        icon: IconSearch,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image src={Logo} alt="Habib Academy Logo" width={20} height={20} className="rounded-full object-cover" />
                <span className="text-base font-semibold">{t("brandFirst")} <span className="text-primary">{t("brandSecond")}</span></span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
