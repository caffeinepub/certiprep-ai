import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Download, ExternalLink, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useReadingProgress, useSaveReadingProgress } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface PDFViewerProps {
  title: string;
  filePath: string;
  certificationId: string;
  onClose: () => void;
}

export default function PDFViewer({ title, filePath, certificationId, onClose }: PDFViewerProps) {
  const isHtml = filePath.endsWith('.html');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const embedRef = useRef<HTMLEmbedElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasRestoredRef = useRef(false);

  const [readPercentage, setReadPercentage] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: progressRecords } = useReadingProgress();
  const saveProgress = useSaveReadingProgress();

  // Find saved progress for this certification
  const savedRecord = progressRecords?.find(
    (r) => r.certificationId === certificationId
  );
  const savedPercentage = savedRecord ? Number(savedRecord.percentage) : 0;

  // Compute scroll percentage from an element
  const computeScrollPercentage = (el: Element | null): number => {
    if (!el) return 0;
    const scrollTop = (el as HTMLElement).scrollTop;
    const scrollHeight = (el as HTMLElement).scrollHeight;
    const clientHeight = (el as HTMLElement).clientHeight;
    const scrollable = scrollHeight - clientHeight;
    if (scrollable <= 0) return 100;
    return Math.min(100, Math.round((scrollTop / scrollable) * 100));
  };

  // Persist progress to backend with debounce
  const persistProgress = useCallback(
    (pct: number) => {
      if (!isAuthenticated) return;
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(async () => {
        setIsSaving(true);
        try {
          await saveProgress.mutateAsync({ certificationId, percentage: pct });
        } catch {
          // silently ignore
        } finally {
          setIsSaving(false);
        }
      }, 600);
    },
    [certificationId, isAuthenticated, saveProgress]
  );

  // Handle scroll events from iframe's inner document
  const handleIframeScroll = useCallback(() => {
    const iframeDoc = iframeRef.current?.contentDocument;
    if (!iframeDoc) return;
    const scrollEl = iframeDoc.scrollingElement || iframeDoc.documentElement;
    const pct = computeScrollPercentage(scrollEl);
    setReadPercentage((prev) => {
      const next = Math.max(prev, pct);
      if (next !== prev) persistProgress(next);
      return next;
    });
  }, [persistProgress]);

  // Handle scroll events from the container div (for embed/PDF)
  const handleContainerScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const pct = computeScrollPercentage(el);
    setReadPercentage((prev) => {
      const next = Math.max(prev, pct);
      if (next !== prev) persistProgress(next);
      return next;
    });
  }, [persistProgress]);

  // Attach scroll listener to iframe content once it loads
  const handleIframeLoad = useCallback(() => {
    const iframeDoc = iframeRef.current?.contentDocument;
    if (!iframeDoc) return;

    // Restore scroll position from saved percentage
    if (!hasRestoredRef.current && savedPercentage > 0) {
      hasRestoredRef.current = true;
      const scrollEl = iframeDoc.scrollingElement || iframeDoc.documentElement;
      const scrollable = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (scrollable > 0) {
        scrollEl.scrollTop = Math.round((savedPercentage / 100) * scrollable);
      }
      setReadPercentage(savedPercentage);
    }

    // Attach scroll listener
    const scrollEl = iframeDoc.scrollingElement || iframeDoc.documentElement;
    scrollEl.addEventListener('scroll', handleIframeScroll, { passive: true });
  }, [savedPercentage, handleIframeScroll]);

  // Set initial percentage from saved record
  useEffect(() => {
    if (savedPercentage > 0 && readPercentage === 0) {
      setReadPercentage(savedPercentage);
    }
  }, [savedPercentage]);

  // Attach container scroll listener for non-HTML (embed/PDF)
  useEffect(() => {
    if (!isHtml) {
      const el = containerRef.current;
      if (!el) return;
      el.addEventListener('scroll', handleContainerScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleContainerScroll);
    }
  }, [isHtml, handleContainerScroll]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  const progressColor =
    readPercentage === 100
      ? 'text-success'
      : readPercentage >= 50
      ? 'text-primary'
      : 'text-muted-foreground';

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg gradient-amber flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Study Guide</p>
            <h2 className="text-sm font-semibold text-foreground truncate">{title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Progress indicator */}
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5">
                  <BookOpen className={`w-3.5 h-3.5 ${progressColor}`} />
                  <span className={`text-xs font-semibold tabular-nums ${progressColor}`}>
                    {readPercentage === 100 ? 'Completed' : `${readPercentage}% read`}
                  </span>
                  {isSaving && (
                    <span className="text-xs text-muted-foreground animate-pulse">saving…</span>
                  )}
                </div>
                <Progress
                  value={readPercentage}
                  className="w-28 h-1.5"
                />
              </div>
            </div>
          )}

          <a
            href={filePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open in Tab</span>
          </a>
          <a
            href={filePath}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile progress bar */}
      {isAuthenticated && (
        <div className="sm:hidden px-4 py-2 bg-card border-b border-border shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Reading progress</span>
            <span className={`text-xs font-semibold tabular-nums ${progressColor}`}>
              {readPercentage === 100 ? 'Completed' : `${readPercentage}%`}
            </span>
          </div>
          <Progress value={readPercentage} className="h-1.5" />
        </div>
      )}

      {/* Viewer Content */}
      <div ref={containerRef} className="flex-1 overflow-auto">
        {isHtml ? (
          <iframe
            ref={iframeRef}
            src={filePath}
            title={title}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts"
            onLoad={handleIframeLoad}
          />
        ) : (
          <embed
            ref={embedRef}
            src={filePath}
            type="application/pdf"
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
}
