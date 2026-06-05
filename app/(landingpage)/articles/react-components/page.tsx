"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export default function ReactComponentsArticle() {
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
          <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-blue-500/20 text-blue-300 border-blue-400/30 mb-4 inline-block">React</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            احترف React كالمطورين المتقدمين
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> فبراير 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> 8 دقائق قراءة</span>
            <span>بقلم Mohamed</span>
          </div>
        </div>

        <div className="h-px bg-border mb-10" />

        <div className="prose prose-invert max-w-none space-y-8 text-base leading-relaxed text-foreground/90">

          <p>
            كثير من المطورين يتعلمون React ويبدأون في بناء مشاريع، لكنهم يلاحظون أن الكود يصبح معقداً بسرعة. السبب؟ لم يتعلموا الأنماط التي يستخدمها المطورون المتقدمون. في هذا المقال سنكشف أهم هذه الأنماط.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">١. Compound Components Pattern</h2>
          <p>
            بدلاً من تمرير عشرة props لمكون واحد، استخدم نمط Compound Components. المكونات تتكلم مع بعضها عبر Context داخلي، والاستخدام يصبح أنظف وأكثر مرونة.
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p className="text-green-400">{"// ❌ طريقة مربكة"}</p>
            <p>{"<Select options={[...]} value={val} onChange={fn} label='اختر' />"}</p>
            <p className="mt-3 text-green-400">{"// ✅ Compound Components"}</p>
            <p>{"<Select>"}</p>
            <p className="pl-4">{"<Select.Trigger>اختر خيار</Select.Trigger>"}</p>
            <p className="pl-4">{"<Select.Options>"}</p>
            <p className="pl-8">{"<Select.Option value='1'>خيار ١</Select.Option>"}</p>
            <p className="pl-4">{"</Select.Options>"}</p>
            <p>{"</Select>"}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٢. Custom Hooks لفصل المنطق</h2>
          <p>
            القاعدة الذهبية: المكون مسؤول عن <strong>العرض فقط</strong>، والمنطق يذهب إلى Custom Hook. هذا يجعل الكود قابلاً للاختبار وإعادة الاستخدام.
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p className="text-blue-400">{"// useWindowSize.ts"}</p>
            <p>{"export function useWindowSize() {"}</p>
            <p className="pl-4">{"const [size, setSize] = useState(window.innerWidth);"}</p>
            <p className="pl-4">{"useEffect(() => {"}</p>
            <p className="pl-8">{"const handler = () => setSize(window.innerWidth);"}</p>
            <p className="pl-8">{"window.addEventListener('resize', handler);"}</p>
            <p className="pl-8">{"return () => window.removeEventListener('resize', handler);"}</p>
            <p className="pl-4">{"}, []);"}</p>
            <p className="pl-4">{"return size;"}</p>
            <p>{"}"}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٣. إدارة الحالة بذكاء</h2>
          <p>
            ليس كل شيء يحتاج useState. إليك القاعدة:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">useState</strong> — للحالة المحلية البسيطة (مفتوح/مغلق، قيمة input)</li>
            <li><strong className="text-foreground">useReducer</strong> — عندما تكون الحالة معقدة ومترابطة</li>
            <li><strong className="text-foreground">Context API</strong> — لمشاركة البيانات بين مكونات متداخلة</li>
            <li><strong className="text-foreground">Zustand أو Jotai</strong> — لإدارة الحالة العالمية في مشاريع كبيرة</li>
          </ul>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٤. تجنب Re-renders غير الضرورية</h2>
          <p>
            استخدم <code className="bg-muted px-1.5 py-0.5 rounded text-sm">React.memo</code> للمكونات التي تتلقى نفس الـ props، و<code className="bg-muted px-1.5 py-0.5 rounded text-sm">useMemo</code> للعمليات الحسابية الثقيلة، و<code className="bg-muted px-1.5 py-0.5 rounded text-sm">useCallback</code> للدوال التي تُمرر كـ props.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٥. Error Boundaries</h2>
          <p>
            لا تترك مستخدمك يرى صفحة بيضاء فارغة عند حدوث خطأ. استخدم Error Boundaries لاحتواء الأخطاء وعرض رسالة واضحة بدلاً من تعطل التطبيق بالكامل.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
            <p className="font-bold text-primary mb-2">الخلاصة</p>
            <p className="text-muted-foreground text-sm">
              React ليس صعباً — لكنه يحتاج منهجية. اعتمد على Custom Hooks لفصل المنطق، وفكر دائماً في إعادة الاستخدام قبل أن تكتب أي مكون جديد.
            </p>
          </div>

        </div>
      </div>
    </article>
  );
}
