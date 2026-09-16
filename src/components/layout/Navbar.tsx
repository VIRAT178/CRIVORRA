import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
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
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
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
          isScrolled
            ? 'py-2.5 glass-light shadow-sm shadow-slate-900/5'
            : 'py-3.5 sm:py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div className="flex-1 flex items-center justify-start">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigateToHome) {
                  e.preventDefault();
                  onNavigateToHome();
                }
              }}
              className="group flex items-center cursor-pointer"
            >
              <BrandLogo size="md" imgClassName="h-13 sm:h-16 md:h-18 max-w-[220px] sm:max-w-[260px]" showTagline={false} />
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs">
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

          {/* Right: "About Crivorra" button for large screens only + Mobile Menu Toggle */}
          <div className="flex-1 flex items-center justify-end gap-3">
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
                className="p-2 rounded-xl bg-white/80 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-30 lg:hidden bg-[#0A0F1D]/50 backdrop-blur-sm pt-20 px-4 pb-6 flex flex-col justify-between">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="pb-3 border-b border-slate-100">
              <BrandLogo size="md" showTagline={true} />
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLinkClick(link.href);
                  }}
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
