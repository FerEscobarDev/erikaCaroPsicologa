# ROADMAP: Erika Caro Psicóloga

## Visión General

Sitio profesional de la psicóloga Erika Andrea Caro. Existe para **dar credibilidad** a quien llega por referencia o por búsqueda, y para que esa persona termine escribiéndole el mismo día. Hoy es una landing estática en producción; el objetivo de este roadmap es cerrarla bien y añadirle la capacidad que hoy no tiene.

Esa capacidad nueva es **emitir y verificar certificados**. Erika expide cuatro tipos de certificado que sus titulares presentan ante aerolíneas, empleadores, instituciones educativas y entidades de salud o jurídicas; hoy lo resuelve subiendo PDFs sueltos al repositorio, sin forma de verificarlos. El sistema debe permitirle emitirlos con un código no adivinable y un QR, entregarlos por correo, y dejar que cualquier tercero compruebe su autenticidad sin exponer nada más que el estado y el nombre del titular — porque dos de los cuatro tipos revelarían, si se filtran, que una persona estuvo en atención psicológica.

## Contexto Técnico

- **Configuración del stack:** [`.specture/stack.yml`](../../.specture/stack.yml) *(fuente de verdad)*
- **Convenciones del proyecto:** [`.specture/conventions.md`](../../.specture/conventions.md)
- **Decisiones registradas (ADRs):** [`.specture/decisions/`](../../.specture/decisions/) — ADR-001 (stack adoptado), ADR-002 (backend, monorepo y navegación)
- **Requerimientos de negocio:** [`docs/01-requirements/business_requirements.md`](../01-requirements/business_requirements.md)
- **Arquitectura:** [`docs/02-architecture/architecture.md`](../02-architecture/architecture.md)
- **Contrato de API:** [`docs/02-architecture/api-contract.md`](../02-architecture/api-contract.md) · fuente de verdad en [`api-contract.openapi.yaml`](../02-architecture/api-contract.openapi.yaml)
- **UX/UI:** [`docs/03-ux-ui/`](../03-ux-ui/) *(Fase 3, pendiente)*

---

## Convención de Estados

| Símbolo | Estado | Significado |
|---------|--------|-------------|
| `[ ]` | Pendiente | El epic aún no se ha tocado. |
| `[/]` | En Progreso | Hay un spec activo o un epic-agent trabajando en él. Solo UN epic puede estar en `[/]` a la vez. |
| `[x]` | Completado | Todos los specs implementados, revisados (`code-reviewer` APPROVED) y verificados (tests pasan, lint limpio). |

---

## Decisiones abiertas que bloquean epics

> Ninguna se rellena por iniciativa de un agente. Cada epic marcado abajo **no arranca** hasta que su decisión esté cerrada.

| Decisión | Qué falta | Bloquea |
|----------|-----------|---------|
| `D-1` | Vigencia de cada tipo de certificado | Epic 4.1, Epic 4.3 |
| `D-2` | Si `revoked`/`expired` deben ser indistinguibles de "no existe" | Epic 4.5, Epic 6.4 |
| `D-3` | Ubicación del manual de marca | Epic 1.4 — **y por el gate de diseño, todo epic `pagina` detrás de él** |
| `D-4` | Fecha desde la que corren los dos meses del aviso | Epic 1.5 |
| `D-6` | Qué pasa con los artículos de ejemplo actuales | Epic 5.1, Epic 7.1 |
| `D-7` | Recuperación de acceso si el correo de Erika falla | Epic 3.1 *(no bloquea: se construye y se anota el riesgo)* |
| Ruta pública de verificación | La fija Epic 1.3 y la congela el primer certificado emitido — cambiarla invalida los QR impresos | Epic 1.3, Epic 4.1 |
| Contenido legal | Lo entrega Erika o su abogado; ningún agente lo redacta | Epic 1.7 |
| Estrategia de indexación | Cómo ve un buscador el contenido si la app se renderiza en el navegador (`architecture.md` §7). Entre metadatos por ruta y un pipeline de prerender hay un orden de magnitud | Epic 8.1 — **su tamaño no es estimable hasta cerrarla** |

