export type EquipmentCategory =
  | 'Todos'
  | 'Acesso e Elevação'
  | 'Movimentação e Carga'
  | 'Energia e Iluminação'
  | 'Compactação e Pavimentação';

export interface EquipmentItem {
  id: string;
  name: string;
  category: Exclude<EquipmentCategory, 'Todos'>;
  image: string;
  imageAlt: string;
  description: string;
  applications: string[];
  technicalNote: string;
}

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  'Todos',
  'Acesso e Elevação',
  'Movimentação e Carga',
  'Energia e Iluminação',
  'Compactação e Pavimentação',
];

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: 'acesso-elevacao',
    name: 'Plataformas Elevatórias (Tesoura e Articulada)',
    category: 'Acesso e Elevação',
    image: '/src/assets/images/elevacao_pb_branded_1795542363484.jpg',
    imageAlt:
      'Plataforma elevatória tipo tesoura e plataforma articulada em ambiente industrial com iluminação laranja',
    description:
      'Soluções seguras e eficientes para trabalhos em altura em ambientes internos ou externos, proporcionando acesso ágil e estabilidade operacional para suas equipes.',
    applications: [
      'Montagens industriais, estruturas metálicas e instalações elétricas',
      'Manutenção predial, galpões logísticos e centros comerciais',
      'Acabamentos de fachadas e serviços em altura com segurança',
    ],
    technicalNote:
      'Altura de trabalho, capacidade de carga e configuração (elétrica ou a combustão) definidas conforme a necessidade do seu projeto mediante consulta.',
  },
  {
    id: 'movimentacao-carga',
    name: 'Manipuladores Telescópicos e Empilhadeiras',
    category: 'Movimentação e Carga',
    image: '/src/assets/images/movimentacao_pb_branded_1795542361910.jpg',
    imageAlt:
      'Manipulador telescópico e empilhadeira industrial em pátio logístico de aço',
    description:
      'Equipamentos robustos para elevação, transporte e posicionamento de materiais em canteiros de obras, indústrias e operações logísticas exigentes.',
    applications: [
      'Carga e descarga de materiais paletizados e insumos pesados',
      'Abastecimento de pavimentos e frentes de trabalho em obras civis',
      'Operações de pátio, armazenagem e movimentação industrial',
    ],
    technicalNote:
      'Capacidade nominal, alcance e acessórios compatíveis alinhados no atendimento técnico de orçamento.',
  },
  {
    id: 'energia-iluminacao',
    name: 'Grupos Geradores e Torres de Iluminação',
    category: 'Energia e Iluminação',
    image: '/src/assets/images/energia_pb_clean_1795542378857.jpg',
    imageAlt:
      'Grupo gerador carenado e torre de iluminação portátil ligados ao entardecer em canteiro operacional',
    description:
      'Fornecimento confiável de energia temporária e iluminação de alta performance para manter obras, operações industriais e turnos noturnos em plena atividade.',
    applications: [
      'Suprimento contínuo de energia em frentes de obra sem rede elétrica',
      'Iluminação de canteiros, pátios de manobra e trabalhos noturnos',
      'Continuidade operacional em paradas programadas e projetos especiais',
    ],
    technicalNote:
      'Dimensionamento de potência, autonomia e cobertura luminosa orientados de acordo com a demanda informada.',
  },
  {
    id: 'compactacao-pavimentacao',
    name: 'Equipamentos de Compactação e Pavimentação',
    category: 'Compactação e Pavimentação',
    image: '/src/assets/images/compactacao_pb_branded_1795542363422.jpg',
    imageAlt:
      'Rolo compactador e equipamentos de pavimentação preparados em área de obra',
    description:
      'Maquinário de alto desempenho para preparação de solo, base, sub-base e acabamento viário com uniformidade e produtividade em campo.',
    applications: [
      'Compactação de solo, aterros e preparação de terrenos para fundações',
      'Obras de infraestrutura urbana, pátios industriais e acessos',
      'Apoio a serviços de pavimentação e nivelamento de superfícies',
    ],
    technicalNote:
      'Configuração do equipamento recomendada conforme tipo de solo, área de atuação e cronograma da obra.',
  },
];
