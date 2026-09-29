import { useState, useEffect, useLayoutEffect, useRef } from 'react'

/* ══════════════════════════════════════════════
   IMAGE IMPORTS
══════════════════════════════════════════════ */
import imgDashboard from './images/dashboard.jpeg'
import imgGroupDetails from './images/group-details.jpeg'
import imgStudentDetails from './images/student-details.jpeg'
import imgTeacherProfile from './images/teacher-profile.jpeg'
import imgExamQuestions from './images/exam-questions.jpeg'
import imgExpenses from './images/expenses.jpeg'
import imgActivityLog from './images/activity-log.jpeg'
import imgQrAttendance from './images/qr-attendance.jpeg'
import imgAdminDashboard from './images/admin-dashboard.jpeg'
import imgAddTeacher from './images/add-teacher.jpeg'
import imgExamSubmit from './images/exam-submit.jpeg'
import appVideo from './video/WhatsApp Video 2026-09-29 at 5.29.32 PM.mp4'
import apkFile from './app-release.apk?url'

/* ══════════════════════════════════════════════
   CONSTANTS & DATA
══════════════════════════════════════════════ */

const FEATURES = [
  { icon: 'users',   title: 'إدارة الطلاب',         desc: 'ملف رقمي متكامل لكل طالب يجمع البيانات، سجل الحضور، والملف المالي.',        color: '#0F5B6E' },
  { icon: 'grid',    title: 'إدارة المجموعات',       desc: 'تنظيم المواعيد وتوزيع الطلاب وتبسيط العمليات الجماعية للحصص.',              color: '#0F5B6E' },
  { icon: 'cal',     title: 'الحضور بـ QR Code',     desc: 'تسجيل الحضور في أجزاء من الثانية للقضاء على التكدس قبل بدء الحصة.',     color: '#2F6B4F' },
  { icon: 'card',    title: 'المصروفات والإيصالات',   desc: 'تحديد الرسوم، تسجيل المدفوعات، وإصدار إيصالات دفع مفصلة لولي الأمر.',      color: '#B8860B' },
  { icon: 'clip',    title: 'الاختبارات والنتائج',   desc: 'جدولة الاختبارات، رصد درجات الطلاب بدقة، ومتابعة تطور الأداء.',             color: '#0F5B6E' },
  { icon: 'touch',   title: 'إبلاغ أولياء الأمور',   desc: 'إشعار فوري ولحظي بحالات غياب الطالب أو مستحقات السداد لتعزيز الشفافية.',  color: '#2F6B4F' },
  { icon: 'shield',  title: 'سجل العمليات (Log)',    desc: 'توثيق دقيق لكل حركة وإجراء داخل النظام لتحقيق أقصى درجات الأمان والمساءلة.', color: '#B8860B' },
  { icon: 'pie',     title: 'التقارير التحليلية',    desc: 'إحصائيات تفصيلية لنسب الحضور، الإيرادات المالية، ونمو المجموعات.',       color: '#0F5B6E' },
]

const STEPS = [
  { num: '01', icon: 'grid',  title: 'المجموعات والرسوم',   desc: 'إضافة المجموعات التعليمية وتحديد مواعيد الحصص والرسوم الشهرية المقررة.' },
  { num: '02', icon: 'users', title: 'تسجيل الطلاب و QR',    desc: 'إضافة الطلاب إلى المنظومة وطباعة بطاقات QR Code الذكية الخاصة بهم.' },
  { num: '03', icon: 'star',  title: 'التشغيل اليومي الفوري', desc: 'مسح الحضور عند الدخول، تحصيل المصروفات وطباعة الإيصالات، ورصد الاختبارات.' },
]

const WHY = [
  { icon: 'layers', title: 'توفير الوقت والجهد',    desc: 'القضاء على الكشوفات الورقية المعرضة للأخطاء والضياع وتوفير ساعات من العمل اليدوي.', color: '#0F5B6E' },
  { icon: 'touch',  title: 'سرعة فائقة بالـ QR',     desc: 'تسجيل حضور عشرات الطلاب في دقائق معدودة بمسح الكود وتفادي تعطيل بداية الحصة.',      color: '#2F6B4F' },
  { icon: 'target', title: 'ضبط مالي وإيصالات رسمية', desc: 'إصدار إيصالات دفع إلكترونية تمنع النزاعات المالية وتعزز ثقة أولياء الأمور.',        color: '#0F5B6E' },
  { icon: 'eye',    title: 'أمان وتوثيق كامل (Log)', desc: 'سجل نشاط شامل يوثق كل عملية مع تفويض آمن ومحدد لمهام المساعدين والسكرتارية.',     color: '#B8860B' },
]

const SHOWCASE_SCREENS = [
  { label: 'لوحة التحكم', img: imgAdminDashboard, desc: 'واجهة رئيسية شاملة تلخص حالة العمليات والطلاب في لمح البصر' },
  { label: 'تفاصيل الطالب', img: imgStudentDetails, desc: 'ملف رقمي شامل لبيانات الطالب وسجل الحضور والملف المالي والأكاديمي' },
  { label: 'تفاصيل المجموعة', img: imgGroupDetails, desc: 'متابعة أداء المجموعة، مواعيد الحصص، وأعداد الطلاب ومستحقاتهم' },
  { label: 'الامتحانات', img: imgExamQuestions, desc: 'إنشاء وإدارة بنك الأسئلة والاختبارات الدورية مع تحديد الدرجات' },
  { label: 'المصروفات', img: imgExpenses, desc: 'متابعة الرسوم الشهرية، تسجيل المدفوعات، وحصر المتأخرين بوضوح' },
  { label: 'الحضور بـ QR', img: imgQrAttendance, desc: 'مسح فوري لبطاقة الطالب بكاميرا الهاتف في أجزاء من الثانية' },
  { label: 'سجل العمليات', img: imgActivityLog, desc: 'تتبع شامل يوثق كل إجراء وموعده ومن قام به لضمان الأمان التام' },
  { label: 'إدارة المعلمين', img: imgTeacherProfile, desc: 'عرض وإدارة ملف المعلم والمجموعات التابعة له' },
  { label: 'إضافة مدرس', img: imgAddTeacher, desc: 'إعداد بيانات المعلم وتخصيص المجموعات والمواعيد' },
  { label: 'تسليم الاختبار', img: imgExamSubmit, desc: 'واجهة مخصصة لحل الاختبارات ورصد الدرجات والتقييم الفوري' },
]

