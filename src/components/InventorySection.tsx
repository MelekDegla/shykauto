import { ArrowRight, Check, Package, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ProductItem } from '../types';
import { COLORS } from '../constants/theme';

interface InventorySectionProps {
  onSelectItemForQuote: (item: any) => void;
}

export const InventorySection: React.FC<InventorySectionProps> = ({ onSelectItemForQuote }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
    { id: 'all', label: 'Tous les Produits' },
    { id: 'Pièces de climatisation auto', label: 'Pièces Climatisation Auto' },
    { id: 'Kits frigorifiques', label: 'Kits Frigorifiques' },
    { id: 'Matériel pour cabines isothermes', label: 'Cabines Isothermes' },
    { id: 'Accessoires véhicules', label: 'Accessoires Véhicules' },
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
              <span>CATALOGUE PIÈCES & EQUIPEMENTS</span>
            </div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight text-[#0f172a]">
              Nos <span className="text-[#007aff]">Produits.</span>
            </h2>
          </div>
          <p className="font-grotesk text-sm sm:text-base text-[#43474e] max-w-md">
            Pièces d'origine certifiées, groupes frigorifiques et accessoires pour climatisation automobile et transport isotherme.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
          </div>

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
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono-tech text-[10px] font-bold px-2.5 py-1 rounded bg-[#070b14]/90 text-[#cbd5e1] uppercase border border-[#cbd5e1]/30">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`font-mono-tech text-[10px] font-bold px-2.5 py-1 rounded shadow ${
                        item.availability === 'IN_STOCK'
                          ? 'bg-emerald-500 text-slate-950'
                          : item.availability === 'ON_REQUEST'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-rose-500 text-white'
                      }`}>
                        {item.availability === 'IN_STOCK' ? 'EN STOCK' : item.availability === 'ON_REQUEST' ? 'SUR COMMANDE' : 'RUPTURE'}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-montserrat font-bold text-xl text-[#0f172a] mb-2 group-hover:text-[#007aff] transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-grotesk text-[#43474e] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Specs if available */}
                    {item.specs && typeof item.specs === 'object' && (
                      <div className="mb-4 p-3 bg-[#f4f5f7] rounded border border-[#e2e8f0] space-y-1">
                        {Object.entries(item.specs).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex justify-between text-[11px] font-mono-tech">
                            <span className="text-[#64748b]">{key}:</span>
                            <span className="text-[#0f172a] font-semibold">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="p-6 pt-0 border-t border-[#e2e8f0] mt-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono-tech text-[10px] uppercase text-[#64748b] block">Prix Indicatif</span>
                    <span className="font-montserrat font-black text-xl text-[#007aff]">
                      {item.price ? `${item.price.toLocaleString()} TND` : 'Sur Devis'}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectItemForQuote(item)}
                    className="px-4 py-2.5 rounded bg-[#000613] hover:bg-[#001f3f] text-white font-mono-tech text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Devis</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
