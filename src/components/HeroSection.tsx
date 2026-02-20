import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Deep overlay for legibility */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(214,40%,9%,0.92) 0%, hsl(214,37%,14%,0.85) 60%, hsl(214,30%,20%,0.78) 100%)" }} />

      {/* Gold decorative line top */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-gold)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <span className="section-label mb-6 block">Direito para o Terceiro Setor</span>

        {/* Gold divider */}
        <span className="gold-line mb-8 block" />

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{ color: "hsl(var(--ivory))", letterSpacing: "-0.02em" }}
        >
          Segurança jurídica para quem{" "}
          <br className="hidden sm:block" />
          <em className="not-italic" style={{ color: "hsl(var(--gold-light))" }}>
            dedica a vida a transformar o mundo.
          </em>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          style={{ color: "hsl(var(--ivory) / 0.75)" }}
        >
          Consultoria estratégica para o Terceiro Setor. Proteja sua instituição
          e foque no seu impacto social.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://wa.me/5516981324028"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto"
          >
            Agendar Reunião Diagnóstica
          </a>
          <a href="#servicos" className="btn-ghost-gold w-full sm:w-auto">
            Conheça os Serviços
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row gap-6 justify-center" style={{ borderColor: "hsl(var(--gold) / 0.2)" }}>
          {[
            { value: "15+", label: "Anos de Experiência" },
            { value: "OSCs", label: "Associações · Fundações" },
            { value: "OSCs", label: "Foco no Terceiro Setor" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-bold" style={{ color: "hsl(var(--gold))" }}>
                {item.value}
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: "hsl(var(--ivory) / 0.6)" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, hsl(var(--background)), transparent)" }} />
    </section>
  );
};

export default HeroSection;
