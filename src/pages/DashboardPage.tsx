import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { getPredictions } from '@/lib/predictions';
import RadarChart from '@/components/RadarChart';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import { getCategoryColor, getDemandColor } from '@/lib/careers';
import { Home, Target, BarChart3, Clock, User, Settings, LogOut, Bell, Menu } from 'lucide-react';
import { useState, useMemo } from 'react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Target, label: 'Take Career Test', path: '/test' },
  { icon: BarChart3, label: 'My Results', path: '/results' },
  { icon: Clock, label: 'History', path: '/history' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const predictions = useMemo(() => getPredictions(), []);

  const bestCareer = predictions[0]?.topCareer || 'Not yet tested';
  const avgConf = predictions.length ? (predictions.reduce((a, p) => a + p.confidence, 0) / predictions.length).toFixed(1) : '0';
  const daysSinceJoin = user?.joinDate ? Math.max(1, Math.floor((Date.now() - new Date(user.joinDate).getTime()) / 86400000)) : 1;

  const lastScores = predictions[0]?.scores;
  const radarLabels = ['Logical', 'Creative', 'Comm.', 'Tech', 'Math', 'Bio', 'Leadership', 'Problem S.', 'Risk', 'Stress', 'Learning'];
  const radarValues = lastScores ? [
    lastScores.logical_score, lastScores.creative_score, lastScores.communication_score,
    lastScores.tech_score, lastScores.math_score, lastScores.biology_score,
    lastScores.leadership_score, lastScores.problem_solving_score, lastScores.risk_taking_level,
    lastScores.stress_tolerance, lastScores.learning_speed,
  ] : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 glass-card border-r border-border flex flex-col fixed h-full z-30`}>
        <div className="p-4 flex items-center gap-2">
          <span className="text-xl">🔮</span>
          {sidebarOpen && <span className="font-heading font-bold">CareerAI</span>}
        </div>
        <nav className="flex-1 px-2 mt-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${location.pathname === item.path ? 'bg-primary/15 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'}`}>
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-2 border-t border-border space-y-1">
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30">
            <Settings size={18} />{sidebarOpen && 'Settings'}
          </Link>
          <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
            <LogOut size={18} />{sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Topbar */}
        <header className="glass-navbar sticky top-0 z-20 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
              <Menu size={20} />
            </button>
            <span className="text-sm">Good morning, <strong>{user?.name || 'Student'}</strong>! 👋</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground"><Bell size={18} /></button>
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🎯', label: 'Tests Taken', value: predictions.length },
              { icon: '🏆', label: 'Best Career Match', value: bestCareer, isText: true },
              { icon: '📊', label: 'Avg Confidence', value: `${avgConf}%`, isText: true },
              { icon: '📅', label: 'Days Active', value: daysSinceJoin },
            ].map(s => (
              <ScrollReveal key={s.label}>
                <div className="glass-card p-5 rounded-xl gradient-border">
                  <span className="text-xl mb-2 block">{s.icon}</span>
                  <div className="font-heading text-xl font-bold mb-1">
                    {s.isText ? s.value : <CountUp end={Number(s.value)} />}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quick Action */}
          <ScrollReveal>
            <div className="gradient-bg rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-primary-foreground mb-1">Ready to discover your ideal career?</h3>
                <p className="text-primary-foreground/70 text-sm">AI analyzes 12 skill dimensions across 10,000 profiles instantly</p>
              </div>
              <Link to="/test" className="px-6 py-3 rounded-lg bg-background text-foreground font-medium hover:bg-muted transition-all whitespace-nowrap">
                🚀 Start Career Test Now
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar */}
            <ScrollReveal>
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-heading font-semibold mb-4">Your Skill Profile{predictions.length > 0 ? ' from Last Test' : ''}</h3>
                <div className="flex justify-center">
                  <RadarChart labels={radarLabels} values={radarValues} />
                </div>
              </div>
            </ScrollReveal>

            {/* Recent Predictions */}
            <ScrollReveal delay={100}>
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-heading font-semibold mb-4">Recent Career Predictions</h3>
                {predictions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">📋</div>
                    <p className="text-muted-foreground text-sm mb-4">No predictions yet</p>
                    <Link to="/test" className="text-primary text-sm hover:underline">Take your first test →</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {predictions.slice(0, 3).map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-all">
                        <span className="text-2xl">{p.top3[0]?.icon || '🎯'}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{p.topCareer}</div>
                          <div className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-mono ${getCategoryColor('Technology')}`}>{p.confidence}%</span>
                        <Link to={`/results?id=${p.id}`} className="text-xs text-primary hover:underline">View</Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Achievement Badges */}
          <ScrollReveal>
            <div className="glass-card p-6 rounded-xl">
              <h3 className="font-heading font-semibold mb-4">Achievement Badges</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: '🥇', label: 'First Test Completed', unlocked: predictions.length >= 1 },
                  { icon: '🔄', label: '3 Tests Taken', unlocked: predictions.length >= 3 },
                  { icon: '📤', label: 'Shared Your Result', unlocked: false },
                ].map(b => (
                  <div key={b.label} className={`flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm ${b.unlocked ? '' : 'opacity-40'}`}>
                    <span className="text-lg">{b.icon}</span>
                    <span className={b.unlocked ? 'text-foreground' : 'text-muted-foreground'}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </main>
      </div>
    </div>
  );
}
