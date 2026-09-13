# Design System — Erika Caro Psicóloga

> Producido por la Fase 3 (`ux-design`) el 2026-09-12, en **modo Adopt** (`frontend.ui_defined: true`): este sistema se **documenta**, no se diseña. Hay un producto en producción desde 2025 y los valores de aquí se extrajeron de `src/index.css`, `tailwind.config.js` y los componentes de `src/components/`.
>
> El mapa de navegación vive en `navigation_map.md`; el detalle de cada componente, en `docs/03-ux-ui/components/<Nombre>.md`, autorado perezosamente justo antes del epic que lo consume.

## 1. Dirección

- **Dirección elegida:** `extraído del código` — no hubo decisión de dirección en esta fase. El gate de tres direcciones **no aplica en Adopt**: existe un producto embarcado y generar alternativas para elegir una sería rehacer, no documentar. **G1: N/A.**
- **Qué sacrifica deliberadamente:** `no declarado`. Nadie registró un sacrificio, y reconstruir uno a posteriori sería inventarlo. Lo único observable es que el sitio **renuncia a la densidad**: todo respira (`py-16 sm:py-24` por sección, tarjetas de 24–32 px de padding) a costa de exigir mucho scroll — pero no consta que fuera una decisión y no un default.
- **Direcciones descartadas:** ninguna. No hubo decisión de dirección, así que **no se emite ADR** — un ADR sin alternativas reales sería un registro de nada.
- **Procedencia de la marca:** `usuario` — los cinco campos `MK-001`…`MK-005` los respondió el usuario en la Fase 1. Ningún campo fue propuesto por el agente. *(`MK-006`, referencias visuales, quedó `sin definir`.)*
- **Voz y tono** *(MK-005)*: primera persona y tuteo — "te acompaño en…". Prohibido: tecnicismos clínicos sin explicar, diagnosticar a la ligera, y prometer resultados.
- **Audiencia:** visitante que busca ayuda psicológica, muchas veces en mal momento emocional · mujer que busca comunidad en el grupo de apoyo · **verificador externo** —aerolínea, empleador, entidad de salud o jurídica— que no conoce a Erika y llega solo a comprobar un certificado · Erika como administradora.
- **Anti-referencias** *(MK-004)*: EPS o clínica institucional (fría, despersonaliza) · marketplace de terapia tipo BetterHelp (nadie tiene cara) · coach de Instagram (estética de infoproducto, confunde psicología con autoayuda) · web corporativa genérica (plantilla azul con fotos de stock).

### 1.1 Elemento firma

- **Firma:** **acción en píldora sobre superficie de esquina suave** — token `radius.action`.
- **Token:** `radius.action: 9999px`, frente a `radius.lg: 0.5rem` de las superficies. **No es "esquinas redondeadas"** —eso sería un default—: es el *contraste* entre dos radios, y es un **override deliberado** de shadcn, cuyo botón de fábrica es `rounded-md`. Alguien lo cambió en cada CTA, uno por uno.
- **Superficies donde aparece:** botón del hero · botones de las cinco tarjetas de servicio · botón del grupo de apoyo · botón flotante de agendar · botón de Calendly en contacto. **Cinco superficies**, muy por encima del mínimo de tres.
- **Coherencia con el sacrificio:** el sacrificio es `no declarado`, así que no hay nada que contradecir. La firma sí es coherente con `MK-003` "cálido, no meloso": la píldora ablanda sin recurrir a decoración.
- **Procedencia:** `extraído del código`. Es observable y consistente en cinco superficies; **no consta que fuera deliberado**, solo que se aplicó siempre.

## 2. Tokens

> Los valores son los que el navegador **renderiza hoy**, convertidos desde el HSL de `src/index.css`. Cuando el código dice una cosa y la marca declarada dice otra, manda el código y la diferencia se registra en `brief.md` §Discrepancias.

### 2.1 Primitivos — la rampa

