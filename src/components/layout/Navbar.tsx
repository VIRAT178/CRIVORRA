import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, ChevronDown, Linkedin, Instagram } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenProjectPlanner: () => void;
  activeSection?: string;
  onNavigateToAbout?: () => void;
  onNavigateToHome?: () => void;
  currentPage?: 'home' | 'about-crivorra';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjectPlanner,
  activeSection = 'home',
  onNavigateToAbout,
  onNavigateToHome,
  currentPage = 'home',
}) => {
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
    { label: 'Approach', href: '#approach' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    if (href === '#about') {
      if (onNavigateToAbout) {
        onNavigateToAbout();
      }
      return;
    }
    if (currentPage !== 'home' && onNavigateToHome) {
      onNavigateToHome();
      setTimeout(() => {
        const elem = document.querySelector(href);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'py-2.5 glass-light shadow-sm shadow-slate-900/5'
            : 'py-3.5 sm:py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          {/* Left: Brand Logo on all viewports (Mobile, Tablet, Desktop, Large Screens) */}
          <div className="flex items-center lg:flex-1 justify-start">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigateToHome) {
                  e.preventDefault();
                  onNavigateToHome();
                }
                setIsMobileMenuOpen(false);
              }}
              className="flex group items-center cursor-pointer select-none py-1"
              aria-label="Crivorra Digitals Home"
            >
              <BrandLogo
                size="lg"
                imgClassName="h-16 sm:h-18 md:h-20 lg:h-22 xl:h-24 w-auto max-w-[190px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[360px]"
                showTagline={false}
              />
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center">
            <nav className="flex items-center gap-1 xl:gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-[#0066FF] hover:bg-slate-100/90 transition-all duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: "About Crivorra" button for large screens only + Mobile Menu Toggle */}
          <div className="flex items-center lg:flex-1 justify-end gap-3">
            {/* Desktop-only button redirecting to About Crivorra page */}
            <button
              id="nav-about-crivorra-btn"
              onClick={() => {
                if (onNavigateToAbout) {
                  onNavigateToAbout();
                }
              }}
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer group whitespace-nowrap shadow-xs ${
                currentPage === 'about-crivorra'
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white shadow-blue-500/20 shadow-md'
                  : 'bg-white/90 hover:bg-white text-[#0A0F1D] border border-slate-200/90 hover:border-[#0066FF]/50 hover:text-[#0066FF] hover:shadow-sm'
              }`}
            >
              <span>About Crivorra</span>
              <ArrowUpRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  currentPage === 'about-crivorra' ? 'text-white' : 'text-slate-400 group-hover:text-[#0066FF]'
                }`}
              />
            </button>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/90 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#0A0F1D]/60 backdrop-blur-md pt-18 sm:pt-20 px-4 pb-6 flex flex-col justify-start overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/90 space-y-4 max-w-sm mx-auto w-full my-auto">
            {/* Centered Brand Logo inside drawer */}
            <div className="pb-3 border-b border-slate-100 flex flex-col items-center justify-center text-center">
              <BrandLogo size="md" showTagline={true} className="items-center text-center mx-auto" />
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLinkClick(link.href);
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0066FF] hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </nav>

            {/* Action button & Direct Social links */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenProjectPlanner();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Start a Project
              </button>

              {/* Prominent LinkedIn and Instagram quick links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/crivorra-digital-899230436/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  <Linkedin className="w-4 h-4 text-[#0066FF]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/crivorra?stkn=MTBkOWc3dWpxaHN4Zg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-[#7928CA] hover:to-[#FF0080] hover:border-transparent flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
