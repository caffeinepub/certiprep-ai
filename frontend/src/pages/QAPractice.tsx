import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Target } from 'lucide-react';
import { getCertificationById, generateQuestionsFromCert } from '@/data/certifications';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

type Phase = 'setup' | 'quiz' | 'review';

interface AttemptResult {
  question: GeneratedQuestion;
  selectedIndex: number;
  passed: boolean;
}

export default function QAPractice() {
  const { certificationId } = useParams({ from: '/practice/$certificationId' });
  const cert = getCertificationById(certificationId);

  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<AttemptResult[]>([]);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'passed' | 'failed'>('all');

  if (!cert) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">Certification not found.</p>
        <Link to="/certifications" className="text-primary hover:underline mt-2 inline-block">Browse certifications</Link>
      </div>
    );
  }

  const handleStart = () => {
    const domain = selectedDomain === 'all' ? undefined : selectedDomain;
    const generated = generateQuestionsFromCert(cert, domain);
    if (generated.length === 0) {
      return;
    }
    setQuestions(generated);
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setPhase('quiz');
  };

  const handleSelectAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    const current = questions[currentIndex];
    const passed = selectedAnswer === current.correctIndex;
    setResults(prev => [...prev, { question: current, selectedIndex: selectedAnswer, passed }]);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('review');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setPhase('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setResults([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  const passRate = results.length > 0 ? Math.round((passedCount / results.length) * 100) : 0;

  const filteredReview = results.filter(r => {
    if (reviewFilter === 'passed') return r.passed;
    if (reviewFilter === 'failed') return !r.passed;
    return true;
  });

  // ── Setup Phase ──────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{cert.name}</h1>
            <p className="text-sm text-muted-foreground">Q&A Practice Mode</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center mx-auto mb-4 glow-amber">
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Q&A Practice Session</h2>
            <p className="text-muted-foreground text-sm">
              Answer AI-generated questions, get instant feedback, and review explanations for every answer — both correct and incorrect.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Select Domain</label>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="Choose a domain" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Domains</SelectItem>
                {cert.domains.map(d => (
                  <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/50 rounded-xl text-center">
            <div>
              <div className="text-lg font-display font-bold text-primary">~15</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="border-x border-border">
              <div className="text-lg font-display font-bold text-accent">Instant</div>
              <div className="text-xs text-muted-foreground">Feedback</div>
            </div>
            <div>
              <div className="text-lg font-display font-bold text-success">Full</div>
              <div className="text-xs text-muted-foreground">Review</div>
            </div>
          </div>

          <Button
            onClick={handleStart}
            className="w-full h-12 gradient-amber text-primary-foreground font-semibold text-base"
          >
            Start Practice Session
          </Button>
        </div>
      </div>
    );
  }

  // ── Quiz Phase ───────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const current = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleRestart} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="text-xs text-muted-foreground">{current.domain}</div>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="text-success font-medium">{passedCount} ✓</span>
            <span className="text-destructive font-medium">{failedCount} ✗</span>
          </div>
        </div>

        {/* Progress bar */}
        <Progress value={progress} className="h-1.5 mb-6" />

        {/* Question card */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="badge-blue mb-4 inline-flex">Question {currentIndex + 1}</div>
          <p className="text-foreground font-medium text-lg leading-relaxed mb-6">{current.question}</p>

          <div className="space-y-3">
            {current.options.map((option, idx) => {
              let optionClass = 'border-border bg-secondary/50 text-foreground hover:border-primary/40 hover:bg-secondary';

              if (showFeedback) {
                if (idx === current.correctIndex) {
                  optionClass = 'border-success bg-success/10 text-success';
                } else if (idx === selectedAnswer && idx !== current.correctIndex) {
                  optionClass = 'border-destructive bg-destructive/10 text-destructive';
                } else {
                  optionClass = 'border-border bg-secondary/30 text-muted-foreground opacity-60';
                }
              } else if (selectedAnswer === idx) {
                optionClass = 'border-primary bg-primary/10 text-foreground';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm leading-relaxed ${optionClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                    {showFeedback && idx === current.correctIndex && (
                      <CheckCircle className="w-4 h-4 shrink-0 ml-auto text-success" />
                    )}
                    {showFeedback && idx === selectedAnswer && idx !== current.correctIndex && (
                      <XCircle className="w-4 h-4 shrink-0 ml-auto text-destructive" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback / Explanation */}
        {showFeedback && (
          <div className={`rounded-xl p-4 mb-4 border animate-fade-in ${
            selectedAnswer === current.correctIndex
              ? 'bg-success/10 border-success/30'
              : 'bg-destructive/10 border-destructive/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {selectedAnswer === current.correctIndex ? (
                <>
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-semibold text-success">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-semibold text-destructive">Incorrect</span>
                </>
              )}
            </div>
            <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 h-12 gradient-amber text-primary-foreground font-semibold"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex-1 h-12 gradient-amber text-primary-foreground font-semibold gap-2"
            >
              {currentIndex + 1 >= questions.length ? 'View Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ── Review Phase ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Score summary */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-6 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-primary/30 bg-primary/10">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Session Complete!</h2>
        <p className="text-muted-foreground mb-6">{cert.name} — Q&A Practice</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="text-3xl font-display font-bold text-foreground">{passRate}%</div>
            <div className="text-xs text-muted-foreground mt-1">Score</div>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="text-3xl font-display font-bold text-success">{passedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Correct</div>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <div className="text-3xl font-display font-bold text-destructive">{failedCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Incorrect</div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={handleRestart} variant="outline" className="gap-2 border-border">
            <RotateCcw className="w-4 h-4" />
            Practice Again
          </Button>
          <Link to="/test/$certificationId" params={{ certificationId: cert.id }}>
            <Button className="gap-2 gradient-amber text-primary-foreground">
              Take Full Test
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Review filter */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Answer Review</h3>
        <div className="flex gap-2">
          {(['all', 'failed', 'passed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setReviewFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize ${
                reviewFilter === f
                  ? f === 'failed'
                    ? 'bg-destructive/15 text-destructive border-destructive/30'
                    : f === 'passed'
                    ? 'bg-success/15 text-success border-success/30'
                    : 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-secondary text-muted-foreground border-border'
              }`}
            >
              {f === 'all' ? `All (${results.length})` : f === 'passed' ? `Correct (${passedCount})` : `Incorrect (${failedCount})`}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[500px] pr-2">
        <div className="space-y-4">
          {filteredReview.map((result, i) => (
            <div
              key={i}
              className={`bg-card border rounded-xl p-5 ${
                result.passed ? 'border-success/30' : 'border-destructive/30'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {result.passed
                  ? <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                }
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">{result.question.domain}</div>
                  <p className="text-sm font-medium text-foreground">{result.question.question}</p>
                </div>
              </div>

              <div className="space-y-2 ml-8">
                {result.question.options.map((opt, idx) => {
                  const isCorrect = idx === result.question.correctIndex;
                  const isSelected = idx === result.selectedIndex;
                  if (!isCorrect && !isSelected) return null;
                  return (
                    <div
                      key={idx}
                      className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                        isCorrect
                          ? 'bg-success/10 text-success border border-success/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      }`}
                    >
                      {isCorrect ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                      <span>{isCorrect ? 'Correct: ' : 'Your answer: '}</span>
                      <span className="font-medium">{opt}</span>
                    </div>
                  );
                })}

                <div className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2 mt-2 leading-relaxed">
                  <span className="font-medium text-foreground">Explanation: </span>
                  {result.question.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
