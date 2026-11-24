import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ContactNoticeModal, type ModalKind } from './components/ContactNoticeModal';
import { DifferentialsSection } from './components/DifferentialsSection';
import { EquipmentSection } from './components/EquipmentSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuoteSection } from './components/QuoteSection';
import { VirtualAssistant } from './components/VirtualAssistant';
import { initSeoAndAnalytics } from './utils/seoRuntime';

export default function App() {
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [modalKind, setModalKind] = useState<ModalKind>(null);
  const [modalEquipmentContext, setModalEquipmentContext] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    initSeoAndAnalytics();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRequestQuote = (equipmentName = '') => {
    if (equipmentName) {
      setSelectedEquipment(equipmentName);
    }
    scrollToSection('orcamento');
  };

  const handleMissingChannel = (
    channel: 'whatsapp' | 'instagram',
    equipmentName?: string,
  ) => {
    setModalEquipmentContext(equipmentName);
    setModalKind(channel);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#09090b] text-zinc-100">
        <Header onRequestQuote={() => handleRequestQuote('')} />

        <main>
          <HeroSection
            onRequestQuote={() => handleRequestQuote('')}
            onExploreEquipment={() => scrollToSection('equipamentos')}
          />

          <EquipmentSection
            onSelectEquipmentForQuote={(equipmentName) =>
              handleRequestQuote(equipmentName)
            }
            onWhatsAppMissingConfig={(equipmentName) =>
              handleMissingChannel('whatsapp', equipmentName)
            }
          />

          <AboutSection onRequestQuote={() => handleRequestQuote('')} />

          <DifferentialsSection />

          <QuoteSection preselectedEquipment={selectedEquipment} />
        </main>

        <Footer
          onOpenPrivacy={() => {
            setModalEquipmentContext(undefined);
            setModalKind('privacy');
          }}
          onMissingChannel={(channel) => handleMissingChannel(channel)}
        />

        {/* Floating Left Virtual Assistant */}
        <VirtualAssistant
          onSelectEquipmentForQuote={(equipmentName) =>
            handleRequestQuote(equipmentName)
          }
          onExploreEquipment={() => scrollToSection('equipamentos')}
          onMissingChannel={(channel) => handleMissingChannel(channel)}
        />

        {/* Floating Right WhatsApp & Instagram */}
        <FloatingActions
          onMissingChannel={(channel) => handleMissingChannel(channel)}
        />

        {/* Contact Config Notice & Privacy Policy Modal */}
        <ContactNoticeModal
          modalKind={modalKind}
          contextEquipment={modalEquipmentContext}
          onClose={() => setModalKind(null)}
          onGoToQuote={(equipmentName) => handleRequestQuote(equipmentName || '')}
        />
      </div>
    </MotionConfig>
  );
}
