import { getInstagramUrl, getWhatsAppUrl } from '../config/company';

interface FloatingActionsProps {
  onMissingChannel: (channel: 'whatsapp' | 'instagram') => void;
}

export function FloatingActions({ onMissingChannel }: FloatingActionsProps) {
  const whatsappUrl = getWhatsAppUrl();
  const instagramUrl = getInstagramUrl();

  const instagramClasses =
    'group relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500] sm:h-12 sm:w-12';

  const whatsappClasses =
    'group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-13 sm:w-13';

  const instagramIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const whatsappIcon = (
    <>
      <span
        aria-hidden="true"
        className="motion-safe-pulse absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/45"
      />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6 sm:h-7 sm:w-7"
      >
        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.016-1.297-4.984-4.344-5.141-4.547-.141-.203-1.219-1.625-1.219-3.094 0-1.469.766-2.188 1.047-2.484.281-.297.609-.375.813-.375.203 0 .406 0 .578.016.188.016.438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.016.547-.109.203-.156.328-.313.516-.156.188-.328.406-.469.547-.156.156-.313.328-.141.641.188.313.813 1.344 1.75 2.172 1.203 1.078 2.203 1.406 2.516 1.563.313.156.5.125.688-.078.188-.203.797-.938 1.016-1.266.219-.328.422-.266.719-.156.297.109 1.875.891 2.188 1.047.313.156.531.234.609.359.078.141.078.797-.172 1.5z" />
      </svg>
    </>
  );

  return (
    <aside
      aria-label="Canais rápidos de atendimento"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6"
    >
      {instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram oficial da P.B. Equipamentos de Locação"
          title="Instagram @p.b_equipamentos"
          className={instagramClasses}
        >
          {instagramIcon}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onMissingChannel('instagram')}
          aria-label="Instagram oficial da P.B. Equipamentos de Locação"
          title="Instagram Oficial"
          className={instagramClasses}
        >
          {instagramIcon}
        </button>
      )}

      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp com a P.B. Equipamentos de Locação"
          title="WhatsApp (43) 9952-9695"
          className={whatsappClasses}
        >
          {whatsappIcon}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onMissingChannel('whatsapp')}
          aria-label="Falar pelo WhatsApp com a P.B. Equipamentos de Locação"
          title="Atendimento via WhatsApp"
          className={whatsappClasses}
        >
          {whatsappIcon}
        </button>
      )}
    </aside>
  );
}