| Token | Valor | Notas |
|---|---|---|
| `brand.teal.900` | `#024E55` | `--primary-teal-dark`. Titulares y texto principal |
| `brand.teal.600` | `#009E99` | `--primary-teal-mid`. Acción secundaria y anillo de foco |
| `brand.teal.400` | `#17D3C4` | `--primary-teal-light`. Acentos claros |
| `brand.teal.100` | `#D7E0E4` | `--primary-teal-lighter`. Fondo de sección |
| `brand.purple.900` | `#642385` | `--accent-purple-dark`. **Fuera de marca — ver B-1** |
| `brand.purple.600` | `#793F83` | `--accent-purple-mid`. **Color de la acción principal** |
| `brand.purple.400` | `#A75AC4` | `--accent-purple-light` |
| `brand.purple.200` | `#D29EE5` | `--accent-purple-lighter`. Fondos de ícono y avatar |
| `neutral.0` | `#FFFFFF` | Superficie de tarjeta y popover |
| `neutral.50` | `#F9FAFB` | `--background`. **Teñido con el hue 200 de la marca** (`200 20% 98%`), no es un gris de fábrica |
| `neutral.150` | `#E3E6E8` | `--muted`. Hue 200, croma 10% |
| `neutral.250` | `#D5DADD` | `--border` y `--input`. Hue 200, croma 10% |
| `neutral.600` | `#2E666B` | `--muted-foreground`. Hue 185, croma 40% — es un neutro **entibiado hacia el teal**, no un gris |
| `status.red.500` | `#EF4444` | `--destructive`. Único color de estado que existe |

> **Los neutros están derivados del hue de marca**, no copiados de una escala de fábrica: `neutral.50`…`neutral.250` viven en el hue 200 y `neutral.600` en el 185. Es lo que separa un sistema con marca de uno genérico, y en este proyecto ya estaba hecho.

### 2.2 Semánticos — los que se usan

> **Modo oscuro: `no implementado`.** `src/index.css` declara un bloque `.dark` y `tailwind.config.js` tiene `darkMode: ['class']`, pero **nada en la aplicación añade esa clase**: no hay toggle, ni preferencia de sistema, ni persistencia. La columna oscura de esta tabla **repite la clara a propósito** para que el verificador no certifique como cubierta una paleta que nadie puede alcanzar. Los valores del bloque `.dark` quedan como material de partida cuando el modo oscuro se implemente, no como columna vigente.

| Token semántico | Claro → primitivo | Oscuro → primitivo | Uso |
|---|---|---|---|
| `color.bg.canvas` | `neutral.50` | `neutral.50` | fondo de página |
| `color.bg.surface` | `neutral.0` | `neutral.0` | tarjetas, popovers, formularios |
| `color.bg.section` | `brand.teal.100` | `brand.teal.100` | fondo alterno de sección de landing |
| `color.bg.muted` | `neutral.150` | `neutral.150` | zonas apagadas, barra de scroll |
| `color.bg.icon-well` | `brand.purple.200` | `brand.purple.200` | círculo detrás de un ícono o inicial de avatar |
| `color.text.primary` | `brand.teal.900` | `brand.teal.900` | texto principal y titulares |
| `color.text.muted` | `neutral.600` | `neutral.600` | texto auxiliar |
| `color.text.on-accent` | `neutral.50` | `neutral.50` | texto sobre color de acción |
| `color.text.on-surface-accent` | `brand.purple.900` | `brand.purple.900` | iniciales sobre `bg.icon-well` |
| `color.border.subtle` | `neutral.250` | `neutral.250` | separadores |
| `color.border.strong` | `neutral.250` | `neutral.250` | bordes de control — **hoy apunta al mismo primitivo que el borde sutil; ver §6.1 A-1** |
| `color.action.primary` | `brand.purple.600` | `brand.purple.600` | acción principal — todos los CTA |
| `color.action.primary.hover` | `brand.purple.900` | `brand.purple.900` | hover del CTA — **fuera de marca, B-1** |
| `color.action.secondary` | `brand.teal.600` | `brand.teal.600` | botones outline y el botón de Calendly |
| `color.focus.ring` | `brand.teal.600` | `brand.teal.600` | anillo de foco |
| `color.status.error` | `status.red.500` | `status.red.500` | destructivo |
| `color.status.success` | *no existe* | *no existe* | **hueco — ver §2.3** |
| `color.status.warning` | *no existe* | *no existe* | **hueco** |
| `color.status.info` | *no existe* | *no existe* | **hueco** |

