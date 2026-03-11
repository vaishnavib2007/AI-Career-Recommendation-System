import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { getPredictions, clearPredictions } from '@/lib/predictions';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const predictions = getPredictions();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [showDelete, setShowDelete] = useState(false);

  const bestCareer = predictions[0]?.topCareer || 'N/A';
  const avgConf = predictions.length ? (predictions.reduce((a, p) => a + p.confidence, 0) / predictions.length).toFixed(1) + '%' : 'N/A';

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-2xl font-bold mb-6">My Profile</h1>

        <ScrollReveal>
          <div className="glass-card p-6 rounded-xl mb-6 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-3xl font-bold text-primary-foreground mb-4">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h2 className="font-heading text-lg font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">{user?.education}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={50}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Tests Taken', value: predictions.length },
              { label: 'Best Match', value: bestCareer },
              { label: 'Avg Confidence', value: avgConf },
              { label: 'Member Since', value: user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Today' },
            ].map(s => (
              <div key={s.label} className="glass-card p-4 rounded-xl text-center">
                <div className="font-mono text-sm font-bold mb-1">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-card p-6 rounded-xl mb-6">
            <h3 className="font-heading font-semibold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-sm focus:border-primary outline-none" />
              </div>
              <button onClick={() => updateUser({ name, email })} className="px-4 py-2 rounded-lg gradient-bg text-primary-foreground text-sm glow-button">Save Changes</button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="glass-card p-6 rounded-xl border-destructive/30">
            <h3 className="font-heading font-semibold text-destructive mb-2">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mb-4">This will delete your account and all data permanently.</p>
            {!showDelete ? (
              <button onClick={() => setShowDelete(true)} className="px-4 py-2 rounded-lg border border-destructive text-destructive text-sm hover:bg-destructive/10 transition-all">Delete Account</button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => { clearPredictions(); logout(); }} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm">Confirm Delete</button>
                <button onClick={() => setShowDelete(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground">Cancel</button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
