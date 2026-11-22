// One source for the Agent Setup & Systems Integration rule (2027 pricing, Nov 2026).
// Every page that explains when the $399 setup is owed uses these exact sentences,
// so the wording stays the same everywhere. Change it here, not page by page.
export const AGENT_SETUP_COPY = {
  en: {
    name: 'Agent Setup & Systems Integration',
    requirement:
      'Required when HTC manages your transactions (Contract-to-Close). Listing extras such as Listing Launch, NEST, L.A.M.P. and rental compliance need no registration or setup fee. Due at registration, before your Setup Call.',
    separateFees: 'SCALE ($397/mo) and L.A.M.P. ($99 per listing for 4 weekly reports) are separate recurring fees.',
  },
  es: {
    name: 'Configuración del Agente e Integración de Sistemas',
    requirement:
      'Obligatoria cuando HTC administra sus transacciones (De Contrato a Cierre). Los extras como Lanzamiento de Listado, NEST, L.A.M.P. y cumplimiento de alquileres no requieren registro ni cuota de configuración. Se paga al registrarse, antes de su llamada de configuración.',
    separateFees: 'SCALE ($397/mes) y L.A.M.P. ($99 por listado por 4 reportes semanales) son cuotas recurrentes aparte.',
  },
} as const;
