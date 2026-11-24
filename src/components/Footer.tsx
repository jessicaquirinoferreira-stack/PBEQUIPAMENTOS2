import { COMPANY_CONFIG, getInstagramUrl, getWhatsAppUrl } from '../config/company';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onMissingChannel: (channel: 'whatsapp' | 'instagram') => void;
}

export function Footer({ onOpenPrivacy, onMissingChannel }: FooterProps) {
  const whatsappUrl = getWhatsAppUrl();
  const instagramUrl = getInstagramUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050507] pb-24 pt-14 text-sm text-zinc-400 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <BrandLogo variant="full" />
            <p className="mt-4 max-w-sm leading-relaxed text-zinc-400">
              Soluções em locação de equipamentos para obras, projetos e operações
              com atendimento especializado, clareza e agilidade.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold text-white">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#topo"
                  className="transition-colors hover:text-[#ff7733]"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#equipamentos"
                  className="transition-colors hover:text-[#ff7733]"
                >
                  Equipamentos
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="transition-colors hover:text-[#ff7733]"
                >
                  Sobre a Empresa
                </a>
              </li>
              <li>
                <a
                  href="#diferenciais"
                  className="transition-colors hover:text-[#ff7733]"
                >
                  Diferenciais
                </a>
              </li>
              <li>
                <a
                  href="#orcamento"
                  className="transition-colors hover:text-[#ff7733]"
                >
                  Solicitar Orçamento
                </a>
              </li>
            </ul>
          </div>

          {/* Official Contacts Column */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-bold text-white">
              Canais Oficiais
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-[#25D366]"
                  >
                    WhatsApp:{' '}
                    {COMPANY_CONFIG.whatsappDisplay ||
                      COMPANY_CONFIG.whatsappNumber}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onMissingChannel('whatsapp')}
                    className="text-left text-zinc-400 transition-colors hover:text-[#ff7733]"
                  >
                    WhatsApp: A configurar em company.ts
                  </button>
                )}
              </li>

              <li>
                {instagramUrl ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-[#ff7733]"
                  >
                    Instagram:{' '}
                    {COMPANY_CONFIG.instagramHandle
                      ? `@${COMPANY_CONFIG.instagramHandle}`
                      : 'Perfil oficial'}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onMissingChannel('instagram')}
                    className="text-left text-zinc-400 transition-colors hover:text-[#ff7733]"
                  >
                    Instagram: A configurar em company.ts
                  </button>
                )}
              </li>

              {COMPANY_CONFIG.email && (
                <li>
                  <a
                    href={`mailto:${COMPANY_CONFIG.email}`}
                    className="text-zinc-300 transition-colors hover:text-[#ff7733]"
                  >
                    E-mail: {COMPANY_CONFIG.email}
                  </a>
                </li>
              )}

              {COMPANY_CONFIG.address && (
                <li className="text-zinc-400">{COMPANY_CONFIG.address}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © {year} {COMPANY_CONFIG.companyName}. Todos os direitos reservados.
          </p>

          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-zinc-400 transition-colors hover:text-[#ff7733]"
          >
            Política de Privacidade
          </button>
        </div>
      </div>
    </footer>
  );
}
