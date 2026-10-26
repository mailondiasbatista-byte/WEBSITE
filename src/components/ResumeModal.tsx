import { useState } from 'react';
import { X, Printer, Download, Mail, MapPin, GraduationCap, Code2, Globe2, Award, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, accentBg, accentHoverBg, accentText } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#0F1322] border border-[#27304E] rounded-2xl shadow-2xl overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141A30] border-b border-[#212946]">
          <div className="flex items-center gap-2">
            <GraduationCap className={`w-5 h-5 ${accentText}`} />
            <span className="font-bold text-white text-sm">Curriculum Vitae — Maelam Dias</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B223E] hover:bg-[#252E52] text-xs font-semibold text-slate-200 transition-colors cursor-pointer border border-[#2F3B66]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimer / PDF</span>
            </button>
            <button
              onClick={handleCopyEmail}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer ${accentBg} ${accentHoverBg}`}
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Email Copié' : 'Contacter'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1C233C] transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8 bg-[#0D101C]">
          {/* Header Profile Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#1E2540]">
            <img
              src={PORTFOLIO_DATA.profile.avatarUrl}
              alt="Maelam Dias"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#5B4EE4]/50 shadow-lg shrink-0"
            />
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {PORTFOLIO_DATA.profile.name}
              </h1>
              <p className="text-[#9C8EFF] font-semibold text-sm sm:text-base mt-1">
                Technicien Informatique & Spécialiste Relation Client (Polyglotte)
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#7262F6]" />
                  {PORTFOLIO_DATA.profile.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7262F6]" />
                  Settat, Maroc (Mobilité internationale)
                </span>
              </div>
            </div>
          </div>

          {/* Profil Professionnel */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#9C8EFF] uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7262F6]"></span>
              Profil Professionnel
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#121628] p-4 rounded-xl border border-[#1E243E]">
              {PORTFOLIO_DATA.profile.extendedBio}
            </p>
          </div>

          {/* Formation & Diplômes */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#9C8EFF] uppercase mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#7262F6]" />
              Formation & Diplômes
            </h2>
            <div className="space-y-4">
              {PORTFOLIO_DATA.profile.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-[#121628] border border-[#1E243E] rounded-xl p-4 relative pl-5 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-1 before:bg-[#6050EA] before:rounded-r"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                    <span className="text-xs font-mono text-[#9C8EFF] bg-[#1A1F36] px-2 py-0.5 rounded border border-[#2E3760]">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mb-2">{edu.institution}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences Techniques */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#9C8EFF] uppercase mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#7262F6]" />
              Compétences Techniques Clés
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_DATA.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-[#121628] border border-[#1E243E] rounded-xl p-3.5 flex items-start gap-3"
                >
                  <span
                    className={`w-6 h-6 ${skill.badgeBg} ${skill.badgeTextColor} rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}
                  >
                    {skill.badge}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{skill.name}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{skill.level}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {skill.tools.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181D33] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Langues & Polyglotte */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#9C8EFF] uppercase mb-4 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#7262F6]" />
              Langues Maîtrisées (Spécialiste Relation Client)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PORTFOLIO_DATA.profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="bg-[#121628] border border-[#1E243E] rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-1">{lang.flag}</div>
                  <div className="text-sm font-bold text-white">{lang.name}</div>
                  <div className="text-xs text-[#9C8EFF] font-semibold mt-0.5">{lang.level}</div>
                  <div className="w-full bg-[#181D30] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#6050EA] to-cyan-400 h-full rounded-full"
                      style={{ width: `${lang.proficiency}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-2">{lang.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualités Humaines & Professionnelles */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-[#9C8EFF] uppercase mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#7262F6]" />
              Qualités Professionnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {PORTFOLIO_DATA.profile.qualities.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#111424] border border-[#1D243D]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signature manuscrite Playwrite */}
          <div className="pt-4 border-t border-[#1D243D] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 font-mono">Signature certifiée :</div>
              <div className="font-playwrite text-lg text-red-500 font-normal">
                Maelam Dias Batista Correia
              </div>
            </div>
            <div className="text-right text-[10px] text-slate-400 font-mono">
              Validé pour missions techniques • 2026
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141A30] border-t border-[#212946]">
          <span className="text-xs text-slate-400">
            Document certifié conforme • FSTS Settat (2026)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1B223E] hover:bg-[#252E52] text-xs font-semibold text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
