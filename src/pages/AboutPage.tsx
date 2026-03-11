import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import BackToTop from '@/components/BackToTop';

const modelComparison = [
  { name: 'XGBoost', type: 'Boosting', accuracy: '95.4%', best: true },
  { name: 'Random Forest', type: 'Ensemble', accuracy: '92.1%', best: false },
  { name: 'Gradient Boosting', type: 'Boosting', accuracy: '91.8%', best: false },
  { name: 'Logistic Regression', type: 'Linear', accuracy: '87.3%', best: false },
];

const timeline = [
  'Dataset Collection & Verification',
  'Data Preprocessing & Feature Engineering',
  'ML Model Training & Comparison',
  'Flask REST API Development',
  'SQLite Database Integration',
  'Frontend Design & Development',
  'Integration Testing & Deployment',
];

const techStack = [
  { icon: '🐍', name: 'Python 3.x', desc: 'Core backend language' },
  { icon: '⚗️', name: 'Flask', desc: 'REST API framework' },
  { icon: '🤖', name: 'XGBoost', desc: 'Primary ML model' },
  { icon: '📊', name: 'scikit-learn', desc: 'Preprocessing + model comparison' },
  { icon: '🗄️', name: 'SQLite', desc: 'Local prediction database' },
  { icon: '🌐', name: 'HTML/CSS/JS', desc: 'Frontend interface' },
  { icon: '📈', name: 'Chart.js', desc: 'Radar, donut, bar charts' },
  { icon: '🎨', name: 'Lovable', desc: 'UI design platform' },
];

const numericalFeatures = [
  'Age (15–35)', 'Logical_Score', 'Creative_Score', 'Communication_Score',
  'Tech_Score', 'Math_Score', 'Biology_Score', 'Leadership_Score',
  'Problem_Solving_Score', 'Risk_Taking_Level', 'Stress_Tolerance', 'Learning_Speed',
];

const categoricalFeatures = [
  'Education_Level (4 values)', 'Stream (5 values)', 'Personality_Type (7 values)',
  'Preferred_Work_Style (3 values)', 'Interest_Area (8 values)', 'Work_Preference (4 values)',
];

const statsGrid = [
  { icon: '📁', label: 'Dataset', value: 'FINAL_CAREER_DATASET.csv' },
  { icon: '📊', label: 'Records', value: '10,000 student profiles' },
  { icon: '🔢', label: 'Feature Cols', value: '24 input features' },
  { icon: '🏷️', label: 'Career Classes', value: '30 unique careers' },
  { icon: '🤖', label: 'Algorithm', value: 'XGBoost Classifier' },
  { icon: '🔀', label: 'Train Split', value: '80% / 20%' },
  { icon: '✅', label: 'Accuracy', value: '95%+ on test set' },
  { icon: '⚖️', label: 'Class Balance', value: '~333–334 per career' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <BackToTop />

      {/* Hero */}
      <section className="pt-28 pb-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">About <span className="gradient-text">CareerAI</span></h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Final Year B.Tech Computer Science Project — AI-Powered Career Recommendation System</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass-card p-6 rounded-xl">
                <h2 className="font-heading text-xl font-bold mb-4">Project Overview</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CareerAI is a Final Year B.Tech Computer Science project — an AI-powered career recommendation system using XGBoost ML trained on 10,000 real student profiles across 25 feature dimensions to predict the most suitable career from 30 paths.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 gap-3">
                {statsGrid.map(s => (
                  <div key={s.label} className="glass-card p-3 rounded-xl">
                    <span className="text-lg">{s.icon}</span>
                    <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
                    <div className="text-xs font-medium mt-0.5">{s.value}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Model Comparison */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold text-center mb-8">Model Performance Comparison</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground">Model</th>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs text-muted-foreground">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {modelComparison.map(m => (
                    <tr key={m.name} className={`border-b border-border/50 ${m.best ? 'bg-primary/5' : ''}`}>
                      <td className="px-4 py-3 font-medium">{m.best ? '🏆 ' : '   '}{m.name}{m.best ? ' (BEST)' : ''}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.type}</td>
                      <td className="px-4 py-3 font-mono">{m.accuracy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">Best model saved to model/career_model.pkl</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Breakdown */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold">24 Input Features Used for Training</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="glass-card p-5 rounded-xl">
                <h3 className="font-heading font-semibold mb-3 text-sm">Numerical (12)</h3>
                <ul className="space-y-1.5">
                  {numericalFeatures.map(f => (
                    <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="glass-card p-5 rounded-xl">
                <h3 className="font-heading font-semibold mb-3 text-sm">Categorical (6 + Label-encoded)</h3>
                <ul className="space-y-1.5">
                  {categoricalFeatures.map(f => (
                    <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold">Tech Stack</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {techStack.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 60}>
                <div className="glass-card p-4 rounded-xl text-center card-hover">
                  <span className="text-2xl block mb-2">{t.icon}</span>
                  <div className="font-medium text-sm mb-1">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground">{t.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold">Project Timeline</h2>
          </ScrollReveal>
          <div className="space-y-4 pl-4 border-l-2 border-primary/30">
            {timeline.map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative pl-6">
                  <div className="absolute -left-[25px] w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground">{i + 1}</div>
                  <p className="text-sm">Phase {i + 1}: {t}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold">Team</h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'Student Developer', role: 'ML Engineer · Full Stack Developer', initials: 'SD' },
              { name: 'Prof. R.K. Sharma', role: 'Project Guide', initials: 'RS' },
            ].map(m => (
              <ScrollReveal key={m.name}>
                <div className="glass-card p-6 rounded-xl text-center w-60 card-hover">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-xl font-bold text-primary-foreground mx-auto mb-3">{m.initials}</div>
                  <div className="font-heading font-semibold text-sm">{m.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
