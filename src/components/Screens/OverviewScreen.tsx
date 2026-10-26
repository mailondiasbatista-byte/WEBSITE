import { HeroSection } from '../HeroSection';
import { AboutSection } from '../AboutSection';
import { SkillsSection } from '../SkillsSection';
import { ProjectsSection } from '../ProjectsSection';
import { ContactSection } from '../ContactSection';
import { Project } from '../../data/portfolioData';

interface OverviewScreenProps {
  onOpenProjects: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenBooking: () => void;
  onSelectProject: (p: Project) => void;
  onLearnMore: () => void;
  onSelectTechnology?: (tech: string) => void;
  onOpenAmbiance?: () => void;
}

export function OverviewScreen({
  onOpenProjects,
  onOpenResume,
  onOpenContact,
  onOpenBooking,
  onSelectProject,
  onLearnMore,
  onSelectTechnology,
  onOpenAmbiance,
}: OverviewScreenProps) {
  return (
    <div>
      <HeroSection
        onOpenProjects={onOpenProjects}
        onOpenResume={onOpenResume}
        onSelectTechnology={onSelectTechnology}
        onOpenAmbiance={onOpenAmbiance}
      />
      <AboutSection onLearnMore={onLearnMore} />
      <SkillsSection />
      <ProjectsSection onSelectProject={onSelectProject} />
      <ContactSection onOpenContact={onOpenContact} onOpenBooking={onOpenBooking} />
    </div>
  );
}