const NAV_LINKS = [
  { label: 'الرئيسية',       href: '#hero' },
  { label: 'عن رصد',         href: '#about' },
  { label: 'المميزات',       href: '#features' },
  { label: 'داخل التطبيق',  href: '#showcase' },
  { label: 'فيديو توضيحي',  href: '#video' },
  { label: 'كيف يعمل',      href: '#how' },
  { label: 'تحميل التطبيق', href: '#download' },
  { label: 'تواصل معنا',    href: 'https://www.elevix.space/', external: true },
]

/* ══════════════════════════════════════════════
   ICON COMPONENT
══════════════════════════════════════════════ */

function Ic({ n, s = 20, c = 'currentColor' }: { n: string; s?: number; c?: string }) {
  const p = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: c, strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (n) {
    case 'users':  return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'grid':   return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
    case 'cal':    return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M8 18h.01M12 18h.01"/></svg>
    case 'grad':   return <svg {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    case 'chart':  return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
    case 'clip':   return <svg {...p}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>
    case 'card':   return <svg {...p}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    case 'pie':    return <svg {...p}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
    case 'shield': return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'brief':  return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    case 'dl':     return <svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    case 'login':  return <svg {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
    case 'star':   return <svg {...p} fill={c}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'layers': return <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    case 'touch':  return <svg {...p}><path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
    case 'target': return <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
    case 'eye':    return <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    case 'sun':    return <svg {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    case 'moon':   return <svg {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    case 'menu':   return <svg {...p}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    case 'x':      return <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    case 'play':   return <svg {...p} fill={c}><polygon points="5 3 19 12 5 21 5 3"/></svg>
    case 'arrl':   return <svg {...p}><polyline points="15 18 9 12 15 6"/></svg>
    case 'arrr':   return <svg {...p}><polyline points="9 18 15 12 9 6"/></svg>
    case 'droid':  return <svg {...p}><path d="m9 3 1.5 2.5M15 3l-1.5 2.5M6 16a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2z"/><line x1="8" y1="21" x2="8" y2="17"/><line x1="16" y1="21" x2="16" y2="17"/></svg>
    default: return null
  }
}

/* ══════════════════════════════════════════════
   PHONE MOCKUP
══════════════════════════════════════════════ */

function PhoneMockup({ size = 280, imgSrc, alt = 'لقطة شاشة من تطبيق رصد' }: { screen?: number; size?: number; imgSrc?: string; alt?: string }) {
  const h = Math.round(size * (572 / 280))
  return (
    <div style={{ position: 'relative', width: size, height: h, flexShrink: 0 }}>
      {/* Body */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 44, background: 'linear-gradient(145deg,#1A2E35 0%,#0C1619 60%,#0A1316 100%)', border: '2.5px solid #2A3D45', boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }} />
      {/* Screen */}
      <div style={{ position: 'absolute', inset: 3, borderRadius: 41, overflow: 'hidden', background: '#0F1A1D' }}>
        {/* Dynamic island */}
        <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 88, height: 26, background: '#000', borderRadius: 20, zIndex: 20, border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#111' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0a0a0a', border: '1px solid #222' }} />
        </div>
        {/* Content */}
        <div style={{ position: 'absolute', inset: 0, paddingTop: 0 }}>
          {imgSrc ? (
            <img src={imgSrc} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>تطبيق رصد</div>
          )}
        </div>
        {/* Glare */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 41, background: 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 45%)', pointerEvents: 'none' }} />
      </div>
      {/* Home indicator */}
      <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 110, height: 4, background: 'rgba(255,255,255,0.18)', borderRadius: 4 }} />
      {/* Buttons */}
      <div style={{ position: 'absolute', right: -3, top: 88, width: 3, height: 56, background: '#2A3D45', borderRadius: '2px 0 0 2px' }} />
      <div style={{ position: 'absolute', left: -3, top: 80, width: 3, height: 36, background: '#2A3D45', borderRadius: '0 2px 2px 0' }} />
      <div style={{ position: 'absolute', left: -3, top: 128, width: 3, height: 60, background: '#2A3D45', borderRadius: '0 2px 2px 0' }} />
    </div>
  )
}

/* ══════════════════════════════════════════════
   DESKTOP FRAME
══════════════════════════════════════════════ */

function DesktopDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: 440, background: '#0F1A1D', direction: 'rtl', fontFamily: 'Cairo,sans-serif', minWidth: 540 }}>
      {/* Sidebar */}
      <div style={{ width: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: 8, background: '#0A1316', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: 34, height: 34, borderRadius: 12, background: '#0F5B6E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 900, color: 'white' }}>ر</span>
        </div>
        {['⊞','👥','📋','✓','💳','📊','⚙️'].map((ic,i)=>(
          <div key={i} style={{ width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, background: i===0 ? 'rgba(15,91,110,0.25)' : 'transparent', border: i===0 ? '1px solid rgba(15,91,110,0.4)' : 'none', opacity: i===0 ? 1 : 0.38 }}>{ic}</div>
        ))}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '18px 22px', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, direction: 'ltr' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(15,91,110,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(15,91,110,0.45)', flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#0F5B6E' }}>أ</span>
            </div>
            <div style={{ direction: 'rtl' }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#E8F0F2' }}>أ. محمد الشريف</div>
              <div style={{ fontSize: 9, color: 'rgba(232,240,242,0.3)' }}>مدرس الرياضيات</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#E8F0F2' }}>لوحة التحكم</div>
            <div style={{ fontSize: 9, color: 'rgba(232,240,242,0.3)' }}>الثلاثاء، ٢٦ سبتمبر ٢٠٢٦</div>
          </div>
        </div>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
          {[['1,240','إجمالي الطلاب','#0F5B6E','👥','+45'],['15','المجموعات النشطة','#2F6B4F','📋','نشطة'],['94%','حضور اليوم','#2F6B4F','✓','+2%'],['315','مدفوعات اليوم','#B8860B','💳','إيصال']].map(([v,l,c,ic,ch],i)=>(
            <div key={i} style={{ background: `${c}10`, border: `1px solid ${c}22`, borderRadius: 16, padding: '10px 12px', textAlign: 'right' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <span style={{ fontSize: 8, color: 'rgba(232,240,242,0.38)' }}>{l}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: c as string, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 9, color: `${c}99`, marginTop: 4 }}>{ch} هذا الشهر</div>
            </div>
          ))}
        </div>
        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
          <div style={{ background: '#1A2C32', borderRadius: 16, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#E8F0F2', marginBottom: 12, borderRight: '2.5px solid #0F5B6E', paddingRight: 8 }}>أحدث الطلاب</div>
            {[['محمد أحمد السيد','رياضيات - أ','اليوم','نشط'],['سارة علي محمود','فيزياء - ب','أمس','نشط'],['خالد إبراهيم','كيمياء - أ','٢ أيام','غائب'],['نور الهدى أحمد','رياضيات - ب','٣ أيام','نشط']].map(([n,g,d,st],i)=>(
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i<3 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(15,91,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#0F5B6E' }}>{(n as string)[0]}</span>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(232,240,242,0.9)' }}>{n}</div>
                  <div style={{ fontSize: 8, color: 'rgba(232,240,242,0.3)' }}>{g}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ padding: '2px 7px', borderRadius: 20, fontSize: 8, background: st==='نشط' ? 'rgba(47,107,79,0.2)' : 'rgba(192,57,43,0.15)', color: st==='نشط' ? '#2F6B4F' : '#E74C3C' }}>{st}</div>
                  <span style={{ fontSize: 8, color: 'rgba(232,240,242,0.25)' }}>{d}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1A2C32', borderRadius: 16, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#E8F0F2', marginBottom: 12, borderRight: '2.5px solid #B8860B', paddingRight: 8 }}>المجموعات</div>
            {[['رياضيات أ',24,'#0F5B6E'],['فيزياء ب',18,'#2F6B4F'],['كيمياء أ',20,'#B8860B'],['رياضيات ب',22,'#0F5B6E']].map(([n,s,c],i)=>(
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c as string }}>{s}</span>
                  <span style={{ fontSize: 9, color: 'rgba(232,240,242,0.6)' }}>{n}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(s as number)/30*100}%`, background: c as string, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */

function Navbar({ dark, toggle, scrolled, mobileOpen, setMobileOpen }: {
  dark: boolean; toggle: () => void; scrolled: boolean; mobileOpen: boolean; setMobileOpen: (v: boolean | ((p: boolean) => boolean)) => void
}) {
  const navBg = scrolled ? (dark ? 'rgba(17,24,27,0.88)' : 'rgba(255,255,255,0.92)') : 'transparent'
  const navBorder = scrolled ? (dark ? '1px solid rgba(15,91,110,0.2)' : '1px solid rgba(15,91,110,0.12)') : '1px solid transparent'
  const linkColor = dark ? 'rgba(232,240,242,0.6)' : 'rgba(13,27,30,0.6)'
  const textColor = dark ? '#E8F0F2' : '#0D1B1E'

  return (
    <>
      <nav className={scrolled ? 'navbar-blur' : ''} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: navBg, borderBottom: navBorder, transition: 'all 0.3s ease' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Mobile hamburger */}
          <button className="card-hover" onClick={() => setMobileOpen(o => !o)} aria-label="تبديل القائمة" style={{ display: 'none', padding: 8, borderRadius: 12, color: textColor, background: 'none', border: 'none', cursor: 'pointer' }}
            id="hamburger">
            <Ic n={mobileOpen ? 'x' : 'menu'} s={22} c={textColor} />
          </button>

          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 14, background: '#0F5B6E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(15,91,110,0.35)' }}>
              <span style={{ fontSize: 17, fontWeight: 900, color: 'white' }}>ر</span>
            </div>
            <div>
              <span style={{ fontSize: 17, fontWeight: 900, color: textColor }}>رصد</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: textColor, opacity: 0.4, marginRight: 4 }}>| Rasd</span>
            </div>
          </a>

          {/* Desktop nav links */}
          <div id="desknav" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {NAV_LINKS.map((l, i) => (
              <a key={i} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined} style={{ padding: '6px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, color: l.external ? '#B8860B' : linkColor, textDecoration: 'none', transition: 'color 0.15s', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                onMouseEnter={e => (e.currentTarget.style.color = l.external ? '#D4A017' : textColor)}
                onMouseLeave={e => (e.currentTarget.style.color = l.external ? '#B8860B' : linkColor)}>
                {l.label}
                {l.external && <span style={{ fontSize: 11 }}>↗</span>}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={toggle} aria-label={dark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'} style={{ padding: '7px', borderRadius: 12, background: 'rgba(15,91,110,0.13)', border: '1px solid rgba(15,91,110,0.22)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(15,91,110,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(15,91,110,0.13)')}>
              <Ic n={dark ? 'sun' : 'moon'} s={18} c="#0F5B6E" />
            </button>
            <a id="deskcta" href={apkFile} download="Rasd-app.apk" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 14, fontSize: 13, fontWeight: 700, color: 'white', background: '#0F5B6E', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(15,91,110,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1A7A94'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0F5B6E'; e.currentTarget.style.transform = 'none' }}>
              <Ic n="dl" s={15} c="white" />تحميل التطبيق
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: 64, inset: 0, zIndex: 40, background: dark ? 'rgba(17,24,27,0.97)' : 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', padding: 20, gap: 4 }}>
          {NAV_LINKS.map((l, i) => (
            <a key={i} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined} style={{ padding: '14px 16px', borderRadius: 14, fontSize: 16, fontWeight: 600, color: l.external ? '#B8860B' : (dark ? 'rgba(232,240,242,0.85)' : '#0D1B1E'), textDecoration: 'none', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={() => setMobileOpen(false)}>
              <span>{l.label}</span>
              {l.external && <span style={{ fontSize: 13 }}>↗</span>}
            </a>
          ))}
          <a href={apkFile} download="Rasd-app.apk" style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 16, fontSize: 15, fontWeight: 700, color: 'white', background: '#0F5B6E', textDecoration: 'none' }}
            onClick={() => setMobileOpen(false)}>
            <Ic n="dl" s={17} c="white" />تحميل التطبيق
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #hamburger { display: flex !important; }
          #desknav   { display: none !important; }
          #deskcta   { display: none !important; }
        }
      `}</style>
    </>
  )
}

/* ══════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════ */

function HeroSection({ dark }: { dark: boolean }) {
  const bg = dark ? '#11181B' : '#FFFFFF'
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.58)' : 'rgba(13,27,30,0.58)'
  const cardBg = dark ? '#1A2428' : 'white'
  const border = dark ? 'rgba(15,91,110,0.25)' : 'rgba(15,91,110,0.2)'

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 64 }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="animate-pulse-slow" style={{ position: 'absolute', width: 700, height: 700, top: -200, right: -250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(15,91,110,0.16) 0%,transparent 68%)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, bottom: -100, left: -150, borderRadius: '50%', background: 'radial-gradient(circle,rgba(47,107,79,0.1) 0%,transparent 68%)' }} />
        <div className="animate-pulse-slow" style={{ position: 'absolute', width: 300, height: 300, top: '45%', left: '40%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(184,134,11,0.07) 0%,transparent 68%)' }} />
      </div>
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.028, backgroundImage: 'linear-gradient(rgba(15,91,110,1) 1px,transparent 1px),linear-gradient(to left,rgba(15,91,110,1) 1px,transparent 1px)', backgroundSize: '58px 58px' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '60px 20px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          {/* Text */}
          <div style={{ flex: '1 1 420px', textAlign: 'right' }}>
            <div className="hero-title" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.14)' : 'rgba(15,91,110,0.08)', border: '1px solid rgba(15,91,110,0.3)', marginBottom: 24 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2F6B4F' }} className="animate-pulse-slow" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>نظام إدارة السناتر التعليمية والمدرسين</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: 'clamp(34px,5vw,60px)', fontWeight: 900, lineHeight: 1.22, color: textMain, marginBottom: 22 }}>
              رصد —{' '}
              <span style={{ color: '#0F5B6E' }}>حل رقمي متكامل</span>
              <br />
              <span className="gradient-text">لتنظيم وإدارة العملية التعليمية</span>
            </h1>

            <p className="hero-desc" style={{ fontSize: 'clamp(15px,2.2vw,18px)', color: textMuted, lineHeight: 1.9, marginBottom: 36, maxWidth: 520 }}>
              منظومة ذكية تمكّن المدرسين ومراكز التعليم من ضبط الحضور الفوري بـ QR Code، إدارة المجموعات، تحصيل المصروفات بإيصالات رقمية، وتوثيق سجل العمليات بكل دقة وأمان.
            </p>

            <div className="hero-cta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={apkFile} download="Rasd-app.apk" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 18, fontSize: 15, fontWeight: 800, color: 'white', background: '#0F5B6E', textDecoration: 'none', boxShadow: '0 8px 30px rgba(15,91,110,0.42)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1A7A94'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,91,110,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0F5B6E'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(15,91,110,0.42)' }}>
                <Ic n="dl" s={18} c="white" />تحميل التطبيق
              </a>
              <a href="#video" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 18, fontSize: 15, fontWeight: 700, color: '#0F5B6E', background: dark ? 'rgba(15,91,110,0.1)' : 'rgba(15,91,110,0.07)', border: '1.5px solid rgba(15,91,110,0.3)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,91,110,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = dark ? 'rgba(15,91,110,0.1)' : 'rgba(15,91,110,0.07)'; e.currentTarget.style.transform = 'none' }}>
                <Ic n="play" s={16} c="#0F5B6E" />
                شاهد الفيديو
              </a>
              <a href="#showcase" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 24px', borderRadius: 18, fontSize: 15, fontWeight: 700, color: textMuted, background: 'transparent', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0F5B6E' }}
                onMouseLeave={e => { e.currentTarget.style.color = textMuted }}>
                استكشف رصد
                <Ic n="arrl" s={16} c="#0F5B6E" />
              </a>
            </div>

            <div className="hero-cta" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
              <Ic n="droid" s={16} c={dark ? 'rgba(232,240,242,0.38)' : 'rgba(13,27,30,0.38)'} />
              <span style={{ fontSize: 13, color: dark ? 'rgba(232,240,242,0.38)' : 'rgba(13,27,30,0.38)' }}>متاح لأجهزة Android (ملف APK مباشر)</span>
            </div>
          </div>

          {/* Phone + floating cards */}
          <div className="hero-phone" style={{ position: 'relative', flexShrink: 0 }}>
            <div className="animate-float">
              <PhoneMockup imgSrc={imgAdminDashboard} alt="لوحة تحكم رصد" />
            </div>
            {/* Glow */}
            <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 180, height: 35, background: 'rgba(15,91,110,0.45)', borderRadius: '50%', filter: 'blur(20px)', zIndex: -1 }} />

            {/* Card: students */}
            <div className="animate-float-delayed hero-float-card" style={{ position: 'absolute', right: -90, top: 70, background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: '12px 18px', minWidth: 145, boxShadow: '0 12px 40px rgba(0,0,0,0.22)', textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: dark ? 'rgba(232,240,242,0.48)' : 'rgba(13,27,30,0.48)', marginBottom: 2 }}>إجمالي الطلاب</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0F5B6E', lineHeight: 1 }}>1,240</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5, marginTop: 5 }}>
                <span style={{ fontSize: 10, color: '#2F6B4F' }}>+45 هذا الشهر</span>
                <span style={{ fontSize: 11, color: '#2F6B4F' }}>↑</span>
              </div>
            </div>

            {/* Card: attendance */}
            <div className="animate-float hero-float-card" style={{ position: 'absolute', left: -90, bottom: 130, background: cardBg, border: `1px solid rgba(184,134,11,0.28)`, borderRadius: 20, padding: '12px 18px', minWidth: 145, boxShadow: '0 12px 40px rgba(0,0,0,0.22)', textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: dark ? 'rgba(232,240,242,0.48)' : 'rgba(13,27,30,0.48)', marginBottom: 4 }}>حضور اليوم</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#B8860B', lineHeight: 1 }}>94%</div>
              <div style={{ height: 5, background: 'rgba(184,134,11,0.15)', borderRadius: 4, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ height: '100%', width: '94%', background: '#B8860B', borderRadius: 4 }} />
              </div>
            </div>

            {/* Card: groups */}
            <div className="animate-float-slow hero-float-card" style={{ position: 'absolute', right: -70, bottom: 100, background: cardBg, border: '1px solid rgba(47,107,79,0.28)', borderRadius: 16, padding: '9px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 10, background: 'rgba(47,107,79,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#2F6B4F' }}>15 مجموعة</div>
                  <div style={{ fontSize: 9, color: dark ? 'rgba(232,240,242,0.38)' : 'rgba(13,27,30,0.38)' }}>نشطة الآن</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom,transparent,${bg})`, pointerEvents: 'none' }} />
    </section>
  )
}

/* ══════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════ */

function AboutSection({ dark }: { dark: boolean }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.58)' : 'rgba(13,27,30,0.58)'
  return (
    <section id="about" style={{ padding: '100px 20px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 60 }}>
          <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.13)' : 'rgba(15,91,110,0.07)', border: '1px solid rgba(15,91,110,0.25)' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>عن رصد</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
          {/* Text */}
          <div className="reveal" style={{ flex: '1 1 380px', textAlign: 'right' }}>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 900, lineHeight: 1.28, color: textMain, marginBottom: 22 }}>
              إدارة أسهل، ومتابعة أوضح —<br />
              <span style={{ color: '#0F5B6E' }}>كل عملية في مكان واحد</span>
            </h2>
            <p style={{ fontSize: 16, color: textMuted, lineHeight: 2, marginBottom: 30 }}>
              رصد يقدم للمدرسين والسناتر التعليمية حلاً رقمياً متكاملاً يقضي تماماً على الكشوفات الورقية المعرضة للأخطاء والضياع. يجمع بين تنظيم الطلاب، الحضور الذكي بـ QR Code، إصدار إيصالات الدفع، وتوثيق سجل العمليات في تطبيق واحد فائق السرعة.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['إدارة شاملة لملفات الطلاب وسجلات الحضور والغياب', '#0F5B6E'],
                ['تسجيل حضور فوري بكاميرا الهاتف بتقنية QR Code الذكية', '#2F6B4F'],
                ['ضبط المصروفات وإصدار إيصالات دفع مفصلة لولي الأمر', '#B8860B'],
                ['سجل عمليات موثق (Activity Log) مع تفويض آمن للمساعدين', '#0F5B6E']
              ].map(([t, c], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 14, color: dark ? 'rgba(232,240,242,0.78)' : 'rgba(13,27,30,0.78)' }}>{t}</span>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${c}1A`, border: `1px solid ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: c as string }}>✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Phone */}
          <div className="reveal-left" style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <PhoneMockup imgSrc={imgStudentDetails} alt="شاشة تفاصيل الطالب والحضور" />
            <div className="animate-pulse-slow" style={{ position: 'absolute', inset: -20, borderRadius: 64, border: '1px solid rgba(15,91,110,0.12)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 44, filter: 'blur(30px)', background: 'rgba(15,91,110,0.14)', zIndex: -1 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FEATURES SECTION
══════════════════════════════════════════════ */

function FeaturesSection({ dark }: { dark: boolean }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.52)' : 'rgba(13,27,30,0.52)'
  const cardBg = dark ? '#1A2428' : 'white'
  return (
    <section id="features" style={{ padding: '100px 20px', background: dark ? 'rgba(15,91,110,0.035)' : 'rgba(15,91,110,0.025)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.13)' : 'rgba(15,91,110,0.07)', border: '1px solid rgba(15,91,110,0.25)', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>المميزات الأساسية</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: textMain, marginBottom: 14 }}>منظومة متكاملة لخدمة العملية التعليمية</h2>
          <p style={{ fontSize: 16, color: textMuted, maxWidth: 520, margin: '0 auto' }}>حلول عملية ومبتكرة تضمن انضباط الحصص ودقة الحسابات وتوفير وقت المعلم والسنتر.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="reveal card-hover" style={{ background: cardBg, border: `1px solid ${f.color}18`, borderRadius: 20, padding: '26px 22px', textAlign: 'right', transitionDelay: `${(i % 4) * 70}ms`, cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${f.color}45`; e.currentTarget.style.boxShadow = `0 8px 32px ${f.color}14` }}
              onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${f.color}18`; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: `${f.color}18`, border: `1px solid ${f.color}2A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Ic n={f.icon} s={22} c={f.color} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: textMain, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: textMuted, lineHeight: 1.85 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DASHBOARD SECTION
