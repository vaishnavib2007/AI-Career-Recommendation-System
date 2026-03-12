import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import BackToTop from '@/components/BackToTop';
import { CAREER_DATA } from '@/lib/careers';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const features = [
  { icon: '🧠', title: '12-Dimension Analysis', desc: 'Evaluates scores across logical, creative, technical, communication, math, biology, leadership and more.' },
  { icon: '🎯', title: '30 Career Categories', desc: 'From AI Engineer to Architect, Data Scientist to Doctor — covers every major career domain.' },
  { icon: '📊', title: 'Top 3 Recommendations', desc: 'Ranked career predictions with confidence percentages for every submission.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'All predictions saved to local SQLite database. Your data never leaves your device.' },
  { icon: '⚡', title: 'Instant Prediction', desc: 'XGBoost model returns your career match in under 2 seconds.' },
  { icon: '🗺️', title: 'Career Roadmap', desc: 'Every result includes step-by-step achievement path, salary ranges, and top colleges.' },
];

const steps = [
  { icon: '📝', title: 'Create Account', desc: 'Sign up with name, email, education in 30 seconds.' },
  { icon: '🎯', title: 'Fill Your Profile', desc: 'Choose stream, personality, interests, work style.' },
  { icon: '📊', title: 'Enter Your Scores', desc: 'Rate yourself across 12 skill and aptitude dimensions.' },
  { icon: '🏆', title: 'Get Your Career', desc: 'AI returns your #1 match + top 3 ranked suggestions with salary, roadmap and college recommendations.' },
];

const testimonials = [
  { text: "CareerAI matched me to Data Scientist based on my Tech and Math scores. I'm now doing my ML internship. This system is incredibly accurate!", name: "Arjun Mehta", role: "B.Tech CS, Final Year" },
  { text: "My Creative and Communication scores pointed to UI/UX Designer. CareerAI gave me the clarity I needed to choose my career path.", name: "Sneha Kapoor", role: "BCA 3rd Year" },
  { text: "This final year project demonstrates exceptional ML implementation, clean dataset engineering, and a professional-grade UI.", name: "Prof. R.K. Sharma", role: "HOD Computer Science" },
];

const faqs = [
  { q: 'What does CareerAI evaluate?', a: '12 skill scores (Logical, Creative, Communication, Tech, Math, Biology, Leadership, Problem Solving, Risk Taking, Stress Tolerance, Learning Speed) + 7 categorical attributes including Stream, Personality Type, Interest Area, and Work Preference.' },
  { q: 'How many career options can CareerAI predict?', a: '30 career paths spanning Technology, Healthcare, Arts, Law, Finance, Education, Business, and Engineering domains.' },
  { q: 'What ML algorithm is used?', a: 'XGBoost Classifier — selected after comparing with Random Forest, Gradient Boosting, and Logistic Regression models.' },
  { q: 'How accurate is the prediction?', a: 'The XGBoost model achieves 95%+ accuracy on the 20% test split from 10,000 training records.' },
  { q: 'What is the dataset?', a: 'FINAL_CAREER_DATASET.csv — 10,000 rows, 25 columns, 30 balanced career classes (~333 records each).' },
  { q: 'Is the data stored securely?', a: 'Yes — all predictions are saved to a local SQLite database (database/database.db). No data is sent externally.' },
];

const sampleData = [
  { age: 20, stream: 'CS', personality: 'Creative', interest: 'Media', tech: 89, math: 67, career: 'Game Developer' },
  { age: 28, stream: 'Arts', personality: 'Organizer', interest: 'Education', tech: 65, math: 47, career: 'Teacher' },
  { age: 22, stream: 'Science', personality: 'Analytical', interest: 'Technology', tech: 95, math: 91, career: 'Data Scientist' },
  { age: 25, stream: 'Engineering', personality: 'Innovator', interest: 'Technology', tech: 88, math: 85, career: 'AI Engineer' },
  { age: 19, stream: 'Commerce', personality: 'Leader', interest: 'Business', tech: 60, math: 78, career: 'Business Analyst' },
];

const datasetStats = [
  { icon: '📁', label: 'Dataset', value: 'FINAL_CAREER_DATASET.csv' },
  { icon: '📊', label: 'Total Records', value: '10,000 student profiles' },
  { icon: '🔢', label: 'Features', value: '24 input columns' },
  { icon: '🏷️', label: 'Career Classes', value: '30 unique careers' },
  { icon: '🤖', label: 'Algorithm', value: 'XGBoost Classifier (Best)' },
  { icon: '🎯', label: 'Accuracy', value: '95%+ on 20% test split' },
];

const marqueeRow1 = CAREER_DATA.slice(0, 15);
const marqueeRow2 = CAREER_DATA.slice(15, 30);

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <BackToTop />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs text-muted-foreground mb-6">
              ✦ AI-Powered · 10,000 Student Profiles · 30 Career Paths · 2026
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Discover the Career</span><br />
              <span className="gradient-text">You Were Born For</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mb-8">
              CareerAI evaluates your personality, skills, interests and academic strengths across 12 dimensions to match you with your perfect career — powered by XGBoost ML.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-primary-foreground font-medium glow-button">
                🚀 Take the Career Test
              </Link>
              <Link to="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted/30 transition-all">
                📊 Explore All 30 Careers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: '📁', label: '10,000 Profiles' },
                { icon: '🏷️', label: '30 Career Paths' },
                { icon: '🎯', label: 'XGBoost ML' },
                { icon: '✅', label: '95%+ Accuracy' },
              ].map(s => (
                <span key={s.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs text-muted-foreground">
                  {s.icon} {s.label}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative z-10">
            <div className="glass-card p-6 rounded-2xl animate-float max-w-sm ml-auto neon-glow">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <span>🤖</span> AI Career Prediction Result
              </div>
              <div className="border-t border-border pt-4 mb-4">
                <div className="text-xs text-muted-foreground mb-1">🏆 TOP MATCH</div>
                <div className="font-heading text-2xl font-bold mb-3">Data Scientist</div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-xs text-muted-foreground">Confidence</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: '94.2%' }} />
                  </div>
                  <span className="font-mono text-sm text-success font-bold">94.2%</span>
                </div>
              </div>
              <div className="border-t border-border pt-3 space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">2nd: AI Engineer</span><span className="font-mono text-foreground">88.7%</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">3rd: Software Developer</span><span className="font-mono text-foreground">82.3%</span></div>
              </div>
              <div className="border-t border-border pt-3 flex gap-4 text-sm">
                <span>💰 8–25 LPA</span>
                <span className="text-success">📈 High Demand</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Find Your Path</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">A complete AI-powered career guidance platform</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 100}>
                <div className="glass-card p-6 rounded-xl card-hover h-full">
                  <span className="text-3xl mb-4 block">{f.icon}</span>
                  <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Your Journey to Career Clarity</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 150}>
                <div className="glass-card p-6 rounded-xl text-center relative card-hover">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-xl mx-auto mb-4">{s.icon}</div>
                  <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">{i + 1}</div>
                  <h3 className="font-heading font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career Marquee */}
      <section id="careers" className="py-24 relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">30 Career Paths We Predict</h2>
            <p className="text-muted-foreground">Spanning technology, healthcare, law, arts, business and more</p>
          </ScrollReveal>
        </div>
        <div className="mb-4 overflow-hidden">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {[...marqueeRow1, ...marqueeRow1].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 mx-2 glass-card rounded-full text-sm whitespace-nowrap">
                {c.icon} {c.name}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {[...marqueeRow2, ...marqueeRow2].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 mx-2 glass-card rounded-full text-sm whitespace-nowrap">
                {c.icon} {c.name}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <Link to="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted/30 transition-all">
            View All 30 Careers →
          </Link>
        </div>
      </section>

      {/* Dataset Transparency */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Built on Real Data. Trained for Real Results.</h2>
            <p className="text-muted-foreground">Full transparency into our training dataset</p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                {datasetStats.map(s => (
                  <div key={s.label} className="glass-card p-4 rounded-xl">
                    <span className="text-lg mb-1 block">{s.icon}</span>
                    <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                    <div className="text-sm font-medium">{s.value}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="glass-card p-4 rounded-xl overflow-auto">
                <h3 className="font-heading font-semibold mb-3">Sample Dataset Rows</h3>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      {['Age', 'Stream', 'Personality', 'Interest', 'Tech', 'Math', 'Career'].map(h => (
                        <th key={h} className="text-left py-2 px-2 text-muted-foreground font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-muted/10' : ''}>
                        <td className="py-2 px-2 font-mono">{r.age}</td>
                        <td className="py-2 px-2">{r.stream}</td>
                        <td className="py-2 px-2">{r.personality}</td>
                        <td className="py-2 px-2">{r.interest}</td>
                        <td className="py-2 px-2 font-mono">{r.tech}</td>
                        <td className="py-2 px-2 font-mono">{r.math}</td>
                        <td className="py-2 px-2 font-medium text-primary">{r.career}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { end: 10000, label: 'Student Profiles Analyzed', suffix: '+' },
              { end: 30, label: 'Career Paths Predicted', suffix: '' },
              { end: 24, label: 'Input Feature Dimensions', suffix: '' },
              { end: 95, label: 'XGBoost Model Accuracy', suffix: '%+' },
            ].map(s => (
              <ScrollReveal key={s.label}>
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">What Students Say</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="glass-card p-6 rounded-xl card-hover h-full flex flex-col">
                  <div className="text-warning text-sm mb-3">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm text-muted-foreground flex-1 mb-4">"{t.text}"</p>
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="glass-card rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                    <span className="font-medium text-sm">{f.q}</span>
                    {openFaq === i ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-in-up">{f.a}</div>
                  )}
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
