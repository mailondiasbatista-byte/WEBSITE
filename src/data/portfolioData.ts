export interface Project {
  id: string;
  num: string;
  title: string;
  category: 'web' | 'java' | 'system' | 'database';
  shortDesc: string;
  fullDesc: string;
  image: string;
  clientOrContext: string;
  year: string;
  technologies: string[];
  keyFeatures: string[];
  role: string;
  stats?: { label: string; value: string }[];
  codeSnippet?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'dev' | 'system' | 'database' | 'tools';
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  description: string;
  tools: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Maelam Dias Batista Correia',
    shortName: 'Maelam Dias',
    badge: 'TECHNICIEN INFORMATIQUE & DÉVELOPPEUR',
    headline: 'Bonjour, je suis',
    headlineHighlight: 'Maelam Dias',
    headlineRest: 'Batista Correia.',
    bio: "Technicien Informatique & Spécialiste Relation Client (Polyglotte). Agent dynamique possédant une solide base technique en développement de logiciels et administration de systèmes.",
    extendedBio: "Étudiant passionné en 3e année (DEUST MIP - Mathématiques, Informatique, Physique à la Faculté des Sciences et Techniques de Settat - FSTS), je combine une solide maîtrise du développement (Java POO, PHP, JavaScript, bases de données relationnelles) avec l'administration de systèmes Linux Ubuntu et une expertise confirmée en relation client multilingue. Rigoureux, proactif et adaptable, je m'intègre rapidement dans des environnements techniques et multiculturels.",
    email: 'mailondiasbatista@gmail.com',
    location: 'Settat, Maroc / International',
    status: 'Disponible pour missions & opportunités',
    avatarUrl: '/assets/aistudio/WhatsApp_Image_2026-10-26_at_18.48.19_58bd1afe.jpeg',
    languages: [
      { name: 'Portugais', level: 'Langue maternelle', proficiency: 100, flag: '🇵🇹', note: 'Maîtrise bilingue native pour support et relation client' },
      { name: 'Français', level: 'Courant / Professionnel', proficiency: 95, flag: '🇫🇷', note: 'Études supérieures et communication technique quotidienne' },
      { name: 'Anglais', level: 'Intermédiaire / Débutant pro', proficiency: 65, flag: '🇬🇧', note: 'Lecture documentaire technique et échanges professionnels' },
    ],
    education: [
      {
        degree: 'DEUST MIP (Mathématiques, Informatique, Physique)',
        institution: 'Faculté des Sciences et Techniques de Settat (FSTS)',
        period: '2023 - 2026 (3e année en cours)',
        description: 'Formation pluridisciplinaire axée sur les algorithmes avancés, la programmation orientée objet, le développement web, les structures de données et les architectures systèmes.',
      },
      {
        degree: 'Baccalauréat Scientifique (12e année)',
        institution: 'Lycée Polytechnique Henrique Gimelez - Guinée-Bissau',
        period: '2019 - 2021',
        description: 'Formation d\'excellence en sciences fondamentales et technologie avec mention.',
      },
    ],
    qualities: [
      'Résolution de problèmes complexes et esprit critique',
      'Excellente gestion de la relation client & communication multilingue',
      'Adaptabilité rapide aux nouveaux frameworks et technologies',
      'Travail d\'équipe, esprit de collaboration et rigueur méthodologique',
      'Gestion du stress et sens des priorités en situation d\'urgence',
    ]
  },

  skills: [
    {
      name: 'Java (POO)',
      level: 90,
      category: 'dev',
      badge: 'J',
      badgeBg: 'bg-[#E44D26]',
      badgeTextColor: 'text-white',
      description: 'Programmation Orientée Objet avancée, design patterns, gestion des exceptions, threads et applications desktop et console.',
      tools: ['Java SE 17+', 'POO & Design Patterns', 'JDBC', 'Swing/JavaFX', 'Maven', 'IntelliJ IDEA']
    },
    {
      name: 'JavaScript & Web (HTML/CSS)',
      level: 88,
      category: 'dev',
      badge: 'JS',
      badgeBg: 'bg-[#F7DF1E]',
      badgeTextColor: 'text-black',
      description: 'Développement d\'interfaces web réactives modernes, manipulation dynamique du DOM, intégration d\'APIs REST et design Tailwind CSS.',
      tools: ['JavaScript (ES6+)', 'HTML5 sémantique', 'CSS3 moderne', 'DOM API', 'Fetch / Async', 'Tailwind CSS']
    },
    {
      name: 'PHP & Développement Web',
      level: 85,
      category: 'dev',
      badge: 'PHP',
      badgeBg: 'bg-[#3178C6]',
      badgeTextColor: 'text-white',
      description: 'Architecture MVC, programmation côté serveur sécurisée, validation formulaires, gestion des sessions et interfaçage base de données.',
      tools: ['PHP 8.x', 'Architecture MVC', 'Sessions & Sécurité', 'PDO / Prepared Statements', 'Apache', 'Composer']
    },
    {
      name: 'Gestion de bases de données MySQL',
      level: 85,
      category: 'database',
      badge: 'DB',
      badgeBg: 'bg-[#3178C6]',
      badgeTextColor: 'text-white',
      description: 'Conception relationnelle MERISE (MCD/MLD/MPD), modélisation des schémas, optimisation des requêtes SQL et indexation.',
      tools: ['MySQL Server', 'SQL DDL / DML', 'Jointures complexes', 'Indexation & Vues', 'phpMyAdmin', 'Normalisation 3NF']
    },
    {
      name: 'Administration Systèmes Linux (Ubuntu)',
      level: 85,
      category: 'system',
      badge: 'LX',
      badgeBg: 'bg-[#68A063]/20',
      badgeTextColor: 'text-[#68A063]',
      description: 'Administration quotidienne de serveurs Ubuntu, gestion des droits utilisateurs, scripts Bash, diagnostics réseau et sécurité de base.',
      tools: ['Ubuntu Server', 'Shell Bash & CLI', 'Gestion des packages (APT)', 'Permissions & Crontab', 'SSH & Pare-feu UFW', 'Systemd']
    },
    {
      name: 'Outils & Environnements de dev',
      level: 80,
      category: 'tools',
      badge: 'GIT',
      badgeBg: 'bg-[#F05032]/20',
      badgeTextColor: 'text-[#F05032]',
      description: 'Contrôle de version Git, gestion collaborative, environnements virtuels, éditeurs de code et outils de dépannage logiciel.',
      tools: ['Git & GitHub', 'VS Code', 'VirtualBox / KVM', 'Postman', 'Outils de diagnostic matériel', 'Helpdesk Ticketing']
    }
  ] as Skill[],

  technologiesPills: [
    { name: 'Java', color: 'text-[#E44D26]', bg: 'bg-[#E44D26]/10', border: 'border-[#E44D26]/40', title: 'Java (POO)' },
    { name: 'JS', color: 'text-[#F7DF1E]', bg: 'bg-[#F7DF1E]/10', border: 'border-[#F7DF1E]/30', title: 'JavaScript ES6+' },
    { name: 'PHP', color: 'text-[#3178C6]', bg: 'bg-[#3178C6]/15', border: 'border-[#3178C6]/40', title: 'PHP 8 Web Server' },
    { name: '5', color: 'text-[#E44D26]', bg: 'bg-[#141827]', border: 'border-[#20273F]', title: 'HTML5 Sémantique' },
    { name: '3', color: 'text-[#264DE4]', bg: 'bg-[#141827]', border: 'border-[#20273F]', title: 'CSS3 Moderne' },
    { name: 'Linux', color: 'text-[#68A063]', bg: 'bg-[#141827]', border: 'border-[#20273F]', title: 'Linux Ubuntu' },
    { name: 'SQL', color: 'text-[#3178C6]', bg: 'bg-[#3178C6]/15', border: 'border-[#3178C6]/40', title: 'MySQL Relational DB' },
  ],

  stats: [
    {
      icon: 'calendar',
      title: '3e Année',
      subtitle: 'DEUST MIP - FSTS Settat',
      description: 'Cursus universitaire approfondi en Mathématiques, Informatique et Physique.'
    },
    {
      icon: 'smile',
      title: 'Polyglotte',
      subtitle: 'Portugais, Français, Anglais',
      description: 'Capacité naturelle à communiquer avec des clients et collaborateurs internationaux.'
    },
    {
      icon: 'code',
      title: 'Linux & Web',
      subtitle: 'Ubuntu, Java, PHP & MySQL',
      description: 'Stack technique robuste orientée développement back-end et gestion système.'
    },
    {
      icon: 'trophy',
      title: '100%',
      subtitle: 'Rigueur & Engagement',
      description: 'Dévouement total pour livrer des solutions fiables et satisfaire les utilisateurs.'
    }
  ],

  projects: [
    {
      id: 'gestion-stock',
      num: '01',
      title: 'Système de Gestion de Stock Automatisé',
      category: 'web',
      shortDesc: "Projet de Fin d'Études / Stage - MKS Settat (2026). Développement d'un système complet de gestion de stock automatisé avec MySQL.",
      fullDesc: "Conception et réalisation d'une solution web et logicielle complète pour l'automatisation du flux des stocks de marchandises et de fournitures. Le projet intègre le suivi des entrées/sorties en temps réel, l'émission automatique d'alertes en cas de seuil critique, la génération de rapports d'inventaire détaillés et une interface d'administration sécurisée par rôles.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXMqK2U9Bd4lFjflSyoL-b_HI998R_JW50oVISAlCsb9FG4XSHfwnTvzsqxph3VGfMZXRVOVUwh5GD5o9NHsN-VDbsUOhdJNCG9DVGhj5lA8qa2wz4HiknejGRL4cV-aQU4Rjw42o7kJbBYBrdDPSqG62iwDtQAoSBOzat-6x_O8d23i49O8knAWX5ReU2fhUOXJR0dRcbMhS4MxUBs61k3ww326QN5ViA_jHH8JRUIYWt3wZcdaoQwA',
      clientOrContext: "Projet de Fin d'Études / Stage — Entreprise MKS Settat",
      year: '2026',
      technologies: ['PHP 8', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'Bootstrap/Tailwind', 'Apache'],
      role: 'Concepteur & Développeur Principal',
      keyFeatures: [
        'Gestion automatisée des articles, catégories, dépôts et fournisseurs',
        'Calcul des niveaux de stock de sécurité et alertes de réapprovisionnement automatiques',
        'Génération de bordereaux d’entrée et bons de sortie PDF instantanés',
        'Contrôle d’accès multi-utilisateurs (Administrateur, Magasinier, Gestionnaire)',
        'Tableau de bord statistique avec KPI d\'analyse des flux'
      ],
      stats: [
        { label: 'Gain de temps inventaire', value: '-65%' },
        { label: 'Précision du stock', value: '99.8%' },
        { label: 'Tables MySQL optimisées', value: '18 tables' }
      ],
      codeSnippet: `// Vérification et mise à jour automatique des seuils de stock
public function enregistrerSortie(int $articleId, int $quantite): bool {
    $this->db->beginTransaction();
    $stmt = $this->db->prepare("SELECT stock_actuel, seuil_alerte FROM articles WHERE id = ? FOR UPDATE");
    $stmt->execute([$articleId]);
    $article = $stmt->fetch();
    
    if ($article['stock_actuel'] < $quantite) {
        $this->db->rollBack();
        throw new Exception("Stock insuffisant pour cette opération.");
    }
    
    $nouveauStock = $article['stock_actuel'] - $quantite;
    $updateStmt = $this->db->prepare("UPDATE articles SET stock_actuel = ? WHERE id = ?");
    $updateStmt->execute([$nouveauStock, $articleId]);
    
    if ($nouveauStock <= $article['seuil_alerte']) {
        $this->notifierAlerteStock($articleId, $nouveauStock);
    }
    
    $this->db->commit();
    return true;
}`
    },
    {
      id: 'maintenance-systemes',
      num: '02',
      title: 'Maintenance & Administration Systèmes',
      category: 'system',
      shortDesc: "Administration de serveurs Linux Ubuntu, maintenance technique et résolution d'incidents logiciels au quotidien.",
      fullDesc: "Mise en place, sécurisation et maintenance préventive de parcs informatiques et serveurs d'infrastructure sous Linux Ubuntu. Implémentation de scripts Bash automatisés pour les sauvegardes programmées, configuration de services web (LAMP stack), gestion des permissions et support aux utilisateurs pour la résolution rapide des pannes matérielles et logicielles.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB56_j2RNs1galf0wDi2qYsBsMvTP2uuv3Y7brmx_CPJY53l-_06g1Jai1mZblHcXDQNSe5_dU9kpBKEhnmanXnLRt9bxYqqvBuVorjMiYWKES7qXp0e-tIDoQsMqXL8z7QJHXFgJ2rjiOOmPt_RqHfw2Hgl2INrHap7qwQXv-OVBMnRlxHR26LKM0hcmnoMb_E6tGcN3_rn6Uwxu1084ekLCk6zpgKw9hkJJQkoc94g7TeO13qlBqLOw',
      clientOrContext: "Laboratoire Universitaire & Environnements Réseau FSTS",
      year: '2024 - 2026',
      technologies: ['Linux Ubuntu', 'Bash Scripting', 'Apache2/Nginx', 'SSH / UFW', 'Cron', 'MySQL Server'],
      role: 'Administrateur Systèmes & Support Technique',
      keyFeatures: [
        'Automatisation des sauvegardes SQL quotidiennes et archivage chiffré',
        'Configuration des règles de pare-feu UFW et sécurisation des accès distants SSH',
        'Résolution des incidents logiciels sous Linux et Windows en un temps record',
        'Gestion des droits d’accès, quotas disques et surveillance de la charge CPU/RAM',
        'Documentation des procédures de dépannage et guides d\'utilisation'
      ],
      stats: [
        { label: 'Disponibilité serveurs', value: '99.5%' },
        { label: 'Temps moyen de résolution', value: '< 25 min' },
        { label: 'Scripts Bash actifs', value: '14 scripts' }
      ],
      codeSnippet: `#!/usr/bin/env bash
# Script d'automatisation des backups MySQL & Rotation des logs
BACKUP_DIR="/var/backups/db"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/sys_maintenance.log"

mkdir -p "$BACKUP_DIR"
echo "[$DATE] Début de la sauvegarde automatique..." >> "$LOG_FILE"

mysqldump --defaults-file=/etc/mysql/debian.cnf --all-databases | gzip > "$BACKUP_DIR/backup_all_$DATE.sql.gz"

if [ $? -eq 0 ]; then
    echo "[$DATE] Sauvegarde terminée avec succès." >> "$LOG_FILE"
    # Supprime les backups de plus de 14 jours
    find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +14 -delete
else
    echo "[$DATE] ERREUR lors du backup de la base de données!" >> "$LOG_FILE"
    exit 1
fi`
    },
    {
      id: 'relation-usagers',
      num: '03',
      title: 'Gestion Relation Usagers & Coordination',
      category: 'database',
      shortDesc: "Engagement Associatif & Pratique : gestion de la communication, relation avec les usagers et organisation d'activités en équipe.",
      fullDesc: "Coordination des relations usagers, gestion des requêtes multilingues et mise en place d'un système de suivi des demandes au sein de structures associatives et étudiantes. Utilisation des compétences polyglottes (Portugais, Français, Anglais) pour accueillir, guider et assister les personnes, tout en organisant les plannings et les événements avec méthode et empathie.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo_T19dkkaMcQ64M9zA1nG_JVjVv9JtfvzsH1yzctw7ukm3DHmUJdQ4Siyq1S7jof45KtXCzFlzdZB8vsg3VBvyJ8S4WTGBSdxdXLUGWU9KO359I-mU4A93PC8DFP0VJtu_2WkvOjesZxwVZKeBZtbwWKu_oKAHh-zyNo4-RPw8so8DHebF5-01Rf-r7bTErmGm20LEkQDbBjSVI0H4yetIGeYsCKYOvpR2G6wPqbYKc6buCOuTE03sw',
      clientOrContext: "Vie Associative & Relation Usagers FSTS",
      year: '2023 - 2026',
      technologies: ['Coordination', 'Communication Polyglotte', 'Outils Collaboratifs', 'Gestion de Conflits', 'Reporting'],
      role: 'Coordinateur & Médiateur Relation Usagers',
      keyFeatures: [
        'Accueil et assistance des usagers et nouveaux étudiants en 3 langues',
        'Mise en place d\'une grille d\'évaluation et de traitement des réclamations',
        'Planification et coordination logistique d\'événements et séminaires techniques',
        'Facilitation de la communication entre équipes techniques et usagers finaux',
        'Rédaction de comptes-rendus et bilans d’activité mensuels'
      ],
      stats: [
        { label: 'Taux de satisfaction usagers', value: '98%' },
        { label: 'Langues d\'accueil actives', value: '3 langues' },
        { label: 'Événements coordonnés', value: '15+ events' }
      ],
      codeSnippet: `// Système de priorisation et dispatch des requêtes usagers
interface TicketUsager {
  id: string;
  nom: string;
  langue: 'PT' | 'FR' | 'EN';
  urgence: 'BASSE' | 'MOYENNE' | 'HAUTE';
  statut: 'NOUVEAU' | 'EN_COURS' | 'RESOLU';
}

function routerRequete(ticket: TicketUsager) {
  console.log(\`[Dispatch] Requête \${ticket.id} en langue \${ticket.langue} assignée à Maelam Dias.\`);
  return {
    tempsReponseGaranti: ticket.urgence === 'HAUTE' ? '15 minutes' : '2 heures',
    agentResponsable: 'Maelam Dias Batista Correia',
    canal: 'Direct / Téléphonique / Email'
  };
}`
    }
  ] as Project[]
};
