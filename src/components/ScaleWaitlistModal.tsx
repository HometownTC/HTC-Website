import React, { useState, useEffect, useRef } from 'react';
import { X, Zap, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Building, Send, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ScaleWaitlistModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    brokerage: '',
    monthlyVolume: '4–7 transactions/month',
    afterHoursNeed: 'Contract preparation after 6 PM',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus or focus title when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      ...formData,
      submittedAt: new Date().toISOString(),
      recipients: ['hello@hometowntc.com', 'christian.hernandez@hometowntc.com'],
      source: 'Pricing Page - SCALE Waitlist Form',
    };

    try {
      // 1. Save to local storage for permanent archival
      try {
        const stored = JSON.parse(localStorage.getItem('htc_scale_waitlist_leads') || '[]');
        stored.push(payload);
        localStorage.setItem('htc_scale_waitlist_leads', JSON.stringify(stored));
      } catch (e) {
        console.warn('Storage log error:', e);
      }

      // 2. Dispatch form submission to email relay for Michelle and Christian
      const response = await fetch('https://formsubmit.co/ajax/hello@hometowntc.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[SCALE Waitlist Submission] ${formData.fullName} - ${formData.brokerage}`,
          _cc: 'christian.hernandez@hometowntc.com',
          _replyto: formData.email,
          'Full Name': formData.fullName,
          'Work Email': formData.email,
          'Phone Number': formData.phone,
          'Brokerage / Team': formData.brokerage,
          'Monthly Deal Volume': formData.monthlyVolume,
          'Primary After-Hours Need': formData.afterHoursNeed,
          'Additional Notes': formData.notes || 'None provided',
          'Submission Timestamp': new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST',
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success !== 'false' && result.success !== false) {
        setStatus('success');
      } else {
        console.error('FormSubmit response error or activation needed:', result);
        setStatus('error');
        if (result && result.message && result.message.includes('Activation')) {
          setErrorMessage("Form activation required: A one-time 'Activate Form' confirmation email was sent by FormSubmit to hello@hometowntc.com. Once Michelle clicks that link, submissions will route directly to both inboxes.");
        } else {
          setErrorMessage((result && result.message) || 'We could not send your submission automatically. Please use the direct email button below or try again.');
        }
      }
    } catch (err) {
      console.error('Form submission encountered network error:', err);
      setStatus('error');
      setErrorMessage('Network connection error. We could not verify delivery. Please use the direct email button below or try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      brokerage: '',
      monthlyVolume: '4–7 transactions/month',
      afterHoursNeed: 'Contract preparation after 6 PM',
      notes: '',
    });
    setStatus('idle');
    onClose();
  };

  const mailtoBody = encodeURIComponent(
    `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nBrokerage: ${formData.brokerage}\nMonthly Volume: ${formData.monthlyVolume}\nAfter-Hours Need: ${formData.afterHoursNeed}\nNotes: ${formData.notes || 'None'}`
  );
  const directMailtoUrl = `mailto:hello@hometowntc.com?cc=christian.hernandez@hometowntc.com&subject=${encodeURIComponent(
    `[SCALE Waitlist Submission] ${formData.fullName || 'New Agent'} - ${formData.brokerage || 'Florida Realtor'}`
  )}&body=${mailtoBody}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scale-waitlist-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#D8D2D4] overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-[#3A2E29] text-white p-6 sm:p-8 relative">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center space-x-2 bg-[#FE7311]/20 border border-[#FE7311]/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#FE7311]">
              <Zap className="w-3.5 h-3.5" />
              <span>SCALE · Coming Soon</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 id="scale-waitlist-title" className="text-2xl sm:text-3xl font-serif font-extrabold text-white mt-3">
            Join the SCALE Waitlist
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Extended operational support after 6:00 PM EST for high-volume Florida agents. Be the first to be notified when enrollment opens for your production tier.
          </p>
        </div>

        {/* Content Body */}
        {status === 'success' ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-serif font-extrabold text-[#3A2E29]">
                You're on the Priority Waitlist!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your details have been routed directly to <strong>Michelle Martinez</strong> and <strong>Christian Hernandez</strong> for the upcoming SCALE cohort setup.
              </p>
            </div>

            <div className="bg-[#EEEAEB] rounded-2xl p-4 text-left text-xs space-y-1.5 border border-[#D8D2D4]">
              <div className="font-bold text-[#3A2E29] uppercase tracking-wider mb-2">Submission Summary:</div>
              <div><strong className="text-[#3A2E29]">Agent:</strong> {formData.fullName}</div>
              <div><strong className="text-[#3A2E29]">Email:</strong> {formData.email}</div>
              <div><strong className="text-[#3A2E29]">Phone:</strong> {formData.phone}</div>
              <div><strong className="text-[#3A2E29]">Brokerage:</strong> {formData.brokerage}</div>
              <div><strong className="text-[#3A2E29]">Monthly Volume:</strong> {formData.monthlyVolume}</div>
              <div><strong className="text-[#3A2E29]">Priority Need:</strong> {formData.afterHoursNeed}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={directMailtoUrl}
                className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#EEEAEB] hover:bg-[#e2dcde] text-[#3A2E29] font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl border border-[#D8D2D4] transition"
              >
                <Mail className="w-4 h-4 text-[#075960]" />
                <span>Open Email Copy</span>
              </a>
              <button
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition shadow-md cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                  Full Name <span className="text-[#C84600]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                  Work Email <span className="text-[#C84600]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sarah@floridarealty.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                  Direct Phone <span className="text-[#C84600]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(305) 555-0199"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                  Brokerage / Team <span className="text-[#C84600]">*</span>
                </label>
                <input
                  type="text"
                  name="brokerage"
                  required
                  value={formData.brokerage}
                  onChange={handleChange}
                  placeholder="e.g. Compass Coral Gables"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                  Monthly Deal Volume
                </label>
                <select
                  name="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
                >
                  <option value="1–3 transactions/month">1–3 transactions/month</option>
                  <option value="4–7 transactions/month">4–7 transactions/month</option>
                  <option value="8–15 transactions/month">8–15 transactions/month</option>
                  <option value="16+ transactions/month">16+ transactions/month (Team / Mega)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                  Primary After-Hours Need
                </label>
                <select
                  name="afterHoursNeed"
                  value={formData.afterHoursNeed}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
                >
                  <option value="Contract preparation after 6 PM">Contract preparation after 6 PM</option>
                  <option value="Weekend offer submission & counters">Weekend offer submission & counters</option>
                  <option value="Rush inspection amendments">Rush inspection amendments</option>
                  <option value="Comprehensive after-hours coordination">Comprehensive after-hours coordination</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3A2E29] mb-1.5">
                Specific Goals / Questions (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell Michelle and Christian about your after-hours support bottlenecks..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8D2D4] bg-[#EEEAEB]/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#075960] text-sm text-[#3A2E29] font-medium transition"
              />
            </div>

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-2">
                <div className="font-bold flex items-center space-x-1.5">
                  <span>Delivery Notice:</span>
                </div>
                <p>{errorMessage}</p>
                <div className="pt-1">
                  <a
                    href={directMailtoUrl}
                    className="inline-flex items-center space-x-1.5 bg-[#C84600] hover:bg-[#a93800] text-white px-3.5 py-2 rounded-lg font-bold text-xs transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-white" />
                    <span>Send via Direct Email Instead</span>
                  </a>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#FE7311] hover:bg-[#e05f03] text-[#1A1412] py-4 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Sending Waitlist Request...</span>
                ) : (
                  <>
                    <span>Submit & Join Priority Waitlist</span>
                    <ArrowRight className="w-4 h-4 ml-1 text-[#1A1412]" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2">
                Submissions are sent directly to Michelle Martinez &amp; Christian Hernandez for Hunter CRM setup.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
