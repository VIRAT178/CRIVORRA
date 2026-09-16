import React, { useState } from 'react';
import { ArrowRight, Check, Linkedin, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC<{
  onOpenProjectPlanner: () => void;
  onReplayIntro?: () => void;
}> = ({ onOpenProjectPlanner, onReplayIntro }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Questions', href: '#fnaq' },
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/crivorra' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/crivorra' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/crivorra' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@crivorra' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-[#0A0F1D] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200/80">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <BrandLogo size="lg" showTagline={true} />

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              CRIVORRA builds digital systems that turn ideas into measurable growth. We unite performance marketing, AI automation, software engineering, and distinctive branding.
            </p>

            <div className="space-y-1 text-xs font-mono-code text-slate-500">
              <div className="font-bold text-[#0A0F1D]">CREATE. EVOLVE. GROW.</div>
              <div>IDEAS TODAY. IMPACT TOMORROW.</div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0066FF] hover:text-white transition-colors"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Division 1: CRIVORRA DIGITALS */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono-code text-xs font-bold text-[#0066FF] uppercase tracking-wider">
              CRIVORRA DIGITALS
            </div>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <a href="#services" className="hover:text-[#0066FF] transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0066FF] transition-colors">
                  Social Media Strategy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0066FF] transition-colors">
                  SEO & AI Visibility (GEO/AEO)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0066FF] transition-colors">
                  Performance Media Buying
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0066FF] transition-colors">
                  Brand Strategy & Creative
                </a>
              </li>
            </ul>
          </div>

          {/* Division 2: CRIVORRA TECHNOLOGIES */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono-code text-xs font-bold text-[#7928CA] uppercase tracking-wider">
              CRIVORRA TECHNOLOGIES
            </div>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <a href="#services" className="hover:text-[#7928CA] transition-colors">
                  Custom AI Automation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#7928CA] transition-colors">
                  Intelligent AI Assistants
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#7928CA] transition-colors">
                  Next.js Web Platforms
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#7928CA] transition-colors">
                  Enterprise CRM Architecture
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#7928CA] transition-colors">
                  Business Flow Automations
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Nav & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono-code text-xs font-bold text-[#0A0F1D] uppercase tracking-wider">
              THE GROWTH DISPATCH
            </div>
            <p className="text-xs text-slate-600">
              Quarterly intelligence briefings on AI search visibility, algorithmic ad changes, and enterprise automation.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Subscribed! Welcome to the Growth Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#0066FF]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#0A0F1D] text-white text-xs font-bold hover:bg-[#0066FF] transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenProjectPlanner}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] hover:underline"
              >
                <span>Initiate a Custom Project Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono-code">
          <div>
            © 2026 <strong className="text-[#0A0F1D]">CRIVORRA</strong>. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-[#0066FF] transition-colors">
                {link.label}
              </a>
            ))}
            <span className="text-slate-300">•</span>
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            {onReplayIntro && (
              <>
                <span className="text-slate-300">•</span>
                <button
                  onClick={onReplayIntro}
                  className="hover:text-[#0066FF] text-slate-500 font-bold transition-colors cursor-pointer"
                  title="Replay opening brand animation"
                >
                  Replay Intro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
