// One source for the Agent Setup & Systems Integration rule (2027 pricing, Nov 2026).
// Every page that explains when the $399 setup is owed uses these exact sentences,
// so the wording stays the same everywhere. Change it here, not page by page.
export const AGENT_SETUP_COPY = {
  en: {
    name: 'Agent Setup & Systems Integration',
    requirement:
      'Required for every new HTC client, whichever service you start with. Due at registration, before your Setup Call.',
    separateFees: 'SCALE ($397/mo) and LAMP ($99/mo) are separate monthly fees.',
  },
  es: {
    name: 'Configuración del Agente e Integración de Sistemas',
    requirement:
      'Obligatoria para todo cliente nuevo de HTC, sin importar con qué servicio comience. Se paga al registrarse, antes de su llamada de configuración.',
    separateFees: 'SCALE ($397/mes) y LAMP ($99/mes) son cuotas mensuales aparte.',
  },
} as const;
