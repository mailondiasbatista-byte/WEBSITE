import { Heart, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenContact?: () => void;
  onOpenResume?: () => void;
}

export function Footer({ onOpenContact, onOpenResume }: FooterProps) {
  const { isLight, accentText } = useTheme();

  return (
    <footer
      className={`py-7 text-xs border-t transition-colors ${
        isLight
          ? 'bg-slate-100 border-slate-200 text-slate-600'
          : 'bg-[#06070B] border-[#121522] text-slate-500'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2025 {PORTFOLIO_DATA.profile.name}. Tous droits réservés.
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={onOpenResume}
            className={`transition-colors cursor-pointer ${
              isLight ? 'text-slate-600 hover:text-red-600' : 'text-slate-400 hover:text-white'
            }`}
          >
            Curriculum Vitae
          </button>
          <a
            href={`mailto:${PORTFOLIO_DATA.profile.email}`}
            className={`transition-colors flex items-center gap-1.5 ${
              isLight ? 'text-slate-600 hover:text-red-600' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{PORTFOLIO_DATA.profile.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-1">
          <span>Conçu avec</span>
          <Heart className="w-3.5 h-3.5 text-red-600 fill-current inline mx-0.5" />
          <span>pour {PORTFOLIO_DATA.profile.shortName}</span>
        </div>
      </div>
    </footer>
  );
}