### 2.3 Colores de estado

**El sistema tiene un solo color de estado.** Existe `--destructive` (`#EF4444`, el rojo de fábrica de Tailwind) y no existen `success`, `warning` ni `info`.

| Par | ΔL | ¿Cumple el piso? |
|---|---|---|
| `error` ↔ `success` | **no computable** | `success` no existe en el sistema |

Consecuencias medibles, no hipotéticas:

- **`#EF4444` es el rojo de fábrica de Tailwind**, no un rojo derivado de la rampa de marca. Se lee como Bootstrap, no como Erika — es exactamente lo que §2.3 del framework existe para evitar.
- **El código ya se saltó el token una vez:** `ContactSection.jsx` usa `className: "bg-red-500 text-white"` en el toast de error en lugar de `--destructive`. Es la deny-list de `conventions.md` §4 incumplida en producción.
- Las pantallas de la zona privada **van a necesitar `success`** (certificado emitido, artículo publicado) y **`warning`** (el caso incómodo: emitido pero no entregado). Hoy no hay token para eso y el epic que llegue primero se lo inventará si nadie lo declara antes.

> **Ninguna de las tres se inventa aquí.** Derivar `success` y `warning` es una decisión de marca y `D-3` sigue abierta. Queda como hueco declarado en §7.

### 2.4 Tipografía, espaciado y el resto

| Token | Valor | Notas |
|---|---|---|
| `text.display` / `h1` | Slabo 27px · `2.25rem`→`3.75rem` (`text-4xl`→`text-6xl`) · bold | **bucket: serif display**. Es la decisión tipográfica más deliberada del sitio |
| `text.h2` | Slabo 27px · `1.875rem`→`2.25rem` · bold | |
| `text.h3` | Slabo 27px · `1.25rem`→`1.5rem` · semibold | |
| `text.body` | Acumin Pro → **fallback `sans-serif`** · `1rem`–`1.125rem` | ⚠ **La familia no carga — ver B-4.** Hoy el texto se ve con la sans del sistema |
| `text.caption` | idem body · `0.875rem` | |
| `text.code` | `no declarado` | El proyecto no muestra código |
| `space.*` | Escala de Tailwind sin modificar (`0.25rem` base) | |
| `radius.action` | `9999px` | **Elemento firma** (§1.1) |
| `radius.lg` | `0.5rem` (`--radius`) | **perfil: uniforme.** Default de shadcn, sin modificar |
| `radius.md` / `radius.sm` | `calc(--radius - 2px)` / `- 4px` | |
| `radius.card` | `0.75rem` (`rounded-xl`) | Tarjetas de servicio, testimonios y contacto |
| `shadow.*` | Escala de Tailwind (`shadow-sm`→`shadow-2xl`) sin modificar | |
| `shadow.focus` | `ring-2 ring-ring ring-offset-2` | Anillo con offset, patrón de shadcn |
| `breakpoint.*` | `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1400` | El `2xl` sí está modificado: 1400 en vez de 1536 |
| `z.*` | `z-50` para el botón flotante y los toasts · `z-10` para contenido sobre fondo | Convención mínima, sin escala declarada |

### 2.5 Por qué este proyecto

> **Excepción Adopt aplicada.** En un proyecto embarcado, *"es el default de la librería"* suele ser la respuesta verdadera y escribirla es obligatorio. Reconstruir un racional de dominio que suena mejor para un valor que nadie eligió sería inventar con mejor gramática.

