# Convenciones del Proyecto — Erika Caro Psicóloga

> Este archivo describe las convenciones específicas que el equipo (humano + IA) debe seguir en este proyecto. Es leído por todos los skills y agentes de Specture antes de generar código, specs o reviews. Cuando una convención aquí entra en conflicto con una regla genérica del framework, **gana esta convención** — con una excepción: las reglas `framework-core` de `.specture/rules.yml` (§12) son obligatorias en todo proyecto Specture y sólo se pueden **endurecer**, nunca quitar ni ablandar.
>
> **Origen:** inferidas del código existente durante `/specture:setup` (modo Adopt) el 2026-09-11 y validadas con el usuario. Ver `decisions/001-adopted-stack.md`.

## 1. Naming

- **Variables y funciones:** camelCase — `activeSection`, `navigateToArticle`, `handleContactSubmit`.
- **Componentes React:** PascalCase — `HeroSection`, `FixedAppointmentButton`.
- **Constantes exportadas:** UPPER_SNAKE_CASE en `src/constants/` — `LANDING_SECTIONS`, `CONTACT_CHANNELS`.
- **Archivos de componente de dominio:** `PascalCase.jsx` — `Header.jsx`, `ContactSection.jsx`.
- **Archivos de primitiva `ui/`:** kebab-case / lowercase — `button.jsx`, `use-toast.js`. Es la convención de shadcn/ui y **se respeta tal cual** dentro de `src/components/ui/`; no migrar a PascalCase.
- **Hooks:** `use<Nombre>.js`, camelCase con prefijo `use` — `useToast`, `useScrollSpy`.
- **Tests:** `<Nombre>.test.jsx` dentro de `tests/`.
- **Carpetas:** lowercase (`components`, `sections`, `ui`, `pages`, `lib`, `assets`, `constants`, `hooks`).

## 2. Organización de Archivos

- **Estructura por:** layer (capas) — `pages` → `components/sections` → `components/ui` (primitivas) → `lib` (utilidades puras).
- **Co-localización:** los tests **no** se co-localizan; viven en `tests/` espejando la estructura de `src/`.
- **Tamaño máximo de archivo (líneas):** 250. El archivo más grande hoy es `src/pages/BlogListPage.jsx` con 224 líneas.
- **Alias de import:** usar siempre `@/` para `src/` y `@assets` para `src/assets` (definidos en `vite.config.js`). Nunca rutas relativas ascendentes (`../../`).

### Mapa de ubicaciones

> **Dónde vive cada cosa.** Lo exige `R-FILE-003` del núcleo: interfaces, types, constantes y hooks viven fuera del archivo del componente o de la clase, y este mapa es el que dice dónde. Un slot con `sin definir` **no es un hueco que el agente pueda rellenar por su cuenta**: es la señal de que hay que preguntarle al equipo.

| Qué | Dónde | Ejemplo |
|---|---|---|
| Componentes de dominio | `src/components/<Nombre>.jsx` · `src/components/sections/<Nombre>.jsx` | `src/components/sections/HeroSection.jsx` |
| Primitivas de UI (shadcn) | `src/components/ui/<nombre>.jsx` | `src/components/ui/button.jsx` |
| Páginas | `src/pages/<Nombre>Page.jsx` | `src/pages/ArticlePage.jsx` |
| Types e interfaces | `no aplica` | El proyecto es JavaScript sin TypeScript |
| Constantes | `src/constants/<dominio>.js` | `src/constants/navigation.js` |
| Hooks / composables | `src/hooks/use<Nombre>.js` | `src/hooks/useScrollSpy.js` |
| Utilidades puras (web) | `src/lib/<nombre>.js` | `src/lib/utils.js` (`cn`) |
| Tests (web) | `tests/**/<Nombre>.test.jsx` | `tests/components/sections/HeroSection.test.jsx` |

Backend (`erika_caro_psicologa_api/`, desde ADR-002 — organizado **por feature**):

| Qué | Dónde | Ejemplo |
|---|---|---|
| Feature completa (nombre en inglés, igual que el slug del componente en `architecture.md` §2) | `src/features/<feature>/` | `src/features/certificates/` |
| Rutas HTTP | `src/features/<feature>/<feature>.routes.js` | `src/features/certificates/certificates.routes.js` |
| Servicios / casos de uso | `src/features/<feature>/<feature>.service.js` | `src/features/certificates/certificates.service.js` |
| Acceso a datos | `src/features/<feature>/<feature>.repository.js` | `src/features/certificates/certificates.repository.js` |
| Esquema de base de datos | `prisma/schema.prisma` | — |
| Constantes | `src/constants/<dominio>.js` | `src/constants/certificates.js` |
| Utilidades compartidas | `src/lib/<nombre>.js` | `src/lib/code.js` |
| Tests (api) | `tests/**/<nombre>.test.js` | `tests/features/certificates/certificates.service.test.js` |

