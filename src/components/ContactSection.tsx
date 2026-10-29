import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, MessageSquare, Clock, Building2, Printer, Smartphone, ExternalLink, Navigation } from 'lucide-react';
import { CONTACT_DATA } from '../data/content';

interface ContactSectionProps {
  onOpenInquire?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#f4f5f7] text-[#0f172a] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#007aff]/10 text-[#007aff] border border-[#007aff]/20 font-mono-tech text-xs uppercase font-bold tracking-widest mb-3">
            <Building2 size={14} />
            <span>RÉSEAU SHYK AUTO & CONTACTS</span>
          </div>
          <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl tracking-tight text-[#0f172a]">
            Nos <span className="text-[#007aff]">Implantations</span> & Contacts.
          </h2>
          <p className="font-grotesk text-[#43474e] max-w-2xl mt-3 text-base sm:text-lg leading-relaxed">
            Nos ateliers et comptoirs techniques vous accueillent pour tous vos besoins en climatisation automobile, équipement de véhicules frigorifiques et fourniture de pièces détachées.
          </p>
        </div>

        {/* Two Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* Location 1: Siège Social & Atelier Central (Ezzahra - Ben Arous) */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#000613] rounded-sm p-7 sm:p-9 shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#000613] text-white">
                  Siège Social & Atelier Central
                </span>
                <span className="font-mono-tech text-xs text-[#007aff] font-semibold flex items-center gap-1">
                  <Clock size={13} />
                  Lun - Ven : 08h - 18h
                </span>
              </div>

              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-[#0f172a] mb-2">
                SHYK AUTO
              </h3>
              <p className="font-grotesk text-sm text-[#43474e] mb-6 leading-relaxed">
                Centre technique spécialisé dans l'installation de groupes de froid, aménagement isotherme, maintenance et recharge de climatisation automobile.
              </p>

              {/* Details List */}
              <div className="space-y-4 pt-4 border-t border-[#e2e8f0]">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                      Adresse
                    </div>
                    <div className="font-grotesk font-semibold text-base text-[#0f172a]">
                      1 Rue Méditerranée, Ezzahra
                    </div>
                    <div className="font-grotesk text-xs text-[#64748b]">
                      2034 Ben Arous, Tunisie
                    </div>
                    <div className="font-mono-tech text-[11px] text-amber-600 mt-1">
                      GPS : 36.7386° N, 10.2913° E
                    </div>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                        Téléphones
                      </div>
                      <button
                        onClick={() => handleCopy('+216 99 321 543 / 20555593 / 56321570', 'phone-siege')}
                        className="text-xs font-mono-tech text-[#007aff] flex items-center gap-1 font-bold hover:underline"
                        title="Copier les numéros"
                      >
                        {copiedKey === 'phone-siege' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                        <span>{copiedKey === 'phone-siege' ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                    <div className="mt-1 space-y-1">
                      <div>
                        <a
                          href="tel:+21699321543"
                          className="font-montserrat font-bold text-lg text-[#0f172a] hover:text-[#007aff] transition-colors inline-block"
                        >
                          +216 99 321 543
                        </a>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-tech text-xs text-[#43474e]">
                        <a href="tel:+21620555593" className="hover:text-[#007aff] font-semibold transition-colors">
                          +216 20 555 593
                        </a>
                        <span>/</span>
                        <a href="tel:+21656321570" className="hover:text-[#007aff] font-semibold transition-colors">
                          +216 56 321 570
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                      Courriel
                    </div>
                    <a
                      href="mailto:soniadhoukar@shykauto.tn"
                      className="font-grotesk font-semibold text-sm text-[#0f172a] hover:text-[#007aff] transition-colors"
                    >
                      soniadhoukar@shykauto.tn
                    </a>
                  </div>
                </div>

                {/* WhatsApp Direct */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0 mt-0.5">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-emerald-700 font-bold">
                      WhatsApp Direct
                    </div>
                    <a
                      href="https://wa.me/21620555593?text=Bonjour%20ShykAuto,%20je%20souhaite%20une%20information"
                      target="_blank"
                      rel="noreferrer"
                      className="font-grotesk font-semibold text-sm text-emerald-600 hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>Discuter sur WhatsApp (+216 20 555 593)</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="mt-6 rounded-sm overflow-hidden border border-[#e2e8f0] shadow-sm h-[240px] bg-[#f4f5f7]">
                <iframe
                  title="SHYK AUTO Ezzahra"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0!2d10.2913369!3d36.7386235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4987297f33fd%3A0x112c9af1fb31c300!2sShyk%20Auto!5e0!3m2!1sfr!2stn!4v1700000000000!5m2!1sfr!2stn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
              <a
                href="https://maps.google.com/?q=Shyk+Auto+Ezzahra"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase font-bold text-[#007aff] hover:underline"
              >
                <Navigation size={14} />
                <span>Ouvrir l'itinéraire Google Maps</span>
              </a>
              <span className="font-mono-tech text-xs text-[#64748b]">Grand Tunis</span>
            </div>
          </div>

          {/* Location 2: Filiale Régionale (Hammam Sousse) */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#000613] rounded-sm p-7 sm:p-9 shadow-sm transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#007aff] text-white">
                  Filiale de SHYK AUTO
                </span>
                <span className="font-mono-tech text-xs text-[#007aff] font-semibold flex items-center gap-1">
                  <Clock size={13} />
                  Lun - Ven : 08h - 18h
                </span>
              </div>

              <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-[#0f172a] mb-1">
                AUTOCLIMDOUCAR
              </h3>
              <div className="font-mono-tech text-xs font-bold uppercase text-[#007aff] tracking-wider mb-2">
                Pièces et Accessoires Auto
              </div>
              <p className="font-grotesk text-sm text-[#43474e] mb-6 leading-relaxed">
                Comptoir de distribution de composants et accessoires de climatisation automobile (compresseurs, condenseurs, raccords, gaz) et support technique pour la région du Sahel.
              </p>

              {/* Details List */}
              <div className="space-y-4 pt-4 border-t border-[#e2e8f0]">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                      Adresse
                    </div>
                    <div className="font-grotesk font-semibold text-base text-[#0f172a]">
                      16, Route de Tunis
                    </div>
                    <div className="font-grotesk text-xs text-[#64748b]">
                      4011 - Hammam Sousse, Tunisie
                    </div>
                    <div className="font-mono-tech text-[11px] text-amber-600 mt-1">
                      GPS : 35.8654° N, 10.5910° E
                    </div>
                  </div>
                </div>

                {/* Telephone Fixe & Fax */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                      Téléphone Fixe & Fax
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono-tech text-[#64748b]">Tél. :</span>
                        <a
                          href="tel:+21673361817"
                          className="font-montserrat font-bold text-base text-[#0f172a] hover:text-[#007aff] transition-colors"
                        >
                          (+216) 73 361 817
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#64748b]">
                        <Printer size={13} />
                        <span>Fax : (+216) 73 361 518</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobiles */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <Smartphone size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                        Mobiles & Commercial
                      </div>
                      <button
                        onClick={() => handleCopy('(+216) 51 230 400 / (+216) 92 311 027', 'phone-sousse')}
                        className="text-xs font-mono-tech text-[#007aff] flex items-center gap-1 font-bold hover:underline"
                        title="Copier les numéros"
                      >
                        {copiedKey === 'phone-sousse' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                        <span>{copiedKey === 'phone-sousse' ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-tech text-sm">
                      <a
                        href="tel:+21651230400"
                        className="font-bold text-[#0f172a] hover:text-[#007aff] transition-colors"
                      >
                        (+216) 51 230 400
                      </a>
                      <span className="text-slate-400">/</span>
                      <a
                        href="tel:+21692311027"
                        className="font-bold text-[#0f172a] hover:text-[#007aff] transition-colors"
                      >
                        (+216) 92 311 027
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Commercial */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#007aff] shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#64748b] font-bold">
                      Courriel Commercial
                    </div>
                    <a
                      href="mailto:commercial@autoclimdoucar.com"
                      className="font-grotesk font-semibold text-sm text-[#0f172a] hover:text-[#007aff] transition-colors break-all"
                    >
                      commercial@autoclimdoucar.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp Direct Sousse */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0 mt-0.5">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono-tech text-[11px] uppercase tracking-wider text-emerald-700 font-bold">
                      WhatsApp Sousse
                    </div>
                    <a
                      href="https://wa.me/21651230400?text=Bonjour,%20je%20vous%20contacte%20concernant%20des%20pi%C3%A8ces%20auto"
                      target="_blank"
                      rel="noreferrer"
                      className="font-grotesk font-semibold text-sm text-emerald-600 hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>Contacter sur WhatsApp ((+216) 51 230 400)</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map embed Sousse (AUTOCLIMDOUCAR) */}
              <div className="mt-6 rounded-sm overflow-hidden border border-[#e2e8f0] shadow-sm h-[240px] bg-[#f4f5f7]">
                <iframe
                  title="AUTOCLIMDOUCAR Sousse"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.1352726356983!2d10.5884094!3d35.8653741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd346cbd84f477%3A0x8d2332db8b5ca45!2sDOUCAR%20CLIMATISATION%20AUTO!5e0!3m2!1sfr!2stn!4v1700000000000!5m2!1sfr!2stn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
              <a
                href="https://maps.app.goo.gl/4FMCBNB37aKPTUbu6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase font-bold text-[#007aff] hover:underline"
              >
                <Navigation size={14} />
                <span>Ouvrir l'itinéraire Google Maps</span>
              </a>
              <span className="font-mono-tech text-xs text-[#64748b]">Région Sahel</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