| Grupo | Decisión | Por qué este proyecto | Cita |
|---|---|---|---|
| Hue primario | Teal `#009E99` para estructura, púrpura `#793F83` para acción | El teal sostiene la mitad "profesional, no clínico" de los atributos —es frío sin ser hospitalario— y el púrpura reserva la saturación para el único trabajo que importa: que la persona escriba. La división de roles es consistente en las seis secciones | `MK-003`, `MK-002` |
| Pareja tipográfica | Slabo 27px (titulares) + Acumin Pro (texto) | Un serif de titular sobre sans de texto separa al sitio de las anti-referencias "marketplace" y "coach de Instagram", que viven en sans geométrica de una sola familia | `MK-004` |
| Radio base | `0.5rem` | **`no declarado` — heredado de shadcn/ui.** Es el default de la librería y nadie lo cambió. La decisión real del proyecto está en el radio de *acción* (§1.1), no en el base | — |
| Base de densidad | `h-10` / `h-9` / `h-11`, `px-4 py-2` | **`no declarado` — heredado de shadcn/ui.** Colisiona con la anti-referencia "web corporativa genérica"; el usuario decidió el 2026-09-12 declararlo heredado y no gastar presupuesto de override | `MK-004`, `brief.md` §Parte C |
| Duraciones de motion | 0.5–0.8 s de entrada, `staggerChildren` 0.15–0.2 s | Entradas lentas y escalonadas para una audiencia que muchas veces llega en mal momento: el contenido aparece a un ritmo que no atropella | `MK-002` |
| Modelo de elevación | Sombra de Tailwind, `shadow-lg` en reposo → `shadow-2xl` en hover | **`no declarado` — heredado de Tailwind.** No hay escalera de elevación propia | — |
| Neutros | Hue 200 y 185, croma 10–40 % | Derivados del `#dfe1df` de la marca en vez de un gris de fábrica. Es la parte del sistema que **sí** se personalizó y por la que el sitio no se lee como una plantilla | `MK-001` |

## 3. Inventario de Componentes

> Roster completo, incluidos los de milestones posteriores. `done` = existe hoy como archivo · `pending-extraccion` = existe como JSX en línea y hay que extraerlo · `deferred → Epic X.Y` = lo construye ese epic.

