import React, { useState } from 'react';
import { INVENTORY_CATALOG } from '../data/content';
import { InventoryItem } from '../types';
import { Thermometer, Box, Zap, Shield, ArrowRight, Check } from 'lucide-react';

interface InventorySectionProps {
  onSelectItemForQuote: (item: InventoryItem) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({ onSelectItemForQuote }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Solutions' },
    { id: 'direct-drive', label: 'Entraînement Direct' },
    { id: 'electric-standby', label: 'Route & Secteur (Standby)' },
    { id: 'multi-temp', label: 'Bi-Température' },
    { id: 'ac-systems', label: 'Climatisation Véhicules' },
  ];

  const filteredItems = activeCategory === 'all'
    ? INVENTORY_CATALOG
    : INVENTORY_CATALOG.filter(item => item.category === activeCategory);

  return (
    <section id="inventory" className="py-24 lg:py-32 bg-[#faf9fc] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="font-mono-tech text-xs tracking-widest text-[#006875] uppercase font-bold mb-2">
              CATALOGUE SYSTÈMES FRIGORIFIQUES & CLIMATISATION
            </div>
            <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-[#000613] tracking-tight">
              Inventory & Solutions
            </h2>
          </div>
          <p className="font-grotesk text-sm sm:text-base text-[#43474e] max-w-md">
            Unités frigorifiques aérodynamiques certifiées ATP Classe A/B/C pour transport de denrées périssables et produits pharmaceutiques.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[#e2e8f0] mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm font-mono-tech text-xs font-bold tracking-wider uppercase transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#000613] text-[#00e3fd]'
                  : 'bg-white border border-[#e2e8f0] text-[#43474e] hover:border-[#000613]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e2e8f0] hover:border-[#007aff] rounded-sm overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono-tech text-[10px] font-bold bg-[#001122] text-[#00e3fd] px-2.5 py-1 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="font-mono-tech text-xs bg-white/95 text-[#000613] px-3 py-1 rounded font-bold shadow">
                      {item.modelCode}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-8">
                  <h3 className="font-montserrat font-bold text-2xl text-[#000613] tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="font-grotesk text-sm text-[#43474e] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 bg-[#faf9fc] border border-[#e2e8f0] rounded-sm font-mono-tech text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Puissance à 0°C</span>
                      <span className="font-bold text-[#000613]">{item.coolingCapacity0C}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Puissance à -20°C</span>
                      <span className="font-bold text-[#007aff]">{item.coolingCapacityMinus20C}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Volume Caisse</span>
                      <span className="font-bold text-[#000613]">{item.boxVolume}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Fluide Frigorifique</span>
                      <span className="font-bold text-[#000613]">{item.refrigerant}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-grotesk text-[#006875]">
                    <Check size={14} className="text-emerald-600" />
                    <span>{item.technology}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-8 pb-8 pt-2">
                <button
                  onClick={() => onSelectItemForQuote(item)}
                  className="w-full bg-[#000613] hover:bg-[#001f3f] text-white py-3 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group-hover:border-[#00e3fd] border border-transparent"
                >
                  <span>Configurer ce système & Devis</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