> **El gate de diseño manda sobre el orden.** `spec-set-check.js` C-design exige que todo epic `Tipo: pagina` tenga detrás la aprobación visual del epic `design-system` (Epic 1.4), sin excepción por urgencia. Por eso el aviso del número nuevo —que es lo más urgente del proyecto en términos de negocio— es el Epic 1.5 y no el primero: antes van la red de tests, el monorepo, el enrutado y el sistema de diseño. **Si el número no puede esperar, se corrige como hotfix** por la vía de `conventions.md` §13 W-2, fuera de este roadmap.

---

## Hitos (Milestones) y Epics

### Milestone 1: Foundation
*Objetivo:* red de tests, estructura de dos apps, enrutado real y sistema de diseño aprobado — sin romper el sitio que ya está en producción.

- [ ] **Epic 1.1:** Red de tests y linter
  - **Dependencias:** Ninguna
  - **Tipo:** backend
  - **Descripción:** Instalar Vitest + Testing Library con los tests en `tests/`, y crear la configuración de ESLint que hoy falta pese a estar en `devDependencies`. Va primero porque `conventions.md` §7 exige test-first para todo código nuevo y hoy no existe runner que pueda ejecutar un test en rojo. **Es el único epic que no puede ser test-first consigo mismo**: no se puede probar el runner con el runner que se está instalando. Se verifica ejecutando la suite y el linter.
  - **Reglas de negocio clave:** RN-019
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site)
  - **Specs estimados:** 1

- [ ] **Epic 1.2:** Monorepo
  - **Dependencias:** Epic 1.1
  - **Tipo:** backend
  - **Descripción:** Mover el frontend actual de la raíz a `erika_caro_psicologa_web/`, ajustando alias, rutas de build y de tests. Es el commit más riesgoso del roadmap: toca todo el repositorio y dispara despliegue automático. La reconfiguración de Dokploy que lo acompaña **no es un artefacto del repositorio** (ADR-001, ADR-002) y se ejecuta como paso operativo, no como spec.
  - **Reglas de negocio clave:** RN-019
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site), [`design-system`](../02-architecture/architecture.md#27-design-system)
  - **Specs estimados:** 2

- [ ] **Epic 1.3:** Enrutado base
  - **Dependencias:** Epic 1.2
  - **Tipo:** backend
  - **Descripción:** Instalar React Router y declarar la tabla de rutas que el resto del roadmap consume: `/`, `/verificar`, `/verificar/:codigo`, `/blog`, `/blog/:slug`, `/admin/*`, `/aviso-privacidad`, `/terminos-condiciones` y `/dev/design-system`. Sustituye el `switch` sobre `useState` de `App.jsx` conservando el scroll-spy del header y las anclas de la landing, que sigue montada en `/` **sin cambio visual** — la landing renderizada debe ser indistinguible de la actual, y así se verifica.

    **Declara las rutas, pero solo monta dos.** La tabla de rutas es un contrato de constantes; las únicas que este epic renderiza son `/` (la landing existente) y `/dev/design-system` (vacía hasta Epic 1.4). Las demás las monta **el epic dueño de cada pantalla**: ninguna superficie visual nueva llega a producción antes de la aprobación visual de Epic 1.4, que es justo lo que el gate protege.

    Es infraestructura de navegación, no diseño de pantalla: por eso es `backend` y por eso va antes del sistema de diseño, que sin él no tendría dónde servir su showcase. **Aun así toca JSX**, así que honra los patrones de `conventions.md` §3 —`framer-motion`, `cn()`, anclas con `scrollIntoView`— que la reescritura de `App.jsx` puede romper sin querer.

    **Nota para el review:** al ser `Tipo: backend`, la dimensión de fidelidad frontend del `code-reviewer` puede no activarse sola. **Pídela explícitamente en el dispatch de review de este epic** — es donde se comprueba que la reescritura de `App.jsx` no rompió `framer-motion`, `cn()` ni las anclas.
  - **Reglas de negocio clave:** RN-005
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site)
  - **Bloqueado por:** la ruta pública de verificación, que este epic fija y que **queda congelada a partir del primer certificado emitido** — cambiarla después invalida los QR ya impresos
  - **Specs estimados:** 2

