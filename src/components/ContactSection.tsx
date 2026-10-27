import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Quote, Timer, Zap, ChevronRight, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';

interface ContactSectionProps {
  onOpenContact: () => void;
  onOpenBooking: () => void;
}

export function ContactSection({ onOpenBooking }: ContactSectionProps) {
  const { isLight, theme, accentBg, accentHoverBg } = useTheme();
  const isRed = theme === 'white-red' || theme === 'dark-red';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const TOTAL_HOURS = 12000;
  const [timeLeft, setTimeLeft] = useState({
    hours: 11999,
    days: 499,
    remHours: 23,
    minutes: 59,
    seconds: 52,
    millis: 75,
    percent: 99.9,
  });

  useEffect(() => {
    const STORAGE_KEY = 'maelam_cd_start_timestamp_v12k';
    let startTime = localStorage.getItem(STORAGE_KEY);
    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem(STORAGE_KEY, startTime);
    }
    const startMs = parseInt(startTime, 10);
    const totalMs = TOTAL_HOURS * 3600 * 1000;
    const endMs = startMs + totalMs;

    const interval = setInterval(() => {
      const now = Date.now();
      let diffMs = endMs - now;
      if (diffMs <= 0) diffMs = 0;

      const totalHoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
      const daysLeft = Math.floor(totalHoursLeft / 24);
      const remHours = totalHoursLeft % 24;
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      const millis = Math.floor((diffMs % 1000) / 10);
      const pct = Math.max(0, Math.min(100, parseFloat(((diffMs / totalMs) * 100).toFixed(1))));

      setTimeLeft({
        hours: totalHoursLeft,
        days: daysLeft,
        remHours,
        minutes,
        seconds,
        millis,
        percent: pct,
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const recipient = 'mailondiasbatista@gmail.com';
    const subjectText = formData.subject || 'Type de mission / Contact Portfolio';
    const bodyText = `Bonjour Maelam,\n\nNom: ${formData.name}\nEmail de contact: ${formData.email}\nType de mission: ${subjectText}\n\nMessage:\n${formData.message}`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailtoUrl;

    setSubmitSuccess(true);
    setSubmitError('');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section
      className={`py-20 md:py-24 border-b transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'border-[#141824] bg-[#090B12]'
      }`}
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Column 1: Interactive Contact Form */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-2 tracking-tight leading-snug ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Un projet ou une opportunité ?
            </h3>
            <p
              className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Ouvert aux opportunités en développement logiciel, support informatique et relation
              client polyglotte. Échangeons dès aujourd'hui !
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {submitSuccess && (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Message envoyé avec succès ! Merci de votre contact.</span>
                </div>
              )}

              {submitError && (
                <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-400 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in duration-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="contact-name"
                    className={`block text-[11px] font-semibold mb-1 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Votre Nom *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Dr. Dupont / MKS Tech"
                    className={`w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-red-500'
                        : 'bg-[#0D101C] border-[#1D243B] text-white placeholder:text-slate-500 focus:border-[#7262F6]'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className={`block text-[11px] font-semibold mb-1 ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    Adresse Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@exemple.com"
                    className={`w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-red-500'
                        : 'bg-[#0D101C] border-[#1D243B] text-white placeholder:text-slate-500 focus:border-[#7262F6]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className={`block text-[11px] font-semibold mb-1 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  Sujet *
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Développement Web / Mission Support / Offre Stage"
                  className={`w-full rounded-lg px-3.5 py-2 text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-red-500'
                      : 'bg-[#0D101C] border-[#1D243B] text-white placeholder:text-slate-500 focus:border-[#7262F6]'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className={`block text-[11px] font-semibold mb-1 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre besoin ou proposition..."
                  className={`w-full rounded-lg p-3 text-xs focus:outline-none transition-colors resize-none border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-red-500'
                      : 'bg-[#0D101C] border-[#1D243B] text-white placeholder:text-slate-500 focus:border-[#7262F6]'
                  }`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white px-6 py-2.5 rounded-lg text-xs font-semibold shadow-lg transition-all cursor-pointer ${accentBg} ${accentHoverBg} ${
                    isRed ? 'shadow-red-600/30' : 'shadow-[#5645EE]/30'
                  }`}
                >
                  <span>Envoyer la demande</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Column 2: Testimonial Card with Spotlight Sheen */}
        <SpotlightCard
          className={`lg:col-span-4 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative shadow-lg card-hover-classic border ${
            isLight
              ? 'bg-slate-50 border-slate-200 shadow-slate-200/50 hover:border-red-200 hover:shadow-xl'
              : 'bg-[#0D101C] border-[#1A2033] hover:border-[#2C3554] hover:shadow-xl'
          }`}
        >
          <div>
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
                isLight
                  ? 'bg-red-50 text-red-600'
                  : isRed
                  ? 'bg-red-950/50 text-red-400'
                  : 'bg-[#5645EE]/15 text-[#7262F6]'
              }`}
            >
              <Quote className="w-4 h-4 fill-current" />
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed italic mb-4 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              "Esprit d'équipe, rigueur professionnelle, excellente communication et gestion du
              stress. Capable de s'adapter rapidement aux nouveaux environnements."
            </p>
            <div
              className={`text-xs font-semibold space-y-1 ${
                isRed ? 'text-red-600' : 'text-[#9C8EFF]'
              }`}
            >
              <div>• Portugais — Langue maternelle</div>
              <div>• Français — Courant</div>
              <div>• Anglais — Débutant</div>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 pt-4 border-t mt-4 ${
              isLight ? 'border-slate-200' : 'border-[#171D2F]'
            }`}
          >
            <img
              alt="Maelam Dias"
              className={`w-10 h-10 rounded-full object-cover border ${
                isLight ? 'border-slate-300' : 'border-[#2B3352]'
              }`}
              src={PORTFOLIO_DATA.profile.avatarUrl}
            />
            <div>
              <div
                className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}
              >
                Maelam Dias Batista Correia
              </div>
              <div
                className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}
              >
                Technicien Informatique & Relation Client
              </div>
              <div className="font-playwrite text-xs text-red-600 mt-0.5">
                Maelam Dias ~
              </div>
            </div>
          </div>
        </SpotlightCard>

        {/* Column 3: Futuristic 12,000 Hours Countdown Timer */}
        <div className="lg:col-span-3 flex flex-col justify-between">
          <SpotlightCard
            className={`relative rounded-2xl p-5 shadow-xl backdrop-blur-md overflow-hidden flex flex-col justify-between h-full card-hover-classic border ${
              isLight
                ? 'bg-white border-red-200 shadow-red-500/5 hover:border-red-300 hover:shadow-xl'
                : isRed
                ? 'bg-[#0E1122]/90 border-red-500/30 shadow-red-950/20 hover:border-red-500/50 hover:shadow-xl'
                : 'bg-[#0E1122]/90 border-purple-500/30 shadow-purple-950/20 hover:border-purple-500/50 hover:shadow-xl'
            }`}
          >
            {/* Ambient corner glow inside card */}
            <div
              className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none anim-ambient-glow ${
                isRed ? 'bg-red-500/20' : 'bg-[#6050EA]/20'
              }`}
            />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4
                    className={`text-xs font-bold tracking-wide uppercase ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Compte à Rebours
                  </h4>
                  <p
                    className={`text-[11px] font-mono ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    12,000 Heures Dédiées
                  </p>
                </div>
                <Timer className={`w-4 h-4 ${isRed ? 'text-red-600' : 'text-[#7262F6]'}`} />
              </div>

              {/* Digits Grid: 4 Glassmorphic boxes */}
              <div className="grid grid-cols-2 gap-2 mb-4 font-mono">
                {/* Total Hours Box */}
                <div
                  className={`rounded-xl p-2.5 text-center relative overflow-hidden group border transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-red-300'
                      : 'bg-[#13172B]/90 border-[#232B4A] hover:border-red-500/40'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    HEURES
                  </div>
                  <div
                    className={`text-xl font-extrabold tracking-tight ${
                      isLight ? 'text-red-600' : 'text-white drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                    }`}
                  >
                    {timeLeft.hours.toLocaleString('en-US')}
                  </div>
                  <div
                    className={`text-[9px] font-sans mt-0.5 ${
                      isRed ? 'text-red-600' : 'text-[#7262F6]'
                    }`}
                  >
                    ~{timeLeft.days}j {timeLeft.remHours}h
                  </div>
                </div>

                {/* Minutes Box */}
                <div
                  className={`rounded-xl p-2.5 text-center relative overflow-hidden group border transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-red-300'
                      : 'bg-[#13172B]/90 border-[#232B4A] hover:border-red-500/40'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    MINUTES
                  </div>
                  <div
                    className={`text-xl font-extrabold tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div
                    className={`text-[9px] font-sans mt-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    restantes
                  </div>
                </div>

                {/* Seconds Box */}
                <div
                  className={`rounded-xl p-2.5 text-center relative overflow-hidden group border transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-red-300'
                      : 'bg-[#13172B]/90 border-[#232B4A] hover:border-red-500/40'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    SECONDES
                  </div>
                  <div
                    className={`text-xl font-extrabold tracking-tight ${
                      isRed ? 'text-red-600' : 'text-[#9C8EFF]'
                    }`}
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div
                    className={`text-[9px] font-sans mt-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    synchro sec
                  </div>
                </div>

                {/* Milliseconds Box */}
                <div
                  className={`rounded-xl p-2.5 text-center relative overflow-hidden group border transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-red-300'
                      : 'bg-[#13172B]/90 border-[#232B4A] hover:border-red-500/40'
                  }`}
                >
                  <div
                    className={`text-[9px] uppercase tracking-wider mb-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    MILLISEC
                  </div>
                  <div
                    className={`text-xl font-extrabold tracking-tight ${
                      isRed ? 'text-red-500' : 'text-cyan-400'
                    }`}
                  >
                    {String(timeLeft.millis).padStart(2, '0')}
                  </div>
                  <div
                    className={`text-[9px] font-sans mt-0.5 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    temps réel
                  </div>
                </div>
              </div>
            </div>

            {/* Active Progress Bar & Status */}
            <div
              className={`pt-3 border-t ${isLight ? 'border-slate-100' : 'border-[#1C233C]'}`}
            >
              <div
                className={`flex items-center justify-between text-[10px] font-mono mb-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Zap className={`w-3 h-3 ${isRed ? 'text-red-600' : 'text-[#7262F6]'}`} />
                  Cycle Actif
                </span>
                <span className={`font-semibold ${isRed ? 'text-red-600' : 'text-[#9C8EFF]'}`}>
                  {timeLeft.percent}%
                </span>
              </div>
              <div
                className={`w-full h-1.5 rounded-full overflow-hidden border ${
                  isLight
                    ? 'bg-slate-100 border-slate-200'
                    : 'bg-[#141829] border-[#20273F]/70'
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isRed
                      ? 'bg-gradient-to-r from-red-600 via-rose-500 to-red-400'
                      : 'bg-gradient-to-r from-[#5B4EE4] via-[#7965F4] to-[#22d3ee]'
                  }`}
                  style={{ width: `${timeLeft.percent}%` }}
                />
              </div>
              <div
                className={`mt-3 flex items-center justify-between text-[10px] ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isRed ? 'bg-red-500' : 'bg-cyan-400'}`}
                  />
                  Prêt pour mission
                </span>
                <button
                  onClick={onOpenBooking}
                  className={`font-medium flex items-center gap-0.5 transition-colors cursor-pointer group ${
                    isRed ? 'text-red-600 hover:text-red-700' : 'text-[#7262F6] hover:text-[#9C8EFF]'
                  }`}
                >
                  <span>Réserver</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
