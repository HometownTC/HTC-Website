import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  redirects: {
    '/services': '/pricing/',
    '/services/': '/pricing/',
    '/pricing-plans': '/pricing/',
    '/pricing-plans/': '/pricing/',
    '/services-and-pricing': '/pricing/',
    '/services-and-pricing/': '/pricing/',
    '/contact': '/book/',
    '/contact/': '/book/',
    '/contact-us': '/book/',
    '/contact-us/': '/book/',
    '/book-discovery-call': '/book/',
    '/book-discovery-call/': '/book/',
    '/book-call': '/book/',
    '/book-call/': '/book/',
    '/deal-intake': '/submit-deal/',
    '/deal-intake/': '/submit-deal/',
    '/submit': '/submit-deal/',
    '/submit/': '/submit-deal/',
    '/register': '/submit-deal/',
    '/register/': '/submit-deal/',
    '/es/servicios': '/es/precios/',
    '/es/servicios/': '/es/precios/',
    '/es/contacto': '/es/enviar-transaccion/',
    '/es/contacto/': '/es/enviar-transaccion/',
    '/blog': '/resources/',
    '/blog/': '/resources/',
    '/guides': '/resources/free-guides-downloads/',
    '/guides/': '/resources/free-guides-downloads/',
    '/free-guides-downloads': '/resources/free-guides-downloads/',
    '/free-guides-downloads/': '/resources/free-guides-downloads/',
    '/resources/guides': '/resources/free-guides-downloads/',
    '/resources/guides/': '/resources/free-guides-downloads/'
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
