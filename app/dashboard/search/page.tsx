"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Layers,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  X,
  Clock,
} from "lucide-react";
import {
  useGetMyBatchesQuery,
  useGetBatchtracksQuery,
  useGetlechtuertrackQuery,
  useGetStudentDashboardQuery,
} from "@/app/redux/slices/ApiSlice";
import { Input } from "@/components/ui/input";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LectureItem {
  id: string;
  title: string;
  trackName: string;
}

interface TrackItem {
  id: string;
  name: string;
  batchName: string;
}

interface AssignmentItem {
  title: string;
  dueDate: string;
  courseName: string;
}

// ─── Silent fetcher components ────────────────────────────────────────────────

function LecturesFetcher({
  trackId,
  trackName,
  onLoaded,
}: {
  trackId: string;
  trackName: string;
  onLoaded: (items: LectureItem[]) => void;
}) {
  const { data } = useGetlechtuertrackQuery(trackId);

  useEffect(() => {
    if (data?.data?.length) {
      onLoaded(data.data.map((l) => ({ id: l.id, title: l.title, trackName })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return null;
}

function TracksFetcher({
  batchId,
  batchName,
  onTracksLoaded,
  onLecturesLoaded,
}: {
  batchId: string;
  batchName: string;
  onTracksLoaded: (items: TrackItem[]) => void;
  onLecturesLoaded: (items: LectureItem[]) => void;
}) {
  const { data } = useGetBatchtracksQuery(batchId);
  const tracks = data?.data ?? [];

  useEffect(() => {
    if (tracks.length) {
      onTracksLoaded(tracks.map((tr) => ({ id: tr.id, name: tr.name, batchName })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {tracks.map((tr) => (
        <LecturesFetcher
          key={tr.id}
          trackId={tr.id}
          trackName={tr.name}
          onLoaded={onLecturesLoaded}
        />
      ))}
    </>
  );
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function ResultSection({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  count,
  children,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-[2rem] border border-border/50 dark:border-slate-800 shadow-sm overflow-hidden"
    >
      <div className="p-5 border-b border-border/50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            <Icon size={18} className={iconColor} />
          </div>
          <span className="font-bold text-foreground">{title}</span>
        </div>
        <span className="text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
          {count}
        </span>
      </div>
      <div className="divide-y divide-border/40 dark:divide-slate-800">
        {children}
      </div>
    </motion.div>
  );
}

function ResultItem({
  title,
  subtitle,
  subtitleLabel,
  icon: Icon = Clock,
  showIcon = false,
}: {
  title: string;
  subtitle: string;
  subtitleLabel: string;
  icon?: React.ElementType;
  showIcon?: boolean;
}) {
  return (
    <div className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm truncate">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
          {showIcon && <Icon size={11} />}
          <span className="font-bold uppercase tracking-wider">{subtitleLabel}:</span>
          <span>{subtitle}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const t = useTranslations("StudentSearch");
  const locale = useLocale();
  const router = useRouter();
  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  const [query, setQuery] = useState("");
  const [allTracks, setAllTracks] = useState<TrackItem[]>([]);
  const [allLectures, setAllLectures] = useState<LectureItem[]>([]);

  const { data: batchesData } = useGetMyBatchesQuery();
  const { data: dashboardData } = useGetStudentDashboardQuery();

  const batches = batchesData?.data?.items ?? [];

  const assignments: AssignmentItem[] = useMemo(
    () =>
      dashboardData?.data?.upcomingDeadlines?.map((d) => ({
        title: d.assignmentTitle,
        dueDate: d.dueDate,
        courseName: d.courseName,
      })) ?? [],
    [dashboardData]
  );

  const handleTracksLoaded = useCallback((items: TrackItem[]) => {
    setAllTracks((prev) => {
      const existing = new Set(prev.map((tr) => tr.id));
      const fresh = items.filter((tr) => !existing.has(tr.id));
      return fresh.length ? [...prev, ...fresh] : prev;
    });
  }, []);

  const handleLecturesLoaded = useCallback((items: LectureItem[]) => {
    setAllLectures((prev) => {
      const existing = new Set(prev.map((l) => l.id));
      const fresh = items.filter((l) => !existing.has(l.id));
      return fresh.length ? [...prev, ...fresh] : prev;
    });
  }, []);

  const trimmed = query.trim().toLowerCase();
  const hasQuery = trimmed.length >= 1;

  const filteredLectures = useMemo(
    () =>
      hasQuery
        ? allLectures.filter(
            (l) =>
              l.title.toLowerCase().includes(trimmed) ||
              l.trackName.toLowerCase().includes(trimmed)
          )
        : [],
    [allLectures, trimmed, hasQuery]
  );

  const filteredTracks = useMemo(
    () =>
      hasQuery
        ? allTracks.filter(
            (tr) =>
              tr.name.toLowerCase().includes(trimmed) ||
              tr.batchName.toLowerCase().includes(trimmed)
          )
        : [],
    [allTracks, trimmed, hasQuery]
  );

  const filteredAssignments = useMemo(
    () =>
      hasQuery
        ? assignments.filter(
            (a) =>
              a.title.toLowerCase().includes(trimmed) ||
              a.courseName.toLowerCase().includes(trimmed)
          )
        : [],
    [assignments, trimmed, hasQuery]
  );

  const totalResults =
    filteredLectures.length + filteredTracks.length + filteredAssignments.length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Silent data fetchers — rendered outside visible tree */}
      {batches.map((batch) => (
        <TracksFetcher
          key={batch.id}
          batchId={batch.id}
          batchName={batch.name}
          onTracksLoaded={handleTracksLoaded}
          onLecturesLoaded={handleLecturesLoaded}
        />
      ))}

      {/* Mobile back button */}
      <motion.button
        initial={{ opacity: 0, x: locale === "ar" ? 10 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => router.back()}
        className="md:hidden flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
      >
        <BackIcon size={18} />
        <span>{t("back")}</span>
      </motion.button>

      {/* Header + Search bar */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-8 shadow-xl border border-slate-700/50"
      >
        <div className="absolute inset-0 bg-cyan-600/5" />
        <div className="absolute -end-16 -top-16 w-48 h-48 rounded-full bg-cyan-600/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-5 mb-6">
          <div className="p-4 bg-cyan-600/20 rounded-2xl border border-cyan-500/30">
            <Search className="text-cyan-400 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">{t("title")}</h1>
            <p className="text-slate-400 mt-1 text-sm font-medium">{t("subtitle")}</p>
          </div>
        </div>

        <div className="relative z-10">
          <Search
            size={18}
            className="absolute start-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            autoFocus
            className="ps-11 pe-11 h-12 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50 transition-all text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Results area */}
      <AnimatePresence mode="wait">
        {!hasQuery ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 flex flex-col items-center text-center space-y-3"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">{t("searchPrompt")}</p>
          </motion.div>
        ) : totalResults === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 flex flex-col items-center text-center space-y-3"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-foreground font-bold text-lg">{t("noResults")}</p>
            <p className="text-muted-foreground text-sm">{t("noResultsHint")}</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {filteredLectures.length > 0 && (
              <ResultSection
                icon={BookOpen}
                iconBg="bg-blue-100 dark:bg-blue-900/30"
                iconColor="text-blue-600 dark:text-blue-400"
                title={t("lectures")}
                count={filteredLectures.length}
              >
                {filteredLectures.map((lec) => (
                  <ResultItem
                    key={lec.id}
                    title={lec.title}
                    subtitle={lec.trackName}
                    subtitleLabel={t("trackLabel")}
                  />
                ))}
              </ResultSection>
            )}

            {filteredTracks.length > 0 && (
              <ResultSection
                icon={Layers}
                iconBg="bg-purple-100 dark:bg-purple-900/30"
                iconColor="text-purple-600 dark:text-purple-400"
                title={t("tracks")}
                count={filteredTracks.length}
              >
                {filteredTracks.map((tr) => (
                  <ResultItem
                    key={tr.id}
                    title={tr.name}
                    subtitle={tr.batchName}
                    subtitleLabel={t("batchLabel")}
                  />
                ))}
              </ResultSection>
            )}

            {filteredAssignments.length > 0 && (
              <ResultSection
                icon={ClipboardList}
                iconBg="bg-amber-100 dark:bg-amber-900/30"
                iconColor="text-amber-600 dark:text-amber-400"
                title={t("assignments")}
                count={filteredAssignments.length}
              >
                {filteredAssignments.map((asgn, idx) => (
                  <ResultItem
                    key={idx}
                    title={asgn.title}
                    subtitle={new Date(asgn.dueDate).toLocaleDateString(
                      locale === "ar" ? "ar-SA" : "en-US",
                      { dateStyle: "medium" }
                    )}
                    subtitleLabel={t("dueLabel")}
                    icon={Clock}
                    showIcon
                  />
                ))}
              </ResultSection>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
