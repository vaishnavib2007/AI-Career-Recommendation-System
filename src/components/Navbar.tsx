import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Menu, X } from 'lucide-react';

const publicLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-navbar py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🔮</span>
            <span className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">CareerAI</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {publicLinks.map(l => (
              l.href.startsWith('/#') ? (
                <button key={l.label} onClick={() => handleNavClick(l.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </button>
              ) : (
                <Link key={l.label} to={l.href} className={`text-sm transition-colors ${location.pathname === l.href ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                  {l.label}
                </Link>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
                <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Logout</button>
                <Link to="/dashboard" className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted/50 transition-all">Login</Link>
                <Link to="/register" className="text-sm px-4 py-2 rounded-lg gradient-bg text-primary-foreground glow-button font-medium">Get Started Free</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-card border-l border-border p-6 pt-20 flex flex-col gap-4">
            {publicLinks.map(l => (
              l.href.startsWith('/#') ? (
                <button key={l.label} onClick={() => handleNavClick(l.href)} className="text-left text-foreground py-2">{l.label}</button>
              ) : (
                <Link key={l.label} to={l.href} className="text-foreground py-2">{l.label}</Link>
              )
            ))}
            <hr className="border-border" />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-foreground py-2">Dashboard</Link>
                <button onClick={() => { logout(); navigate('/'); }} className="text-left text-destructive py-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-foreground py-2">Login</Link>
                <Link to="/register" className="gradient-bg text-primary-foreground py-2 px-4 rounded-lg text-center glow-button">Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
