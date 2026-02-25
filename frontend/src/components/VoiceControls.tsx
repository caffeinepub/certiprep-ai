import { Volume2, VolumeX, Mic, MicOff, Settings, Play } from 'lucide-react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface VoiceControlsProps {
  onVoiceInput?: (text: string) => void;
  speechHook: ReturnType<typeof useSpeechSynthesis>;
  recognitionHook: ReturnType<typeof useSpeechRecognition>;
}

export default function VoiceControls({ onVoiceInput, speechHook, recognitionHook }: VoiceControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const {
    voices, selectedVoice, setSelectedVoice,
    speaking, rate, setRate, pitch, setPitch,
    stop, testVoice, supported: ttsSupported
  } = speechHook;

  const {
    listening, interimTranscript, supported: sttSupported,
    startListening, stopListening
  } = recognitionHook;

  const handleMicToggle = () => {
    if (listening) {
      stopListening();
    } else {
      startListening(onVoiceInput);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      {/* Status bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Speaking indicator */}
          {speaking ? (
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-0.5 h-5">
                {[1,2,3,4,5].map(i => (
                  <div
                    key={i}
                    className="wave-bar w-1 bg-primary rounded-full"
                    style={{ animationDelay: `${(i-1) * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="text-xs text-primary font-medium">Speaking...</span>
              <button
                onClick={stop}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Stop
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {ttsSupported ? 'Voice ready' : 'TTS not supported'}
              </span>
            </div>
          )}

          {/* Listening indicator */}
          {listening && (
            <div className="flex items-center gap-2 ml-2">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs text-destructive font-medium">Listening...</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mic button */}
          {sttSupported && (
            <Button
              variant={listening ? 'destructive' : 'outline'}
              size="sm"
              onClick={handleMicToggle}
              className="h-8 px-3 gap-1.5"
            >
              {listening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span className="text-xs">{listening ? 'Stop' : 'Ask'}</span>
            </Button>
          )}

          {/* Settings toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 p-0"
          >
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Interim transcript */}
      {listening && interimTranscript && (
        <div className="text-xs text-muted-foreground italic bg-secondary/50 rounded-lg px-3 py-2">
          "{interimTranscript}"
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="border-t border-border pt-3 space-y-3">
          {/* Voice selector */}
          {ttsSupported && voices.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Voice</label>
              <Select
                value={selectedVoice?.name || ''}
                onValueChange={(name) => {
                  const v = voices.find(v => v.voice.name === name);
                  if (v) setSelectedVoice(v.voice);
                }}
              >
                <SelectTrigger className="h-8 text-xs bg-secondary border-border">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border max-h-48">
                  {voices.map(({ voice, label, quality }) => (
                    <SelectItem key={voice.name} value={voice.name} className="text-xs">
                      <span className="flex items-center gap-2">
                        {quality === 'neural' && (
                          <span className="badge-amber text-[10px] px-1.5 py-0">HD</span>
                        )}
                        {label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Rate slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground">Speed</label>
              <span className="text-xs text-muted-foreground">{rate.toFixed(2)}x</span>
            </div>
            <Slider
              min={0.5}
              max={2}
              step={0.05}
              value={[rate]}
              onValueChange={([v]) => setRate(v)}
              className="w-full"
            />
          </div>

          {/* Pitch slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-muted-foreground">Pitch</label>
              <span className="text-xs text-muted-foreground">{pitch.toFixed(2)}</span>
            </div>
            <Slider
              min={0.5}
              max={2}
              step={0.05}
              value={[pitch]}
              onValueChange={([v]) => setPitch(v)}
              className="w-full"
            />
          </div>

          {/* Test button */}
          <Button
            variant="outline"
            size="sm"
            onClick={testVoice}
            className="w-full h-8 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
          >
            <Play className="w-3 h-3" />
            Test Voice
          </Button>
        </div>
      )}
    </div>
  );
}
