"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bell,
  Check,
  Clock,
  Inbox,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  Info,
} from "lucide-react";
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
import {
  useGetMeQuery,
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/app/redux/slices/ApiSlice";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function NotificationBell() {
  const t = useTranslations("NotificationBell");
  const { data, isLoading } = useGetNotificationsQuery();
  const router = useRouter();

  const [notifications, setNotifications] = useState<Record<string, any>[]>([]);
  const { data: userData } = useGetMeQuery();
  const role = userData?.roles?.[0] || "Student";

  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  useEffect(() => {
    if (data?.data?.items) {
      setNotifications(data.data.items);
    }
  }, [data]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const timeAgo = useCallback(
    (dateString: string) => {
      const now = new Date();
      const past = new Date(dateString);
      const diffInMs = now.getTime() - past.getTime();
      const diffInMins = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if (diffInMins < 1) return t("justNow");
      if (diffInMins < 60) return t("minutesAgo", { count: diffInMins });
      if (diffInHours < 24) return t("hoursAgo", { count: diffInHours });
      return t("daysAgo", { count: diffInDays });
    },
    [t],
  );

  // mark single notification
  const markAsRead = async (notification: Record<string, any>) => {
    console.log("nit", notification);

    try {
      if (notification.actionUrl) {
        // استخراج assignmentId من actionUrl
        const assignmentId = notification.actionUrl.split("/")[2];

        // بناء المسار حسب folder structure بتاعك
        const url = `/Admin/Batches/${notification.batchId}/tracks/${notification.trackId}/lectures/${notification.lectureId}/assignments/${assignmentId}/submissions`;

        router.push(url);
      } else {
        // لو مفيش actionUrl بس فيه راوت تاني ممكن نبعتله
        // router.push(notification.urlTarget);
      }

      if (!notification.isRead) {
        await markRead(notification.id).unwrap();

        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllRead().unwrap();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Assignment":
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case "Alert":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const renderNotification = useCallback(
    (notification: Record<string, any>) => {
      let title = notification.title;
      let message = notification.message;

      if (role === "Student") {
        return { title, message };
      }

      const normTitle = (notification.title || "").toLowerCase();

      const deepSearch = (obj: Record<string, any>, target: string): unknown => {
        if (!obj || typeof obj !== "object") return null;
        for (const key in obj) {
          if (key.toLowerCase().includes(target.toLowerCase())) return obj[key];
          if (typeof obj[key] === "object") {
            const found = deepSearch(obj[key], target);
            if (found) return found;
          }
        }
        return null;
      };

      let metadataTitle = null;
      try {
        const metadata =
          typeof notification.metadata === "string"
            ? JSON.parse(notification.metadata)
            : notification.metadata || {};

        metadataTitle =
          deepSearch(metadata, "title") ||
          deepSearch(metadata, "name") ||
          notification.lectureTitle ||
          notification.trackTitle;

        if (
          metadataTitle &&
          typeof metadataTitle === "string" &&
          metadataTitle.toLowerCase() ===
          (notification.title || "").toLowerCase()
        ) {
          metadataTitle = null;
        }
      } catch { }

      if (
        normTitle.includes("new lecture") ||
        normTitle === "track title" ||
        normTitle.includes("تم إضافة محاضرة") ||
        normTitle.includes("محاضرة")
      ) {
        title = t("newLectureTitle");

        const titleMatch =
          message.match(/['"«»“”]([^'"«»“”]+)['"«»“”]/) ||
          message.match(/lecture\s+(['"]?)(.+)\1\s+has/i) ||
          message.match(/lecture\s+([^\s,]+)/i) ||
          message.match(/محاضرة\s+(['"«»“”]?)(.+)\1/);

        let resolvedTitle = metadataTitle || titleMatch?.[1] || titleMatch?.[2];

        if (!resolvedTitle) {
          resolvedTitle =
            deepSearch(notification.metadata, "lecture") ||
            deepSearch(notification.metadata, "track");
        }

        if (
          resolvedTitle &&
          typeof resolvedTitle === "string" &&
          resolvedTitle.toLowerCase() !== "new lecture added"
        ) {
          message = t("newLectureMessage", {
            title: resolvedTitle.trim().replace(/['.]/g, ""),
          });
        } else {
          return { title, message };
        }
      } else if (
        normTitle.includes("assignment graded") ||
        normTitle.includes("تم تقييم الواجب")
      ) {
        title = t("assignmentGradedTitle");

        const metadataScore =
          deepSearch(notification.metadata, "score") ||
          message.match(/Score:\s*(\d+)/i)?.[1] ||
          "0";

        const resolvedTitle =
          metadataTitle ||
          message.match(/submission for\s+([^,.]+)/i)?.[1] ||
          message.match(/لـ\s+([^,.]+)/)?.[1] ||
          "";

        message = t("assignmentGradedMessage", {
          title: resolvedTitle.trim(),
          score: metadataScore,
        });
      }

      return { title, message };
    },
    [t, role],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-primary/10 group transition-all duration-300"
        >
          <Bell
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              unreadCount > 0 && "group-hover:rotate-[15deg]",
            )}
          />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-primary items-center justify-center text-[10px] font-black text-primary-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0 rounded-3xl border-border/40 shadow-2xl overflow-hidden backdrop-blur-xl bg-card/95"
      >
        <div className="flex justify-between items-center p-5 bg-muted/30 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-primary" />
            <DropdownMenuLabel className="p-0 font-black text-lg tracking-tight">
              {t("notifications")}
            </DropdownMenuLabel>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
              onClick={markAllAsRead}
            >
              <Check className="w-3.5 h-3.5 me-1.5" />
              {t("markAllRead")}
            </Button>
          )}
        </div>

        <ScrollArea className="h-[420px]">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center space-y-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="h-4 w-32 bg-muted rounded" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-muted/50 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-muted-foreground">
                  {t("noNotifications")}
                </p>
                <p className="text-xs font-medium text-muted-foreground/50">
                  You&apos;re all caught up!
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {notifications.map((notification) => {
                const { title, message } = renderNotification(notification);
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification)}
                    className={cn(
                      "p-5 cursor-pointer transition-all duration-300 relative group text-start",
                      !notification.isRead
                        ? "bg-primary/[0.03] hover:bg-primary/[0.06]"
                        : "hover:bg-muted/50",
                    )}
                  >
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          "shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-sm",
                          !notification.isRead
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted border border-border/40",
                        )}
                      >
                        {getIcon(notification.type || "Info")}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h5
                            className={cn(
                              "text-sm leading-tight transition-colors",
                              !notification.isRead
                                ? "font-black text-foreground"
                                : "font-semibold text-muted-foreground",
                            )}
                          >
                            {title}
                          </h5>
                          {!notification.isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary mt-1 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                          )}
                        </div>

                        <p
                          className={cn(
                            "text-xs leading-relaxed line-clamp-2",
                            !notification.isRead
                              ? "font-bold text-muted-foreground"
                              : "font-medium text-muted-foreground/60",
                          )}
                        >
                          {message}
                        </p>

                        <div className="flex items-center gap-1.5 pt-1 text-muted-foreground/40 font-black uppercase tracking-wider text-[10px]">
                          <Clock className="w-3 h-3" />
                          <span>{timeAgo(notification.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator className="m-0" />
        <div className="p-3 bg-muted/10 text-center">
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
            {t("latestUpdates")}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
