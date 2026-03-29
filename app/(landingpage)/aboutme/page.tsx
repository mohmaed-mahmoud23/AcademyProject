"use client";

import Image from "next/image";
import ProfilePic from "@/public/Habib.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiRedux, SiMui } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import SingleSkill from "../_components/SingleSkill";
import { useTranslations } from "next-intl";

const fadeIn = (direction: string = "up", delay: number = 0) => ({
  hidden: { opacity: 0, y: direction === "up" ? 30 : -30 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } },
});

const skills = [
  { skill: "HTML", icon: FaHtml5 },
  { skill: "CSS", icon: FaCss3Alt },
  { skill: "JavaScript", icon: IoLogoJavascript },
  { skill: "ReactJS", icon: FaReact },
  { skill: "Redux", icon: SiRedux },
  { skill: "Bootstrap", icon: FaBootstrap },
  { skill: "TailwindCSS", icon: RiTailwindCssFill },
  { skill: "MUI", icon: SiMui },
];

export default function AboutMe() {
  const t = useTranslations();
  return (
    <main className="min-h-screen bg-background text-foreground px-6 md:px-12 py-10">
      {/* HERO */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* TEXT */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t("AboutMe.TEXT")}
          </motion.h1>

          <motion.p
            className="mt-4 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {t("AboutMe.description")}
          </motion.p>

          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-md hover:scale-105 transition">
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="outline" className="hover:scale-105 transition">
                View Courses
              </Button>
            </motion.div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex-1 flex justify-center md:justify-end">
          <motion.div
            className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden shadow-2xl border border-border hover:scale-105 transition"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Image
              src={ProfilePic}
              alt="Profile"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-24 max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
          {skills.map((item, index) => (
            <motion.div
              key={item.skill}
              variants={fadeIn("up", index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SingleSkill
                text={item.skill}
                imgSvg={
                  <item.icon className="text-purple-500 text-3xl mx-auto mb-2" />
                }
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="mt-24 max-w-4xl mx-auto text-center md:text-left">
        <motion.h2
          className="text-3xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Journey
        </motion.h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          I started coding out of curiosity, and over time built many projects
          from simple apps to full platforms.
        </p>

        <p className="text-muted-foreground text-lg leading-relaxed">
          My mission is to empower developers to grow, understand modern tech,
          and build real careers.
        </p>
      </section>
    </main>
  );
}