- [ ] **Epic 1.4:** Sistema de diseño por ingeniería inversa
  - **Dependencias:** Epic 1.3
  - **Tipo:** design-system
  - **Descripción:** Extraer a código el sistema que el sitio **ya usa** — tokens HSL de `index.css`, tipografías Acumin Pro y Slabo 27px, primitivas shadcn — y publicarlo en `/dev/design-system` para aprobación visual humana. No se inventa una estética nueva: `frontend.ui_defined` es `true` y hay manual de marca. Depende de Epic 1.3 porque hasta que exista el enrutado el sitio entero vive en una sola URL y no hay dónde servir el showcase. El gate C-design bloquea **todos** los epics `pagina` del roadmap hasta que su aprobación visual esté registrada.
  - **Reglas de negocio clave:** RN-019, RN-020
  - **Componentes de arquitectura involucrados:** [`design-system`](../02-architecture/architecture.md#27-design-system)
  - **Bloqueado por:** `D-3` (ubicación del manual de marca)
  - **Specs estimados:** 2

- [ ] **Epic 1.5:** Número de contacto nuevo y aviso de cambio
  - **Dependencias:** Epic 1.4
  - **Tipo:** pagina
  - **Descripción:** Reemplazar `+57 324 387 4221` por `+57 317 157 6141` en los tres lugares donde aparece (contacto, grupo de apoyo, header) y mostrar al entrar un **modal a pantalla completa** que informe del cambio —con su motivo, el enlace directo al WhatsApp nuevo, la petición a quien no tuvo respuesta y la nota de que el número viejo sigue por Telegram—, cerrable, que reaparece en cada visita y desaparece solo al cumplirse su fecha límite (30/11/2026). **Es lo más urgente del proyecto en términos de negocio** —el sitio publica hoy un número que no responde— pero el gate de diseño lo pone detrás de 1.4. Si no puede esperar, va como hotfix fuera del roadmap.
  - **Reglas de negocio clave:** RN-012, RN-013, RN-014, RN-023, RN-024, RN-025, RN-026
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site)
  - **`D-4` cerrada** el 2026-09-12: la fecha límite es el 30 de noviembre de 2026.
  - **Adelantado como hotfix** `hotfix/nuevo-numero-contacto` el 2026-09-12, por la vía de `conventions.md` §13 W-2. Este epic queda para cubrirlo con tests cuando exista el runner (Epic 1.1).
  - **Specs estimados:** 1

- [ ] **Epic 1.6:** Esqueleto de la API y base de datos
  - **Dependencias:** Epic 1.2
  - **Tipo:** backend
  - **Descripción:** Crear `erika_caro_psicologa_api/` con Express, Prisma y PostgreSQL en Dokploy, el envelope de error único, el manejo de errores del borde HTTP, el log con sus prohibiciones, y el despliegue **bajo el mismo origen** que la web en el prefijo `/api` — condición de la que depende la cookie de sesión. **Declara las librerías de validación permitidas** que `architecture.md` §5.4 asigna al epic de Foundation; ninguna otra se introduce después sin pasar por aquí.
  - **Reglas de negocio clave:** RN-021
  - **Componentes de arquitectura involucrados:** [§3 Patrones de comunicación](../02-architecture/architecture.md#3-patrones-de-comunicación), [§5.2 Logging](../02-architecture/architecture.md#52-logging-y-observabilidad), [§5.3 Errores](../02-architecture/architecture.md#53-manejo-de-errores), [§5.4 Validación](../02-architecture/architecture.md#54-validación)
  - **Specs estimados:** 3

- [ ] **Epic 1.7:** Páginas legales
  - **Dependencias:** Epic 1.4
  - **Tipo:** pagina
  - **Descripción:** Crear `/aviso-privacidad` y `/terminos-condiciones`, que el footer ya enlaza y que hoy están rotos en producción. **Deben existir antes de que el sitio recoja cualquier dato de un titular de certificado**, así que Epic 4.1 —el primero que almacena nombre y correo de un titular— lo declara como dependencia, no como recomendación.
  - **Reglas de negocio clave:** RN-021, RN-022
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site)
  - **Bloqueado por:** el contenido legal, que entrega Erika o su abogado — ningún agente lo redacta
  - **Specs estimados:** 1

### Milestone 2: Cliente de API
*Objetivo:* un único punto por el que la web habla con la API, generado desde el contrato.

