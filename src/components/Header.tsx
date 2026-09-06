import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, Lock } from 'lucide-react';
import { COLORS } from '../constants/theme';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInquire: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenInquire,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Produits' },
    { id: 'projects', label: 'Réalisations' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070b14]/90 border-b border-[#1e293b] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <span className="font-montserrat font-extrabold text-2xl sm:text-3xl tracking-tight">
              <span className="text-white group-hover:text-[#007aff] transition-colors duration-200">SHYK</span>
              {' '}
              <span className="text-white group-hover:text-[#cbd5e1] transition-colors duration-200">AUTO</span>
            </span>
            <span className="hidden sm:inline-block font-mono-tech text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded bg-[#0a1329] text-[#cbd5e1] border border-[#cbd5e1]/30">
              EST. 1985
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 font-mono-tech text-xs tracking-wider uppercase transition-colors duration-200 focus:outline-none ${
                  isActive
                    ? 'text-[#cbd5e1] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#cbd5e1] animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Admin Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="nav-admin-btn"
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-sm font-mono-tech text-[11px] font-bold uppercase transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow'
                : 'bg-[#0d1527] hover:bg-[#16233f] text-slate-300 border border-[#1e293b]'
            }`}
          >
            <Lock size={13} />
            <span>Admin</span>
          </button>

          <button
            id="nav-inquire-btn"
            onClick={onOpenInquire}
            className="group relative overflow-hidden bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] px-5 py-2.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <span>Devis / Inquire</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#000613] group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('admin')}
            className="p-2 text-slate-300 bg-[#0d1527] border border-[#1e293b] rounded-md"
            title="Admin Dashboard"
          >
            <Lock size={18} />
          </button>
          
          <button
            onClick={onOpenInquire}
            className="px-3 py-1.5 rounded-sm font-mono-tech text-[11px] font-bold uppercase tracking-wider bg-[#cbd5e1] text-[#000613]"
          >
            Devis
          </button>

          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-white hover:bg-[#0d1527] rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14] border-b border-[#1e293b] px-6 py-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-3 font-mono-tech text-sm tracking-wider uppercase rounded transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#0a1329] text-[#cbd5e1] font-bold border border-[#cbd5e1]/30'
                    : 'text-slate-300 hover:bg-[#0d1527]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('admin')}
              className={`text-left py-2.5 px-3 font-mono-tech text-sm tracking-wider uppercase rounded flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-[#0d1527] text-slate-300 border border-[#1e293b]'
              }`}
            >
              <Lock size={16} />
              <span>Panneau Admin (🔐 Admin)</span>
            </button>

            <div className="pt-2 border-t border-[#1e293b]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquire();
                }}
                className="w-full text-[#000613] py-3 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest text-center bg-[#cbd5e1]"
              >
                Demander un Devis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
