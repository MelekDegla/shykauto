import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { api } from '../services/api';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { Layers, Calendar, User, ArrowRight, Eye } from 'lucide-react';
import { COLORS } from '../constants/theme';

interface ProjectsSectionProps {
  onOpenInquire: (projectTitle?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenInquire }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await api.getProjects();
    setProjects(data);
    setLoading(false);
  };

  const categories = [
    { id: 'all', label: 'Toutes nos Réalisations' },
    { id: 'Fourgons transformés', label: 'Fourgons Transformés' },
    { id: 'Camions frigorifiques', label: 'Camions Frigorifiques' },
    { id: 'Installations clim auto', label: 'Climatisation Automobile' },
    { id: 'BEFORE_AFTER', label: 'Avant / Après 🔄' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'BEFORE_AFTER') return p.type === 'BEFORE_AFTER';
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#f4f5f7] text-[#0f172a] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e2e8f0]">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#007aff] uppercase font-semibold mb-3">
              <Layers size={16} />
              <span>GALERIE & PORTFOLIO TECH</span>
            </div>
            <h2 className="font-montserrat text-3xl sm:text-5xl font-black tracking-tight uppercase text-[#0f172a]">
              Nos <span className="text-[#007aff]">Réalisations.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-grotesk text-sm sm:text-base text-[#43474e] max-w-md">
            Découvrez nos transformations de véhicules utilitaires, cabines isothermes et installations frigorifiques de précision.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm font-mono-tech text-xs uppercase tracking-wider transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-[#000613] text-white font-bold border-[#000613] shadow-md'
                  : 'bg-white text-[#43474e] border-[#e2e8f0] hover:border-[#000613] hover:text-[#000613]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center font-mono-tech text-[#43474e] animate-pulse">
            Chargement de la galerie...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-[#43474e] font-mono-tech">
            Aucun projet trouvé dans cette catégorie.
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-sm overflow-hidden border border-[#e2e8f0] hover:border-[#000613] bg-white transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
              >
                {/* Media Container: Before/After Slider or Image Gallery */}
                <div className="p-4 bg-[#f4f5f7] border-b border-[#e2e8f0]">
                  {project.type === 'BEFORE_AFTER' && project.beforeImage && project.afterImage ? (
                    <BeforeAfterSlider
                      beforeImage={project.beforeImage}
                      afterImage={project.afterImage}
                    />
                  ) : (
                    <div className="relative h-[320px] sm:h-[400px] rounded overflow-hidden group">
                      <img
                        src={project.images?.[0] || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono-tech text-[#cbd5e1] border border-[#cbd5e1]/30 uppercase font-bold tracking-wider">
                        {project.category}
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[#64748b] mb-3">
                      {project.client && (
                        <span className="flex items-center gap-1.5 text-[#007aff] font-semibold">
                          <User size={14} />
                          {project.client}
                        </span>
                      )}
                      {project.date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {project.date}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-[#f4f5f7] border border-[#e2e8f0] text-[#0f172a] uppercase font-semibold">
                        {project.type === 'BEFORE_AFTER' ? 'Transformation Avant/Après' : 'Projet Clé en Main'}
                      </span>
                    </div>

                    <h3 className="font-montserrat font-bold text-xl sm:text-2xl mb-3 tracking-tight text-[#0f172a] group-hover:text-[#007aff] transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-grotesk text-sm sm:text-base text-[#43474e] line-clamp-3 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#007aff] font-bold uppercase hover:underline"
                    >
                      <Eye size={16} />
                      <span>Voir Détails</span>
                    </button>

                    <button
                      onClick={() => onOpenInquire(project.title)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#000613] hover:bg-[#001f3f] text-white font-mono-tech text-xs font-bold uppercase transition-all shadow-sm"
                    >
                      <span>Devis Similaire</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0d1527] border border-[#cbd5e1]/40 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 text-white relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <span className="font-mono-tech text-xs text-[#cbd5e1] uppercase tracking-widest font-semibold">
              {selectedProject.category} • {selectedProject.type}
            </span>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl my-3 text-white">
              {selectedProject.title}
            </h3>

            <div className="my-6">
              {selectedProject.type === 'BEFORE_AFTER' && selectedProject.beforeImage && selectedProject.afterImage ? (
                <BeforeAfterSlider
                  beforeImage={selectedProject.beforeImage}
                  afterImage={selectedProject.afterImage}
                />
              ) : (
                <img
                  src={selectedProject.images?.[0] || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80'}
                  alt={selectedProject.title}
                  className="w-full h-80 object-cover rounded border border-slate-800"
                />
              )}
            </div>

            <p className="font-grotesk text-slate-300 leading-relaxed mb-6 text-base">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 gap-4 bg-[#070b14] p-4 rounded border border-[#1e293b] font-mono-tech text-xs mb-6">
              <div>
                <span className="text-slate-500 uppercase block">Client:</span>
                <span className="text-white font-bold">{selectedProject.client || 'Client Professionnel'}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block">Date d'exécution:</span>
                <span className="text-white font-bold">{selectedProject.date || 'Récemment accompli'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded bg-[#16233f] hover:bg-[#1e2f55] text-slate-300 font-mono-tech text-xs font-bold uppercase"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenInquire(title);
                }}
                className="px-6 py-2.5 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech text-xs font-bold uppercase shadow-lg"
              >
                Demander un Devis Pour ce Projet
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
