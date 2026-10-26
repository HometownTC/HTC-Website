import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  redirects: {
    '/services': '/pricing/',
    '/pricing-plans': '/pricing/',
    '/services-and-pricing': '/pricing/',
    '/contact': '/book/',
    '/contact-us': '/book/',
    '/book-discovery-call': '/book/',
    '/book-call': '/book/',
    '/deal-intake': '/submit-deal/',
    '/submit': '/submit-deal/',
    '/register': '/submit-deal/',
    '/es/servicios': '/es/precios/',
    '/es/contacto': '/es/enviar-transaccion/',
    '/blog': '/resources/',
    '/guides': '/resources/free-guides-downloads/',
    '/free-guides-downloads': '/resources/free-guides-downloads/',
    '/resources/guides': '/resources/free-guides-downloads/',
    '/resources/contracts-forms': '/resources/florida-contracts-defensible-files/',
    '/resources/contracts-and-forms': '/resources/florida-contracts-defensible-files/',
    '/resources/transaction-operations': '/resources/transaction-coordination/',
    '/resources/broker-compliance': '/resources/florida-contracts-defensible-files/',
    '/resources/condo-hoa': '/resources/miami-dade-broward-closings/',
    '/resources/condo-and-hoa': '/resources/miami-dade-broward-closings/',
    '/resources/agent-growth': '/resources/agent-growth-operations/',
    '/resources/agent-growth-leverage': '/resources/agent-growth-operations/',
    '/resources/florida-updates': '/resources/htc-updates-community/',
    '/resources/florida-real-estate-updates': '/resources/htc-updates-community/'
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: true
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
