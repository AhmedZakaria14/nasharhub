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
  MessageCircle,
  Phone,
  CheckCircle2,
  BadgeCheck
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

  useEffect(() => {
    window.scrollTo(0, 0);
    updateSEO({
      title:
        lang === 'ar'
          ? 'بيانات الدفع والبيانات الضريبية | وكالة نشار هب'
          : 'Official Payment Details & Tax Registration | Nashar Hub',
      description:
        lang === 'ar'
          ? 'طرق الدفع المعتمدة لشركة نشار هب (حساب بنك مصر، إنستاباي، المحفظة الإلكترونية) ورقم التسجيل الضريبي الرسمي.'
          : 'Official payment methods for Nashar Hub (Banque Misr, InstaPay, Mobile Wallet) and official tax registration number.',
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

  const taxRegistrationNumber = '783-550-308';

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
                  ? 'Complete your payment securely in three simple steps through our official verified channels, along with Nashar Hub’s official tax registration number.'
                  : 'أتمم معاملاتك المالية بكل أمان وموثوقية عبر قنوات الدفع الرسمية المعتمدة لوكالة نشار هب، مع إمكانية التحقق من رقم التسجيل الضريبي الرسمي للشركة.'}
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
                <span>{lang === 'ar' ? 'رقم التسجيل الضريبي' : 'Tax Registration No.'}</span>
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

        {/* SECTION 2: OFFICIAL TAX REGISTRATION NUMBER ONLY */}
        <section id="official-docs-section" className="scroll-mt-28">
          <div className="bg-white rounded-3xl border border-[#d1ccc0] p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[#007d87] font-mono text-xs uppercase tracking-widest font-bold mb-1">
                  <FileCheck2 size={14} />
                  <span>{lang === 'en' ? 'OFFICIAL TAX REGISTRATION' : 'البيانات الضريبية الرسمية'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0b1020]">
                  {lang === 'ar' ? 'رقم التسجيل الضريبي' : 'Tax Registration Number'}
                </h2>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#f8f6f0] border border-[#d1ccc0] rounded-2xl p-3 sm:px-5 sm:py-3.5">
              <div
                className="text-xl sm:text-2xl font-extrabold font-mono text-[#0b1020] tracking-widest select-all text-center sm:text-start px-2"
                dir="ltr"
              >
                {taxRegistrationNumber}
              </div>
              <button
                type="button"
                onClick={() => handleCopy(taxRegistrationNumber, 'tax-registration-no')}
                className={`min-h-[44px] px-5 rounded-xl font-bold text-sm cursor-pointer transition-all inline-flex items-center justify-center gap-2 ${
                  copiedKey === 'tax-registration-no'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-[#0369a1] hover:bg-[#0284c7] text-white shadow-xs active:scale-95'
                }`}
              >
                {copiedKey === 'tax-registration-no' ? (
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
          </div>
        </section>
      </div>
    </div>
  );
};
