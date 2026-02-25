import { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Layers, RotateCcw, CheckCircle, XCircle, Trophy, Loader2, RefreshCw } from 'lucide-react';
import { getCertificationById, generateFlashcardsFromCert } from '@/data/certifications';
import { useGetFlashcards, useAddFlashcard } from '@/hooks/useQueries';
import FlashcardDeck from '@/components/FlashcardDeck';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

type Phase = 'setup' | 'study' | 'review';

interface CardResult {
  front: string;
  back: string;
  correct: boolean;
}

export default function Flashcards() {
  const { certificationId } = useParams({ from: '/flashcards/$certificationId' });
  const cert = getCertificationById(certificationId);

  const { data: savedCards, isLoading: loadingCards } = useGetFlashcards(certificationId);
  const addFlashcard = useAddFlashcard();

  const [phase, setPhase] = useState<Phase>('setup');
  const [cards, setCards] = useState<Array<{ front: string; back: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<CardResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  if (!cert) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">Certification not found.</p>
        <Link to="/certifications" className="text-primary hover:underline mt-2 inline-block">Browse certifications</Link>
      </div>
    );
  }

  const handleGenerateCards = async () => {
    setIsGenerating(true);
    const generated = generateFlashcardsFromCert(cert);

    // Save to backend
    for (const card of generated.slice(0, 20)) {
      try {
        await addFlashcard.mutateAsync({
          certificationId,
          front: card.front,
          back: card.back,
        });
      } catch {
        // Continue even if individual saves fail
      }
    }

    setCards(generated);
    setCurrentIndex(0);
    setResults([]);
    setIsGenerating(false);
    setPhase('study');
  };

  const handleLoadSaved = () => {
    if (savedCards && savedCards.length > 0) {
      const loaded = savedCards.map(c => ({ front: c.front, back: c.back }));
      setCards(loaded);
      setCurrentIndex(0);
      setResults([]);
      setPhase('study');
    }
  };

  const handleCorrect = () => {
    const card = cards[currentIndex];
    setResults(prev => [...prev, { front: card.front, back: card.back, correct: true }]);
    if (currentIndex + 1 >= cards.length) {
      setPhase('review');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleIncorrect = () => {
    const card = cards[currentIndex];
    setResults(prev => [...prev, { front: card.front, back: card.back, correct: false }]);
    if (currentIndex + 1 >= cards.length) {
      setPhase('review');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setPhase('setup');
    setCards([]);
    setCurrentIndex(0);
    setResults([]);
  };

  const handleStudyAgain = () => {
    setCurrentIndex(0);
    setResults([]);
    setPhase('study');
  };

  const correctCount = results.filter(r => r.correct).length;
  const incorrectCount = results.filter(r => !r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  const filteredReview = results.filter(r => {
    if (reviewFilter === 'correct') return r.correct;
    if (reviewFilter === 'incorrect') return !r.correct;
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
            <p className="text-sm text-muted-foreground">Flashcard Study Mode</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center mx-auto mb-4 glow-amber">
              <Layers className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Flashcard Deck</h2>
            <p className="text-muted-foreground text-sm">
              Generate AI-powered flashcards from {cert.name} content. Flip cards to reveal answers, track what you know, and review with explanations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/50 rounded-xl text-center">
            <div>
              <div className="text-lg font-display font-bold text-primary">~40</div>
              <div className="text-xs text-muted-foreground">Cards</div>
            </div>
            <div className="border-x border-border">
              <div className="text-lg font-display font-bold text-accent">Flip</div>
              <div className="text-xs text-muted-foreground">Interaction</div>
            </div>
            <div>
              <div className="text-lg font-display font-bold text-success">Track</div>
              <div className="text-xs text-muted-foreground">Progress</div>
            </div>
          </div>

          <Button
            onClick={handleGenerateCards}
            disabled={isGenerating}
            className="w-full h-12 gradient-amber text-primary-foreground font-semibold text-base gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Cards...
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" />
                Generate Flashcards
              </>
            )}
          </Button>

          {!loadingCards && savedCards && savedCards.length > 0 && (
            <Button
              onClick={handleLoadSaved}
              variant="outline"
              className="w-full h-11 border-border text-muted-foreground hover:text-foreground gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Load Saved Deck ({savedCards.length} cards)
            </Button>
          )}

          {loadingCards && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Checking for saved cards...
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Study Phase ──────────────────────────────────────────────────────────────
  if (phase === 'study') {
    const progress = (currentIndex / cards.length) * 100;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleRestart} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">{cert.name} Flashcards</div>
            <div className="text-xs text-muted-foreground">{currentIndex + 1} of {cards.length}</div>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="text-success font-medium">{correctCount} ✓</span>
            <span className="text-destructive font-medium">{incorrectCount} ✗</span>
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-1.5 mb-8" />

        {/* Flashcard */}
        <FlashcardDeck
          front={cards[currentIndex].front}
          back={cards[currentIndex].back}
          cardNumber={currentIndex + 1}
          totalCards={cards.length}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
        />
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
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Deck Complete!</h2>
        <p className="text-muted-foreground mb-6">{cert.name} — {cards.length} cards reviewed</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="text-3xl font-display font-bold text-foreground">{accuracy}%</div>
            <div className="text-xs text-muted-foreground mt-1">Accuracy</div>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="text-3xl font-display font-bold text-success">{correctCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Got It</div>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <div className="text-3xl font-display font-bold text-destructive">{incorrectCount}</div>
            <div className="text-xs text-muted-foreground mt-1">Missed</div>
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={handleStudyAgain} variant="outline" className="gap-2 border-border">
            <RotateCcw className="w-4 h-4" />
            Study Again
          </Button>
          <Button onClick={handleGenerateCards} disabled={isGenerating} className="gap-2 gradient-amber text-primary-foreground">
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
            New Deck
          </Button>
        </div>
      </div>

      {/* Review filter */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Card Review</h3>
        <div className="flex gap-2">
          {(['all', 'incorrect', 'correct'] as const).map(f => (
            <button
              key={f}
              onClick={() => setReviewFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize ${
                reviewFilter === f
                  ? f === 'incorrect'
                    ? 'bg-destructive/15 text-destructive border-destructive/30'
                    : f === 'correct'
                    ? 'bg-success/15 text-success border-success/30'
                    : 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-secondary text-muted-foreground border-border'
              }`}
            >
              {f === 'all' ? `All (${results.length})` : f === 'correct' ? `Known (${correctCount})` : `Missed (${incorrectCount})`}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[480px] pr-2">
        <div className="space-y-4">
          {filteredReview.map((result, i) => (
            <div
              key={i}
              className={`bg-card border rounded-xl overflow-hidden ${
                result.correct ? 'border-success/30' : 'border-destructive/30'
              }`}
            >
              {/* Front */}
              <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center gap-2">
                {result.correct
                  ? <CheckCircle className="w-4 h-4 text-success shrink-0" />
                  : <XCircle className="w-4 h-4 text-destructive shrink-0" />
                }
                <p className="text-sm font-medium text-foreground">{result.front}</p>
              </div>
              {/* Back */}
              <div className="px-5 py-3">
                <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wider">Answer</div>
                <p className="text-sm text-foreground leading-relaxed">{result.back}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
