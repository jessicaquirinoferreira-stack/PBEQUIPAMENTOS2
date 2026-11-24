import { ArrowRight, Info, ShieldCheck, X } from 'lucide-react';

export type ModalKind = 'whatsapp' | 'instagram' | 'privacy' | null;

interface ContactNoticeModalProps {
  modalKind: ModalKind;
  contextEquipment?: string;
  onClose: () => void;
  onGoToQuote: (equipmentName?: string) => void;
}

export function ContactNoticeModal({
  modalKind,
  contextEquipment,
  onClose,
  onGoToQuote,
}: ContactNoticeModalProps) {
  if (!modalKind) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border border-white/15 bg-[#131316] p-6 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar janela"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {modalKind === 'privacy' ? (
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff5500]/30 bg-[#ff5500]/10 text-[#ff7733]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2
              id="modal-title"
              className="mt-4 font-display text-xl font-bold text-white"
            >
              Política de Privacidade
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-300">
              <p>
                A <strong className="text-white">P.B. Equipamentos de Locação</strong>{' '}
                respeita a privacidade dos visitantes e utiliza os dados enviados
                no formulário de orçamento (nome, telefone/WhatsApp, e-mail,
                cidade e descrição do projeto) exclusivamente para retorno
                comercial e elaboração de propostas de locação.
              </p>
              <p>
                As informações enviadas não são comercializadas nem compartilhadas
                com terceiros não relacionados ao atendimento da sua solicitação.
              </p>
              <p className="text-zinc-400">
                Caso deseje solicitar a atualização ou exclusão dos seus dados de
                contato enviados pelo site, entre em contato pelos canais oficiais
                da empresa.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-[#ff5500] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a1a]"
              >
                Entendi
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff5500]/30 bg-[#ff5500]/10 text-[#ff7733]">
              <Info className="h-5 w-5" />
            </div>
            <h2
              id="modal-title"
              className="mt-4 font-display text-xl font-bold text-white"
            >
              {modalKind === 'whatsapp'
                ? 'Canal WhatsApp pronto para configuração'
                : 'Perfil Instagram pronto para configuração'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {modalKind === 'whatsapp'
                ? 'O número oficial de WhatsApp da P.B. Equipamentos de Locação ainda não foi informado na configuração do site. Para evitar informações incorretas, não exibimos um número fictício.'
                : 'O link oficial do Instagram da P.B. Equipamentos de Locação ainda não foi informado na configuração do site. Para evitar links incorretos, não exibimos um perfil fictício.'}
            </p>
            <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
              Responsável pelo site: preencha o campo correspondente em{' '}
              <code className="font-mono text-zinc-200">src/config/company.ts</code>{' '}
              para ativar o redirecionamento direto. Enquanto isso, utilize o
              formulário de orçamento abaixo.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/15 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:text-white"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToQuote(contextEquipment);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#ff5500] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a1a]"
              >
                Solicitar pelo Formulário
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
