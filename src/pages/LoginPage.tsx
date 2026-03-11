import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill all fields'); return; }
    setLoading(true);
    setError('');
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 gradient-bg relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-6">🔮</div>
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-3">CareerAI</h2>
          <p className="text-primary-foreground/80 mb-8">Your AI Career Advisor</p>
          <div className="space-y-3 text-left max-w-xs mx-auto">
            {['Trained on 10,000 Real Student Profiles', '30 Career Paths · XGBoost 95%+ Accuracy', 'Instant Results with Salary & Roadmap'].map(t => (
              <div key={t} className="flex items-center gap-2 text-primary-foreground/90 text-sm">
                <span className="text-success">✓</span> {t}
              </div>
            ))}
          </div>
          <div className="mt-12 flex gap-3 text-2xl justify-center opacity-50">
            🤖 💻 🏥 ⚖️ 📊 🎨 🏫 🚀
          </div>
          <p className="text-primary-foreground/50 text-xs mt-8">Final Year CS Project · 2025</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="glass-card p-8 rounded-2xl w-full max-w-md">
          <h1 className="font-heading text-2xl font-bold mb-1">Welcome Back 👋</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to continue your career journey</p>

          {error && <div className="text-destructive text-sm mb-4 p-3 rounded-lg bg-destructive/10">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">📧 Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">🔒 Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg gradient-bg text-primary-foreground font-medium glow-button disabled:opacity-50 transition-all">
              {loading ? <span className="inline-block animate-spin mr-2">⏳</span> : null}
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button className="w-full py-2.5 rounded-lg border border-border text-foreground text-sm hover:bg-muted/30 transition-all flex items-center justify-center gap-2">
            <span>G</span> Continue with Google
          </button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