> **Excepción histórica:** `src/components/ui/use-toast.js` es un hook que hoy vive en `ui/` porque viene así de shadcn. Se deja donde está; los hooks **nuevos** van a `src/hooks/`.

- **Jerarquía esperada:**

  ```
  src/
    App.jsx                    # composición raíz + navegación por estado
    main.jsx                   # bootstrap de React
    index.css                  # tokens HSL + capas base de Tailwind
    assets/
      index.js                 # barrel de imágenes
      images/
    components/
      Header.jsx
      Footer.jsx
      FixedAppointmentButton.jsx
      sections/                # secciones de la landing, una por ancla de navegación
      ui/                      # primitivas shadcn (no tocar el naming)
    constants/                 # constantes de dominio extraídas de los componentes
    hooks/                     # hooks propios del proyecto
    lib/
      utils.js                 # cn()
    pages/                     # vistas completas fuera de la landing
  tests/                       # espejo de src/
  public/
    certificaciones/           # PDFs públicos enlazados desde la UI
  ```

## 2.1 Estructura de Carpetas Raíz (apps)

> Aplica desde ADR-002. `stack.yml.structure.root_layout: by-app-suffix`, con `project.slug: erika_caro_psicologa`.

| Rol del componente | Carpeta raíz | Estado |
|--------------------|--------------|--------|
| Sitio público (React + Vite) | `erika_caro_psicologa_web/` | El código vive hoy en la raíz; **se mueve en el epic de Foundation** |
| API (Node + Express) | `erika_caro_psicologa_api/` | Por crear |

> Hasta que el epic de Foundation ejecute el movimiento, las rutas de `src/` en este documento se leen relativas a la raíz del repositorio. Después se leen relativas a `erika_caro_psicologa_web/`.

## 3. Patrones Permitidos (Allow-list)

> Observados en el código actual y adoptados como el estilo del proyecto.

- Componentes de función con arrow function y `export default` para componentes de dominio.
- `React.forwardRef` + `class-variance-authority` (`cva`) para primitivas de `ui/`, con `export { Componente, componenteVariants }`.
- `cn()` de `@/lib/utils` para componer clases de Tailwind — nunca concatenación manual de strings de clases.
- `framer-motion` para animaciones de entrada; patrón `initial="hidden"` / `whileInView="visible"` / `viewport={{ once: true }}` con `variants`.
- Tokens semánticos de Tailwind (`bg-primary`, `text-foreground`, `bg-primary-teal-lighter`) definidos como variables HSL en `src/index.css`.
- Iconografía exclusivamente con `lucide-react`.
- Navegación por anclas con `scrollIntoView({ behavior: 'smooth' })` y un `id` en cada `<section>`.

## 4. Patrones Prohibidos (Deny-list)

> **Propuestos en el setup a partir de la deuda observada — pendientes de validación del equipo.**

- Colores hardcodeados en clases de Tailwind (`bg-[#00a19b]`, `text-red-500`) cuando existe un token semántico equivalente.
- Código muerto comentado dejado en el archivo (ver `BlogSection` en `App.jsx` y el formulario de `ContactSection.jsx`): o se borra, o se mueve detrás de un flag explícito.
- Contenido editorial (artículos, testimonios, servicios) hardcodeado dentro del JSX — va a `src/constants/`.
- Rutas relativas ascendentes (`../../components/...`) habiendo alias `@/`.

## 5. Estilo de Código

- **Indentación:** 2 espacios. *(El código existente está mezclado: los archivos generados por shadcn — `ui/button.jsx`, `lib/utils.js` — y los de configuración usan tabs. No se refactorizan en masa: se normalizan a 2 espacios cuando un epic los toque.)*
- **Comillas:** simples.
- **Punto y coma:** obligatorios.
- **Longitud máxima de línea:** sin límite duro; las clases largas de Tailwind quedan en una sola línea.
- **Comentarios:** solo para el "por qué", no para el "qué hace".

## 6. Manejo de Errores

