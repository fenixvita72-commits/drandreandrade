import { Building2, Receipt, Handshake, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Building2,
    title: "Constituição e Governança",
    description:
      "Criação e regularização de ONGs, associações e fundações. Elaboração de estatutos, atas e fluxos de governança para proteger a sua organização desde o início.",
  },
  {
    icon: Receipt,
    title: "Imunidades e Isenções Tributárias",
    description:
      "Obtenção e manutenção de CEBAS, OSCIP, OS e demais qualificações que garantem benefícios fiscais e reduzem a carga tributária da sua entidade.",
  },
  {
    icon: Handshake,
    title: "Parcerias e MROSC",
    description:
      "Assessoria completa em termos de colaboração, convênios e parcerias com o Poder Público, seguindo as diretrizes do Marco Regulatório das OSCs.",
  },
  {
    icon: Shield,
    title: "Assessoria Mensal Preventiva",
    description:
      "Acompanhamento jurídico contínuo para antecipar riscos, orientar decisões estratégicas e manter a conformidade legal da sua organização em dia.",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="servicos" className="py-24 px-6 bg-background">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-4 block">O que ofereço</span>
          <span className="gold-line mb-6 block" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluções Jurídicas Especializadas
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Cada serviço foi desenhado para as necessidades reais de gestores do
            Terceiro Setor — sem juridiquês, com clareza e resultados.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`service-card group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: isVisible ? `${200 + index * 150}ms` : "0ms" }}
              >
                {/* Number */}
                <span
                  className="absolute top-6 right-7 text-5xl font-bold select-none"
                  style={{ color: "hsl(var(--navy) / 0.06)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-gold/10"
                  style={{ background: "hsl(var(--navy) / 0.06)" }}
                >
                  <Icon className="w-5 h-5 text-gold" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Gold accent line on hover */}
                <div
                  className="mt-6 h-0.5 w-0 group-hover:w-12 transition-all duration-500"
                  style={{ background: "var(--gradient-gold)" }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-14 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="https://wa.me/5516981324028"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Solicitar Consultoria
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
