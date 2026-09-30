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
      number: '01',
      title: 'CLIMATISATION AUTOMOBILE',
      tagline: 'Confort et performance, toute l’année.',
      icon: <Wind size={26} className="text-[#cbd5e1]" />,
      shortDesc: 'Diagnostic, entretien et réparation des systèmes de climatisation automobile. Nous intervenons notamment sur les compresseurs, les circuits frigorifiques, la recherche de fuites et la recharge en fluide frigorigène.',
      badge: 'CLIMATISATION',
    },
    {
      id: 'frigo',
      number: '02',
      title: 'GROUPES FRIGORIFIQUES',
      tagline: 'Maîtrisez la température de vos marchandises.',
      icon: <Snowflake size={26} className="text-sky-400" />,
      shortDesc: 'Installation de systèmes de réfrigération pour véhicules utilitaires et professionnels. Nos solutions permettent de maintenir une température adaptée au transport de produits nécessitant des conditions thermiques contrôlées.',
      badge: 'FROID EMBARQUÉ',
    },
    {
      id: 'isotherme',
      number: '03',
      title: 'AMÉNAGEMENT ISOTHERME',
      tagline: 'Transformez votre véhicule en véritable outil professionnel.',
      icon: <ShieldCheck size={26} className="text-emerald-400" />,
      shortDesc: 'Aménagement et transformation de véhicules destinés au transport sous température contrôlée. Nous adaptons l’isolation et l’aménagement intérieur aux contraintes de votre activité et de votre véhicule.',
      badge: 'ISOTHERME',
    },
    {
      id: 'maintenance',
      number: '04',
      title: 'MAINTENANCE & DÉPANNAGE',
      tagline: 'Préservez la performance de vos équipements.',
      icon: <Wrench size={26} className="text-amber-400" />,
      shortDesc: 'Entretien préventif, diagnostic et réparation des systèmes frigorifiques et de climatisation. Notre objectif : réduire les immobilisations et assurer la disponibilité de vos véhicules.',
      badge: 'MAINTENANCE',
    },
  ];

  return (
    <div className="w-full bg-[#070b14] text-[#f8fafc]">
      {/* 1. Hero Section */}
      <HeroSection
        onOpenInquire={() => onOpenInquire()}
        onExploreServices={() => onNavigateTab('services')}
      />

      {/* 2. Présentation de ShykAuto (Qui Sommes-Nous) */}
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
                Une expertise de plus de <span className="text-[#007aff]">40 ans</span> dans le froid embarqué.
              </h2>

              <p className="font-grotesk text-base sm:text-lg text-[#43474e] leading-relaxed">
                Fondée en 1985 sous le nom de <strong className="text-[#0f172a]">Doucar</strong>, <strong className="text-[#0f172a]">SHYK AUTO</strong> accompagne depuis plus de quatre décennies les professionnels et les particuliers dans leurs besoins en froid et en climatisation automobile.
              </p>

              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Nous intervenons sur l’ensemble de la chaîne thermique du véhicule : installation de groupes frigorifiques, aménagement de véhicules isothermes, systèmes de climatisation automobile, maintenance et dépannage.
              </p>

              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Notre approche repose sur un savoir-faire technique reconnu, une écoute attentive des besoins de chaque client et des solutions adaptées à chaque type de véhicule et d’utilisation.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigateTab('about')}
                  className="px-6 py-3.5 rounded-sm text-xs font-mono-tech font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  <span>Découvrir notre histoire</span>
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

            {/* Right Column: Chiffres Clés */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-sm border border-[#e2e8f0] bg-white shadow-sm relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007aff] via-sky-400 to-[#000613]" />
                
                <h3 className="font-montserrat font-bold text-xl text-[#0f172a] mb-6 flex items-center justify-between">
                  <span>NOTRE EXPÉRIENCE EN QUELQUES CHIFFRES</span>
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="border-b border-[#e2e8f0] pb-4">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">40+</div>
                    <div className="text-xs font-mono-tech text-[#0f172a] font-bold uppercase tracking-wider mt-1">Années d’expérience</div>
                    <p className="text-xs text-slate-500 mt-1">Un savoir-faire développé depuis 1985.</p>
                  </div>

                  <div className="border-b border-[#e2e8f0] pb-4">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#007aff]">12 000+</div>
                    <div className="text-xs font-mono-tech text-[#0f172a] font-bold uppercase tracking-wider mt-1">Véhicules équipés</div>
                    <p className="text-xs text-slate-500 mt-1">Des véhicules particuliers, utilitaires et professionnels.</p>
                  </div>

                  <div className="pt-2">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">1985</div>
                    <div className="text-xs font-mono-tech text-[#0f172a] font-bold uppercase tracking-wider mt-1">Année de création</div>
                    <p className="text-xs text-slate-500 mt-1">Une histoire qui s’inscrit dans la durée.</p>
                  </div>

                  <div className="pt-2">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#007aff]">24/7</div>
                    <div className="text-xs font-mono-tech text-[#0f172a] font-bold uppercase tracking-wider mt-1">Assistance professionnelle</div>
                    <p className="text-xs text-slate-500 mt-1">Une solution d’accompagnement adaptée aux besoins des flottes.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e2e8f0] flex items-center gap-3 text-xs text-[#43474e]">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>Savoir-faire technique reconnu & écoute attentive de vos besoins.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Principaux (NOS SOLUTIONS) */}
      <section className="py-20 lg:py-28 border-b border-[#1e293b] bg-[#090f1d] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1]">
                NOS SOLUTIONS
              </span>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight mt-1 text-white">
                Des solutions thermiques <span className="text-[#cbd5e1]">adaptées à votre activité.</span>
              </h2>
              <p className="font-grotesk text-slate-300 text-sm sm:text-base max-w-2xl mt-3">
                De la climatisation automobile au froid embarqué, SHYK AUTO propose des solutions adaptées aux véhicules particuliers, utilitaires et professionnels.
              </p>
            </div>
            
            <button
              onClick={() => onNavigateTab('services')}
              className="group inline-flex items-center gap-2 text-sm font-mono-tech font-bold uppercase tracking-wider text-slate-300 hover:text-[#cbd5e1] transition-colors"
            >
              <span>Découvrir toutes nos solutions</span>
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
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded bg-[#070b14] border border-[#1e293b] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      {srv.icon}
                    </div>
                    <span className="font-mono-tech font-bold text-xs text-[#cbd5e1] bg-[#070b14] px-2 py-1 rounded border border-[#1e293b]">
                      {srv.number}
                    </span>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-white mb-1 group-hover:text-[#cbd5e1] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="font-grotesk text-xs text-[#cbd5e1] font-medium mb-3">
                    {srv.tagline}
                  </p>

                  <p className="font-grotesk text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onNavigateTab('services')}
                    className="text-xs font-mono-tech font-semibold text-slate-400 group-hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>En savoir plus</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() => onOpenInquire({ name: srv.title })}
                    className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#cbd5e1] hover:underline"
                  >
                    Étudier mon projet
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Engagements & Transparence (Light Section) */}
      <EngagementsSection />

      {/* 4. Produits en Vedette (ÉQUIPEMENTS & SOLUTIONS) */}
      <section className="py-20 lg:py-28 border-b border-[#1e293b] bg-[#070b14] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1] mb-2">
                <Package size={16} />
                <span>ÉQUIPEMENTS & SOLUTIONS</span>
              </div>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
                Les équipements <span className="text-[#cbd5e1]">adaptés à vos besoins.</span>
              </h2>
              <p className="font-grotesk text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
                Découvrez notre sélection d’équipements et de solutions dédiés au froid embarqué, à la climatisation et à l’aménagement des véhicules professionnels.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('products')}
              className="group inline-flex items-center gap-2 text-sm font-mono-tech font-bold uppercase tracking-wider text-slate-300 hover:text-[#cbd5e1] transition-colors"
            >
              <span>Voir toutes nos solutions</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Product Cards Preview */}
          {loadingProducts ? (
            <div className="py-16 text-center font-mono-tech text-slate-500">
              Chargement de nos équipements...
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
                        Demander un devis
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 5. Call To Action (BESOIN D’UNE SOLUTION ? - Light Theme) */}
      <section className="py-20 lg:py-24 relative overflow-hidden bg-[#f4f5f7] text-[#0f172a] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <span className="inline-block font-mono-tech text-xs tracking-[0.25em] text-[#007aff] uppercase font-bold mb-3 bg-white px-4 py-1.5 rounded border border-[#e2e8f0] shadow-sm">
            BESOIN D’UNE SOLUTION ?
          </span>
          <h2 className="font-montserrat font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase max-w-3xl mx-auto leading-tight text-[#0f172a]">
            Équipons votre véhicule <span className="text-[#007aff]">pour votre activité.</span>
          </h2>
          <p className="font-grotesk text-[#43474e] text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Vous souhaitez installer un groupe frigorifique, aménager un véhicule isotherme ou entretenir votre système de climatisation ? Parlez-nous de votre véhicule et de vos besoins. Notre équipe vous accompagne dans le choix d’une solution adaptée.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenInquire()}
              className="px-8 py-4 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <span>Demander un devis</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigateTab('contact')}
              className="px-8 py-4 rounded-sm font-mono-tech text-xs font-semibold uppercase tracking-widest bg-white hover:bg-[#fafbfc] border border-[#e2e8f0] hover:border-[#000613] text-[#0f172a] shadow-sm transition-colors flex items-center gap-2"
            >
              <Phone size={15} />
              <span>Contacter SHYK AUTO</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
