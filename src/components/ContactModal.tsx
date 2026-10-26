import { useState, FormEvent } from 'react';
import { X, Send, Mail, MapPin, CheckCircle2, Copy, Check, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMissionType?: string;
}

export function ContactModal({ isOpen, onClose, defaultMissionType }: ContactModalProps) {
  const { isLight, theme, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [missionType, setMissionType] = useState(
    defaultMissionType || 'Développement Web & Logiciel'
  );
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending inquiry
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const missionOptions = [
    'Stage PFE / Pré-embauche',
    'Développement Web & Logiciel (Java / PHP / JS)',
    'Administration Systèmes Linux Ubuntu',
    'Support Informatique & Relation Client Polyglotte',
    'Consultation & Maintenance Base de Données',
    'Autre collaboration',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#0D101E] border border-[#232A44] rounded-2xl shadow-2xl overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#12162A] border-b border-[#1E2540]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <h3 className="font-bold text-white text-base">
              Prendre Contact & Réserver une Mission
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A2038] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Message envoyé avec succès !</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Merci {name}. Votre demande concernant « {missionType} » a bien été enregistrée.
                Maelam Dias vous répondra directement à l'adresse <span className="text-[#9C8EFF] font-semibold">{email}</span> sous 24 heures.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-[#5645EE] hover:bg-[#4837E2] text-white px-6 py-2.5 rounded-lg text-xs font-semibold cursor-pointer shadow-lg"
                >
                  Terminer
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick Contact Bar */}
              <div className="p-3.5 bg-[#12172D] rounded-xl border border-[#212948] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Mail className="w-4 h-4 text-[#7262F6]" />
                  <span className="font-mono text-slate-200">{PORTFOLIO_DATA.profile.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#9C8EFF] hover:text-white px-2.5 py-1 rounded bg-[#1B213D] hover:bg-[#252E52] transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copié' : 'Copier'}</span>
                </button>
              </div>

              {/* Mission Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Type de mission / opportunité
                </label>
                <select
                  value={missionType}
                  onChange={(e) => setMissionType(e.target.value)}
                  className="w-full bg-[#13172C] border border-[#222A47] rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#7262F6] transition-colors"
                >
                  {missionOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0F1325]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Votre Nom ou Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Entreprise Tech / Dr. Dupont"
                    className="w-full bg-[#13172C] border border-[#222A47] rounded-lg px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#7262F6] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Votre Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@exemple.com"
                    className="w-full bg-[#13172C] border border-[#222A47] rounded-lg px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#7262F6] transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message / Spécifications du projet *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre besoin, les technologies souhaitées ou le cadre de la collaboration..."
                  className="w-full bg-[#13172C] border border-[#222A47] rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#7262F6] transition-colors resize-none"
                />
              </div>

              {/* Guaranteed response note */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-[#101427] p-2.5 rounded-lg border border-[#1C233C]">
                <Clock className="w-3.5 h-3.5 text-[#7262F6]" />
                <span>
                  Temps de réponse moyen garanti : <strong>&lt; 24h</strong> (Settat / International).
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#171D33] transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-lg transition-all cursor-pointer ${accentBg} ${accentHoverBg}`}
                >
                  <span>Envoyer la demande</span>
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
