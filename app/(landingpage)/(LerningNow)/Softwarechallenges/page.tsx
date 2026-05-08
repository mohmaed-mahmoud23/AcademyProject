"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code2, Trophy, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Softwarechallenges() {
  const t = useTranslations("SoftwareChallengesPage");
  const challenges: unknown[] = []; // حاليا فاضي زي ما قلت

  return (
    <section className="min-h-screen bg-background text-foreground px-6 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-2xl bg-muted">
            <Code2 size={28} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {t("title")}
        </h1>

        <p className="text-muted-foreground mt-4 text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Empty State */}
      {challenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center mt-20"
        >
          <div className="p-6 rounded-full bg-muted mb-6">
            <Trophy size={40} />
          </div>

          <h2 className="text-2xl font-semibold">
            {t("noChallenges")}
          </h2>

          <p className="text-muted-foreground mt-3 max-w-md">
            {t("noChallengesDesc")}
          </p>

          <Button className="mt-6">
            {t("notifyMe")}
          </Button>
        </motion.div>
      )}

      {/* If challenges exist later */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {challenges.map((c, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50 bg-card/70 backdrop-blur-xl rounded-2xl">

              <CardContent className="p-6">

                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{c.title}</h3>

                  <Badge className={
                    c.level === "Easy"
                      ? "bg-green-500 text-white"
                      : c.level === "Medium"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                  }>
                    {c.level}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {c.desc}
                </p>

                <Button className="w-full">
                  {t("startChallenge")} <Zap className="ms-2" size={16} />
                </Button>

              </CardContent>

            </Card>
          </motion.div>
        ))}
      </div>

    </section>
  );
}