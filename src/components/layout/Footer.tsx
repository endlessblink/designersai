import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHebrew = location.pathname === "/" || location.pathname === "/he";
  const exploreLinks = isHebrew
    ? [
        { to: "#about", label: "אודות" },
        { to: "#artists", label: "אמני הקהילה" },
        { to: "#exhibitions", label: "תערוכות" },
        { to: "#weekly-practice", label: "תרגול שבועי" },
        { to: "#press", label: "עיתונות ומדיה" },
      ]
    : [
        { to: "/about", label: "About" },
        { to: "/artists", label: "Community Artists" },
        { to: "/exhibitions", label: "Exhibitions" },
        { to: "/weekly-practice", label: "Weekly Practice" },
        { to: "/press", label: "Press & Media" },
      ];
  const connectLinks = isHebrew
    ? [
        { to: "#join", label: "הצטרפות לקהילה" },
        { to: "#join", label: "שותפים מעולם התרבות" },
        { to: "#join", label: "יצירת קשר" },
      ]
    : [
        { to: "/join", label: "Join the Community" },
        { to: "/partners", label: "For Cultural Partners" },
        { to: "/contact", label: "Contact" },
      ];

  return (
    <footer dir={isHebrew ? "rtl" : "ltr"} className="bg-deep-charcoal text-warm-cream/80">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl text-warm-cream mb-3">Designers with AI</h3>
            <p className="text-sm font-body font-light leading-relaxed max-w-md text-warm-cream/60">
              {isHebrew
                ? "קהילה יצירתית גלובלית החוקרת בינה מלאכותית כמדיום אמנותי. נוסדה על ידי נטלי שפיר."
                : "A global creative community exploring artificial intelligence as an artistic medium. Founded by Nataly Shafir."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-warm-cream/40 mb-4 font-body">{isHebrew ? "גלו" : "Explore"}</h4>
            <nav className="flex flex-col gap-2">
              {exploreLinks.map((link) => (
                <Link key={link.to} to={link.to} className="text-sm font-light text-warm-cream/60 hover:text-warm-cream transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-warm-cream/40 mb-4 font-body">{isHebrew ? "התחברו" : "Connect"}</h4>
            <nav className="flex flex-col gap-2">
              {connectLinks.map((link, index) => (
                <Link key={`${link.to}-${index}`} to={link.to} className="text-sm font-light text-warm-cream/60 hover:text-warm-cream transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-warm-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warm-cream/40 font-body">
            © {new Date().getFullYear()} Designers with AI. {isHebrew ? "כל הזכויות שמורות." : "All rights reserved."}
          </p>
          <div className="flex gap-6">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-xs text-warm-cream/40 hover:text-warm-cream transition-colors">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-warm-cream/40 hover:text-warm-cream transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
