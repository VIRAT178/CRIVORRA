import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ArrowRight, Sparkles, Building, Rocket, ShieldCheck, Calendar } from 'lucide-react';
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
  const [budget, setBudget] = useState('$15,000 – $35,000');
  const [timeline, setTimeline] = useState('1 – 3 Months');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const serviceOptions = [
    { id: 'marketing', name: 'Digital Growth & Marketing', division: 'CRIVORRA DIGITALS' },
    { id: 'ai', name: 'AI Solutions & Automation', division: 'CRIVORRA TECHNOLOGIES' },
    { id: 'seo', name: 'SEO & AI Visibility (GEO/AEO)', division: 'CRIVORRA DIGITALS' },
    { id: 'tech', name: 'Web & Software Engineering', division: 'CRIVORRA TECHNOLOGIES' },
    { id: 'branding', name: 'Brand Strategy & Identity', division: 'CRIVORRA DIGITALS' },
    { id: 'crm', name: 'CRM & Growth Infrastructure', division: 'CRIVORRA TECHNOLOGIES' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0F1D]/70 backdrop-blur-md transition-opacity duration-300">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden text-slate-900 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div>
            <BrandLogo size="sm" />
            <p className="text-xs font-mono-code text-slate-500 uppercase tracking-wider mt-1">
              PROJECT INITIATION • CRIVORRA ENGINE
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
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
                <div className="flex justify-between font-mono-code">
                  <span className="text-slate-500">TARGET TIMELINE:</span>
                  <span className="font-semibold text-slate-800">{timeline}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A0F1D] text-white font-semibold text-sm hover:bg-[#0066FF] transition-colors"
                >
                  Done
                </button>
                <a
                  href="#contact"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
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
                  <span className={step === 2 ? 'font-bold text-slate-900' : 'text-slate-500'}>Scale & Budget</span>
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
                  <div>
                    <h4 className="text-lg font-display font-bold text-slate-900">What are we building together?</h4>
                    <p className="text-slate-500 text-xs">
                      Choose one or more areas. Both CRIVORRA DIGITALS and CRIVORRA TECHNOLOGIES collaborate seamlessly.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {serviceOptions.map((srv) => {
                      const isSelected = selectedServices.includes(srv.name);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.name)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                            isSelected
                              ? 'bg-blue-50/60 border-[#0066FF] shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-400">
                              {srv.division}
                            </span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-slate-300'
                              }`}
                            >
                              {isSelected && '✓'}
                            </span>
                          </div>
                          <div className="font-semibold text-slate-800 text-sm mt-2">{srv.name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-full bg-[#0066FF] text-white font-semibold text-sm hover:bg-[#0055d4] transition-colors flex items-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-lg font-display font-bold text-slate-900">Budget & Target Timeline</h4>
                    <p className="text-slate-500 text-xs">
                      Helps us recommend the ideal architectural approach and team deployment.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code uppercase font-semibold text-slate-600 mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['$5,000 – $15,000', '$15,000 – $35,000', '$35,000 – $75,000', '$75,000+'].map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                            budget === b
                              ? 'bg-[#0066FF] text-white border-[#0066FF]'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code uppercase font-semibold text-slate-600 mb-2">
                      Desired Timeline
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['< 1 Month (Fast-track)', '1 – 3 Months', 'Long-term Growth Partner'].map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            timeline === t
                              ? 'bg-[#0A0F1D] text-white border-[#0A0F1D]'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-full bg-[#0066FF] text-white font-semibold text-sm hover:bg-[#0055d4] transition-colors flex items-center gap-2"
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
                  <div>
                    <h4 className="text-lg font-display font-bold text-slate-900">Your Contact & Company Details</h4>
                    <p className="text-slate-500 text-xs">
                      We treat all shared strategic and IP concepts with strict NDA confidentiality.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      placeholder="E.g., We are launching a new AI-assisted platform and need integrated branding, customer acquisition funnel, and automated CRM..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
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

        {/* Footer Guarantee */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] font-mono-code text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Strict NDA Protected
          </span>
          <span className="flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-[#0066FF]" />
            Fast 24h Review
          </span>
        </div>
      </div>
    </div>
  );
};
