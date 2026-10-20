const pt = {
  meta: {
    title: "NRP Microcrédito — Crédito rápido e justo em Moçambique",
    description:
      "Microcrédito para negócios, famílias e empreendedores em Moçambique. Peça o seu crédito online em poucos minutos.",
  },
  nav: {
    products: "Produtos",
    how: "Como funciona",
    requirements: "Requisitos",
    faq: "Perguntas",
    contact: "Contacto",
    apply: "Pedir crédito",
    skip: "Saltar para o conteúdo",
    menu: "Menu",
    language: "Idioma",
  },
  hero: {
    eyebrow: "Microcrédito em Moçambique",
    title: "Crédito simples para fazer crescer o seu negócio e a sua família",
    subtitle:
      "Valores de 1.000 a 500.000 MZN, prazos de 1 a 24 meses e uma resposta em até {hours} horas.",
    cta: "Pedir crédito agora",
    secondary: "Ver produtos",
    stats: [
      { value: "1.000–500.000", label: "MZN por crédito" },
      { value: "1–24", label: "meses para pagar" },
      { value: "{hours}h", label: "para lhe responder" },
    ],
  },
  products: {
    title: "Escolha o crédito certo para si",
    subtitle: "Três produtos pensados para a realidade de quem trabalha em Moçambique.",
    items: {
      business: {
        name: "Crédito Negócio",
        description:
          "Para comprar stock, equipamento ou reforçar o fundo de maneio da sua loja, banca ou oficina.",
      },
      personal: {
        name: "Crédito Pessoal",
        description:
          "Para despesas da família: escola, saúde, obras em casa ou uma emergência inesperada.",
      },
      entrepreneur: {
        name: "Crédito Empreendedor",
        description:
          "Para quem está a começar um negócio e precisa do primeiro empurrão para arrancar.",
      },
    },
    cta: "Pedir este crédito",
  },
  how: {
    title: "Como funciona",
    steps: [
      {
        title: "Faça o pedido",
        text: "Preencha o formulário online em poucos minutos, no telemóvel ou no computador.",
      },
      {
        title: "Analisamos",
        text: "A nossa equipa analisa o pedido e entra em contacto consigo em até {hours} horas.",
      },
      {
        title: "Entregue os documentos",
        text: "Combinamos consigo a entrega dos documentos e confirmamos as condições.",
      },
      {
        title: "Receba o dinheiro",
        text: "Depois da aprovação, o valor é disponibilizado de forma rápida e segura.",
      },
    ],
  },
  requirements: {
    title: "O que precisa",
    subtitle: "Tenha estes documentos à mão para acelerar a análise.",
    // TODO(NRP): confirmar a lista de documentos
    items: [
      "Bilhete de Identidade (BI) válido",
      "NUIT",
      "Comprovativo de residência",
      "Comprovativo de rendimento ou da actividade do negócio",
      "Número de telemóvel activo",
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        q: "Quanto posso pedir?",
        a: "Pode pedir entre 1.000 e 500.000 MZN. O valor aprovado depende da análise do seu pedido.",
      },
      {
        q: "Em quanto tempo recebo uma resposta?",
        a: "Respondemos a todos os pedidos em até {hours} horas úteis.",
      },
      {
        q: "Fazer o pedido online tem algum custo?",
        a: "Não. O pedido online é gratuito e não o obriga a aceitar o crédito.",
      },
      {
        q: "Os meus dados estão seguros?",
        a: "Sim. Os dados do pedido são guardados de forma protegida e só a equipa da NRP tem acesso a eles.",
      },
    ],
  },
  contact: {
    title: "Fale connosco",
    subtitle: "Prefere falar com uma pessoa? Estamos aqui para ajudar.",
    phone: "Telefone",
    whatsapp: "WhatsApp",
    whatsappCta: "Enviar mensagem",
    email: "Email",
    address: "Endereço",
    hours: "Horário",
  },
  footer: {
    rights: "Todos os direitos reservados.",
    staff: "Área da equipa",
  },
  apply: {
    metaTitle: "Pedir crédito — NRP Microcrédito",
    title: "Pedido de crédito",
    subtitle:
      "Preencha os dados abaixo. Leva cerca de 3 minutos e respondemos em até {hours} horas.",
    sections: {
      you: "Os seus dados",
      loan: "O crédito",
    },
    fields: {
      fullName: "Nome completo",
      phone: "Número de telemóvel",
      phoneHint: "Ex.: 84 123 4567",
      email: "Email (opcional)",
      city: "Cidade ou distrito",
      occupation: "Profissão ou actividade",
      income: "Rendimento mensal",
      product: "Tipo de crédito",
      amount: "Valor pretendido (MZN)",
      amountHint: "Entre 1.000 e 500.000 MZN",
      term: "Prazo (meses)",
      termHint: "Entre 1 e 24 meses",
      purpose: "Para que vai usar o crédito?",
      purposeHint: "Descreva em poucas palavras (mínimo 10 caracteres).",
      consent:
        "Autorizo a NRP Microcrédito a usar estes dados para analisar o meu pedido e a contactar-me.",
    },
    income: {
      lt10k: "Menos de 10.000 MZN",
      "10to25k": "10.000 a 25.000 MZN",
      "25to50k": "25.000 a 50.000 MZN",
      gt50k: "Mais de 50.000 MZN",
    },
    select: "Escolha uma opção",
    submit: "Enviar pedido",
    submitting: "A enviar…",
    errors: {
      fullName: "Escreva o seu nome completo (3 a 120 caracteres).",
      phone: "Indique um número de telemóvel moçambicano válido (ex.: 84 123 4567).",
      email: "O email não parece válido.",
      city: "Indique a sua cidade ou distrito.",
      occupation: "Indique a sua profissão ou actividade.",
      income: "Escolha o seu rendimento mensal.",
      product: "Escolha o tipo de crédito.",
      amount: "O valor deve estar entre 1.000 e 500.000 MZN.",
      term: "O prazo deve estar entre 1 e 24 meses.",
      purpose: "Descreva o objectivo do crédito (10 a 1000 caracteres).",
      consent: "Precisa de autorizar o uso dos dados para continuar.",
      form: "Verifique os campos assinalados.",
      server: "Não foi possível enviar o pedido. Tente novamente ou contacte-nos por telefone.",
    },
    success: {
      title: "Pedido recebido!",
      text: "Obrigado. A nossa equipa vai contactá-lo pelo telemóvel em até {hours} horas.",
      back: "Voltar ao início",
    },
  },
  staff: {
    metaTitle: "Área da equipa — NRP Microcrédito",
    loginTitle: "Entrar na área da equipa",
    email: "Email",
    password: "Palavra-passe",
    signIn: "Entrar",
    signingIn: "A entrar…",
    signOut: "Sair",
    invalid: "Email ou palavra-passe incorrectos.",
    notAdmin: "Esta conta não tem acesso à área da equipa.",
    title: "Pedidos de crédito",
    empty: "Ainda não há pedidos.",
    loading: "A carregar pedidos…",
    filterAll: "Todos",
    columns: {
      date: "Data",
      applicant: "Cliente",
      loan: "Crédito",
      purpose: "Objectivo",
      status: "Estado",
    },
    months: "meses",
    statuses: {
      new: "Novo",
      reviewing: "Em análise",
      approved: "Aprovado",
      rejected: "Recusado",
    },
    save: "Guardar",
    updateFailed: "Não foi possível actualizar o estado.",
  },
  notFound: {
    title: "Página não encontrada",
    back: "Voltar ao início",
  },
};

export default pt;
export type Dictionary = typeof pt;
