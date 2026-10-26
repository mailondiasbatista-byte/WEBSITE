import { useState } from 'react';
import { X, Type, Check, Sparkles, BookOpen } from 'lucide-react';
import { useTheme, TypographyType } from '../context/ThemeContext';

interface TypographyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TypographyModal({ isOpen, onClose }: TypographyModalProps) {
  const { typography, setTypography, isLight, theme, accentText, accentBg } = useTheme();
  const [sampleText, setSampleText] = useState('Maelam Dias Batista Correia — Technicien & Développeur');
  const isRed = theme === 'white-red' || theme === 'dark-red';

  if (!isOpen) return null;

  const fontOptions: { id: TypographyType; title: string; subtitle: string; desc: string; sampleFontClass: string }[] = [
    {
      id: 'classic',
      title: 'Classique & Moderne (Recommandé)',
      subtitle: 'Inter + Accents Playwrite & Fira Code',
      desc: 'Structure épurée avec Inter pour le texte et Playwrite France Moderne pour les salutations, signatures et touches manuscrites.',
      sampleFontClass: 'font-sans-clean',
    },
    {
      id: 'playwrite-prominent',
      title: 'Signature & Style Playwrite',
      subtitle: 'Playwrite France Moderne pour les Titres',
      desc: 'Donne une identité calligraphique et artistique forte avec Playwrite sur les grands titres et éléments de marque.',
      sampleFontClass: 'font-playwrite',
    },
    {
      id: 'pure-sans',
      title: 'Minimaliste Technique',
      subtitle: 'Inter Pur + Fira Code',
      desc: 'Rendu 100% géométrique sans script manuscrit, axé sur la rigueur d’ingénierie logicielle.',
      sampleFontClass: 'font-sans-clean',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0E111C] border-[#20273F] text-slate-200'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-[#1E2338] bg-[#0A0D17]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isLight ? 'bg-red-50 text-red-600' : isRed ? 'bg-red-950/50 text-red-400' : 'bg-indigo-950 text-indigo-400'
              }`}
            >
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Système Typographique
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Playwrite France Moderne • Inter • Fira Code (SIL OFL 1.1)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-[#1C2136] text-slate-400'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Font Specimen Box */}
          <div
            className={`p-5 rounded-xl border relative overflow-hidden ${
              isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-[#121626]/70 border-[#1E253E]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold tracking-wider uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Spécimen Dynamique : Playwrite France Moderne
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-white text-red-700 border-red-200' : 'bg-red-950/40 text-red-300 border-red-800/40'
              }`}>
                SIL OFL 1.1 • TypeTogether
              </span>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Tapez un texte pour tester la typographie..."
                className={`w-full px-3 py-2 text-xs rounded-lg border font-sans-clean ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-red-500'
                    : 'bg-[#0A0D17] border-[#222942] text-white focus:border-red-500'
                } outline-none transition-colors`}
              />

              {/* Playwrite Preview */}
              <div className="p-4 rounded-lg bg-white/5 border border-dashed border-red-500/30">
                <div className="text-[10px] text-slate-400 font-mono mb-1">Écriture Cursive Playwrite (Signature & Titres) :</div>
                <div className={`font-playwrite text-xl sm:text-2xl font-normal leading-relaxed ${accentText}`}>
                  {sampleText || 'Bonjour, je suis Maelam Dias'}
                </div>
              </div>

              {/* Inter Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0A0D17] border-[#1D2338]'}`}>
                  <div className="text-[10px] text-slate-400 font-mono mb-1">Inter (UI & Titres Gras) :</div>
                  <div className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {sampleText}
                  </div>
                </div>
                <div className={`p-3 rounded-lg border ${isLight ? 'bg-white border-slate-200' : 'bg-[#0A0D17] border-[#1D2338]'}`}>
                  <div className="text-[10px] text-slate-400 font-mono mb-1">Fira Code (Monospace & Données) :</div>
                  <div className="font-mono text-xs text-amber-500 truncate">
                    const dev = "{sampleText.slice(0, 30)}...";
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider block mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Choisir l'application typographique
            </label>

            <div className="space-y-3">
              {fontOptions.map((opt) => {
                const isSelected = typography === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setTypography(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer card-hover-classic relative ${
                      isSelected
                        ? isLight
                          ? 'bg-red-50/60 border-red-400 shadow-sm'
                          : 'bg-red-950/20 border-red-500 shadow-md'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-[#101424] border-[#1C2238] hover:border-[#2C3558]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {opt.title}
                          </h4>
                          {opt.id === 'classic' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-600 text-white font-medium">
                              Actif
                            </span>
                          )}
                        </div>
                        <div className={`text-xs font-medium mt-0.5 ${accentText}`}>
                          {opt.subtitle}
                        </div>
                        <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {opt.desc}
                        </p>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? `${accentBg} border-transparent text-white`
                            : isLight
                            ? 'border-slate-300'
                            : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TypeTogether License Notice */}
          <div
            className={`p-3.5 rounded-xl border text-[11px] leading-relaxed flex items-start gap-3 ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-[#0B0D16] border-[#1A1F33] text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Licence de la police : SIL Open Font License, Version 1.1
              </div>
              <p className="mt-0.5">
                Playwrite est une création originale de <strong>TypeTogether</strong> (The Playwrite Project Authors). Cette typographie manuscrite contemporaine est intégrée sous licence libre pour sublimer l'identité visuelle de Maelam Dias.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-[#1E2338] bg-[#0A0D17]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Mise à jour en temps réel</span>
          </div>

          <button
            onClick={onClose}
            className={`${accentBg} hover:opacity-90 text-white px-5 py-2 rounded-lg text-xs font-semibold btn-classic-hover cursor-pointer`}
          >
            Appliquer & Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
