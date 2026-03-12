import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔮</span>
              <span className="font-heading font-bold text-lg">CareerAI</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">AI-Powered Career Guidance</p>
            <div className="flex gap-3">
              {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
                <span key={s} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Quick Links</h4>
            {['/', '/about', '/careers'].map((l, i) => (
              <Link key={l} to={l} className="block text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
                {['Home', 'About', 'Careers'][i]}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Project Info</h4>
            {['Dataset Info', 'Algorithm Details', 'API Documentation'].map(t => (
              <p key={t} className="text-sm text-muted-foreground mb-2">{t}</p>
            ))}
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm">Contact</h4>
            <p className="text-sm text-muted-foreground mb-2">vaishnavibirajdar@gmail.com</p>
            <p className="text-sm text-muted-foreground mb-2">Department of Computer Engineering</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2026 CareerAI · Final Year Diploma Project  
        </div>
      </div>
    </footer>
  );
}
