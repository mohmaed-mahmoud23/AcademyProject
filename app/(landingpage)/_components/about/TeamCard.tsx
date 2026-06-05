"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  image?: string;
  delay?: number;
  imageClassName?: string;
  whatsapp?: string;
  email?: string;
}

export default function TeamCard({
  name,
  role,
  image,
  delay = 0,
  imageClassName,
  whatsapp,
  email,
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

          {/* Social Links */}
          <div className="flex gap-4 mt-auto">
            <a href={whatsapp ? `https://wa.me/${whatsapp}` : "#"} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-muted/30 hover:bg-green-500 hover:text-white transition-all text-muted-foreground duration-300">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href={email ? `mailto:${email}` : "#"} className="p-3 rounded-full bg-muted/30 hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300">
              <Mail size={20} />
            </a>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
