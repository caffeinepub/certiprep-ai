import { useState } from 'react';
import { BookOpen, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { studyMaterials, type CertificationMaterials, type StudyMaterial } from '@/data/studyMaterials';
import PDFViewer from '@/components/PDFViewer';
import { Progress } from '@/components/ui/progress';
import { useReadingProgress } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

// Badge pill styles per color — consistent outline pill for ALL certs including A+
const badgePillMap: Record<CertificationMaterials['color'], string> = {
  amber:  'border border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-300',
  blue:   'border border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300',
  green:  'border border-green-500 text-green-600 dark:border-green-400 dark:text-green-300',
  purple: 'border border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-300',
  red:    'border border-red-500 text-red-600 dark:border-red-400 dark:text-red-300',
  cyan:   'border border-cyan-500 text-cyan-600 dark:border-cyan-400 dark:text-cyan-300',
  orange: 'border border-orange-500 text-orange-600 dark:border-orange-400 dark:text-orange-300',
  pink:   'border border-pink-500 text-pink-600 dark:border-pink-400 dark:text-pink-300',
};

// Short badge label per cert (replaces the long examCode for A+)
const shortBadgeLabel: Record<string, string> = {
  aplus:       'A+',
  securityplus: 'Security+',
  networkplus:  'Network+',
  linuxplus:    'Linux+',
  cloudplus:    'Cloud+',
  cysaplus:     'CySA+',
  pentestplus:  'PenTest+',
  caspplus:     'CASP+',
};

// Short exam code for display (A+ shows just the core 1 code, not the long string)
const shortExamCode: Record<string, string> = {
  aplus:        '220-1101',
  securityplus: 'SY0-701',
  networkplus:  'N10-009',
  linuxplus:    'XK0-005',
  cloudplus:    'CV0-004',
  cysaplus:     'CS0-003',
  pentestplus:  'PT0-003',
  caspplus:     'CAS-004',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Study Materials</h2>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>8 Certifications</span>
            <span>·</span>
            <span>Full Exam Coverage</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {studyMaterials.map((cert) => {
            const progress = isAuthenticated ? getProgressForCert(cert.id) : 0;
            const isCompleted = progress >= 100;
            const hasStarted = progress > 0;
            const primaryMaterial = cert.materials[0];
            const badgePill = badgePillMap[cert.color];
            const label = shortBadgeLabel[cert.id] ?? cert.name.replace('CompTIA ', '');
            const examCode = shortExamCode[cert.id] ?? cert.examCode;

            return (
              <div
                key={cert.id}
                className="cert-card flex flex-col bg-card border-2 border-border rounded-xl p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    {/* Badge pill — standardized for ALL certs including A+ */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-transparent ${badgePill}`}
                      >
                        {label}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{examCode}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-base leading-tight">{cert.name}</h3>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Reading progress */}
                {isAuthenticated && (
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Reading progress</span>
                      {isCompleted ? (
                        <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
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
                <div className="space-y-1.5 flex-1 mb-3">
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
                      ? 'bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20 dark:text-green-400'
                      : hasStarted
                      ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {isCompleted ? 'Review Guide' : hasStarted ? 'Continue Reading' : 'Start Reading'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info section */}
      <div className="border-t border-border bg-card mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">About These Guides</h2>
              <p className="mt-1 text-muted-foreground max-w-2xl">
                Comprehensive study guides for all 8 CompTIA certifications. Each guide covers every exam domain,
                objectives, key terms, port numbers, commands, protocols, and exam tips.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>8 Certifications</span>
                <span>·</span>
                <span>Full Exam Coverage</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-green-500 text-green-600 dark:border-green-400 dark:text-green-300 bg-transparent">
                  Free Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
