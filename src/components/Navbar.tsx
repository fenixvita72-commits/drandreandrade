import { useState, useEffect } from "react";
import { Menu, X, Scale } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-navy/95 backdrop-blur-md shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 flex items-center justify-center rounded-sm border border-gold/60 group-hover:border-gold transition-colors duration-200">
            <Scale className="w-4 h-4 text-gold" />
          </div>
          <div className="leading-tight">
            <p className="text-ivory text-xs font-semibold tracking-widest uppercase">André Andrade</p>
            <p className="text-gold/80 text-[10px] tracking-widest uppercase">Advogado · Terceiro Setor</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/5516981324028"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-[11px] px-5 py-2.5"
          >
            Agendar Reunião
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ivory"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy/98 backdrop-blur-md border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/5516981324028"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-center text-[11px]"
            onClick={() => setMenuOpen(false)}
          >
            Agendar Reunião
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
