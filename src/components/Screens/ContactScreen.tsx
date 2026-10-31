import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Globe2, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

export function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Stage PFE / Pré-embauche');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isLight, theme, accentText, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 md:py-16 w-full px-6 sm:px-10 lg:px-14 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Démarrons un <span className={accentText}>Projet Ensemble</span>
        </h1>
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Disponible pour des opportunités de stage de fin d'études, missions de développement
          logiciel, administration système ou support client polyglotte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Direct Info & Availability */}
        <div className="lg:col-span-5 space-y-6">
          <div
            className={`border rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#0C0F1B] border-[#1C2237]'
            }`}
          >
            <h2 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Coordonnées Directes
            </h2>

            {/* Email item */}
            <div
              className={`flex items-center justify-between p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#12162A] border-[#1F2644]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isLight
                      ? 'bg-red-50 text-red-600'
                      : isRed
                      ? 'bg-red-950/40 text-red-400'
                      : 'bg-[#5645EE]/15 text-[#7262F6]'
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Courrier électronique
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-semibold font-mono ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {PORTFOLIO_DATA.profile.email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-500 hover:text-slate-900 bg-white border border-slate-200'
                    : 'text-slate-400 hover:text-white bg-[#181D33] hover:bg-[#232A46]'
                }`}
                title="Copier l'adresse email"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location item */}
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#12162A] border-[#1F2644]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isLight
                    ? 'bg-red-50 text-red-600'
                    : isRed
                    ? 'bg-red-950/40 text-red-400'
                    : 'bg-[#5645EE]/15 text-[#7262F6]'
                }`}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Localisation & Mobilité
                </div>
                <div
                  className={`text-xs sm:text-sm font-semibold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Settat, Maroc (Disponible en présentiel ou télétravail international)
                </div>
              </div>
            </div>

            {/* Polyglot Languages item */}
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#12162A] border-[#1F2644]'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isLight
                    ? 'bg-red-50 text-red-600'
                    : isRed
                    ? 'bg-red-950/40 text-red-400'
                    : 'bg-[#5645EE]/15 text-[#7262F6]'
                }`}
              >
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Langues de travail
                </div>
                <div
                  className={`text-xs sm:text-sm font-semibold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Portugais (Natif), Français (Courant), Anglais (Pro)
                </div>
              </div>
            </div>

            {/* Status Note */}
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                isLight
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-[#0F1424] border-[#212B4A] text-emerald-400'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isLight ? 'bg-red-600' : 'bg-emerald-500'
                }`}
              />
              <span className="text-xs font-semibold">
                Actuellement à l'écoute d'opportunités professionnelles
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Booking Form */}
        <div
          className={`border rounded-2xl p-6 sm:p-8 shadow-sm ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0C0F1B] border-[#1C2237]'
          }`}
        >
          <h2 className={`text-xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Formulaire de Contact & Mission
          </h2>
          <p className={`text-xs mb-6 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Remplissez ce formulaire et je vous recontacterai avec une proposition adaptée sous 24h.
          </p>

          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto border ${
                  isRed
                    ? 'bg-red-100 text-red-600 border-red-200'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Message bien reçu !
              </h3>
              <p
                className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                Merci {name}. Votre demande de contact a été transmise. Maelam Dias reviendra vers vous à{' '}
                <span className={`font-semibold ${accentText}`}>{email}</span> très rapidement.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className={`mt-4 text-white px-5 py-2.5 rounded-lg text-xs font-semibold cursor-pointer shadow-lg ${accentBg} ${accentHoverBg}`}
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  Type d'opportunité *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={`w-full rounded-lg px-3.5 py-2.5 text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-red-500'
                      : 'bg-[#12162A] border-[#202742] text-slate-200 focus:border-[#7262F6]'
                  }`}
                >
                  <option value="Stage PFE / Pré-embauche">Stage PFE / Pré-embauche (2026)</option>
                  <option value="Développement Logiciel (Java / PHP / Web)">
                    Développement Logiciel (Java / PHP / Web)
                  </option>
                  <option value="Administration Systèmes Linux">
                    Administration Systèmes Linux
                  </option>
                  <option value="Support & Relation Client Polyglotte">
                    Support & Relation Client Polyglotte
                  </option>
                  <option value="Autre">Autre proposition professionnelle</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Votre Nom ou Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Entreprise Tech / Recruteur"
                    className={`w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-red-500'
                        : 'bg-[#12162A] border-[#202742] text-slate-200 placeholder:text-slate-500 focus:border-[#7262F6]'
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-xs font-semibold mb-1.5 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className={`w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-red-500'
                        : 'bg-[#12162A] border-[#202742] text-slate-200 placeholder:text-slate-500 focus:border-[#7262F6]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  Message / Détails de l'offre *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre projet, vos attentes techniques, ou les détails de la mission..."
                  className={`w-full rounded-lg p-3 text-xs focus:outline-none transition-colors resize-none border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-red-500'
                      : 'bg-[#12162A] border-[#202742] text-slate-200 placeholder:text-slate-500 focus:border-[#7262F6]'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                  * Tous les champs sont obligatoires
                </span>
                <button
                  type="submit"
                  className={`flex items-center gap-2 text-white px-6 py-2.5 rounded-lg text-xs font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer ${accentBg} ${accentHoverBg} ${
                    isRed ? 'shadow-red-600/30' : 'shadow-[#5645EE]/30'
                  }`}
                >
                  <span>Envoyer la proposition</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
