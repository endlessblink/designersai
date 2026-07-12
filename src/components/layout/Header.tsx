import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import communityLogo from "@/assets/community-logo.png";
import communityLogoWhite from "@/assets/community-logo-white.png";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/artists", label: "Artists" },
  { to: "/exhibitions", label: "Exhibitions" },
  { to: "/weekly-practice", label: "Weekly Practice" },
  { to: "/press", label: "Press" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
];

const hebrewNavLinks = [
  { href: "#about", label: "אודות" },
  { href: "#artists", label: "אמנים" },
  { href: "#exhibitions", label: "תערוכות" },
  { href: "#weekly-practice", label: "תרגול שבועי" },
  { href: "#press", label: "עיתונות" },
  { href: "#join", label: "הצטרפות" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHebrew = location.pathname === "/" || location.pathname === "/he";
  const isHome = isHebrew || location.pathname === "/en";

  return (
    <header dir={isHebrew ? "rtl" : "ltr"} className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-colors duration-500 ${isHome ? "bg-deep-charcoal/80 backdrop-blur-md" : "bg-background/90 backdrop-blur-md border-b border-border"}`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to={isHebrew ? "/" : "/en"} className="flex items-center gap-3" aria-label={isHebrew ? "דף הבית" : "Home"}>
            <img src={isHome ? communityLogoWhite : communityLogo} alt="קהילת מעצבים ב-AI" className="h-10 md:h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className={`font-display text-lg md:text-xl font-semibold tracking-tight ${isHome ? "text-warm-cream" : "text-foreground"}`}>
                Designers with AI
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] font-body font-light ${isHome ? "text-warm-cream/60" : "text-muted-foreground"}`}>
                {isHebrew ? "קהילה יצירתית גלובלית" : "Global Creative Community"}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={isHebrew ? "ניווט ראשי" : "Main navigation"} className="hidden lg:flex items-center gap-8">
            {isHebrew ? hebrewNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-light tracking-wide text-warm-cream/70 transition-colors hover:text-warm-cream"
              >
                {link.label}
              </a>
            )) : navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-body font-light tracking-wide transition-colors hover:opacity-100 ${
                  location.pathname === link.to
                    ? isHome ? "text-warm-cream" : "text-foreground"
                    : isHome ? "text-warm-cream/70 hover:text-warm-cream" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isHebrew ? "/en" : "/"}
              className={`inline-flex items-center gap-1.5 text-sm font-body font-light tracking-wide transition-colors ${
                isHome ? "text-warm-cream/70 hover:text-warm-cream" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe size={15} />
              {isHebrew ? "English" : "עברית"}
            </Link>
          </nav>

          {/* Mobile language + toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <Link
              to={isHebrew ? "/en" : "/"}
              className={`inline-flex items-center gap-1 p-2 text-sm font-body ${isHome ? "text-warm-cream" : "text-foreground"}`}
              aria-label={isHebrew ? "Switch to English" : "מעבר לעברית"}
            >
              <Globe size={18} />
              {isHebrew ? "EN" : "עב"}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 ${isHome ? "text-warm-cream" : "text-foreground"}`}
            aria-label={mobileOpen ? (isHebrew ? "סגירת תפריט" : "Close menu") : (isHebrew ? "פתיחת תפריט" : "Open menu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden border-b shadow-xl ${isHome ? "bg-deep-charcoal border-warm-cream/10" : "bg-background border-border"}`}
          >
            <nav aria-label={isHebrew ? "ניווט לנייד" : "Mobile navigation"} className="container py-6 flex flex-col gap-4">
              {isHebrew ? hebrewNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-body font-light tracking-wide py-2 text-warm-cream/70 transition-colors hover:text-warm-cream"
                >
                  {link.label}
                </a>
              )) : navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-body font-light tracking-wide py-2 transition-colors ${
                    isHome
                      ? "text-warm-cream/70 hover:text-warm-cream"
                      : location.pathname === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
