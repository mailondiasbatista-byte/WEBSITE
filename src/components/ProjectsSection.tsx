import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects?: () => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { isLight, theme, typography, accentText } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  return (
    <section
      className={`py-20 md:py-24 relative transition-colors ${
        isLight ? 'bg-slate-50' : ''
      }`}
      id="projects"
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
            Projets &amp; Expériences Réalisés
          </h2>
          <p className={`text-xs mt-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Sélection de réalisations techniques en développement logiciel, administration et coordination
          </p>
        </div>

        {/* 3 Projects Grid with Spotlight Sheen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PORTFOLIO_DATA.projects.map((project) => (
            <SpotlightCard
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`rounded-2xl overflow-hidden flex flex-col group cursor-pointer card-hover-classic border ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-red-300 hover:shadow-2xl hover:shadow-red-500/10'
                  : 'bg-[#0C0F1A] border-[#1A1F31] hover:border-[#384166] hover:shadow-2xl hover:shadow-[#5B4EE4]/10'
              }`}
            >
              {/* Card Media Preview Header */}
              <div
                className={`p-4 border-b relative ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#111422] border-[#191F33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isLight ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {project.num}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border ${
                      isLight
                        ? 'text-red-700 bg-red-50 border-red-200 font-semibold'
                        : 'text-slate-400 bg-[#161B2E] border-[#212842]'
                    }`}
                  >
                    {project.year}
                  </span>
                </div>

                {/* Project UI Screenshot Mockup */}
                <div
                  className={`mt-2 h-44 rounded-lg overflow-hidden border relative flex items-center justify-center p-2 ${
                    isLight ? 'bg-slate-900 border-slate-800' : 'bg-[#0A0D17] border-[#1E253E]'
                  }`}
                >
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover rounded opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Card Body & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-base font-bold mb-1.5 transition-colors leading-snug ${
                      isLight
                        ? 'text-slate-900 group-hover:text-red-600'
                        : 'text-white group-hover:text-red-400'
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {project.shortDesc}
                  </p>

                  {/* Technology Badges preview */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isLight
                            ? 'bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-[#13172A] text-slate-300 border-[#212946]'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 ${
                          isLight ? 'text-slate-500' : 'text-slate-500'
                        }`}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between pt-3 border-t ${
                    isLight ? 'border-slate-100' : 'border-[#161B2B]'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isLight ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {project.role.split('&')[0]}
                  </span>
                  <div
                    className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isRed ? 'text-red-600 hover:text-red-700' : 'text-[#7262F6] hover:text-[#8D7FFE]'
                    }`}
                  >
                    <span>Détails du Projet</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ring-4 ${
              isRed ? 'bg-red-600 ring-red-600/20' : 'bg-[#6552EE] ring-[#6552EE]/20'
            }`}
          />
          <span
            className={`w-2 h-2 rounded-full ${
              isLight ? 'bg-slate-300' : 'bg-[#1F253C]'
            }`}
          />
          <span
            className={`w-2 h-2 rounded-full ${
              isLight ? 'bg-slate-300' : 'bg-[#1F253C]'
            }`}
          />
        </div>
      </div>
    </section>
  );
}
