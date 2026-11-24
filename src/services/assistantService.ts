import { COMPANY_CONFIG, isInstagramConfigured, isWhatsAppConfigured } from '../config/company';
import { EQUIPMENT_CATALOG } from '../data/equipment';

export interface AssistantAction {
  type: 'scroll_quote' | 'open_whatsapp' | 'open_instagram' | 'scroll_equipment';
  label: string;
  equipmentName?: string;
}

export interface AssistantReply {
  text: string;
  actions?: AssistantAction[];
}

export interface AssistantServiceOptions {
  /**
   * Campo preparado para integração futura com endpoint real de IA (ex: /api/assistant).
   * Enquanto não houver integração externa configurada, opera com respostas programadas
   * baseadas exclusivamente nas informações institucionais do site.
   */
  apiEndpoint?: string;
}

function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function buildContactEscalationActions(): AssistantAction[] {
  const actions: AssistantAction[] = [
    { type: 'scroll_quote', label: 'Solicitar orçamento no site' },
  ];

  if (isWhatsAppConfigured()) {
    actions.push({ type: 'open_whatsapp', label: 'Falar no WhatsApp' });
  }
  if (isInstagramConfigured()) {
    actions.push({ type: 'open_instagram', label: 'Abrir Instagram' });
  }

  return actions;
}

