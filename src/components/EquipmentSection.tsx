import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Layers, MessageCircle } from 'lucide-react';
import {
  EQUIPMENT_CATALOG,
  EQUIPMENT_CATEGORIES,
  type EquipmentCategory,
  type EquipmentItem,
} from '../data/equipment';
import { getWhatsAppUrl } from '../config/company';
import { TiltCard } from './TiltCard';

interface EquipmentSectionProps {
  onSelectEquipmentForQuote: (equipmentName: string) => void;
  onWhatsAppMissingConfig: (equipmentName?: string) => void;
}

export function EquipmentSection({
  onSelectEquipmentForQuote,
  onWhatsAppMissingConfig,
}: EquipmentSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>('Todos');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleItems =
    selectedCategory === 'Todos'
      ? EQUIPMENT_CATALOG
      : EQUIPMENT_CATALOG.filter((item) => item.category === selectedCategory);

  const buildWhatsAppHref = (item: EquipmentItem) => {
    const message = `Olá! Tenho interesse na locação de "${item.name}" pela P.B. Equipamentos de Locação. Gostaria de solicitar um orçamento.`;
    return getWhatsAppUrl(message);
  };

  return (
    <section
      id="equipamentos"
      className="relative border-t border-white/10 bg-[#0c0c0f] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-wide text-[#ff7733]">
              Catálogo de Locação
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Equipamentos preparados para o ritmo da sua operação
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400">
              Navegue pelas categorias abaixo para conhecer as linhas disponíveis,
              suas aplicações e solicitar atendimento técnico personalizado.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filtrar equipamentos por categoria"
            className="flex flex-wrap gap-1.5 rounded-lg border border-white/10 bg-[#131316] p-1.5"
          >
            {EQUIPMENT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#ff5500] text-white'
                      : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Equipment Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {visibleItems.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="h-full"
            >
              <TiltCard
                maxTiltDeg={4}
                className="flex h-full flex-col rounded-xl border border-white/10 bg-[#131316] transition-colors duration-200 hover:border-[#ff5500]/50"
              >
                {/* Equipment Photography */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  {!failedImages[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-[#ff5500]/15 p-6 text-center">
                      <Layers className="mb-2 h-9 w-9 text-[#ff5500]" />
                      <span className="font-display text-sm font-bold text-white">
                        {item.name}
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Unboxed Typographic Metadata Kicker */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#ff7733]">
                    <span>{item.category}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="text-zinc-400">Locação sob consulta</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {item.description}
                  </p>

                  {/* Applications */}
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold tracking-wide text-zinc-400">
                      Aplicações e finalidades
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {item.applications.map((app) => (
                        <li
                          key={app}
                          className="flex items-start gap-2.5 text-sm text-zinc-300"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#ff5500]"
                          />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Honest Technical Spec Note */}
                  <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                    {item.technicalNote}
                  </p>

                  {/* Card CTAs */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectEquipmentForQuote(item.name)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#ff5500] px-4 py-3 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#ff6a1a] whitespace-nowrap sm:text-sm"
                    >
                      Solicitar Orçamento
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    {(() => {
                      const whatsappHref = buildWhatsAppHref(item);
                      if (whatsappHref) {
                        return (
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-4 py-3 text-xs font-semibold text-zinc-100 transition-colors duration-150 hover:border-[#25D366]/60 hover:text-white whitespace-nowrap sm:text-sm"
                          >
                            <MessageCircle className="h-4 w-4 text-[#25D366]" />
                            Falar pelo WhatsApp
                          </a>
                        );
                      }
                      return (
                        <button
                          type="button"
                          onClick={() => onWhatsAppMissingConfig(item.name)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-4 py-3 text-xs font-semibold text-zinc-100 transition-colors duration-150 hover:border-[#25D366]/60 hover:text-white whitespace-nowrap sm:text-sm"
                        >
                          <MessageCircle className="h-4 w-4 text-[#25D366]" />
                          Falar pelo WhatsApp
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </TiltCard>
            </motion.article>
          ))}
        </div>

        {/* Mid-page Conversion Callout */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl border border-[#ff5500]/30 bg-gradient-to-r from-[#17171c] via-[#131316] to-[#1f130d] p-7 sm:p-9 lg:flex-row lg:items-center"
        >
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-white [text-wrap:balance]">
              Precisa de equipamentos para seu projeto?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
              Encontre a solução ideal para sua necessidade. Nossa equipe avalia o
              escopo da sua obra ou operação e responde com agilidade.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectEquipmentForQuote('')}
            className="inline-flex items-center gap-2 rounded-lg bg-[#ff5500] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a1a] whitespace-nowrap shrink-0"
          >
            Solicitar Orçamento Agora
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
