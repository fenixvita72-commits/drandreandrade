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
              André Andrade da Silva é advogado especializado exclusivamente no
              Direito do Terceiro Setor. Ao longo de sua trajetória, percebeu que
              OSCs, associações e fundações — organizações que movem o Brasil —
              muitas vezes operam em risco jurídico por falta de assessoria
              especializada.
            </p>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "hsl(var(--ivory) / 0.75)" }}
            >
              Seu trabalho vai além de resolver problemas: é ser o parceiro
              estratégico que permite que sua organização atue com confiança,
              transparência e conformidade legal — para que você possa focar no
              que realmente importa: o impacto social.
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

            <div className="mt-10">
              <a
                href="https://wa.me/5516981324028"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Falar com André
              </a>
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
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "hsl(var(--gold) / 0.7)" }}
                  >
                    ADVOGADO ESPECIALISTA
                    <br />
                    OAB/SP 489.013
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