| Componente | Nivel | Deriva de | Estado |
|---|---|---|---|
| `Tokens` | foundation | `src/index.css` | `done` |
| `TypeScale` | foundation | `tailwind.config.js` | `done` |
| `IconSet` | foundation | `lucide-react` | `done` |
| `Button` | primitive | — | `done` |
| `Input` | primitive | — | `done` |
| `Card` | primitive | — | `done` |
| `Avatar` | primitive | — | `done` |
| `Toast` | primitive | — | `done` |
| `Toaster` | primitive | — | `done` |
| `Label` | primitive | — | `deferred → Epic 6.1` |
| `Textarea` | primitive | `Revocation.reason`, `NewArticle.content` | `deferred → Epic 6.3` |
| `Select` | primitive | — | `deferred → Epic 6.2` |
| `Dialog` | primitive | — | `done` — adelantado por el hotfix `nuevo-numero-contacto`; envoltorio shadcn sobre `@radix-ui/react-dialog`, que ya era dependencia |
| `Badge` | primitive | — | `deferred → Epic 6.3` |
| `FileInput` | primitive | `issueCertificate` (multipart) | `deferred → Epic 6.3` |
| `Spinner` | primitive | estado `cargando` del nav map | `deferred → Epic 6.1` |
| `RouterLink` | primitive | tabla de rutas del Epic 1.3 | `deferred → Epic 1.5` |
| `Header` | composite | — | `done` |
| `Footer` | composite | — | `done` |
| `SectionHeading` | composite | patrón h2+p repetido en seis secciones | `pending-extraccion` |
| `FormField` | composite | label + control + error | `deferred → Epic 6.1` |
| `DataTable` | composite | `CertificatePage` | `deferred → Epic 6.3` |
| `Pagination` | composite | `page`/`size`/`total` de `CertificatePage` y `ArticlePage` | `deferred → Epic 6.3` |
| `SearchField` | composite | query `search` de `listCertificates` y `listArticles` | `deferred → Epic 6.3` |
| `EmptyState` | composite | estado `vacío` del nav map | `deferred → Epic 6.3` |
| `AdminShell` | composite | `getSession`, `endSession` | `deferred → Epic 6.1` |
| `ProseBody` | composite | `Article.content` (HTML) | `deferred → Epic 7.1` |
| `LegalDocument` | composite | `/aviso-privacidad`, `/terminos-condiciones` | `deferred → Epic 1.7` |
| `HeroSection` | pattern | — | `done` |
| `ScrollReveal` | pattern | variantes `framer-motion` repetidas en seis secciones | `pending-extraccion` |
| `AnchorNav` | pattern | scroll-spy del header | `done` |
| `AdminAuthGate` | pattern | `getSession` | `deferred → Epic 6.1` |
| `ServiceCard` | domain | los cinco servicios de la landing | `pending-extraccion` |
| `TestimonialCard` | domain | testimonios | `pending-extraccion` |
| `CredentialTiles` | domain | las cuatro credenciales de `AboutSection` | `pending-extraccion` |
| `SupportGroupPanel` | domain | grupo "Amiga, no estás sola" | `pending-extraccion` |
| `ContactChannelList` | domain | correo · WhatsApp · modalidad · redes | `pending-extraccion` |
| `AppointmentFab` | domain | botón flotante de agendar | `done` |
| `PhoneChangeModal` | domain | `RN-012`, `RN-013`, `RN-014`, `RN-023`…`RN-026` | `done` — adelantado por el hotfix `nuevo-numero-contacto` |
| `OtpCodeInput` | domain | `AccessCodeVerification.code` (6 dígitos) | `deferred → Epic 6.1` |
| `ApiErrorMessage` | domain | enum `Error.code` (15 valores) | `deferred → Epic 6.1` |
| `CertificateTypeSelect` | domain | enum `CertificateType.slug` / `NewCertificate.typeSlug` (4) | `deferred → Epic 6.2` |
| `CertificateTypeLabel` | domain | mismo enum, en lectura | `deferred → Epic 6.2` |
| `QrHandoffCard` | domain | `CertificateDraft` (código + QR + URL) | `deferred → Epic 6.2` |
| `CertificateStatusBadge` | domain | enum `Certificate.status` / `CertificateSummary.status` (3) | `deferred → Epic 6.3` |
| `CertificateStatusFilter` | domain | enum query `status` de `listCertificates` (4, incluye el derivado `expired`) | `deferred → Epic 6.3` |
| `CertificateSummaryRow` | domain | `CertificateSummary` | `deferred → Epic 6.3` |
| `DeliveryStatusNote` | domain | enum `CertificateDelivery.status` (2) | `deferred → Epic 6.3` |
| `RevocationDialog` | domain | `Revocation.reason` — advierte que será público | `deferred → Epic 6.3` |
| `VerificationResultPanel` | domain | enum `VerificationResult.status` (3) + el caso "no encontrado" | `deferred → Epic 6.4` |
| `VerificationCodeForm` | domain | entrada manual del código | `deferred → Epic 6.4` |
| `ArticleCard` | domain | `ArticleSummary` | `deferred → Epic 7.1` |
| `ArticleFilterBar` | domain | query `category` y `tag` de `listArticles` | `deferred → Epic 7.1` |
| `ArticleEditorForm` | domain | `NewArticle` | `deferred → Epic 7.2` |
| `ContactForm` | domain | `ContactMessage` | `deferred → Epic 7.3` |

**56 filas.** 20 componentes de dominio, ≥1 por agregado del contrato: `Certificate` (9), `Article` (4), `AccessCode`/`Session` (3), `ContactMessage` (1), y los de la landing (5).

## 4. Motion, elevación, densidad e iconografía

- **Motion:** `functional` con acento expresivo. Entradas por scroll con `framer-motion` (`whileInView`, `viewport={{ once: true }}`), duraciones 0.5–0.8 s, `staggerChildren` 0.15–0.2 s, y un `spring` (`stiffness: 100`) solo en testimonios. Hover: `scale(1.05)` en el botón del hero y en las tarjetas de testimonio. **`prefers-reduced-motion`: `no implementado`** — hueco real, ninguna animación lo respeta hoy.
- **Elevación:** `no declarado` — escala de Tailwind heredada. `shadow-sm` en tarjetas apagadas, `shadow-lg` en reposo, `shadow-xl`/`shadow-2xl` en hover y elementos flotantes. Sin escalera propia ni separación mínima declarada. En modo oscuro no aplica: no está implementado.
- **Densidad:** `balanced-product` en los controles (alturas de fábrica de shadcn) sobre secciones `airy-marketing` (`py-16 sm:py-24`). La mezcla es observada, no decidida.
- **Iconografía:** `lucide-react`, una sola familia, trazo por defecto, contorno sin relleno, tamaños 16/18/20/22/24/28/36. Los enlaces de redes ya llevan `aria-label`; **los botones icon-only del futuro también deben llevarlo**. Sin emoji en slots de ícono — regla nueva, hoy no violada.

