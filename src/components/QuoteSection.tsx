import { type FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from 'lucide-react';
import { EQUIPMENT_CATALOG } from '../data/equipment';
import { COMPANY_CONFIG, getInstagramUrl, getWhatsAppUrl } from '../config/company';

interface QuoteSectionProps {
  preselectedEquipment: string;
}

interface QuoteFormState {
  nome: string;
  telefone: string;
  email: string;
  equipamento: string;
  cidade: string;
  prazo: string;
  descricao: string;
}

interface QuoteConfirmation {
  protocol: string;
  nome: string;
  equipamento: string;
  cidade: string;
  prazo: string;
}

const INITIAL_STATE: QuoteFormState = {
  nome: '',
  telefone: '',
  email: '',
  equipamento: '',
  cidade: '',
  prazo: '',
  descricao: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteSection({ preselectedEquipment }: QuoteSectionProps) {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<QuoteConfirmation | null>(null);

  useEffect(() => {
    if (preselectedEquipment) {
      setForm((prev) => ({ ...prev, equipamento: preselectedEquipment }));
      setConfirmation(null);
      setErrorMsg(null);
    }
  }, [preselectedEquipment]);

  const validateClient = (): string | null => {
    if (form.nome.trim().length < 3) {
      return 'Informe seu nome completo.';
    }
    if (form.telefone.replace(/\D/g, '').length < 8) {
      return 'Informe um telefone ou WhatsApp válido com DDD.';
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      return 'Informe um endereço de e-mail válido.';
    }
    if (!form.equipamento.trim()) {
      return 'Selecione ou informe o equipamento desejado.';
    }
    if (form.cidade.trim().length < 2) {
      return 'Informe a cidade onde o equipamento será utilizado.';
    }
    if (!form.prazo.trim()) {
      return 'Informe o prazo ou período estimado de locação.';
    }
    if (form.descricao.trim().length < 10) {
      return 'Descreva brevemente a necessidade do projeto (mínimo 10 caracteres).';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validateClient();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(
          data?.error || 'Não foi possível enviar sua solicitação. Verifique os campos.',
        );
        return;
      }

      setConfirmation({
        protocol: data.protocol,
        nome: form.nome.trim(),
        equipamento: form.equipamento.trim(),
        cidade: form.cidade.trim(),
        prazo: form.prazo.trim(),
      });
      setForm(INITIAL_STATE);
    } catch {
      setErrorMsg(
        'Erro de conexão ao registrar o pedido. Tente novamente em instantes.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappAfterSubmitUrl = confirmation
    ? getWhatsAppUrl(
        `Olá! Acabei de registrar a solicitação de orçamento ${confirmation.protocol} pelo site da P.B. Equipamentos.\nNome: ${confirmation.nome}\nEquipamento: ${confirmation.equipamento}\nCidade: ${confirmation.cidade}\nPrazo: ${confirmation.prazo}`,
      )
    : null;

  return (
    <section
      id="orcamento"
      className="relative border-t border-white/10 bg-[#09090b] py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[#ff5500]/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Conversion Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold tracking-wide text-[#ff7733]">
              Solicitação de Orçamento
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Fale com nossa equipe e solicite seu orçamento.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300">
              Preencha as informações do seu projeto ao lado para que possamos
              indicar a solução de locação adequada com agilidade e precisão.
            </p>

            <div className="mt-8 space-y-5 border-t border-white/10 pt-8 text-sm text-zinc-300">
              <div>
                <p className="font-semibold text-white">
                  01. Análise da necessidade
                </p>
                <p className="mt-1 text-zinc-400">
                  Avaliamos o tipo de aplicação, cidade de atendimento e período
                  desejado.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  02. Retorno comercial objetivo
                </p>
                <p className="mt-1 text-zinc-400">
                  Sua solicitação recebe um código de registro para acompanhamento
                  rápido junto à nossa equipe.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  03. Solução sob medida
                </p>
                <p className="mt-1 text-zinc-400">
                  Encaminhamento claro das opções compatíveis com o cronograma da
                  sua obra ou operação.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              {getWhatsAppUrl() && (
                <a
                  href={getWhatsAppUrl()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-xs font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-zinc-950"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp: {COMPANY_CONFIG.whatsappDisplay}
                </a>
              )}
              {getInstagramUrl() && (
                <a
                  href={getInstagramUrl()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-[#ff5500]/50 hover:text-white"
                >
                  Instagram: @{COMPANY_CONFIG.instagramHandle}
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-xl border border-white/10 bg-[#131316] p-6 sm:p-8 lg:col-span-7"
          >
            {confirmation ? (
              <div className="py-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  Solicitação registrada com sucesso
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Obrigado, <strong className="text-white">{confirmation.nome}</strong>.
                  Seu pedido de orçamento foi recebido pelo sistema da P.B.
                  Equipamentos de Locação.
                </p>

                <div className="mt-6 rounded-lg border border-white/10 bg-[#09090b] p-5 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="text-zinc-400">Protocolo</span>
                    <span className="font-mono font-semibold tabular-nums text-[#ff7733]">
                      {confirmation.protocol}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-2 text-zinc-300">
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-400">Equipamento:</dt>
                      <dd className="text-right font-medium text-white">
                        {confirmation.equipamento}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-400">Cidade:</dt>
                      <dd className="text-right font-medium text-white">
                        {confirmation.cidade}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-400">Prazo:</dt>
                      <dd className="text-right font-medium text-white">
                        {confirmation.prazo}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {whatsappAfterSubmitUrl && (
                    <a
                      href={whatsappAfterSubmitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-zinc-950 transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Enviar também no WhatsApp
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setConfirmation(null)}
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:border-[#ff5500]/50"
                  >
                    Fazer nova solicitação
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {errorMsg && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-nome"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      Nome completo *
                    </label>
                    <input
                      id="quote-nome"
                      type="text"
                      required
                      value={form.nome}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, nome: e.target.value }))
                      }
                      placeholder="Seu nome completo"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-telefone"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="quote-telefone"
                      type="tel"
                      required
                      value={form.telefone}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, telefone: e.target.value }))
                      }
                      placeholder="(DDD) 90000-0000"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      E-mail *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="nome@empresa.com.br"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-cidade"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      Cidade *
                    </label>
                    <input
                      id="quote-cidade"
                      type="text"
                      required
                      value={form.cidade}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, cidade: e.target.value }))
                      }
                      placeholder="Cidade / UF da obra ou projeto"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-equipamento"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      Equipamento desejado *
                    </label>
                    <input
                      id="quote-equipamento"
                      list="equipment-options"
                      required
                      value={form.equipamento}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          equipamento: e.target.value,
                        }))
                      }
                      placeholder="Selecione ou digite o equipamento"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                    <datalist id="equipment-options">
                      {EQUIPMENT_CATALOG.map((item) => (
                        <option key={item.id} value={item.name} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-prazo"
                      className="block text-xs font-semibold text-zinc-300"
                    >
                      Prazo ou período de locação *
                    </label>
                    <input
                      id="quote-prazo"
                      type="text"
                      required
                      value={form.prazo}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, prazo: e.target.value }))
                      }
                      placeholder="Ex: 15 dias, 30 dias, 3 meses"
                      className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-descricao"
                    className="block text-xs font-semibold text-zinc-300"
                  >
                    Descrição da necessidade *
                  </label>
                  <textarea
                    id="quote-descricao"
                    rows={4}
                    required
                    value={form.descricao}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, descricao: e.target.value }))
                    }
                    placeholder="Informe detalhes do serviço, local de operação, altura ou capacidade desejada, se aplicável."
                    className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#09090b] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#ff5500] px-6 py-4 text-sm font-bold tracking-wide text-white shadow-[0_0_26px_-6px_rgba(255,85,0,0.6)] transition-colors duration-150 hover:bg-[#ff6a1a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando solicitação...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      SOLICITAR MEU ORÇAMENTO
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
