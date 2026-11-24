/**
 * Configuração central da P.B. Equipamentos de Locação.
 *
 * IMPORTANTE: Como os dados de contato (WhatsApp, Instagram, e-mail e endereço)
 * não foram fornecidos previamente, mantenha estes campos atualizados antes
 * da publicação oficial. Nenhum número ou endereço fictício é exibido no site.
 */
export interface CompanyConfig {
  companyName: string;
  shortName: string;
  /** Número oficial do WhatsApp no formato DDI+DDD+Número, ex: '5511999999999'. Deixe vazio se ainda não configurado. */
  whatsappNumber: string;
  /** Exibição formatada do telefone/WhatsApp, ex: '(11) 99999-9999'. */
  whatsappDisplay: string;
  /** Usuário oficial do Instagram sem @, ex: 'pbequipamentos'. */
  instagramHandle: string;
  /** URL completa do perfil oficial no Instagram. */
  instagramUrl: string;
  /** E-mail comercial oficial, ex: 'contato@pbequipamentos.com.br'. */
  email: string;
  /** Endereço e região de atendimento confirmados pela empresa. */
  address: string;
  serviceRegion: string;
  /** IDs opcionais de SEO & Analytics configurados via variáveis de ambiente Vite */
  analytics: {
    ga4Id: string;
    gtmId: string;
    gscVerification: string;
  };
}

export const COMPANY_CONFIG: CompanyConfig = {
  companyName: 'P.B. Equipamentos de Locação',
  shortName: 'P.B. Equipamentos',
  whatsappNumber: '554399529695',
  whatsappDisplay: '(43) 9952-9695',
  instagramHandle: 'p.b_equipamentos',
  instagramUrl: 'https://www.instagram.com/p.b_equipamentos?evlk=MTVuODdsODlndXdlcA==',
  email: '',
  address: '',
  serviceRegion: '',
  analytics: {
    ga4Id: import.meta.env.VITE_GA4_ID ?? '',
    gtmId: import.meta.env.VITE_GTM_ID ?? '',
    gscVerification: import.meta.env.VITE_GSC_VERIFICATION ?? '',
  },
};

export function isWhatsAppConfigured(): boolean {
  return COMPANY_CONFIG.whatsappNumber.replace(/\D/g, '').length >= 10;
}

export function isInstagramConfigured(): boolean {
  return COMPANY_CONFIG.instagramUrl.trim().startsWith('http');
}

export function getWhatsAppUrl(customMessage?: string): string | null {
  if (!isWhatsAppConfigured()) return null;
  const digits = COMPANY_CONFIG.whatsappNumber.replace(/\D/g, '');
  const defaultMsg =
    'Olá! Vim pelo site da P.B. Equipamentos de Locação e gostaria de solicitar um orçamento.';
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${digits}?text=${text}`;
}

export function getInstagramUrl(): string | null {
  if (!isInstagramConfigured()) return null;
  return COMPANY_CONFIG.instagramUrl.trim();
}
