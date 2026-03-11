import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import RadarChart from '@/components/RadarChart';
import { getMockPrediction, CAREER_DATA } from '@/lib/careers';
import { savePrediction } from '@/lib/predictions';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const STEPS = ['Personal Info', 'Personality & Interests', 'Skills Part 1', 'Skills Part 2', 'Review & Submit'];

const educationOptions = ['High School', 'Diploma', 'Undergraduate', 'Postgraduate'];
const streamOptions = ['Science', 'Arts', 'Commerce', 'Computer Science', 'Engineering'];
const personalityOptions = [
  { value: 'Analytical', icon: '🔍', desc: 'Logic and data-driven thinking' },
  { value: 'Creative', icon: '🎨', desc: 'Imagination and innovation' },
  { value: 'Helper', icon: '🤝', desc: 'Empathy and support for others' },
  { value: 'Innovator', icon: '💡', desc: 'New ideas and disruption' },
  { value: 'Leader', icon: '👑', desc: 'Guiding and motivating teams' },
  { value: 'Organizer', icon: '📋', desc: 'Structure and planning' },
  { value: 'Researcher', icon: '🔬', desc: 'Deep investigation and analysis' },
];
const interestOptions = [
  { value: 'Business', icon: '💼' }, { value: 'Design', icon: '🎨' },
  { value: 'Education', icon: '📚' }, { value: 'Finance', icon: '💰' },
  { value: 'Healthcare', icon: '🏥' }, { value: 'Law', icon: '⚖️' },
  { value: 'Media', icon: '📺' }, { value: 'Technology', icon: '💻' },
];
const workStyleOptions = ['Hybrid', 'Independent', 'Team'];
const workPrefOptions = ['Office', 'Remote', 'Hybrid', 'Field'];

const skillsP1 = [
  { key: 'logical_score', label: 'Logical Score', icon: '🧠', desc: 'Reasoning, critical thinking, pattern recognition', min: 5, max: 95 },
  { key: 'creative_score', label: 'Creative Score', icon: '🎨', desc: 'Imagination, innovation, out-of-the-box thinking', min: 5, max: 100 },
  { key: 'communication_score', label: 'Communication Score', icon: '💬', desc: 'Speaking, writing, interpersonal skills', min: 5, max: 98 },
  { key: 'tech_score', label: 'Tech Score', icon: '💻', desc: 'Computer proficiency, software, coding ability', min: 5, max: 100 },
  { key: 'math_score', label: 'Math Score', icon: '📐', desc: 'Numerical reasoning, calculations, statistics', min: 5, max: 100 },
  { key: 'biology_score', label: 'Biology Score', icon: '🔬', desc: 'Life sciences, anatomy, environmental knowledge', min: 5, max: 100 },
];

const skillsP2 = [
  { key: 'leadership_score', label: 'Leadership Score', icon: '👑', desc: 'Ability to guide, manage and motivate others', min: 5, max: 95 },
  { key: 'problem_solving_score', label: 'Problem Solving Score', icon: '🧩', desc: 'Tackling challenges, finding solutions under pressure', min: 5, max: 95 },
  { key: 'risk_taking_level', label: 'Risk Taking Level', icon: '⚡', desc: 'Comfort with uncertainty, bold decision-making', min: 30, max: 100 },
  { key: 'stress_tolerance', label: 'Stress Tolerance', icon: '😌', desc: 'Handling pressure, deadlines and difficult situations', min: 40, max: 95 },
  { key: 'learning_speed', label: 'Learning Speed', icon: '📈', desc: 'How quickly you absorb and apply new knowledge', min: 45, max: 90 },
];

function getSliderColor(val: number): string {
  if (val <= 40) return 'hsl(0, 84%, 60%)';
  if (val <= 70) return 'hsl(38, 92%, 50%)';
  return 'hsl(160, 84%, 39%)';
}

