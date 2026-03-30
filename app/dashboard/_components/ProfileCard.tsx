"use client";

import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Phone } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  email: string;
  roles: string[];
  avatarUrl?: string;
  phoneNumber?: string;
  userId?: string;
}

export function ProfileCard({ name, email, roles, avatarUrl, phoneNumber, userId }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-3xl p-8 shadow-sm border border-border/50 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden w-full max-w-sm h-full group"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 dark:opacity-30 group-hover:h-28 transition-all duration-500" />
      
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border-4 border-card shadow-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={112}
              height={112}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-3xl font-black text-blue-600 dark:text-blue-400">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-card shadow-sm animate-pulse" />
      </div>

      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-black text-foreground">{name}</h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground bg-slate-50 dark:bg-slate-900/40 px-3 py-1 rounded-lg">
          <Mail size={14} className="text-blue-500" />
          <span className="text-xs font-medium truncate max-w-[200px]">{email}</span>
        </div>
      </div>

      {/* Roles Display */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {roles.map((role, idx) => (
          <div key={idx} className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800/50">
            <ShieldCheck size={12} />
            {role}
          </div>
        ))}
      </div>

      {/* Secondary Info (Subtle) */}
      <div className="w-full pt-6 border-t border-border/50 grid grid-cols-1 gap-3">
        {phoneNumber && (
          <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            <Phone size={12} className="text-green-500" />
            <span className="font-mono">{phoneNumber}</span>
          </div>
        )}
        {userId && (
          <div className="text-[10px] text-muted-foreground/60 font-mono tracking-tighter hover:text-muted-foreground transition-colors">
            ID: {userId}
          </div>
        )}
      </div>
    </motion.div>
  );
}
