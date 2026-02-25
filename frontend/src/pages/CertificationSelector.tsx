import { Link } from '@tanstack/react-router';
import { BookOpen, Layers, FlaskConical, GraduationCap } from 'lucide-react';
import { CERTIFICATIONS } from '@/data/certifications';

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-success/20 text-success border-success/30',
  Intermediate: 'bg-accent/20 text-accent border-accent/30',
  Advanced: 'bg-primary/20 text-primary border-primary/30',
  Expert: 'bg-destructive/20 text-destructive border-destructive/30',
};

export default function CertificationSelector() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Certification cards — top of page */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {CERTIFICATIONS.map(cert => (
          <div
            key={cert.id}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-200 hover:shadow-card group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[cert.difficulty]}`}>
                    {cert.difficulty}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                    {cert.examCode}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {cert.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
              </div>
              <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center shrink-0 ml-4 glow-amber">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            {/* Exam details */}
            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-secondary/50 rounded-xl">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-0.5">Passing Score</div>
                <div className="text-xs font-medium text-foreground">{cert.passingScore.split(' ')[0]}</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-xs text-muted-foreground mb-0.5">Questions</div>
                <div className="text-xs font-medium text-foreground">{cert.questionCount}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-0.5">Duration</div>
                <div className="text-xs font-medium text-foreground">{cert.duration}</div>
              </div>
            </div>

            {/* Domains preview */}
            <div className="mb-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {cert.domains.length} Domains Covered
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cert.domains.slice(0, 4).map(d => (
                  <span key={d.name} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                    {d.name.split('(')[0].trim()}
                  </span>
                ))}
                {cert.domains.length > 4 && (
                  <span className="text-[10px] text-muted-foreground px-2 py-0.5">
                    +{cert.domains.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="text-xs text-muted-foreground mb-5 italic">
              Prerequisites: {cert.prerequisites}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/study/$certificationId"
                params={{ certificationId: cert.id }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-accent/15 text-accent hover:bg-accent/25 transition-colors text-xs font-medium border border-accent/20"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Study
              </Link>
              <Link
                to="/flashcards/$certificationId"
                params={{ certificationId: cert.id }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 transition-colors text-xs font-medium border border-primary/20"
              >
                <Layers className="w-3.5 h-3.5" />
                Cards
              </Link>
              <Link
                to="/test/$certificationId"
                params={{ certificationId: cert.id }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-success/15 text-success hover:bg-success/25 transition-colors text-xs font-medium border border-success/20"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                Test
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Page intro — below cards */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Choose Your <span className="text-gradient-amber">Certification</span>
        </h1>
        <p className="text-muted-foreground">
          Select a CompTIA certification to begin studying. Each cert includes comprehensive domain coverage, AI-guided study sessions, flashcards, and practice tests.
        </p>
      </div>
    </div>
  );
}
