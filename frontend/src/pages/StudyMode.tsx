import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { BookOpen, Send, Volume2, VolumeX, ChevronRight, ArrowLeft, Lightbulb, List } from 'lucide-react';
import { getCertificationById } from '@/data/certifications';
import type { CertDomain } from '@/data/certifications';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import VoiceControls from '@/components/VoiceControls';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'instructor' | 'student';
  content: string;
  timestamp: Date;
}

function buildDomainContext(domain: CertDomain): string {
  const parts: string[] = [
    `Domain: ${domain.name} (${domain.weight} of exam)`,
    `Key Objectives: ${domain.objectives.join('; ')}`,
    `Key Terms: ${domain.keyTerms.join(', ')}`,
  ];
  if (domain.acronyms?.length) parts.push(`Acronyms: ${domain.acronyms.join('; ')}`);
  if (domain.ports?.length) parts.push(`Important Ports: ${domain.ports.join(', ')}`);
  if (domain.commands?.length) parts.push(`Key Commands: ${domain.commands.join(', ')}`);
  if (domain.protocols?.length) parts.push(`Protocols: ${domain.protocols.join(', ')}`);
  parts.push(`Study Notes: ${domain.studyNotes}`);
  return parts.join('\n');
}

function generateInstructorResponse(question: string, domain: CertDomain, certName: string): string {
  const q = question.toLowerCase();
  const context = buildDomainContext(domain);

  if (q.includes('what is') || q.includes('define') || q.includes('explain')) {
    const termMatch = domain.keyTerms.find(t => q.includes(t.toLowerCase()));
    if (termMatch) {
      const noteSnippet = domain.studyNotes.split('.').find(s => s.toLowerCase().includes(termMatch.toLowerCase()));
      return `Great question! **${termMatch}** is a key concept in the ${domain.name} domain of ${certName}.\n\n${noteSnippet ? noteSnippet.trim() + '.' : ''}\n\nIn the context of this domain, ${termMatch} relates to: ${domain.objectives.find(o => o.toLowerCase().includes(termMatch.toLowerCase())) || domain.objectives[0]}.\n\n**Study Tip:** ${domain.studyNotes.split('.')[0]}.`;
    }
  }

  if (q.includes('port') || q.includes('ports')) {
    if (domain.ports?.length) {
      return `Here are the key ports you need to know for the **${domain.name}** domain:\n\n${domain.ports.map(p => `• **${p}**`).join('\n')}\n\n**Memory Tip:** Focus on the most commonly tested ports. For ${certName}, port numbers are frequently tested in scenario-based questions.`;
    }
  }

  if (q.includes('acronym') || q.includes('abbreviation') || q.includes('stand for')) {
    if (domain.acronyms?.length) {
      return `Here are the key acronyms for the **${domain.name}** domain:\n\n${domain.acronyms.map(a => `• **${a}**`).join('\n')}\n\n**Exam Tip:** Acronyms are heavily tested on ${certName}. Make sure you can expand each one and explain what it does.`;
    }
  }

  if (q.includes('command') || q.includes('tool') || q.includes('syntax')) {
    if (domain.commands?.length) {
      return `Key commands and tools for **${domain.name}**:\n\n${domain.commands.map(c => `• \`${c}\``).join('\n')}\n\n**Practice Tip:** The ${certName} exam includes performance-based questions where you may need to identify the correct command for a given scenario.`;
    }
  }

  if (q.includes('objective') || q.includes('topic') || q.includes('cover') || q.includes('overview')) {
    return `The **${domain.name}** domain covers ${domain.weight} of the ${certName} exam. Here are the key objectives:\n\n${domain.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n**Study Focus:** ${domain.studyNotes.split('.').slice(0, 2).join('. ')}.`;
  }

  // Default comprehensive response
  return `Excellent question about **${domain.name}** in ${certName}!\n\nThis domain accounts for **${domain.weight}** of the exam. Here's what you need to know:\n\n**Core Concepts:**\n${domain.keyTerms.slice(0, 6).map(t => `• ${t}`).join('\n')}\n\n**Key Study Points:**\n${domain.studyNotes.split('.').slice(0, 3).join('. ')}.\n\n**Exam Objectives Covered:**\n${domain.objectives.slice(0, 3).map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\nDo you have a more specific question about any of these topics? I'm here to help you master this domain!`;
}

export default function StudyMode() {
  const { certificationId } = useParams({ from: '/study/$certificationId' });
  const cert = getCertificationById(certificationId);

  const [selectedDomain, setSelectedDomain] = useState<CertDomain | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const speechHook = useSpeechSynthesis();
  const recognitionHook = useSpeechRecognition();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (selectedDomain && cert) {
      const intro = `Welcome to the **${selectedDomain.name}** domain of ${cert.name}! This domain makes up **${selectedDomain.weight}** of your exam.\n\nI'll be your AI instructor today. Here's what we'll cover:\n\n${selectedDomain.objectives.slice(0, 4).map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n**Key terms to master:** ${selectedDomain.keyTerms.slice(0, 6).join(', ')}\n\n${selectedDomain.studyNotes.split('.')[0]}.\n\nFeel free to ask me anything about this domain, or I can walk you through each objective in detail. What would you like to start with?`;

      setMessages([{
        role: 'instructor',
        content: intro,
        timestamp: new Date()
      }]);

      if (autoSpeak) {
        setTimeout(() => speechHook.speak(intro), 300);
      }
    }
  }, [selectedDomain]);

  const handleSend = async (text?: string) => {
    const question = text || input.trim();
    if (!question || !selectedDomain || !cert) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'student', content: question, timestamp: new Date() }]);
    setIsThinking(true);

    await new Promise(r => setTimeout(r, 800));

    const response = generateInstructorResponse(question, selectedDomain, cert.name);
    setMessages(prev => [...prev, { role: 'instructor', content: response, timestamp: new Date() }]);
    setIsThinking(false);

    if (autoSpeak) {
      speechHook.speak(response);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInput(prev => prev + text);
  };

  if (!cert) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">Certification not found.</p>
        <Link to="/certifications" className="text-primary hover:underline mt-2 inline-block">Browse certifications</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-foreground">{cert.name}</h1>
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">{cert.examCode}</span>
          </div>
          <p className="text-sm text-muted-foreground">AI Study Mode — {cert.domains.length} domains</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Domain sidebar */}
        <div className="space-y-3">
          <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider px-1">Domains</h2>
          {cert.domains.map(domain => (
            <button
              key={domain.name}
              onClick={() => setSelectedDomain(domain)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                selectedDomain?.name === domain.name
                  ? 'bg-primary/15 border-primary/40 text-foreground'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-secondary'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium leading-tight">{domain.name}</span>
                <span className="text-[10px] shrink-0 text-muted-foreground">{domain.weight}</span>
              </div>
            </button>
          ))}

          {/* Voice controls */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Voice</span>
              <button
                onClick={() => setAutoSpeak(v => !v)}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                  autoSpeak
                    ? 'bg-primary/15 text-primary border-primary/30'
                    : 'bg-secondary text-muted-foreground border-border'
                }`}
              >
                {autoSpeak ? 'Auto-speak ON' : 'Auto-speak OFF'}
              </button>
            </div>
            <VoiceControls
              onVoiceInput={handleVoiceInput}
              speechHook={speechHook}
              recognitionHook={recognitionHook}
            />
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
          {!selectedDomain ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center mb-4 glow-amber">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Select a Domain to Begin</h3>
              <p className="text-muted-foreground max-w-sm">
                Choose a domain from the left panel to start your AI-guided study session. Your instructor will introduce the topic and guide you through all key concepts.
              </p>
            </div>
          ) : (
            <>
              {/* Domain header */}
              <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm">{selectedDomain.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedDomain.weight} of exam · {selectedDomain.objectives.length} objectives</p>
                </div>
                <div className="flex items-center gap-2">
                  {speechHook.speaking && (
                    <div className="flex items-end gap-0.5 h-4">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="wave-bar w-0.5 bg-primary rounded-full" style={{ animationDelay: `${(i-1)*0.1}s` }} />
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => speechHook.stop()}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <VolumeX className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-5">
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'student' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        msg.role === 'instructor'
                          ? 'gradient-amber text-primary-foreground'
                          : 'bg-accent/20 text-accent border border-accent/30'
                      }`}>
                        {msg.role === 'instructor' ? 'AI' : 'You'}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'instructor'
                          ? 'bg-secondary text-foreground rounded-tl-sm'
                          : 'bg-accent/15 text-foreground border border-accent/20 rounded-tr-sm'
                      }`}>
                        {msg.content.split('\n').map((line, li) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={li} className="font-semibold text-primary mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
                          }
                          if (line.startsWith('• ')) {
                            return <p key={li} className="ml-2 text-muted-foreground">{line}</p>;
                          }
                          if (line.match(/^\d+\./)) {
                            return <p key={li} className="ml-2">{line}</p>;
                          }
                          if (line === '') return <br key={li} />;
                          return <p key={li}>{line.replace(/\*\*(.+?)\*\*/g, '$1')}</p>;
                        })}
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full gradient-amber flex items-center justify-center text-xs font-bold text-primary-foreground">AI</div>
                      <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                        <div className="flex gap-1">
                          {[0,1,2].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask your instructor anything about this domain..."
                    className="resize-none bg-secondary border-border text-foreground placeholder:text-muted-foreground min-h-[44px] max-h-[120px]"
                    rows={1}
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isThinking}
                    className="shrink-0 h-11 w-11 p-0 gradient-amber text-primary-foreground"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
                  Press Enter to send · Shift+Enter for new line · Use mic button to speak
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
