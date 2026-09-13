# ADR-002: Backend propio, monorepo por app y navegación con rutas reales

## Status

`Accepted`

> Extiende ADR-001, que sigue vigente: el stack de frontend adoptado allí (React 18 + Vite + Tailwind + shadcn/ui), sus convenciones y su deuda reconocida no cambian. Este ADR añade lo que ADR-001 declaró inexistente — backend, base de datos y API — y revisa dos alternativas que aquel había descartado explícitamente: el router y la estructura de carpetas.

## Context

La Fase 1 (`discover`, 2026-09-11) levantó una capacidad que el proyecto no tenía: **emisión y verificación pública de certificados**. Erika expide certificados de cuatro tipos que sus titulares presentan ante aerolíneas, empleadores, instituciones educativas y entidades de salud o jurídicas. Ver `docs/01-requirements/business_requirements.md`, historias `HU-CERT-001` a `HU-CERT-008`.

Esa capacidad, junto con otras tres que el levantamiento confirmó, no cabe en un sitio estático:

- **Verificación pública** (`HU-CERT-005`, `HU-CERT-006`) — un tercero escribe un código o escanea un QR y obtiene el estado del certificado. Exige consultar un registro vivo desde una dirección propia.
- **Emisión y anulación** (`HU-CERT-002`, `HU-CERT-003`, `HU-CERT-007`) — Erika, identificada, crea y anula certificados. Exige identificación y escritura persistente.
- **Entrega por correo** (`HU-CERT-004`, `RN-008`) — el certificado llega como adjunto al titular.
- **Formulario de contacto real** (`HU-CONTACT-001`, `RN-015`) — el mensaje debe llegar al correo de Erika, y hoy la interfaz responde literalmente "Mensaje No Enviado".
- **Publicación autónoma del blog** (`HU-BLOG-003`, `RN-018`) — Erika publica sin intervención técnica.

A esto se suma una restricción estructural: el QR impreso en un certificado (`RN-005`) tiene que apuntar a una dirección concreta y estable, y `HU-SITE-008` pide que los buscadores puedan indexar el contenido. La navegación actual —un `switch` sobre `useState` en `App.jsx`— no produce direcciones: todo el sitio vive en una sola URL.

Fuerzas en juego:

- Los datos de titulares están bajo Ley 1581 de 2012 y bajo la reserva profesional de la Ley 1090 de 2006 (`RN-021`). Dónde viven y quién los puede leer es una decisión con consecuencias legales, no solo técnicas.
- Erika no es técnica (`RN-018`, `CL-008`): todo lo recurrente debe poder hacerlo sola, incluida la recuperación de su propio acceso.
- El sitio está en producción y despliega automáticamente con cada push. Cualquier cambio estructural tiene que poder llegar sin romper lo que ya funciona.
- El equipo técnico es una persona. La curva de aprendizaje y el costo de mantenimiento pesan tanto como la elegancia.

## Decision

Se amplía el stack a full-stack, con estas elecciones:

| Decisión | Elección |
|---|---|
| Backend | Node 20 + Express, en **JavaScript** — el mismo lenguaje del frontend |
| Base de datos | PostgreSQL, como contenedor en el mismo VPS gestionado por Dokploy |
| Acceso a datos | Prisma, por sus migraciones versionadas |
| Almacenamiento de PDFs | Volumen persistente del VPS |
| Envío de correo | SMTP del dominio en Hostinger (`desarrollohumano@erikacaropsicologa.com`) |
| Estructura del repositorio | Monorepo con la convención Specture: `erika_caro_psicologa_web/` y `erika_caro_psicologa_api/` |
| Identificación de Erika | Código OTP de un solo uso enviado a su correo — sin contraseña |
| Navegación del frontend | React Router, con direcciones reales |
| Estilo de API | REST, con contrato OpenAPI como fuente única de verdad |

El frontend existente **se mueve** de la raíz a `erika_caro_psicologa_web/` en el epic de Foundation, no antes. Hasta entonces el despliegue actual sigue intacto.

## Alternatives Considered