- **Estrategia primaria:** no aplica en el sentido de backend. En UI, todo error visible al usuario se comunica con el `toast` de `@/components/ui/use-toast`.
- **Logging obligatorio en:** no aplica — sin backend ni telemetría instalada.
- **Política con `null`/`undefined`:** los props opcionales llevan valor por defecto en la desestructuración (`asChild = false`, `articleId = null`).

## 7. Testing

- **Política TDD:** Estricta — test antes de código. El `hooks.enabled: true` de `settings.yml` activa el TDD Honesty Gate.
- **Framework:** Vitest + `@testing-library/react` + jsdom. **Aún no instalado** — instalarlo es parte del primer epic que escriba tests.
- **Niveles requeridos:** unit / componente. E2E no se exige hoy.
- **Ubicación:** `tests/` espejando `src/`.
- **Mocks:** permitidos solo para integraciones externas (Calendly, enlaces a redes sociales).
- **Deuda reconocida:** el código existente tiene **cero tests**. No se exige cobertura retroactiva; sí se exige test-first para todo código nuevo o modificado.

## 8. Idioma del Código

- **Identificadores (variables, clases, funciones):** inglés.
- **Comentarios:** español.
- **Copy de la interfaz:** español (es el idioma del sitio).
- **Mensajes de commit:** inglés, Conventional Commits (`feat:`, `fix:`, `chore:`) — observado en `58239f2`.
- **Documentación pública (READMEs, ADRs, specs):** español.

## 9. Reglas Específicas del Equipo / Cliente

- El sitio es la presencia profesional de una psicóloga en ejercicio: el copy clínico, los testimonios y las certificaciones de `public/certificaciones/` **no se inventan ni se parafrasean** sin aprobación explícita. Ningún agente genera, adapta ni "mejora" texto que afirme credenciales, resultados terapéuticos o experiencias de pacientes.
- El agendamiento se hace vía Calendly (enlace externo). No se construye un sistema de reservas propio sin una decisión registrada en un ADR.

## 10. Specture / Claude Code Integration

> La configuración del framework vive en `.specture/settings.yml` — perfil `full`, con `hooks.enabled`, `context7.enabled`, `docs_index.enabled` y `knowledge.enabled` activos. Es un archivo del framework: lo escribe `/specture:setup` y lo migra `/specture:doctor`. Esta sección es solo un **puntero** — no declares toggles aquí.

## 11. Índice de Documentación

- **Estado:** No aplica — el repositorio solo tiene `README.md` (1 archivo `.md`), muy por debajo del umbral de 10 que justificaría un docs-bridge. Si en el futuro se acumula documentación, invocar `/specture:setup-docs-bridge`.

## 12. Invariantes del Proyecto (R-*)

> Las invariantes viven en `.specture/rules.yml`. Este proyecto usa **solo el núcleo obligatorio**: `R-FILE-001`, `R-FILE-002`, `R-FILE-003` y `R-SOLID-001`. No se declararon invariantes propias en el setup — `/specture:knowledge capture` las añadirá si aparecen. Esta sección es un puntero: no declares reglas aquí.
>
> **Nota de adopción:** el código existente incumple `R-FILE-003` en varios sitios (constantes inline en `App.jsx`, datos de contenido dentro del JSX de las secciones). Es esperable en un proyecto adoptado y **no es motivo para ablandar la regla**: aplica al código que toque cada diff de aquí en adelante, y el reviewer la cita por ID sobre lo que el diff cambie. No se pide un refactor global.

## 13. Workflow / Proceso (W-*)

> **Crítico en este proyecto:** un push a la rama principal dispara un despliegue automático a producción vía Dokploy. Nada se integra a la rama principal sin pasar por una rama de trabajo y su PR.

### Branching — de dónde nace cada rama

| ID  | Tipo de trabajo | Rama base | Nombre |
|-----|-----------------|-----------|--------|
| W-1 | feature / epic  | `main` | `feature/<slug>` |
| W-2 | hotfix / bug    | `main` | `hotfix/<slug>` |

> No existe rama `develop`. Las ramas `NewPageReact` y `PageOldVue` son históricas y no son base de nada.

### Commits

- W-3: Conventional Commits en inglés; el cuerpo cita la ruta del spec que implementa, con una línea `Spec:` seguida de la ruta real del archivo bajo `docs/05-specs/`.

### Pull Requests

- W-4: base de PR = `main` (features y hotfix). Specture no crea ni mergea el PR — lo **sugiere** al cerrar la sesión de build. El merge a `main` es un despliegue a producción: lo aprueba un humano.