export async function sendAssistantMessage(
  userMessage: string,
  options?: AssistantServiceOptions,
): Promise<AssistantReply> {
  if (options?.apiEndpoint) {
    try {
      const response = await fetch(options.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      if (response.ok) {
        const data = (await response.json()) as AssistantReply;
        if (data?.text) return data;
      }
    } catch {
      // Continua para o atendimento programado caso endpoint futuro não responda
    }
  }

  const q = normalize(userMessage);

  // Intenção de contratação, orçamento, preço ou falar com atendente
  if (
    /\b(orcamento|preco|valor|quanto custa|alugar|contratar|locar|cotacao|atendente|humano|falar com|vendedor|comercial)\b/.test(
      q,
    )
  ) {
    const channelNote = isWhatsAppConfigured()
      ? 'Você pode preencher o formulário de orçamento aqui no site ou falar diretamente com nossa equipe pelo WhatsApp oficial.'
      : 'Você pode preencher nosso formulário de orçamento aqui no site para receber o retorno da nossa equipe comercial com agilidade.';

    return {
      text: `Com certeza! Para solicitar um orçamento ou contratar equipamentos na ${COMPANY_CONFIG.companyName}, precisamos apenas do equipamento desejado, cidade, prazo estimado e uma breve descrição da sua necessidade. ${channelNote}`,
      actions: buildContactEscalationActions(),
    };
  }

  // Plataformas e elevação
  if (/\b(plataforma|tesoura|articulada|altura|elevacao|acesso)\b/.test(q)) {
    const item = EQUIPMENT_CATALOG[0];
    return {
      text: `${item.name}: ${item.description} Principais aplicações: ${item.applications.join('; ')}. ${item.technicalNote}`,
      actions: [
        {
          type: 'scroll_quote',
          label: 'Orçar Plataformas',
          equipmentName: item.name,
        },
        ...buildContactEscalationActions().filter((a) => a.type !== 'scroll_quote'),
      ],
    };
  }

  // Movimentação e carga
  if (/\b(empilhadeira|manipulador|telescopico|carga|movimentacao|palete)\b/.test(q)) {
    const item = EQUIPMENT_CATALOG[1];
    return {
      text: `${item.name}: ${item.description} Principais aplicações: ${item.applications.join('; ')}. ${item.technicalNote}`,
      actions: [
        {
          type: 'scroll_quote',
          label: 'Orçar Movimentação',
          equipmentName: item.name,
        },
        ...buildContactEscalationActions().filter((a) => a.type !== 'scroll_quote'),
      ],
    };
  }

  // Energia e iluminação
  if (/\b(gerador|energia|iluminacao|torre|luz)\b/.test(q)) {
    const item = EQUIPMENT_CATALOG[2];
    return {
      text: `${item.name}: ${item.description} Principais aplicações: ${item.applications.join('; ')}. ${item.technicalNote}`,
      actions: [
        {
          type: 'scroll_quote',
          label: 'Orçar Energia e Iluminação',
          equipmentName: item.name,
        },
        ...buildContactEscalationActions().filter((a) => a.type !== 'scroll_quote'),
      ],
    };
  }

  // Compactação
  if (/\b(compactador|rolo|pavimentacao|solo|asfalto|obra civil)\b/.test(q)) {
    const item = EQUIPMENT_CATALOG[3];
    return {
      text: `${item.name}: ${item.description} Principais aplicações: ${item.applications.join('; ')}. ${item.technicalNote}`,
      actions: [
        {
          type: 'scroll_quote',
          label: 'Orçar Compactação',
          equipmentName: item.name,
        },
        ...buildContactEscalationActions().filter((a) => a.type !== 'scroll_quote'),
      ],
    };
  }

  // Lista geral de equipamentos / serviços
  if (/\b(equipamento|equipamentos|catalogo|maquina|maquinas|servico|servicos|locacao|o que voces tem)\b/.test(q)) {
    const names = EQUIPMENT_CATALOG.map((e) => `• ${e.name}`).join('\n');
    return {
      text: `Na ${COMPANY_CONFIG.companyName}, oferecemos soluções completas de locação organizadas nas seguintes linhas:\n${names}\n\nSe desejar, posso direcionar você ao catálogo ou abrir o formulário de orçamento.`,
      actions: [
        { type: 'scroll_equipment', label: 'Ver todos os equipamentos' },
        { type: 'scroll_quote', label: 'Solicitar orçamento' },
      ],
    };
  }

  // Informações institucionais / sobre a empresa
  if (/\b(empresa|sobre|quem sao|pb|p\.b\.|confianca|diferenciais|como funciona)\b/.test(q)) {
    return {
      text: `A ${COMPANY_CONFIG.companyName} atua com foco em profissionalismo, comprometimento e agilidade no atendimento para entregar os equipamentos certos para sua obra, projeto e operação. Nosso atendimento é especializado na indicação da solução adequada à necessidade de cada cliente.`,
      actions: buildContactEscalationActions(),
    };
  }

  // Contato / WhatsApp / Instagram / Endereço / Telefone
  if (/\b(contato|whatsapp|instagram|telefone|numero|email|e-mail|endereco|onde fica|cidade)\b/.test(q)) {
    const parts: string[] = [];
    if (COMPANY_CONFIG.whatsappDisplay) {
      parts.push(`WhatsApp: ${COMPANY_CONFIG.whatsappDisplay}`);
    }
    if (COMPANY_CONFIG.instagramHandle) {
      parts.push(`Instagram: @${COMPANY_CONFIG.instagramHandle}`);
    }
    if (COMPANY_CONFIG.email) {
      parts.push(`E-mail: ${COMPANY_CONFIG.email}`);
    }
    if (COMPANY_CONFIG.address) {
      parts.push(`Endereço: ${COMPANY_CONFIG.address}`);
    }

    if (parts.length > 0) {
      return {
        text: `Canais oficiais da ${COMPANY_CONFIG.companyName}:\n${parts.join('\n')}`,
        actions: buildContactEscalationActions(),
      };
    }

    return {
      text: `Os canais diretos (WhatsApp e Instagram) estão preparados para configuração pela equipe da ${COMPANY_CONFIG.companyName}. Enquanto isso, você pode enviar sua solicitação diretamente pelo nosso formulário de orçamento aqui no site.`,
      actions: [{ type: 'scroll_quote', label: 'Ir para o formulário' }],
    };
  }

  // Saudações
  if (/^(oi|ola|bom dia|boa tarde|boa noite|tudo bem|hey|hello)\b/.test(q)) {
    return {
      text: `Olá! Como posso ajudar você hoje? Posso apresentar nossas linhas de equipamentos disponíveis para locação, explicar como funciona a solicitação de orçamento ou direcionar você para nossa equipe.`,
      actions: [
        { type: 'scroll_equipment', label: 'Conhecer equipamentos' },
        { type: 'scroll_quote', label: 'Solicitar orçamento' },
      ],
    };
  }

  // Fallback honesto quando a pergunta foge das informações disponíveis no site
  return {
    text: 'Não tenho essa informação específica disponível aqui no momento, mas nossa equipe comercial poderá ajudar você com total precisão. Deseja solicitar um orçamento ou falar com nossos canais oficiais?',
    actions: buildContactEscalationActions(),
  };
}
