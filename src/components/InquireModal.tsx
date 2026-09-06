import React, { useState } from 'react';
import { X, Check, ShieldCheck, ThermometerSnowflake, Send } from 'lucide-react';
import { api } from '../services/api';
import { COLORS } from '../constants/theme';

interface InquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: any | null;
}

export const InquireModal: React.FC<InquireModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    vehicleType: 'Fourgon utilitaire (ex. Boxer, Daily, Sprinter, Crafter)',
    temperatureTarget: 'Frais (+2°C / +4°C) - Produits frais, lait, viande',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = `SHYK-DEV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryCode(code);

    try {
      await api.sendContactMessage({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        companyName: form.companyName,
        vehicleType: form.vehicleType,
        serviceType: `Devis: ${selectedItem?.name || 'Étude Frigorifique'} (${form.temperatureTarget})`,
        message: `RÉF: ${code}\nVéhicule: ${form.vehicleType}\nTempérature: ${form.temperatureTarget}\nNotes: ${form.notes}`,
      });
    } catch {
      // acknowledged
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0d1527] border border-[#cbd5e1]/40 rounded-sm w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-white">
        
        {/* Top Header */}
        <div className="sticky top-0 z-10 px-6 sm:px-8 py-5 flex items-center justify-between border-b border-[#1e293b] bg-[#070b14]">
          <div>
            <div className="font-mono-tech text-[10px] uppercase tracking-widest font-bold">
              <span className="text-[#007aff]">SHYK</span> <span className="text-[#cbd5e1]">AUTO</span> <span className="text-slate-500">//</span> <span className="text-[#cbd5e1]">CONSULTATION TECHNIQUE & DEVIS</span>
            </div>
            <h3 className="font-montserrat font-bold text-xl text-white">
              Demande d'Ingénierie & Tarification
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 border-2 border-[#cbd5e1] rounded-full flex items-center justify-center mx-auto shadow-lg bg-[#070b14] text-[#cbd5e1] shadow-[#cbd5e1]/20">
                <Check size={32} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-montserrat font-extrabold text-2xl text-white">
                  Dossier Technique Enregistré
                </h4>
                <p className="font-grotesk text-slate-400 mt-2 text-base max-w-md mx-auto">
                  Votre demande a été transmise à notre chef d'atelier. Un devis chiffré vous sera adressé sous 2 heures ouvrées.
                </p>
              </div>

              <div className="p-4 bg-[#070b14] border border-[#1e293b] rounded-sm max-w-xs mx-auto font-mono-tech">
                <span className="text-xs text-slate-500 block">RÉFÉRENCE DOSSIER</span>
                <span className="text-lg font-bold text-[#cbd5e1]">{inquiryCode}</span>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider bg-[#cbd5e1] text-[#000613] hover:bg-[#e2e8f0]"
                >
                  Retour au site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Selected Item Notification if any */}
              {selectedItem && (
                <div className="p-3 bg-[#070b14] border border-[#cbd5e1]/30 rounded-sm flex items-center gap-3">
                  <ThermometerSnowflake className="text-[#cbd5e1]" size={20} />
                  <div className="text-xs">
                    <span className="font-bold text-slate-300">Système sélectionné : </span>
                    <span className="font-mono-tech text-[#cbd5e1] font-bold">{selectedItem.name}</span>
                  </div>
                </div>
              )}

              {/* Personal & Company details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Mohamed Ben Salem"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-[#070b14] border border-[#1e293b] text-white px-4 py-2.5 rounded-sm font-grotesk text-sm outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                <div>
                  <label className="block font-mono-tech text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Société / Flotte
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Agro-Logistique Tunis"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full bg-[#070b14] border border-[#1e293b] text-white px-4 py-2.5 rounded-sm font-grotesk text-sm outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                <div>
                  <label className="block font-mono-tech text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+216 -- --- ---"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#070b14] border border-[#1e293b] text-white px-4 py-2.5 rounded-sm font-mono-tech text-sm outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                <div>
                  <label className="block font-mono-tech text-xs font-bold uppercase text-slate-400 mb-1.5">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@entreprise.tn"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#070b14] border border-[#1e293b] text-white px-4 py-2.5 rounded-sm font-grotesk text-sm outline-none focus:border-[#cbd5e1]"
                  />
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="pt-2 border-t border-[#1e293b] space-y-4">
                <div className="font-mono-tech text-xs font-bold uppercase text-[#cbd5e1]">
                  SPÉCIFICATIONS DU VÉHICULE & BESOIN
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Type de Véhicule
                    </label>
                    <select
                      value={form.vehicleType}
                      onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                      className="w-full bg-[#070b14] border border-[#1e293b] text-white px-3 py-2.5 rounded-sm font-grotesk text-sm outline-none focus:border-[#cbd5e1]"
                    >
                      <option>Fourgonnette (ex. Partner, Berlingo, Kangoo)</option>
                      <option>Fourgon utilitaire (ex. Boxer, Daily, Sprinter, Crafter)</option>
                      <option>Camionnette châssis-cabine caisse isotherme</option>
                      <option>Porteur Poids-Lourd & Semi-remorque</option>
                      <option>Ambulance & Transport Médicalisé</option>
                      <option>Minibus & Transport de personnes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono-tech text-[11px] font-bold uppercase text-slate-400 mb-1">
                      Température Requise
                    </label>
                    <select
                      value={form.temperatureTarget}
                      onChange={(e) => setForm({ ...form, temperatureTarget: e.target.value })}
                      className="w-full bg-[#070b14] border border-[#1e293b] text-white px-3 py-2.5 rounded-sm font-grotesk text-sm outline-none focus:border-[#cbd5e1]"
                    >
                      <option>Frais (+2°C / +4°C) - Produits frais, lait, viande</option>
                      <option>Surgelé (-20°C) - Glaces, poissons congelés</option>
                      <option>Bi-température (Compartiment frais + compartiment surgelé)</option>
                      <option>Pharma certifié (+15°C à +25°C et +2°C à +8°C)</option>
                      <option>Climatisation habitacle / Minibus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-tech text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Description complémentaire ou demande spécifique
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Précisez la marque du véhicule, l'année, ou la panne constatée..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-[#070b14] border border-[#1e293b] text-white p-3 rounded-sm font-grotesk text-sm outline-none resize-none focus:border-[#cbd5e1]"
                  />
                </div>
              </div>

              {/* Form Submission Controls */}
              <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
                  <ShieldCheck size={16} className="text-[#cbd5e1]" />
                  <span>Devis gratuit sous 2h — Sans engagement</span>
                </div>

                <button
                  type="submit"
                  className="px-7 py-3 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] shadow-lg shadow-[#cbd5e1]/20 transition-all flex items-center gap-2"
                >
                  <Send size={14} />
                  <span>Transmettre la demande</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
