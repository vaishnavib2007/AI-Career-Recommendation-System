import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPredictions } from '@/lib/predictions';
import ScrollReveal from '@/components/ScrollReveal';
import RadarChart from '@/components/RadarChart';
import { getCategoryColor } from '@/lib/careers';
import { Search, X } from 'lucide-react';

export default function HistoryPage() {
  const predictions = useMemo(() => getPredictions(), []);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof predictions[0] | null>(null);

  const filtered = predictions.filter(p =>
    !search || p.topCareer.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (predictions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="font-heading text-xl font-bold mb-2">No predictions yet</h2>
          <p className="text-muted-foreground text-sm mb-4">Take a career test to see your history</p>
          <Link to="/test" className="px-6 py-2 rounded-lg gradient-bg text-primary-foreground glow-button text-sm">Take Career Test</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold">Prediction History</h1>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-4 py-2 rounded-lg bg-muted/30 border border-border text-sm text-foreground focus:border-primary outline-none w-40" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['#', 'Name', 'Age', 'Stream', 'Personality', 'Top Career', 'Confidence', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 font-mono">{p.age}</td>
                    <td className="px-4 py-3">{p.stream}</td>
                    <td className="px-4 py-3">{p.personality}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor('Technology')}`}>{p.topCareer}</span>
                    </td>
                    <td className="px-4 py-3 font-mono">{p.confidence}%</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(p)} className="text-xs text-primary hover:underline">👁 View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative glass-card p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto animate-fade-in-up">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
            <h2 className="font-heading text-xl font-bold mb-4">{selected.topCareer}</h2>
            <p className="text-sm text-muted-foreground mb-4">{selected.why}</p>
            <div className="flex justify-center mb-4">
              <RadarChart
                labels={['Logic', 'Create', 'Comm', 'Tech', 'Math', 'Bio', 'Lead', 'ProbS', 'Risk', 'Stress', 'Learn']}
                values={[selected.scores.logical_score, selected.scores.creative_score, selected.scores.communication_score, selected.scores.tech_score, selected.scores.math_score, selected.scores.biology_score, selected.scores.leadership_score, selected.scores.problem_solving_score, selected.scores.risk_taking_level, selected.scores.stress_tolerance, selected.scores.learning_speed]}
                size={240}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-full glass-card text-xs">💰 {selected.salary}</span>
              <span className="px-2 py-1 rounded-full glass-card text-xs">📈 {selected.demand}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
