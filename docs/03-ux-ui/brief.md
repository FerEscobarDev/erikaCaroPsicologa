# Brief de Marca — Erika Caro Psicóloga

> Producido por la Fase 3 (`ux-design`) el 2026-09-12, a partir de `business_requirements.md` §Identidad de Marca (`MK-nnn`).
>
> **Proyecto en modo Adopt** (`frontend.ui_defined: true`): hay un producto en producción. El gate de dirección de la Fase 3 **no aplica** — no se generan tres direcciones ni se elige una, porque la dirección ya está embarcada. Este brief documenta la marca declarada y la contrasta con lo que el código renderiza.

## Procedencia

- **Estado:** `usuario`
- Los cinco campos `MK-001`…`MK-005` los respondió el usuario en la Fase 1. **Ningún campo fue propuesto por el agente.**
- `MK-006` (referencias visuales) quedó `sin definir` — el usuario no aportó URLs. No se inventa ninguna.
- **Pendiente que afecta a este brief:** la decisión abierta `D-3`, la ubicación del manual de marca formal. El manual existe según `MK-001` pero no se ha entregado, así que **la extracción se hizo del código y no ha sido contrastada contra él**. Ver §Discrepancias.

## Parte A — lo que respondió el usuario

1. **Marca preexistente** *(MK-001)* — **Sí, con manual de marca formal**, cuya ubicación está `sin definir`. Activos vivos hoy: logo (`src/assets/images/Logo.png`, `marca.png`), paleta teal (`#025157` · `#00a19b` · `#19d3c5` · `#dfe1df`) y púrpura (`#382246` · `#7c4182` · `#a05cbf` · `#d79dd7`), tipografías Acumin Pro (texto) y Slabo 27px (titulares).
2. **Objetivo emocional** *(MK-002)* — a los 5 segundos, **confianza**: "esta profesional es seria y calificada". Al terminar de recorrer el sitio, **decisión**: "a esta persona le escribo hoy".
3. **Atributos** *(MK-003)* — cálido, no meloso · profesional, no clínico · claro, no simplón.
4. **Anti-referencias** *(MK-004)* — no debe parecerse a: una **EPS o clínica institucional** (fría, burocrática, despersonaliza); un **marketplace de terapia** tipo BetterHelp (terapeutas intercambiables, nadie tiene cara); un **coach de Instagram** (frases motivacionales, estética de infoproducto, confunde psicología con autoayuda); una **web corporativa genérica** (plantilla azul con fotos de stock).
5. **Locale y script** — español de Colombia únicamente. Sin RTL, sin CJK. Zona horaria UTC−5. Sin requerimiento de segundo idioma (`FA-006`). Cadenas largas esperables en español: los nombres de tipo de certificado ("Certificado de Apoyo Emocional Asistido por Mascota", 54 caracteres) y los nombres completos de titular.

## Parte B — lo que se observa en el producto embarcado

> En Adopt esta parte **no se propone**: se lee del código. Lo que no sea observable se marca `no declarado`.

- **Densidad:** `balanced-product` — alturas de control de fábrica de shadcn (`h-10` / `h-9` / `h-11`), con secciones de landing generosas (`py-16 sm:py-24`).
- **Postura tipográfica:** *una display distintiva + texto neutro* — Slabo 27px (serif) para titulares, Acumin Pro (sans) para texto. Es la decisión tipográfica más deliberada del sitio.
- **Personalidad de motion:** `functional`, con acento expresivo. `framer-motion` con entradas por scroll (`whileInView`, `once: true`), duraciones 0.5–0.8s y un `staggerChildren` de 0.15–0.2s.
- **Ledger honrar/romper:** honra las convenciones de industria (destructivo = rojo `#EF4444`, foco visible, iconos de línea). **Rompe una a propósito:** las acciones principales son píldoras completas (`rounded-full`) sobre superficies de esquina suave (`rounded-md`/`rounded-xl`) — ver el elemento firma en `design_system.md` §1.1.
- **Stance de ilustración/fotografía:** fotografía real de Erika (`Hero_1.jpg`, `Hero_2.jpg`) y de la comunidad (`AmigaNoEstasSola.png`). **Sin banco de imágenes en el sitio publicado.** Es coherente con las anti-referencias "marketplace" y "web corporativa genérica": ahí sí hay una cara concreta.
  > Excepción a corregir: los artículos de ejemplo del blog apagado sí usan Unsplash. Es parte de la decisión abierta `D-6`.

