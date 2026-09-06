import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ProductItem, ServiceItem, ProjectItem, MessageItem, AdminStats } from '../types';
import {
  Lock, LogOut, Package, Wrench, Layers, MessageSquare, BarChart3,
  Plus, Trash2, Edit3, Upload, Check, AlertCircle, RefreshCw, Eye
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('admin@shykauto.com');
  const [loginPassword, setLoginPassword] = useState<string>('Admin@123456');
  const [loginError, setLoginError] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Active Admin Tab
  const [adminTab, setAdminTab] = useState<'stats' | 'products' | 'services' | 'projects' | 'messages'>('stats');
  const [messagesSubTab, setMessagesSubTab] = useState<'devis' | 'contact'>('devis');

  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  // Modal / Form states
  const [uploading, setUploading] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'product' | 'service' | 'project' | 'messageView'>('product');

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
      const [statsRes, prodData, servData, projData, msgRes] = await Promise.all([
        api.getStats().catch(() => null),
        api.getProducts().catch(() => []),
        api.getServices().catch(() => []),
        api.getProjects().catch(() => []),
        api.getMessages().catch(() => ({ success: false, data: [] })),
      ]);

      if (statsRes?.success) setStats(statsRes.data);
      setProducts(prodData);
      setServices(servData);
      setProjects(projData);
      if (msgRes?.success) setMessages(msgRes.data);
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
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
    }
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

            <p className="text-center font-mono-tech text-[11px] text-slate-500 pt-2">
              Compte Démo : admin@shykauto.com / Admin@123456
            </p>
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
                    <img src={prod.images[0]} alt={prod.name} className="h-40 w-full object-cover rounded mb-4 border border-slate-800" />
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
                          await api.deleteProduct(prod.id);
                          loadAllAdminData();
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
                          await api.deleteService(serv.id);
                          loadAllAdminData();
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
            <div className="flex justify-between items-center">
              <h3 className="font-montserrat font-bold text-xl text-white">Gestion des Réalisations (Avant/Après & Simple)</h3>
              <button
                onClick={() => {
                  setEditingItem({ title: '', slug: '', category: 'Fourgons transformés', type: 'BEFORE_AFTER', description: '', client: '', beforeImage: '', afterImage: '', images: [] });
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
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono-tech text-amber-400 uppercase font-bold">{proj.type} • {proj.category}</span>
                    <h4 className="font-montserrat font-bold text-lg text-white my-1">{proj.title}</h4>
                    <p className="font-grotesk text-slate-400 text-xs line-clamp-2">{proj.description}</p>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-800 mt-4">
                    <button
                      onClick={() => {
                        setEditingItem(proj);
                        setModalType('project');
                        setIsModalOpen(true);
                      }}
                      className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm('Supprimer ce projet ?')) {
                          await api.deleteProject(proj.id);
                          loadAllAdminData();
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

      </div>

      {/* ADMIN EDIT / CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 sm:p-8 text-white relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="font-montserrat font-extrabold text-2xl text-white mb-6 uppercase">
              {editingItem?.id ? 'Modifier' : 'Créer'} {modalType}
            </h3>

            {/* Product Form */}
            {modalType === 'product' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (editingItem.id) {
                    await api.updateProduct(editingItem.id, editingItem);
                  } else {
                    await api.createProduct(editingItem);
                  }
                  setIsModalOpen(false);
                  loadAllAdminData();
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

                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Image Principale (URL ou Upload)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingItem.images?.[0] || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, images: [e.target.value] })}
                      className="flex-grow bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    />
                    <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded font-mono-tech text-xs uppercase flex items-center gap-2">
                      <Upload size={14} />
                      <span>Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, images: [url] }))} />
                    </label>
                  </div>
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

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-slate-800 text-slate-300">Annuler</button>
                  <button type="submit" className="px-6 py-2 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold uppercase transition-colors">Enregistrer</button>
                </div>
              </form>
            )}

            {/* Service Form */}
            {modalType === 'service' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (editingItem.id) {
                    await api.updateService(editingItem.id, editingItem);
                  } else {
                    await api.createService(editingItem);
                  }
                  setIsModalOpen(false);
                  loadAllAdminData();
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

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-slate-800 text-slate-300">Annuler</button>
                  <button type="submit" className="px-6 py-2 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold uppercase transition-colors">Enregistrer</button>
                </div>
              </form>
            )}

            {/* Project Form (BEFORE_AFTER or SIMPLE) */}
            {modalType === 'project' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (editingItem.id) {
                    await api.updateProject(editingItem.id, editingItem);
                  } else {
                    await api.createProject(editingItem);
                  }
                  setIsModalOpen(false);
                  loadAllAdminData();
                }}
                className="space-y-4 font-grotesk"
              >
                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Titre de la Réalisation</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Type de Projet</label>
                    <select
                      value={editingItem.type}
                      onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white font-mono-tech font-bold"
                    >
                      <option value="BEFORE_AFTER">BEFORE_AFTER (Avant / Après)</option>
                      <option value="SIMPLE">SIMPLE (Galerie Unique)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Catégorie</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    >
                      <option value="Fourgons transformés">Fourgons transformés</option>
                      <option value="Camions frigorifiques">Camions frigorifiques</option>
                      <option value="Installations clim auto">Installations clim auto</option>
                    </select>
                  </div>
                </div>

                {editingItem.type === 'BEFORE_AFTER' ? (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950 rounded border border-slate-800">
                    <div>
                      <label className="block text-xs font-mono-tech text-amber-400 uppercase mb-1">Image AVANT (Origin)</label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={editingItem.beforeImage || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, beforeImage: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                        <label className="cursor-pointer bg-slate-800 text-white p-2 rounded">
                          <Upload size={14} />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, beforeImage: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech text-[#cbd5e1] uppercase mb-1">Image APRÈS (ShykAuto)</label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={editingItem.afterImage || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, afterImage: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white"
                        />
                        <label className="cursor-pointer bg-slate-800 text-white p-2 rounded">
                          <Upload size={14} />
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, afterImage: url }))} />
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Image Galerie</label>
                    <input
                      type="text"
                      value={editingItem.images?.[0] || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, images: [e.target.value] })}
                      className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono-tech text-slate-400 uppercase mb-1">Description du Projet</label>
                  <textarea
                    rows={3}
                    required
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-2.5 rounded text-sm text-white"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded bg-slate-800 text-slate-300">Annuler</button>
                  <button type="submit" className="px-6 py-2 rounded bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] font-mono-tech font-bold uppercase transition-colors">Enregistrer</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
};
