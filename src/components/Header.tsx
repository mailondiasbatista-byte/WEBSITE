import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenContact: () => void;
  onOpenTypography?: () => void;
  onOpenAmbiance?: () => void;
}

export function Header({
  activeTab,
  setActiveTab,
  onOpenContact,
  onOpenTypography,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLight } = useTheme();

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À Propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-xl transition-all border-b ${
        isLight
          ? 'bg-white/95 border-slate-200 shadow-sm'
          : 'bg-[#030407]/90 border-white/10 shadow-2xl shadow-black/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight group cursor-pointer text-left focus:outline-none"
        >
          <span className={isLight ? 'text-slate-900 font-extrabold' : 'text-white font-bold tracking-tight'}>
            Maelam<span className="text-red-500">.dev</span>
          </span>
        </button>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? `${
                        isLight
                          ? 'text-red-600 font-bold after:bg-red-600'
                          : 'text-white font-semibold after:bg-red-500 after:shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                      } after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]`
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Button & Typography Trigger */}
        <div className="flex items-center gap-3">
          {/* Typography Trigger */}
          {onOpenTypography && (
            <button
              onClick={onOpenTypography}
              title="Personnaliser la typographie"
              className={`hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
                isLight
                  ? 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-red-600'
                  : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white hover:border-red-500/30'
              }`}
            >
              <span className="font-playwrite text-sm text-red-500">Aa</span>
              <span>Typographie</span>
            </button>
          )}

          <button
            onClick={onOpenContact}
            className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
              isLight
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]'
            }`}
          >
            <span>Me Contacter</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-5 backdrop-blur-2xl animate-in slide-in-from-top-2 ${
            isLight
              ? 'bg-white/95 border-slate-200'
              : 'bg-[#030407]/95 border-white/10 shadow-2xl'
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? isLight
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'bg-red-950/40 border border-red-500/30 text-white font-semibold'
                    : isLight
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-slate-300 hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {onOpenTypography && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTypography();
                }}
                className={`text-left py-2.5 px-3.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/[0.06]'
                }`}
              >
                <span>Typographie</span>
                <span className="font-playwrite text-red-500 text-sm">Aa</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
