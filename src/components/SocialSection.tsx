import { Linkedin, Instagram, Facebook } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/andr%C3%A9-andrade-45bb9a13a/",
    description: "Artigos e atualizações jurídicas",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/dr_andre_andrade_advogado/",
    description: "Dicas para o Terceiro Setor",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/AndreAndradeAdvogado/",
    description: "Comunidade e novidades",
  },
];

const SocialSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 px-6 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="section-label mb-4 block">Conecte-se</span>
          <span className="gold-line mb-6 block" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acompanhe nas Redes Sociais
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-14 leading-relaxed">
            Conteúdo relevante para gestores do Terceiro Setor: orientações
            jurídicas, novidades legislativas e muito mais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`service-card group flex flex-col items-center gap-4 text-center cursor-pointer no-underline transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: isVisible ? `${200 + i * 150}ms` : "0ms" }}
              >
                <div
                  className="w-14 h-14 rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: "hsl(var(--navy) / 0.06)" }}
                >
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">{social.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {social.description}
                  </p>
                </div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "hsl(var(--gold))" }}
                >
                  Seguir →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
