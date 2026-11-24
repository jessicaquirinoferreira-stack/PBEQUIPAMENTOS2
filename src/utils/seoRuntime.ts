import { COMPANY_CONFIG } from '../config/company';

/**
 * Inicializa tags dinâmicas de SEO (canonical URL, og:url) e carrega
 * Google Analytics 4, Google Tag Manager ou meta de verificação do
 * Search Console quando configurados via variáveis de ambiente.
 */
export function initSeoAndAnalytics(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const canonicalHref = window.location.origin + window.location.pathname;

  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonicalHref;

  let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.content = canonicalHref;

  const { gscVerification, ga4Id, gtmId } = COMPANY_CONFIG.analytics;

  if (gscVerification && !document.querySelector('meta[name="google-site-verification"]')) {
    const gscMeta = document.createElement('meta');
    gscMeta.name = 'google-site-verification';
    gscMeta.content = gscVerification;
    document.head.appendChild(gscMeta);
  }

  if (ga4Id && !document.querySelector(`script[src*="gtag/js?id=${ga4Id}"]`)) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(gtagScript);

    const inlineScript = document.createElement('script');
    inlineScript.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id.replace(/[^a-zA-Z0-9_-]/g, '')}');`;
    document.head.appendChild(inlineScript);
  }

  if (gtmId && !document.querySelector(`script[src*="gtm.js?id=${gtmId}"]`)) {
    const safeGtm = gtmId.replace(/[^a-zA-Z0-9_-]/g, '');
    const gtmScript = document.createElement('script');
    gtmScript.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${safeGtm}');`;
    document.head.appendChild(gtmScript);
  }
}
