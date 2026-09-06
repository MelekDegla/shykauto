import React, { useState, useEffect } from 'react';
import { ActiveTab, InventoryItem } from './types';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesSection } from './components/ServicesSection';
import { InventorySection } from './components/InventorySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquireModal } from './components/InquireModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';

const TAB_TO_PATH: Record<ActiveTab, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  products: '/produits',
  projects: '/realisations',
  contact: '/contact',
  admin: '/admin',
};

function MainApp({ initialTab = 'home' }: { initialTab?: ActiveTab }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [isInquireModalOpen, setIsInquireModalOpen] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<InventoryItem | null>(null);
  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      const targetPath = TAB_TO_PATH[tab] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenInquire = (item?: any) => {
    if (item && typeof item === 'object') {
      setSelectedInventoryItem(item);
    } else {
      setSelectedInventoryItem(null);
    }
    setIsInquireModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-grotesk bg-[#070b14] text-[#f8fafc] selection:bg-[#cbd5e1] selection:text-[#000613]">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenInquire={() => handleOpenInquire()}
      />

      {/* Main Content Area - 5 Dedicated Pages + Admin */}
      <main className="flex-grow">
        {activeTab === 'admin' ? (
          <AdminDashboard />
        ) : activeTab === 'home' ? (
          <HomeView
            onOpenInquire={handleOpenInquire}
            onNavigateTab={handleTabChange}
          />
        ) : activeTab === 'about' ? (
          <AboutView
            onOpenInquire={() => handleOpenInquire()}
          />
        ) : activeTab === 'services' ? (
          <ServicesSection
            onOpenInquire={(title) => handleOpenInquire({ name: title })}
          />
        ) : activeTab === 'products' ? (
          <InventorySection
            onSelectItemForQuote={(item) => handleOpenInquire(item)}
          />
        ) : activeTab === 'projects' ? (
          <ProjectsSection
            onOpenInquire={(title) => handleOpenInquire({ name: title })}
          />
        ) : activeTab === 'contact' ? (
          <ContactSection
            onOpenInquire={() => handleOpenInquire()}
          />
        ) : (
          <HomeView
            onOpenInquire={handleOpenInquire}
            onNavigateTab={handleTabChange}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenInquire={() => handleOpenInquire()}
      />

      {/* Inquire & Quote Modal */}
      <InquireModal
        isOpen={isInquireModalOpen}
        onClose={() => setIsInquireModalOpen(false)}
        selectedItem={selectedInventoryItem}
      />
    </div>
  );
}

export default function App({ initialTab = 'home' }: { initialTab?: ActiveTab }) {
  return (
    <ThemeProvider>
      <MainApp initialTab={initialTab} />
    </ThemeProvider>
  );
}
