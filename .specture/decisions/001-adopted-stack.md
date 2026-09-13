# ADR-001: Adopción del stack existente (React + Vite + Tailwind + shadcn/ui)

## Status

`Accepted`

> **Extendido por ADR-002** (backend propio, monorepo por app, React Router). Todo lo decidido aquí sigue vigente y sigue siendo vinculante; ADR-002 añade lo que este ADR declaró inexistente y revisa dos alternativas que aquí se habían diferido (el router y la estructura de carpetas).

## Context

El proyecto `erikaCaroPsicologa` ya existía y estaba en producción en https://erikacaropsicologa.com antes de incorporar Specture. No es un greenfield: el stack **no se eligió** en este ADR, se **detectó** a partir del código y se registró para que todas las fases posteriores del framework partan de una fuente de verdad real.

El sitio es la presencia profesional de una psicóloga en ejercicio. Es un frontend estático sin backend propio: toda la información es contenido editorial y el agendamiento se delega a Calendly.

Fuerzas en juego al adoptar:

- El código en producción funciona; no hay apetito ni justificación para reescribirlo.
- No existe ninguna red de seguridad automatizada (cero tests), lo que hace riesgoso cualquier cambio no trivial.
- El despliegue es automático por push a la rama principal, así que el margen de error entre "merge" y "producción" es cero.

## Decision

Se adopta el stack tal como está, sin migraciones en el momento del setup:

| Capa | Tecnología |
|---|---|
| Frontend | React 18.2 (JavaScript / JSX) |
| Build | Vite 4.4 |
| Estilos | Tailwind CSS 3.3 + `tailwindcss-animate`, tokens HSL en `src/index.css` |
| Librería UI | shadcn/ui sobre Radix UI (`cva` + `clsx` + `tailwind-merge`) |
| Animación | framer-motion 10 |
| Iconos | lucide-react |
| Estado | `useState` local en `App.jsx` — sin librería de estado y sin router |
| Backend / DB / API | ninguno |
| Runtime de build | Node 20.19.1 (`.nvmrc`) |
| Hosting | VPS de Hostinger gestionado con Dokploy, despliegue automático por push a `main` |

Decisiones tomadas **en** el setup (no heredadas del código):

1. **Testing: Vitest + @testing-library/react.** El proyecto no tiene tests ni framework instalado. Se adopta Vitest por ser el runner nativo del ecosistema Vite. Se instala en el primer epic que requiera tests; no se escribe cobertura retroactiva.
2. **Indentación canónica: 2 espacios.** El código está mezclado (tabs en los archivos generados por shadcn, 2 espacios en los propios). No se normaliza en masa; se corrige por archivo tocado.
3. **Ubicaciones: `src/constants/` y `src/hooks/`.** Hoy las constantes viven inline en los componentes y el único hook está en `src/components/ui/use-toast.js`. `R-FILE-003` exige sacarlos; este ADR fija el destino.
4. **Tests en carpeta separada `tests/`**, espejando `src/`.
5. **Perfil de Specture: `full`** — hooks TDD, Context7, docs-index y knowledge capture activos.

## Alternatives Considered

- **Migrar a TypeScript durante el setup.** Descartada por ahora: el proyecto ya tiene `@types/react` y `@types/node` en devDependencies pero ningún `tsconfig.json`, y una migración es un epic en sí mismo, no un paso de configuración. Queda como candidata para el ROADMAP.
- **Introducir react-router.** Descartada en el setup: hoy la navegación es un `switch` sobre `useState` en `App.jsx`, que funciona para tres vistas. Si el blog crece o se necesitan URLs compartibles e indexables por buscadores, se decide en un ADR propio.
- **Normalizar toda la indentación en un commit.** Descartada: produciría un diff que toca todo el repositorio sin ninguna red de tests que respalde el cambio.
- **Testing con Jest.** Descartada: requiere configuración adicional para convivir con Vite y ESM; Vitest es el camino de menor fricción para este stack.

## Consequences

### Positivas

- Todas las fases de Specture parten de un `stack.yml` que refleja el código real, no una aspiración.
- Las convenciones de `conventions.md` se infirieron del código existente, así que el código nuevo será indistinguible del actual en estilo.
- El ADR deja explícito qué es deuda conocida y qué es decisión, evitando que un agente futuro "arregle" algo que se decidió dejar como está.

### Negativas / Trade-offs aceptados

- **Cero tests hoy.** Cualquier cambio en el código existente se hace sin red de seguridad hasta que se escriban tests de caracterización. Es el riesgo más alto del proyecto.
- **ESLint declarado pero inerte.** `eslint` y `eslint-config-react-app` están en `devDependencies` y no existe ningún archivo de configuración, así que el linter nunca corre. `stack.yml.quality.linter` dice `eslint` con esa salvedad anotada; hasta que se cree la config, el gate de lint no existe en la práctica.
- **El código existente incumple `R-FILE-003`** (constantes y contenido editorial inline en los componentes). Se acepta como estado de partida; la regla aplica a lo que cada diff toque.
- **Sin Dockerfile en el repositorio** pese a desplegar con Dokploy: el build lo autodetecta la plataforma. La configuración de despliegue vive fuera del repositorio y no es versionada.
- **Código muerto en el árbol:** `BlogSection` está comentado en `App.jsx` mientras `BlogSection.jsx`, `BlogListPage.jsx` y `ArticlePage.jsx` siguen presentes; el formulario de `ContactSection.jsx` está comentado y su `toast` responde "Mensaje No Enviado". Hay funcionalidad a medio camino que debe resolverse en el ROADMAP.

### Implicaciones operativas

- Skills/agentes afectados: la Fase 3 (`ux-design`) debe **hacer ingeniería inversa** del design system existente (`frontend.ui_defined: true`), no autorizar uno nuevo — los tokens de marca ya están en `src/index.css`.
- El `code-reviewer` no puede apoyarse en linter ni type-checker: hoy no hay ninguno operativo.
- ¿Requiere actualizar `stack.yml`? No — este ADR lo origina.
- ¿Requiere actualizar `conventions.md`? No — este ADR lo origina.

## Date

`2026-09-11`