export default function CareerTestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [form, setForm] = useState({
    name: user?.name || '',
    age: 22,
    education: user?.education || '',
    stream: '',
    personality: '',
    interestArea: '',
    workStyle: '',
    workPreference: '',
    logical_score: 50, creative_score: 50, communication_score: 50,
    tech_score: 50, math_score: 50, biology_score: 50,
    leadership_score: 50, problem_solving_score: 50,
    risk_taking_level: 60, stress_tolerance: 65, learning_speed: 65,
  });

  const set = useCallback((key: string, value: string | number) => {
    setForm(f => ({ ...f, [key]: value }));
  }, []);

  const fillDemo = () => {
    setForm({
      name: 'Demo Student', age: 22, education: 'Undergraduate', stream: 'Computer Science',
      personality: 'Analytical', interestArea: 'Technology', workStyle: 'Hybrid', workPreference: 'Remote',
      logical_score: 85, creative_score: 60, communication_score: 70, tech_score: 92,
      math_score: 88, biology_score: 30, leadership_score: 65, problem_solving_score: 80,
      risk_taking_level: 55, stress_tolerance: 70, learning_speed: 75,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(p => Math.min(p + 2, 95));
    }, 35);

    await new Promise(r => setTimeout(r, 1800));
    clearInterval(interval);
    setLoadingProgress(100);

    const scores: Record<string, number> = {
      logical_score: form.logical_score, creative_score: form.creative_score,
      communication_score: form.communication_score, tech_score: form.tech_score,
      math_score: form.math_score, biology_score: form.biology_score,
      leadership_score: form.leadership_score, problem_solving_score: form.problem_solving_score,
      risk_taking_level: form.risk_taking_level, stress_tolerance: form.stress_tolerance,
      learning_speed: form.learning_speed,
    };

    const prediction = getMockPrediction(scores);
    const topCareer = prediction.top3[0];

    const record = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      name: form.name,
      age: form.age,
      stream: form.stream,
      personality: form.personality,
      interestArea: form.interestArea,
      workStyle: form.workStyle,
      workPreference: form.workPreference,
      education: form.education,
      scores,
      topCareer: topCareer.career.name,
      confidence: topCareer.confidence,
      top3: prediction.top3.map(t => ({ career: t.career.name, confidence: t.confidence, icon: t.career.icon })),
      why: topCareer.career.why,
      steps: topCareer.career.steps,
      salary: topCareer.career.salary,
      colleges: topCareer.career.colleges,
      demand: topCareer.career.demand,
    };

    savePrediction(record);
    await new Promise(r => setTimeout(r, 300));
    navigate(`/results?id=${record.id}`);
  };

  const radarLabels1 = skillsP1.map(s => s.label.replace(' Score', ''));
  const radarValues1 = skillsP1.map(s => form[s.key as keyof typeof form] as number);
  const allRadarLabels = [...skillsP1, ...skillsP2].map(s => s.label.replace(' Score', '').replace(' Level', ''));
  const allRadarValues = [...skillsP1, ...skillsP2].map(s => form[s.key as keyof typeof form] as number);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="text-6xl animate-pulse">🧠</div>
          <div className="absolute inset-0 animate-pulse-ring rounded-full gradient-bg opacity-30" />
        </div>
        <h2 className="font-heading text-xl font-bold mb-2">XGBoost AI is analyzing your profile...</h2>
        <p className="text-muted-foreground text-sm mb-6">Comparing with 10,000 student profiles...</p>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-bg rounded-full transition-all duration-100 ease-out" style={{ width: `${loadingProgress}%` }} />
        </div>
        <span className="font-mono text-sm text-muted-foreground mt-2">{loadingProgress}%</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold">Career Test</h1>
          <button onClick={fillDemo} className="text-xs px-3 py-1.5 rounded-full glass-card text-accent hover:text-foreground transition-colors">
            🎲 Fill Demo Data
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-success text-success-foreground' : i === step ? 'gradient-bg text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{s}</span>
              {i < STEPS.length - 1 && <div className="hidden" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="font-heading text-lg font-semibold">Tell us about yourself</h2>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">👤 Full Name</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary outline-none transition-all" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">🎂 Age: <span className="font-mono text-lg text-foreground font-bold">{form.age} years old</span></label>
                <input type="range" min={15} max={35} value={form.age} onChange={e => set('age', +e.target.value)} className="w-full" style={{ background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((form.age - 15) / 20) * 100}%, hsl(var(--muted)) ${((form.age - 15) / 20) * 100}%, hsl(var(--muted)) 100%)` }} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">🎓 Education Level</label>
                <div className="grid grid-cols-2 gap-3">
                  {educationOptions.map(e => (
                    <button key={e} onClick={() => set('education', e)} className={`p-3 rounded-xl border text-sm text-left transition-all ${form.education === e ? 'border-primary bg-primary/10 text-foreground neon-glow' : 'border-border hover:border-muted-foreground text-muted-foreground'}`}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">📚 Stream</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {streamOptions.map(s => (
                    <button key={s} onClick={() => set('stream', s)} className={`p-3 rounded-xl border text-sm transition-all ${form.stream === s ? 'border-primary bg-primary/10 text-foreground neon-glow' : 'border-border hover:border-muted-foreground text-muted-foreground'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-heading text-lg font-semibold">Your personality and interests</h2>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">🧠 Personality Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {personalityOptions.map(p => (
                    <button key={p.value} onClick={() => set('personality', p.value)} className={`p-3 rounded-xl border text-left transition-all ${form.personality === p.value ? 'border-primary bg-primary/10 neon-glow' : 'border-border hover:border-muted-foreground'}`}>
                      <span className="text-xl">{p.icon}</span>
                      <div className="font-medium text-sm mt-1">{p.value}</div>
                      <div className="text-[10px] text-muted-foreground">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">🎯 Interest Area</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {interestOptions.map(i => (
                    <button key={i.value} onClick={() => set('interestArea', i.value)} className={`p-3 rounded-xl border text-center transition-all ${form.interestArea === i.value ? 'border-primary bg-primary/10 neon-glow' : 'border-border hover:border-muted-foreground'}`}>
                      <span className="text-xl block">{i.icon}</span>
                      <span className="text-sm">{i.value}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">💼 Preferred Work Style</label>
                <div className="flex gap-3">
                  {workStyleOptions.map(w => (
                    <button key={w} onClick={() => set('workStyle', w)} className={`flex-1 p-3 rounded-xl border text-sm text-center transition-all ${form.workStyle === w ? 'border-primary bg-primary/10 neon-glow' : 'border-border hover:border-muted-foreground text-muted-foreground'}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">🏢 Work Preference</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {workPrefOptions.map(w => (
                    <button key={w} onClick={() => set('workPreference', w)} className={`p-3 rounded-xl border text-sm text-center transition-all ${form.workPreference === w ? 'border-primary bg-primary/10 neon-glow' : 'border-border hover:border-muted-foreground text-muted-foreground'}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-heading text-lg font-semibold">Rate your cognitive skills</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-5">
                  {skillsP1.map(s => (
                    <div key={s.key}>
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="mr-1">{s.icon}</span>
                          <span className="text-sm font-medium">{s.label}</span>
                        </div>
                        <span className="font-mono text-lg font-bold" style={{ color: getSliderColor(form[s.key as keyof typeof form] as number) }}>
                          {form[s.key as keyof typeof form]}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-1">{s.desc}</p>
                      <input type="range" min={s.min} max={s.max} value={form[s.key as keyof typeof form]} onChange={e => set(s.key, +e.target.value)}
                        className="w-full" style={{ background: `linear-gradient(to right, ${getSliderColor(form[s.key as keyof typeof form] as number)} 0%, ${getSliderColor(form[s.key as keyof typeof form] as number)} ${((form[s.key as keyof typeof form] as number - s.min) / (s.max - s.min)) * 100}%, hsl(var(--muted)) ${((form[s.key as keyof typeof form] as number - s.min) / (s.max - s.min)) * 100}%, hsl(var(--muted)) 100%)` }} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div>
                    <h3 className="text-sm text-center text-muted-foreground mb-2">Your Skill Profile — Live</h3>
                    <RadarChart labels={radarLabels1} values={radarValues1} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-heading text-lg font-semibold">Rate your personality-based skills</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-5">
                  {skillsP2.map(s => (
                    <div key={s.key}>
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="mr-1">{s.icon}</span>
                          <span className="text-sm font-medium">{s.label}</span>
                        </div>
                        <span className="font-mono text-lg font-bold" style={{ color: getSliderColor(form[s.key as keyof typeof form] as number) }}>
                          {form[s.key as keyof typeof form]}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mb-1">{s.desc}</p>
                      <input type="range" min={s.min} max={s.max} value={form[s.key as keyof typeof form]} onChange={e => set(s.key, +e.target.value)}
                        className="w-full" style={{ background: `linear-gradient(to right, ${getSliderColor(form[s.key as keyof typeof form] as number)} 0%, ${getSliderColor(form[s.key as keyof typeof form] as number)} ${((form[s.key as keyof typeof form] as number - s.min) / (s.max - s.min)) * 100}%, hsl(var(--muted)) ${((form[s.key as keyof typeof form] as number - s.min) / (s.max - s.min)) * 100}%, hsl(var(--muted)) 100%)` }} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div>
                    <h3 className="text-sm text-center text-muted-foreground mb-2">Full 11-Axis Profile</h3>
                    <RadarChart labels={allRadarLabels} values={allRadarValues} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="font-heading text-lg font-semibold">Review Your Complete Profile</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs text-muted-foreground font-semibold uppercase mb-3">Personal</h3>
                  {[['Name', form.name], ['Age', form.age], ['Education', form.education], ['Stream', form.stream]].map(([k, v]) => (
                    <div key={k as string} className="flex justify-between py-2 border-b border-border text-sm">
                      <span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span>
                    </div>
                  ))}
                  <button onClick={() => setStep(0)} className="text-xs text-primary mt-2">Edit →</button>
                </div>
                <div>
                  <h3 className="text-xs text-muted-foreground font-semibold uppercase mb-3">Personality</h3>
                  {[['Personality', form.personality], ['Interest Area', form.interestArea], ['Work Style', form.workStyle], ['Work Pref.', form.workPreference]].map(([k, v]) => (
                    <div key={k as string} className="flex justify-between py-2 border-b border-border text-sm">
                      <span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span>
                    </div>
                  ))}
                  <button onClick={() => setStep(1)} className="text-xs text-primary mt-2">Edit →</button>
                </div>
              </div>
              <div>
                <h3 className="text-xs text-muted-foreground font-semibold uppercase mb-3">Skill Scores</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                  {[...skillsP1, ...skillsP2].map(s => (
                    <div key={s.key} className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground">{s.label.replace(' Score', '').replace(' Level', '')}</span>
                      <span className="font-mono font-medium" style={{ color: getSliderColor(form[s.key as keyof typeof form] as number) }}>
                        {form[s.key as keyof typeof form]}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="text-xs text-primary mt-2">Edit →</button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-all">
            <ArrowLeft size={16} /> Previous
          </button>
          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-6 py-2 rounded-lg gradient-bg text-primary-foreground text-sm font-medium glow-button">
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-primary-foreground font-medium glow-button text-sm animate-pulse">
              🤖 Analyze My Career Profile with AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