## Parte C — restricciones duras

- **Piso legal de accesibilidad:** WCAG 2.2 AA.
- **Activos existentes:** logo y marca en `src/assets/images/`. **Acumin Pro y Slabo 27px se cargan desde Google Fonts** en `index.html` — pero Acumin Pro **no está en el catálogo de Google Fonts**, así que hoy el navegador cae al fallback `sans-serif`. Es un hueco de activo, no de diseño: ver §Discrepancias.
- **Longevidad:** el sitio lleva en producción desde 2025 sin rediseño; la marca debe sobrevivir a la incorporación de la zona privada y la verificación pública sin rehacerse.
- **Librería UI declarada:** shadcn/ui sobre Radix (`stack.yml.frontend.ui_library`), copiada a mano — no hay `components.json`, así que no hay CLI que regenere nada.
- **Colisión de librería, resuelta:** el centro de gravedad de fábrica de shadcn (neutros slate, Inter, radio 0.5rem, densidad media) cae dentro de la anti-referencia "web corporativa genérica". El producto ya se desvió en **paleta** (neutros derivados del hue 200 de la marca, no slate) y **tipografía** (Acumin Pro + Slabo, no Inter). Sigue en fábrica en **radio** y **densidad**. Decisión del usuario el 2026-09-12: **declararlo heredado y seguir**, sin presupuesto de override. Queda como riesgo identificado — si el sitio llega a sentirse genérico, la causa está localizada en esos dos ejes.

## Discrepancias entre la marca declarada y el código

> Encontradas al extraer los tokens. Se registran, **no se corrigen aquí**: corregirlas es código y pertenece a un epic.

| # | Qué | Evidencia | Impacto |
|---|---|---|---|
| **B-1** | `--accent-purple-dark` renderiza `#642385`, la marca declara `#382246` (**ΔE 37.4**) | El comentario del propio CSS dice `/* #382246 */` junto a un HSL que produce otro color: la conversión hex→HSL está mal hecha | Alto. Es `--accent` y el hover de **todos los CTA principales** (`hover:bg-accent-purple-dark`). El sitio muestra un violeta brillante donde la marca pide una berenjena profunda |
| **B-2** | `--accent-purple-lighter` `#D29EE5` vs `#D79DD7` (ΔE 7.4) y `--accent-purple-light` `#A75AC4` vs `#A05CBF` (ΔE 4.4) | Misma causa | Medio. Fondos de avatar e íconos |
| **B-3** | `--primary-teal-lighter` `#D7E0E4` vs `#DFE1DF` (ΔE 4.0) | El declarado es un gris azulado; la marca pide un gris verdoso neutro | Medio. Es el fondo de tres secciones completas de la landing |
| **B-4** | Acumin Pro se pide a Google Fonts, que **no la sirve** | Verificado el 2026-09-12 contra el endpoint real: `GET https://fonts.googleapis.com/css2?family=Acumin+Pro:wght@400;600;700&family=Slabo+27px&display=swap` responde **HTTP 200** con un único `@font-face`, el de `Slabo 27px`. **No hay `@font-face` para Acumin Pro.** Google ignora en silencio la familia desconocida en vez de fallar — por eso nadie lo notó | Alto. Los **titulares sí** cargan Slabo 27px; el **texto corrido no** carga Acumin Pro y cae al `sans-serif` del sistema. Acumin Pro es una fuente de Adobe, no de Google: para servirla hace falta licencia y alojarla, o elegir otra |

> **Las cuatro dependen de `D-3`.** El manual de marca es quien arbitra si el valor correcto es el del comentario o el que se está renderizando. Hasta entonces se documenta lo que el código hace, no lo que dice que hace.
