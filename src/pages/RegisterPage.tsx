import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Medium', 'Strong'][strength];
  const strengthColor = ['', 'bg-destructive', 'bg-warning', 'bg-success'][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !education || !password) { setError('Please fill all fields'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (!agreed) { setError('Please agree to Terms'); return; }
    setLoading(true); setError('');
    const ok = await register(name, email, education, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="glass-card p-8 rounded-2xl w-full max-w-md">
          <h1 className="font-heading text-2xl font-bold mb-1">Create Your Account</h1>
          <p className="text-sm text-muted-foreground mb-6">Join thousands discovering their ideal career</p>

          {error && <div className="text-destructive text-sm mb-4 p-3 rounded-lg bg-destructive/10">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">👤 Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">📧 Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">🎓 Education Level</label>
              <select value={education} onChange={e => setEducation(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                <option value="">Select...</option>
                {['High School', 'Diploma', 'Undergraduate', 'Postgraduate'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">🔒 Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strengthColor}`} style={{ width: `${(strength / 3) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{strengthLabel}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">🔒 Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="••••••••" />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="rounded" />
              I agree to Terms of Service and Privacy Policy
            </label>
            <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg gradient-bg text-primary-foreground font-medium glow-button disabled:opacity-50 transition-all">
              {loading ? 'Creating...' : 'Create My Account →'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Login →</Link>
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex w-1/2 gradient-bg relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 text-center">
          <div className="text-7xl mb-6">🚀</div>
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">Start Your Journey</h2>
          <p className="text-primary-foreground/70 max-w-xs mx-auto mb-8">Discover your ideal career path with AI-powered analysis across 12 dimensions.</p>
          <div className="flex gap-4 justify-center">
            {['10,000 Profiles', '30 Careers', 'Free to Use'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
