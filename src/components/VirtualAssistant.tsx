import { type FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, MessageSquare, Send, UserCheck, X } from 'lucide-react';
import { getInstagramUrl, getWhatsAppUrl } from '../config/company';
import {
  type AssistantAction,
  sendAssistantMessage,
} from '../services/assistantService';

interface VirtualAssistantProps {
  onSelectEquipmentForQuote: (equipmentName: string) => void;
  onExploreEquipment: () => void;
  onMissingChannel: (channel: 'whatsapp' | 'instagram') => void;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  actions?: AssistantAction[];
}

const AVATAR_IMAGE = '/src/assets/images/assistant_pb_embroidered_1795542363421.jpg';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  text: 'Olá! Seja bem-vindo à P.B. Equipamentos de Locação. Sou o assistente virtual da empresa. Como posso ajudar você hoje?',
  actions: [
    { type: 'scroll_equipment', label: 'Ver equipamentos' },
    { type: 'scroll_quote', label: 'Solicitar orçamento' },
  ],
};

const QUICK_QUESTIONS = [
  'Quais equipamentos vocês locam?',
  'Como solicitar um orçamento?',
  'Sobre a P.B. Equipamentos',
];

export function VirtualAssistant({
  onSelectEquipmentForQuote,
  onExploreEquipment,
  onMissingChannel,
}: VirtualAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const listEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleAction = (action: AssistantAction) => {
    if (action.type === 'scroll_quote') {
      setIsOpen(false);
      onSelectEquipmentForQuote(action.equipmentName || '');
      return;
    }
    if (action.type === 'scroll_equipment') {
      setIsOpen(false);
      onExploreEquipment();
      return;
    }
    if (action.type === 'open_whatsapp') {
      onMissingChannel('whatsapp');
      return;
    }
    if (action.type === 'open_instagram') {
      onMissingChannel('instagram');
    }
  };

  const submitQuery = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Pequeno atraso natural para fluidez de leitura (180ms)
    await new Promise((resolve) => setTimeout(resolve, 180));
    const reply = await sendAssistantMessage(trimmed);

    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: reply.text,
      actions: reply.actions,
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void submitQuery(input);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Assistente Virtual P.B."
            className="mb-3 flex h-[min(500px,calc(100vh-7rem))] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111114]/95 shadow-2xl backdrop-blur-xl"
          >
            {/* Assistant Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#18181d] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#ff5500]/60 bg-zinc-900">
                  {!avatarFailed ? (
                    <img
                      src={AVATAR_IMAGE}
                      alt="Assistente Virtual P.B."
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-xs font-bold text-[#ff5500]">
                      P.B.
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="font-display text-sm font-bold text-white">
                    ASSISTENTE VIRTUAL P.B.
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-emerald-400">
                    <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Disponível para ajudar</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimizar assistente virtual"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-line rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#ff5500] text-white'
                        : 'border border-white/10 bg-[#1a1a20] text-zinc-200'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.actions.map((action) => {
                        const externalHref =
                          action.type === 'open_whatsapp'
                            ? getWhatsAppUrl()
                            : action.type === 'open_instagram'
                              ? getInstagramUrl()
                              : null;

                        if (externalHref) {
                          return (
                            <a
                              key={action.label}
                              href={externalHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#ff5500]/40 bg-[#ff5500]/10 px-3 py-1.5 text-xs font-semibold text-[#ff7733] transition-colors hover:bg-[#ff5500] hover:text-white"
                            >
                              <span>{action.label}</span>
                              <ArrowRight className="h-3 w-3" />
                            </a>
                          );
                        }

                        return (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => handleAction(action)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#ff5500]/40 bg-[#ff5500]/10 px-3 py-1.5 text-xs font-semibold text-[#ff7733] transition-colors hover:bg-[#ff5500] hover:text-white"
                          >
                            <span>{action.label}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a1a20] px-3.5 py-2 text-xs text-zinc-400">
                  Escrevendo resposta...
                </div>
              )}

              <div ref={listEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex gap-1.5 overflow-x-auto border-t border-white/10 bg-[#141418] px-3 py-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void submitQuery(q)}
                  className="shrink-0 rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:border-[#ff5500]/50 hover:text-white whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-[#0d0d10] p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida..."
                aria-label="Digite sua dúvida para o Assistente Virtual P.B."
                className="flex-1 rounded-lg border border-white/10 bg-[#18181d] px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#ff5500] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Enviar mensagem"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ff5500] text-white transition-colors hover:bg-[#ff6a1a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Left-Side Launcher Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={
          isOpen
            ? 'Fechar Assistente Virtual P.B.'
            : 'Abrir Assistente Virtual P.B.'
        }
        className="group flex items-center gap-2.5 rounded-full border border-[#ff5500]/50 bg-[#131316]/95 p-1.5 pr-3.5 text-left shadow-xl backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] hover:border-[#ff5500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5500]"
      >
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#ff5500]/70 bg-zinc-900">
          {!avatarFailed ? (
            <img
              src={AVATAR_IMAGE}
              alt="Assistente Virtual P.B."
              referrerPolicy="no-referrer"
              onError={() => setAvatarFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <MessageSquare className="m-auto h-5 w-5 text-[#ff5500]" />
          )}
        </span>
        <span className="hidden sm:block">
          <span className="block font-display text-xs font-bold text-white whitespace-nowrap">
            Assistente Virtual P.B.
          </span>
          <span className="block text-[11px] font-medium text-emerald-400 whitespace-nowrap">
            Disponível agora
          </span>
        </span>
      </motion.button>
    </div>
  );
}
