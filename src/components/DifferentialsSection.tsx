import { motion } from 'motion/react';
import {
  CheckSquare,
  Clock,
  Headphones,
  MessageSquareMore,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react';
import { TiltCard } from './TiltCard';

const DIFFERENTIALS = [
  {
    number: '01',
    icon: Headphones,
    title: 'Atendimento especializado',
    description:
      'Orientação direta e técnica para compreender a demanda da sua obra ou projeto e encaminhar o equipamento certo sem burocracia.',
    span: 'lg:col-span-2',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Soluções em locação',
    description:
      'Opções versáteis para diferentes frentes operacionais, evitando imobilização de capital na compra de maquinário.',
    span: 'lg:col-span-1',
  },
  {
    number: '03',
    icon: Clock,
    title: 'Agilidade na solicitação de orçamento',
    description:
      'Processo simples e rápido para cotar os equipamentos necessários de acordo com a cidade e o prazo da sua operação.',
    span: 'lg:col-span-1',
  },
  {
    number: '04',
    icon: SlidersHorizontal,
    title: 'Equipamentos adequados às necessidades do cliente',
    description:
      'Indicação alinhada à aplicação prática em campo, otimizando produtividade, acesso e segurança da equipe.',
    span: 'lg:col-span-2',
  },
  {
    number: '05',
    icon: CheckSquare,
    title: 'Compromisso com o atendimento',
    description:
      'Relacionamento transparente e responsável em todas as etapas da locação, da cotação ao suporte comercial.',
    span: 'lg:col-span-1',
  },
  {
    number: '06',
    icon: MessageSquareMore,
    title: 'Facilidade de contato',
    description:
      'Canais práticos de atendimento pelo formulário inteligente do site, assistente virtual e contato direto com a equipe.',
    span: 'lg:col-span-2',
  },
];

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="relative border-t border-white/10 bg-[#0c0c0f] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold tracking-wide text-[#ff7733]">
            Por que escolher a P.B. Equipamentos
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
            Diferenciais pensados para dar ritmo ao seu projeto
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Cada detalhe do nosso atendimento foi estruturado para simplificar a
            contratação e apoiar a continuidade da sua operação.
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIALS.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={diff.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={diff.span}
              >
                <TiltCard
                  maxTiltDeg={3}
                  className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#131316] p-6 transition-colors duration-200 hover:border-[#ff5500]/45 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#ff5500]/30 bg-[#ff5500]/10 text-[#ff7733]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-sm font-medium tabular-nums text-zinc-500">
                        {diff.number}.
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-bold text-white">
                      {diff.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:text-base">
                      {diff.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
