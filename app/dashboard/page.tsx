"use client";

import Getauthme from "./(groub)/authmy/UseGetauthme";
import { ModernStudentDashboard } from "./_components/ModernStudentDashboard";
import { useGetStudentDashboardQuery } from "@/app/redux/slices/ApiSlice";
import { useTranslations } from "next-intl";

export default function PagesIndex() {
    const { data, isLoading, error } = useGetStudentDashboardQuery();
    const t = useTranslations("StudentDashboard");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen  ">
                <div className="space-y-4 text-center">
                    <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-500 font-medium animate-pulse">{t("loading")}</p>
                </div>
            </div>
        );
    }

    if (error || !data?.data) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                        ⚠️
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{t("error")}</h2>
                    <p className="text-gray-500 text-sm">We couldn't load your dashboard data. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <ModernStudentDashboard data={data.data} />
        </div>
    );
}
