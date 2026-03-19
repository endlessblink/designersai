import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-colors duration-500 ${isHome ? "bg-deep-charcoal/80 backdrop-blur-md" : "bg-background/90 backdrop-blur-md border-b border-border"}`}>
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={isHome ? communityLogoWhite : communityLogo} alt="קהילת מעצבים ב-AI" className="h-10 md:h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className={`font-display text-lg md:text-xl font-semibold tracking-tight ${isHome ? "text-warm-cream" : "text-foreground"}`}>
                Designers in AI
              </span>
              <span className={`text-[10px] uppercase tracking-[0.25em] font-body font-light ${isHome ? "text-warm-cream/60" : "text-muted-foreground"}`}>
                Global Cultural Series
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
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
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 ${isHome ? "text-warm-cream" : "text-foreground"}`}
            aria-label="Toggle menu"
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
            className="lg:hidden bg-background/98 backdrop-blur-lg border-b border-border"
          >
            <nav className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-body font-light tracking-wide py-2 transition-colors ${
                    location.pathname === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
