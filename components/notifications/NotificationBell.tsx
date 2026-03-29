"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useGetNotificationsQuery, useMarkAllNotificationsReadMutation, useMarkNotificationReadMutation } from "@/app/redux/slices/ApiSlice";


export default function NotificationBell() {

  const { data, isLoading } = useGetNotificationsQuery();
  const router = useRouter();

  const [notifications, setNotifications] = useState<any[]>([]);

  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  // تحميل النوتيفيكيشن
  useEffect(() => {
    if (data?.data?.items) {
      setNotifications(data.data.items);
    }
  }, [data]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // mark single notification
const markAsRead = async (notification: any) => {
  console.log("nit", notification);

  try {

    // استخراج assignmentId من actionUrl
    const assignmentId = notification.actionUrl.split("/")[2];

    // بناء المسار حسب folder structure بتاعك
    const url = `/Admin/Batches/${notification.batchId}/tracks/${notification.trackId}/lectures/${notification.lectureId}/assignments/${assignmentId}/submissions`;

    router.push(url);

    await markRead(notification.id).unwrap();

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

  } catch (err) {
    console.error(err);
  }
};
  // mark all notifications
  const markAllAsRead = async () => {
    try {
      await markAllRead().unwrap();

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell size={22} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl">
        <div className="flex justify-between items-center p-4">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>

          <Button
            variant="link"
            size="sm"
            className="h-auto p-0 text-xs"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>

        <DropdownMenuSeparator />

        <ScrollArea className="max-h-80">
          {isLoading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification)}
                className={`p-4 border-b cursor-pointer transition hover:bg-muted ${
                  !notification.isRead ? "bg-muted/40" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <h5 className="text-sm font-medium">{notification.title}</h5>

                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-1">
                  {notification.message}
                </p>

                <span className="text-[10px] text-muted-foreground">
                  {notification.createdAt}
                </span>
              </div>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}