## 5. Contenido y voz

- **Tono:** primera persona, tuteo, sin jerga clínica sin explicar (`MK-005`). Nunca prometer resultados (`RN-020`) ni diagnosticar.
- **Capitalización:** mayúscula solo inicial en botones y encabezados. Nada en versalitas salvo el rótulo "Comunidad y Empoderamiento" del grupo de apoyo, que ya usa `uppercase tracking-wider`.
- **Gramática de botones:** verbo primero — "Agendar una sesión", "Quiero unirme", "Solicitar certificado". El patrón ya está establecido y se respeta en las pantallas nuevas.
- **Fórmula del mensaje de error:** qué pasó y cómo seguir, sin disculpas ni vaguedad. El texto **nunca** contiene datos de un titular ni detalles internos (`RN-002`, `RN-021`). Ejemplo de lo que hoy está mal: el toast dice *"En este momento tu mensaje no pudo ser enviado"* sin ofrecer salida — `RN-016` exige ofrecer WhatsApp y correo en el mismo lugar.
- **Formatos:** fechas en español de Colombia, huso UTC−5. Sin moneda: no hay pagos (`FA-002`). Sin RTL ni CJK.
- **Contenido intocable:** copy clínico, testimonios y credenciales **no se generan, parafrasean ni "mejoran"** sin aprobación de Erika (`RN-019`).

## 6. Accesibilidad y responsividad

- **Piso:** WCAG 2.2 AA. Texto 4.5:1 · texto grande 3:1 · no-texto 3:1 · anillo de foco ≥3:1.
- **Verificación de contraste:** `DESIGN_CHECK: contrast FAIL 5f2094cd8627` — **falla**, y el fallo es real, no un artefacto del documento. Ver §6.1.
- **Verificación de tokens:** `DESIGN_CHECK: tokens PASS 8865ca0fcab0`, con dos avisos: escala neutra de fábrica usada en 9 lugares de 3 archivos (esquiva los neutros propios del sistema) y la cadena de `Card` de shadcn sin editar.
- **Verificación de inventario:** `DESIGN_CHECK: inventory PASS ab3cba0b0c8f`. La comprobación I5 se omite porque el contrato es YAML, así que **la cobertura de enums se contó a mano: 8/8**.

**Ratios medidos** (los siete pares obligatorios, modo claro; el oscuro da idéntico porque no está implementado y su columna repite la clara):

| Par | Ratio | Piso | |
|---|---|---|---|
| `color.text.primary` / `color.bg.canvas` | 9.04:1 | 4.5 | pasa |
| `color.text.primary` / `color.bg.surface` | 9.44:1 | 4.5 | pasa |
| `color.text.muted` / `color.bg.surface` | 6.50:1 | 4.5 | pasa |
| `color.text.on-accent` / `color.action.primary` | 7.05:1 | 4.5 | pasa |
| `color.border.strong` / `color.bg.surface` | **1.41:1** | 3 | **BLOCKER** |
| `color.focus.ring` / `color.bg.canvas` | 3.16:1 | 3 | pasa, al filo |
| `color.focus.ring` / `color.action.primary` | 2.23:1 | 3 | WARNING |
- **El color nunca es el único portador de estado.** Regla nueva y necesaria: `VerificationResultPanel` y `CertificateStatusBadge` deben llevar siempre etiqueta e ícono, no solo color. Los tres estados de verificación se le muestran a un verificador que puede tener deficiencia de visión cromática, y hoy el sistema **no tiene `success` ni `warning`** con los que separarlos por luminosidad.
- **Objetivo táctil ≥24×24 px:** los controles de `h-10` (40 px) y los íconos sociales con `p-2` cumplen. **Los enlaces del footer no**: son texto de `0.875rem` en una lista sin padding vertical.
- **Responsividad — qué cambia estructuralmente:** en `md` el hero pasa de una columna a dos y aparece el retrato (`hidden sm:flex`); `AboutSection` pasa de apilado a 5 columnas (2 imagen / 3 texto); los servicios pasan de 1 a 2 columnas y la tarjeta del certificado de mascota ocupa las dos; el header colapsa a menú hamburguesa bajo `md`. El botón flotante de agendar oculta su etiqueta bajo `sm` y queda solo el ícono — **ahí el `aria-label` deja de ser opcional**.

