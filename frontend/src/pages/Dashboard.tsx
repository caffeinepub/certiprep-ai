import { Link } from '@tanstack/react-router';
import { BookOpen, Brain, ClipboardList, TrendingUp, Award, Zap } from 'lucide-react';
import { useGetTestResults } from '../hooks/useQueries';

const CERTIFICATIONS = [
  {
    id: 'comptia-aplus',
    name: 'CompTIA A+',
    badge: 'A+',
    badgeColor: 'gray',
    examCode: '220-1101',
    difficulty: 'Beginner',
    difficultyColor: 'green',
    description: 'Core hardware and software fundamentals',
  },
  {
    id: 'comptia-securityplus',
    name: 'CompTIA Security+',
    badge: 'Security+',
    badgeColor: 'blue',
    examCode: 'SY0-701',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Cybersecurity fundamentals and best practices',
  },
  {
    id: 'comptia-networkplus',
    name: 'CompTIA Network+',
    badge: 'Network+',
    badgeColor: 'purple',
    examCode: 'N10-009',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Networking concepts and infrastructure',
  },
  {
    id: 'comptia-linuxplus',
    name: 'CompTIA Linux+',
    badge: 'Linux+',
    badgeColor: 'amber',
    examCode: 'XK0-005',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Linux administration and operations',
  },
  {
    id: 'comptia-cloudplus',
    name: 'CompTIA Cloud+',
    badge: 'Cloud+',
    badgeColor: 'cyan',
    examCode: 'CV0-004',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Cloud computing concepts and deployment',
  },
  {
    id: 'comptia-cysaplus',
    name: 'CompTIA CySA+',
    badge: 'CySA+',
    badgeColor: 'indigo',
    examCode: 'CS0-003',
    difficulty: 'Advanced',
    difficultyColor: 'orange',
    description: 'Cybersecurity analyst skills and threat detection',
  },
  {
    id: 'comptia-pentestplus',
    name: 'CompTIA PenTest+',
    badge: 'PenTest+',
    badgeColor: 'green',
    examCode: 'PT0-003',
    difficulty: 'Advanced',
    difficultyColor: 'orange',
    description: 'Penetration testing and vulnerability assessment',
  },
  {
    id: 'comptia-caspplus',
    name: 'CompTIA CASP+',
    badge: 'CASP+',
    badgeColor: 'red',
    examCode: 'CAS-004',
    difficulty: 'Expert',
    difficultyColor: 'red',
    description: 'Advanced security practitioner skills',
  },
];

const badgeColorMap: Record<string, string> = {
  gray: 'border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-300',
  blue: 'border border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300',
  purple: 'border border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-300',
  amber: 'border border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-300',
  cyan: 'border border-cyan-500 text-cyan-600 dark:border-cyan-400 dark:text-cyan-300',
  indigo: 'border border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300',
  green: 'border border-green-500 text-green-600 dark:border-green-400 dark:text-green-300',
  red: 'border border-red-500 text-red-600 dark:border-red-400 dark:text-red-300',
};

const difficultyColorMap: Record<string, string> = {
  green: 'text-green-600 dark:text-green-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  orange: 'text-orange-600 dark:text-orange-400',
  red: 'text-red-600 dark:text-red-400',
};

interface CertCardProps {
  cert: typeof CERTIFICATIONS[0];
}

function CertCard({ cert }: CertCardProps) {
  const { data: results = [] } = useGetTestResults(cert.id);

  const latestResult = results.length > 0 ? results[results.length - 1] : null;
  const scorePercent = latestResult
    ? Math.round((Number(latestResult.score) / Number(latestResult.totalQuestions)) * 100)
    : null;

  return (
    <div className="cert-card flex flex-col justify-between rounded-xl border-2 border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200">
      {/* Card Header */}
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-transparent ${badgeColorMap[cert.badgeColor]}`}
            >
              {cert.badge}
            </span>
            <span className="text-xs text-muted-foreground font-mono">{cert.examCode}</span>
          </div>
          <span className={`text-xs font-medium ${difficultyColorMap[cert.difficultyColor]}`}>
            {cert.difficulty}
          </span>
        </div>

        <h3 className="text-base font-bold text-foreground mb-1">{cert.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{cert.description}</p>

        {/* Latest score */}
        {scorePercent !== null && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Latest score</span>
              <span className={scorePercent >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}>
                {scorePercent}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${scorePercent >= 75 ? 'bg-green-500' : 'bg-red-400'}`}
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons — use correct existing routes */}
      <div className="px-4 pb-4 grid grid-cols-3 gap-1.5">
        <Link
          to="/study/$certificationId"
          params={{ certificationId: cert.id }}
          className="flex flex-col items-center gap-1 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors"
          title="Study"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Study
        </Link>
        <Link
          to="/flashcards/$certificationId"
          params={{ certificationId: cert.id }}
          className="flex flex-col items-center gap-1 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors"
          title="Flashcards"
        >
          <Brain className="w-3.5 h-3.5" />
          Cards
        </Link>
        <Link
          to="/test/$certificationId"
          params={{ certificationId: cert.id }}
          className="flex flex-col items-center gap-1 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors"
          title="Practice Test"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          Test
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Certification Cards Grid — first section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Certifications</h2>
          <span className="text-sm text-muted-foreground">8 Certifications</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>

      {/* Hero / Welcome Section */}
      <div className="rounded-xl border-2 border-border bg-card p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to CertiPrep</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Your all-in-one CompTIA certification study platform. Study guides, flashcards, practice
          tests, and Q&A — everything you need to pass.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Certifications', value: '8', icon: Award, color: 'text-primary' },
          { label: 'Study Guides', value: '8', icon: BookOpen, color: 'text-blue-500' },
          { label: 'Practice Tests', value: '∞', icon: ClipboardList, color: 'text-green-500' },
          { label: 'Flashcard Decks', value: '8', icon: Brain, color: 'text-purple-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border-2 border-border bg-card p-4 flex flex-col items-center gap-2 shadow-sm"
          >
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Study Modes Banner */}
      <div className="rounded-xl border-2 border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Study Modes</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: BookOpen,
              title: 'Study Guides',
              desc: 'Comprehensive reading materials for every domain',
              color: 'text-blue-500',
              to: '/study-materials' as const,
            },
            {
              icon: Brain,
              title: 'Flashcards',
              desc: 'Spaced repetition for key terms and concepts',
              color: 'text-purple-500',
              to: '/certifications' as const,
            },
            {
              icon: TrendingUp,
              title: 'Practice Tests',
              desc: 'Timed mock exams with detailed explanations',
              color: 'text-green-500',
              to: '/certifications' as const,
            },
          ].map((mode) => (
            <Link
              key={mode.title}
              to={mode.to}
              className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-left"
            >
              <mode.icon className={`w-5 h-5 mt-0.5 shrink-0 ${mode.color}`} />
              <div>
                <div className="text-sm font-semibold text-foreground">{mode.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{mode.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
