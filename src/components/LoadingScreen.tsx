import { useEffect, useState } from 'react';

const messages = ["Initializing AI Engine...", "Loading Career Database...", "Ready!"];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setMsgIdx(1), 600);
    const t2 = setTimeout(() => setMsgIdx(2), 1200);
    const t3 = setTimeout(onComplete, 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-3xl">🔮</div>
        <div className="absolute inset-0 rounded-full gradient-bg animate-pulse-ring opacity-50" />
        <div className="absolute inset-0 rounded-full gradient-bg animate-pulse-ring opacity-30" style={{ animationDelay: '0.5s' }} />
      </div>
      <h1 className="font-heading text-2xl font-bold mb-3 gradient-text">CareerAI</h1>
      <p className="text-muted-foreground text-sm font-mono">{messages[msgIdx]}</p>
      <div className="mt-6 w-48 h-1 rounded-full bg-muted overflow-hidden">
        <div className="h-full gradient-bg rounded-full transition-all duration-500 ease-out" style={{ width: `${((msgIdx + 1) / 3) * 100}%` }} />
      </div>
    </div>
  );
}
