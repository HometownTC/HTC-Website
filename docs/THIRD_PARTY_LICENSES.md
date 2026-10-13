# Hometown TC — Third-Party Dependency & License Inventory

This document provides a complete inventory of all open-source libraries, runtime frameworks, type definitions, and external services utilized in the Hometown TC website codebase, in compliance with SOW Section 4 and Section 1.3 final milestone acceptance requirements.

---

## 1. Production Runtime Dependencies

| Package Name | Installed Version | Primary Function | License | Upstream Repository / Author |
| :--- | :--- | :--- | :--- | :--- |
| **astro** | `^7.2.0` | Static site generator & web framework | **MIT** | [withastro/astro](https://github.com/withastro/astro) |
| **react** | `^19.0.1` | Component UI runtime library | **MIT** | [facebook/react](https://github.com/facebook/react) |
| **react-dom** | `^19.0.1` | React DOM renderer | **MIT** | [facebook/react](https://github.com/facebook/react) |
| **@astrojs/react** | `^6.0.2` | Astro React integration adapter | **MIT** | [withastro/astro](https://github.com/withastro/astro) |
| **@astrojs/tailwind** | `^6.0.2` | Astro Tailwind CSS adapter | **MIT** | [withastro/astro](https://github.com/withastro/astro) |
| **tailwindcss** | `^4.1.14` | Utility-first CSS styling framework | **MIT** | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) |
| **@tailwindcss/vite** | `^4.1.14` | Tailwind CSS Vite bundler plugin | **MIT** | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) |
| **lucide-react** | `^0.546.0` | Accessible SVG icon component set | **ISC** | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) |
| **motion** | `^12.23.24` | Animation and motion primitives | **MIT** | [motiondivision/motion](https://github.com/motiondivision/motion) |
| **@google/genai** | `^2.4.0` | Official Google GenAI TypeScript SDK | **Apache-2.0** | [google/genai-js](https://github.com/google/genai-js) |
| **@vitejs/plugin-react** | `^5.0.4` | Vite React fast-refresh plugin | **MIT** | [vitejs/vite-plugin-react](https://github.com/vitejs/vite-plugin-react) |
| **dotenv** | `^17.2.3` | Environment variable loader | **BSD-2-Clause** | [motdotla/dotenv](https://github.com/motdotla/dotenv) |
| **vite** | `^6.2.3` | Fast build tool and module bundler | **MIT** | [vitejs/vite](https://github.com/vitejs/vite) |
| **express** | `^4.21.2` | Optional HTTP server utility | **MIT** | [expressjs/express](https://github.com/expressjs/express) |

---

## 2. Developer & Build Tool Dependencies

| Package Name | Version | Function | License |
| :--- | :--- | :--- | :--- |
| **typescript** | `~5.8.2` | Static type checking and compiler | **Apache-2.0** |
| **tsx** | `^4.21.0` | TypeScript Node runtime executor | **MIT** |
| **esbuild** | `^0.25.0` | Ultra-fast JavaScript/CSS bundler | **MIT** |
| **autoprefixer** | `^10.4.21` | CSS vendor prefix postprocessor | **MIT** |
| **@types/node** | `^22.14.0` | Node.js TypeScript declarations | **MIT** |
| **@types/express** | `^4.17.21` | Express TypeScript declarations | **MIT** |

---

## 3. Font Assets & Typography Licensing

| Font Family | Usage | Distributor | License | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Fraunces** | Headings, display, section titles | Google Fonts / Undercase Type | **SIL Open Font License (OFL-1.1)** | Free for commercial web use |
| **Inter** | Body copy, UI, buttons, forms | Google Fonts / Rasmus Andersson | **SIL Open Font License (OFL-1.1)** | Free for commercial web use |
| **Montserrat** | Fallback display font | Google Fonts / Julieta Ulanovsky | **SIL Open Font License (OFL-1.1)** | Free for commercial web use |

---

## 4. Embedded External Third-Party Services

| Service Name | Provider | Integration Method | Commercial Rights / Privacy |
| :--- | :--- | :--- | :--- |
| **Fillout Deal Intake** | Fillout, Inc. | Secure iframe embed (`server.fillout.com`) | Licensed directly by Hometown TC account |
| **Google Calendar Scheduler**| Google LLC | Google Workspace appointment scheduling embed | Covered under Hometown TC Google Workspace |
| **Cloudflare Pages & DNS** | Cloudflare, Inc. | Edge hosting, DNS nameservers, SSL | Enterprise/Standard Free tier on HTC Cloudflare |

---

## 5. License Compliance Summary

* All production open-source software libraries carry permissive licenses (**MIT**, **ISC**, **BSD-2-Clause**, or **OFL-1.1**).
* Zero GPL/AGPL copyleft libraries are utilized.
* Hometown TC retains 100% intellectual property ownership of all custom design components, business calculator algorithms, copy, graphics, and layouts.
