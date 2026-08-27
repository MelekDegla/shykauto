import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';

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
    { id: 'heritage', label: 'Heritage' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Scroll to relevant section if on home view
    const sectionElement = document.getElementById(tab);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf9fc]/90 backdrop-blur-md border-b border-[#e2e8f0]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <span className="font-montserrat font-extrabold text-2xl sm:text-3xl tracking-tight text-[#000613] group-hover:text-[#007aff] transition-colors">
            SHYK AUTO
          </span>
          <span className="hidden lg:inline-block font-mono-tech text-[10px] font-semibold tracking-widest text-[#00e3fd] bg-[#001122] px-2 py-0.5 rounded">
            EST. 1985
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 font-mono-tech text-xs tracking-widest uppercase transition-colors duration-200 focus:outline-none ${
                  isActive
                    ? 'text-[#007aff] font-bold'
                    : 'text-[#43474e] hover:text-[#000613]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00e3fd] animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-inquire-btn"
            onClick={onOpenInquire}
            className="group relative overflow-hidden bg-[#000613] hover:bg-[#001f3f] text-white px-7 py-2.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#00e3fd] border border-transparent flex items-center gap-2"
          >
            <span>Inquire</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e3fd] group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenInquire}
            className="bg-[#000613] text-white px-3.5 py-1.5 rounded-sm font-mono-tech text-[11px] font-bold uppercase tracking-wider"
          >
            Inquire
          </button>
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-[#000613] hover:bg-[#efedf0] rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9fc] border-b border-[#e2e8f0] px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 font-mono-tech text-sm tracking-wider uppercase rounded ${
                  activeTab === item.id
                    ? 'bg-[#001122] text-[#00e3fd] font-bold'
                    : 'text-[#1a1c1e] hover:bg-[#efedf0]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#e2e8f0]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquire();
                }}
                className="w-full bg-[#000613] text-white py-3 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest text-center"
              >
                Demander un Devis / Inquire
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
