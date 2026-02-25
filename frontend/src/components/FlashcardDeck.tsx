import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlashcardDeckProps {
  front: string;
  back: string;
  cardNumber: number;
  totalCards: number;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export default function FlashcardDeck({
  front,
  back,
  cardNumber,
  totalCards,
  onCorrect,
  onIncorrect
}: FlashcardDeckProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(f => !f);

  const handleCorrect = () => {
    setFlipped(false);
    setTimeout(onCorrect, 150);
  };

  const handleIncorrect = () => {
    setFlipped(false);
    setTimeout(onIncorrect, 150);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="w-full flex items-center justify-between text-sm text-muted-foreground">
        <span>Card {cardNumber} of {totalCards}</span>
        <span className="text-xs">{flipped ? 'Answer shown' : 'Click card to reveal answer'}</span>
      </div>

      {/* Card */}
      <div
        className="card-flip w-full cursor-pointer"
        style={{ height: '280px' }}
        onClick={handleFlip}
      >
        <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="card-face bg-card border-2 border-border rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary/40 transition-colors">
            <div className="badge-blue mb-4 text-xs">Question</div>
            <p className="text-center text-foreground font-medium text-lg leading-relaxed">{front}</p>
            <p className="mt-6 text-xs text-muted-foreground">Tap to flip</p>
          </div>

          {/* Back */}
          <div className="card-face card-face-back bg-gradient-to-br from-card to-secondary border-2 border-primary/30 rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="badge-amber mb-4 text-xs">Answer</div>
            <p className="text-center text-foreground text-base leading-relaxed">{back}</p>
          </div>
        </div>
      </div>

      {/* Action buttons - only show when flipped */}
      {flipped && (
        <div className="flex gap-4 w-full animate-fade-in">
          <Button
            variant="outline"
            className="flex-1 h-12 gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive"
            onClick={handleIncorrect}
          >
            <XCircle className="w-5 h-5" />
            Didn't Know
          </Button>
          <Button
            className="flex-1 h-12 gap-2 bg-success hover:bg-success/90 text-success-foreground"
            onClick={handleCorrect}
          >
            <CheckCircle className="w-5 h-5" />
            Got It!
          </Button>
        </div>
      )}

      {!flipped && (
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            className="flex-1 h-12 gap-2 border-border text-muted-foreground"
            onClick={handleFlip}
          >
            Reveal Answer
          </Button>
        </div>
      )}
    </div>
  );
}
