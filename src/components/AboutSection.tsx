import { CheckCircle2 } from "lucide-react";
import triquetra from "@/assets/triquetra.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  "Especialista exclusivo no Terceiro Setor",
  "Linguagem acessível, sem juridiquês",
  "Atendimento humanizado e estratégico",
  "Soluções preventivas, não apenas reativas",
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="sobre"
      className="py-24 px-6"
      style={{ background: "hsl(var(--navy))" }}
    >
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="section-label mb-4 block">Sobre o advogado</span>
            <span
              className="block w-16 h-0.5 mb-8"
              style={{ background: "var(--gradient-gold)" }}
            />

            <h2
              className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
              style={{ color: "hsl(var(--ivory))" }}
            >
              Direito com Propósito
            </h2>
            <p
              className="mb-5 leading-relaxed"
              style={{ color: "hsl(var(--ivory) / 0.75)" }}
            >
              André Andrade da Silva possui uma trajetória marcada pelo equilíbrio entre
              uma forte formação técnica e a vivência estratégica em gestão organizacional.
              Com atuação dedicada exclusivamente ao Terceiro Setor, compreende profundamente
              a realidade das OSCs, associações e fundações.
            </p>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "hsl(var(--ivory) / 0.75)" }}
            >
              Seu diferencial reside na união da excelência jurídica com a sensibilidade
              humana no atendimento, atuando não apenas na resolução de conflitos, mas
              como um parceiro estratégico que impulsiona o impacto social seguro.
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-gold" />
                  <span
                    className="text-sm"
                    style={{ color: "hsl(var(--ivory) / 0.85)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href="https://wa.me/5516981324028"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Falar com André
              </a>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/30 bg-gold/5">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-sm tracking-wider uppercase font-medium text-gold">
                  OAB/SP 489.013
                </span>
              </div>
            </div>
          </div>

          {/* Right: quote card */}
          <div className={`relative transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div
              className="p-10 rounded-xl border animate-pulse-subtle"
              style={{
                background: "hsl(var(--navy-light))",
                borderColor: "hsl(var(--gold) / 0.25)",
              }}
            >
              <span
                className="block text-7xl font-serif leading-none mb-4"
                style={{ color: "hsl(var(--gold))" }}
              >
                "
              </span>
              <p
                className="text-xl font-light leading-relaxed italic mb-8"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "hsl(var(--ivory) / 0.9)",
                }}
              >
                Acredito que o Direito deve ser um instrumento de acolhimento e fortalecimento.
                Minha missão é traduzir a complexidade das leis em segurança jurídica estratégica
                para que as organizações sociais continuem transformando realidades.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={triquetra}
                  alt="Símbolo triquetra"
                  className="w-12 h-12 rounded-md object-contain"
                />
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: "hsl(var(--ivory))" }}
                  >
                    André Andrade da Silva
                  </p>
                  <p
                    className="text-xs tracking-wider uppercase mt-1"
                    style={{ color: "hsl(var(--gold) / 0.7)" }}
                  >
                    ADVOGADO ESPECIALISTA
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative corner */}
            <div
              className="absolute -top-3 -right-3 w-16 h-16 rounded-xl"
              style={{
                background: "var(--gradient-gold)",
                opacity: 0.15,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
