"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export default function NextjsUIArticle() {
  return (
    <article className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link href="/Educationalarticles" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
          <ArrowRight size={14} className="rotate-180" />
          العودة إلى المقالات
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-white/10 text-white border-white/20 mb-4 inline-block">Next.js</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            بناء أنظمة واجهة مستخدم قابلة للتطوير مع Next.js
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> مارس 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> 6 دقائق قراءة</span>
            <span>بقلم Mohamed</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-10" />

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-base leading-relaxed text-foreground/90">

          <p>
            Next.js أصبح الخيار الأول لبناء تطبيقات الويب الحديثة، وليس فقط لأنه سريع — بل لأنه يمنحك بنية واضحة تجعل مشاريعك قابلة للنمو والتوسع. في هذا المقال سنتحدث عن كيفية بناء نظام واجهة مستخدم (UI System) احترافي من الصفر باستخدام Next.js.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">١. ابدأ ببنية مجلدات واضحة</h2>
          <p>
            أكثر مشكلة تواجه المطورين المبتدئين هي أنهم يضعون كل شيء في مكان واحد. البنية الصحيحة تفصل بين المكونات القابلة لإعادة الاستخدام (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">components/ui</code>) والصفحات (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">app/</code>) والمنطق (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">lib/</code>).
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p>📁 app/</p>
            <p className="pl-4">📁 (dashboard)/</p>
            <p className="pl-4">📁 (marketing)/</p>
            <p>📁 components/</p>
            <p className="pl-4">📁 ui/          ← Button, Card, Input</p>
            <p className="pl-4">📁 shared/      ← Navbar, Footer</p>
            <p>📁 lib/          ← utils, hooks, api</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٢. Route Groups لتنظيم التطبيق</h2>
          <p>
            ميزة Route Groups في Next.js App Router تسمح لك بتجميع الصفحات المتشابهة دون أن يؤثر ذلك على الـ URL. مثلاً، صفحات الـ Dashboard تحتاج layout مختلف عن صفحات التسويق — باستخدام <code className="bg-muted px-1.5 py-0.5 rounded text-sm">(dashboard)</code> و<code className="bg-muted px-1.5 py-0.5 rounded text-sm">(marketing)</code> تفصل بينهم بدون تعقيد.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٣. Server Components vs Client Components</h2>
          <p>
            القاعدة الذهبية: كل مكون في Next.js هو Server Component بشكل افتراضي — وهذا أسرع لأنه يُرسل HTML جاهز للمتصفح. استخدم <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&quot;use client&quot;</code> فقط عندما تحتاج:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>useState أو useEffect</li>
            <li>Event listeners (onClick, onChange)</li>
            <li>Browser APIs (localStorage, window)</li>
            <li>مكتبات تعتمد على DOM</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٤. استخدم Tailwind CSS بشكل منظم</h2>
          <p>
            Tailwind رائع لكنه يصبح فوضوياً بدون نظام. الحل؟ استخدم <code className="bg-muted px-1.5 py-0.5 rounded text-sm">cn()</code> من مكتبة <code className="bg-muted px-1.5 py-0.5 rounded text-sm">clsx</code> لدمج الكلاسات، وأنشئ مكونات UI قابلة لإعادة الاستخدام بدلاً من كتابة نفس الكلاسات في كل مكان.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٥. الأداء أولاً</h2>
          <p>
            Next.js يوفر لك Image Optimization تلقائياً عبر <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;Image /&gt;</code>، وCode Splitting تلقائي لكل صفحة. لا تنسَ استخدام <code className="bg-muted px-1.5 py-0.5 rounded text-sm">loading=&quot;lazy&quot;</code> للصور التي ليست في الـ viewport الأول.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
            <p className="font-bold text-primary mb-2">الخلاصة</p>
            <p className="text-muted-foreground text-sm">
              Next.js ليس مجرد framework — هو منهجية تفكير. ابدأ ببنية واضحة، افصل المسؤوليات، واستخدم Server Components كلما أمكن. مشروعك سيكون أسرع وأسهل في الصيانة.
            </p>
          </div>

        </div>
      </div>
    </article>
  );
}
