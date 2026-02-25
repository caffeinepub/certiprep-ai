import { Link } from '@tanstack/react-router';
import { BookOpen, Layers, FlaskConical, GraduationCap, TrendingUp, Award, Target, Clock } from 'lucide-react';
import { CERTIFICATIONS } from '@/data/certifications';
import { useGetTestResults } from '@/hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

const difficultyColor: Record<string, string> = {
  Beginner: 'badge-green',
  Intermediate: 'badge-blue',
  Advanced: 'badge-amber',
  Expert: 'badge-red',
};

function CertCard({ cert }: { cert: typeof CERTIFICATIONS[0] }) {
  const { data: results, isLoading } = useGetTestResults(cert.id);

  const latestResult = results && results.length > 0
    ? results[results.length - 1]
    : null;

  const passRate = latestResult
    ? Math.round((Number(latestResult.score) / Number(latestResult.totalQuestions)) * 100)
    : null;

  return (
    <div className="section-card group flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={difficultyColor[cert.difficulty]}>{cert.difficulty}</span>
            <span className="text-xs text-muted-foreground font-mono">{cert.examCode}</span>
          </div>
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight">{cert.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{cert.description}</p>
        </div>
        <div className="w-10 h-10 rounded-xl gradient-amber flex items-center justify-center shrink-0 glow-amber">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Stats */}
      {isLoading ? (
        <Skeleton className="h-8 w-full" />
      ) : latestResult ? (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Last test score</span>
            <span className={passRate && passRate >= 70 ? 'text-success font-medium' : 'text-destructive font-medium'}>
              {passRate}% ({String(latestResult.score)}/{String(latestResult.totalQuestions)})
            </span>
          </div>
          <Progress value={passRate ?? 0} className="h-1.5" />
        </div>
      ) : (
        <div className="text-xs text-muted-foreground italic">No tests taken yet</div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2 mt-auto pt-2 border-t border-border">
        <Link
          to="/study/$certificationId"
          params={{ certificationId: cert.id }}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors group/btn"
        >
          <BookOpen className="w-4 h-4 text-accent group-hover/btn:text-accent" />
          <span className="text-[10px] text-muted-foreground">Study</span>
        </Link>
        <Link
          to="/flashcards/$certificationId"
          params={{ certificationId: cert.id }}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors group/btn"
        >
          <Layers className="w-4 h-4 text-primary group-hover/btn:text-primary" />
          <span className="text-[10px] text-muted-foreground">Flashcards</span>
        </Link>
        <Link
          to="/test/$certificationId"
          params={{ certificationId: cert.id }}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors group/btn"
        >
          <FlaskConical className="w-4 h-4 text-success group-hover/btn:text-success" />
          <span className="text-[10px] text-muted-foreground">Test</span>
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="badge-amber">Personal Workspace</div>
          <div className="badge-blue">8 Certifications</div>
        </div>
        <h1 className="font-display text-4xl font-bold text-foreground mb-3">
          Welcome to <span className="text-gradient-amber">CertiPrep AI</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Your AI-powered CompTIA certification study companion. Study with voice instruction, practice with flashcards, and test your knowledge with AI-generated exams.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: GraduationCap, label: 'Certifications', value: '8', color: 'text-primary' },
          { icon: BookOpen, label: 'Study Domains', value: '35+', color: 'text-accent' },
          { icon: Target, label: 'Practice Questions', value: '200+', color: 'text-success' },
          { icon: Award, label: 'Flashcard Topics', value: '300+', color: 'text-warning' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study modes banner */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-5">
          <BookOpen className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-display font-semibold text-foreground mb-1">AI Study Mode</h3>
          <p className="text-sm text-muted-foreground">Voice-guided instruction with deep domain breakdowns. Ask questions and get expert answers.</p>
        </div>
        <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-5">
          <Layers className="w-8 h-8 text-accent mb-3" />
          <h3 className="font-display font-semibold text-foreground mb-1">Smart Flashcards</h3>
          <p className="text-sm text-muted-foreground">Auto-generated flashcards from cert content. Track right/wrong and review with explanations.</p>
        </div>
        <div className="bg-gradient-to-br from-success/20 to-success/5 border border-success/30 rounded-xl p-5">
          <FlaskConical className="w-8 h-8 text-success mb-3" />
          <h3 className="font-display font-semibold text-foreground mb-1">Practice Tests</h3>
          <p className="text-sm text-muted-foreground">Full mock exams with grading, detailed review, and progress tracking across all attempts.</p>
        </div>
      </div>

      {/* Certifications grid */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Your Certifications</h2>
        <Link
          to="/certifications"
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CERTIFICATIONS.map(cert => (
          <CertCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}
