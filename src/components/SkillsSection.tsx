import { useState } from 'react';
import { GitBranch, Info, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, Skill } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { isLight, theme, typography } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const col1 = PORTFOLIO_DATA.skills.slice(0, 2);
  const col2 = PORTFOLIO_DATA.skills.slice(2, 4);
  const col3 = PORTFOLIO_DATA.skills.slice(4, 6);

  const renderSkillItem = (skill: Skill) => {
    const isSelected = selectedSkill?.name === skill.name;
    const isGit = skill.name.includes('Outils');

    return (
      <div
        key={skill.name}
        onClick={() => setSelectedSkill(isSelected ? null : skill)}
        className={`group cursor-pointer p-3 rounded-xl transition-all duration-300 border ${
          isLight
            ? 'hover:bg-slate-50 border-transparent hover:border-slate-200 hover:shadow-sm'
            : 'hover:bg-[#121626]/80 border-transparent hover:border-[#1E2338] hover:shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span
            className={`flex items-center gap-2.5 transition-colors ${
              isLight
                ? 'text-slate-800 group-hover:text-red-600'
                : 'text-white group-hover:text-red-400'
            }`}
          >
            {isGit ? (
              <GitBranch className="w-4 h-4 text-[#F05032]" />
            ) : (
              <span
                className={`w-4 h-4 ${skill.badgeBg} ${skill.badgeTextColor} flex items-center justify-center rounded-[3px] text-[10px] font-extrabold`}
              >
                {skill.badge}
              </span>
            )}
            <span>{skill.name}</span>
          </span>
          <div className="flex items-center gap-2">
            <span className={`font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {skill.level}%
            </span>
            <Info
              className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                isLight ? 'text-slate-400' : 'text-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full h-1.5 rounded-full overflow-hidden ${
            isLight ? 'bg-slate-200' : 'bg-[#181D2E]'
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isRed
                ? 'bg-red-600 group-hover:bg-red-700'
                : 'bg-[#6452EE] group-hover:bg-[#7E6BF5]'
            }`}
            style={{ width: `${skill.level}%` }}
          />
        </div>

        {/* Expandable info card */}
        {isSelected && (
          <div
            className={`mt-3 p-3 rounded-lg text-xs animate-in fade-in-50 duration-200 border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-[#111526] border-[#212845] text-slate-300'
            }`}
          >
            <p className="mb-2 leading-relaxed">{skill.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {skill.tools.map((tool) => (
                <span
                  key={tool}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium border flex items-center gap-1 ${
                    isLight
                      ? 'bg-white text-slate-700 border-slate-200'
                      : 'bg-[#1A1F36] text-[#A699FF] border-[#2F3763]/40'
                  }`}
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={`py-20 md:py-24 transition-colors ${
        isLight ? 'bg-white' : 'bg-[#0A0C13]'
      }`}
      id="skills"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2
            className={`text-3xl ${
              typography === 'playwrite-prominent'
                ? 'font-playwrite font-normal text-2xl sm:text-3xl'
                : 'font-extrabold tracking-tight'
            } ${isLight ? 'text-slate-900' : 'text-white'}`}
          >
            Compétences Techniques
          </h2>
          <p className={`text-xs mt-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Cliquez sur une compétence pour afficher les technologies et outils maîtrisés
          </p>
        </div>

        {/* 3-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
          <div className="space-y-6">{col1.map(renderSkillItem)}</div>
          <div className="space-y-6">{col2.map(renderSkillItem)}</div>
          <div className="space-y-6">{col3.map(renderSkillItem)}</div>
        </div>
      </div>
    </section>
  );
}
