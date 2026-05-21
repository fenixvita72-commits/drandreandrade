import { MessageCircle, Mail, Scale } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FooterSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer id="contato" style={{ background: "hsl(var(--navy-dark))" }}>
      {/* CTA Band */}
      <div
        className="py-20 px-6 border-b"
        style={{ borderColor: "hsl(var(--gold) / 0.2)" }}
      >
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="section-label mb-4 block">Vamos conversar?</span>
            <span
              className="block w-16 h-0.5 mx-auto mb-8"
              style={{ background: "var(--gradient-gold)" }}
            />

            <h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{ color: "hsl(var(--ivory))" }}
            >
              Vamos conversar sobre o seu projeto?
            </h2>
            <p
              className="max-w-xl mx-auto mb-12 leading-relaxed"
              style={{ color: "hsl(var(--ivory) / 0.65)" }}
            >
              Uma conversa sem compromisso para entender os desafios jurídicos da
              sua entidade e apoiar o seu impacto social.
            </p>
          </div>

          {/* Contact cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <a
              href="https://wa.me/5516981324028"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border group transition-all duration-300 hover:border-gold/60 hover:bg-gold/5"
              style={{
                background: "hsl(var(--navy-light))",
                borderColor: "hsl(var(--gold) / 0.25)",
              }}
            >
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--gold) / 0.15)" }}
              >
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <p
                  className="text-xs tracking-widest uppercase mb-0.5"
                  style={{ color: "hsl(var(--gold) / 0.7)" }}
                >
                  WhatsApp
                </p>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "hsl(var(--ivory))" }}
                >
                  (16) 98132-4028
                </p>
              </div>
            </a>

            <a
              href="mailto:contato@andreandrade.adv.br"
              className="flex items-center gap-4 p-5 rounded-xl border group transition-all duration-300 hover:border-gold/60 hover:bg-gold/5"
              style={{
                background: "hsl(var(--navy-light))",
                borderColor: "hsl(var(--gold) / 0.25)",
              }}
            >
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(var(--gold) / 0.15)" }}
              >
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left overflow-hidden">
                <p
                  className="text-xs tracking-widest uppercase mb-0.5"
                  style={{ color: "hsl(var(--gold) / 0.7)" }}
                >
                  E-mail
                </p>
                <p
                  className="font-semibold text-sm truncate"
                  style={{ color: "hsl(var(--ivory))" }}
                >
                  contato@andreandrade.adv.br
                </p>
              </div>
            </a>
          </div>

          <a
            href="https://wa.me/5516981324028"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Falar com o Dr. André
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-sm flex items-center justify-center border"
              style={{ borderColor: "hsl(var(--gold) / 0.4)" }}
            >
              <Scale className="w-3.5 h-3.5 text-gold" />
            </div>
            <p
              className="text-xs"
              style={{ color: "hsl(var(--ivory) / 0.5)" }}
            >
              André Andrade da Silva - OAB/SP 489.013 - Advogado especializado em
              Terceiro Setor
            </p>
          </div>
          <p
            className="text-xs"
            style={{ color: "hsl(var(--ivory) / 0.35)" }}
          >
            © {new Date().getFullYear()} · Todos os direitos reservados
          </p>
        </div>
      </div>

      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "var(--gradient-gold)" }}
      />
    </footer>
  );
};

export default FooterSection;
