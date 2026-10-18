import { ArrowRight, Check, Package, Search, Eye, Info, Sparkles, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ProductItem } from '../types';
import { COLORS } from '../constants/theme';
import { ImageCarousel } from './ImageCarousel';

interface InventorySectionProps {
  onSelectItemForQuote: (item: any) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({ onSelectItemForQuote }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedProduct) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const categories = [
    { id: 'all', label: 'Tous les Équipements' },
    { id: 'Groupes frigorifiques', label: 'Groupes Frigorifiques' },
    { id: 'Systèmes de climatisation', label: 'Systèmes de Climatisation' },
    { id: 'Équipements de réfrigération', label: 'Équipements de Réfrigération' },
    { id: 'Pièces & accessoires', label: 'Pièces & Accessoires' },
  ];

  const filteredProducts = products.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-24 lg:py-32 border-b border-[#e2e8f0] bg-[#f4f5f7] text-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest uppercase font-bold mb-2 text-[#007aff]">
              <Package size={16} />
              <span>ÉQUIPEMENTS & SOLUTIONS</span>
            </div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight text-[#0f172a]">
              Les équipements <span className="text-[#007aff]">adaptés à vos besoins.</span>
            </h2>
          </div>
          <p className="font-grotesk text-sm sm:text-base text-[#43474e] max-w-md">
            Découvrez notre sélection d’équipements et de solutions dédiés au froid embarqué, à la climatisation et à l’aménagement des véhicules professionnels.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          {/**<div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-sm font-mono-tech text-xs font-bold tracking-wider uppercase transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#000613] text-white shadow-md'
                    : 'bg-white border border-[#e2e8f0] text-[#43474e] hover:text-[#000613] hover:border-[#000613]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>*/}

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#e2e8f0] rounded font-grotesk text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613]"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20 text-center font-mono-tech text-[#43474e] animate-pulse">
            Chargement du catalogue produits...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-[#43474e] font-mono-tech">
            Aucun produit ne correspond à votre recherche.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#e2e8f0] hover:border-[#000613] rounded-sm overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Image Carousel */}
                  <ImageCarousel
                    images={Array.isArray(item.images) ? item.images : item.images ? [item.images] : []}
                    alt={item.name}
                    aspectRatioClass="h-64 w-full"
                    categoryBadge={item.category}
                    statusBadge={
                      <span className={`font-mono-tech text-[10px] font-bold px-2.5 py-1 rounded shadow ${item.availability === 'IN_STOCK'
                          ? 'bg-emerald-500 text-slate-950'
                          : item.availability === 'ON_REQUEST'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-rose-500 text-white'
                        }`}>
                        {item.availability === 'IN_STOCK' ? 'EN STOCK' : item.availability === 'ON_REQUEST' ? 'SUR COMMANDE' : 'RUPTURE'}
                      </span>
                    }
                  />

                  {/* Info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3
                      onClick={() => setSelectedProduct(item)}
                      className="font-montserrat font-bold text-xl text-[#0f172a] mb-2 hover:text-[#007aff] cursor-pointer transition-colors"
                      title="Cliquez pour voir les détails"
                    >
                      {item.name}
                    </h3>
                    <p className="font-grotesk text-[#43474e] text-xs sm:text-sm leading-relaxed mb-1 line-clamp-2">
                      {item.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(item)}
                      className="text-[11px] font-mono-tech text-[#007aff] hover:underline font-bold mb-4 self-start inline-flex items-center gap-1"
                    >
                      <span>Afficher la suite...</span>
                    </button>

                    {/* Specs preview if available */}
                    {item.specs && typeof item.specs === 'object' && Object.keys(item.specs).length > 0 && (
                      <div className="mb-4 p-3 bg-[#f4f5f7] rounded border border-[#e2e8f0] space-y-1.5 mt-auto">
                        {Object.entries(item.specs).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex justify-between items-center text-[11px] font-mono-tech gap-2">
                            <span className="text-[#64748b] truncate">{key}:</span>
                            <span className="text-[#0f172a] font-semibold text-right truncate">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Price & Details Action */}
                <div className="p-6 pt-0 border-t border-[#e2e8f0] mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <span className="font-mono-tech text-[10px] uppercase text-[#64748b] block">Prix Indicatif</span>
                      <span className="font-montserrat font-black text-xl text-[#007aff]">
                        {item.price ? `${item.price.toLocaleString()} TND` : 'Sur Devis'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(item)}
                    className="w-full py-2.5 rounded-sm bg-[#000613] hover:bg-[#001f3f] text-white font-mono-tech text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    <Eye size={15} />
                    <span>Voir Détails Complets</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Full Details Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#0d1527] border border-[#cbd5e1]/40 rounded-sm max-w-3xl w-full max-h-[92vh] flex flex-col text-white relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0 bg-[#0d1527] z-20">
              <div className="flex items-center gap-2">
                <span className="font-mono-tech text-xs text-[#007aff] font-bold uppercase tracking-wider bg-[#007aff]/10 border border-[#007aff]/30 px-2.5 py-0.5 rounded">
                  {selectedProduct.category}
                </span>
                <span className={`font-mono-tech text-[10px] font-bold px-2 py-0.5 rounded ${selectedProduct.availability === 'IN_STOCK'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : selectedProduct.availability === 'ON_REQUEST'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                  {selectedProduct.availability === 'IN_STOCK' ? 'EN STOCK' : selectedProduct.availability === 'ON_REQUEST' ? 'SUR COMMANDE' : 'RUPTURE'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 text-lg font-bold transition-colors"
                title="Fermer (Échap)"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Product Title */}
              <div>
                <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-white">
                  {selectedProduct.name}
                </h3>
              </div>

              {/* Multi-Photo Carousel with Thumbnails & Adaptive Fit */}
              <div className="rounded overflow-hidden border border-slate-800 bg-slate-950">
                <ImageCarousel
                  images={selectedProduct.images}
                  alt={selectedProduct.name}
                  aspectRatioClass="h-[280px] sm:h-[380px]"
                  showThumbnails={true}
                  fitMode="contain"
                />
              </div>

              {/* Complete Un-cut Description */}
              <div>
                <h4 className="font-mono-tech text-xs uppercase tracking-widest text-[#38bdf8] font-bold mb-2 flex items-center gap-2">
                  <Info size={14} />
                  <span>Description Détaillée du Produit</span>
                </h4>
                <p className="font-grotesk text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-900/80 p-4 rounded-sm border border-slate-800 shadow-inner">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Full Technical Specifications Grid */}
              {selectedProduct.specs && typeof selectedProduct.specs === 'object' && Object.keys(selectedProduct.specs).length > 0 && (
                <div>
                  <h4 className="font-mono-tech text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
                    <Sparkles size={14} />
                    <span>Spécifications & Données Techniques</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex flex-col justify-between p-3.5 bg-slate-900/90 rounded-sm border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <span className="font-mono-tech text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                          {key}
                        </span>
                        <span className="font-montserrat font-bold text-sm text-white">
                          {String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Certification Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#070b14] border border-[#1e293b] rounded-sm gap-4">
                <div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase block">Tarif & Disponibilité</span>
                  <span className="font-montserrat font-black text-2xl text-[#007aff]">
                    {selectedProduct.price ? `${selectedProduct.price.toLocaleString()} TND` : 'Sur Devis Personnalisé'}
                  </span>
                </div>
                <div className="text-xs font-mono-tech text-slate-400 flex flex-col gap-1">
                  <span>✓ Installation certifiée par techniciens frigoristes</span>
                  <span>✓ Garantie atelier SHYK AUTO Tunisie</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-800 bg-[#0d1527] flex justify-end gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-6 py-2.5 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech text-xs font-bold uppercase transition-colors shadow-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
