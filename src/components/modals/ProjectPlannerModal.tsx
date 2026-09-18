import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ArrowRight, Sparkles, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface ProjectPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDivision?: 'DIGITALS' | 'TECHNOLOGIES' | 'ALL';
}

export const ProjectPlannerModal: React.FC<ProjectPlannerModalProps> = ({
  isOpen,
  onClose,
  initialDivision = 'ALL',
}) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('₹1,00,000 / month');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Prevent background scrolling on laptop and mobile when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const serviceOptions = [
    { id: 'smm', name: 'Social Media Management' },
    { id: 'branding', name: 'Brand Management' },
    { id: 'seo', name: 'Search Engine Optimisation' },
    { id: 'gmb', name: 'Google my business' },
    { id: 'meta-ads', name: 'Meta Ad run' },
    { id: 'google-ads', name: 'Google Ad run' },
    { id: 'geo-aeo', name: 'GEO | AEO' },
    { id: 'analytics', name: 'Google Analytics' },
  ];

  const budgetPresets = [
    '₹50,000 / month',
    '₹1,00,000 / month',
    '₹2,50,000 / month',
    '₹5,00,000 / month',
    '₹10,00,000+ / month',
    'Custom / Flexible',
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      setSelectedServices(selectedServices.filter((s) => s !== name));
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          services: selectedServices,
          budget,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          website: formData.website,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to dispatch inquiry. Please try again.');
      }

      setIsSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0066FF', '#00D2FF', '#7928CA', '#FF0080', '#FF5E1E'],
      });
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError(err?.message || 'Failed to submit inquiry. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setStep(1);
    setSelectedServices([]);
    setBudget('₹1,00,000 / month');
    setFormData({ name: '', email: '', phone: '', company: '', website: '', message: '' });
    onClose();
  };

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 bg-[#0A0F1D]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden text-slate-900 h-[88vh] max-h-[720px] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Header - Centered Logo, no subtitle */}
        <div className="relative p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-center justify-center bg-gradient-to-r from-slate-50 via-white to-slate-50 shrink-0">
          <div className="flex items-center justify-center">
            <BrandLogo size="md" />
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with guaranteed vertical scrolling on both laptops and mobile */}
        <div
          data-lenis-prevent="true"
          className="p-5 sm:p-8 overflow-y-auto flex-1 min-h-0 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-extrabold text-[#0A0F1D]">Project Brief Received</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
                  Thank you, <span className="font-semibold text-slate-800">{formData.name || 'Partner'}</span>. A confirmation email has been dispatched to <span className="font-semibold text-[#0066FF]">{formData.email}</span> and our strategy directors have received your project dossier.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between font-mono-code">
                  <span className="text-slate-500">SELECTED SERVICES:</span>
                  <span className="font-bold text-[#0066FF]">
                    {selectedServices.length > 0 ? selectedServices.join(', ') : 'Integrated Growth'}
                  </span>
                </div>
                <div className="flex justify-between font-mono-code">
                  <span className="text-slate-500">MONTHLY BUDGET:</span>
                  <span className="font-semibold text-slate-800">{budget || 'Custom / Flexible'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A0F1D] text-white font-semibold text-sm hover:bg-[#0066FF] transition-colors cursor-pointer"
                >
                  Done
                </button>
                <a
                  href="#contact"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#0066FF]" />
                  Schedule Discovery Call
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stepper indicator */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs font-mono-code">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= 1 ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    1
                  </span>
                  <span className={step === 1 ? 'font-bold text-slate-900' : 'text-slate-500'}>Scope</span>
                </div>
                <span className="text-slate-300">———</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= 2 ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    2
                  </span>
                  <span className={step === 2 ? 'font-bold text-slate-900' : 'text-slate-500'}>Your Monthly Budget</span>
                </div>
                <span className="text-slate-300">———</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= 3 ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    3
                  </span>
                  <span className={step === 3 ? 'font-bold text-slate-900' : 'text-slate-500'}>Contact Details</span>
                </div>
              </div>

              {/* Step 1: Services */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-xl font-display font-bold text-slate-900">What we build?</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceOptions.map((srv) => {
                      const isSelected = selectedServices.includes(srv.name);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.name)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-50/70 border-[#0066FF] shadow-sm text-[#0066FF]'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                          }`}
                        >
                          <span className="font-semibold text-sm sm:text-base">{srv.name}</span>
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ml-3 transition-colors ${
                              isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && '✓'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-full bg-[#0066FF] text-white font-semibold text-sm hover:bg-[#0055d4] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Your Monthly Budget */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-xl font-display font-bold text-slate-900">Your Monthly Budget</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Enter your expected monthly investment or choose a reference tier.
                    </p>
                  </div>

                  <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Enter Monthly Budget
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg pointer-events-none">
                          ₹
                        </span>
                        <input
                          type="text"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="Enter your monthly budget (e.g. 75,000 / month)"
                          className="w-full pl-9 pr-4 py-3.5 text-base font-semibold rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 transition-all"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2">
                        Or pick a reference option:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgetPresets.map((preset) => (
                          <button
                            type="button"
                            key={preset}
                            onClick={() => setBudget(preset)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                              budget === preset
                                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-full bg-[#0066FF] text-white font-semibold text-sm hover:bg-[#0055d4] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      Next: Contact Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact details (Indian Oriented Placeholders) */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-xl font-display font-bold text-slate-900">Contact Details</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Share your details for an initial discovery and roadmap</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Rohan Sharma"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g., rohan@company.in"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Company / Brand Name</label>
                      <input
                        type="text"
                        maxLength={120}
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g., Bharat Dynamics, D2C Lifestyle, Tata Digital"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        maxLength={20}
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Current Website / Instagram Store</label>
                    <input
                      type="text"
                      maxLength={200}
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourbrand.in or @brand_handle"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Brief project overview or primary growth goal
                    </label>
                    <textarea
                      rows={3}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g., Scaling our D2C brand across tier 1 & tier 2 Indian cities with high-ROAS Meta ads, Google ads, and SEO..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Brief...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Submit Project Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
