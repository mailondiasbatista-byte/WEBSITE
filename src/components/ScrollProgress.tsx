import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { theme, isLight } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const pct = Math.min(100, Math.max(0, (currentScroll / scrollTotal) * 100));
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[2.5px] z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className={`h-full transition-all duration-150 ease-out relative ${
          isRed
            ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-500 shadow-[0_0_8px_rgba(220,38,38,0.7)]'
            : 'bg-gradient-to-r from-[#4E3BE4] via-[#6353F2] to-[#8C7EF8] shadow-[0_0_8px_rgba(99,79,237,0.7)]'
        }`}
        style={{ width: `${progress}%` }}
      >
        {/* Glow head */}
        {progress > 0 && (
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full blur-[2px] ${
              isRed ? 'bg-red-400' : 'bg-indigo-300'
            }`}
          />
        )}
      </div>
    </div>
  );
}
