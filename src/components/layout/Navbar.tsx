import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenProjectPlanner: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectPlanner, activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Questions', href: '#fnaq' },
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 glass-light shadow-sm shadow-slate-900/5'
            : 'py-3.5 sm:py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with C Emblem */}
          <a href="#home" className="group flex items-center">
            <BrandLogo size="md" imgClassName="h-13 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px]" showTagline={false} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-[#0066FF] hover:bg-slate-100/90 transition-all duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 border-r border-slate-200 pr-3 text-xs font-mono-code text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>DIGITALS</span>
              <span className="text-slate-300">•</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7928CA]" />
              <span>TECHNOLOGIES</span>
            </div>

            <button
              onClick={onOpenProjectPlanner}
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0A0F1D] text-white text-sm font-bold tracking-wide hover:bg-[#0066FF] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenProjectPlanner}
              className="sm:hidden px-3 py-1.5 rounded-full bg-[#0066FF] text-white text-xs font-bold tracking-wide"
            >
              Start
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/80 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#0A0F1D]/50 backdrop-blur-sm pt-20 px-4 pb-6 flex flex-col justify-between">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="pb-3 border-b border-slate-100">
              <BrandLogo size="md" showTagline={true} />
            </div>

            <div className="grid grid-cols-2 gap-2 py-2">
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <div className="text-[10px] font-mono-code font-bold text-[#0066FF]">DIVISION 01</div>
                <div className="font-display text-xs font-bold text-slate-800">CRIVORRA DIGITALS</div>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                <div className="text-[10px] font-mono-code font-bold text-[#7928CA]">DIVISION 02</div>
                <div className="font-display text-xs font-bold text-slate-800">CRIVORRA TECHNOLOGIES</div>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0066FF] hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProjectPlanner();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Start a Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
