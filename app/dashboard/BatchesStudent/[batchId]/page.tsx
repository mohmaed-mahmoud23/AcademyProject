"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetBatchtracksQuery } from "@/app/redux/slices/ApiSlice";
import { TrackCard } from "@/app/dashboard/_components/TrackCard";
import { Layers, Loader2, Target } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BatchTracksPage() {
  const t = useTranslations("BatchTracksPage");
  const params = useParams();
  const batchId = params.batchId as string;

  const { data, isLoading, error } = useGetBatchtracksQuery(batchId);

  if (isLoading) return (
    <div className="flex h-[80vh] justify-center w-full items-center font-bold text-muted-foreground flex-col gap-4">
       <Loader2 className="w-12 h-12 animate-spin text-primary" />
       <p>{t("loadingTracks")}</p>
    </div>
  );

  if (!data) return (
    <div className="flex h-[70vh] justify-center w-full items-center font-extrabold text-foreground flex-col text-center p-6">
       <div className="p-6 bg-primary/10 rounded-full mb-6">
          <Target className="w-16 h-16 text-primary" />
       </div>
       <h2 className="text-3xl tracking-tight">{t("selectBatch")}</h2>
       <p className="text-muted-foreground mt-2 font-medium">{t("noDataAvailable")}</p>
    </div>
  );

  const colors: Array<"blue" | "purple" | "emerald" | "amber"> = ["blue", "purple", "emerald", "amber"];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-center md:text-start flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
           <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="p-3 bg-primary/10 rounded-2xl">
                 <Layers className="text-primary w-6 h-6" />
              </span>
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{t("learningPath")}</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-foreground">{t("batchTracks")}</h1>
           <p className="text-muted-foreground mt-4 text-lg font-medium max-w-xl">{t("tracksSubtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.data?.map((track: unknown, index: number) => (
          <Link key={track.id} href={`/dashboard/BatchesStudent/${batchId}/${track.id}/lectures`} className="block focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-[2rem] transition-all">
             <TrackCard 
                name={track.name}
                category={t("activeTrack")}
                color={colors[index % colors.length]}
                delay={index * 0.1}
             />
          </Link>
        ))}
      </div>
      
      {data?.data?.length === 0 && (
         <div className="p-12 text-center border-2 border-dashed border-border rounded-3xl">
           <p className="text-muted-foreground text-lg font-bold">{t("noTracksFound")}</p>
         </div>
      )}
    </div>
  );
}
