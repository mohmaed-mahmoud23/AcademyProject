"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export default function JsTipsArticle() {
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
          <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-yellow-500/20 text-yellow-300 border-yellow-400/30 mb-4 inline-block">JavaScript</span>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            أنماط JavaScript يجب أن تعرفها
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> يناير 2026</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> 5 دقائق قراءة</span>
            <span>بقلم Mohamed</span>
          </div>
        </div>

        <div className="h-px bg-border mb-10" />

        <div className="prose prose-invert max-w-none space-y-8 text-base leading-relaxed text-foreground/90">

          <p>
            JavaScript لغة مرنة جداً — وهذا يعني أنك تستطيع كتابة نفس الشيء بعشر طرق مختلفة. لكن المطورين المحترفين يستخدمون أنماطاً محددة تجعل الكود أنظف وأسهل في القراءة والصيانة. إليك أهم هذه الأنماط.
          </p>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">١. Destructuring لكود أنظف</h2>
          <p>
            بدلاً من الوصول لكل خاصية بشكل منفصل، استخرجها دفعة واحدة:
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p className="text-red-400">{"// ❌ قديم"}</p>
            <p>{"const name = user.name;"}</p>
            <p>{"const age = user.age;"}</p>
            <p className="mt-3 text-green-400">{"// ✅ Destructuring"}</p>
            <p>{"const { name, age, role = 'student' } = user;"}</p>
            <p className="mt-3 text-blue-400">{"// مع Arrays"}</p>
            <p>{"const [first, second, ...rest] = items;"}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٢. Optional Chaining (?.) لتجنب الأخطاء</h2>
          <p>
            أحد أكثر الأخطاء شيوعاً هو محاولة الوصول لخاصية على قيمة <code className="bg-muted px-1.5 py-0.5 rounded text-sm">undefined</code>. الحل البسيط:
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p className="text-red-400">{"// ❌ يسبب خطأ إذا user كان undefined"}</p>
            <p>{"const city = user.address.city;"}</p>
            <p className="mt-3 text-green-400">{"// ✅ آمن تماماً"}</p>
            <p>{"const city = user?.address?.city ?? 'غير محدد';"}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٣. Array Methods بدل الحلقات</h2>
          <p>
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm">map</code>، <code className="bg-muted px-1.5 py-0.5 rounded text-sm">filter</code>، <code className="bg-muted px-1.5 py-0.5 rounded text-sm">reduce</code> هي أدوات قوية تجعل الكود أقصر وأوضح من حلقات <code className="bg-muted px-1.5 py-0.5 rounded text-sm">for</code> التقليدية:
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p className="text-yellow-400">{"const students = ["}</p>
            <p className="pl-4">{'{ name: "أحمد", grade: 85 },'}</p>
            <p className="pl-4">{'{ name: "سارة", grade: 92 },'}</p>
            <p className="pl-4">{'{ name: "محمد", grade: 70 },'}</p>
            <p>{"];"}</p>
            <p className="mt-3 text-green-400">{"// فقط الناجحون (أكثر من 80)"}</p>
            <p>{"const passed = students.filter(s => s.grade > 80);"}</p>
            <p className="mt-2 text-green-400">{"// أسماء الناجحين فقط"}</p>
            <p>{"const names = passed.map(s => s.name);"}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٤. Promise و Async/Await</h2>
          <p>
            نسيَ Callback Hell — <code className="bg-muted px-1.5 py-0.5 rounded text-sm">async/await</code> يجعل الكود غير المتزامن يبدو متزامناً وأسهل في الفهم:
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p>{"async function getUser(id) {"}</p>
            <p className="pl-4">{"try {"}</p>
            <p className="pl-8">{"const res = await fetch(`/api/users/${id}`);"}</p>
            <p className="pl-8">{"const data = await res.json();"}</p>
            <p className="pl-8">{"return data;"}</p>
            <p className="pl-4">{"} catch (error) {"}</p>
            <p className="pl-8">{"console.error('حدث خطأ:', error);"}</p>
            <p className="pl-4">{"}"}</p>
            <p>{"}"}</p>
          </div>

          <h2 className="text-xl font-bold text-foreground mt-8 mb-3">٥. Spread Operator لنسخ البيانات</h2>
          <p>
            لا تعدّل البيانات الأصلية — انسخها وعدّل على النسخة. هذا يمنع أخطاء صعبة الاكتشاف:
          </p>
          <div className="bg-card border border-border rounded-xl p-5 font-mono text-sm text-muted-foreground">
            <p className="text-green-400">{"// نسخ Object مع تغيير خاصية واحدة"}</p>
            <p>{"const updatedUser = { ...user, name: 'اسم جديد' };"}</p>
            <p className="mt-2 text-green-400">{"// دمج Arrayas"}</p>
            <p>{"const allItems = [...list1, ...list2];"}</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8">
            <p className="font-bold text-primary mb-2">الخلاصة</p>
            <p className="text-muted-foreground text-sm">
              JavaScript الحديث أجمل وأوضح بكثير من الطرق القديمة. تدرّب على هذه الأنماط حتى تصبح طبيعية عندك، وستلاحظ فرقاً واضحاً في جودة كودك.
            </p>
          </div>

        </div>
      </div>
    </article>
  );
}
