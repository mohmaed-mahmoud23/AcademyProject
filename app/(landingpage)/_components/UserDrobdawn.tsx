    "use client";
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
    import { Button } from "@/components/ui/button";
    import {
      BookOpen,
      Home,
      LayoutDashboardIcon,
      LogOut,
      Settings,
      User,
    } from "lucide-react";
    import Link from "next/link";

    export function UserDropdown() {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
            hero
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">hamppy</p>
              <p className="text-xs text-muted-foreground">
moha,ed
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={"/"}>
                <Home className="mr-2 h-4 w-4" />
                <span> Home</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/Coures"}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span> Coures </span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={"/dashbord"}>
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                <span> Dashbord </span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
