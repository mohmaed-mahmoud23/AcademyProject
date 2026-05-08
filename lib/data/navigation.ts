export const getTranslatedNavigation = (t: (key: string) => string) => [
  {
    title: t("learningPaths"),
    items: [{ title: t("frontEnd"), href: "/Learningpaths" }],
  },
  {
    title: t("learningNow"),
    items: [
      { title: t("articles"), href: "/Educationalarticles" },
      { title: t("courses"), href: "/Educationalcourses" },
      { title: t("challenges"), href: "/Softwarechallenges" },
    ],
  },
  {
    title: t("studyPlans"),
    items: [
      { title: "HTML", href: "/HTML" },
      { title: "CSS", href: "/CSS" },
      { title: "JavaScript", href: "/JavaScript" },
      { title: "SASS", href: "/SASS" },
      { title: "TypeScript", href: "/TypeScript" },
      { title: "PHP", href: "/PHP" },
      { title: "Python", href: "/Python" },
      { title: "React", href: "/React" },
      { title: "Tailwind", href: "/Tailwind" },
    ],
  },
  {
    title: t("fromChannel"),
    items: [
      { title: t("problemSolving"), href: "/ProblemSolving" },
      { title: t("whatNew"), href: "/plans/6" },
    ],
  },
];