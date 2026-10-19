import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ProductItem, ServiceItem, ProjectItem, MessageItem, AdminStats } from '../types';
import {
  Lock, LogOut, Package, Wrench, Layers, MessageSquare, BarChart3,
  Plus, Trash2, Edit3, Upload, Check, AlertCircle, RefreshCw, Eye,
  ChevronLeft, ChevronRight, Image as ImageIcon, Link as LinkIcon,
  ArrowUp, ArrowDown, Sparkles, Users, UserCircle, KeyRound, ShieldCheck, X
} from 'lucide-react';
import {
  getImageSourceInfo,
  detectImageSource,
  formatImageDisplay,
  fileToBase64,
  filesToBase64,
} from '../utils/imageUtils';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'stats' | 'products' | 'services' | 'projects' | 'messages' | 'users' | 'profile'>('stats');
  const [messagesSubTab, setMessagesSubTab] = useState<'devis' | 'contact'>('devis');

  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  // User management form
  const [userFormMode, setUserFormMode] = useState<'create' | 'edit' | null>(null);
  const [userFormData, setUserFormData] = useState({ name: '', email: '', password: '', role: 'ADMIN' });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userFormError, setUserFormError] = useState('');
  const [userFormSuccess, setUserFormSuccess] = useState('');

  // Profile form
  const [profileForm, setProfileForm] = useState({ name: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Modal / Form states
  const [uploading, setUploading] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'product' | 'service' | 'project' | 'messageView'>('product');
  const [newImageUrlInput, setNewImageUrlInput] = useState<string>('');
  const [previewSlideIndex, setPreviewSlideIndex] = useState<number>(0);

  // Theme is hardcoded to Dark Blueprint (centralized in theme.ts)

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('shyk_admin_token');
    if (token) {
      const res = await api.getAdminProfile();
      if (res.success) {
        setIsAuthenticated(true);
        loadAllAdminData();
      } else {
        localStorage.removeItem('shyk_admin_token');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      await api.loginAdmin(loginEmail, loginPassword);
      setIsAuthenticated(true);
      loadAllAdminData();
    } catch (err: any) {
      setLoginError(err.message || 'Échec de la connexion');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    api.logoutAdmin();
    setIsAuthenticated(false);
  };

  const loadAllAdminData = async () => {
    try {
      const [statsRes, prodData, servData, projData, msgRes, usersRes, profileRes] = await Promise.all([
        api.getStats().catch(() => null),
        api.getProducts().catch(() => []),
        api.getServices().catch(() => []),
        api.getProjects().catch(() => []),
        api.getMessages().catch(() => ({ success: false, data: [] })),
        api.getUsers().catch(() => ({ success: false, data: [] })),
        api.getProfile().catch(() => ({ success: false })),
      ]);

      if (statsRes?.success) setStats(statsRes.data);
      setProducts(prodData);
      setServices(servData);
      setProjects(projData);
      if (msgRes?.success) setMessages(msgRes.data);
      if (usersRes?.success) setUsers(usersRes.data);
      const pRes = profileRes as any;
      if (pRes?.success && pRes.user) {
        setCurrentUser(pRes.user);
        setProfileForm(f => ({ ...f, name: pRes.user.name || '', email: pRes.user.email || '' }));
      }
    } catch (e) {
      console.error('Error loading admin data:', e);
    }
  };

  // Upload file helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    try {
      const res = await api.uploadImage(e.target.files[0]);
      if (res.success && res.url) {
        callback(res.url);
      }
    } catch (err) {
      alert('Erreur lors du traitement de l\'image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleMultiFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const files = Array.from(e.target.files);
      const base64List = await filesToBase64(files);
      const current = Array.isArray(editingItem?.images) ? [...editingItem.images] : [];
      setEditingItem({
        ...editingItem,
        images: [...current, ...base64List],
      });
    } catch (err) {
      alert('Erreur lors du traitement des images');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrlInput.trim()) return;
    const current = Array.isArray(editingItem?.images) ? [...editingItem.images] : [];
    setEditingItem({
      ...editingItem,
      images: [...current, newImageUrlInput.trim()],
    });
    setNewImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    const current = Array.isArray(editingItem?.images) ? [...editingItem.images] : [];
    current.splice(index, 1);
    setEditingItem({
      ...editingItem,
      images: current,
    });
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const current = Array.isArray(editingItem?.images) ? [...editingItem.images] : [];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= current.length) return;
    const temp = current[index];
    current[index] = current[target];
    current[target] = temp;
    setEditingItem({
      ...editingItem,
      images: current,
    });
  };


  if (!isAuthenticated) {
    return (
      <section className="py-24 bg-slate-950 text-white min-h-[80vh] flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 sm:p-12 rounded-xl max-w-md w-full shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="font-montserrat font-extrabold text-2xl text-white">Administration 🔐</h2>
              <p className="font-mono-tech text-xs text-slate-400 uppercase">Panneau Sécurisé ShykAuto</p>
            </div>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono-tech rounded flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-grotesk">
            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase text-slate-400 mb-1">
                Adresse Email Admin
              </label>
              <input
                type="email"
                required
                placeholder="admin@shykauto.com"
                autoComplete="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white text-sm focus:outline-none focus:border-[#cbd5e1]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-tech font-bold uppercase text-slate-400 mb-1">
                Mot de Passe
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 p-3 rounded text-white text-sm focus:outline-none focus:border-[#cbd5e1]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-extrabold text-xs uppercase tracking-widest rounded shadow-lg transition-all"
            >
              {loginLoading ? 'Connexion en cours...' : 'Se Connecter'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <span className="font-mono-tech text-xs text-[#cbd5e1] font-bold uppercase tracking-widest">
              PANNEAU DE GESTION ADMINISTRATEUR
            </span>
            <h1 className="font-montserrat font-extrabold text-3xl text-white">
              <span className="text-[#007aff]">Shyk</span><span className="text-[#cbd5e1]">Auto</span> <span className="text-slate-400">Control Panel</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllAdminData}
              className="p-2.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              title="Rafraîchir les données"
            >
              <RefreshCw size={16} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 font-mono-tech text-xs font-bold uppercase"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {[
            { id: 'stats', label: 'Statistiques & Bilan', icon: BarChart3 },
            { id: 'products', label: `Produits (${products.length})`, icon: Package },
            { id: 'services', label: `Services (${services.length})`, icon: Wrench },
            { id: 'projects', label: `Réalisations (${projects.length})`, icon: Layers },
            { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare },
            { id: 'users', label: `Utilisateurs (${users.length})`, icon: Users },
            { id: 'profile', label: 'Mon Profil', icon: UserCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded font-mono-tech text-xs uppercase font-bold tracking-wider transition-all border ${
                  isActive
                    ? 'bg-[#cbd5e1] text-[#000613] border-[#cbd5e1] shadow-[0_0_15px_rgba(203,213,225,0.3)]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: STATS */}
        {adminTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <div className="text-slate-400 font-mono-tech text-xs uppercase">Produits au Catalogue</div>
                <div className="font-montserrat font-extrabold text-4xl text-[#cbd5e1] mt-2">
                  {stats?.products.total ?? products.length}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <div className="text-slate-400 font-mono-tech text-xs uppercase">Services Techniques</div>
                <div className="font-montserrat font-extrabold text-4xl text-sky-400 mt-2">
                  {stats?.services.total ?? services.length}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <div className="text-slate-400 font-mono-tech text-xs uppercase">Projets / Réalisations</div>
                <div className="font-montserrat font-extrabold text-4xl text-emerald-400 mt-2">
                  {stats?.projects.total ?? projects.length}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <div className="text-slate-400 font-mono-tech text-xs uppercase">Messages Non Lus</div>
                <div className="font-montserrat font-extrabold text-4xl text-amber-400 mt-2">
                  {stats?.messages.unread ?? messages.filter(m => m.status === 'NEW').length}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="font-montserrat font-bold text-xl text-white mb-4">Derniers Messages de Contact Reçus</h3>
              {messages.length === 0 ? (
                <p className="text-slate-500 font-mono-tech text-sm">Aucun message reçu pour le moment.</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="p-4 bg-slate-950 rounded border border-slate-800 flex justify-between items-center text-sm font-grotesk">
                      <div>
                        <span className="font-bold text-white">{msg.fullName}</span> ({msg.email})
                        <div className="text-slate-400 text-xs">{msg.serviceType} • {msg.vehicleType || 'N/C'}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-mono-tech font-bold ${
                        msg.status === 'NEW' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD */}
        {adminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-montserrat font-bold text-xl text-white">Gestion des Produits</h3>
              <button
                onClick={() => {
                  setEditingItem({ name: '', slug: '', category: 'Pièces de climatisation auto', description: '', price: 0, availability: 'IN_STOCK', images: [], specs: {} });
                  setModalType('product');
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold text-xs uppercase rounded shadow transition-colors"
              >
                <Plus size={16} />
                <span>Nouveau Produit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div key={prod.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 w-full mb-4 rounded overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                      <img
                        src={formatImageDisplay(prod.images?.[0])}
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 select-none pointer-events-none"
                      />
                      <img
                        src={formatImageDisplay(prod.images?.[0])}
                        alt={prod.name}
                        className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-2"
                      />
                      {Array.isArray(prod.images) && prod.images.length > 1 && (
                        <span className="absolute bottom-2 right-2 z-20 bg-black/80 backdrop-blur-sm text-sky-400 text-[10px] font-mono-tech px-2 py-0.5 rounded border border-white/20 flex items-center gap-1 font-bold">
                          <ImageIcon size={11} />
                          {prod.images.length} photos
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono-tech text-[#cbd5e1] uppercase font-bold">{prod.category}</span>
                    <h4 className="font-montserrat font-bold text-lg text-white my-1">{prod.name}</h4>
                    <p className="font-grotesk text-slate-400 text-xs line-clamp-2">{prod.description}</p>
                    {prod.price && <div className="text-emerald-400 font-mono-tech font-bold text-sm mt-2">{prod.price} TND</div>}
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-800 mt-4">
                    <button
                      onClick={() => {
                        setEditingItem(prod);
                        setModalType('product');
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Supprimer ce produit ?')) {
                          try {
                            await api.deleteProduct(prod.id);
                            loadAllAdminData();
                          } catch (err: any) {
                            alert('Erreur: ' + (err.message || 'Échec de la suppression'));
                          }
                        }
                      }}
                      className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES CRUD */}
        {adminTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-montserrat font-bold text-xl text-white">Gestion des Services</h3>
              <button
                onClick={() => {
                  setEditingItem({ title: '', slug: '', shortDescription: '', fullDescription: '', icon: 'snowflake', image: '', features: [] });
                  setModalType('service');
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold text-xs uppercase rounded shadow transition-colors"
              >
                <Plus size={16} />
                <span>Nouveau Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((serv) => (
                <div key={serv.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-montserrat font-bold text-lg text-white">{serv.title}</h4>
                    <p className="font-grotesk text-slate-400 text-xs mt-1">{serv.shortDescription}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingItem(serv);
                        setModalType('service');
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Supprimer ce service ?')) {
                          try {
                            await api.deleteService(serv.id);
                            loadAllAdminData();
                          } catch (err: any) {
                            alert('Erreur: ' + (err.message || 'Échec de la suppression'));
                          }
                        }
                      }}
                      className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS / REALISATIONS CRUD */}
        {adminTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-montserrat font-bold text-xl text-white">Gestion des Réalisations & Projets</h3>
                <p className="text-xs font-mono-tech text-slate-400 mt-0.5">
                  Prend en charge les formats : Avant / Après, Carrousel dynamique & Galerie
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingItem({
                    title: '',
                    slug: '',
                    category: 'Fourgons transformés',
                    type: 'CAROUSEL',
                    description: '',
                    client: '',
                    beforeImage: '',
                    afterImage: '',
                    images: [],
                    date: new Date().toISOString().slice(0, 7),
                    featured: true,
                  });
                  setNewImageUrlInput('');
                  setPreviewSlideIndex(0);
                  setModalType('project');
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold text-xs uppercase rounded shadow transition-colors"
              >
                <Plus size={16} />
                <span>Nouvelle Réalisation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => {
                const isBeforeAfter = proj.type === 'BEFORE_AFTER';
                const isCarousel = proj.type === 'CAROUSEL' || (Array.isArray(proj.images) && proj.images.length > 1);
                const thumbImage = isBeforeAfter
                  ? proj.afterImage || proj.beforeImage
                  : proj.images?.[0];

                return (
                  <div
                    key={proj.id}
                    className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[10px] font-mono-tech uppercase font-bold px-2 py-0.5 rounded border ${
                            isBeforeAfter
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : isCarousel
                              ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {isBeforeAfter
                            ? 'AVANT / APRÈS'
                            : isCarousel
                            ? `CARROUSEL (${proj.images?.length || 0})`
                            : 'SIMPLE'}{' '}
                          • {proj.category}
                        </span>

                        {thumbImage && (
                          <span
                            className={`text-[9px] font-mono-tech px-2 py-0.5 rounded border ${
                              getImageSourceInfo(thumbImage).badgeClass
                            }`}
                          >
                            {getImageSourceInfo(thumbImage).label}
                          </span>
                        )}
                      </div>

                      {/* Content & Thumbnail Preview */}
                      <div className="flex gap-4 items-start my-2">
                        {thumbImage ? (
                          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800 shadow-inner">
                            <img
                              src={formatImageDisplay(thumbImage)}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : null}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-montserrat font-bold text-lg text-white truncate">{proj.title}</h4>
                          <p className="font-grotesk text-slate-400 text-xs line-clamp-2 mt-1">{proj.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-800 mt-4">
                      <span className="text-xs font-mono-tech text-slate-500">
                        {proj.client || 'Client Pro'} {proj.date ? `• ${proj.date}` : ''}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...proj,
                              images: Array.isArray(proj.images) ? [...proj.images] : (proj.images ? [proj.images] : []),
                            });
                            setNewImageUrlInput('');
                            setPreviewSlideIndex(0);
                            setModalType('project');
                            setIsModalOpen(true);
                          }}
                          className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded"
                          title="Modifier"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Supprimer cette réalisation ?')) {
                              try {
                                await api.deleteProject(proj.id);
                                loadAllAdminData();
                              } catch (err: any) {
                                alert('Erreur: ' + (err.message || 'Échec de la suppression'));
                              }
                            }
                          }}
                          className="p-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: MESSAGES — split into Devis & Contact sub-tabs */}
        {adminTab === 'messages' && (() => {
          const devisMessages = messages.filter(m => m.serviceType?.startsWith('Devis:'));
          const contactMessages = messages.filter(m => !m.serviceType?.startsWith('Devis:'));
          const currentList = messagesSubTab === 'devis' ? devisMessages : contactMessages;

          const MessageCard = ({ msg }: { msg: typeof messages[0] }) => (
            <div key={msg.id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3 font-grotesk">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-montserrat font-bold text-lg text-white">{msg.fullName}</h4>
                  <div className="text-xs font-mono-tech text-slate-400">{msg.email} • {msg.phone || 'Pas de téléphone'}
                    {msg.companyName && <span> • {msg.companyName}</span>}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-mono-tech font-bold ${
                  msg.status === 'NEW' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  {msg.status}
                </span>
              </div>

              {messagesSubTab === 'devis' && msg.serviceType && (
                <div className="text-xs font-mono-tech text-[#cbd5e1] bg-slate-800 rounded px-3 py-1.5 border border-slate-700">
                  {msg.serviceType}
                </div>
              )}
              {messagesSubTab === 'devis' && msg.vehicleType && (
                <div className="text-xs text-slate-400">Véhicule : <span className="text-slate-200">{msg.vehicleType}</span></div>
              )}

              <div className="p-4 bg-slate-950 rounded border border-slate-800 text-sm text-slate-300 whitespace-pre-wrap">
                {msg.message}
              </div>

              <div className="flex justify-between items-center text-xs font-mono-tech text-slate-500">
                <span>Reçu le : {new Date(msg.createdAt).toLocaleDateString('fr-FR')}</span>
                <div className="flex gap-2">
                  <button
                    onClick={async () => { await api.updateMessageStatus(msg.id, 'READ'); loadAllAdminData(); }}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                  >
                    Marquer Lu
                  </button>
                  <button
                    onClick={async () => { await api.deleteMessage(msg.id); loadAllAdminData(); }}
                    className="px-3 py-1 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          );

          return (
            <div className="space-y-6">
              {/* Sub-tab bar */}
              <div className="flex gap-2">
                <button
                  onClick={() => setMessagesSubTab('devis')}
                  className={`px-5 py-2 rounded font-mono-tech text-xs font-bold uppercase tracking-wider transition-all border ${
                    messagesSubTab === 'devis'
                      ? 'bg-[#007aff] text-white border-[#007aff]'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  Demandes Devis ({devisMessages.length})
                  {devisMessages.filter(m => m.status === 'NEW').length > 0 && (
                    <span className="ml-2 bg-amber-500 text-slate-950 rounded-full text-[10px] px-1.5 py-0.5 font-extrabold">
                      {devisMessages.filter(m => m.status === 'NEW').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setMessagesSubTab('contact')}
                  className={`px-5 py-2 rounded font-mono-tech text-xs font-bold uppercase tracking-wider transition-all border ${
                    messagesSubTab === 'contact'
                      ? 'bg-[#cbd5e1] text-[#000613] border-[#cbd5e1]'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  Messages Contact ({contactMessages.length})
                  {contactMessages.filter(m => m.status === 'NEW').length > 0 && (
                    <span className="ml-2 bg-amber-500 text-slate-950 rounded-full text-[10px] px-1.5 py-0.5 font-extrabold">
                      {contactMessages.filter(m => m.status === 'NEW').length}
                    </span>
                  )}
                </button>
              </div>

              {/* Empty state */}
              {currentList.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono-tech text-sm">
                  Aucun {messagesSubTab === 'devis' ? 'devis' : 'message'} reçu pour l'instant.
                </div>
              ) : (
                <div className="space-y-4">
                  {currentList.map((msg) => <MessageCard key={msg.id} msg={msg} />)}
                </div>
              )}
            </div>
          );
        })()}

        {/* TAB 6: USER MANAGEMENT */}
        {adminTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-montserrat font-bold text-xl text-white">Gestion des Utilisateurs</h3>
                <p className="font-mono-tech text-xs text-slate-500 mt-1">Créez et gérez les comptes administrateurs</p>
              </div>
              <button
                onClick={() => {
                  setUserFormData({ name: '', email: '', password: '', role: 'ADMIN' });
                  setEditingUserId(null);
                  setUserFormMode('create');
                  setUserFormError('');
                  setUserFormSuccess('');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold text-xs uppercase rounded shadow transition-colors"
              >
                <Plus size={16} />
                <span>Nouvel Utilisateur</span>
              </button>
            </div>

            {/* User create/edit form */}
            {userFormMode && (
              <div className="bg-slate-900 border border-[#007aff]/40 rounded-xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="font-montserrat font-bold text-lg text-white">
                    {userFormMode === 'create' ? 'Créer un nouvel utilisateur' : 'Modifier l\'utilisateur'}
                  </h4>
                  <button onClick={() => { setUserFormMode(null); setUserFormError(''); setUserFormSuccess(''); }} className="text-slate-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                {userFormError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono-tech rounded flex items-center gap-2">
                    <AlertCircle size={14} />{userFormError}
                  </div>
                )}
                {userFormSuccess && (
                  <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech rounded flex items-center gap-2">
                    <Check size={14} />{userFormSuccess}
                  </div>
                )}

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setUserFormError('');
                    setUserFormSuccess('');
                    if (userFormMode === 'create') {
                      const res = await api.createUser(userFormData);
                      if (res.success) {
                        setUserFormSuccess('Utilisateur créé avec succès.');
                        setUserFormMode(null);
                        loadAllAdminData();
                      } else {
                        setUserFormError(res.error || 'Erreur lors de la création.');
                      }
                    } else if (editingUserId) {
                      const updateData: any = { name: userFormData.name, email: userFormData.email, role: userFormData.role };
                      if (userFormData.password) updateData.password = userFormData.password;
                      const res = await api.updateUser(editingUserId, updateData);
                      if (res.success) {
                        setUserFormSuccess('Utilisateur mis à jour.');
                        setUserFormMode(null);
                        loadAllAdminData();
                      } else {
                        setUserFormError(res.error || 'Erreur lors de la mise à jour.');
                      }
                    }
                  }}
                >
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Nom complet *</label>
                    <input
                      type="text" required
                      value={userFormData.name}
                      onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                      placeholder="Prénom Nom"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Email *</label>
                    <input
                      type="email" required
                      value={userFormData.email}
                      onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                      Mot de passe {userFormMode === 'edit' ? '(laisser vide = inchangé)' : '*'}
                    </label>
                    <input
                      type="password"
                      required={userFormMode === 'create'}
                      value={userFormData.password}
                      onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                      placeholder="Min. 8 caractères"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Rôle</label>
                    <select
                      value={userFormData.role}
                      onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                    >
                      <option value="ADMIN">Administrateur</option>
                      <option value="USER">Utilisateur</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex justify-end gap-3 pt-2 border-t border-slate-800">
                    <button type="button" onClick={() => setUserFormMode(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono-tech text-xs uppercase">
                      Annuler
                    </button>
                    <button type="submit" className="px-6 py-2 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] rounded font-mono-tech font-bold text-xs uppercase shadow-lg">
                      {userFormMode === 'create' ? 'Créer' : 'Mettre à jour'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Users list */}
            <div className="space-y-3">
              {users.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono-tech text-sm">Aucun utilisateur trouvé.</div>
              ) : users.map((user) => (
                <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#007aff]/20 border border-[#007aff]/40 flex items-center justify-center text-[#007aff] font-bold font-montserrat text-lg shrink-0">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-montserrat font-bold text-white">{user.name}</div>
                      <div className="font-mono-tech text-xs text-slate-400">{user.email}</div>
                      <div className="mt-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono-tech font-bold ${user.role === 'ADMIN' ? 'bg-[#007aff]/20 text-[#007aff] border border-[#007aff]/30' : 'bg-slate-800 text-slate-400'}`}>
                          {user.role === 'ADMIN' ? '⚡ Admin' : '👤 Utilisateur'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setUserFormData({ name: user.name, email: user.email, password: '', role: user.role });
                        setEditingUserId(user.id);
                        setUserFormMode('edit');
                        setUserFormError('');
                        setUserFormSuccess('');
                      }}
                      className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Supprimer l'utilisateur "${user.name}" ?`)) {
                          const res = await api.deleteUser(user.id);
                          if (res.success) loadAllAdminData();
                          else alert(res.error || 'Erreur lors de la suppression.');
                        }
                      }}
                      className="p-2.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MY PROFILE */}
        {adminTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile header */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#007aff]/20 border-2 border-[#007aff]/50 flex items-center justify-center text-[#007aff] font-extrabold font-montserrat text-4xl shrink-0">
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <h3 className="font-montserrat font-extrabold text-2xl text-white">{currentUser?.name || 'Admin'}</h3>
                <p className="text-slate-400 font-mono-tech text-sm">{currentUser?.email}</p>
                <span className="mt-2 inline-flex px-3 py-1 bg-[#007aff]/20 border border-[#007aff]/30 rounded-full text-[#007aff] font-mono-tech text-xs font-bold">
                  ⚡ {currentUser?.role || 'ADMIN'}
                </span>
              </div>
            </div>

            {/* Edit profile form */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
                <UserCircle size={20} className="text-[#007aff]" />
                <h4 className="font-montserrat font-bold text-lg text-white">Modifier le profil</h4>
              </div>

              {profileError && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono-tech rounded flex items-center gap-2">
                  <AlertCircle size={14} />{profileError}
                </div>
              )}
              {profileSuccess && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech rounded flex items-center gap-2">
                  <Check size={14} />{profileSuccess}
                </div>
              )}

              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setProfileError('');
                  setProfileSuccess('');

                  if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
                    setProfileError('Les mots de passe ne correspondent pas.');
                    return;
                  }

                  setProfileLoading(true);
                  try {
                    const res = await api.updateProfile({
                      name: profileForm.name,
                      email: profileForm.email,
                      currentPassword: profileForm.currentPassword || undefined,
                      newPassword: profileForm.newPassword || undefined,
                    });

                    if (res.success) {
                      setProfileSuccess('Profil mis à jour avec succès !');
                      if (res.token) localStorage.setItem('shyk_admin_token', res.token);
                      if (res.user) setCurrentUser(res.user);
                      setProfileForm(f => ({ ...f, currentPassword: '', newPassword: '', confirmPassword: '' }));
                    } else {
                      setProfileError(res.error || 'Erreur lors de la mise à jour.');
                    }
                  } finally {
                    setProfileLoading(false);
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Nom complet</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#007aff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Adresse Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#007aff]"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <KeyRound size={16} className="text-amber-400" />
                    <span className="font-mono-tech text-xs text-slate-400 uppercase font-bold">Changer le mot de passe (optionnel)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono-tech text-slate-500 uppercase mb-1">Mot de passe actuel</label>
                      <input
                        type="password"
                        value={profileForm.currentPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, currentPassword: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-amber-400"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-tech text-slate-500 uppercase mb-1">Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={profileForm.newPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-amber-400"
                        placeholder="Min. 8 caractères"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-tech text-slate-500 uppercase mb-1">Confirmer</label>
                      <input
                        type="password"
                        value={profileForm.confirmPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-amber-400"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="flex items-center gap-2 px-8 py-2.5 bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-extrabold text-xs uppercase rounded shadow-lg transition-all disabled:opacity-60"
                  >
                    {profileLoading ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                    {profileLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* ADMIN EDIT / CREATE MODAL */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-3xl w-full max-h-[92vh] flex flex-col text-white relative shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0 bg-slate-900 z-20">
              <h3 className="font-montserrat font-extrabold text-lg sm:text-xl text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-[#007aff] font-mono-tech text-xs sm:text-sm font-bold">[{editingItem?.id ? 'MODIFIER' : 'CRÉER'}]</span>
                <span>{modalType === 'product' ? 'Produit' : modalType === 'service' ? 'Service' : modalType === 'project' ? 'Projet' : modalType}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 text-lg font-bold transition-colors"
                title="Fermer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 overscroll-contain">

            {/* Product Form */}
            {modalType === 'product' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    if (editingItem.id) {
                      await api.updateProduct(editingItem.id, editingItem);
                    } else {
                      await api.createProduct(editingItem);
                    }
                    setIsModalOpen(false);
                    loadAllAdminData();
                  } catch (err: any) {
                    alert('Erreur: ' + (err.message || 'Échec de la sauvegarde'));
                  }
                }}
                className="space-y-4 font-grotesk"
              >
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Nom du Produit</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Catégorie</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    >
                      <option value="Pièces de climatisation auto">Pièces de climatisation auto</option>
                      <option value="Kits frigorifiques">Kits frigorifiques</option>
                      <option value="Matériel pour cabines isothermes">Matériel pour cabines isothermes</option>
                      <option value="Accessoires véhicules">Accessoires véhicules</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Prix (TND)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingItem.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white font-mono-tech"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                  />
                </div>

                {/* Multiple Images Support with Gallery & Live Carousel Preview */}
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono-tech text-sky-400 font-bold uppercase tracking-wider">
                        <ImageIcon size={14} />
                        <span>Galerie de Photos & Carrousel</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {Array.isArray(editingItem.images) && editingItem.images.length > 1
                          ? 'Plusieurs images ajoutées : ce produit s\'affichera automatiquement sous forme de carrousel interactif !'
                          : 'Ajoutez une ou plusieurs photos du produit.'}
                      </p>
                    </div>

                    {/* Multi-upload Button */}
                    <label className="cursor-pointer bg-[#007aff] hover:bg-[#0060cc] text-white px-3.5 py-2 rounded font-mono-tech text-xs uppercase font-bold flex items-center gap-2 shadow transition-all self-start sm:self-auto">
                      <Upload size={14} />
                      <span>Téléverser Photos (Base64)</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleMultiFileUpload}
                      />
                    </label>
                  </div>

                  {/* Add by URL input */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Ou collez une URL Web (https://...) ou une chaîne Base64..."
                        value={newImageUrlInput}
                        onChange={(e) => setNewImageUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddImageUrl();
                          }
                        }}
                        className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-white pl-8 focus:outline-none focus:border-[#cbd5e1]"
                      />
                      <LinkIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-mono-tech text-xs uppercase font-bold rounded"
                    >
                      + Ajouter URL
                    </button>
                  </div>

                  {/* Image Cards List */}
                  {Array.isArray(editingItem.images) && editingItem.images.length > 0 ? (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {editingItem.images.map((src: string, idx: number) => {
                        const info = getImageSourceInfo(src);
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-12 h-12 rounded overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                                <img
                                  src={formatImageDisplay(src)}
                                  alt={`Miniature ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-mono-tech text-white font-bold">
                                    #{idx + 1} {idx === 0 && <span className="text-amber-400 text-[10px] uppercase">(Couverture)</span>}
                                  </span>
                                  <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border ${info.badgeClass}`}>
                                    {info.label}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 font-mono-tech truncate max-w-xs mt-0.5">
                                  {src.startsWith('data:') ? `${src.slice(0, 35)}... (base64)` : src}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveImage(idx, 'up')}
                                className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded disabled:opacity-30"
                                title="Monter"
                              >
                                <ArrowUp size={13} />
                              </button>
                              <button
                                type="button"
                                disabled={idx === editingItem.images.length - 1}
                                onClick={() => handleMoveImage(idx, 'down')}
                                className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded disabled:opacity-30"
                                title="Descendre"
                              >
                                <ArrowDown size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded ml-1"
                                title="Supprimer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-slate-800 rounded-lg text-xs font-mono-tech text-slate-500">
                      Aucune image pour le moment. Cliquez sur "Téléverser Photos" ou collez une URL.
                    </div>
                  )}

                  {/* Live Mini-Carousel Preview */}
                  {Array.isArray(editingItem.images) && editingItem.images.length > 1 && (
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 mb-2">
                        <span>Aperçu en direct du carrousel :</span>
                        <span className="text-[#007aff] font-bold">
                          Photo {(previewSlideIndex % editingItem.images.length) + 1} / {editingItem.images.length}
                        </span>
                      </div>
                      <div className="relative h-48 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
                        <img
                          src={formatImageDisplay(editingItem.images[previewSlideIndex % editingItem.images.length])}
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 select-none pointer-events-none"
                        />
                        <img
                          src={formatImageDisplay(editingItem.images[previewSlideIndex % editingItem.images.length])}
                          alt="Preview slide"
                          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewSlideIndex((p) =>
                              p === 0 ? editingItem.images.length - 1 : p - 1
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewSlideIndex((p) => (p + 1) % editingItem.images.length)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Specs key-value editor */}
                <div className="border border-slate-700 rounded p-4 bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono-tech text-slate-400 uppercase">Spécifications Techniques</label>
                    <button
                      type="button"
                      onClick={() => {
                        const currentSpecs = editingItem.specs || {};
                        const newKey = `Spec ${Object.keys(currentSpecs).length + 1}`;
                        setEditingItem({ ...editingItem, specs: { ...currentSpecs, [newKey]: '' } });
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono-tech text-[11px] uppercase"
                    >
                      <Plus size={12} /> Ajouter
                    </button>
                  </div>
                  {Object.entries(editingItem.specs || {}).map(([key, value], idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Clé (ex: Cylindrée)"
                        value={key}
                        onChange={(e) => {
                          const newSpecs: Record<string, string> = {};
                          Object.entries(editingItem.specs || {}).forEach(([k, v], i) => {
                            newSpecs[i === idx ? e.target.value : k] = v as string;
                          });
                          setEditingItem({ ...editingItem, specs: newSpecs });
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white font-mono-tech"
                      />
                      <input
                        type="text"
                        placeholder="Valeur (ex: 155 cc/rev)"
                        value={value as string}
                        onChange={(e) => {
                          setEditingItem({ ...editingItem, specs: { ...editingItem.specs, [key]: e.target.value } });
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSpecs = { ...editingItem.specs };
                          delete newSpecs[key];
                          setEditingItem({ ...editingItem, specs: newSpecs });
                        }}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {Object.keys(editingItem.specs || {}).length === 0 && (
                    <p className="text-xs text-slate-600 font-mono-tech">Aucune spec. Cliquez "Ajouter" pour en créer.</p>
                  )}
                </div>

                {/* Availability */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Disponibilité</label>
                    <select
                      value={editingItem.availability || 'IN_STOCK'}
                      onChange={(e) => setEditingItem({ ...editingItem, availability: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    >
                      <option value="IN_STOCK">En Stock</option>
                      <option value="OUT_OF_STOCK">Rupture</option>
                      <option value="ON_REQUEST">Sur Commande</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!editingItem.featured}
                        onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                        className="w-4 h-4 rounded accent-[#007aff]"
                      />
                      <span className="text-xs font-mono-tech text-slate-400 uppercase">Produit Vedette</span>
                    </label>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-4 pb-1 border-t border-slate-800 flex justify-end gap-3 z-10 -mx-6 px-6 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono-tech text-xs uppercase transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold uppercase transition-colors shadow-lg"
                  >
                    {uploading ? 'Traitement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            )}

            {/* Service Form */}
            {modalType === 'service' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    if (editingItem.id) {
                      await api.updateService(editingItem.id, editingItem);
                    } else {
                      await api.createService(editingItem);
                    }
                    setIsModalOpen(false);
                    loadAllAdminData();
                  } catch (err: any) {
                    alert('Erreur: ' + (err.message || 'Échec de la sauvegarde'));
                  }
                }}
                className="space-y-4 font-grotesk"
              >
                {/* Title */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Titre du Service *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Description Courte *</label>
                  <input
                    type="text"
                    required
                    placeholder="Résumé affiché sur la carte service"
                    value={editingItem.shortDescription || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Description Complète *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Texte détaillé affiché dans la modale de service"
                    value={editingItem.fullDescription || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, fullDescription: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white resize-none focus:outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                {/* Icon & Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Icône (nom Lucide)</label>
                    <select
                      value={editingItem.icon || 'wrench'}
                      onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    >
                      <option value="wind">wind (climatisation)</option>
                      <option value="snowflake">snowflake (froid)</option>
                      <option value="shield-check">shield-check (isotherme)</option>
                      <option value="wrench">wrench (maintenance)</option>
                      <option value="thermometer">thermometer</option>
                      <option value="truck">truck</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Ordre d'affichage</label>
                    <input
                      type="number"
                      min={0}
                      value={editingItem.order ?? 0}
                      onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white font-mono-tech"
                    />
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Image (URL ou Upload)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://..."
                      value={editingItem.image || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="flex-grow bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    />
                    <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded font-mono-tech text-xs uppercase flex items-center gap-2">
                      <Upload size={14} />
                      <span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, image: url }))} />
                    </label>
                  </div>
                </div>

                {/* Features list */}
                <div className="border border-slate-700 rounded p-4 bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono-tech text-slate-400 uppercase">Points Forts (Features)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const features = Array.isArray(editingItem.features) ? editingItem.features : [];
                        setEditingItem({ ...editingItem, features: [...features, ''] });
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono-tech text-[11px] uppercase"
                    >
                      <Plus size={12} /> Ajouter
                    </button>
                  </div>
                  {(Array.isArray(editingItem.features) ? editingItem.features : []).map((feat: string, idx: number) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder={`Feature ${idx + 1}`}
                        value={feat}
                        onChange={(e) => {
                          const features = [...(Array.isArray(editingItem.features) ? editingItem.features : [])];
                          features[idx] = e.target.value;
                          setEditingItem({ ...editingItem, features });
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const features = [...(Array.isArray(editingItem.features) ? editingItem.features : [])];
                          features.splice(idx, 1);
                          setEditingItem({ ...editingItem, features });
                        }}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {(!editingItem.features || editingItem.features.length === 0) && (
                    <p className="text-xs text-slate-600 font-mono-tech">Aucun point fort. Cliquez "Ajouter".</p>
                  )}
                </div>

                <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-4 pb-1 border-t border-slate-800 flex justify-end gap-3 z-10 -mx-6 px-6 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono-tech text-xs uppercase transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold uppercase transition-colors shadow"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            )}

            {/* Project Form (BEFORE_AFTER, SIMPLE, or CAROUSEL) */}
            {modalType === 'project' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (editingItem.type === 'BEFORE_AFTER') {
                    if (!editingItem.beforeImage || !editingItem.afterImage) {
                      alert('Veuillez fournir les deux images : AVANT et APRÈS pour ce type de projet.');
                      return;
                    }
                  }
                  try {
                    if (editingItem.id) {
                      await api.updateProject(editingItem.id, editingItem);
                    } else {
                      await api.createProject(editingItem);
                    }
                    setIsModalOpen(false);
                    loadAllAdminData();
                  } catch (err: any) {
                    alert('Erreur: ' + (err.message || 'Échec de la sauvegarde'));
                  }
                }}
                className="space-y-4 font-grotesk max-h-[80vh] overflow-y-auto pr-1"
              >
                {/* Title */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                    Titre de la Réalisation *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1]"
                  />
                </div>

                {/* Type and Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                      Type d'affichage *
                    </label>
                    <select
                      value={editingItem.type || 'CAROUSEL'}
                      onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white font-mono-tech font-bold"
                    >
                      <option value="CAROUSEL">📸 CAROUSEL (Carrousel Défilant Multi-photos)</option>
                      <option value="BEFORE_AFTER">🔄 BEFORE_AFTER (Comparateur Avant / Après)</option>
                      <option value="SIMPLE">🖼️ SIMPLE (Galerie Normale)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                      Catégorie *
                    </label>
                    <select
                      value={editingItem.category || 'Fourgons transformés'}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    >
                      <option value="Fourgons transformés">Fourgons transformés</option>
                      <option value="Camions frigorifiques">Camions frigorifiques</option>
                      <option value="Installations clim auto">Installations clim auto</option>
                    </select>
                  </div>
                </div>

                {/* Client and Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                      Client / Partenaire
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Société Traiteur Prestige"
                      value={editingItem.client || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                      Date d'exécution
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 2026-05"
                      value={editingItem.date || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white font-mono-tech"
                    />
                  </div>
                </div>

                {/* MODE 1: BEFORE_AFTER */}
                {editingItem.type === 'BEFORE_AFTER' && (
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400">
                      <Sparkles size={14} />
                      <span className="font-bold uppercase tracking-wider">Configuration Avant / Après</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Before Image */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-mono-tech text-amber-400 uppercase font-bold">
                            Image AVANT (Origine)
                          </label>
                          <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border ${
                            getImageSourceInfo(editingItem.beforeImage).badgeClass
                          }`}>
                            {getImageSourceInfo(editingItem.beforeImage).label}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="https://... ou téléverser fichier"
                            value={editingItem.beforeImage || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, beforeImage: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                          />
                          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded text-xs flex items-center gap-1 font-mono-tech uppercase">
                            <Upload size={14} />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (b64) => setEditingItem({ ...editingItem, beforeImage: b64 }))}
                            />
                          </label>
                        </div>
                        {editingItem.beforeImage && (
                          <div className="mt-2 h-24 rounded overflow-hidden border border-slate-800 bg-slate-900">
                            <img
                              src={formatImageDisplay(editingItem.beforeImage)}
                              alt="Avant preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* After Image */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-mono-tech text-sky-400 uppercase font-bold">
                            Image APRÈS (ShykAuto)
                          </label>
                          <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border ${
                            getImageSourceInfo(editingItem.afterImage).badgeClass
                          }`}>
                            {getImageSourceInfo(editingItem.afterImage).label}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="https://... ou téléverser fichier"
                            value={editingItem.afterImage || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, afterImage: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                          />
                          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded text-xs flex items-center gap-1 font-mono-tech uppercase">
                            <Upload size={14} />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (b64) => setEditingItem({ ...editingItem, afterImage: b64 }))}
                            />
                          </label>
                        </div>
                        {editingItem.afterImage && (
                          <div className="mt-2 h-24 rounded overflow-hidden border border-slate-800 bg-slate-900">
                            <img
                              src={formatImageDisplay(editingItem.afterImage)}
                              alt="Après preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* MODE 2 & 3: CAROUSEL or SIMPLE */}
                {editingItem.type !== 'BEFORE_AFTER' && (
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono-tech text-sky-400 font-bold uppercase tracking-wider">
                          <ImageIcon size={14} />
                          <span>Galerie de Photos & Carrousel</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {editingItem.type === 'CAROUSEL'
                            ? 'Ce projet s\'affichera sous forme de carrousel interactif avec transitions et défilement.'
                            : (Array.isArray(editingItem.images) && editingItem.images.length > 1)
                            ? 'Plusieurs images ajoutées : ce projet s\'affichera automatiquement sous forme de carrousel dans la vitrine !'
                            : 'Image unique : s\'affiche sous forme de photo standard.'}
                        </p>
                      </div>

                      {/* Multi-upload Button */}
                      <label className="cursor-pointer bg-[#007aff] hover:bg-[#0060cc] text-white px-3.5 py-2 rounded font-mono-tech text-xs uppercase font-bold flex items-center gap-2 shadow transition-all self-start sm:self-auto">
                        <Upload size={14} />
                        <span>Téléverser Photos (Base64)</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleMultiFileUpload}
                        />
                      </label>
                    </div>

                    {/* Add by URL input */}
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Ou collez une URL Web (https://...) ou une chaîne Base64..."
                          value={newImageUrlInput}
                          onChange={(e) => setNewImageUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddImageUrl();
                            }
                          }}
                          className="w-full bg-slate-900 border border-slate-700 p-2.5 rounded text-xs text-white pl-8 focus:outline-none focus:border-[#cbd5e1]"
                        />
                        <LinkIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-mono-tech text-xs uppercase font-bold rounded"
                      >
                        + Ajouter URL
                      </button>
                    </div>

                    {/* Image Cards List */}
                    {Array.isArray(editingItem.images) && editingItem.images.length > 0 ? (
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {editingItem.images.map((src: string, idx: number) => {
                          const info = getImageSourceInfo(src);
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-lg gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                                  <img
                                    src={formatImageDisplay(src)}
                                    alt={`Miniature ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono-tech text-white font-bold">
                                      #{idx + 1} {idx === 0 && <span className="text-amber-400 text-[10px] uppercase">(Couverture)</span>}
                                    </span>
                                    <span className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border ${info.badgeClass}`}>
                                      {info.label}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 font-mono-tech truncate max-w-xs mt-0.5">
                                    {src.startsWith('data:') ? `${src.slice(0, 35)}... (base64)` : src}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveImage(idx, 'up')}
                                  className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded disabled:opacity-30"
                                  title="Monter"
                                >
                                  <ArrowUp size={13} />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === editingItem.images.length - 1}
                                  onClick={() => handleMoveImage(idx, 'down')}
                                  className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded disabled:opacity-30"
                                  title="Descendre"
                                >
                                  <ArrowDown size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="p-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500/40 rounded ml-1"
                                  title="Supprimer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-slate-800 rounded-lg text-xs font-mono-tech text-slate-500">
                        Aucune image pour le moment. Cliquez sur "Téléverser Photos" ou collez une URL.
                      </div>
                    )}

                    {/* Live Mini-Carousel Preview */}
                    {Array.isArray(editingItem.images) && editingItem.images.length > 1 && (
                      <div className="pt-2 border-t border-slate-800">
                        <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 mb-2">
                          <span>Aperçu en direct du carrousel :</span>
                          <span className="text-[#007aff] font-bold">
                            Photo {(previewSlideIndex % editingItem.images.length) + 1} / {editingItem.images.length}
                          </span>
                        </div>
                        <div className="relative h-48 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
                          <img
                            src={formatImageDisplay(editingItem.images[previewSlideIndex % editingItem.images.length])}
                            aria-hidden="true"
                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 select-none pointer-events-none"
                          />
                          <img
                            src={formatImageDisplay(editingItem.images[previewSlideIndex % editingItem.images.length])}
                            alt="Preview slide"
                            className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-2"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewSlideIndex((p) =>
                                p === 0 ? editingItem.images.length - 1 : p - 1
                              )
                            }
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewSlideIndex((p) => (p + 1) % editingItem.images.length)
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">
                    Description du Projet *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white focus:outline-none focus:border-[#cbd5e1] resize-none"
                  />
                </div>

                {/* Featured checkbox */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingItem.featured)}
                      onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#007aff]"
                    />
                    <span className="text-xs font-mono-tech text-slate-400 uppercase">
                      Mettre en avant sur la vitrine (Featured)
                    </span>
                  </label>
                </div>

                {/* Submit Actions */}
                <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-md pt-4 pb-1 border-t border-slate-800 flex justify-end gap-3 z-10 -mx-6 px-6 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono-tech text-xs uppercase"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold uppercase transition-colors shadow-lg"
                  >
                    {uploading ? 'Traitement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