- [ ] **Epic 2.1:** Cliente de API generado
  - **Dependencias:** Epic 1.6, Epic 1.3
  - **Tipo:** backend
  - **Descripción:** Generar el cliente desde `api-contract.openapi.yaml` y dejarlo como único punto por el que la web habla con la API. Cierra la decisión abierta de `architecture.md` §7: dónde vive y con qué herramienta se genera, añadiendo su fila al mapa de ubicaciones de `conventions.md` §2. **El cliente emite JavaScript**, coherente con `stack.yml.frontend.language` y con `quality.type_checker: none`; si el generador elegido solo emite TypeScript, eso es un cambio de stack y exige ADR.
  - **Reglas de negocio clave:** RN-021
  - **Componentes de arquitectura involucrados:** [`api-client`](../02-architecture/architecture.md#212-api-client)
  - **Specs estimados:** 1

### Milestone 3: Acceso de Erika
*Objetivo:* que Erika pueda entrar a su zona privada sin contraseña y sin depender de nadie.

- [ ] **Epic 3.1:** Código de un solo uso y sesión
  - **Dependencias:** Epic 1.6
  - **Tipo:** backend
  - **Descripción:** OTP de 6 dígitos enviado al correo autorizado, canjeable por una sesión en cookie `HttpOnly`. Guarda el hash, nunca el código. La solicitud responde igual exista o no la dirección, para no revelar cuál es la autorizada. Añade las tablas `AccessCode` y `Session`.
  - **Reglas de negocio clave:** RN-004, RN-021
  - **Componentes de arquitectura involucrados:** [`access`](../02-architecture/architecture.md#21-access), [`mail`](../02-architecture/architecture.md#25-mail)
  - **Operaciones del contrato:** `requestAccessCode`, `verifyAccessCode`, `getSession`, `endSession`
  - **Riesgo anotado (`D-7`):** si el correo de Erika deja de funcionar, no hay segunda vía de entrada. Se construye igual y el riesgo queda registrado.
  - **Specs estimados:** 3

### Milestone 4: Certificados (API)
*Objetivo:* el ciclo completo de un certificado, desde que Erika pide su código hasta que un tercero lo verifica.

- [ ] **Epic 4.1:** Modelo de certificados y generación de código
  - **Dependencias:** Epic 1.7, Epic 3.1
  - **Tipo:** backend
  - **Descripción:** Tablas `CertificateType` y `Certificate`, siembra de los cuatro tipos, y registro de un certificado en estado borrador con su código no adivinable, su URL de verificación y su QR — todo antes de que el PDF se diseñe.
  - **Reglas de negocio clave:** RN-001, RN-003, RN-004, RN-005, RN-007, RN-011, RN-021
  - **Componentes de arquitectura involucrados:** [`certificates`](../02-architecture/architecture.md#22-certificates), [`access`](../02-architecture/architecture.md#21-access)
  - **Operaciones del contrato:** `listCertificateTypes`, `registerCertificate`
  - **Bloqueado por:** `D-1` (vigencias por tipo) y la ruta pública de verificación fijada en Epic 1.3
  - **Specs estimados:** 3

- [ ] **Epic 4.2:** Archivo de certificados
  - **Dependencias:** Epic 4.1
  - **Tipo:** backend
  - **Descripción:** Listado paginado y filtrable por búsqueda y estado, y detalle de un certificado. El listado devuelve una vista ligera, sin el QR: un SVG por ítem con cien por página haría de cada consulta del archivo una descarga innecesaria.
  - **Reglas de negocio clave:** RN-004, RN-007, RN-021
  - **Componentes de arquitectura involucrados:** [`certificates`](../02-architecture/architecture.md#22-certificates)
  - **Operaciones del contrato:** `listCertificates`, `getCertificate`
  - **Specs estimados:** 2

- [ ] **Epic 4.3:** Emisión, entrega y descarga
  - **Dependencias:** Epic 4.2
  - **Tipo:** backend
  - **Descripción:** Recibir el PDF que Erika diseñó, rechazarlo si no lleva impreso el código, dejar el certificado emitido, calcular su vencimiento, enviarlo al correo del titular y registrar el intento de entrega. Los PDFs viven fuera de toda raíz servida como estática. Añade la tabla `CertificateDelivery`.
  - **Reglas de negocio clave:** RN-003, RN-005, RN-007, RN-008, RN-009, RN-010, RN-021
  - **Componentes de arquitectura involucrados:** [`certificates`](../02-architecture/architecture.md#22-certificates), [`files`](../02-architecture/architecture.md#26-files), [`mail`](../02-architecture/architecture.md#25-mail)
  - **Operaciones del contrato:** `issueCertificate`, `downloadCertificate`
  - **Bloqueado por:** `D-1` (sin vigencias no se puede calcular el vencimiento)
  - **Riesgo anotado:** con SMTP plano se registra si el envío falló en el momento, pero un **rebote posterior es invisible**. `CL-006` queda servido a medias; si resulta insuficiente, migrar a un servicio de correo dedicado exige ADR (`architecture.md` §7).
  - **Specs estimados:** 3

- [ ] **Epic 4.4:** Anulación
  - **Dependencias:** Epic 4.3
  - **Tipo:** backend
  - **Descripción:** Anular un certificado emitido dejando el motivo visible a quien lo verifique. Un borrador o uno ya anulado no se pueden anular. Va separada de la verificación porque `D-2` bloquea aquella y no tiene nada que ver con esta.
  - **Reglas de negocio clave:** RN-004, RN-006
  - **Componentes de arquitectura involucrados:** [`certificates`](../02-architecture/architecture.md#22-certificates)
  - **Operaciones del contrato:** `revokeCertificate`
  - **Specs estimados:** 1

- [ ] **Epic 4.5:** Verificación pública
  - **Dependencias:** Epic 4.4
  - **Tipo:** backend
  - **Descripción:** La operación más expuesta del sistema. Devuelve solo el estado y el nombre del titular, más el motivo de anulación o la fecha de vencimiento según corresponda. Un código inexistente, malformado o de un borrador responden idéntico. Limitada en frecuencia para que probar códigos en masa no sirva de nada.
  - **Reglas de negocio clave:** RN-002, RN-006, RN-021
  - **Componentes de arquitectura involucrados:** [`certificates`](../02-architecture/architecture.md#22-certificates)
  - **Operaciones del contrato:** `verifyCertificate`
  - **Bloqueado por:** `D-2` — no arranca hasta cerrarla; cambia el shape de la respuesta
  - **Specs estimados:** 2

- [ ] **Epic 4.6:** Respaldo verificado de datos y archivos
  - **Dependencias:** Epic 4.3
  - **Tipo:** backend
  - **Descripción:** Política de respaldo **probada** de PostgreSQL y del volumen de PDFs, con una restauración de prueba. Va aquí y no al final: ADR-002 dejó registrado que el volumen del VPS es el único lugar donde viven los PDFs, así que desde el primer certificado emitido (Epic 4.3) existe una ventana en la que un fallo de disco pierde documentos que Erika no puede reponer. Una intención de respaldo no es un respaldo.
  - **Reglas de negocio clave:** RN-009, RN-021
  - **Componentes de arquitectura involucrados:** [`files`](../02-architecture/architecture.md#26-files), [§7 Decisiones pendientes](../02-architecture/architecture.md#7-decisiones-pendientes--open-questions)
  - **Specs estimados:** 1

### Milestone 5: Blog y contacto (API)
*Objetivo:* que Erika publique sola y que el formulario de contacto deje de mentirle a quien lo usa.

- [ ] **Epic 5.1:** Artículos
  - **Dependencias:** Epic 3.1
  - **Tipo:** backend
  - **Descripción:** Tabla `Article`, listado público filtrable por búsqueda, categoría y etiqueta, lectura por slug, y publicación autenticada con slug derivado del título. Solo devuelve publicados. No hay edición ni retiro: ninguna capacidad de frontera los origina.
  - **Reglas de negocio clave:** RN-018, RN-019
  - **Componentes de arquitectura involucrados:** [`articles`](../02-architecture/architecture.md#23-articles), [`access`](../02-architecture/architecture.md#21-access)
  - **Operaciones del contrato:** `listArticles`, `getArticle`, `publishArticle`
  - **Bloqueado por:** `D-6` (destino de los artículos de ejemplo actuales)
  - **Specs estimados:** 3

- [ ] **Epic 5.2:** Mensajes de contacto
  - **Dependencias:** Epic 1.6
  - **Tipo:** backend
  - **Descripción:** Recibir el mensaje del formulario y entregarlo al correo de Erika. **No se persiste**: ninguna regla lo exige y guardarlo crearía un depósito de datos personales sin propósito. Si la entrega falla, responde de forma que la pantalla pueda ofrecer alternativas.
  - **Reglas de negocio clave:** RN-015, RN-021
  - **Componentes de arquitectura involucrados:** [`contact`](../02-architecture/architecture.md#24-contact), [`mail`](../02-architecture/architecture.md#25-mail)
  - **Operaciones del contrato:** `sendContactMessage`
  - **Nota de cumplimiento:** recibe nombre, correo y mensaje, pero **no los persiste**, así que no depende de Epic 1.7. El punto de recolección es la pantalla (Epic 7.3), que sí lo declara. El spec debe dejar esa línea escrita para que no parezca un olvido.
  - **Specs estimados:** 1

### Milestone 6: Zona privada y verificación (frontend)
*Objetivo:* que Erika opere sus certificados sin ayuda técnica, y que un tercero pueda verificar uno.

- [ ] **Epic 6.1:** Entrar a la zona privada
  - **Dependencias:** Epic 1.4, Epic 2.1, Epic 3.1
  - **Tipo:** pagina
  - **Descripción:** Pantalla `/admin/entrar`: pedir el código, canjearlo y sostener la sesión en todas las pantallas de `/admin`. Un reintento automático de solicitud invalidaría el código que Erika acaba de recibir, así que la pantalla no reintenta sola.
  - **Reglas de negocio clave:** RN-004
  - **Componentes de arquitectura involucrados:** [`admin`](../02-architecture/architecture.md#211-admin)
  - **Operaciones del contrato:** `requestAccessCode` (consume), `verifyAccessCode` (consume), `getSession` (consume), `endSession` (consume)
  - **Specs estimados:** 2

- [ ] **Epic 6.2:** Registrar un certificado
  - **Dependencias:** Epic 1.4, Epic 6.1, Epic 4.1
  - **Tipo:** pagina
  - **Descripción:** Pantalla `/admin/certificados/nuevo`: elegir tipo, escribir titular y correo, y obtener el código y el QR descargable. Debe dejar claro que el certificado **todavía no está emitido** — ese es el paso siguiente, después de que Erika diseñe el PDF.
  - **Reglas de negocio clave:** RN-005, RN-007, RN-011
  - **Componentes de arquitectura involucrados:** [`admin`](../02-architecture/architecture.md#211-admin)
  - **Operaciones del contrato:** `listCertificateTypes` (consume), `registerCertificate` (consume)
  - **Specs estimados:** 2

- [ ] **Epic 6.3:** Archivo y detalle de certificados
  - **Dependencias:** Epic 1.4, Epic 6.2, Epic 4.2, Epic 4.3, Epic 4.4, Epic 4.6
  - **Tipo:** pagina
  - **Descripción:** Pantallas `/admin/certificados` y `/admin/certificados/{id}`: buscar y filtrar el archivo, ver un certificado, subir su PDF para emitirlo, descargarlo y anularlo. Van juntas porque la misma pantalla de detalle carga, emite, descarga y anula. Debe mostrar el fallo de entrega cuando lo haya. Depende de Epic 4.6 (respaldo) porque es la pantalla desde la que Erika emite de verdad: no debe existir un camino por el que se emitan certificados reales antes de que el respaldo esté probado.
  - **Reglas de negocio clave:** RN-006, RN-008, RN-009, RN-010
  - **Componentes de arquitectura involucrados:** [`admin`](../02-architecture/architecture.md#211-admin)
  - **Operaciones del contrato:** `listCertificates` (consume), `getCertificate` (consume), `issueCertificate` (consume), `downloadCertificate` (consume), `revokeCertificate` (consume)
  - **Specs estimados:** 3

- [ ] **Epic 6.4:** Pantalla pública de verificación
  - **Dependencias:** Epic 1.4, Epic 6.3, Epic 4.5
  - **Tipo:** pagina
  - **Descripción:** Pantallas `/verificar` y `/verificar/:codigo`. El QR cae directo en la segunda; quien no puede escanear escribe el código en la primera. Debe funcionar aunque se llegue sin código, y remitir a Erika a quien perdió su certificado — el sitio no lo vuelve a entregar.
  - **Reglas de negocio clave:** RN-002, RN-006, RN-010
  - **Componentes de arquitectura involucrados:** [`verification`](../02-architecture/architecture.md#29-verification)
  - **Operaciones del contrato:** `verifyCertificate` (consume)
  - **Bloqueado por:** `D-2`
  - **Specs estimados:** 2

### Milestone 7: Blog y contacto (frontend)
*Objetivo:* activar el blog que hoy está apagado y que el formulario funcione de verdad.

- [ ] **Epic 7.1:** Blog público
  - **Dependencias:** Epic 1.4, Epic 2.1, Epic 5.1
  - **Tipo:** pagina
  - **Descripción:** Pantallas `/blog` y `/blog/:slug`, reemplazando las tres listas hardcodeadas y contradictorias que hoy conviven en el repositorio. Una lista vacía es una respuesta válida y debe verse digna, no rota.
  - **Reglas de negocio clave:** RN-019
  - **Componentes de arquitectura involucrados:** [`public-blog`](../02-architecture/architecture.md#210-public-blog)
  - **Operaciones del contrato:** `listArticles` (consume), `getArticle` (consume)
  - **Bloqueado por:** `D-6`
  - **Specs estimados:** 2

- [ ] **Epic 7.2:** Publicar un artículo
  - **Dependencias:** Epic 1.4, Epic 5.1, Epic 7.1, Epic 6.1
  - **Tipo:** pagina
  - **Descripción:** Pantalla `/admin/articulos/nuevo`, para que Erika publique sin intervención técnica. Es el requisito que convierte el blog en algo suyo y no en algo que depende de un desarrollador.
  - **Reglas de negocio clave:** RN-018, RN-019
  - **Componentes de arquitectura involucrados:** [`admin`](../02-architecture/architecture.md#211-admin)
  - **Operaciones del contrato:** `publishArticle` (consume)
  - **Specs estimados:** 2

- [ ] **Epic 7.3:** Formulario de contacto funcional
  - **Dependencias:** Epic 1.4, Epic 1.7, Epic 2.1, Epic 5.2
  - **Tipo:** pagina
  - **Descripción:** Reactivar el formulario que hoy está comentado y que responde "Mensaje No Enviado" a quien lo intenta. Ante un fallo de envío debe ofrecer WhatsApp y el correo directo en el mismo lugar y conservar lo que la persona escribió, para que el contacto no se pierda.
  - **Reglas de negocio clave:** RN-015, RN-016
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site)
  - **Operaciones del contrato:** `sendContactMessage` (consume)
  - **Nota de cumplimiento:** depende de Epic 1.7 aunque `RN-022` hable solo de titulares de certificado. Este formulario recoge nombre, correo y mensaje de un visitante, y `RN-021` (Ley 1581 de 2012) cubre todo dato personal: activarlo con `/aviso-privacidad` roto sería recoger datos sin aviso publicado.
  - **Specs estimados:** 2

### Milestone 8: Cierre operativo
*Objetivo:* que el sitio se encuentre en Google y que nada de lo que Erika no puede perder dependa de la suerte.

- [ ] **Epic 8.1:** Indexación y SEO
  - **Dependencias:** Epic 1.4, Epic 7.1
  - **Tipo:** pagina
  - **Descripción:** Garantizar que un buscador vea el contenido de la landing y del blog pese a que la aplicación se renderiza en el navegador, con metadatos por ruta. Las búsquedas que importan: su nombre, certificado de apoyo emocional con mascota, psicóloga online, orientación vocacional y desarrollo personal, y los síntomas que alimentan el blog.
  - **Reglas de negocio clave:** RN-017, RN-019, RN-020
  - **Componentes de arquitectura involucrados:** [`public-site`](../02-architecture/architecture.md#28-public-site), [`public-blog`](../02-architecture/architecture.md#210-public-blog)
  - **Bloqueado por:** la estrategia de indexación (`architecture.md` §7). Entre metadatos por ruta y un pipeline de prerender hay un orden de magnitud: **el tamaño de este epic no es estimable hasta cerrarla.**
  - **Specs estimados:** no estimable hasta cerrar la estrategia de indexación

---

## Reglas para Modificar este Archivo

1. **Solo el orquestador (`skills/build/SKILL.md`)** modifica los checkboxes durante construcción.
2. **Solo `skills/new-feature/SKILL.md`** agrega nuevos Milestones/Epics después de la planificación inicial.
3. **Al cerrar un milestone, reconcílialo y archívalo — no lo borres.** El coordinador de `build` (Step 8.7) consolida el comportamiento en `docs/05-specs/_current/<componente>.md` y, cuando el milestone deja de estar entre los ~2 cerrados más recientes, colapsa su bloque a una lápida. Nunca borres la lápida ni los IDs de epic.
4. **Cuando agregues un epic nuevo**, declara explícitamente sus dependencias contra los epics existentes.
