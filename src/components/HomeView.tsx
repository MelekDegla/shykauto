import React, { useEffect, useState } from 'react';
import { HeroSection } from './HeroSection';
import { EngagementsSection } from './EngagementsSection';
import { ActiveTab, ProductItem } from '../types';
import { api } from '../services/api';
import { COLORS } from '../constants/theme';
import { ImageCarousel } from './ImageCarousel';
import {
  Wind, Snowflake, ShieldCheck, Wrench, ArrowRight,
  Package, CheckCircle2, ChevronRight, Phone, Truck, Car, Layers, Settings, Cpu, HardHat
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
      icon: <Wind size={26} className="text-[#cbd5e1]" />,
      shortDesc: 'Installation, entretien et intervention sur les systèmes de climatisation automobile pour véhicules légers et utilitaires.',
    },
    {
      id: 'frigo',
      number: '02',
      title: 'RÉFRIGÉRATION EMBARQUÉE',
      icon: <Snowflake size={26} className="text-sky-400" />,
      shortDesc: 'Installation de groupes frigorifiques pour véhicules équipés de cabines ou caisses isothermes, avec des solutions adaptées au froid positif ou négatif.',
    },
    {
      id: 'freezing',
      number: '03',
      title: 'CONGÉLATION',
      icon: <Snowflake size={26} className="text-[#cbd5e1]" />,
      shortDesc: 'Solutions frigorifiques destinées aux applications nécessitant des températures négatives, avec des équipements pouvant atteindre environ -20 °C selon les modèles.',
    },
    {
      id: 'chauffage',
      number: '04',
      title: 'CHAUFFAGE AUXILIAIRE',
      icon: <Cpu size={26} className="text-orange-400" />,
      shortDesc: 'Solutions de chauffage auxiliaire pour les véhicules, distribuées avec le savoir-faire WEBASTO.',
    },
    {
      id: 'parts',
      number: '05',
      title: 'PIÈCES & ÉQUIPEMENTS',
      icon: <Package size={26} className="text-[#cbd5e1]" />,
      shortDesc: 'Pièces de rechange et équipements pour les systèmes de climatisation et de réfrigération, disponibles en stock ou sur commande selon les besoins.',
    },
    {
      id: 'installation',
      number: '06',
      title: 'INSTALLATION & MISE EN SERVICE',
      icon: <Settings size={26} className="text-emerald-400" />,
      shortDesc: 'Étude du besoin, installation des équipements, mise en service et service après-vente.',
    },
    {
      id: 'maintenance',
      number: '07',
      title: 'MAINTENANCE & INTERVENTION',
      icon: <Wrench size={26} className="text-amber-400" />,
      shortDesc: 'Diagnostic, entretien préventif et intervention sur les équipements afin de préserver leur bon fonctionnement et prolonger leur durée de vie.',
    },
    {
      id: 'engins',
      number: '08',
      title: 'CLIMATISATION POUR ENGINS',
      icon: <HardHat size={26} className="text-yellow-400" />,
      shortDesc: 'Solutions de climatisation adaptées sur mesure pour les engins de chantier et équipements industriels — conception, installation et mise en service selon les contraintes spécifiques de chaque machine.',
    },
  ];


  const vehicleCategories = [
    {
      title: 'Véhicules légers',
      desc: 'Solutions de climatisation et équipements thermiques adaptés aux véhicules particuliers et utilitaires légers.',
      icon: <Car size={28} className="text-[#007aff]" />,
    },
    {
      title: 'Véhicules utilitaires',
      desc: 'Installation de systèmes frigorifiques et aménagement de cabines isothermes pour les besoins professionnels.',
      icon: <Truck size={28} className="text-sky-500" />,
    },
    {
      title: 'Poids lourds',
      desc: 'Solutions de réfrigération adaptées aux véhicules de transport de marchandises périssables et aux contraintes des installations de plus grande capacité.',
      icon: <Truck size={28} className="text-[#0f172a]" />,
    },
    {
      title: 'Groupe frigorifique',
      desc: 'Installation et entretien de groupes frigorifiques pour le maintien d\'une température contrôlée dans les caisses isothermes et les véhicules frigorifiques.',
      icon: <Snowflake size={28} className="text-emerald-500" />,
    },
  ];

  return (
    <div className="w-full bg-[#070b14] text-[#f8fafc]">
      {/* 1. Hero Section */}
      <HeroSection
        onOpenInquire={() => onOpenInquire()}
        onExploreServices={() => onNavigateTab('services')}
      />

      {/* 2. Présentation de ShykAuto (Qui Sommes-Nous / À propos) */}
      <section className="py-20 lg:py-28 border-b border-[#e2e8f0] bg-[#f4f5f7] text-[#0f172a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Présentation & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono-tech font-bold uppercase tracking-wider bg-white text-[#007aff] border border-[#e2e8f0] shadow-sm">
                <span>NOTRE HISTOIRE • DEPUIS 1985</span>
              </div>

              <h2 className="font-montserrat font-black text-3xl sm:text-5xl tracking-tight leading-tight text-[#0f172a]">
                Une expertise construite sur plus de <span className="text-[#007aff]">40 ans.</span>
              </h2>

              <p className="font-grotesk text-base sm:text-lg text-[#43474e] leading-relaxed">
                À une époque où la climatisation automobile était encore peu développée dans le Maghreb arabe, <strong className="text-[#0f172a]">DOUCAR</strong> s'est imposée en Tunisie comme le distributeur et installateur officiel en deuxième monte des systèmes de climatisation pour véhicules de la marque <strong className="text-[#0f172a]">DIAVIA</strong>.
              </p>

              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Pionnière dans ce domaine depuis 1985, DOUCAR n'a cessé de développer son savoir-faire afin d'améliorer la satisfaction de ses clients. Au fil des années, son expérience et sa croissance ont permis la naissance, en 2003, de <strong className="text-[#0f172a]">SHYK-AUTO</strong>, une filiale commerciale spécialisée dans la réfrigération des cabines isothermes pour véhicules.
              </p>

              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Aujourd'hui, SHYK-AUTO est le <strong className="text-[#0f172a]">représentant officiel de la marque WEBASTO</strong>. Nos techniciens sont formés pour intervenir sur différentes marques de véhicules avec un outillage adapté. Nous disposons, en stock ou sur commande, des pièces de rechange de qualité équivalente à l'origine, nécessaires à l'ensemble de nos interventions.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigateTab('about')}
                  className="px-6 py-3.5 rounded-sm text-xs font-mono-tech font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all duration-200 flex items-center gap-2"
                >
                  <span>Découvrir notre histoire</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-sm border border-[#e2e8f0] bg-white shadow-sm relative overflow-hidden">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007aff] via-sky-400 to-[#000613]" />

                <h3 className="font-montserrat font-bold text-xl text-[#0f172a] mb-6 flex items-center justify-between">
                  <span>REPÈRES CLÉS</span>
                </h3>

                <div className="grid grid-cols-1 gap-6">
                  <div className="border-b border-[#e2e8f0] pb-4">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">1985</div>
                    <div className="text-xs font-mono-tech text-[#007aff] font-bold uppercase tracking-wider mt-1">Fondation de DOUCAR</div>
                    <div className="text-xs font-grotesk text-[#43474e] mt-1">Pionnier de la climatisation automobile en Tunisie.</div>
                  </div>

                  <div className="border-b border-[#e2e8f0] pb-4">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">2003</div>
                    <div className="text-xs font-mono-tech text-[#007aff] font-bold uppercase tracking-wider mt-1">Naissance de SHYK AUTO</div>
                    <div className="text-xs font-grotesk text-[#43474e] mt-1">Filiale spécialisée dans la réfrigération des cabines isothermes.</div>
                  </div>

                  <div className="pt-2">
                    <div className="font-montserrat font-black text-3xl sm:text-4xl text-[#0f172a]">40+</div>
                    <div className="text-xs font-mono-tech text-[#0f172a] font-bold uppercase tracking-wider mt-1">Années d'expérience cumulée</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-3 text-xs text-[#43474e]">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span><strong className="text-[#0f172a]">ISO 9001</strong> — Équipements issus de marques dont la fabrication répond aux exigences ISO 9001.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#43474e]">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span><strong className="text-[#0f172a]">Conformité ATP</strong> — Groupes frigorifiques conformes ATP pour le transport de marchandises périssables.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Domaines d'Expertise (6 Services Cards) */}
      <section className="py-20 lg:py-28 border-b border-[#1e293b] bg-[#090f1d] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1]">
                NOS DOMAINES D'EXPERTISE
              </span>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight mt-1 text-white">
                Des solutions thermiques <span className="text-[#cbd5e1]">pour chaque besoin.</span>
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('services')}
              className="group inline-flex items-center gap-2 text-sm font-mono-tech font-bold uppercase tracking-wider text-slate-300 hover:text-[#cbd5e1] transition-colors"
            >
              <span>Découvrir nos services</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span>En savoir plus</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Section Types de Véhicules / Applications */}
      <section className="py-20 lg:py-28 border-b border-[#e2e8f0] bg-[#f4f5f7] text-[#0f172a] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono-tech text-xs tracking-widest text-[#007aff] uppercase font-bold">
              TYPES DE VÉHICULES
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight text-[#0f172a] mt-2">
              Des solutions adaptées à différents types de véhicules.
            </h2>
            <p className="font-grotesk text-sm sm:text-base text-[#43474e] mt-4 leading-relaxed">
              SHYK AUTO intervient sur différentes catégories de véhicules et propose des équipements adaptés à leurs besoins en climatisation et en réfrigération.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e2e8f0] hover:border-[#000613] p-8 rounded-sm transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-sm bg-[#faf9fc] border border-[#e2e8f0] flex items-center justify-center mb-6 group-hover:bg-[#000613] group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-[#0f172a] mb-3">
                    {cat.title}
                  </h3>
                  <p className="font-grotesk text-xs sm:text-sm text-[#43474e] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Partenaires / Marques */}
      <section className="py-16 border-b border-[#1e293b] bg-[#070b14] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center">
          <span className="font-mono-tech text-xs tracking-widest text-[#cbd5e1] uppercase font-bold block mb-2">
            MARQUES & ÉQUIPEMENTS DE RÉFÉRENCE
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 pt-4">
            <div className="text-center">
              <div className="font-montserrat font-black text-2xl sm:text-3xl text-white tracking-widest">
                WEBASTO
              </div>
              <div className="font-mono-tech text-[10px] text-[#cbd5e1]/70 tracking-widest uppercase mt-1">Représentant exclusif</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-black text-2xl sm:text-3xl text-slate-300 tracking-widest hover:text-white transition-colors">
                DIAVIA
              </div>
              <div className="font-mono-tech text-[10px] text-slate-500 tracking-widest uppercase mt-1">Partenaire historique</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-black text-2xl sm:text-3xl text-slate-300 tracking-widest hover:text-white transition-colors">
                SANDEN
              </div>
              <div className="font-mono-tech text-[10px] text-slate-500 tracking-widest uppercase mt-1">Équipementier</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-black text-2xl sm:text-3xl text-slate-300 tracking-widest hover:text-white transition-colors">
                DELPHI
              </div>
              <div className="font-mono-tech text-[10px] text-slate-500 tracking-widest uppercase mt-1">Équipementier</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-black text-2xl sm:text-3xl text-slate-300 tracking-widest hover:text-white transition-colors">
                SPAL
              </div>
              <div className="font-mono-tech text-[10px] text-slate-500 tracking-widest uppercase mt-1">Équipementier</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-black text-2xl sm:text-3xl text-slate-300 tracking-widest hover:text-white transition-colors">
                ELKE
              </div>
              <div className="font-mono-tech text-[10px] text-slate-500 tracking-widest uppercase mt-1">Équipementier</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Engagements Section */}
      <EngagementsSection />

      {/* 7. Produits en Vedette (ÉQUIPEMENTS & SOLUTIONS) */}
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
                Découvrez notre sélection d'équipements et de solutions dédiés au froid embarqué, à la climatisation et à l'aménagement des véhicules professionnels.
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
                  <ImageCarousel
                    images={Array.isArray(prod.images) ? prod.images : prod.images ? [prod.images] : []}
                    alt={prod.name}
                    aspectRatioClass="aspect-video sm:aspect-square w-full"
                    categoryBadge={prod.category}
                  />

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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 8. Call To Action (BESOIN D'UNE SOLUTION ? - Light Theme) */}
      <section className="py-20 lg:py-24 relative overflow-hidden bg-[#f4f5f7] text-[#0f172a] border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <span className="inline-block font-mono-tech text-xs tracking-[0.25em] text-[#007aff] uppercase font-bold mb-3 bg-white px-4 py-1.5 rounded border border-[#e2e8f0] shadow-sm">
            BESOIN D'UNE SOLUTION ?
          </span>
          <h2 className="font-montserrat font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase max-w-3xl mx-auto leading-tight text-[#0f172a]">
            Équipons votre véhicule <span className="text-[#007aff]">pour votre activité.</span>
          </h2>
          <p className="font-grotesk text-[#43474e] text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
            Vous souhaitez installer un groupe frigorifique, aménager un véhicule isotherme ou entretenir votre système de climatisation ? Parlez-nous de votre véhicule et de vos besoins. Notre équipe vous accompagne dans le choix d'une solution adaptée.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateTab('contact')}
              className="px-8 py-4 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <Phone size={15} />
              <span>Contacter SHYK AUTO</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
