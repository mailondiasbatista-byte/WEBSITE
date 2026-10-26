import { useState } from 'react';
import { X, CheckCircle2, Copy, Check, ChevronLeft, ChevronRight, Code, ShieldCheck, Cpu } from 'lucide-react';
import { Project, PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export function ProjectDetailModal({ project, onClose, onSelectProject }: ProjectDetailModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const { theme, accentBg, accentHoverBg, accentText } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  if (!project) return null;

  const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? PORTFOLIO_DATA.projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < PORTFOLIO_DATA.projects.length - 1
      ? PORTFOLIO_DATA.projects[currentIndex + 1]
      : null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0C0F1D] border border-[#232B45] rounded-2xl shadow-2xl overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#11162B] border-b border-[#1E2540]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#1B1936] text-[#9C8EFF] font-semibold border border-[#342D6B]/50">
              PROJET {project.num}
            </span>
            <span className="text-xs text-slate-400 font-mono">{project.year}</span>
            <span className="text-xs text-slate-400">• {project.clientOrContext}</span>
          </div>

          <div className="flex items-center gap-2">
            {prevProject && (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A2038] transition-colors"
                title={`Précédent : ${prevProject.title}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A2038] transition-colors"
                title={`Suivant : ${nextProject.title}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A2038] transition-colors cursor-pointer ml-2"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Header Title & Media */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{project.fullDesc}</p>
          </div>

          {/* Project Screenshot Mockup Banner */}
          <div className="rounded-xl overflow-hidden border border-[#222A47] bg-[#080A12] relative group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F1D] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-xs font-mono bg-black/70 backdrop-blur-md px-3 py-1 rounded text-white border border-white/10">
                Rôle : {project.role}
              </span>
            </div>
          </div>

          {/* Metrics & Performance stats */}
          {project.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.stats.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#12162A] border border-[#212946] rounded-xl p-3.5 text-center"
                >
                  <div className="text-xl font-extrabold text-[#9C8EFF]">{st.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Stack & Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Features Checklist */}
            <div className="bg-[#101427] border border-[#1E2540] rounded-xl p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                <ShieldCheck className="w-4 h-4 text-[#7262F6]" />
                <span>Fonctionnalités Clés & Réalisations</span>
              </div>
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div className="bg-[#101427] border border-[#1E2540] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                  <Cpu className="w-4 h-4 text-[#7262F6]" />
                  <span>Environnement & Technologies</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-lg bg-[#181E38] text-xs font-mono text-[#A89CFF] border border-[#2E3760] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#0A0D18] rounded-lg border border-[#1B223B] text-xs text-slate-400">
                <span className="font-semibold text-slate-200">Validation :</span> Livré et validé
                dans le cadre des projets académiques et professionnels à la FSTS Settat.
              </div>
            </div>
          </div>

          {/* Code Implementation Snippet */}
          {project.codeSnippet && (
            <div className="bg-[#090B14] border border-[#1E2540] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#12162B] border-b border-[#1E2540]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Code className="w-3.5 h-3.5 text-[#7262F6]" />
                  <span>Extrait de code source / Logique métier</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-[#1A2038] hover:bg-[#232B4A] transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copié</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-[#070911]">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0F1325] border-t border-[#1C233C]">
          <div className="text-xs text-slate-400">
            Intéressé par une réalisation similaire ?
          </div>
          <button
            onClick={onClose}
            className={`text-white px-5 py-2 rounded-lg text-xs font-semibold shadow-md transition-colors cursor-pointer ${accentBg} ${accentHoverBg}`}
          >
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </div>
  );
}
