"use client";

import { useGetMeQuery } from "@/app/redux/slices/ApiSlice"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, User, Shield } from "lucide-react";

export default function Getauthme() {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="w-[400px] space-y-4 p-6">
          <Skeleton className="h-16 w-16 rounded-full mx-auto" />
          <Skeleton className="h-6 w-[200px] mx-auto" />
          <Skeleton className="h-4 w-[250px] mx-auto" />
          <Skeleton className="h-4 w-[150px] mx-auto" />
        </Card>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        Failed to load user data
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px] flex justify-center items-center p-4">
      {/* Gradient ثابت */}
      <div className="absolute inset-0  pointer-events-none rounded-xl"></div>

      {/* Card ثابت + hover effect */}
      <Card className="relative w-full max-w-md shadow-xl border-0 bg-background/80 backdrop-blur transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <CardHeader className="flex flex-col items-center text-center space-y-3">
          <Avatar className="w-20 h-20 shadow-md">
            <AvatarImage src={data.profileImageUrl || ""} />
            <AvatarFallback className="text-xl font-bold">
              {data.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-xl font-semibold">
            {data.fullName}
          </CardTitle>
          <CardDescription>@{data.userName}</CardDescription>

          <div className="flex gap-2">
            {data.roles.map((role, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                <Shield className="w-3 h-3 me-1" />
                {role}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{data.email}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{data.phoneNumber || "No phone number"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              ID: {data.userId}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
