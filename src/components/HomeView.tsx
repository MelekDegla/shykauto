import React, { useEffect, useState } from 'react';
import { HeroSection } from './HeroSection';
import { EngagementsSection } from './EngagementsSection';
import { ActiveTab, ProductItem } from '../types';
import { api } from '../services/api';
import { COLORS } from '../constants/theme';
import {
  Wind, Snowflake, ShieldCheck, Wrench, ArrowRight,
  Package, CheckCircle2, ChevronRight, Phone
} from 'lucide-react';

interface HomeViewProps {
  onOpenInquire: (item?: any) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenInquire, onNavigateTab }) => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    loadFeatured();
  }, []);

  const loadFeatured = async () => {
    try {
      const all = await api.getProducts();
      const featured = all.filter((p) => p.featured).slice(0, 4);
      setFeaturedProducts(featured.length > 0 ? featured : all.slice(0, 4));
    } catch {
      // fallback handled in api service
    } finally {
      setLoadingProducts(false);
    }
  };

  const coreServices = [
    {
      id: 'clim',
      title: 'Climatisation Automobile',
      icon: <Wind size={26} className="text-[#cbd5e1]" />,
      shortDesc: 'Réparation de compresseurs, recherche de micro-fuites par azote et recharge gaz réfrigérant R134a / R1234yf.',
      badge: 'PARTICULIERS & PROS',
    },
    {
      id: 'frigo',
      title: 'Installation Frigorifique Utilitaires',
      icon: <Snowflake size={26} className="text-sky-400" />,
      shortDesc: 'Groupes froid positif (+4°C) et négatif (-20°C) à entraînement direct poulie-moteur et standby électrique 380V.',
      badge: 'NORMES ATP / FRC',
    },
    {
      id: 'isotherme',
      title: 'Transformation & Cabines Isothermes',
      icon: <ShieldCheck size={26} className="text-emerald-400" />,
      shortDesc: 'Aménagement sur-mesure de fourgons avec panneaux polyuréthane haute densité et parois étanches lavables.',
      badge: 'AGRÉÉ CONTACT ALIMENTAIRE',
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Dépannage Rapide',
      icon: <Wrench size={26} className="text-amber-400" />,
      shortDesc: 'Contrats de maintenance préventive pour flottes de distribution et atelier mobile d\'intervention d\'urgence.',
      badge: 'SERVICE 24/7 FLOTTES',
    },
  ];

  return (
    <div className="w-full bg-[#070b14] text-[#f8fafc]">
      {/* 1. Hero Section avec Slogan */}
      <HeroSection
        onOpenInquire={() => onOpenInquire()}
        onExploreServices={() => onNavigateTab('services')}
      />

      {/* 2. Présentation de ShykAuto (Light Theme Section) */}
      <section className="py-20 lg:py-28 border-b border-[#e2e8f0] bg-[#f4f5f7] text-[#0f172a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Présentation & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono-tech font-bold uppercase tracking-wider bg-white text-[#007aff] border border-[#e2e8f0] shadow-sm">
                <span>QUI SOMMES-NOUS ?</span>
                <span className="text-slate-400">•</span>
                <span>DEPUIS 1985</span>
              </div>

              <h2 className="font-montserrat font-black text-3xl sm:text-5xl tracking-tight leading-tight text-[#0f172a]">
                Pionnier du <span className="text-[#007aff]">Froid Embarqué</span> & de la Climatisation Automobile.
              </h2>

              <p className="font-grotesk text-base sm:text-lg text-[#43474e] leading-relaxed">
                Fondée en 1985 sous le nom historique de <strong className="text-[#0f172a]">Doucar</strong>, l'entreprise s'est réinventée sous l'enseigne <strong className="text-[#0f172a]">ShykAuto</strong> pour devenir le partenaire de référence des transporteurs, des professionnels de l'agroalimentaire, des laboratoires pharmaceutiques et des automobilistes exigeants en Tunisie.
              </p>

              {/* Contextual narrative paragraphs */}
              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Forts de nos 40 années d'expertise sur le terrain, nous intervenons avec rigueur sur l'ensemble de vos besoins thermiques : installation de groupes frigorifiques route et secteur, aménagement isotherme certifié aux normes ATP, et entretien de systèmes de climatisation toutes marques.
              </p>

              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Nous combinons un savoir-faire artisanal de plus de quatre décennies avec les dernières technologies de diagnostic thermodynamique assisté par ordinateur.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigateTab('about')}
                  className="px-6 py-3.5 rounded-sm text-xs font-mono-tech font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  <span>En savoir plus sur notre histoire</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => onOpenInquire()}
                  className="px-6 py-3.5 rounded-sm text-xs font-mono-tech font-semibold uppercase tracking-widest bg-white border border-[#e2e8f0] hover:border-[#000613] text-[#0f172a] shadow-sm transition-colors"
                >
                  Demander un devis
                </button>
              </div>
            </div>

            {/* Right Column: Key Metrics */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-sm border border-[#e2e8f0] bg-white shadow-sm relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007aff] via-sky-400 to-[#000613]" />
                
                <h3 className="font-montserrat font-bold text-xl text-[#0f172a] mb-6 flex items-center justify-between">
                  <span>Chiffres Clés & Engagements</span>
                  <span className="text-xs font-mono-tech text-[#007aff] bg-[#f4f5f7] px-2.5 py-0.5 rounded border border-[#e2e8f0]">SHYK-DATA</span>
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="border-b border-[#e2e8f0] pb-4">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">40+</div>
                    <div className="text-xs font-mono-tech text-[#64748b] uppercase tracking-wider mt-1">Ans d'Excellence</div>
                    <p className="text-xs text-slate-500 mt-1">Fondé en 1985 (Doucar)</p>
                  </div>

                  <div className="border-b border-[#e2e8f0] pb-4">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#007aff]">12k+</div>
                    <div className="text-xs font-mono-tech text-[#64748b] uppercase tracking-wider mt-1">Véhicules Équipés</div>
                    <p className="text-xs text-slate-500 mt-1">Tourisme, utilitaires & camions</p>
                  </div>

                  <div className="pt-2">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">100%</div>
                    <div className="text-xs font-mono-tech text-[#64748b] uppercase tracking-wider mt-1">Conformité ATP</div>
                    <p className="text-xs text-slate-500 mt-1">Classe FRC (-20°C) & FNA (+12°C)</p>
                  </div>

                  <div className="pt-2">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#007aff]">24/7</div>
                    <div className="text-xs font-mono-tech text-[#64748b] uppercase tracking-wider mt-1">Support Flotte</div>
                    <p className="text-xs text-slate-500 mt-1">Assistance mobile rapide</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex items-center gap-3 text-xs text-[#43474e]">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Agrément technique certifié & pièces garanties constructeur OEM.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Principaux (Cards) */}
      <section className="py-20 lg:py-28 border-b border-[#1e293b] bg-[#090f1d] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1]">
                SOLUTIONS TECHNIQUES VÉHICULES
              </span>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight mt-1 text-white">
                Services <span className="text-[#cbd5e1]">Principaux.</span>
              </h2>
            </div>
            
            <button
              onClick={() => onNavigateTab('services')}
              className="group inline-flex items-center gap-2 text-sm font-mono-tech font-bold uppercase tracking-wider text-slate-300 hover:text-[#cbd5e1] transition-colors"
            >
              <span>Voir les 4 services détaillés</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-sm border border-[#1e293b] bg-[#0d1527] hover:bg-[#111c34] hover:border-[#cbd5e1]/60 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#cbd5e1]/5"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-[#070b14] border border-[#1e293b] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>

                  <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-slate-400 bg-[#070b14] px-2 py-0.5 rounded border border-[#1e293b] inline-block mb-3">
                    {srv.badge}
                  </span>

                  <h3 className="font-montserrat font-bold text-lg text-white mb-3 group-hover:text-[#cbd5e1] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="font-grotesk text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onNavigateTab('services')}
                    className="text-xs font-mono-tech font-semibold text-slate-400 group-hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Détails</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() => onOpenInquire({ name: srv.title })}
                    className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#cbd5e1] hover:underline"
                  >
                    Devis
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Engagements & Transparence (Light Section) */}
      <EngagementsSection />

      {/* 4. Produits en Vedette (Featured Products) */}
      <section className="py-20 lg:py-28 border-b border-[#1e293b] bg-[#070b14] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1] mb-2">
                <Package size={16} />
                <span>ÉQUIPEMENTS & PIÈCES DÉTACHÉES</span>
              </div>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
                Produits en <span className="text-[#cbd5e1]">Vedette.</span>
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('products')}
              className="group inline-flex items-center gap-2 text-sm font-mono-tech font-bold uppercase tracking-wider text-slate-300 hover:text-[#cbd5e1] transition-colors"
            >
              <span>Accéder au catalogue complet</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Product Cards Preview */}
          {loadingProducts ? (
            <div className="py-16 text-center font-mono-tech text-slate-500">
              Chargement des pièces en vedette...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#0d1527] border border-[#1e293b] hover:border-[#cbd5e1]/60 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative aspect-video sm:aspect-square bg-slate-900 overflow-hidden">
                    <img
                      src={prod.images[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#070b14]/90 text-white text-[10px] font-mono-tech px-2 py-0.5 rounded tracking-widest uppercase border border-slate-700">
                        {prod.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-montserrat font-bold text-sm text-white group-hover:text-[#cbd5e1] transition-colors line-clamp-2">
                        {prod.name}
                      </h4>
                      <p className="font-grotesk text-xs text-slate-400 mt-2 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div className="font-mono-tech font-bold text-sm text-[#cbd5e1]">
                        {prod.price ? `${prod.price.toLocaleString()} TND` : 'Sur devis'}
                      </div>

                      <button
                        onClick={() => onOpenInquire(prod)}
                        className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-300 hover:text-white"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 5. Call To Action (Contact / Devis - Light Theme) */}
      <section className="py-20 lg:py-24 relative overflow-hidden bg-[#f4f5f7] text-[#0f172a] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <span className="inline-block font-mono-tech text-xs tracking-[0.25em] text-[#007aff] uppercase font-bold mb-3 bg-white px-4 py-1.5 rounded border border-[#e2e8f0] shadow-sm">
            ÉTUDE THERMIQUE & DEVIS IMMÉDIAT
          </span>
          <h2 className="font-montserrat font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase max-w-3xl mx-auto leading-tight text-[#0f172a]">
            Prêt à Équiper Votre <span className="text-[#007aff]">Flotte</span> ou Véhicule ?
          </h2>
          <p className="font-grotesk text-[#43474e] text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Nos techniciens certifiés analysent vos volumes de chargement, vos plages thermiques (-20°C à +15°C) et vous proposent la configuration frigorifique optimale sous 24h.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenInquire()}
              className="px-8 py-4 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <span>Demander un devis en ligne</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigateTab('contact')}
              className="px-8 py-4 rounded-sm font-mono-tech text-xs font-semibold uppercase tracking-widest bg-white hover:bg-[#fafbfc] border border-[#e2e8f0] hover:border-[#000613] text-[#0f172a] shadow-sm transition-colors flex items-center gap-2"
            >
              <Phone size={15} />
              <span>Contacter nos ingénieurs</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
