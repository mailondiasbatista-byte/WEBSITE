import { useState } from 'react';
import { ArrowUpRight, Download, Check, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { AmbientMeshCanvas } from './AmbientMeshCanvas';
import { SpotlightCard } from './SpotlightCard';

interface HeroSectionProps {
  onOpenProjects: () => void;
  onOpenResume: () => void;
  onSelectTechnology?: (tech: string) => void;
  onOpenAmbiance?: () => void;
}

export function HeroSection({
  onOpenProjects,
  onOpenResume,
  onSelectTechnology,
  onOpenAmbiance,
}: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const { isLight, theme, typography, accentText, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const codeSnippetJS = `const developer = {
  name: "Maelam Dias",
  title: "Technicien & Dev",
  skills: ["Java", "PHP", "JS", "Linux"],
  languages: ["PT (Natif)", "FR", "EN"]
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippetJS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className={`relative pt-12 pb-24 md:py-24 overflow-hidden transition-colors ${
        isLight ? 'bg-white' : ''
      }`}
      id="home"
    >
      {/* Dynamic 60fps Interactive Constellation & Mesh Canvas */}
      <AmbientMeshCanvas />

      {/* Background Ambient Glow */}
      <div
        className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none anim-ambient-glow ${
          isRed ? 'bg-red-500/10' : 'bg-[#5B4EE4]/15'
        }`}
      />

      <div className="w-full px-6 sm:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Handwritten greeting in Playwrite */}
          <div className="anim-fade-up flex items-center gap-3 mb-2 flex-wrap">
            <span className={`font-playwrite text-base sm:text-lg font-normal ${accentText}`}>
              Bonjour, je suis
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`leading-[1.15] mb-5 anim-fade-up anim-delay-100 ${
              typography === 'playwrite-prominent'
                ? 'font-playwrite text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-wide'
                : 'text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight'
            } ${isLight ? 'text-slate-900' : 'text-white'}`}
          >
            <span className={accentText}>{PORTFOLIO_DATA.profile.headlineHighlight}</span>
            <br />
            {PORTFOLIO_DATA.profile.headlineRest}
          </h1>


          {/* Subtitle / Intro */}
          <p
            className={`text-sm sm:text-base max-w-xl font-normal leading-relaxed mb-8 anim-fade-up anim-delay-200 ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            {PORTFOLIO_DATA.profile.bio}
          </p>

          {/* Buttons Group */}
          <div className="flex flex-wrap items-center gap-4 mb-14 anim-fade-up anim-delay-300">
            <button
              onClick={onOpenProjects}
              className={`${accentBg} ${accentHoverBg} text-white px-6 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg btn-classic-hover cursor-pointer ${
                isRed ? 'shadow-red-600/30' : 'shadow-[#5645EE]/25'
              }`}
            >
              <span>Voir Mes Projets</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onOpenResume}
              className={`px-6 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 btn-classic-hover cursor-pointer ${
                isLight
                  ? 'border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 shadow-sm'
                  : 'border border-[#262B40] hover:border-slate-500 bg-[#0C0F1A]/80 hover:bg-[#121626] text-white'
              }`}
            >
              <span>Télécharger CV</span>
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Technologies Footer Row */}
          <div className="w-full pt-4 anim-fade-up anim-delay-400">
            <p
              className={`text-[11px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2 ${
                isLight ? 'text-slate-500' : 'text-slate-500'
              }`}
            >
              <span>Technologies I Work With</span>
              <span
                className={`h-px flex-1 max-w-[120px] ${
                  isLight ? 'bg-slate-200' : 'bg-[#1D2235]'
                }`}
              ></span>
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {PORTFOLIO_DATA.technologiesPills.map((tech) => (
                <button
                  key={tech.name}
                  onClick={() => onSelectTechnology?.(tech.title)}
                  title={tech.title}
                  className={`w-10 h-10 rounded-lg ${tech.bg} border ${tech.border} flex items-center justify-center p-2 font-bold ${tech.color} text-xs transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-md cursor-pointer group relative`}
                >
                  <span>{tech.name}</span>
                  <span
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md ${
                      isLight
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'bg-[#121626] text-slate-200 border border-[#21273F]'
                    }`}
                  >
                    {tech.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Visual / Portrait Column */}
        <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0 anim-fade-up anim-delay-200">
          {/* Decorative Squiggle */}
          <div className="absolute -left-6 top-1/2 -translate-y-8 z-20 hidden md:block transition-transform hover:scale-105">
            <svg
              fill="none"
              height="60"
              stroke={isRed ? '#DC2626' : '#6050EA'}
              strokeLinecap="round"
              strokeWidth="2.5"
              viewBox="0 0 50 65"
              width="45"
            >
              <path d="M5 25 C15 5, 30 10, 25 35 C20 55, 38 60, 45 40" strokeDasharray="1 0" />
            </svg>
          </div>

          {/* Dot Matrix Decoration */}
          <div className="absolute -top-6 right-6 grid grid-cols-5 gap-2 opacity-35 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <span
                key={i}
                className={`w-1 h-1 rounded-full ${isLight ? 'bg-slate-400' : 'bg-slate-400'}`}
              />
            ))}
          </div>

          {/* Portrait Center Wrapper with Circular Backdrop */}
          <div className="relative w-[340px] sm:w-[410px] h-[410px] flex items-center justify-center">
            {/* Glowing Orb / Circle Backdrop with organic gentle breathing animation */}
            <div className="absolute w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] rounded-full glow-circle shadow-2xl anim-breathe" />

            {/* Developer Portrait */}
            <img
              alt="Maelam Dias Batista Correia"
              className="relative z-10 w-[270px] sm:w-[320px] h-[370px] object-cover rounded-2xl sm:rounded-3xl drop-shadow-2xl brightness-95 contrast-105 select-none transition-transform duration-700 hover:scale-[1.01]"
              src={PORTFOLIO_DATA.profile.avatarUrl}
            />

            {/* Floating Code Card Overlay with classical weightless float & Spotlight Sheen */}
            <SpotlightCard
              className={`absolute -bottom-4 right-0 sm:-right-6 z-20 border rounded-xl p-4 shadow-2xl backdrop-blur-md w-64 sm:w-72 font-mono text-left anim-float ${
                isLight
                  ? 'bg-slate-900/95 border-slate-700 text-slate-200 shadow-slate-950/20'
                  : 'bg-[#0C0E18]/95 border-[#21273F] text-slate-200 shadow-black/50'
              }`}
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-700 relative z-20">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-300">Code Profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    title="Copier le code"
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded hover:bg-slate-800"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-red-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Syntax highlighted code */}
              <div className="text-[11px] leading-relaxed text-slate-300 font-mono relative z-20">
                <div>
                  <span className={isRed ? 'text-red-400 font-semibold' : 'text-[#7262F6] font-semibold'}>
                    const
                  </span>{' '}
                  <span className="text-blue-300">developer</span> = &#123;
                </div>
                <div className="pl-3">
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-amber-300">"Maelam Dias"</span>,
                </div>
                <div className="pl-3">
                  <span className="text-slate-400">title:</span>{' '}
                  <span className="text-amber-300">"Technicien & Dev"</span>,
                </div>
                <div className="pl-3">
                  <span className="text-slate-400">skills:</span> [
                  <span className="text-amber-300">"Java"</span>,{' '}
                  <span className="text-amber-300">"PHP"</span>,{' '}
                  <span className="text-amber-300">"JS"</span>,{' '}
                  <span className="text-amber-300">"Linux"</span>],
                </div>
                <div className="pl-3">
                  <span className="text-slate-400">languages:</span> [
                  <span className="text-amber-300">"PT (Natif)"</span>,{' '}
                  <span className="text-amber-300">"FR"</span>,{' '}
                  <span className="text-amber-300">"EN"</span>]
                </div>
                <div>&#125;;</div>
              </div>

              {copied && (
                <div
                  className={`mt-2 text-[10px] font-sans font-medium text-center py-0.5 rounded border relative z-20 ${
                    isRed
                      ? 'text-red-300 bg-red-950/40 border-red-800/40'
                      : 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40'
                  }`}
                >
                  Copié dans le presse-papier !
                </div>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
