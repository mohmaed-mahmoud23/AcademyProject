"use client";

import {
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ApiSlice, useGetMeQuery } from "@/app/redux/slices/ApiSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import cookieService from "@/lib/cookieService";
import { useLogoutMutation } from "@/app/redux/slices/ApiSlice";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("Admin");

  const [logout] = useLogoutMutation();
  const { data } = useGetMeQuery();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("logout success");
    } catch (err) {
      console.log("API logout failed");
    }

    cookieService.remove("token", { path: "/" });
    cookieService.remove("refreshToken", { path: "/" });

    dispatch(ApiSlice.util.resetApiState());
    router.replace("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {data?.profileImageUrl ? (
                  <AvatarImage src={data.profileImageUrl} alt={data.fullName} />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {data?.firstName?.[0]}
                    {data?.lastName?.[0]}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{data?.fullName}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {data?.email}
                </span>
              </div>
              <IconDotsVertical className="ms-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {data?.profileImageUrl ? (
                    <AvatarImage
                      src={data.profileImageUrl}
                      alt={data.fullName}
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {data?.firstName?.[0]}
                      {data?.lastName?.[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-medium">{data?.fullName}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {data?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout className="me-2" />
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
