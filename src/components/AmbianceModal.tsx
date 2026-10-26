import { useState } from 'react';
import { X, Sparkles, Wand2, Check, Zap, Eye, Sliders, ShieldCheck } from 'lucide-react';
import { useTheme, AmbianceLevel } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';

interface AmbianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AmbianceModal({ isOpen, onClose }: AmbianceModalProps) {
  const {
    ambianceLevel,
    setAmbianceLevel,
    particlesEnabled,
    setParticlesEnabled,
    spotlightEnabled,
    setSpotlightEnabled,
    isLight,
    theme,
    accentText,
    accentBg,
  } = useTheme();

  const [previewHover, setPreviewHover] = useState(false);
  const isRed = theme === 'white-red' || theme === 'dark-red';

  if (!isOpen) return null;

  const presets: {
    id: AmbianceLevel;
    title: string;
    badge: string;
    desc: string;
    features: string[];
  }[] = [
    {
      id: 'maximum',
      title: 'Niveau Maximal — Style & Ambiance (Actif)',
      badge: 'Recommandé',
      desc: 'Expérience digne des standards Awwwards / Apple / Linear. Réaction fluide au curseur, constellation vivante et éclairage dynamique.',
      features: [
        'Constellation de particules avec répulsion dynamique au curseur',
        'Spotlight Cards : reflets radiaux et contour illuminé au survol',
        'Halo respiratoire organique (8s) & cartes flottantes en apesanteur',
        'Courbes de transition Apple (cubic-bezier 0.16, 1, 0.3, 1)',
      ],
    },
    {
      id: 'subtle',
      title: 'Subtil & Discret',
      badge: 'Épuré',
      desc: 'Mouvements adoucis avec moins de particules, pour une navigation discrète et reposante.',
      features: [
        'Densité de particules réduite de 50%',
        'Spotlight card doux et tamisé',
        'Micro-interactions de boutons tactiles',
      ],
    },
    {
      id: 'minimal',
      title: 'Minimaliste & Sans Particules',
      badge: 'Statique',
      desc: 'Zéro élément continu en arrière-plan. Performance statique absolue respectant les préférences de réduction de mouvement.',
      features: [
        'Désactivation totale du canvas de particules',
        'Effet de survol classique sans halo suiveur',
        'Transition instantanée et sobre',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#0E111C] border-[#20273F] text-slate-200'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-[#1E2338] bg-[#0A0D17]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isLight
                  ? 'bg-red-50 text-red-600'
                  : isRed
                  ? 'bg-red-950/50 text-red-400'
                  : 'bg-indigo-950 text-indigo-400'
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2
                className={`text-base font-bold flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <span>Style &amp; Ambiance : Animations Haute Précision</span>
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Physique cinématique, particules interactives et éclairages au survol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Preset Selection */}
          <div className="space-y-3">
            <label className={`text-xs font-bold uppercase tracking-wider ${accentText}`}>
              1. Choisir le Degré d'Animation
            </label>
            <div className="grid grid-cols-1 gap-3">
              {presets.map((preset) => {
                const isSelected = ambianceLevel === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => setAmbianceLevel(preset.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? isLight
                          ? 'border-red-500 bg-red-50/40 shadow-sm'
                          : 'border-red-500 bg-red-950/20 shadow-sm'
                        : isLight
                        ? 'border-slate-200 hover:border-slate-300 bg-white'
                        : 'border-[#1E2338] hover:border-slate-700 bg-[#121626]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected
                              ? 'border-red-500 bg-red-600 text-white'
                              : 'border-slate-400'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5" />}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            isSelected
                              ? isLight
                                ? 'text-red-600'
                                : 'text-white'
                              : isLight
                              ? 'text-slate-900'
                              : 'text-slate-200'
                          }`}
                        >
                          {preset.title}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          isSelected
                            ? isLight
                              ? 'bg-red-100 text-red-700'
                              : 'bg-red-900/40 text-red-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {preset.badge}
                      </span>
                    </div>

                    <p
                      className={`text-xs ml-6 mb-2.5 leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {preset.desc}
                    </p>

                    <ul className="ml-6 space-y-1">
                      {preset.features.map((feat, i) => (
                        <li
                          key={i}
                          className={`text-[11px] flex items-center gap-1.5 ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          <span className={`w-1 h-1 rounded-full ${isRed ? 'bg-red-500' : 'bg-indigo-400'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Feature Switches */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className={`text-xs font-bold uppercase tracking-wider ${accentText}`}>
              2. Paramètres Détaillés
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Particles Switch */}
              <div
                onClick={() => setParticlesEnabled(!particlesEnabled)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  particlesEnabled
                    ? isLight
                      ? 'bg-red-50/30 border-red-200'
                      : 'bg-red-950/20 border-red-900/40'
                    : isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#121626] border-[#1E2338]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Constellation Interactive</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Particules et liaisons en direct
                  </div>
                </div>
                <div
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                    particlesEnabled ? (isRed ? 'bg-red-600' : 'bg-indigo-600') : 'bg-slate-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      particlesEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Spotlight Switch */}
              <div
                onClick={() => setSpotlightEnabled(!spotlightEnabled)}
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  spotlightEnabled
                    ? isLight
                      ? 'bg-red-50/30 border-red-200'
                      : 'bg-red-950/20 border-red-900/40'
                    : isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#121626] border-[#1E2338]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Spotlight Cards</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Reflets et contours suiveurs
                  </div>
                </div>
                <div
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                    spotlightEnabled ? (isRed ? 'bg-red-600' : 'bg-indigo-600') : 'bg-slate-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      spotlightEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Interactive Specimen Preview */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${accentText}`}>
                3. Test en Direct (Déplacez votre curseur ci-dessous)
              </span>
            </div>
            <SpotlightCard
              className={`p-5 rounded-xl border text-center transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 shadow-sm'
                  : 'bg-[#121626] border-[#222944]'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400">
                  &lt;Éclairage Spotlight Actif /&gt;
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Ce composant reflète en temps réel les coordonnées de votre souris avec un halo doux
                  et une bordure réactive.
                </p>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  Ambiance : {ambianceLevel.toUpperCase()} • 60 FPS • Easing Apple
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-[#1E2338] bg-[#0A0D17]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Paramètres enregistrés automatiquement</span>
          </div>
          <button
            onClick={onClose}
            className={`${accentBg} text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-md hover:opacity-90 transition-opacity`}
          >
            Fermer &amp; Découvrir
          </button>
        </div>
      </div>
    </div>
  );
}
