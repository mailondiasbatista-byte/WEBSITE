import { useState } from 'react';
import { Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA, Skill } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

export function SkillsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<Skill>(PORTFOLIO_DATA.skills[0]);
  const { isLight, theme, accentText, accentBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const categories = [
    { id: 'all', label: 'Toutes les compétences' },
    { id: 'dev', label: 'Développement & POO' },
    { id: 'system', label: 'Systèmes & Linux' },
    { id: 'database', label: 'Bases de Données' },
    { id: 'tools', label: 'Outils & Environnements' },
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Compétences & <span className={accentText}>Technologies</span>
        </h1>
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Un socle solide articulé autour de la programmation orientée objet, du développement web
          sécurisé, de l'administration Linux et de la gestion de bases de données.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? `${accentBg} text-white shadow-lg ${isRed ? 'shadow-red-600/30' : 'shadow-[#5645EE]/30'}`
                : isLight
                ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'bg-[#0E1220] border border-[#1E253E] text-slate-400 hover:text-white hover:bg-[#141A2D]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Skills List on Left, Interactive Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Skills List */}
        <div className="lg:col-span-6 space-y-4">
          {filteredSkills.map((skill) => {
            const isActive = activeSkill.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => setActiveSkill(skill)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? isLight
                      ? 'bg-white border-red-500 shadow-xl shadow-red-500/10'
                      : 'bg-[#12162B] border-red-500 shadow-xl shadow-red-500/10'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-[#0C0F1B] border-[#1C2237] hover:border-[#2D3654] hover:bg-[#101426]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 ${skill.badgeBg} ${skill.badgeTextColor} rounded-lg flex items-center justify-center text-xs font-extrabold shadow-sm`}
                    >
                      {skill.badge}
                    </span>
                    <h3
                      className={`text-sm font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {skill.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isRed ? 'text-red-600' : 'text-[#9C8EFF]'
                      }`}
                    >
                      {skill.level}%
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? `translate-x-1 ${accentText}`
                          : isLight
                          ? 'text-slate-400'
                          : 'text-slate-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden mb-3 ${
                    isLight ? 'bg-slate-200' : 'bg-[#181D2E]'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isRed
                        ? 'bg-gradient-to-r from-red-600 to-rose-400'
                        : 'bg-gradient-to-r from-[#5B4EE4] to-[#22d3ee]'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Skill Inspector Card */}
        <div
          className={`lg:col-span-6 sticky top-28 border rounded-2xl p-6 sm:p-8 shadow-2xl ${
            isLight
              ? 'bg-white border-slate-200 shadow-slate-200/60'
              : 'bg-[#0D101E] border-[#232B45]'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-6 border-b mb-6 ${
              isLight ? 'border-slate-200' : 'border-[#1E2540]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-10 h-10 ${activeSkill.badgeBg} ${activeSkill.badgeTextColor} rounded-xl flex items-center justify-center text-sm font-extrabold`}
              >
                {activeSkill.badge}
              </span>
              <div>
                <h3
                  className={`text-lg font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {activeSkill.name}
                </h3>
                <span
                  className={`text-xs font-mono ${
                    isRed ? 'text-red-600' : 'text-[#9C8EFF]'
                  }`}
                >
                  Niveau de maîtrise : {activeSkill.level}%
                </span>
              </div>
            </div>
            <span
              className={`text-[11px] font-mono px-2.5 py-1 rounded border ${
                isLight
                  ? 'text-red-700 bg-red-50 border-red-200 font-semibold'
                  : 'text-red-400 bg-red-950/40 border-red-800/40'
              }`}
            >
              Opérationnel
            </span>
          </div>

          <div
            className={`space-y-6 text-xs ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <div>
              <h4
                className={`font-bold uppercase tracking-wider mb-2 text-[11px] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Description & Portée
              </h4>
              <p
                className={`leading-relaxed p-3.5 rounded-xl border ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-[#111425] border-[#1D233C]'
                }`}
              >
                {activeSkill.description}
              </p>
            </div>

            <div>
              <h4
                className={`font-bold uppercase tracking-wider mb-2.5 text-[11px] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                Outils, Frameworks & Bibliothèques
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {activeSkill.tools.map((tool) => (
                  <div
                    key={tool}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#111425] border-[#1D233C] text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span className="font-mono">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contextual Terminal / Code Preview */}
            <div>
              <h4
                className={`font-bold uppercase tracking-wider mb-2 text-[11px] flex items-center gap-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <Terminal className={`w-3.5 h-3.5 ${accentText}`} />
                <span>Environnement d'exécution</span>
              </h4>
              <div className="bg-[#070911] border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 space-y-1.5">
                <div className="text-slate-500"># Diagnostic système & versioning</div>
                <div className="text-red-400">$ java -version && php -v && uname -a</div>
                <div className="text-slate-400">openjdk 17.0.10 LTS / PHP 8.2 / Linux Ubuntu 22.04</div>
                <div className="text-slate-500 pt-1"># Statut des services critiques</div>
                <div className="text-rose-400">mysql.service: active (running) [Port 3306]</div>
                <div className="text-rose-400">apache2.service: active (running) [Port 80/443]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
