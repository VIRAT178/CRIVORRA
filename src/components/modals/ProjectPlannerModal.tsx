import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ArrowRight, Sparkles, Calendar } from 'lucide-react';
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
  const [budget, setBudget] = useState('₹1,50,000 – ₹5,00,000');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const budgetOptions = [
    '₹50,000 – ₹1,50,000',
    '₹1,50,000 – ₹5,00,000',
    '₹5,00,000 – ₹15,00,000',
    '₹15,00,000+',
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      setSelectedServices(selectedServices.filter((s) => s !== name));
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0066FF', '#00D2FF', '#7928CA', '#FF0080', '#FF5E1E'],
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setSelectedServices([]);
    setFormData({ name: '', email: '', company: '', website: '', message: '' });
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
        {/* Header */}
        <div className="p-5 sm:p-7 pb-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50 shrink-0">
          <div>
            <BrandLogo size="sm" />
            <p className="text-xs font-mono-code text-slate-500 uppercase tracking-wider mt-1">
              PROJECT INITIATION • CRIVORRA ENGINE
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
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
                  Thank you, <span className="font-semibold text-slate-800">{formData.name || 'Partner'}</span>. Our digital growth and technology directors are reviewing your requirements. We will prepare an architectural roadmap within 24 hours.
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
                  <span className="text-slate-500">ESTIMATED BUDGET:</span>
                  <span className="font-semibold text-slate-800">{budget}</span>
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
                  <span className={step === 2 ? 'font-bold text-slate-900' : 'text-slate-500'}>Budget & Timeline</span>
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
                  <span className={step === 3 ? 'font-bold text-slate-900' : 'text-slate-500'}>Contact</span>
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

              {/* Step 2: Budget & Target Timeline */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-xl font-display font-bold text-slate-900">Budget & Target Timeline</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {budgetOptions.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`p-4 sm:p-5 rounded-2xl border text-sm sm:text-base font-semibold text-center transition-all cursor-pointer ${
                          budget === b
                            ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
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

              {/* Step 3: Contact details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-xl font-display font-bold text-slate-900">Contact Details</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Growth Corp"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Current Website / URL</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Brief project overview or primary growth goal
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your project requirements..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Submit Project Brief
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
