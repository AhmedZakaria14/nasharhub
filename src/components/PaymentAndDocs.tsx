import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Copy,
  Check,
  ShieldCheck,
  Wallet,
  Building2,
  Smartphone,
  FileCheck2,
  Download,
  ZoomIn,
  X,
  MessageCircle,
  Phone,
  CheckCircle2,
  BadgeCheck,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { updateSEO } from '../utils/seo';

interface PaymentAndDocsProps {
  lang: Language;
  onBack: () => void;
}

interface PaymentRow {
  label: { ar: string; en: string };
  value: string;
  isMono?: boolean;
}

interface PaymentMethod {
  id: string;
  short: { ar: string; en: string };
  name: { ar: string; en: string };
  badge: { ar: string; en: string };
  icon: React.ReactNode;
  rows: PaymentRow[];
}

export const PaymentAndDocs: React.FC<PaymentAndDocsProps> = ({ lang, onBack }) => {
  const isRTL = lang === 'ar';
  const [activeMethod, setActiveMethod] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lightboxDoc, setLightboxDoc] = useState<{
    title: string;
    subtitle: string;
    imgSrc: string;
    downloadHref: string;
    downloadName: string;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateSEO({
      title:
        lang === 'ar'
          ? 'بيانات الدفع والمستندات الرسمية | وكالة نشار هب'
          : 'Official Payment Details & Legal Documents | Nashar Hub',
      description:
        lang === 'ar'
          ? 'طرق الدفع المعتمدة لشركة نشار هب (حساب بنك مصر، إنستاباي، المحفظة الإلكترونية) ومستندات الشركة الرسمية (البطاقة الضريبية وشهادة الموقف الضريبي).'
          : 'Official payment methods for Nashar Hub (Banque Misr, InstaPay, Mobile Wallet) and verified company tax & legal registration documents.',
      url: 'https://nasharhub.com/payment'
    });
  }, [lang]);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'w',
      short: { ar: 'محفظة إلكترونية', en: 'Mobile Wallet' },
      name: { ar: 'المحفظة الإلكترونية', en: 'Electronic Mobile Wallet' },
      badge: { ar: 'تحويل فوري لجميع المحافظ', en: 'Instant Mobile Transfer' },
      icon: <Wallet className="w-5 h-5" />,
      rows: [
        {
          label: { ar: 'رقم المحفظة', en: 'Wallet Number' },
          value: '01010742430',
          isMono: true
        }
      ]
    },
    {
      id: 'i',
      short: { ar: 'إنستاباي', en: 'InstaPay' },
      name: { ar: 'إنستاباي (InstaPay)', en: 'InstaPay Instant Transfer' },
      badge: { ar: 'تحويل لحظي 24/7', en: '24/7 Instant Transfer' },
      icon: <Smartphone className="w-5 h-5" />,
      rows: [
        {
          label: { ar: 'رقم إنستاباي', en: 'InstaPay Number' },
          value: '01017048123',
          isMono: true
        }
      ]
    },
    {
      id: 'b',
      short: { ar: 'حساب بنكي', en: 'Bank Account' },
      name: { ar: 'حساب بنكي - بنك مصر', en: 'Bank Account - Banque Misr' },
      badge: { ar: 'تحويل محلي ودولي معتمد', en: 'Local & International Wire' },
      icon: <Building2 className="w-5 h-5" />,
      rows: [
        {
          label: { ar: 'اسم المستفيد', en: 'Beneficiary Name' },
          value: 'ابراهيم محمد ابراهيم مصطفى على',
          isMono: false
        },
        {
          label: { ar: 'IBAN', en: 'IBAN' },
          value: 'EG510002041904190333000080968',
          isMono: true
        },
        {
          label: { ar: 'رقم الحساب', en: 'Account Number' },
          value: '4190333000080968',
          isMono: true
        },
        {
          label: { ar: 'Swift Code', en: 'Swift Code' },
          value: 'BMISEGCXXXX',
          isMono: true
        }
      ]
    }
  ];

  const handleCopy = (value: string, key: string) => {
    try {
      navigator.clipboard.writeText(value);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 1800);
  };

  const officialDocs = [
    {
      id: 'tax-card',
      title: {
        ar: 'البطاقة الضريبية الرسمية',
        en: 'Official Egyptian Tax Card'
      },
      authority: {
        ar: 'جمهورية مصر العربية - وزارة المالية - مصلحة الضرائب المصرية',
        en: ' Arab Republic of Egypt - Ministry of Finance - Egyptian Tax Authority'
      },
      badge: {
        ar: 'سارية حتى 2031/09/21',
        en: 'Valid until 21/09/2031'
      },
      imageSrc: '/assets/aistudio/tax_card_official.jpg',
      downloadHref: '/assets/aistudio/IMG-20261111-WA0064_5caf64aa.jpg',
      downloadName: 'Nashar-Hub-Tax-Card.jpg',
      isPdf: false,
      highlights: [
        {
          label: { ar: 'اسم الممول المعتمد', en: 'Registered Taxpayer' },
          value: 'ابراهيم محمد ابراهيم مصطفي علي'
        },
        {
          label: { ar: 'رقم التسجيل الضريبي', en: 'Tax Registration No.' },
          value: '783-550-308'
        },
        {
          label: { ar: 'كود ونوع النشاط', en: 'Activity Code & Type' },
          value: lang === 'ar' ? '4791 - البيع والتجارة عبر الإنترنت' : '4791 - Online Commerce & Digital Services'
        },
        {
          label: { ar: 'رقم البطاقة المطبوع', en: 'Card Serial Number' },
          value: '2135446267486603'
        }
      ]
    },
    {
      id: 'tax-certificate',
      title: {
        ar: 'شهادة الموقف الضريبي الرسمية',
        en: 'Official Tax Clearance & Status Certificate'
      },
      authority: {
        ar: 'منطقة ضرائب الدقهلية أول - مأمورية الضرائب العامة بالمنزلة',
        en: 'Egyptian Tax Authority - General Tax Directorate'
      },
      badge: {
        ar: 'مختومة بشعار الجمهورية',
        en: 'Official State Seal Verified'
      },
      imageSrc: '/assets/aistudio/tax_status_certificate.jpg',
      downloadHref: '/assets/aistudio/DOC-20260917-WA0000_8909156f.pdf',
      downloadName: 'Nashar-Hub-Tax-Certificate.pdf',
      isPdf: true,
      highlights: [
        {
          label: { ar: 'اسم الممول', en: 'Taxpayer Name' },
          value: 'ابراهيم محمد ابراهيم مصطفي علي'
        },
        {
          label: { ar: 'رقم الملف الضريبي', en: 'Tax File No.' },
          value: '5/28806/117/1/1'
        },
        {
          label: { ar: 'النشاط المسجل رسمياً', en: 'Registered Business Activity' },
          value: lang === 'ar' ? 'تجارة إلكترونية والتسويق الرقمي' : 'E-Commerce & Digital Marketing'
        },
        {
          label: { ar: 'الموقف الضريبي', en: 'Tax Liability Status' },
          value: lang === 'ar' ? 'لا يوجد عليها أي مستحقات ضريبية' : 'Clear - Zero Outstanding Tax Dues'
        }
      ]
    }
  ];

  const receiptWhatsappMsg = encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً فريق نشار هب، قمت بإتمام التحويل المالي ومرفق لكم صورة إيصال الدفع لتأكيد التعاقد.'
      : 'Hello Nashar Hub team, I have completed the payment transfer and attached the receipt for confirmation.'
  );

  return (
    <div
      className={`min-h-screen bg-[#f4f1e9] text-[#0b1020] ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Hero Header */}
      <div className="bg-[#0b1020] pt-28 sm:pt-32 pb-16 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#1677d2]/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/75 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all mb-8 font-mono text-xs cursor-pointer"
          >
            {isRTL ? <ArrowRight size={15} /> : <ChevronRight size={15} className="rotate-180" />}
            <span>{lang === 'en' ? 'Back to Home' : 'العودة للرئيسية'}</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#38bdf8] font-mono text-xs uppercase tracking-widest font-bold mb-3 bg-[#1677d2]/15 border border-[#38bdf8]/30 px-3.5 py-1.5 rounded-full">
                <ShieldCheck size={16} />
                <span>
                  {lang === 'en'
                    ? 'VERIFIED ACCOUNTS & OFFICIAL CREDENTIALS'
                    : 'الحسابات المالية المعتمدة والمستندات الرسمية'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                {lang === 'en'
                  ? 'Payment Details & Company Documents'
                  : 'بيانات الدفع ومستندات الشركة الرسمية'}
              </h1>
              <p className="text-base md:text-lg text-white/75 max-w-3xl font-normal leading-relaxed">
                {lang === 'en'
                  ? 'Complete your payment securely in three simple steps through our official verified channels, and review Nashar Hub’s official tax and legal registration documents.'
                  : 'أتمم معاملاتك المالية بكل أمان وموثوقية عبر قنوات الدفع الرسمية المعتمدة لوكالة نشار هب، مع إمكانية الاطلاع المباشر على البطاقة الضريبية وشهادة الموقف الضريبي الرسمية.'}
              </p>
            </div>

            {/* Quick Section Jump Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#payment-methods-section"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const el = document.getElementById('payment-methods-section');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 96;
                    window.scrollTo({ top, behavior: 'smooth' });
                    window.history.replaceState(null, '', '/payment#payment-methods-section');
                  }
                }}
                className="inline-flex items-center gap-2 bg-[#1677d2] hover:bg-[#1262b0] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer"
              >
                <Wallet size={17} />
                <span>{lang === 'ar' ? 'طرق الدفع المتاحة' : 'Payment Methods'}</span>
              </a>
              <a
                href="#official-docs-section"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const el = document.getElementById('official-docs-section');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 96;
                    window.scrollTo({ top, behavior: 'smooth' });
                    window.history.replaceState(null, '', '/payment#official-docs-section');
                  }
                }}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
              >
                <FileCheck2 size={17} className="text-[#38bdf8]" />
                <span>{lang === 'ar' ? 'مستندات الشركة الرسمية' : 'Official Documents'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
        {/* SECTION 1: PAYMENT PORTAL (Matches Attached HTML Design + Enhanced UX) */}
        <section id="payment-methods-section" className="scroll-mt-28">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#d1ccc0] bg-white grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar: 3 Steps */}
            <div className="lg:col-span-4 bg-[#0c4a6e] text-white p-8 sm:p-10 flex flex-col justify-between gap-8 relative overflow-hidden">
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#0ea5e9]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-8 relative z-10">
                {/* Brand Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0ea5e9] flex items-center justify-center shadow-md shrink-0">
                    <img
                      src="https://res.cloudinary.com/ddrsmtsvj/image/upload/v1789590583/unnamed_1_mtjci9.png"
                      alt="نشار هب"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl font-extrabold tracking-wide block leading-none">
                      {lang === 'ar' ? 'نشار هب' : 'Nashar Hub'}
                    </span>
                    <span className="text-xs text-[#e0f2fe]/80 font-mono">
                      {lang === 'ar' ? 'بوابة بيانات الدفع المعتمدة' : 'Official Payment Portal'}
                    </span>
                  </div>
                </div>

                {/* Main Sidebar Heading */}
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug text-white">
                  {lang === 'ar' ? 'إتمام الدفع بثلاث خطوات' : 'Complete Payment in 3 Steps'}
                </h2>

                {/* 3 Steps List */}
                <div className="space-y-5">
                  {[
                    {
                      num: '1',
                      title: lang === 'ar' ? 'اختر طريقة الدفع' : 'Select payment method',
                      desc:
                        lang === 'ar'
                          ? 'اختر بين المحفظة الإلكترونية، إنستاباي، أو حساب بنك مصر.'
                          : 'Choose Mobile Wallet, InstaPay, or Banque Misr.'
                    },
                    {
                      num: '2',
                      title: lang === 'ar' ? 'حوّل المبلغ من تطبيقك' : 'Transfer from your banking app',
                      desc:
                        lang === 'ar'
                          ? 'اضغط على زر "نسخ" بجانب الرقم أو الـ IBAN للصقه مباشرة في تطبيقك.'
                          : 'Click "Copy" next to the number or IBAN to paste it directly.'
                    },
                    {
                      num: '3',
                      title: lang === 'ar' ? 'أرسل صورة الإيصال' : 'Send receipt screenshot',
                      desc:
                        lang === 'ar'
                          ? 'أرسل لقطة شاشة للإيصال عبر واتساب لتأكيد الدفع والبدء فوراً.'
                          : 'Send the transfer screenshot via WhatsApp for instant confirmation.'
                    }
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <b className="w-9 h-9 rounded-full bg-[#e0f2fe] text-[#0c4a6e] font-extrabold text-base flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {step.num}
                      </b>
                      <div>
                        <div className="text-base sm:text-lg font-bold text-white">{step.title}</div>
                        <p className="text-xs sm:text-sm text-[#e0f2fe]/80 mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send Receipt CTA inside Sidebar */}
              <div className="pt-6 border-t border-white/15 relative z-10 space-y-3">
                <a
                  href={`https://wa.me/201010742430?text=${receiptWhatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3.5 px-5 rounded-xl shadow-lg transition-all text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>{lang === 'ar' ? 'إرسال صورة الإيصال عبر واتساب' : 'Send Receipt via WhatsApp'}</span>
                </a>
                <div className="flex items-center justify-center gap-2 text-xs text-[#e0f2fe]/90">
                  <BadgeCheck className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'جميع الحسابات مسجلة رسمياً باسم مؤسس الشركة'
                      : 'All accounts are officially registered to the company founder'}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Area: Payment Methods Accordion / Cards */}
            <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
                      {lang === 'ar' ? 'طرق الدفع المتاحة' : 'Available Payment Methods'}
                    </h2>
                    <p className="text-sm text-[#475569] mt-1">
                      {lang === 'ar'
                        ? 'اضغط على وسيلة الدفع المناسبة لك لنسخ البيانات بضغطة واحدة'
                        : 'Select your preferred payment method below to copy account details with one click'}
                    </p>
                  </div>

                  {/* Quick Switcher Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {paymentMethods.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveMethod(idx)}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                          activeMethod === idx
                            ? 'bg-[#0369a1] text-white border-[#0369a1] shadow-sm'
                            : 'bg-slate-50 text-[#0f172a] border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m.icon}
                        <span>{m.short[lang]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accordion List matching HTML template structure */}
                <div className="flex flex-col gap-4">
                  {paymentMethods.map((method, idx) => {
                    const isOpen = activeMethod === idx;
                    return (
                      <div
                        key={method.id}
                        className={`rounded-2xl border-2 transition-all duration-200 ${
                          isOpen
                            ? 'border-[#0369a1] bg-[#f0f9ff] shadow-sm'
                            : 'border-[#e2e8f0] bg-white hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveMethod(idx)}
                          className="w-full min-h-[62px] flex items-center justify-between gap-3 bg-transparent border-0 px-4 sm:px-6 py-4 text-right cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Radio Dot */}
                            <span
                              className="w-5 h-5 rounded-full border-2 border-[#0369a1] flex items-center justify-center shrink-0"
                              aria-hidden="true"
                            >
                              {isOpen && <span className="w-2.5 h-2.5 rounded-full bg-[#0369a1]" />}
                            </span>
                            <div className="flex items-center gap-2.5 text-[#0f172a]">
                              <span
                                className={`p-2 rounded-lg ${
                                  isOpen ? 'bg-[#0369a1] text-white' : 'bg-slate-100 text-[#0369a1]'
                                }`}
                              >
                                {method.icon}
                              </span>
                              <span className="text-lg sm:text-xl font-extrabold">{method.name[lang]}</span>
                            </div>
                          </div>

                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full hidden sm:inline-block ${
                              isOpen
                                ? 'bg-[#0369a1]/15 text-[#0369a1]'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {method.badge[lang]}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 sm:px-6 pb-5 pt-1 flex flex-col gap-3">
                            {method.rows.map((row, rIdx) => {
                              const copyId = `${method.id}-${rIdx}`;
                              const isCopied = copiedKey === copyId;
                              return (
                                <div
                                  key={copyId}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-4 sm:py-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-xs"
                                >
                                  <div className="min-w-0">
                                    <div className="text-xs sm:text-[13px] font-semibold text-[#475569] mb-0.5">
                                      {row.label[lang]}
                                    </div>
                                    <div
                                      className={`text-base sm:text-[17px] font-bold text-[#0f172a] break-all select-all ${
                                        row.isMono ? 'font-mono tracking-wide' : ''
                                      }`}
                                      dir={row.isMono ? 'ltr' : undefined}
                                    >
                                      {row.value}
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleCopy(row.value, copyId)}
                                    className={`flex-none min-h-[44px] px-5 rounded-xl font-bold text-sm sm:text-[15px] cursor-pointer transition-all inline-flex items-center justify-center gap-2 ${
                                      isCopied
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-[#0369a1] hover:bg-[#0284c7] text-white shadow-xs active:scale-95'
                                    }`}
                                  >
                                    {isCopied ? (
                                      <>
                                        <Check className="w-4 h-4" />
                                        <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-4 h-4" />
                                        <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Verification Note */}
              <div className="mt-8 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0369a1]/10 text-[#0369a1] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#0f172a]">
                      {lang === 'ar'
                        ? 'تطابق تام بين اسم المستفيد البنكي والبطاقة الضريبية الرسمية'
                        : '100% Match Between Bank Beneficiary & Official Tax Registration'}
                    </p>
                    <p className="text-xs text-[#475569]">
                      {lang === 'ar'
                        ? 'المستفيد المعتمد: ابراهيم محمد ابراهيم مصطفى على — رقم التسجيل الضريبي: 783-550-308'
                        : 'Beneficiary: Ibrahim Mohamed Ibrahim Mostafa Ali — Tax ID: 783-550-308'}
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+201010742430"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0369a1] hover:underline shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span dir="ltr">01010742430</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OFFICIAL COMPANY DOCUMENTS (البطاقة الضريبية + شهادة الموقف الضريبي) */}
        <section id="official-docs-section" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#d1ccc0] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[#007d87] font-mono text-xs uppercase tracking-widest font-bold mb-2">
                <FileCheck2 size={16} />
                <span>
                  {lang === 'en' ? 'OFFICIAL LEGAL & TAX CREDENTIALS' : 'الأوراق الثبوتية والتراخيص الضريبية'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0b1020]">
                {lang === 'en' ? 'Official Company Documents' : 'مستندات الشركة الرسمية'}
              </h2>
              <p className="text-sm sm:text-base text-[#667078] mt-1 max-w-2xl">
                {lang === 'en'
                  ? 'Nashar Hub operates with full legal and tax compliance. Below are our official Tax Card and Tax Status Certificate issued by the Egyptian Tax Authority.'
                  : 'تعمل وكالة نشار هب بكيان قانوني وضريبي رسمي ومعتمد. يمكنك معاينة وتحميل البطاقة الضريبية وشهادة الموقف الضريبي الصادرة عن مصلحة الضرائب المصرية.'}
              </p>
            </div>

            {/* Verified Registration Summary Pill */}
            <div className="bg-white border border-[#d1ccc0] rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-xs shrink-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-[#667078] font-medium">
                  {lang === 'ar' ? 'رقم التسجيل الضريبي الموحد' : 'Unified Tax Registration No.'}
                </div>
                <div className="text-base font-extrabold font-mono text-[#0b1020] tracking-wider" dir="ltr">
                  783 - 550 - 308
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Documents Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {officialDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-[#d1ccc0] overflow-hidden shadow-md flex flex-col justify-between hover:border-[#0369a1]/50 transition-all"
              >
                <div>
                  {/* Card Top Bar */}
                  <div className="p-6 sm:p-7 bg-[#0b1020] text-white flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-2.5 py-0.5 rounded-full mb-2">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        {doc.badge[lang]}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">{doc.title[lang]}</h3>
                      <p className="text-xs text-white/70 mt-1">{doc.authority[lang]}</p>
                    </div>
                  </div>

                  {/* Document Preview Image Box */}
                  <div className="p-5 sm:p-6 bg-[#f8f6f0] border-b border-[#d1ccc0]">
                    <div
                      onClick={() =>
                        setLightboxDoc({
                          title: doc.title[lang],
                          subtitle: doc.authority[lang],
                          imgSrc: doc.imageSrc,
                          downloadHref: doc.downloadHref,
                          downloadName: doc.downloadName
                        })
                      }
                      className="group relative rounded-2xl overflow-hidden border border-[#d1ccc0] bg-white shadow-sm cursor-pointer aspect-[16/11] flex items-center justify-center"
                    >
                      <img
                        src={doc.imageSrc}
                        alt={doc.title[lang]}
                        className="w-full h-full object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#0b1020]/0 group-hover:bg-[#0b1020]/35 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0b1020]/90 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full inline-flex items-center gap-2 shadow-lg border border-white/20">
                          <ZoomIn className="w-4 h-4 text-[#38bdf8]" />
                          <span>{lang === 'ar' ? 'اضغط لتكبير المستند بوضوح كامل' : 'Click to Zoom Document'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Extracted Metadata Grid */}
                  <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {doc.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#f8f6f0] border border-[#d1ccc0]/70"
                      >
                        <div className="text-[11px] font-bold text-[#667078] mb-1">
                          {item.label[lang]}
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-[#0b1020] break-words">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer (Zoom + Download Original PDF/Image) */}
                <div className="px-6 sm:px-7 pb-6 pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxDoc({
                        title: doc.title[lang],
                        subtitle: doc.authority[lang],
                        imgSrc: doc.imageSrc,
                        downloadHref: doc.downloadHref,
                        downloadName: doc.downloadName
                      })
                    }
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-[#0b1020] hover:bg-[#16203a] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4 text-[#38bdf8]" />
                    <span>{lang === 'ar' ? 'معاينة وتكبير' : 'Preview & Zoom'}</span>
                  </button>

                  {doc.isPdf && (
                    <a
                      href={doc.downloadHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-[#0369a1] hover:bg-[#0284c7] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'فتح ملف PDF الأصلي' : 'Open Original PDF'}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  )}

                  <a
                    href={doc.downloadHref}
                    download={doc.downloadName}
                    className="inline-flex items-center justify-center gap-2 bg-[#f4f1e9] hover:bg-[#e8e3d7] text-[#0b1020] border border-[#d1ccc0] font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all"
                  >
                    <Download className="w-4 h-4 text-[#007d87]" />
                    <span>{lang === 'ar' ? 'تحميل' : 'Download'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal for Fullscreen Document Inspection */}
      {lightboxDoc && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxDoc(null)}
        >
          <div
            className="bg-[#0b1020] border border-white/15 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:px-6 border-b border-white/10 flex items-center justify-between gap-4 text-white">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold">{lightboxDoc.title}</h3>
                <p className="text-xs text-white/65">{lightboxDoc.subtitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxDoc.downloadHref}
                  download={lightboxDoc.downloadName}
                  className="inline-flex items-center gap-1.5 bg-[#1677d2] hover:bg-[#1262b0] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تحميل المستند' : 'Download'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxDoc(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 overflow-auto bg-[#f8f6f0] flex-1 flex items-center justify-center">
              <img
                src={lightboxDoc.imgSrc}
                alt={lightboxDoc.title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
