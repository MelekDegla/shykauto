import React, { useState } from 'react';
import { ActiveTab, InventoryItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HeritageSection } from './components/HeritageSection';
import { TechnicalSection } from './components/TechnicalSection';
import { EngagementsSection } from './components/EngagementsSection';
import { InventorySection } from './components/InventorySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquireModal } from './components/InquireModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('services');
  const [isInquireModalOpen, setIsInquireModalOpen] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<InventoryItem | null>(null);

  const handleOpenInquire = (item?: InventoryItem) => {
    setSelectedInventoryItem(item || null);
    setIsInquireModalOpen(true);
  };

  const handleSelectItemForQuote = (item: InventoryItem) => {
    handleOpenInquire(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fc] text-[#1a1c1e] font-grotesk selection:bg-[#00e3fd] selection:text-[#000613]">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInquire={() => handleOpenInquire()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 1. Hero Section ("ARCHITECTS OF COLD.") */}
        <HeroSection
          onOpenInquire={() => handleOpenInquire()}
          onExploreServices={() => {
            setActiveTab('services');
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Our Heritage Section */}
        <HeritageSection />

        {/* 3. Equipe Technique (Precision Engineering & Technical Blueprint) */}
        <TechnicalSection />

        {/* 4. Nos Engagements (The Standards We Hold) */}
        <EngagementsSection />

        {/* 5. Inventory & Solutions Catalog */}
        <InventorySection onSelectItemForQuote={handleSelectItemForQuote} />

        {/* 6. Connect Section (Initiate Contact) */}
        <ContactSection onOpenInquire={() => handleOpenInquire()} />
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenInquire={() => handleOpenInquire()}
      />

      {/* Inquire & Quote Builder Modal */}
      <InquireModal
        isOpen={isInquireModalOpen}
        onClose={() => setIsInquireModalOpen(false)}
        selectedItem={selectedInventoryItem}
      />
    </div>
  );
}