- **NestJS o Fastify con TypeScript.** Descartadas: aportan estructura y tipos que este dominio —cuatro features y un único usuario administrador— no necesita todavía, a cambio de una curva y una ceremonia reales para un equipo de una persona. Express en JavaScript mantiene un solo lenguaje en todo el repositorio.
- **Supabase u otro BaaS.** Descartada: resolvía base de datos, identificación y almacenamiento sin escribir código, pero los datos de titulares de certificados —personas que estuvieron en atención psicológica— quedarían en un tercero. Con Ley 1581 y reserva profesional de por medio, eso obliga a declararlo en el aviso de privacidad y añade un responsable externo al tratamiento. No compensa para este volumen.
- **SQLite en lugar de PostgreSQL.** Descartada por el respaldo: son documentos que Erika no puede perder y un archivo único en un volumen es un punto de fallo sin red. PostgreSQL en Dokploy tiene respaldo y restauración documentados.
- **PDFs en almacenamiento S3-compatible.** Descartada por ahora: más resistente a la caída del VPS, pero añade una dependencia externa y una credencial que gestionar. Queda como la salida natural si el volumen crece o si el respaldo del volumen resulta insuficiente.
- **Guardar los PDFs dentro de la base de datos.** Descartada: unifica el respaldo pero infla la base y encarece cada copia.
- **Servicio de correo dedicado (Resend, Brevo).** Descartada en favor del SMTP del dominio, que ya existe y no suma costo ni proveedor. **Trade-off explícito y consecuente:** ver Consequences — `CL-006` queda peor servido.
- **Correo y contraseña, con o sin segundo factor.** Descartadas frente al OTP: la contraseña obliga a construir igualmente un flujo de recuperación por correo, y el segundo factor añade fricción diaria a una persona que entra a emitir un certificado suelto. El OTP resuelve `CL-008` por diseño: no hay nada que perder.
- **Enlace mágico por correo** (en vez de código OTP). Descartada por el usuario en favor del código: el código se puede escribir en otro dispositivo y no depende de que el enlace sobreviva al cliente de correo.
- **Mantener la navegación con `useState`.** Descartada: incompatible con `RN-005` (el QR necesita una dirección concreta) y con `HU-SITE-008` (indexación).
- **Migrar a Next.js.** Descartada: resolvería rutas y renderizado en servidor de raíz, pero implica reescribir la aplicación entera. Es un proyecto en sí mismo, no un paso de esta fase. ADR-001 ya había diferido esta discusión; se mantiene diferida.
- **Frontend en la raíz y backend en `api/`.** Descartada por el usuario en favor del monorepo simétrico, pese a ser el cambio más barato: se prefirió la convención del framework al ahorro de un movimiento de archivos.
- **Dos repositorios separados.** Descartada: duplica el trabajo de despliegue y dificulta mantener el contrato de API sincronizado entre ambos lados.

## Consequences

### Positivas

- Un solo lenguaje en todo el repositorio: no hay cambio de contexto entre las dos aplicaciones.
- Las migraciones de Prisma dan una historia versionada del esquema, que es lo que protege los certificados ya emitidos ante un cambio de estructura.
- El OTP elimina la categoría entera de problemas de contraseñas —olvido, reutilización, robo— y cierra `CL-008` sin construir un flujo de recuperación aparte.
- Con React Router el QR puede apuntar a una dirección estable y el blog se vuelve indexable, que son dos requisitos explícitos.
- Los datos sensibles no salen del VPS de Erika: no se suma ningún responsable externo al tratamiento.
- La estructura por app deja lugar evidente para cada cosa y evita que el backend se cuele dentro del árbol del frontend.

### Negativas / Trade-offs aceptados

- **El SMTP del dominio no informa de rebotes ni de entregas fallidas.** `CL-006` exige que Erika se entere si el certificado no le llegó al titular, y esta elección no lo resuelve por sí sola: hace falta una estrategia explícita en el epic correspondiente. Si resulta insuficiente, migrar a un servicio dedicado es la salida y requiere un ADR nuevo.
- **El correo pasa a ser un punto único de fallo para el acceso de Erika.** Con OTP, si su correo no funciona, no puede entrar a emitir. No hay segunda vía.
- **Mover el frontend a `erika_caro_psicologa_web/` produce un commit que toca todo el repositorio**, sin ninguna red de tests que lo respalde — ADR-001 dejó registrado que el proyecto tiene cero tests. Hay que reconfigurar Dokploy para que apunte al nuevo subdirectorio, y un error ahí tumba el sitio en producción.
- **El VPS pasa de servir archivos estáticos a sostener tres piezas** (web, API y base de datos). Respaldo, actualizaciones y disponibilidad dejan de ser gratis.
- **El volumen del VPS es hoy el único lugar donde viven los PDFs.** Sin una política de respaldo verificada, un fallo del disco pierde certificados emitidos.
- **React Router obliga a replantear la navegación existente**: el `switch` sobre `useState` de `App.jsx`, el scroll-spy del header y los enlaces por ancla tienen que convivir con rutas reales.
- El proyecto deja de ser desplegable como sitio estático: ya no basta con `vite build` y servir `dist/`.

### Implicaciones operativas

- Skills/agentes afectados: la Fase 2 produce contrato de API (`docs/02-architecture/api-contract.openapi.yaml`), que antes no aplicaba. El `code-reviewer` gana superficie de backend que revisar.
- Dokploy necesita **dos aplicaciones** apuntando a subdirectorios distintos del mismo repositorio, más un contenedor PostgreSQL. La configuración de despliegue vive fuera del repositorio (ADR-001 ya lo dejó anotado) y ahora es más frágil.
- Variables de entorno y credenciales (base de datos, SMTP) entran en juego por primera vez: hay que definir dónde viven y cómo no terminan en el repositorio.
- ¿Requiere actualizar `stack.yml`? **Sí — ya aplicado**: `backend`, `database`, `api`, `structure`, `architecture.module_strategy` y `project.type`.
- ¿Requiere actualizar `conventions.md`? **Sí — ya aplicado**: §2.1 pasa de "No aplica" a describir el layout por app, y el mapa de ubicaciones de §2 incorpora las rutas del backend.

## Date

`2026-09-11`
