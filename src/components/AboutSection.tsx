import { Calendar, Smile, Code2, Trophy, User } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';

interface AboutSectionProps {
  onLearnMore: () => void;
  onSelectStat?: (title: string) => void;
}

export function AboutSection({ onLearnMore, onSelectStat }: AboutSectionProps) {
  const { isLight, theme, typography, accentText } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';
  const iconColor = isRed ? 'text-red-600' : 'text-[#7262F6]';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar':
        return <Calendar className={`w-5 h-5 ${iconColor}`} />;
      case 'smile':
        return <Smile className={`w-5 h-5 ${iconColor}`} />;
      case 'code':
        return <Code2 className={`w-5 h-5 ${iconColor}`} />;
      case 'trophy':
      default:
        return <Trophy className={`w-5 h-5 ${iconColor}`} />;
    }
  };

  return (
    <section
      className={`py-20 md:py-24 border-b relative transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200' : 'border-[#141824]'
      }`}
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: About Text */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <div className="font-playwrite text-sm text-red-600 mb-2">
            « Rigueur technique &amp; écoute humaine »
          </div>

          <h2
            className={`text-3xl sm:text-4xl leading-tight mb-4 ${
              typography === 'playwrite-prominent'
                ? 'font-playwrite font-normal text-2xl sm:text-3xl'
                : 'font-extrabold tracking-tight'
            } ${isLight ? 'text-slate-900' : 'text-white'}`}
          >
            Passionné par le développement
            <br />
            et les solutions informatiques
          </h2>

          <p
            className={`text-sm leading-relaxed mb-8 max-w-lg ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Capable de résoudre des problèmes complexes, de m'adapter rapidement à de nouveaux
            environnements et d'assurer un service et une relation client de haute qualité en
            plusieurs langues (Portugais natif, Français courant, Anglais débutant).
          </p>

          <button
            onClick={onLearnMore}
            className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-semibold btn-classic-hover cursor-pointer shadow-sm ${
              isLight
                ? 'border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 hover:border-red-300'
                : 'border border-[#272D43] bg-[#0E1220] hover:bg-[#151B2E] text-slate-200 hover:border-[#6050EA]/50'
            }`}
          >
            <span>En Savoir Plus</span>
            <User className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
          </button>
        </div>

        {/* Right: 2x2 Stats Grid with Spotlight Sheen */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <SpotlightCard
              key={idx}
              onClick={() => onSelectStat?.(stat.title)}
              className={`rounded-xl p-6 flex items-center gap-4 card-hover-classic cursor-pointer group border ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/10'
                  : 'bg-[#0F121E] border-[#1E2338] hover:border-[#384166] hover:shadow-xl hover:shadow-[#5645EE]/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 relative z-20 ${
                  isLight
                    ? 'bg-red-50 border-red-200 group-hover:bg-red-100'
                    : isRed
                    ? 'bg-red-950/40 border-red-800/50 group-hover:bg-red-900/50'
                    : 'bg-[#5845EE]/15 border-[#5845EE]/30 group-hover:bg-[#5845EE]/25'
                }`}
              >
                {getIcon(stat.icon)}
              </div>
              <div className="relative z-20">
                <div
                  className={`text-2xl font-extrabold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-red-600'
                      : 'text-white group-hover:text-red-400'
                  }`}
                >
                  {stat.title}
                </div>
                <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {stat.subtitle}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
