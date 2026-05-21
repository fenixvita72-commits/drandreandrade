import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "O que é o Terceiro Setor e quem faz parte dele?",
    answer:
      "O Terceiro Setor é composto por organizações de iniciativa privada sem fins lucrativos que realizam atividades de interesse público e social. Isso inclui ONGs, associações comunitárias, fundações, institutos de assistência social, cultural, de saúde, esportes, entre outros.",
  },
  {
    question: "Quais são os principais benefícios de obter o CEBAS?",
    answer:
      "O CEBAS (Certificação de Entidades Beneficentes de Assistência Social) concede a isenção de contribuições sociais cruciais, como a cota patronal do INSS (contribuição previdenciária patronal), RAT e terceiros. Além disso, é um selo de idoneidade que facilita o recebimento de emendas parlamentares e convênios públicos.",
  },
  {
    question: "O que é o MROSC e como ele impacta minha organização?",
    answer:
      "O Marco Regulatório das Organizações da Sociedade Civil (Lei nº 13.019/2014) rege as relações de parceria entre a administração pública e as organizações do Terceiro Setor. Ele exige regras rígidas de transparência, prestação de contas e planejamento. Adequar sua entidade ao MROSC é indispensável para evitar a devolução de recursos públicos ou a suspensão de parcerias.",
  },
  {
    question: "Como funciona a Assessoria Mensal Preventiva?",
    answer:
      "É um suporte contínuo focado em evitar problemas antes que eles aconteçam. Realizamos a revisão periódica de estatutos e atas, adequação de contratos de trabalho e voluntariado, orientações sobre governança e conformidade tributária. O objetivo é que a diretoria trabalhe com tranquilidade, sabendo que a instituição está protegida juridicamente.",
  },
  {
    question: "Uma organização sem fins lucrativos pode contratar funcionários via CLT?",
    answer:
      "Sim, perfeitamente. Organizações sem fins lucrativos podem contratar profissionais sob o regime da CLT, pagar salários de mercado e até contratar prestadores de serviço (PJ). A única exigência legal é que todas as receitas e sobras financeiras sejam reinvestidas integralmente na própria instituição para a realização de sua finalidade social, sem qualquer distribuição de lucros ou dividendos aos fundadores ou diretores.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="faq" className="py-24 px-6 bg-background">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="section-label mb-4 block">Dúvidas Frequentes</span>
          <span className="gold-line mb-6 block" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Perguntas Comuns de Gestores
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Esclarecemos as principais questões jurídicas que envolvem o dia a dia das
            organizações sociais, de forma simples e direta.
          </p>
        </div>

        {/* Accordion list */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4 max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="px-6 py-2 rounded-lg border bg-card transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline text-foreground py-4 flex gap-3 items-center">
                  <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pt-2 pb-4 pl-8 border-t border-dashed border-border/50 mt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
