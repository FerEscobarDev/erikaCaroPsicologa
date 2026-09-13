# Erika Caro Psicóloga

Sitio web profesional de la psicóloga Erika Andrea Caro — React + Vite + Tailwind + shadcn/ui.
Desplegado en https://erikacaropsicologa.com (VPS Hostinger con Dokploy, auto-deploy por push a `main`).

Este proyecto usa **Specture** como metodología de desarrollo asistido por IA.

La configuración específica del proyecto vive en `.specture/`:

- `stack.yml` — stack técnico (fuente única de verdad)
- `conventions.md` — naming, patrones, estilo de código, workflow
- `rules.yml` — invariantes del proyecto (R-*)
- `settings.yml` — perfil y toggles del framework
- `decisions/` — Architecture Decision Records

Para trabajar con Specture en este proyecto, invoca `/specture:start`
o pide "continuar con el roadmap" / "iniciar el proyecto".
El routing de Specture es opt-in — no se activa automáticamente.

## Contexto sensible

Este sitio representa a una profesional de la salud mental en ejercicio. El copy clínico,
los testimonios de pacientes y las certificaciones de `public/certificaciones/` **no se
generan, inventan ni parafrasean** sin aprobación explícita de la titular.

## Estado conocido del código

- **Sin tests.** Vitest está adoptado en `stack.yml` pero aún no instalado.
- **ESLint declarado en `devDependencies` pero sin archivo de configuración** → no corre.
- Código muerto: `BlogSection` comentado en `App.jsx`; formulario de contacto comentado
  en `ContactSection.jsx` con un toast que responde "Mensaje No Enviado".
