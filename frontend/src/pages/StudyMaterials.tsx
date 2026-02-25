import { useState } from 'react';
import { BookOpen, FileText, Download, Eye, CheckCircle2 } from 'lucide-react';
import { studyMaterials, type CertificationMaterials, type StudyMaterial } from '@/data/studyMaterials';
import PDFViewer from '@/components/PDFViewer';
import { Progress } from '@/components/ui/progress';
import { useReadingProgress } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

const colorMap: Record<CertificationMaterials['color'], { badge: string; icon: string; border: string; glow: string }> = {
  amber:  { badge: 'badge-amber', icon: 'gradient-amber', border: 'hover:border-primary/50', glow: 'glow-amber' },
  blue:   { badge: 'badge-blue',  icon: 'gradient-blue',  border: 'hover:border-accent/50',  glow: 'glow-blue' },
  green:  { badge: 'bg-success/20 text-success border border-success/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', icon: 'bg-success/20', border: 'hover:border-success/50', glow: '' },
  purple: { badge: 'bg-chart-5/20 text-chart-5 border border-chart-5/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', icon: 'bg-chart-5/20', border: 'hover:border-chart-5/50', glow: '' },
  red:    { badge: 'bg-destructive/20 text-destructive border border-destructive/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', icon: 'bg-destructive/20', border: 'hover:border-destructive/50', glow: '' },
  cyan:   { badge: 'bg-electric-400/20 text-electric-400 border border-electric-400/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', icon: 'bg-electric-400/20', border: 'hover:border-electric-400/50', glow: '' },
  orange: { badge: 'bg-amber-400/20 text-amber-400 border border-amber-400/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', icon: 'bg-amber-400/20', border: 'hover:border-amber-400/50', glow: '' },
  pink:   { badge: 'bg-chart-5/20 text-chart-5 border border-chart-5/30 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', icon: 'bg-chart-5/20', border: 'hover:border-chart-5/50', glow: '' },
};

interface ViewerState {
  title: string;
  filePath: string;
  certificationId: string;
}

export default function StudyMaterials() {
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const queryClient = useQueryClient();

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: progressRecords } = useReadingProgress();

  const getProgressForCert = (certId: string): number => {
    if (!progressRecords) return 0;
    const record = progressRecords.find((r) => r.certificationId === certId);
    return record ? Number(record.percentage) : 0;
  };

  const openMaterial = (cert: CertificationMaterials, material: StudyMaterial) => {
    setViewer({
      title: `${cert.name} — ${material.title}`,
      filePath: material.filePath,
      certificationId: cert.id,
    });
  };

  const handleClose = () => {
    setViewer(null);
    // Invalidate reading progress so cards update reactively
    queryClient.invalidateQueries({ queryKey: ['readingProgress'] });
  };

  if (viewer) {
    return (
      <PDFViewer
        title={viewer.title}
        filePath={viewer.filePath}
        certificationId={viewer.certificationId}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Certification cards grid — top of page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-foreground">Study Materials</h2>
          <div className="flex gap-2">
            <span className="badge-amber">8 Certifications</span>
            <span className="badge-blue">Full Exam Coverage</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {studyMaterials.map((cert) => {
            const colors = colorMap[cert.color];
            const progress = isAuthenticated ? getProgressForCert(cert.id) : 0;
            const isCompleted = progress >= 100;
            const hasStarted = progress > 0;
            const primaryMaterial = cert.materials[0];

            return (
              <div
                key={cert.id}
                className={`bg-card border border-border rounded-2xl p-5 transition-all duration-200 ${colors.border} hover:shadow-card flex flex-col gap-3`}
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={colors.badge}>{cert.name.replace('CompTIA ', '')}</span>
                      <span className="text-xs font-mono text-muted-foreground">{cert.examCode}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-base leading-tight">{cert.name}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center shrink-0 ${colors.glow}`}>
                    <BookOpen className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Reading progress */}
                {isAuthenticated && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Reading progress</span>
                      {isCompleted ? (
                        <span className="text-primary font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : hasStarted ? (
                        <span className="text-muted-foreground">{progress}% read</span>
                      ) : (
                        <span className="text-muted-foreground">Not started</span>
                      )}
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                )}

                {/* Materials list */}
                <div className="space-y-1.5 flex-1">
                  {cert.materials.map((material) => (
                    <div key={material.title} className="flex items-center justify-between gap-2 py-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground truncate">{material.title}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openMaterial(cert, material)}
                          className="p-1 rounded hover:bg-secondary transition-colors"
                          title="Open"
                        >
                          <Eye className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </button>
                        <a
                          href={material.filePath}
                          download
                          className="p-1 rounded hover:bg-secondary transition-colors"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <button
                  onClick={() => primaryMaterial && openMaterial(cert, primaryMaterial)}
                  className={`w-full mt-auto py-2 rounded-lg text-xs font-medium transition-colors border ${
                    isCompleted
                      ? 'bg-success/15 text-success border-success/30 hover:bg-success/25'
                      : hasStarted
                      ? 'bg-accent/15 text-accent border-accent/30 hover:bg-accent/25'
                      : 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/25'
                  }`}
                >
                  {isCompleted ? 'Review Guide' : hasStarted ? 'Continue Reading' : 'Start Reading'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero / info section — below cards */}
      <div className="border-t border-border bg-card mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl gradient-amber flex items-center justify-center shrink-0 glow-amber">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">About These Guides</h2>
              <p className="mt-1 text-muted-foreground max-w-2xl">
                Comprehensive study guides for all 8 CompTIA certifications. Each guide covers every exam domain,
                objectives, key terms, port numbers, commands, protocols, and exam tips.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="badge-amber">8 Certifications</span>
                <span className="badge-blue">Full Exam Coverage</span>
                <span className="badge-green">Free Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
