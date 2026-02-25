import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, AlertCircle, Loader2 } from 'lucide-react';
import { getCertificationById, generateQuestionsFromCert } from '@/data/certifications';
import { useSubmitTestResult, useGetTestResults } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

type Phase = 'setup' | 'test' | 'submitting' | 'results';

const TEST_DURATION_MINUTES = 30;

export default function PracticeTest() {
  const { certificationId } = useParams({ from: '/test/$certificationId' });
  const cert = getCertificationById(certificationId);

  const submitTestResult = useSubmitTestResult();
  const { data: pastResults } = useGetTestResults(certificationId);

  const [phase, setPhase] = useState<Phase>('setup');
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_MINUTES * 60);
  const [score, setScore] = useState(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!cert) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">Certification not found.</p>
        <Link to="/certifications" className="text-primary hover:underline mt-2 inline-block">Browse certifications</Link>
      </div>
    );
  }

  const handleStartTest = () => {
    const generated = generateQuestionsFromCert(cert);
    // Ensure at least 20 questions by repeating if needed
    let qs = [...generated];
    while (qs.length < 20 && generated.length > 0) {
      qs = [...qs, ...generated.map(q => ({ ...q }))];
    }
    qs = qs.slice(0, Math.max(20, generated.length));

    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentIndex(0);
    setTimeLeft(TEST_DURATION_MINUTES * 60);
    setPhase('test');

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSubmitTest(qs, answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSelectAnswer = (idx: number) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = idx;
      return updated;
    });
  };

  const handleSubmitTest = async (qs?: GeneratedQuestion[], ans?: (number | null)[]) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const finalQuestions = qs || questions;
    const finalAnswers = ans || answers;

    const correct = finalQuestions.filter((q, i) => finalAnswers[i] === q.correctIndex).length;
    setScore(correct);
    setPhase('submitting');

    try {
      await submitTestResult.mutateAsync({
        certificationId,
        score: correct,
        totalQuestions: finalQuestions.length,
      });
    } catch {
      // Continue to results even if save fails
    }

    setPhase('results');
  };

  const handleRestart = () => {
    setPhase('setup');
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = answers.filter(a => a !== null).length;
  const passPercent = Math.round((score / (questions.length || 1)) * 100);
  const passed = passPercent >= 70;

  const filteredReview = questions.filter((_, i) => {
    const correct = answers[i] === questions[i].correctIndex;
    if (reviewFilter === 'correct') return correct;
    if (reviewFilter === 'incorrect') return !correct;
    return true;
  });

  // ── Setup Phase ──────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    const bestResult = pastResults && pastResults.length > 0
      ? pastResults.reduce((best, r) =>
          Number(r.score) / Number(r.totalQuestions) > Number(best.score) / Number(best.totalQuestions) ? r : best
        )
      : null;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{cert.name}</h1>
            <p className="text-sm text-muted-foreground">Practice Test</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center mx-auto mb-4 glow-amber">
              <Trophy className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Mock Exam</h2>
            <p className="text-muted-foreground text-sm">
              Simulate the real {cert.name} exam experience. Answer all questions, then get a detailed score report with explanations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/50 rounded-xl text-center">
            <div>
              <div className="text-lg font-display font-bold text-primary">20+</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="border-x border-border">
              <div className="text-lg font-display font-bold text-accent">{TEST_DURATION_MINUTES}min</div>
              <div className="text-xs text-muted-foreground">Time Limit</div>
            </div>
            <div>
              <div className="text-lg font-display font-bold text-success">70%</div>
              <div className="text-xs text-muted-foreground">Pass Score</div>
            </div>
          </div>

          {bestResult && (
            <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border">
              <Trophy className="w-5 h-5 text-primary shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">Best Score</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round((Number(bestResult.score) / Number(bestResult.totalQuestions)) * 100)}% ({String(bestResult.score)}/{String(bestResult.totalQuestions)} correct)
                </div>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                {pastResults?.length} attempt{(pastResults?.length ?? 0) !== 1 ? 's' : ''}
              </div>
            </div>
          )}

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Once started, the timer cannot be paused. Answer all questions before submitting. You can navigate between questions freely.
            </p>
          </div>

          <Button
            onClick={handleStartTest}
            className="w-full h-12 gradient-amber text-primary-foreground font-semibold text-base gap-2"
          >
            <Trophy className="w-4 h-4" />
            Start Mock Exam
          </Button>
        </div>
      </div>
    );
  }

  // ── Submitting Phase ─────────────────────────────────────────────────────────
  if (phase === 'submitting') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold text-foreground mb-2">Grading Your Exam...</h2>
        <p className="text-muted-foreground">Saving your results to the blockchain.</p>
      </div>
    );
  }

  // ── Test Phase ───────────────────────────────────────────────────────────────
  if (phase === 'test') {
    const current = questions[currentIndex];
    const progress = (answeredCount / questions.length) * 100;
    const timeWarning = timeLeft < 300;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Test header */}
        <div className="flex items-center justify-between mb-4 bg-card border border-border rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-foreground">{cert.name} Mock Exam</div>
            <div className="text-xs text-muted-foreground">{answeredCount}/{questions.length} answered</div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-mono font-bold ${
            timeWarning
              ? 'bg-destructive/10 border-destructive/30 text-destructive'
              : 'bg-secondary border-border text-foreground'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-1 mb-4" />

        {/* Question navigation */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                i === currentIndex
                  ? 'bg-primary text-primary-foreground'
                  : answers[i] !== null
                  ? 'bg-accent/20 text-accent border border-accent/30'
                  : 'bg-secondary text-muted-foreground border border-border hover:border-primary/40'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="badge-blue">Question {currentIndex + 1}</span>
            <span className="text-xs text-muted-foreground">{current.domain}</span>
          </div>
          <p className="text-foreground font-medium text-lg leading-relaxed mb-6">{current.question}</p>

          <div className="space-y-3">
            {current.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm leading-relaxed ${
                  answers[currentIndex] === idx
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-secondary/50 text-foreground hover:border-primary/40 hover:bg-secondary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors ${
                    answers[currentIndex] === idx ? 'border-primary text-primary' : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="border-border"
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="border-border"
          >
            Next
          </Button>

          <Button
            onClick={() => handleSubmitTest()}
            className="gradient-amber text-primary-foreground font-semibold gap-2 ml-auto"
          >
            Submit Exam
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Results Phase ────────────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Score card */}
      <div className={`bg-card border rounded-2xl p-8 mb-6 text-center ${
        passed ? 'border-success/40' : 'border-destructive/40'
      }`}>
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border-4 ${
          passed
            ? 'border-success/40 bg-success/10'
            : 'border-destructive/40 bg-destructive/10'
        }`}>
          {passed
            ? <Trophy className="w-12 h-12 text-success" />
            : <XCircle className="w-12 h-12 text-destructive" />
          }
        </div>

        <h2 className="font-display text-3xl font-bold text-foreground mb-1">
          {passed ? 'Passed!' : 'Not Passed'}
        </h2>
        <p className="text-muted-foreground mb-6">{cert.name} Mock Exam</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`rounded-xl p-4 border ${passed ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'}`}>
            <div className={`text-4xl font-display font-bold ${passed ? 'text-success' : 'text-destructive'}`}>{passPercent}%</div>
            <div className="text-xs text-muted-foreground mt-1">Score</div>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="text-4xl font-display font-bold text-foreground">{score}</div>
            <div className="text-xs text-muted-foreground mt-1">Correct</div>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="text-4xl font-display font-bold text-foreground">{questions.length - score}</div>
            <div className="text-xs text-muted-foreground mt-1">Incorrect</div>
          </div>
        </div>

        <div className="mb-6">
          <Progress value={passPercent} className="h-3 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span className="text-primary font-medium">70% passing threshold</span>
            <span>100%</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={handleRestart} variant="outline" className="gap-2 border-border">
            <RotateCcw className="w-4 h-4" />
            Retake Test
          </Button>
          <Link to="/study/$certificationId" params={{ certificationId: cert.id }}>
            <Button variant="outline" className="gap-2 border-accent/30 text-accent hover:bg-accent/10">
              Study Weak Areas
            </Button>
          </Link>
        </div>
      </div>

      {/* Domain breakdown */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Domain Performance</h3>
        <div className="space-y-3">
          {cert.domains.map(domain => {
            const domainQs = questions.filter(q => q.domain === domain.name);
            if (domainQs.length === 0) return null;
            const domainCorrect = domainQs.filter((q, _) => {
              const qi = questions.indexOf(q);
              return answers[qi] === q.correctIndex;
            }).length;
            const domainPct = Math.round((domainCorrect / domainQs.length) * 100);
            return (
              <div key={domain.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground truncate mr-2">{domain.name}</span>
                  <span className={`font-medium shrink-0 ${domainPct >= 70 ? 'text-success' : 'text-destructive'}`}>
                    {domainCorrect}/{domainQs.length} ({domainPct}%)
                  </span>
                </div>
                <Progress value={domainPct} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Review filter */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Question Review</h3>
        <div className="flex gap-2">
          {(['all', 'incorrect', 'correct'] as const).map(f => (
            <button
              key={f}
              onClick={() => setReviewFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                reviewFilter === f
                  ? f === 'incorrect'
                    ? 'bg-destructive/15 text-destructive border-destructive/30'
                    : f === 'correct'
                    ? 'bg-success/15 text-success border-success/30'
                    : 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-secondary text-muted-foreground border-border'
              }`}
            >
              {f === 'all' ? `All (${questions.length})` : f === 'correct' ? `Correct (${score})` : `Incorrect (${questions.length - score})`}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-2">
        <div className="space-y-4">
          {filteredReview.map((q, reviewIdx) => {
            const qi = questions.indexOf(q);
            const userAnswer = answers[qi];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={reviewIdx}
                className={`bg-card border rounded-xl p-5 ${isCorrect ? 'border-success/30' : 'border-destructive/30'}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  {isCorrect
                    ? <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  }
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">{q.domain}</div>
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                  </div>
                </div>

                <div className="space-y-2 ml-8">
                  {q.options.map((opt, idx) => {
                    const isCorrectOpt = idx === q.correctIndex;
                    const isUserOpt = idx === userAnswer;
                    if (!isCorrectOpt && !isUserOpt) return null;
                    return (
                      <div
                        key={idx}
                        className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
                          isCorrectOpt
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'bg-destructive/10 text-destructive border border-destructive/20'
                        }`}
                      >
                        {isCorrectOpt ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                        <span>{isCorrectOpt ? 'Correct: ' : 'Your answer: '}</span>
                        <span className="font-medium">{opt}</span>
                      </div>
                    );
                  })}

                  <div className="text-xs text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2 mt-2 leading-relaxed">
                    <span className="font-medium text-foreground">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
