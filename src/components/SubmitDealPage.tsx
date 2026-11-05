import React, { useEffect } from 'react';
import { ShieldCheck, Clock, Phone, Mail, FileText, Users, AlertCircle } from 'lucide-react';
import { usePageSeo } from '../hooks/usePageSeo';
import { trackDealIntakeStart, trackSubmitDealComplete } from '../utils/analytics';
import type { Language } from '../types';

const COPY = {
  "en": {
    "k0": "FOR EXISTING HTC CLIENTS · QUICK FILE DROP",
    "k1": "Submit a New Deal",
    "k2": "Submit your file details for Listing Launch, Contract-to-Close, or Broker Compliance below and our team will take it from here.",
    "k3": "Have This Ready",
    "k4": "Start your file",
    "k5": "Pick your account, tap through the details and upload your contract. About 2 minutes, built for your phone.",
    "k6": "Start your file →",
    "k7": "Opens HTC's secure file form. Your phone remembers you next time.",
    "k8": "What Happens Next?",
    "k9": "A confirmation email will be in your inbox after you submit your file. Please review it to make sure everything is correct and reply directly to that email if anything needs to be changed.",
    "k10": "Need Help Submitting?",
    "k11": "Submit a New Deal | Hometown Transaction Coordinators",
    "k12": "Submit your file details for Listing Launch, Contract-to-Close, or Broker Compliance.",
    "k13": "Signed Agreement",
    "k14": "Have the signed agreements that apply to this file ready to upload in one single file.",
    "k15": "Contact Information",
    "k16": "Have the buyer and/or seller's full contact information ready.",
    "k17": "Anything We Should Know?",
    "help1": "If the form will not load, call/text us or email",
    "help2": "with the agreement and contact information. We'll take it from there.",
    "k18": "Tell us what is missing, pending, unusual, or time-sensitive in the form so we can navigate it from the start."
  },
  "es": {
    "k0": "PARA CLIENTES ACTUALES DE HTC · QUICK FILE DROP",
    "k1": "Enviar una Transacción",
    "k2": "Envíe abajo los detalles de su expediente de Lanzamiento de Listados, De Contrato a Cierre o Cumplimiento con el Broker y nuestro equipo se encarga del resto.",
    "k3": "Tenga esto listo",
    "k4": "Inicie su expediente",
    "k5": "Elija su cuenta, complete los detalles y suba su contrato. Unos 2 minutos, pensado para su teléfono. El formulario está en inglés.",
    "k6": "Iniciar expediente →",
    "k7": "Abre el formulario seguro de HTC. Su teléfono lo recordará la próxima vez.",
    "k8": "¿Qué pasa después?",
    "k9": "Después de enviar su expediente recibirá un correo de confirmación. Revíselo para confirmar que todo esté correcto y responda directamente a ese correo si hay que cambiar algo.",
    "k10": "¿Necesita ayuda para enviar?",
    "k11": "Enviar una Transacción | Hometown Transaction Coordinators",
    "k12": "Envíe los detalles de su expediente de Lanzamiento de Listados, De Contrato a Cierre o Cumplimiento con el Broker.",
    "k13": "Contrato firmado",
    "k14": "Tenga listos los contratos firmados de este expediente para subirlos en un solo archivo.",
    "k15": "Información de contacto",
    "k16": "Tenga lista la información de contacto completa del comprador y/o vendedor.",
    "k17": "¿Algo que debamos saber?",
    "help1": "Si el formulario no carga, llámenos, envíenos un texto o escriba a",
    "help2": "con el contrato y la información de contacto. Nosotros nos encargamos.",
    "k18": "Indíquenos en el formulario lo que falta, lo pendiente, lo inusual o lo urgente para manejarlo desde el inicio."
  }
} as const;


interface Props {
  language?: Language;
  onGoHome: () => void;
  onOpenPricing: () => void;
  onOpenFaq: () => void;
  onBookCall?: () => void;
}

const PHONE_NUMBER = '(954) 377-8330';
const EMAIL_ADDRESS = 'support@hometowntc.com';

