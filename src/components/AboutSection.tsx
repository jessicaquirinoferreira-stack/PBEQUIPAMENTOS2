import { motion } from 'motion/react';
import { ArrowRight, Award, Handshake, Shield } from 'lucide-react';

interface AboutSectionProps {
  onRequestQuote: () => void;
}

const ABOUT_IMAGE = '/src/assets/images/elevacao_pb_branded_1795542363484.jpg';

const INSTITUTIONAL_PILLARS = [
  {
    icon: Shield,
    title: 'Confiança e Profissionalismo',
    text: 'Atuação pautada pela seriedade em cada atendimento, alinhando o equipamento certo ao desafio operacional de cada cliente.',
  },
  {
    icon: Handshake,
    title: 'Comprometimento com o Cliente',
    text: 'Acompanhamento próximo desde o primeiro contato até a definição da solução de locação adequada para a sua demanda.',
  },
  {
    icon: Award,
    title: 'Qualidade e Prontidão',
    text: 'Foco em oferecer alternativas eficientes e seguras para obras, projetos técnicos e rotinas industriais exigentes.',
  },
];

export function AboutSection({ onRequestQuote }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      className="relative border-t border-white/10 bg-[#09090b] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#131316]">
              <img
                src={ABOUT_IMAGE}
                alt="Estrutura operacional e equipamentos da P.B. Equipamentos de Locação"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <p className="text-xs font-semibold tracking-wide text-[#ff7733]">
                  Institucional
                </p>
                <p className="mt-1 font-display text-xl font-bold text-white">
                  P.B. Equipamentos de Locação
                </p>
                <p className="mt-1.5 text-sm text-zinc-300">
                  Parceria confiável para quem não pode parar.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Institutional Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <p className="text-sm font-semibold tracking-wide text-[#ff7733]">
                Sobre a Empresa
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
                Compromisso com soluções eficientes em locação de equipamentos
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">
                A <strong className="font-semibold text-white">P.B. Equipamentos de Locação</strong> atua
                dedicada a entregar agilidade, clareza e confiança para empresas,
                engenheiros, construtoras e profissionais que precisam de equipamentos
                adequados ao ritmo real de suas obras e projetos.
              </p>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Cada solicitação é tratada de maneira objetiva e consultiva:
                entendemos o contexto da sua operação para indicar a solução de
                locação compatível com a sua necessidade e prazo.
              </p>

              {/* Institutional Pillars */}
              <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {INSTITUTIONAL_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title}>
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-[#ff5500]"
                      />
                      <h3 className="mt-3 font-display text-base font-bold text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                        {pillar.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={onRequestQuote}
                className="inline-flex items-center gap-2 rounded-lg border border-[#ff5500]/50 bg-[#ff5500]/10 px-5 py-3 text-sm font-semibold text-[#ff7733] transition-colors hover:bg-[#ff5500] hover:text-white whitespace-nowrap"
              >
                Fale com nossa equipe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