══════════════════════════════════════════════ */

function DashboardSection({ dark }: { dark: boolean }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.52)' : 'rgba(13,27,30,0.52)'
  const cardBg = dark ? '#1A2428' : 'white'
  return (
    <section id="dashboard" style={{ padding: '100px 20px', background: dark ? 'rgba(15,91,110,0.03)' : 'rgba(15,91,110,0.022)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.13)' : 'rgba(15,91,110,0.07)', border: '1px solid rgba(15,91,110,0.25)', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>لوحة التحكم</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: textMain, marginBottom: 14 }}>لوحة تحكم تلخص حالة العمليات في لمح البصر</h2>
          <p style={{ fontSize: 16, color: textMuted, maxWidth: 540, margin: '0 auto' }}>شاشة واحدة تمنحك رؤية فورية لأعداد الطلاب، نسب حضور المجموعات، التحصيل المالي، وآخر العمليات المسجلة.</p>
        </div>

        <div className="reveal" style={{ position: 'relative' }}>
          {/* Floating cards */}
          <div className="animate-float" style={{ display: 'none', position: 'absolute', top: -24, right: 40, zIndex: 10, background: cardBg, border: '1px solid rgba(15,91,110,0.28)', borderRadius: 20, padding: '12px 20px', boxShadow: '0 10px 36px rgba(0,0,0,0.2)', textAlign: 'right' }} id="dash-card-1">
            <div style={{ fontSize: 10, color: dark ? 'rgba(232,240,242,0.45)' : 'rgba(13,27,30,0.45)' }}>حضور اليوم</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#0F5B6E' }}>94%</div>
          </div>
          <div className="animate-float-delayed" style={{ display: 'none', position: 'absolute', bottom: -24, left: 40, zIndex: 10, background: cardBg, border: '1px solid rgba(184,134,11,0.28)', borderRadius: 20, padding: '12px 20px', boxShadow: '0 10px 36px rgba(0,0,0,0.2)', textAlign: 'right' }} id="dash-card-2">
            <div style={{ fontSize: 10, color: dark ? 'rgba(232,240,242,0.45)' : 'rgba(13,27,30,0.45)' }}>الطلاب المقيدون</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#B8860B' }}>1,240</div>
          </div>

          {/* Browser frame */}
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid rgba(15,91,110,0.25)', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
            {/* Browser chrome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: '#1A2C32', borderBottom: '1px solid rgba(15,91,110,0.2)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['rgba(231,76,60,0.5)','rgba(241,196,15,0.5)','rgba(46,204,113,0.5)'].map((c,i)=>(
                  <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, background: '#0F1A1D', borderRadius: 10, padding: '5px 14px', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2F6B4F' }} />
                <span style={{ fontSize: 11, color: 'rgba(232,240,242,0.3)' }}>rasd.app/dashboard</span>
              </div>
            </div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <DesktopDashboard />
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(min-width:900px){#dash-card-1,#dash-card-2{display:block!important}}`}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   APP SHOWCASE SECTION (Real Screenshots)
══════════════════════════════════════════════ */

function ShowcaseSection({ dark, activeTab, setActiveTab }: { dark: boolean; activeTab: number; setActiveTab: (v: number | ((p: number) => number)) => void }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.52)' : 'rgba(13,27,30,0.52)'
  const total = SHOWCASE_SCREENS.length
  const prev = () => setActiveTab(t => (t - 1 + total) % total)
  const next = () => setActiveTab(t => (t + 1) % total)

  return (
    <section id="showcase" style={{ padding: '100px 20px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.13)' : 'rgba(15,91,110,0.07)', border: '1px solid rgba(15,91,110,0.25)', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>داخل التطبيق</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: textMain, marginBottom: 14 }}>اكتشف رصد من الداخل</h2>
          <p style={{ fontSize: 16, color: textMuted, maxWidth: 480, margin: '0 auto' }}>صور حقيقية من داخل التطبيق — تعرّف على التجربة قبل التحميل.</p>
        </div>

        {/* Tabs */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 52 }}>
          {SHOWCASE_SCREENS.map((s, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ padding: '8px 18px', borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', background: activeTab === i ? '#0F5B6E' : (dark ? 'rgba(15,91,110,0.1)' : 'rgba(15,91,110,0.06)'), color: activeTab === i ? 'white' : (dark ? 'rgba(232,240,242,0.55)' : 'rgba(13,27,30,0.55)'), border: `1px solid ${activeTab === i ? '#0F5B6E' : 'rgba(15,91,110,0.2)'}`, transform: activeTab === i ? 'translateY(-1px)' : 'none', boxShadow: activeTab === i ? '0 4px 16px rgba(15,91,110,0.3)' : 'none' }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 50, flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Main phone with real screenshot */}
          <div className="reveal" style={{ position: 'relative', flexShrink: 0 }}>
            <div className="animate-float">
              <PhoneMockup size={290} imgSrc={SHOWCASE_SCREENS[activeTab]?.img} alt={`شاشة ${SHOWCASE_SCREENS[activeTab]?.label} في تطبيق رصد`} />
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 44, filter: 'blur(40px)', background: 'rgba(15,91,110,0.22)', zIndex: -1 }} />
          </div>

          {/* Info + thumbnail grid */}
          <div style={{ flex: '1 1 300px', maxWidth: 500, textAlign: 'right' }}>
            {/* Active screen info */}
            <div className="reveal" style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: textMain, marginBottom: 10 }}>{SHOWCASE_SCREENS[activeTab]?.label}</h3>
              <p style={{ fontSize: 15, color: textMuted, lineHeight: 1.9 }}>{SHOWCASE_SCREENS[activeTab]?.desc}</p>
            </div>

            {/* Preview grid with real images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {SHOWCASE_SCREENS.map((s, i) => (
                <button key={i} onClick={() => setActiveTab(i)} aria-label={`عرض شاشة ${s.label}`} style={{ aspectRatio: '9/16', borderRadius: 12, overflow: 'hidden', border: activeTab === i ? '2.5px solid #0F5B6E' : `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, cursor: 'pointer', background: '#0F1A1D', position: 'relative', transition: 'all 0.2s', transform: activeTab === i ? 'scale(1.08)' : 'scale(1)', boxShadow: activeTab === i ? '0 0 28px rgba(15,91,110,0.4)' : 'none', padding: 0 }}>
                  <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  {/* Overlay label */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 4px 4px', background: 'linear-gradient(to top,rgba(15,26,29,0.95),transparent)', textAlign: 'center' }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(232,240,242,0.85)' }}>{s.label}</span>
                  </div>
                  {activeTab === i && (
                    <div style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: '#0F5B6E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: 'white', fontWeight: 800 }}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows + dots */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 36 }}>
          <button onClick={prev} aria-label="الشاشة السابقة" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(15,91,110,0.15)' : 'rgba(15,91,110,0.09)', border: '1px solid rgba(15,91,110,0.28)', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(15,91,110,0.28)'}
            onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(15,91,110,0.15)' : 'rgba(15,91,110,0.09)'}>
            <Ic n="arrl" s={16} c="#0F5B6E" />
          </button>
          {SHOWCASE_SCREENS.map((_, i) => (
            <button key={i} onClick={() => setActiveTab(i)} aria-label={`الانتقال إلى شاشة ${SHOWCASE_SCREENS[i]?.label}`} style={{ height: 8, borderRadius: 8, background: activeTab === i ? '#0F5B6E' : (dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.18)'), width: activeTab === i ? 28 : 8, transition: 'all 0.25s', border: 'none', cursor: 'pointer', padding: 0 }} />
          ))}
          <button onClick={next} aria-label="الشاشة التالية" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(15,91,110,0.15)' : 'rgba(15,91,110,0.09)', border: '1px solid rgba(15,91,110,0.28)', cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(15,91,110,0.28)'}
            onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(15,91,110,0.15)' : 'rgba(15,91,110,0.09)'}>
            <Ic n="arrr" s={16} c="#0F5B6E" />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════ */

function HowSection({ dark }: { dark: boolean }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.52)' : 'rgba(13,27,30,0.52)'
  return (
    <section id="how" style={{ padding: '100px 20px', background: dark ? 'rgba(15,91,110,0.035)' : 'rgba(15,91,110,0.025)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.13)' : 'rgba(15,91,110,0.07)', border: '1px solid rgba(15,91,110,0.25)', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>كيف يعمل</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: textMain }}>ابدأ مع رصد بسهولة</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32, position: 'relative' }}>
          {/* Connector line - desktop only */}
          <div style={{ position: 'absolute', top: 36, right: '22%', left: '22%', height: 1, background: 'linear-gradient(to left,transparent,rgba(15,91,110,0.45),transparent)', display: 'none' }} id="step-line" />
          {STEPS.map((s, i) => (
            <div key={i} className="reveal" style={{ textAlign: 'center', transitionDelay: `${i * 120}ms` }}>
              <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 22 }}>
                <div style={{ width: 72, height: 72, borderRadius: 24, background: 'rgba(15,91,110,0.16)', border: '1.5px solid rgba(15,91,110,0.32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic n={s.icon} s={30} c="#0F5B6E" />
                </div>
                <div style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28, borderRadius: '50%', background: '#0F5B6E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(15,91,110,0.45)' }}>
                  <span style={{ fontSize: 11, fontWeight: 900, color: 'white' }}>{s.num}</span>
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: textMain, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.9 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(min-width:640px){#step-line{display:block!important}}`}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   VIDEO SECTION
══════════════════════════════════════════════ */

function VideoSection({ dark }: { dark: boolean }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.58)' : 'rgba(13,27,30,0.58)'
  const cardBg = dark ? '#1A2428' : '#FFFFFF'
  const border = dark ? 'rgba(15,91,110,0.22)' : 'rgba(15,91,110,0.15)'

  return (
    <section id="video" style={{ padding: '100px 20px', background: dark ? '#0A1316' : '#F4F8F9', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', width: 600, height: 600, top: '20%', left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(15,91,110,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(15,91,110,0.13)' : 'rgba(15,91,110,0.07)', border: '1px solid rgba(15,91,110,0.25)', marginBottom: 18 }}>
            <Ic n="play" s={14} c="#0F5B6E" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F5B6E' }}>فيديو توضيحي للتطبيق</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: textMain, marginBottom: 14 }}>
            شاهد تطبيق رصد عملياً أثناء التشغيل
          </h2>
          <p style={{ fontSize: 16, color: textMuted, maxWidth: 620, margin: '0 auto', lineHeight: 1.8 }}>
            استعراض واقعي ومباشر لتجربة الاستخدام: مسح الحضور الفوري بـ QR Code، سلاسة التنقل بين المجموعات، وتسجيل الإجراءات في ثوانٍ معدودة.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', background: '#000000', border: '2px solid rgba(15,91,110,0.3)', boxShadow: '0 25px 60px rgba(0,0,0,0.45)' }}>
            <video
              src={appVideo}
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', maxHeight: '580px', display: 'block', margin: '0 auto', background: '#000' }}
            >
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
          {/* Subtle reflection / glow under video */}
          <div style={{ width: '80%', height: 30, background: 'rgba(15,91,110,0.35)', filter: 'blur(30px)', margin: '0 auto', borderRadius: '50%' }} />
        </div>

        {/* Video Highlights */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 40 }}>
          {[
            { title: 'تسجيل الحضور الفوري', desc: 'مسح كاميرا الهاتف لبطاقة الطالب بالـ QR في أجزاء من الثانية دون تعطيل بداية الحصة.', icon: 'cal', color: '#2F6B4F' },
            { title: 'إدارة شاملة للمجموعات', desc: 'استعراض مواعيد الحصص، قوائم الطلاب، والمستحقات بنقرة واحدة وبأعلى كفاءة.', icon: 'grid', color: '#0F5B6E' },
            { title: 'تحصيل الإيصالات والمصروفات', desc: 'توثيق مدفوعات الطلاب وإصدار إيصال سداد مفصل لولي الأمر مع سجل مالي كامل.', icon: 'card', color: '#B8860B' },
          ].map((h, i) => (
            <div key={i} className="card-hover" style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: '22px 20px', textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end', marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: textMain }}>{h.title}</span>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: `${h.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Ic n={h.icon} s={18} c={h.color} />
                </div>
              </div>
              <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.8 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   WHY RASD
══════════════════════════════════════════════ */

function WhySection({ dark }: { dark: boolean }) {
  const textMain = dark ? '#E8F0F2' : '#0D1B1E'
  const textMuted = dark ? 'rgba(232,240,242,0.52)' : 'rgba(13,27,30,0.52)'
  const cardBg = dark ? '#1A2428' : 'white'
  return (
    <section style={{ padding: '100px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 30, background: dark ? 'rgba(184,134,11,0.12)' : 'rgba(184,134,11,0.08)', border: '1px solid rgba(184,134,11,0.28)', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#B8860B' }}>لماذا رصد؟</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: textMain }}>لماذا تختار رصد؟</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18 }}>
          {WHY.map((w, i) => (
            <div key={i} className="reveal card-hover" style={{ background: cardBg, border: `1px solid ${w.color}18`, borderRadius: 28, padding: '34px 26px', textAlign: 'center', transitionDelay: `${i * 80}ms` }}>
              <div style={{ width: 56, height: 56, borderRadius: 20, background: `${w.color}18`, border: `1px solid ${w.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px' }}>
                <Ic n={w.icon} s={24} c={w.color} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 900, color: textMain, marginBottom: 12 }}>{w.title}</h3>
              <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.9 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   DOWNLOAD CTA
══════════════════════════════════════════════ */

function DownloadSection({ dark }: { dark: boolean }) {
  const [clicked, setClicked] = useState(false)
  const bgBase = dark ? '#0A1316' : '#0F5B6E'
  return (
    <section id="download" style={{ padding: '100px 20px', background: bgBase, position: 'relative', overflow: 'hidden' }}>
      {/* Decor */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, top: -280, right: -180, borderRadius: '50%', background: dark ? 'rgba(15,91,110,0.35)' : 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, bottom: -180, left: -100, borderRadius: '50%', background: dark ? 'rgba(15,91,110,0.2)' : 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(to left,rgba(255,255,255,0.7) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div className="reveal" style={{ flex: '1 1 380px', textAlign: 'right' }}>
            <h2 style={{ fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: 22 }}>جاهز تبدأ مع رصد؟</h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.95, marginBottom: 36 }}>
              رصد — إدارة أسهل، ومتابعة أوضح. كل عملية في مكان واحد. حمّل التطبيق الآن وابدأ تنظيم حصصك وطلابك باحترافية وأمان.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
              <a href={apkFile} download="Rasd-app.apk" onClick={() => setClicked(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 18, fontSize: 14, fontWeight: 800, color: '#0F5B6E', background: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', transition: 'all 0.2s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 44px rgba(0,0,0,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)' }}>
                <Ic n="dl" s={18} c="#0F5B6E" />
                {clicked ? '✓ جاري التحميل...' : 'تحميل تطبيق رصد APK'}
              </a>
              <a href="#showcase" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '13px 28px', borderRadius: 18, fontSize: 14, fontWeight: 700, color: 'white', background: 'rgba(255,255,255,0.13)', border: '1.5px solid rgba(255,255,255,0.28)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.transform = 'none' }}>
                استكشف التطبيق
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Ic n="droid" s={18} c="rgba(255,255,255,0.45)" />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>متاح لأجهزة Android (تحميل APK فوري)</span>
            </div>

            {/* Elevix Contact Banner */}
            <div style={{ paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>هل تحتاج إلى استفسار أو طلب تخصيص لمركزك؟</span>
              <a href="https://www.elevix.space/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#FFFFFF', background: 'rgba(255,255,255,0.18)', padding: '6px 14px', borderRadius: 20, textDecoration: 'none', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'none' }}>
                <span>تواصل مع الشركة المطورة (Elevix)</span>
                <span style={{ fontSize: 12 }}>↗</span>
              </a>
            </div>
          </div>
          <div className="reveal-left" style={{ flexShrink: 0, position: 'relative' }}>
            <div className="animate-float">
              <PhoneMockup imgSrc={imgGroupDetails} alt="شاشة تفاصيل المجموعة والطلاب في رصد" />
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 44, filter: 'blur(40px)', background: 'rgba(255,255,255,0.07)', zIndex: -1 }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */

function Footer() {
  const links = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'عن رصد', href: '#about' },
    { label: 'المميزات', href: '#features' },
    { label: 'داخل التطبيق', href: '#showcase' },
    { label: 'فيديو توضيحي', href: '#video' },
    { label: 'كيف يعمل', href: '#how' },
    { label: 'تحميل التطبيق', href: '#download' },
    { label: 'تواصل معنا', href: 'https://www.elevix.space/', external: true },
  ]
  return (
    <footer style={{ background: '#0A1316', fontFamily: 'Cairo,sans-serif' }}>
      <div style={{ height: 1, background: 'rgba(15,91,110,0.35)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40, marginBottom: 50 }}>
          {/* Brand */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>رصد</div>
                <div style={{ fontSize: 11, color: 'rgba(232,240,242,0.3)' }}>| Rasd</div>
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 16, background: '#0F5B6E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(15,91,110,0.4)' }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>ر</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(232,240,242,0.42)', lineHeight: 1.9, textAlign: 'right' }}>
              رصد — حل رقمي متكامل لتنظيم وإدارة العملية التعليمية للمدرسين والسناتر.
            </p>
          </div>
          {/* Links */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(232,240,242,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>روابط سريعة</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {links.map((l, i) => (
                <a key={i} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener noreferrer' : undefined} style={{ fontSize: 14, color: l.external ? '#B8860B' : 'rgba(232,240,242,0.42)', textDecoration: 'none', transition: 'color 0.15s', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  onMouseEnter={e => e.currentTarget.style.color = l.external ? '#D4A017' : '#0F5B6E'}
                  onMouseLeave={e => e.currentTarget.style.color = l.external ? '#B8860B' : 'rgba(232,240,242,0.42)'}>
                  <span>{l.label}</span>
                  {l.external && <span style={{ fontSize: 11 }}>↗</span>}
                </a>
              ))}
            </div>
          </div>
          {/* Company */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: 'rgba(232,240,242,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 18 }}>الشركة المطورة</p>
            <div>
              <p style={{ fontSize: 12, color: 'rgba(232,240,242,0.35)', marginBottom: 6 }}>تم تطوير المنصة بواسطة</p>
              <a href="https://www.elevix.space/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, fontWeight: 900, color: '#B8860B', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 14, transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4A017'}
                onMouseLeave={e => e.currentTarget.style.color = '#B8860B'}>
                Elevix Technologies
                <span style={{ fontSize: 13 }}>↗</span>
              </a>
              <div>
                <a href="https://www.elevix.space/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700, color: '#E8F0F2', background: 'rgba(184,134,11,0.15)', border: '1px solid rgba(184,134,11,0.35)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,134,11,0.28)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(184,134,11,0.15)'; e.currentTarget.style.transform = 'none' }}>
                  <span>تواصل مع الشركة المطورة</span>
                  <span style={{ fontSize: 13 }}>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: 'rgba(232,240,242,0.45)' }}>
            تم التطوير بواسطة{' '}
            <a href="https://www.elevix.space/" target="_blank" rel="noopener noreferrer" style={{ color: '#B8860B', fontWeight: 700, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
              Elevix Technologies
            </a>
          </p>
          <p style={{ fontSize: 12, color: 'rgba(232,240,242,0.25)' }}>© 2026 Rasd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════ */

export default function App() {
  const [dark, setDark] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // useLayoutEffect ensures class is restored before paint, preventing flash when dark toggles
  useLayoutEffect(() => {
    observerRef.current?.disconnect()
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    observerRef.current = obs
    const els = document.querySelectorAll<Element>('.reveal, .reveal-left, .reveal-right')
    els.forEach(el => {
      // Re-add visible for elements already scrolled into view
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible')
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div dir="rtl" style={{ background: dark ? '#11181B' : '#FFFFFF', minHeight: '100vh', transition: 'background 0.3s ease, color 0.3s ease' }}>
      <Navbar dark={dark} toggle={() => setDark(d => !d)} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <HeroSection dark={dark} />
      <AboutSection dark={dark} />
      <FeaturesSection dark={dark} />
      <DashboardSection dark={dark} />
      <ShowcaseSection dark={dark} activeTab={activeTab} setActiveTab={setActiveTab} />
      <HowSection dark={dark} />
      <VideoSection dark={dark} />
      <WhySection dark={dark} />
      <DownloadSection dark={dark} />
      <Footer />
    </div>
  )
}