### 6.1 Huecos de accesibilidad detectados al extraer

| # | Hallazgo | Evidencia |
|---|---|---|
| **A-1** | **BLOCKER de contraste.** `color.border.strong` y `color.border.subtle` apuntan al mismo primitivo (`#D5DADD`), y sobre superficie blanca dan **1.41:1** frente al 3:1 que exige WCAG 2.2 §1.4.11 para bordes de componente | Medido por `design-lint contrast`. `--border` y `--input` valen ambos `200 10% 85%` |
| **A-5** | El anillo de foco sobre el propio control que enfoca da **2.23:1** (teal sobre púrpura), por debajo de 3:1. Hoy lo salva el `ring-offset-2`, que separa el anillo del control con un halo del color de fondo — pero eso no está declarado como decisión, es el default de shadcn | Medido por `design-lint contrast` (WARNING) |
| **A-6** | Nueve lugares en tres archivos usan la escala neutra de fábrica de Tailwind (`gray-*`, `red-*`) esquivando los tokens propios del sistema | `design-lint tokens`, p. ej. `ContactSection.jsx` |
| **A-2** | `prefers-reduced-motion` no se respeta en ninguna animación | Ninguna variante de `framer-motion` lo consulta |
| **A-3** | No existen `success`, `warning` ni `info`, así que un estado no puede separarse por luminosidad además de por hue | §2.3 |
| **A-4** | El texto corrido no carga su tipografía de marca | `brief.md` B-4, verificado contra Google Fonts |

## 7. Gobernanza y log de deltas

- **Quién cambia qué:** los tokens fundacionales (§2.1, §2.2) solo cambian con una aprobación visual nueva en `/dev/design-system`. El resto se registra abajo.
- **Sonda de capacidades (Fase 3):** nivel **C** — `frontend.design_channel: "none"` declarado en `stack.yml`, sin `.design-sync/config.json` y sin `docs/03-ux-ui/handoff/`. No hay canal de diseño externo; la espina corrió completa igual.

### Huecos de token semántico declarados

| Hueco | Qué falta | Quién lo cierra |
|---|---|---|
| color.status.success | No existe. Lo necesitan "certificado emitido" y "artículo publicado" | Epic 6.3 — **no se deriva sin cerrar `D-3`** |
| color.status.warning | No existe. Lo necesita el caso "emitido pero no entregado" | Epic 6.3 — ídem |
| color.status.info | No existe | sin epic asignado |
| color.bg.surface.raised | No hay escalón de elevación por color; `card` y `popover` son ambos `#FFFFFF` | sin epic asignado |
| color.border.strong | Apunta al mismo primitivo que el borde sutil, y por eso no llega al 3:1 de WCAG 1.4.11 — ver A-1 | **Epic 1.4**, que es donde se codifican los tokens. No necesita input de marca nuevo: basta oscurecer el neutro existente hasta alcanzar el piso, y eso es aritmética, no diseño |

### Log de deltas

| Fecha | Epic | Qué cambió | Por qué |
|---|---|---|---|
| 2026-09-12 | hotfix `nuevo-numero-contacto` | `Dialog` y `PhoneChangeModal` construidos antes del Epic 1.4 | El sitio publicaba un número que no responde. El modal usa **los tokens del sistema** (`color.action.primary`, `color.text.primary`, `radius.action`), no la paleta crema y salvia de la pieza de Instagram que sirvió de referencia: introducir una tercera paleta contradiría `MK-001` |
