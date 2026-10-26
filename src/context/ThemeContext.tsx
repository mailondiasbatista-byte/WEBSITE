import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'white-red' | 'dark-red' | 'violet-dark';
export type TypographyType = 'classic' | 'playwrite-prominent' | 'pure-sans';
export type AmbianceLevel = 'maximum' | 'subtle' | 'minimal';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  typography: TypographyType;
  setTypography: (t: TypographyType) => void;
  ambianceLevel: AmbianceLevel;
  setAmbianceLevel: (l: AmbianceLevel) => void;
  particlesEnabled: boolean;
  setParticlesEnabled: (enabled: boolean) => void;
  spotlightEnabled: boolean;
  setSpotlightEnabled: (enabled: boolean) => void;
  isLight: boolean;
  accentText: string;
  accentBg: string;
  accentHoverBg: string;
  accentBorder: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default is 'dark-red' (fundo preto profissional com detalhes vermelhos)
  const [theme, setTheme] = useState<ThemeType>('dark-red');
  const [typography, setTypography] = useState<TypographyType>('classic');
  const [ambianceLevel, setAmbianceLevel] = useState<AmbianceLevel>('maximum');
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);
  const [spotlightEnabled, setSpotlightEnabled] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('maelam_portfolio_theme') as ThemeType;
    if (saved && (saved === 'dark-red' || saved === 'white-red' || saved === 'violet-dark')) {
      // If user previously had white-red, upgrade to dark-red as requested
      if (saved === 'white-red') {
        setTheme('dark-red');
        localStorage.setItem('maelam_portfolio_theme', 'dark-red');
      } else {
        setTheme(saved);
      }
    } else {
      setTheme('dark-red');
      localStorage.setItem('maelam_portfolio_theme', 'dark-red');
    }

    const savedTypo = localStorage.getItem('maelam_portfolio_typography') as TypographyType;
    if (savedTypo && (savedTypo === 'classic' || savedTypo === 'playwrite-prominent' || savedTypo === 'pure-sans')) {
      setTypography(savedTypo);
    } else {
      setTypography('classic');
    }

    const savedAmbiance = localStorage.getItem('maelam_portfolio_ambiance') as AmbianceLevel;
    if (savedAmbiance && (savedAmbiance === 'maximum' || savedAmbiance === 'subtle' || savedAmbiance === 'minimal')) {
      setAmbianceLevel(savedAmbiance);
      if (savedAmbiance === 'minimal') {
        setParticlesEnabled(false);
      }
    } else {
      setAmbianceLevel('maximum');
    }

    const savedParticles = localStorage.getItem('maelam_portfolio_particles');
    if (savedParticles !== null) {
      setParticlesEnabled(savedParticles === 'true');
    }

    const savedSpotlight = localStorage.getItem('maelam_portfolio_spotlight');
    if (savedSpotlight !== null) {
      setSpotlightEnabled(savedSpotlight === 'true');
    }
  }, []);

  const handleSetTheme = (t: ThemeType) => {
    setTheme(t);
    localStorage.setItem('maelam_portfolio_theme', t);
  };

  const handleSetTypography = (t: TypographyType) => {
    setTypography(t);
    localStorage.setItem('maelam_portfolio_typography', t);
  };

  const handleSetAmbianceLevel = (l: AmbianceLevel) => {
    setAmbianceLevel(l);
    localStorage.setItem('maelam_portfolio_ambiance', l);
    if (l === 'minimal') {
      setParticlesEnabled(false);
      localStorage.setItem('maelam_portfolio_particles', 'false');
    } else {
      setParticlesEnabled(true);
      localStorage.setItem('maelam_portfolio_particles', 'true');
    }
  };

  const handleSetParticlesEnabled = (enabled: boolean) => {
    setParticlesEnabled(enabled);
    localStorage.setItem('maelam_portfolio_particles', String(enabled));
  };

  const handleSetSpotlightEnabled = (enabled: boolean) => {
    setSpotlightEnabled(enabled);
    localStorage.setItem('maelam_portfolio_spotlight', String(enabled));
  };

  const isLight = theme === 'white-red';
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const accentText = isRed ? 'text-red-600' : 'text-[#7262F6]';
  const accentBg = isRed ? 'bg-red-600' : 'bg-[#5645EE]';
  const accentHoverBg = isRed ? 'hover:bg-red-700' : 'hover:bg-[#4837E2]';
  const accentBorder = isRed ? 'border-red-500/30' : 'border-[#342D6B]/50';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        typography,
        setTypography: handleSetTypography,
        ambianceLevel,
        setAmbianceLevel: handleSetAmbianceLevel,
        particlesEnabled,
        setParticlesEnabled: handleSetParticlesEnabled,
        spotlightEnabled,
        setSpotlightEnabled: handleSetSpotlightEnabled,
        isLight,
        accentText,
        accentBg,
        accentHoverBg,
        accentBorder,
      }}
    >
      <div
        className={
          isLight
            ? 'theme-white-red bg-slate-50 text-slate-800'
            : theme === 'dark-red'
            ? 'theme-dark-red bg-[#030407] text-slate-100'
            : 'theme-violet-dark bg-[#07080E] text-slate-200'
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
