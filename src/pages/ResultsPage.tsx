import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPredictions, PredictionRecord } from '@/lib/predictions';
import RadarChart from '@/components/RadarChart';
import ScrollReveal from '@/components/ScrollReveal';
import { getDemandColor } from '@/lib/careers';
import confetti from 'canvas-confetti';

export default function ResultsPage() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const predictions = useMemo(() => getPredictions(), []);
  const record = predictions.find(p => p.id === id) || predictions[0];
  const [confProgress, setConfProgress] = useState(0);
  const [showName, setShowName] = useState('');

  useEffect(() => {
    if (!record) return;
    // Confetti
    confetti({ particleCount: 100, spread: 70, colors: ['#4f46e5', '#06b6d4', '#fbbf24'], origin: { y: 0.6 } });
    // Animate confidence
    const target = record.confidence;
    let current = 0;
    const step = target / 60;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setConfProgress(target); clearInterval(t); }
      else setConfProgress(Math.round(current * 10) / 10);
    }, 25);
    // Typewriter
    let charIdx = 0;
    const tw = setInterval(() => {
      charIdx++;
      setShowName(record.topCareer.slice(0, charIdx));
      if (charIdx >= record.topCareer.length) clearInterval(tw);
    }, 80);
    return () => { clearInterval(t); clearInterval(tw); };
  }, [record]);

  if (!record) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="font-heading text-xl font-bold mb-2">No results yet</h2>
          <p className="text-muted-foreground text-sm mb-4">Take a career test to see your results</p>
          <Link to="/test" className="px-6 py-2 rounded-lg gradient-bg text-primary-foreground glow-button text-sm">Take Career Test</Link>
        </div>
      </div>
    );
  }

  const radarLabels = ['Logical', 'Creative', 'Comm.', 'Tech', 'Math', 'Bio', 'Leadership', 'Problem S.', 'Risk', 'Stress', 'Learning'];
  const radarValues = [
    record.scores.logical_score, record.scores.creative_score, record.scores.communication_score,
    record.scores.tech_score, record.scores.math_score, record.scores.biology_score,
    record.scores.leadership_score, record.scores.problem_solving_score, record.scores.risk_taking_level,
    record.scores.stress_tolerance, record.scores.learning_speed,
  ];

  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (confProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Demo banner */}
        <div className="mb-6 p-3 rounded-lg bg-warning/10 border border-warning/30 text-warning text-xs text-center">
          🎯 Demo Mode — Results generated from mock prediction engine
        </div>

        {/* Primary Result */}
        <ScrollReveal>
          <div className="glass-card p-8 rounded-2xl neon-glow mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-bold mb-4">🏆 #1 BEST CAREER MATCH</div>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-5xl">{record.top3[0]?.icon}</span>
                  <h1 className="font-heading text-3xl sm:text-5xl font-bold">
                    {showName}<span className="animate-pulse">|</span>
                  </h1>
                </div>
                <p className="text-muted-foreground mt-4 mb-6">{record.why}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-full glass-card text-sm">💰 {record.salary}</span>
                  <span className={`px-3 py-1.5 rounded-full text-sm ${getDemandColor(record.demand)}`}>📈 {record.demand} Demand</span>
                </div>
              </div>

              {/* Circular Progress */}
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--success))" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={dashOffset} className="transition-all duration-100" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-2xl font-bold text-success">{confProgress}%</span>
                  <span className="text-[10px] text-muted-foreground">Confidence</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Top 3 */}
        <ScrollReveal delay={100}>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {record.top3.map((t, i) => (
              <div key={i} className={`glass-card p-5 rounded-xl ${i === 0 ? 'neon-glow' : ''}`}>
                <div className="text-xs text-muted-foreground mb-2">{['🏆 Rank 1', '🥈 Rank 2', '🥉 Rank 3'][i]}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{t.icon}</span>
                  <span className="font-heading font-semibold text-sm">{t.career}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-bg rounded-full transition-all duration-1000" style={{ width: `${t.confidence}%` }} />
                </div>
                <span className="font-mono text-xs text-muted-foreground mt-1 block">{t.confidence}%</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Career Roadmap */}
        <ScrollReveal delay={200}>
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="font-heading font-semibold mb-4">Your Path to Becoming a {record.topCareer}</h3>
            <div className="space-y-4 pl-4 border-l-2 border-primary/30">
              {record.steps.map((s, i) => (
                <div key={i} className="relative pl-6 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="absolute -left-[25px] top-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground">{i + 1}</div>
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Colleges */}
        <ScrollReveal delay={300}>
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="font-heading font-semibold mb-4">Top Colleges for {record.topCareer}</h3>
            <div className="flex flex-wrap gap-2">
              {record.colleges.map(c => (
                <span key={c} className="px-3 py-1.5 rounded-full glass-card text-sm">{c}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Radar */}
        <ScrollReveal delay={400}>
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="font-heading font-semibold mb-4">Your 11-Dimension Academic Profile</h3>
            <div className="flex justify-center">
              <RadarChart labels={radarLabels} values={radarValues} size={320} />
            </div>
          </div>
        </ScrollReveal>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => window.print()} className="px-4 py-2 rounded-lg glass-card text-sm hover:bg-muted/30 transition-all">📥 Download PDF Report</button>
          <Link to="/test" className="px-4 py-2 rounded-lg glass-card text-sm hover:bg-muted/30 transition-all">🔄 Retake Test</Link>
          <Link to="/dashboard" className="px-4 py-2 rounded-lg glass-card text-sm hover:bg-muted/30 transition-all">📊 Dashboard</Link>
          <button className="px-4 py-2 rounded-lg glass-card text-sm hover:bg-muted/30 transition-all">📤 Share Result</button>
        </div>
      </div>
    </div>
  );
}
