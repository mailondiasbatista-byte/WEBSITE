import { GraduationCap, Globe2, Award, Download, UserCheck, HeartHandshake } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

interface AboutScreenProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export function AboutScreen({ onOpenResume, onOpenContact }: AboutScreenProps) {
  const { isLight, theme, accentText, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  return (
    <div className="py-12 md:py-16 w-full px-6 sm:px-10 lg:px-14 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Qui est <span className={accentText}>Maelam Dias</span> ?
        </h1>
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Technicien Informatique rigoureux et développeur de logiciels polyglotte, engagé dans la
          conception de solutions logicielles performantes et un service usagers irréprochable.
        </p>
      </div>

      {/* Profile & Narrative Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-3xl blur-xl opacity-30 ${
                isRed ? 'bg-gradient-to-tr from-red-600 to-rose-400' : 'bg-gradient-to-tr from-[#5B4EE4] to-[#22d3ee]'
              }`}
            />
            <img
              src={PORTFOLIO_DATA.profile.avatarUrl}
              alt={PORTFOLIO_DATA.profile.name}
              className={`relative z-10 w-72 sm:w-80 h-96 object-cover rounded-2xl border shadow-2xl ${
                isLight ? 'border-slate-300' : 'border-[#2B3454]'
              }`}
            />
            <div
              className={`absolute -bottom-4 -right-4 z-20 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs font-mono border ${
                isLight ? 'bg-white/95 border-slate-200 text-slate-800' : 'bg-[#0F1325]/95 border-[#232B45] text-slate-200'
              }`}
            >
              <span className={`font-semibold ${accentText}`}>Statut :</span> 3e Année DEUST MIP
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div
            className={`border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm ${
              isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#0C0F1B] border-[#1C2237] text-slate-300'
            }`}
          >
            <h2
              className={`text-xl font-bold flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              <UserCheck className={`w-5 h-5 ${accentText}`} />
              <span>Vision & Démarche Professionnelle</span>
            </h2>
            <p className="text-sm leading-relaxed">{PORTFOLIO_DATA.profile.extendedBio}</p>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Mon parcours m'a permis d'acquérir une double compétence précieuse : la rigueur
              conceptuelle du développement orienté objet (Java, PHP, SQL) et l'aisance
              relationnelle indispensable pour gérer les interactions usagers, résoudre les
              incidents au quotidien et animer des équipes polyglottes.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenResume}
                className={`flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-lg transition-all cursor-pointer ${accentBg} ${accentHoverBg} ${
                  isRed ? 'shadow-red-600/25' : 'shadow-[#5645EE]/25'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Voir le CV Complet</span>
              </button>
              <button
                onClick={onOpenContact}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  isLight
                    ? 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    : 'border-[#2A314A] hover:border-slate-400 bg-[#121626] text-white'
                }`}
              >
                <HeartHandshake className={`w-4 h-4 ${accentText}`} />
                <span>Proposer une collaboration</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diplômes & Formations Section */}
      <div className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2
            className={`text-2xl sm:text-3xl font-extrabold ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Formation & Diplômes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.profile.education.map((edu, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-6 transition-all ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-red-300 shadow-sm'
                  : 'bg-[#0C0F1B] border-[#1C2237] hover:border-[#384166]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                    isLight
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : isRed
                      ? 'bg-red-950/40 border-red-800 text-red-400'
                      : 'bg-[#5645EE]/15 border-[#5645EE]/30 text-[#7262F6]'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </span>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded border ${
                    isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-[#161B2E] text-[#9C8EFF] border-[#252E4E]'
                  }`}
                >
                  {edu.period}
                </span>
              </div>
              <h3
                className={`text-base font-bold mb-1 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {edu.degree}
              </h3>
              <div className={`text-xs font-semibold mb-3 ${accentText}`}>{edu.institution}</div>
              <p
                className={`text-xs leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Langues & Polyglotte Section */}
      <div
        className={`mb-16 border rounded-2xl p-6 sm:p-8 shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E19] border-[#191F33]'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Globe2 className={`w-6 h-6 ${accentText}`} />
          <div>
            <h2
              className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}
            >
              Compétences Linguistiques (Polyglotte)
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Un atout majeur pour les entreprises internationales et le support client multilingue
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.profile.languages.map((lang) => (
            <div
              key={lang.name}
              className={`border rounded-xl p-5 text-center flex flex-col justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#101424] border-[#1E2540]'
              }`}
            >
              <div>
                <div className="text-3xl mb-2">{lang.flag}</div>
                <h3
                  className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}
                >
                  {lang.name}
                </h3>
                <div className={`text-xs font-semibold mt-1 ${accentText}`}>{lang.level}</div>
                <p
                  className={`text-xs mt-2 leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {lang.note}
                </p>
              </div>
              <div
                className={`mt-4 pt-4 border-t ${
                  isLight ? 'border-slate-200' : 'border-[#192036]'
                }`}
              >
                <div
                  className={`flex justify-between text-[11px] font-mono mb-1 ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <span>Maîtrise</span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {lang.proficiency}%
                  </span>
                </div>
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden ${
                    isLight ? 'bg-slate-200' : 'bg-[#181D30]'
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      isRed
                        ? 'bg-gradient-to-r from-red-600 to-rose-400'
                        : 'bg-gradient-to-r from-[#6050EA] to-cyan-400'
                    }`}
                    style={{ width: `${lang.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualités et Soft Skills */}
      <div
        className={`border rounded-2xl p-6 sm:p-8 shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0C0F1B] border-[#1C2237]'
        }`}
      >
        <h2
          className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <Award className={`w-5 h-5 ${accentText}`} />
          <span>Qualités Humaines & Savoir-Être Professionnel</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PORTFOLIO_DATA.profile.qualities.map((q, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl flex items-start gap-3 border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121629] border-[#212948]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
              <span
                className={`text-xs font-medium leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {q}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
