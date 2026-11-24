import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onRequestQuote: () => void;
}

const NAV_LINKS = [
  { href: '#equipamentos', label: 'Equipamentos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#orcamento', label: 'Orçamento' },
];

export function Header({ onRequestQuote }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#topo"
          aria-label="P.B. Equipamentos de Locação - Início"
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5500]"
        >
          <BrandLogo variant="header" />
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-medium text-zinc-300 transition-colors duration-150 hover:text-white whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#ff5500] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestQuote}
            className="hidden rounded-lg bg-[#ff5500] px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#ff6a1a] whitespace-nowrap shrink-0 sm:inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500]"
          >
            Solicitar Orçamento
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-zinc-900 text-zinc-200 transition-colors hover:border-[#ff5500]/60 hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#09090b] px-4 pb-5 pt-3 md:hidden">
          <nav aria-label="Menu móvel" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-[#ff5500]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onRequestQuote();
              }}
              className="mt-3 w-full rounded-lg bg-[#ff5500] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff6a1a]"
            >
              Solicitar Orçamento
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
