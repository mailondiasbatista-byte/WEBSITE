import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewScreen } from './components/Screens/OverviewScreen';
import { AboutScreen } from './components/Screens/AboutScreen';
import { SkillsScreen } from './components/Screens/SkillsScreen';
import { ProjectsScreen } from './components/Screens/ProjectsScreen';
import { ContactScreen } from './components/Screens/ContactScreen';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { TypographyModal } from './components/TypographyModal';
import { AmbianceModal } from './components/AmbianceModal';
import { ScrollProgress } from './components/ScrollProgress';
import { Project, PORTFOLIO_DATA } from './data/portfolioData';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [viewMode] = useState<'single-page' | 'screen-views'>('single-page');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [typographyOpen, setTypographyOpen] = useState(false);
  const [ambianceOpen, setAmbianceOpen] = useState(false);
  const [bookingMissionType, setBookingMissionType] = useState<string>('');

  const { theme, isLight, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (viewMode === 'single-page') {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    setBookingMissionType('Mission 12,000 Heures Dédiées');
    setContactOpen(true);
  };

  const handleOpenContactWithSubject = (subject?: string) => {
    setBookingMissionType(subject || 'Opportunité Professionnelle');
    setContactOpen(true);
  };

  // Scroll spy for single page mode
  useEffect(() => {
    if (viewMode !== 'single-page') return;

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  return (
    <div
      className={`min-h-screen font-sans antialiased flex flex-col justify-between transition-colors duration-300 ${
        isLight ? 'bg-white text-slate-800' : 'bg-[#030407] text-slate-200'
      } ${isRed ? 'selection:bg-red-600 selection:text-white' : 'selection:bg-[#5B4EE4] selection:text-white'}`}
    >

      {/* Global Scroll Progress Bar */}
      <ScrollProgress />

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenContact={() => handleOpenContactWithSubject('Prise de contact directe')}
        onOpenTypography={() => setTypographyOpen(true)}
        onOpenAmbiance={() => setAmbianceOpen(true)}
      />

      {/* Main Body Content based on View Mode */}
      <main className="flex-1">
        {viewMode === 'single-page' ? (
          <OverviewScreen
            onOpenProjects={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenResume={() => setResumeOpen(true)}
            onOpenContact={() => handleOpenContactWithSubject('Proposition de collaboration')}
            onOpenBooking={handleOpenBooking}
            onSelectProject={(p) => setSelectedProject(p)}
            onLearnMore={() => setResumeOpen(true)}
            onOpenAmbiance={() => setAmbianceOpen(true)}
            onSelectTechnology={(tech) => {
              const el = document.getElementById('skills');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ) : (
          <div>
            {activeTab === 'home' && (
              <OverviewScreen
                onOpenProjects={() => setActiveTab('projects')}
                onOpenResume={() => setResumeOpen(true)}
                onOpenContact={() => handleOpenContactWithSubject('Proposition')}
                onOpenBooking={handleOpenBooking}
                onSelectProject={(p) => setSelectedProject(p)}
                onLearnMore={() => setActiveTab('about')}
                onOpenAmbiance={() => setAmbianceOpen(true)}
              />
            )}
            {activeTab === 'about' && (
              <AboutScreen
                onOpenResume={() => setResumeOpen(true)}
                onOpenContact={() => handleOpenContactWithSubject('Contact depuis À Propos')}
              />
            )}
            {activeTab === 'skills' && <SkillsScreen />}
            {activeTab === 'projects' && (
              <ProjectsScreen onSelectProject={(p) => setSelectedProject(p)} />
            )}
            {activeTab === 'contact' && <ContactScreen />}
          </div>
        )}
      </main>

      {/* Main Footer */}
      <Footer
        onOpenContact={() => handleOpenContactWithSubject('Contact footer')}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Interactive Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Curriculum Vitae Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Contact & Mission Booking Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultMissionType={bookingMissionType}
      />

      {/* Typography System & Specimen Modal */}
      <TypographyModal
        isOpen={typographyOpen}
        onClose={() => setTypographyOpen(false)}
      />

      {/* Style & Ambiance Animation Settings Modal */}
      <AmbianceModal
        isOpen={ambianceOpen}
        onClose={() => setAmbianceOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
