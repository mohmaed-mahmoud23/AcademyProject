"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin, Mail } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  image?: string;
  delay?: number;
  imageClassName?: string;
}

export default function TeamCard({
  name,
  role,
  image,
  delay = 0,
  imageClassName
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group h-full"
    >
      <Card className="relative h-full overflow-hidden border-border/50 bg-card/30 backdrop-blur-2xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] border hover:border-primary/30">
        <CardContent className="p-8 flex flex-col items-center text-center h-full">
          {/* Image Container */}
          <div className="relative mb-6 w-full max-w-[200px] aspect-square mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-2xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-background shadow-xl ring-2 ring-primary/10">
              <img
                src={image}
                alt={name}
                className={`w-full h-full object-cover scale-110 ${imageClassName || ""}`}
              />
            </div>

            {/* Online Indicator */}
            <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-2 border-card rounded-full z-10" />
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
              {name}
            </h3>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary/80">
              {role}
            </p>
          </div>

          {/* Social Links (Premium Micro-interactions) */}
          <div className="flex gap-4 mt-auto">
            <button className="p-3 rounded-full bg-muted/30 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Twitter size={20} />
            </button>
            <button className="p-3 rounded-full bg-muted/30 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Linkedin size={20} />
            </button>
            <button className="p-3 rounded-full bg-muted/30 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Mail size={20} />
            </button>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
