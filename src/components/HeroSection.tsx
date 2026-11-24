import { type MouseEvent, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from './MagneticButton';
import { ParticleEmbers } from './ParticleEmbers';
import { TiltCard } from './TiltCard';
import { TypewriterFocus } from './TypewriterFocus';

interface HeroSectionProps {
  onRequestQuote: () => void;
  onExploreEquipment: () => void;
}

const HERO_IMAGE = '/src/assets/images/hero_pb_branded_1795542360951.jpg';

const FOCUS_PHRASES = [
  'Obras civis e infraestrutura',
  'Operações industriais e logística',
  'Trabalhos em altura e energia',
  'Projetos com agilidade e segurança',
];

export function HeroSection({
  onRequestQuote,
  onExploreEquipment,
}: HeroSectionProps) {
  const [mouseGlow, setMouseGlow] = useState({ x: 55, y: 40 });
  const [imageFailed, setImageFailed] = useState(false);

  const { scrollY } = useScroll();
  const bgTranslateY = useTransform(scrollY, [0, 700], [0, 90]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseGlow({ x, y });
  };

  return (
    <section
      id="topo"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[calc(100vh-4.25rem)] items-center overflow-hidden bg-[#09090b] py-16 lg:py-24"
    >
      {/* Parallax Cinematic Backdrop */}
      <motion.div
        style={{ y: bgTranslateY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {!imageFailed && (
          <img
            src={HERO_IMAGE}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover object-center opacity-35"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/88 to-[#09090b]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/75" />
      </motion.div>

      {/* Interactive Orange Lighting + Industrial Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(640px circle at ${mouseGlow.x}% ${mouseGlow.y}%, rgba(255, 85, 0, 0.16), transparent 65%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="animate-industrial-gradient pointer-events-none absolute -right-40 top-1/4 h-[460px] w-[460px] rounded-full bg-gradient-to-tr from-[#ff5500]/20 via-amber-500/10 to-transparent blur-3xl"
      />

      {/* Subtle Ambient Ember Particles */}
      <ParticleEmbers />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Left Column: Core Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="mb-5">
            <BrandLogo variant="hero" />
          </div>

          <h1
            className="font-display font-extrabold tracking-tight text-white [text-wrap:balance]"
            style={{
              fontSize: 'clamp(2.25rem, 4.1vw, 3.75rem)',
              lineHeight: 1.06,
            }}
          >
            Os equipamentos certos para sua obra, projeto e operação.
          </h1>

          <div className="mt-5 min-h-[1.75rem] text-base text-zinc-300 sm:text-lg">
            Atendimento focado em{' '}
            <TypewriterFocus phrases={FOCUS_PHRASES} />
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Oferecemos soluções em locação de equipamentos para apoiar sua empresa
            com praticidade, segurança e agilidade do orçamento à entrega em campo.
          </p>

          {/* Strategic Dual CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton variant="primary" onClick={onRequestQuote}>
              Solicitar Orçamento
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>

            <MagneticButton variant="secondary" onClick={onExploreEquipment}>
              <Layers className="h-4 w-4 text-[#ff5500]" />
              Conhecer Equipamentos
            </MagneticButton>
          </div>

          {/* Unboxed Institutional Trust Line */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-xs font-medium text-zinc-400 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#ff5500]" />
              Atendimento especializado
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Orçamento ágil e objetivo</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Soluções sob medida por demanda</span>
          </div>
        </motion.div>

        {/* Right Column: 3D Depth Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <TiltCard
            maxTiltDeg={6}
            className="rounded-xl border border-white/15 bg-[#131316]/90 p-3 shadow-2xl backdrop-blur-md"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-900">
              {!imageFailed ? (
                <img
                  src={HERO_IMAGE}
                  alt="Equipamentos industriais de locação da P.B. Equipamentos em operação"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#ff5500]/20 p-6 text-center">
                  <Layers className="mb-3 h-10 w-10 text-[#ff5500]" />
                  <p className="font-display text-base font-bold text-white">
                    P.B. Equipamentos de Locação
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs font-medium text-[#ff7733]">
                  Soluções em Locação Industrial e Civil
                </p>
                <p className="mt-1 font-display text-lg font-bold text-white">
                  Prontidão operacional para o seu cronograma
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 px-2 py-2 text-xs text-zinc-400">
              <span>Elevação · Carga · Energia · Compactação</span>
              <button
                type="button"
                onClick={onRequestQuote}
                className="font-semibold text-[#ff7733] transition-colors hover:text-white whitespace-nowrap shrink-0"
              >
                Cotar agora →
              </button>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
