import { useState } from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
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
  onOpenAmbiance,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLight, theme, accentText, accentBg, accentHoverBg, ambianceLevel } = useTheme();

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

  const isRed = theme === 'white-red' || theme === 'dark-red';
  const activeBarColor = isRed ? 'after:bg-red-600' : 'after:bg-[#6050EA]';

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-md transition-colors border-b ${
        isLight
          ? 'bg-white/95 border-slate-200 shadow-sm'
          : 'bg-[#08090E]/90 border-[#171B2B]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-xl font-bold tracking-tight group cursor-pointer text-left"
        >
          <span
            className={`font-mono font-semibold transition-transform group-hover:-translate-x-0.5 ${accentText}`}
          >
            &lt;/&gt;
          </span>
          <span className={isLight ? 'text-slate-900 font-extrabold' : 'text-white'}>
            Maelam.dev
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
                className={`transition-colors cursor-pointer relative pb-1 ${
                  isActive
                    ? `${isLight ? 'text-red-600 font-bold' : 'text-white font-semibold'} after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] ${activeBarColor}`
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

        {/* CTA Button, Typographie & Ambiance Triggers */}
        <div className="flex items-center gap-2">
          {/* Ambiance & Animation Trigger */}
          <button
            onClick={onOpenAmbiance}
            title="Style & Ambiance : Configurer les animations et particules"
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${
              isLight
                ? 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-red-600'
                : 'border-[#262B40] bg-[#0E1220] hover:bg-[#151B2E] text-slate-300 hover:text-red-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Ambiance</span>
            <span
              className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                isLight ? 'bg-red-50 text-red-700 font-bold' : 'bg-red-950/60 text-red-300'
              }`}
            >
              {ambianceLevel === 'maximum' ? 'MAX' : ambianceLevel === 'subtle' ? 'FLUIDE' : 'OFF'}
            </span>
          </button>

          {/* Typography Trigger */}
          <button
            onClick={onOpenTypography}
            title="Personnaliser et afficher la typographie (Playwrite / Inter)"
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors border cursor-pointer ${
              isLight
                ? 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-red-600'
                : 'border-[#262B40] bg-[#0E1220] hover:bg-[#151B2E] text-slate-300 hover:text-red-400'
            }`}
          >
            <span className="font-playwrite text-sm text-red-600">Aa</span>
            <span>Typographie</span>
          </button>

          <button
            onClick={onOpenContact}
            className={`${accentBg} ${accentHoverBg} text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-lg btn-classic-hover cursor-pointer ${
              isRed ? 'shadow-red-600/30 hover:shadow-red-600/50' : 'shadow-[#5645EE]/30 hover:shadow-[#5645EE]/50'
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
                : 'text-slate-400 hover:text-white hover:bg-[#141824]'
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
          className={`md:hidden border-b px-6 py-4 backdrop-blur-xl animate-in slide-in-from-top-2 ${
            isLight
              ? 'bg-white/95 border-slate-200'
              : 'bg-[#0A0D18]/95 border-[#1E2338]'
          }`}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? isLight
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'bg-[#181B30] text-[#9C8EFF] font-semibold'
                    : isLight
                    ? 'text-slate-700 hover:bg-slate-100'
                    : 'text-slate-300 hover:bg-[#121626]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAmbiance?.();
              }}
              className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-[#121626]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>Style &amp; Ambiance</span>
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isLight ? 'bg-red-50 text-red-700 font-bold' : 'bg-red-950/60 text-red-300'
                }`}
              >
                {ambianceLevel.toUpperCase()}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTypography?.();
              }}
              className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-[#121626]'
              }`}
            >
              <span>Typographie (Playwrite / Inter)</span>
              <span className="font-playwrite text-red-600 text-sm">Aa</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
