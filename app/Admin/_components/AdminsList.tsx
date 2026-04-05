"use client";

import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
} from "@/app/redux/slices/ApiSlice";
import { Trash2, User, ShieldAlert, Crown } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function AdminsList() {
  const t = useTranslations("AdminCreateAdmin");
  
  const { data, isLoading } = useGetAdminsQuery({
    search: "",
    includeSuperAdmins: true,
  });

  const [deleteAdmin, { isLoading: deleting }] = useDeleteAdminMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteAdmin(id).unwrap();
      toast.success(t("deleteSuccess"));
    } catch (err: any) {
      toast.error(err?.data?.message || t("deleteError"));
    }
  };

  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col justify-center items-center rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading amazing admins...</p>
      </div>
    );
  }

  const admins: any[] = Array.isArray(data?.data) ? data.data : (data?.data as any) || [];

  return (
    <div className="bg-white dark:bg-[#0f172a]/80 dark:backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {t("adminsListTitle")}
            <span className="flex items-center justify-center px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 text-xs font-black">
              {admins.length}
            </span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t("adminsListSubtitle")}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scrollbar max-h-[600px]">
        {admins.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 border border-slate-200 dark:border-white/5">
              <ShieldAlert className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">{t("noAdmins")}</h3>
          </div>
        ) : (
          <div className="grid gap-4">
            {admins.map((admin: any, idx: number) => (
              <div
                key={admin.id || admin.userId || idx}
                className="group relative flex items-center justify-between p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Info */}
                <div className="flex items-center gap-4 relative z-10 w-full overflow-hidden">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-500/20 dark:to-purple-500/20 flex flex-shrink-0 items-center justify-center shadow-inner border border-white/50 dark:border-white/5">
                      <User className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                    </div>
                    {/* Fake online badge */}
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 dark:text-slate-100 truncate text-base flex items-center gap-2">
                      {admin.firstName} {admin.lastName}
                      {admin.isSuperAdmin && (
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5" dir="ltr">
                      {admin.email}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="relative z-10 flex ml-4">
                  <button
                    onClick={() => handleDelete(admin.userId || admin.id)}
                    disabled={deleting}
                    title={t("deleteAdmin")}
                    className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
