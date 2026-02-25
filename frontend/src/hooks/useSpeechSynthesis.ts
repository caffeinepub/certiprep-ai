import { useState, useEffect, useCallback, useRef } from 'react';

export interface VoiceOption {
  voice: SpeechSynthesisVoice;
  label: string;
  quality: 'neural' | 'standard';
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/`{1,3}(.+?)`{1,3}/gs, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/>\s+/g, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .trim();
}

function rankVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  if (name.includes('google') && name.includes('us english')) return 100;
  if (name.includes('google') && name.includes('english')) return 95;
  if (name.includes('microsoft') && name.includes('neural')) return 90;
  if (name.includes('microsoft') && (name.includes('aria') || name.includes('jenny') || name.includes('guy'))) return 85;
  if (name.includes('samantha')) return 80;
  if (name.includes('alex')) return 75;
  if (name.includes('google')) return 70;
  if (name.includes('microsoft')) return 65;
  if (voice.localService) return 50;
  return 30;
}

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(0.95);
  const [pitch, setPitch] = useState(1.0);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const loadVoices = useCallback(() => {
    if (!window.speechSynthesis) return;
    const available = window.speechSynthesis.getVoices();
    const englishVoices = available.filter(v =>
      v.lang.startsWith('en') || v.lang === ''
    );

    const sorted = englishVoices
      .map(v => ({
        voice: v,
        label: `${v.name} (${v.lang})`,
        quality: (v.name.toLowerCase().includes('neural') ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('samantha') ||
          v.name.toLowerCase().includes('alex')) ? 'neural' as const : 'standard' as const
      }))
      .sort((a, b) => rankVoice(b.voice) - rankVoice(a.voice));

    setVoices(sorted);

    if (!selectedVoice && sorted.length > 0) {
      setSelectedVoice(sorted[0].voice);
    }
  }, [selectedVoice]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [loadVoices]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !text) return;

    window.speechSynthesis.cancel();

    const cleanText = stripMarkdown(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, rate, pitch]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  const testVoice = useCallback(() => {
    speak("Hello! I'm your AI study instructor for CertiPrep. Let's get started with your certification preparation.");
  }, [speak]);

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    speaking,
    rate,
    setRate,
    pitch,
    setPitch,
    speak,
    stop,
    testVoice,
    supported
  };
}
