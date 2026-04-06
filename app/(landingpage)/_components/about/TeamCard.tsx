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
}

export default function TeamCard({ name, role, image, delay = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-border/50 bg-card/40 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 rounded-[2rem] border hover:border-primary/30">
        <CardContent className="p-8 flex flex-col items-center text-center">
          {/* Avatar Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Avatar className="w-24 h-24 border-2 border-background shadow-xl ring-2 ring-primary/10">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="text-2xl font-bold bg-secondary text-secondary-foreground">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Online Indicator */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-card rounded-full" />
          </div>

          <div className="space-y-1 mb-6">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm font-medium text-muted-foreground line-clamp-1">
              {role}
            </p>
          </div>

          {/* Social Links (Premium Micro-interactions) */}
          <div className="flex gap-3 mt-auto">
            <button className="p-2.5 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Twitter size={18} />
            </button>
            <button className="p-2.5 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Linkedin size={18} />
            </button>
            <button className="p-2.5 rounded-full bg-muted/50 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Mail size={18} />
            </button>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
