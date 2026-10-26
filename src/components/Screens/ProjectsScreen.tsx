import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

interface ProjectsScreenProps {
  onSelectProject: (p: Project) => void;
}

export function ProjectsScreen({ onSelectProject }: ProjectsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { isLight, theme, accentText, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'web', label: 'Développement Web' },
    { id: 'system', label: 'Systèmes & Linux' },
    { id: 'database', label: 'Coordination & DB' },
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          Projets & <span className={accentText}>Réalisations</span>
        </h1>
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          Explorez les réalisations concrètes menées dans le cadre de stages professionnels, projets
          de fin d'études et administration d'infrastructures.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
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

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par techno..."
            className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none transition-colors border ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-red-500'
                : 'bg-[#0E1220] border-[#1E253E] text-slate-200 placeholder:text-slate-500 focus:border-[#7262F6]'
            }`}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`rounded-2xl overflow-hidden transition-all flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-xl border ${
              isLight
                ? 'bg-white border-slate-200 hover:border-red-300 hover:shadow-red-500/10'
                : 'bg-[#0C0F1A] border-[#1A1F31] hover:border-[#384166] hover:shadow-[#5B4EE4]/10'
            }`}
          >
            {/* Project Image Banner */}
            <div
              className={`p-4 border-b relative ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#111422] border-[#191F33]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 font-mono text-xs font-semibold">
                  Projet {project.num}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isLight
                      ? 'text-red-700 bg-red-50 border-red-200'
                      : 'text-[#9C8EFF] bg-[#161B2E] border-[#212842]'
                  }`}
                >
                  {project.year}
                </span>
              </div>
              <div
                className={`h-48 rounded-lg overflow-hidden border relative flex items-center justify-center p-2 ${
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

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  className={`text-lg font-bold mb-2 transition-colors leading-snug ${
                    isLight
                      ? 'text-slate-900 group-hover:text-red-600'
                      : 'text-white group-hover:text-red-400'
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed mb-4 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  {project.shortDesc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
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
                </div>
              </div>

              <div
                className={`pt-3 border-t flex items-center justify-between ${
                  isLight ? 'border-slate-100' : 'border-[#161B2B]'
                }`}
              >
                <span
                  className={`text-[11px] font-medium ${
                    isLight ? 'text-slate-500' : 'text-slate-500'
                  }`}
                >
                  {project.clientOrContext}
                </span>
                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isRed
                      ? 'text-red-600 group-hover:text-red-700'
                      : 'text-[#7262F6] group-hover:text-[#8D7FFE]'
                  }`}
                >
                  <span>Détails</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
