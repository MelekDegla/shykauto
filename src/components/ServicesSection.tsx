import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../types';
import { api } from '../services/api';
import { Wind, Snowflake, ShieldCheck, Wrench, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { COLORS } from '../constants/theme';

interface ServicesSectionProps {
  onOpenInquire: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquire }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const data = await api.getServices();
    setServices(data);
    setLoading(false);
  };

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'wind':
        return <Wind size={28} className="text-[#cbd5e1]" />;
      case 'snowflake':
        return <Snowflake size={28} className="text-sky-400" />;
      case 'shield-check':
        return <ShieldCheck size={28} className="text-emerald-400" />;
      case 'wrench':
        return <Wrench size={28} className="text-amber-400" />;
      default:
        return <Snowflake size={28} className="text-[#cbd5e1]" />;
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-[#f4f5f7] text-[#0f172a] border-b border-[#e2e8f0]">


      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-[#007aff]">
              DOMAINES D'EXPERTISE TECHNIQUE
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight mt-1 text-[#0f172a]">
              Nos <span className="text-[#007aff]">Services Principaux.</span>
            </h2>
          </div>
          <p className="font-grotesk text-sm sm:text-base text-[#43474e] max-w-md">
            Des solutions clés en main d'ingénierie frigorifique et de climatisation pour particuliers, professionnels et gestionnaires de flottes.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="py-20 text-center font-mono-tech text-slate-500 animate-pulse">
            Chargement des services...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#e2e8f0] hover:border-[#000613] rounded-sm overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between group hover:shadow-xl"
              >
                <div>
                  {/* Service Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={service.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded border border-[#e2e8f0] shadow-md">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8">
                    <h3 className="font-montserrat font-extrabold text-2xl text-[#0f172a] mb-3 group-hover:text-[#007aff] transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-grotesk text-[#43474e] text-sm leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Features List */}
                    {service.features && Array.isArray(service.features) && (
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feat: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 font-grotesk text-xs text-[#43474e]">
                            <CheckCircle2 size={16} className="text-[#007aff] flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-8 pb-8 pt-2 flex items-center gap-4">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 py-3 px-4 rounded bg-[#f4f5f7] hover:bg-[#e2e8f0] text-[#43474e] hover:text-[#0f172a] border border-[#e2e8f0] font-mono-tech text-xs font-bold uppercase transition-all text-center"
                  >
                    Détails Complète
                  </button>
                  <button
                    onClick={() => onOpenInquire(service.title)}
                    className="flex-1 py-3 px-4 rounded bg-[#000613] hover:bg-[#001f3f] text-white font-mono-tech text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-sm"
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

      {/* Detailed Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0d1527] border border-[#cbd5e1]/40 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white relative shadow-2xl">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xl font-bold"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#070b14] rounded border border-slate-700">
                {getServiceIcon(selectedService.icon)}
              </div>
              <div>
                <span className="font-mono-tech text-xs text-[#cbd5e1] uppercase tracking-widest font-bold">
                  SERVICE TECHNIQUE CERTIFIÉ
                </span>
                <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="my-6 h-64 w-full rounded overflow-hidden border border-slate-800">
              <img
                src={selectedService.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="font-montserrat font-bold text-lg text-white mb-2">Description Détaillée</h4>
            <p className="font-grotesk text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">
              {selectedService.fullDescription}
            </p>

            <h4 className="font-montserrat font-bold text-lg text-white mb-3">Prestations & Garanties Incluses</h4>
            {selectedService.features && Array.isArray(selectedService.features) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 bg-[#070b14] p-4 rounded border border-slate-800">
                {selectedService.features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 font-grotesk text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-[#cbd5e1] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 rounded bg-[#16233f] hover:bg-[#1e2f55] text-slate-300 font-mono-tech text-xs font-bold uppercase"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onOpenInquire(title);
                }}
                className="px-6 py-2.5 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech text-xs font-bold uppercase shadow-lg flex items-center gap-2"
              >
                <span>Demander un Devis pour ce Service</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
