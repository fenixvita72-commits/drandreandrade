import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Presidente — Instituto Semear",
    text: "O Dr. André trouxe segurança jurídica total para nossa associação. Profissional impecável e extremamente dedicado.",
  },
  {
    name: "Carlos Eduardo Lima",
    role: "Diretor — Fundação Raízes",
    text: "Graças à assessoria do André, conseguimos o CEBAS em tempo recorde. Conhecimento técnico e atendimento humanizado.",
  },
  {
    name: "Patrícia Almeida",
    role: "Coordenadora — ONG Transformar",
    text: "Finalmente encontramos um advogado que entende as reais necessidades do Terceiro Setor. Recomendo de olhos fechados!",
  },
  {
    name: "Roberto Nascimento",
    role: "Presidente — Associação Vida Nova",
    text: "O trabalho preventivo do André evitou problemas graves na nossa entidade. Profissional ético e comprometido.",
  },
  {
    name: "Fernanda Ribeiro",
    role: "Gestora — Instituto Esperança",
    text: "A clareza nas orientações faz toda diferença. André traduz o jurídico em ações práticas e estratégicas para nós.",
  },
  {
    name: "Lucas Mendes",
    role: "Diretor Executivo — Casa do Bem",
    text: "Desde que contratamos o André, dormimos tranquilos. Nossa governança está exemplar e em total conformidade.",
  },
  {
    name: "Ana Paula Santos",
    role: "Fundadora — Projeto Horizonte",
    text: "André nos ajudou desde a constituição da ONG até as parcerias com o poder público. Parceiro estratégico essencial.",
  },
  {
    name: "Marcelo Oliveira",
    role: "Conselheiro — Fundação Renascer",
    text: "Profissionalismo e empatia raros. André realmente veste a camisa das organizações que atende. Nota máxima sempre!",
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6" style={{ background: "var(--gradient-section)" }}>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-4 block">Depoimentos</span>
          <span className="gold-line mb-6 block" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            A confiança de quem já transformou a segurança jurídica da sua organização.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`service-card flex flex-col transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : "0ms" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="border-t pt-4" style={{ borderColor: "hsl(var(--border))" }}>
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
