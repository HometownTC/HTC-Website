import type { ServicesPricingPageConfig } from './pricingData';

// Spanish version of PRICING_PAGE_DATA. Same structure, prices and links as the English file;
// only the words change. When a price or service changes in pricingData.ts, change it here too.
export const PRICING_PAGE_DATA_ES: ServicesPricingPageConfig = {
  hero: {
    badge: 'SERVICIOS + PRECIOS',
    title: 'Servicios + Precios',
    description:
      'Apoyo claro y predecible para Realtors en Florida. Desde el lanzamiento de listados antes de salir al mercado hasta De Contrato a Cierre y el cumplimiento con el brokerage, conozca nuestros servicios y precios transparentes.',
    jumpLinks: [
      { label: 'Lanzamiento de Listados', targetId: 'listing-launch' },
      { label: 'De Contrato a Cierre', targetId: 'contract-to-close' },
      { label: 'Cumplimiento con el Broker', targetId: 'broker-compliance' },
      { label: 'Equipos + Brokerages', targetId: 'teams-brokerages' },
      { label: 'SCALE', targetId: 'scale' },
    ],
  },

  agentSetup: {
    badge: 'REGISTRO DE NUEVOS CLIENTES',
    name: 'Configuración del Agente e Integración de Sistemas',
    timing: 'CONFIGURACIÓN E INTEGRACIÓN ÚNICA',
    purpose: 'Integramos su negocio al flujo de trabajo de HTC para que los siguientes expedientes entren directamente, sin repetir la configuración.',
    details: [
      'Mapeo del portal de su brokerage y listas de cumplimiento a la medida',
      'Protocolos de comunicación preferidos y detalles VIP con sus clientes',
      'Plantillas de correo e integración del flujo de bienvenida',
      'Asignación de su coordinadora principal y configuración de la recepción de expedientes',
    ],
    price: '$399',
    priceNote: 'Inversión única',
    ctaText: 'INICIAR CONFIGURACIÓN',
  },

  listingLaunch: {
    id: 'listing-launch',
    name: 'Lanzamiento de Listados',
    shortName: 'Lanzamiento de Listados',
    eyebrow: 'COORDINACIÓN ANTES DEL MERCADO',
    headline: 'Preparación previa al mercado y borrador en el MLS',
    description: 'Organizamos todas las piezas necesarias para preparar y lanzar un listado.',
    status: 'active',
    displayOrder: 1,
    included: [
      'Verificación de registros públicos y escritura',
      'Preparación, seguimiento y revisión de las divulgaciones del vendedor',
      'Borrador completo en el MLS con orden de fotos y enlaces de recorrido virtual',
      'Adjuntar las divulgaciones requeridas, pintura con plomo y formularios de HOA',
      'Armado de documentos y carga al portal del brokerage',
    ],
    options: [
      {
        title: 'Estándar',
        price: '$125',
        turnaround: '3 días hábiles',
        description: 'Tiempo de entrega estándar para fechas de listado programadas.',
      },
      {
        title: 'Prioritario',
        price: '$225',
        turnaround: '1 día hábil',
        description: 'Fila acelerada para fechas de publicación urgentes.',
      },
    ],
    addons: [
      {
        name: 'Investigación de Condominio / HOA',
        price: '$100',
        note: 'Reglas de la asociación, verificación de contactos y preparación del paquete para el comprador',
        includedWithScale: 'Incluido con SCALE en sus 3 listados mensuales',
      },
      {
        name: 'Staging virtual de 5 fotos',
        price: '$50',
        note: 'Staging virtual profesional para hasta 5 fotos del listado',
        includedWithScale: 'Incluido con SCALE: 5 fotos por listado incluido, a solicitud y según sus indicaciones',
      },
      {
        name: 'Reportes semanales LAMP para el vendedor',
        price: '$99 / mes',
        note: 'Cada visita, los comentarios de los compradores palabra por palabra y el plan para la próxima semana. Nosotros lo preparamos; usted lo aprueba antes de que llegue a sus vendedores. Para listados que lanzó HTC.',
        includedWithScale: 'Incluido con SCALE en sus 3 listados mensuales',
      },
    ],
    ctaText: 'ENVIAR UN LANZAMIENTO DE LISTADO',
  },

  contractToClose: {
    id: 'contract-to-close',
    name: 'De Contrato a Cierre',
    shortName: 'De Contrato a Cierre',
    eyebrow: 'COORDINACIÓN DE TRANSACCIONES',
    headline: 'The Hometown Signature',
    description:
      'Manejo completo De Contrato a Cierre, desde el contrato ejecutado hasta el cumplimiento con el broker después del cierre, con un precio fijo y transparente por expediente.',
    status: 'active',
    displayOrder: 2,
    setupNote:
      'Se requiere la Inversión de Configuración del Agente, un pago único de $399 al registrarse, para personalizar sus flujos de trabajo, plantillas del broker y preferencias de comunicación.',
    timingNote:
      'El precio residencial De Contrato a Cierre se basa en un plazo típico de 45 días. A los expedientes que pasen de 60 días se les aplica un cargo de $100 por tiempo.',
    cancellationNote:
      'Si una transacción se cancela durante el período de inspección, no hay cargo por cancelación. Después del período de inspección, se aplica un cargo administrativo por el trabajo ya realizado en el expediente.',
    plans: [
      {
        id: 'signature',
        name: 'The Hometown Signature',
        price: '$495',
        priceNote: 'por lado cerrado',
        tagline: 'Usted vende. Usted lidera. Nosotros nos encargamos de los detalles.',
        summary:
          'Su experiencia completa de manejo de la transacción y atención al cliente, con más de tres décadas de experiencia inmobiliaria y supervisión proactiva.',
        intro: [
          'Usted no se hizo Realtor para perseguir depósitos, buscar documentos, dar seguimiento a prestamistas o preguntarse si el expediente para su brokerage está listo.',
          'Usted atiende a sus clientes, negocia el trato y hace crecer su negocio. Nosotros nos encargamos de la transacción.',
        ],
        youOwn: [
          { title: 'La relación', text: 'Gana clientes, genera confianza y sigue siendo su asesor de confianza.' },
          { title: 'Las decisiones', text: 'Negocia, asesora y toma las decisiones que requieren su licencia y experiencia.' },
          { title: 'El próximo trato', text: 'Prospecta, muestra propiedades y hace crecer su cartera.' },
        ],
        weOwn: [
          { title: 'Las fechas límite', text: 'Calculamos, registramos y monitoreamos los hitos del contrato para que sepa qué vence, qué está pendiente y qué necesita su atención.' },
          { title: 'El seguimiento', text: 'Estamos al tanto de depósitos, inspecciones, prestamistas, título, tasaciones y aprobaciones de la asociación. Damos seguimiento hasta que cada pendiente se resuelve o se escala.' },
          { title: 'La comunicación', text: 'Mantenemos informadas a las partes de la transacción y actualizados a sus compradores o vendedores bajo su marca, sin que usted tenga que escribir cada correo.' },
          { title: 'Los documentos', text: 'Organizamos documentos, monitoreamos lo que falta, manejamos las entregas de cumplimiento al brokerage y damos seguimiento a la autorización de comisión.' },
          { title: 'La preparación del cierre', text: 'Coordinamos las últimas piezas, desde recordatorios de la inspección final hasta la revisión de discrepancias en la hoja de cierre y la logística del cierre.' },
          { title: 'El final', text: 'Completamos la documentación final y las solicitudes de reseña al cliente para que la experiencia no termine de golpe en la mesa de cierre.' },
        ],
        closing: [
          'Su negocio. Sus clientes. Nuestra atención Signature.',
          'Usted se mantiene visible donde importa. Nosotros estamos al tanto de todo lo que mantiene la transacción en marcha.',
          'Cierre más. Cargue menos.',
          'Cierres Impecables. Punto.',
        ],
        features: [],
        ctaText: 'ELEGIR THE HOMETOWN SIGNATURE',
        href: '/register/',
      },
    ],
    additionalServices: [
      {
        name: 'De Contrato a Cierre comercial — desde $595',
        price: 'Desde $595',
        description: 'Los expedientes comerciales que pasen de 90 días requieren un depósito de $200.',
      },
      {
        name: 'Ambos lados de la transacción — +$200',
        price: '+$200',
        description: 'Coordinación de ambos lados de la transacción hasta el cierre y el cumplimiento con el brokerage.',
      },
    ],
  },

  brokerCompliance: {
    id: 'broker-compliance',
    name: 'Cumplimiento con el Broker',
    shortName: 'Cumplimiento con el Broker',
    eyebrow: 'APROBACIÓN DEL EXPEDIENTE EN EL BROKERAGE',
    headline: 'Aprobación del expediente en el brokerage',
    description:
      '¿Ya está manejando el alquiler o la venta usted mismo? Cumplimiento con el Broker se enfoca específicamente en la aprobación del expediente en su brokerage para que se emita su Autorización de Desembolso de Comisión (CDA/DA) y usted pueda cobrar.',
    status: 'active',
    displayOrder: 3,
    whatWeHandle: [
      'Revisión contra los requisitos del brokerage',
      'Identificación de documentos y firmas faltantes',
      'Envío de documentos aprobados para firma cuando usted lo indique',
      'Organización y carga del expediente',
      'Seguimiento durante la revisión del brokerage',
    ],
    agentProvides: [
      'Contrato de compraventa o contrato de alquiler ejecutado, con todos sus anexos',
      'Acceso al portal de cumplimiento del brokerage o instrucciones de carga',
      'Detalles del desembolso de comisión y número de expediente del brokerage',
    ],
    rates: [
      {
        type: 'Expediente de alquiler',
        price: '$100',
        paymentNote: 'Se paga al enviar el expediente',
      },
      {
        type: 'Contrato de compraventa',
        price: '$195',
        paymentNote: 'Se paga al enviar el expediente',
      },
    ],
    ctaText: 'ENVIAR EXPEDIENTE DE CUMPLIMIENTO',
  },

  teamsBrokerages: {
    id: 'teams-brokerages',
    name: 'Equipos + Brokerages',
    shortName: 'Equipos + Brokerages',
    eyebrow: 'APOYO PARA EQUIPOS Y EMPRESAS',
    headline: 'Flujos de transacción, procesos administrativos y apoyo de expedientes en Florida.',
    description: 'Flujos de transacción, procesos administrativos y apoyo de expedientes en Florida.',
    status: 'active',
    displayOrder: 4,
    serviceAreas: [
      {
        title: 'Apoyo de transacciones + cumplimiento',
        description:
          'Coordinación dedicada, rutas de escalamiento a la medida y apoyo de expedientes según la producción del equipo o brokerage.',
      },
      {
        title: 'Configuración de sistemas + operaciones',
        description:
          'Configuración completa de plataformas de manejo de transacciones, plantillas de tareas estandarizadas, recepción de expedientes y flujos de cumplimiento del brokerage.',
      },
      {
        title: 'Capacitación de personal administrativo / asistentes / VA',
        description:
          'Capacitación práctica para personal administrativo, asistentes y asistentes virtuales sobre flujos de transacción, procesos administrativos y apoyo de expedientes en Florida.',
      },
    ],
    ctaPrimary: 'AGENDAR LLAMADA DE 15 MINUTOS',
    ctaSecondary: 'CONOZCA EL FLORIDA TC WORKSHOP',
  },

  scale: {
    id: 'scale',
    name: 'SCALE',
    shortName: 'SCALE',
    eyebrow: 'SCALE · YA DISPONIBLE',
    headline: 'SCALE: todo resuelto, un solo precio mensual.',
    description:
      'SCALE es apoyo administrativo para todo su negocio, no solo para sus contratos. Usted sigue al frente vendiendo. Nosotros nos encargamos del trabajo operativo. No necesita enviarnos sus expedientes De Contrato a Cierre para unirse.',
    status: 'active',
    displayOrder: 5,
    subtitle: 'Apoyo administrativo para un agente ocupado en Florida, un solo precio mensual.',
    ctaText: 'UNIRSE A SCALE',
    waitlistNote: 'Pago seguro. El plan mensual se cobra cada mes hasta que lo cancele. Los planes pagados por adelantado se cobran una sola vez y no se renuevan solos.',
    price: '$397 / mes',
    priceNote: 'Pague por adelantado y ahorre: 3 meses 10% menos · 6 meses 15% menos · 1 año 20% menos.',
  },

  faqs: [
    {
      id: 'faq-scale-per-agent',
      question: '¿SCALE es por agente o por equipo?',
      answerParagraphs: [
        'SCALE es por agente. Cada membresía cubre el negocio propio de un agente, incluyendo hasta 3 Lanzamientos de Listado al mes con investigación de condominio y HOA, 5 fotos con staging virtual a solicitud y reportes semanales LAMP para el vendedor en cada uno.',
        'Equipos: cada miembro del equipo que quiera SCALE necesita su propia membresía. Contáctenos y le cotizamos una tarifa de grupo.',
        '¿Necesita más de 3 Lanzamientos de Listado en un mes? Todo lo que pase de su cupo tiene 25% de descuento sobre el precio regular para miembros de SCALE. SCALE está pensado para un agente individual ocupado; las membresías usadas más allá del negocio de un agente pueden pausarse o terminarse.',
      ],
    },
    {
      id: 'faq-active-listings',
      question: '¿Pueden tomar listados que ya están activos?',
      answerParagraphs: [
        'No. Lanzamos cada listado nosotros mismos, desde el inicio, para que el expediente, las divulgaciones y el MLS estén correctos desde el primer día.',
        'Por eso los reportes semanales LAMP y los extras de listados de SCALE aplican solo a listados que lanzó HTC. Envíenos su próximo listado antes de que salga al mercado y nosotros nos encargamos.',
      ],
    },
    {
      id: 'faq-started',
      question: '¿Qué necesito para empezar?',
      answerParagraphs: [
        'Comience con una llamada de compatibilidad de 15 minutos. Cuando confirmemos que somos compatibles, la Inversión de Configuración del Agente, un pago único de $399, nos da el tiempo para integrar su negocio al flujo de trabajo de HTC: los requisitos de su brokerage, sus plantillas, su comunicación preferida, sus preferencias de servicio y los detalles únicos que quiere que vivan sus clientes.',
        'Una vez completada esa configuración, sus siguientes expedientes entran directamente en el flujo de trabajo que creamos para usted.',
      ],
      links: [
        {
          text: 'AGENDAR LLAMADA DE 15 MINUTOS →',
          action: 'bookCall',
        },
      ],
    },
    {
      id: 'faq-payment',
      question: '¿Cuándo pago?',
      answerParagraphs: [],
      paymentBreakdown: [
        { item: 'Inversión de Configuración del Agente', timing: 'Al registrarse. Una vez pagada, agendamos su llamada de configuración.' },
        { item: 'Lanzamiento de Listados', timing: 'Al enviar el expediente.' },
        { item: 'Cumplimiento con el Broker', timing: 'Al enviar el expediente.' },
        { item: 'De Contrato a Cierre', timing: 'Al cierre.' },
      ],
    },
    {
      id: 'faq-cancellation',
      question: '¿Qué pasa si mi contrato se cancela?',
      answerParagraphs: [
        'Si el contrato se cancela durante el período de inspección, no hay cargo por cancelación. Si se cancela después del período de inspección, se aplica un cargo administrativo por el trabajo ya realizado.',
      ],
      links: [
        {
          text: '¿Tiene más preguntas? Agende una llamada de 15 minutos →',
          action: 'bookCall',
        },
      ],
    },
    {
      id: 'faq-broker-compliance',
      question: '¿Qué es Cumplimiento con el Broker?',
      answerParagraphs: [
        '¿Ya está manejando el alquiler o la venta usted mismo? Cumplimiento con el Broker se enfoca específicamente en la aprobación del expediente en su brokerage para que se emita su Autorización de Desembolso de Comisión (CDA/DA) y usted pueda cobrar.',
        'HTC revisa contra los requisitos del brokerage, identifica documentos y firmas faltantes, envía documentos aprobados para firma cuando usted lo indica, organiza y carga el expediente, y da seguimiento durante la revisión del brokerage.',
      ],
    },
    {
      id: 'faq-listing-without-ctc',
      question: '¿Puedo usar Lanzamiento de Listados sin De Contrato a Cierre?',
      answerParagraphs: [
        'Sí. Lanzamiento de Listados es un servicio aparte y puede enviarse por sí solo.',
        'Si quiere que HTC siga con el expediente cuando quede bajo contrato, puede agregar el apoyo De Contrato a Cierre y mantener al mismo equipo hasta el Post-Cierre.',
      ],
      links: [
        {
          text: 'Vea lo que delegar más del expediente podría significar para su negocio → Haga los números',
          action: 'roi',
        },
      ],
    },
    {
      id: 'faq-signature-plan',
      question: '¿Qué incluye The Hometown Signature?',
      answerParagraphs: [
        'The Hometown Signature es nuestro servicio completo De Contrato a Cierre a $495 por lado cerrado. Usted se encarga de la relación, las decisiones y el próximo trato. Nosotros nos encargamos de las fechas límite, el seguimiento, la comunicación, los documentos, la preparación del cierre y el final.',
      ],
      links: [
        {
          text: 'VER THE HOMETOWN SIGNATURE ↑',
          action: 'contractToCloseSection',
        },
      ],
    },
    {
      id: 'faq-teams-brokerages',
      question: '¿Trabajan con equipos y brokerages?',
      answerParagraphs: [
        'Sí. Ofrecemos flujos de transacción, procesos administrativos y apoyo de expedientes en Florida para equipos y brokerages. El apoyo a la medida incluye apoyo de transacciones + cumplimiento, configuración de sistemas + operaciones y capacitación de personal administrativo / asistentes / VA.',
      ],
      links: [
        {
          text: 'AGENDAR LLAMADA DE 15 MINUTOS →',
          action: 'bookCall',
        },
        {
          text: 'CONOZCA EL FLORIDA TC WORKSHOP →',
          action: 'tcWorkshop',
        },
      ],
    },
  ],
};
