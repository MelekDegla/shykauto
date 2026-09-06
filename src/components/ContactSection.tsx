import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, Send, MessageSquare, Clock } from 'lucide-react';
import { CONTACT_DATA } from '../data/content';
import { api } from '../services/api';
import { COLORS } from '../constants/theme';

interface ContactSectionProps {
  onOpenInquire: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquire }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    vehicleType: '',
    serviceType: 'Climatisation Automobile',
    message: '',
  });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    setSubmitting(true);
    const res = await api.sendContactMessage(formData);
    setSubmitting(false);

    if (res.success) {
      setFormSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        vehicleType: '',
        serviceType: 'Climatisation Automobile',
        message: '',
      });
      setTimeout(() => setFormSuccess(false), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#f4f5f7] text-[#0f172a] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <span className="font-mono-tech text-xs tracking-widest text-[#007aff] uppercase font-bold">
            CONTACT & DEMANDE DE DEVIS
          </span>
          <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl tracking-tight mt-1 text-[#0f172a]">
            Contactez <span className="text-[#007aff]">Shyk</span><span className="text-[#000]">Auto.</span>
          </h2>
          <p className="font-grotesk text-[#43474e] max-w-xl mt-2 text-base">
            Notre équipe technique est à votre écoute pour toute demande d'intervention, devis personnalisé ou conseil frigorifique.
          </p>
        </div>

        {/* Top Cards: Phone, Email, WhatsApp */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">

          {/* Card 1: Phone */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#000613] p-8 rounded-sm shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-[#007aff] mb-6 p-3 bg-[#f4f5f7] border border-[#e2e8f0] rounded w-fit">
                <Phone size={24} />
              </div>
              <div className="font-mono-tech text-xs tracking-wider text-[#64748b] font-bold uppercase mb-2">
                TÉLÉPHONE DIRECT
              </div>
              <a
                href={CONTACT_DATA.phone.href}
                className="font-montserrat font-bold text-2xl text-[#0f172a] hover:text-[#007aff] transition-colors block"
              >
                {CONTACT_DATA.phone.value}
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#64748b] flex items-center gap-1">
                <Clock size={12} />
                Lun - Sam : 08h-18h
              </span>
              <button
                onClick={() => handleCopy(CONTACT_DATA.phone.value, 'phone')}
                className="text-xs font-mono-tech text-[#007aff] flex items-center gap-1 font-bold"
              >
                {copiedKey === 'phone' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedKey === 'phone' ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#007aff] p-8 rounded-sm shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-[#007aff] mb-6 p-3 bg-[#f4f5f7] border border-[#e2e8f0] rounded w-fit">
                <Mail size={24} />
              </div>
              <div className="font-mono-tech text-xs tracking-wider text-[#64748b] font-bold uppercase mb-2">
                COURRIEL TECHNIQUE
              </div>
              <a
                href={CONTACT_DATA.email.href}
                className="font-montserrat font-bold text-xl text-[#0f172a] hover:text-[#007aff] transition-colors block break-all"
              >
                {CONTACT_DATA.email.value}
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#64748b]">Réponse sous 2H</span>
              <button
                onClick={() => handleCopy(CONTACT_DATA.email.value, 'email')}
                className="text-xs font-mono-tech text-[#007aff] flex items-center gap-1 font-bold"
              >
                {copiedKey === 'email' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedKey === 'email' ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: WhatsApp Clickable */}
          <div className="bg-white border border-[#e2e8f0] hover:border-emerald-500 p-8 rounded-sm shadow-sm transition-all flex flex-col justify-between group">
            <div>
              <div className="text-emerald-600 mb-6 p-3 bg-[#f4f5f7] border border-[#e2e8f0] rounded w-fit">
                <MessageSquare size={24} />
              </div>
              <div className="font-mono-tech text-xs tracking-wider text-[#64748b] font-bold uppercase mb-2">
                WHATSAPP DIRECT
              </div>
              <a
                href="https://wa.me/21671000000?text=Bonjour%20ShykAuto,%20je%20souhaite%20un%20devis"
                target="_blank"
                rel="noreferrer"
                className="font-montserrat font-bold text-2xl text-emerald-600 hover:underline block"
              >
                Discuter sur WhatsApp
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
              <span className="font-mono-tech text-xs text-[#64748b]">Support 7j/7</span>
              <a
                href="https://wa.me/21671000000"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono-tech text-emerald-600 font-bold hover:underline"
              >
                Ouvrir WhatsApp →
              </a>
            </div>
          </div>

        </div>

        {/* Main Grid: Contact Form + Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-sm border border-[#e2e8f0] shadow-sm">
            <h3 className="font-montserrat font-extrabold text-2xl text-[#0f172a] mb-2">
              Envoyer un Message / Demande de Devis
            </h3>
            <p className="font-grotesk text-[#43474e] text-sm mb-8">
              Remplissez les informations ci-dessous, notre équipe vous répondra dans les plus brefs délais.
            </p>

            {formSuccess && (
              <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded font-grotesk text-sm flex items-center gap-2">
                <Check size={20} className="text-emerald-400" />
                <span>Votre message a été transmis avec succès à notre équipe !</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-grotesk">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sami Ben Ali"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@societe.tn"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="+216 98 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613] font-mono-tech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                    Entreprise / Société
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de la société"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                    Type de Véhicule
                  </label>
                  <input
                    type="text"
                    placeholder="ex. Renault Master / Peugeot Partner"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                    Service Souhaité
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] focus:outline-none focus:border-[#000613]"
                  >
                    <option value="Climatisation Automobile">Climatisation Automobile</option>
                    <option value="Installation Frigorifique">Installation Frigorifique Utilitaires</option>
                    <option value="Transformation Isotherme">Transformation Cabine Isotherme</option>
                    <option value="Maintenance & Dépannage">Maintenance & Dépannage Rapide</option>
                    <option value="Achat de Pièces">Achat de Pièces & Équipements</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech font-bold uppercase text-[#43474e] mb-1">
                  Message / Détails de votre demande *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre besoin technique, le volume de caisse, la température requise (+4°C ou -20°C)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#f4f5f7] border border-[#e2e8f0] p-3 rounded text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#000613]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#000613] hover:bg-[#001f3f] text-white font-mono-tech text-xs font-bold uppercase tracking-widest rounded shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>{submitting ? 'Envoi en cours...' : 'Envoyer la Demande de Devis'}</span>
              </button>
            </form>
          </div>

          {/* Location & Google Maps (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white border border-[#e2e8f0] p-8 rounded-sm text-[#0f172a] shadow-sm">
              <div className="flex items-center gap-2 text-[#007aff] font-mono-tech text-xs uppercase font-bold mb-3">
                <MapPin size={16} />
                <span>NOTRE ATELIER ET SIÈGE SOCIAL</span>
              </div>
              <h4 className="font-montserrat font-bold text-xl text-[#0f172a] mb-2">
                Zone Industrielle, Tunis, Tunisie
              </h4>
              <p className="font-grotesk text-[#43474e] text-sm leading-relaxed mb-4">
                Nos ateliers sont équipés de bancs d'essai thermiques numériques et de stations de charge pour une prise en charge rapide de vos véhicules.
              </p>
              <div className="font-mono-tech text-xs text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
                Coordonnées GPS: 36.8065° N, 10.1815° E
              </div>
            </div>

            {/* Google Maps Iframe */}
            <div className="rounded-sm overflow-hidden border border-[#e2e8f0] shadow-sm h-[340px] bg-[#f4f5f7]">
              <iframe
                title="ShykAuto Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102237.49168925828!2d10.1118128!3d36.8065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
