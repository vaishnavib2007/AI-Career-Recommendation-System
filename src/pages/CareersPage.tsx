import { useState, useMemo } from 'react';
import { CAREER_DATA, CAREER_CATEGORIES, getCategoryColor, getDemandColor } from '@/lib/careers';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BackToTop from '@/components/BackToTop';
import { X, Search } from 'lucide-react';

export default function CareersPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<typeof CAREER_DATA[0] | null>(null);

  const filtered = useMemo(() => {
    return CAREER_DATA.filter(c => {
      if (category !== 'All' && c.category !== category) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <BackToTop />

      <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        <ScrollReveal className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-5xl font-bold mb-3">Explore All 30 Career Paths</h1>
          <p className="text-muted-foreground">Click any career to see salary, roadmap and college details</p>
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search careers..." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted/30 border border-border text-sm text-foreground focus:border-primary outline-none" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CAREER_CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${category === c ? 'gradient-bg text-primary-foreground' : 'glass-card text-muted-foreground hover:text-foreground'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 30}>
              <button onClick={() => setSelected(c)} className="w-full text-left glass-card p-5 rounded-xl card-hover">
                <span className="text-3xl block mb-2">{c.icon}</span>
                <h3 className="font-heading font-semibold mb-1">{c.name}</h3>
                <div className="flex gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${getDemandColor(c.demand)}`}>{c.demand}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${getCategoryColor(c.category)}`}>{c.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{c.description}</p>
                <span className="font-mono text-xs text-muted-foreground">💰 {c.salary}</span>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative glass-card p-6 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto animate-fade-in-up">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selected.icon}</span>
              <div>
                <h2 className="font-heading text-xl font-bold">{selected.name}</h2>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${getDemandColor(selected.demand)}`}>{selected.demand} Demand</span>
                  <span className="font-mono text-xs text-muted-foreground">💰 {selected.salary}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{selected.why}</p>
            <h4 className="font-heading font-semibold text-sm mb-2">Steps to Achieve</h4>
            <ol className="space-y-2 mb-4">
              {selected.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="font-mono text-xs text-primary mt-0.5">{i + 1}.</span>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
            <h4 className="font-heading font-semibold text-sm mb-2">Top Colleges</h4>
            <div className="flex flex-wrap gap-2">
              {selected.colleges.map(c => (
                <span key={c} className="px-2 py-1 rounded-full glass-card text-xs">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