export const SubmitDealPage: React.FC<Props> = ({
  onGoHome,
  onOpenPricing,
  onOpenFaq,
  onBookCall,
  language = 'en'
}) => {
  const t = COPY[language];
  const es = language === 'es';
  usePageSeo({
    title: t.k11,
    description: t.k12,
    canonicalUrl: es ? 'https://hometowntc.com/es/enviar-transaccion/' : 'https://hometowntc.com/submit-deal/',
    language,
    alternates: [
      { lang: 'en', url: 'https://hometowntc.com/submit-deal/' },
      { lang: 'es', url: 'https://hometowntc.com/es/enviar-transaccion/' }
    ],
    breadcrumbs: [
      { name: es ? 'Inicio' : 'Home', url: es ? 'https://hometowntc.com/es/' : 'https://hometowntc.com/' },
      { name: t.k1, url: 'https://hometowntc.com/submit-deal/' }
    ]
  });

  useEffect(() => {
    trackDealIntakeStart('submit_deal_page');
    document.title = t.k11;

  }, [language]);

  const checklistItems = [
    {
      icon: <FileText className="w-5 h-5 text-[#0D9BA3]" />,
      title: t.k13,
      desc: t.k14
    },
    {
      icon: <Users className="w-5 h-5 text-[#FE7311]" />,
      title: t.k15,
      desc: t.k16
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-[#3A2E29]" />,
      title: t.k17,
      desc: t.k18
    }
  ];

  return (
    <div className="bg-[#EEEAEB] text-[#3A2E29] min-h-screen pb-24">

      {/* 1. HERO */}
      <section className="bg-[#3A2E29] text-white pt-28 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#0D9BA3]/30">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center space-x-1.5 bg-[#0D9BA3]/20 text-[#0D9BA3] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>{t.k0}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-serif">
            {t.k1}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {t.k2}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* 2. HAVE THIS READY CHECKLIST */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#D8D2D4] px-6 py-6 sm:px-8 sm:py-7">
          <h3 className="text-xs font-extrabold text-[#3A2E29] uppercase tracking-widest mb-5">
            {t.k3}
          </h3>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E4E5]">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2 sm:px-6 py-4 sm:py-0 first:pl-0 last:pr-0">
                <div>{item.icon}</div>
                <strong className="text-sm font-bold text-[#3A2E29]">{item.title}</strong>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. HOME BASE FILE FORM (Nov 1, 2026: replaces the Fillout form — new files go straight into Home Base) */}
        <div className="bg-white rounded-3xl border border-[#D8D2D4] shadow-xl w-full p-8 sm:p-12 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black text-[#3A2E29] font-serif">{t.k4}</h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">{t.k5}</p>
          <a
            href="https://team.hometowntc.com/homebase/submit.html"
            onClick={() => trackDealIntakeStart('submit_deal_home_base_form')}
            className="inline-flex items-center justify-center w-full sm:w-auto bg-[#FE7311] hover:bg-[#FF8C13] text-white font-black text-lg px-10 py-5 rounded-2xl shadow-lg transition"
          >
            {t.k6}
          </a>
          <p className="text-xs text-slate-500">{t.k7}</p>
        </div>

        {/* 4. WHAT HAPPENS NEXT + NEED HELP — side by side on desktop */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D8D2D4] shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#FE7311]" />
              <h4 className="font-bold text-[#3A2E29] text-sm uppercase tracking-wider">{t.k8}</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.k9}
            </p>
          </div>

          {/* Need Help Submitting */}
          <div className="bg-[#3A2E29] text-white rounded-2xl p-6 sm:p-8 border border-[#0D9BA3]/30 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#0D9BA3]" />
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">{t.k10}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.help1}{' '}
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-[#0D9BA3] font-bold hover:underline">{EMAIL_ADDRESS}</a>{' '}
              {t.help2}
            </p>
            <div className="flex flex-col space-y-2.5 pt-1">
              <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="flex items-center space-x-2 text-xs font-bold hover:text-[#FE7311] transition">
                <Phone className="w-4 h-4" />
                <span>Call/Text: {PHONE_NUMBER}</span>
              </a>
              <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center space-x-2 text-xs font-bold hover:text-[#0D9BA3] transition">
                <Mail className="w-4 h-4" />
                <span>Email: {EMAIL_ADDRESS}</span>
              </a>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};
