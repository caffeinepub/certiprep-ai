import { Link } from '@tanstack/react-router';
import { BookOpen, Brain, ClipboardList, ChevronRight } from 'lucide-react';

const CERTIFICATIONS = [
  {
    id: 'comptia-aplus',
    name: 'CompTIA A+',
    badge: 'A+',
    badgeColor: 'gray',
    examCode: '220-1101',
    difficulty: 'Beginner',
    difficultyColor: 'green',
    description: 'Core hardware and software fundamentals for IT support professionals.',
    domains: ['Mobile Devices', 'Networking', 'Hardware', 'Virtualization', 'Security'],
    questions: 90,
    passingScore: '675',
  },
  {
    id: 'comptia-securityplus',
    name: 'CompTIA Security+',
    badge: 'Security+',
    badgeColor: 'blue',
    examCode: 'SY0-701',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Cybersecurity fundamentals, threat detection, and risk management.',
    domains: ['Threats & Attacks', 'Architecture', 'Implementation', 'Operations', 'Governance'],
    questions: 90,
    passingScore: '750',
  },
  {
    id: 'comptia-networkplus',
    name: 'CompTIA Network+',
    badge: 'Network+',
    badgeColor: 'purple',
    examCode: 'N10-009',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Networking concepts, infrastructure, and troubleshooting skills.',
    domains: ['Networking Concepts', 'Infrastructure', 'Operations', 'Security', 'Troubleshooting'],
    questions: 90,
    passingScore: '720',
  },
  {
    id: 'comptia-linuxplus',
    name: 'CompTIA Linux+',
    badge: 'Linux+',
    badgeColor: 'amber',
    examCode: 'XK0-005',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Linux administration, scripting, and system management.',
    domains: ['System Management', 'Security', 'Scripting', 'Containers', 'Automation'],
    questions: 90,
    passingScore: '720',
  },
  {
    id: 'comptia-cloudplus',
    name: 'CompTIA Cloud+',
    badge: 'Cloud+',
    badgeColor: 'cyan',
    examCode: 'CV0-004',
    difficulty: 'Intermediate',
    difficultyColor: 'yellow',
    description: 'Cloud computing deployment, management, and security.',
    domains: ['Cloud Architecture', 'Security', 'Deployment', 'Operations', 'Troubleshooting'],
    questions: 90,
    passingScore: '750',
  },
  {
    id: 'comptia-cysaplus',
    name: 'CompTIA CySA+',
    badge: 'CySA+',
    badgeColor: 'indigo',
    examCode: 'CS0-003',
    difficulty: 'Advanced',
    difficultyColor: 'orange',
    description: 'Cybersecurity analyst skills, threat intelligence, and incident response.',
    domains: ['Threat Intelligence', 'Vulnerability Mgmt', 'Incident Response', 'Reporting', 'Communication'],
    questions: 85,
    passingScore: '750',
  },
  {
    id: 'comptia-pentestplus',
    name: 'CompTIA PenTest+',
    badge: 'PenTest+',
    badgeColor: 'green',
    examCode: 'PT0-003',
    difficulty: 'Advanced',
    difficultyColor: 'orange',
    description: 'Penetration testing, vulnerability assessment, and ethical hacking.',
    domains: ['Planning', 'Reconnaissance', 'Attacks', 'Reporting', 'Tools'],
    questions: 85,
    passingScore: '750',
  },
  {
    id: 'comptia-caspplus',
    name: 'CompTIA CASP+',
    badge: 'CASP+',
    badgeColor: 'red',
    examCode: 'CAS-004',
    difficulty: 'Expert',
    difficultyColor: 'red',
    description: 'Advanced security architecture, engineering, and enterprise risk management.',
    domains: ['Security Architecture', 'Security Operations', 'Engineering', 'Cryptography', 'Governance'],
    questions: 90,
    passingScore: 'Pass/Fail',
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

export default function CertificationSelector() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cards Grid — first section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Certifications</h1>
          <span className="text-sm text-muted-foreground">8 CompTIA Certifications</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="cert-card flex flex-col justify-between rounded-xl border-2 border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200"
            >
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

                {/* Domain preview */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.domains.slice(0, 3).map((domain) => (
                    <span
                      key={domain}
                      className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                    >
                      {domain}
                    </span>
                  ))}
                  {cert.domains.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      +{cert.domains.length - 3} more
                    </span>
                  )}
                </div>

                {/* Exam details */}
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <div className="flex justify-between">
                    <span>Questions</span>
                    <span className="font-medium text-foreground">{cert.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing Score</span>
                    <span className="font-medium text-foreground">{cert.passingScore}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons — use correct existing routes with certificationId param */}
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
          ))}
        </div>
      </div>

      {/* Page description */}
      <div className="rounded-xl border-2 border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-2">
          <ChevronRight className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Choose Your Path</h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Select any certification above to access study guides, flashcard decks, practice tests,
          and Q&A sessions. Each certification includes full exam domain coverage with detailed
          explanations and exam tips.
        </p>
      </div>
    </div>
  );
}
