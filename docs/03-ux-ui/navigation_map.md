# Mapa de Navegación — Erika Caro Psicóloga

> Producido por la Fase 3 (`ux-design`) el 2026-09-12. **La tabla de §1 es la fuente legible por máquina** de `scripts/design-inventory.js --verify`.
>
> **Procedencia de las operaciones:** cada `operationId` de la columna 4 sale de la tabla de trazabilidad de `api-contract.md` §4, que ya mapea operación → pantalla. No se asignó ninguna por plausibilidad de nombre. Las rutas salen de la tabla que declara el Epic 1.3 del ROADMAP.

## 1. Pantallas

| Ruta | Pantalla | Auth | Operaciones consumidas | Estados declarados |
|---|---|---|---|---|
| `/` | Landing | `pública` | `sendContactMessage` | `cargando`, `error` |
| `/verificar` | Verificar un certificado | `pública` | `verifyCertificate` | `cargando`, `error` |
| `/verificar/:codigo` | Resultado de verificación | `pública` | `verifyCertificate` | `cargando`, `error` |
| `/blog` | Blog | `pública` | `listArticles` | `vacío`, `cargando`, `error` |
| `/blog/:slug` | Artículo | `pública` | `getArticle` | `cargando`, `error` |
| `/aviso-privacidad` | Aviso de privacidad | `pública` | — | — |
| `/terminos-condiciones` | Términos y condiciones | `pública` | — | — |
| `/dev/design-system` | Showcase del sistema de diseño | `pública` | — | — |
| `/admin/entrar` | Entrar a la zona privada | `pública` | `requestAccessCode`, `verifyAccessCode` | `cargando`, `error` |
| `/admin/certificados` | Archivo de certificados | `rol:admin` | `getSession`, `endSession`, `listCertificates` | `vacío`, `cargando`, `error`, `sin-permiso` |
| `/admin/certificados/nuevo` | Registrar certificado | `rol:admin` | `getSession`, `endSession`, `listCertificateTypes`, `registerCertificate` | `cargando`, `error`, `sin-permiso` |
| `/admin/certificados/:id` | Detalle de certificado | `rol:admin` | `getSession`, `endSession`, `getCertificate`, `issueCertificate`, `downloadCertificate`, `revokeCertificate` | `cargando`, `error`, `sin-permiso` |
| `/admin/articulos/nuevo` | Publicar artículo | `rol:admin` | `getSession`, `endSession`, `publishArticle` | `cargando`, `error`, `sin-permiso` |

> **Cobertura:** 13 pantallas · las 16 operaciones del contrato aparecen al menos una vez · `rol:admin` es el único rol además de `pública`, coherente con `RN-004` y `FA-007`.

## 2. Detalle por pantalla

### `/` — Landing
- **Propósito:** dar credibilidad a quien llega por referencia o por búsqueda, y que escriba el mismo día.
- **Elementos clave:** header con navegación por anclas y scroll-spy · seis secciones ancladas (`inicio`, `sobre-mi`, `servicios`, `grupo-apoyo`, `testimonios`, `contacto`) · botón flotante de agendar que aparece pasados 300 px de scroll · aviso de cambio de número al entrar (Epic 1.5) · footer con enlaces legales y redes.
- **Historias de usuario:** HU-SITE-001 a HU-SITE-008, HU-CONTACT-001.
- **Contenido real:** el título de servicio más largo es **"Certificado de Apoyo Emocional Asistido por Mascota"** (54 caracteres) y su descripción supera los 230; el testimonio más largo son 340 caracteres en un párrafo sin puntos; el número de WhatsApp se muestra como `+57 317 157 6141`; el correo `desarrollohumano@erikacaropsicologa.com` (39 caracteres) ya obliga a `break-all` en móvil.

### `/verificar` — Verificar un certificado
- **Propósito:** que un tercero que recibió un certificado compruebe si es auténtico, sin cuenta y sin conocer a Erika.
- **Elementos clave:** explicación de una línea de qué es este lugar (`CL-012`: se llega aquí sin código, desde un buscador) · campo para escribir el código impreso · aviso de que quien perdió su certificado debe pedírselo a Erika, no al sitio (`RN-010`, `FA-005`).
- **Historias de usuario:** HU-CERT-006.
- **Contenido real:** el código es la cadena no adivinable que genera `registerCertificate`; el campo debe aceptar pegado desde un PDF, con espacios y saltos de línea a los lados.

### `/verificar/:codigo` — Resultado de verificación
- **Propósito:** la respuesta. Es la pantalla más expuesta del sistema y a la que apunta el QR impreso.
- **Elementos clave:** estado en grande, acompañado siempre de etiqueta e ícono y nunca solo de color · nombre del titular · fecha de vencimiento o motivo de anulación según el estado · nada más (`RN-002`).
- **Historias de usuario:** HU-CERT-005, HU-CERT-006.
- **Contenido real:** cuatro desenlaces posibles — `valid`, `revoked` (con motivo, hasta 300 caracteres), `expired` (con fecha), y **no encontrado**, que responde igual para un código inexistente, uno malformado y uno de borrador (`CL-001`). El nombre de titular más largo admitido son 200 caracteres.

### `/blog` — Blog
- **Propósito:** contenido que atrae búsquedas por síntoma y sostiene la credibilidad entre consultas.
- **Elementos clave:** buscador · filtros por categoría y por etiqueta · listado paginado de tarjetas.
- **Historias de usuario:** HU-BLOG-001.
- **Contenido real:** **la lista vacía es el estado esperable al lanzar** (`CL-010`, y `D-6` sigue abierta sobre los artículos de ejemplo). Los títulos reales del contenido de muestra llegan a 55 caracteres ("5 Técnicas Efectivas para Gestionar el Estrés Laboral") y los resúmenes a 120.

### `/blog/:slug` — Artículo
- **Propósito:** la lectura.
- **Elementos clave:** título, fecha, categoría, etiquetas, cuerpo del artículo, vuelta al listado.
- **Historias de usuario:** HU-BLOG-002.
- **Contenido real:** el cuerpo llega como HTML desde `Article.content` — incluye `h2`, listas ordenadas y no ordenadas, negritas e imágenes. La tipografía del cuerpo tiene que sostener un texto largo, no tres líneas.

### `/aviso-privacidad` y `/terminos-condiciones`
- **Propósito:** cumplir `RN-022` antes de que el sitio recoja ningún dato personal.
- **Elementos clave:** documento de texto largo con encabezados y última fecha de actualización.
- **Historias de usuario:** HU-SITE-007.
- **Contenido real:** **lo entrega Erika o su abogado.** Ningún agente lo redacta. Hasta entonces la ruta no se monta.

### `/dev/design-system` — Showcase del sistema de diseño
- **Propósito:** la superficie donde el humano aprueba visualmente el sistema antes de que se construya ninguna página. Es el gate del que dependen los diez epics `pagina` del ROADMAP.
- **Elementos clave:** rampa de color con sus tokens · escala tipográfica · cada componente del roster de `design_system.md` §3 en todos sus estados · la matriz de contraste.
- **Historias de usuario:** ninguna — es superficie interna de desarrollo.
- **Contenido real:** se puebla con las cadenas más largas de este documento, no con "Lorem": buena parte de lo genérico de una interfaz generada viene de haberse diseñado sobre datos falsos.

### `/admin/entrar` — Entrar a la zona privada
- **Propósito:** que Erika entre sin contraseña.
- **Elementos clave:** campo de correo · campo de código de 6 dígitos · aviso de que el código llegó por correo y de que **pedir otro invalida el anterior**.
- **Historias de usuario:** HU-CERT-001.
- **Contenido real:** la respuesta a "pedir código" es la misma exista o no la dirección, así que el texto de confirmación no puede afirmar que el correo se envió a una cuenta válida. **La pantalla no reintenta sola** la solicitud.

### `/admin/certificados` — Archivo de certificados
- **Propósito:** que Erika encuentre lo que emitió.
- **Elementos clave:** buscador · filtro por estado con cuatro valores (`draft`, `issued`, `revoked`, `expired`) · listado paginado · acceso a registrar uno nuevo.
- **Historias de usuario:** HU-CERT-008.
- **Contenido real:** `expired` aparece en el filtro pero **no es un estado almacenado**: se deriva de la fecha de vencimiento. El listado devuelve una vista ligera sin el QR. Vacío es el estado del primer día.

### `/admin/certificados/nuevo` — Registrar certificado
- **Propósito:** el primer paso de la emisión — obtener el código y el QR **antes** de diseñar el PDF.
- **Elementos clave:** selector de los cuatro tipos · nombre y correo del titular · resultado con el código, el QR descargable y la URL de verificación · **aviso inequívoco de que el certificado todavía no está emitido**.
- **Historias de usuario:** HU-CERT-002.
- **Contenido real:** el nombre de tipo más largo es "Certificado de Apoyo Emocional Asistido por Mascota". El QR llega como SVG listo para pegar en el diseño. Si Erika cierra esta pantalla, el QR se recupera desde el detalle.

### `/admin/certificados/:id` — Detalle de certificado
- **Propósito:** el segundo paso y todo lo posterior: emitir, descargar, anular.
- **Elementos clave:** datos del certificado · subida del PDF · resultado del último intento de entrega · descarga del archivo · anulación con motivo, tras confirmación.
- **Historias de usuario:** HU-CERT-003, HU-CERT-007, HU-CERT-008.
- **Contenido real:** el caso incómodo tiene que verse — **si el correo falla, el certificado queda emitido igual** y la pantalla debe decirlo con claridad para que Erika lo reenvíe por otro canal. Un PDF sin el código impreso se rechaza y hay que explicar por qué. El motivo de anulación admite 300 caracteres y **será visible públicamente**: la pantalla tiene que advertirlo antes de guardar.

### `/admin/articulos/nuevo` — Publicar artículo
- **Propósito:** que Erika publique sin depender de nadie técnico.
- **Elementos clave:** título, resumen, categoría, etiquetas, cuerpo, imagen y su texto alternativo · aviso de que el enlace del artículo se deriva del título.
- **Historias de usuario:** HU-BLOG-003.
- **Contenido real:** el cuerpo es texto largo con formato. **No hay edición ni despublicación** — ninguna capacidad de frontera las origina (`D-5`), así que la pantalla debe dejar claro que publicar es definitivo por ahora.

## 3. Flujos críticos

Captación — el flujo que sostiene el propósito del sitio:

```
[Buscador o referencia] → [/ Landing] → (sobre-mi → servicios → testimonios)
                                      → [/ #contacto] → WhatsApp · Calendly · formulario
```

Emisión de un certificado — el único flujo que sale del sistema y vuelve:

```
[/admin/entrar] → [/admin/certificados/nuevo] → (código + QR)
      → [Erika diseña el PDF fuera del sistema]
      → [/admin/certificados/:id] → sube el PDF → emitido + correo al titular
```

Verificación — el flujo de un tercero que nunca vio el sitio:

```
[QR del PDF impreso] ─────────→ [/verificar/:codigo] → estado + titular
[código escrito a mano] → [/verificar] ──┘
```

Blog:

```
[/ Landing] o [buscador] → [/blog] → (búsqueda · categoría · etiqueta) → [/blog/:slug]
```

## 4. Huecos del contrato

- **G-01:** `/admin/certificados/:id` necesita **recuperar el QR de un borrador** cuya pantalla de registro se cerró. **Cubierto:** `getCertificate` devuelve `verificationUrl` y `qrSvg`, que se añadieron al schema `Certificate` en la Fase 2 precisamente por este caso.
- **G-02:** `/admin/articulos/nuevo` no tiene forma de **editar ni despublicar** un artículo. No es un hueco del contrato sino alcance no levantado: `D-5` lo dejó fuera porque ninguna capacidad de frontera lo origina. Si Erika lo necesita, entra por `new-feature`, no por aquí.
- **G-03:** ninguna pantalla puede **listar los borradores pendientes de emitir** de forma distinguida. `listCertificates` acepta `status=draft`, así que el dato existe; es una decisión de interfaz del Epic 6.3, no un hueco.

> Fuera de estos tres, **ninguna pantalla necesita un dato que el contrato no exponga.**

## 5. Cobertura de actores e historias

Las 21 historias de `business_requirements.md` son alcanzables: `HU-SITE-001`…`008` y `HU-CONTACT-001` desde `/`; `HU-CERT-001` desde `/admin/entrar`; `HU-CERT-002` desde `/admin/certificados/nuevo`; `HU-CERT-003`, `007` y `008` desde `/admin/certificados` y su detalle; `HU-CERT-005` y `006` desde `/verificar`; `HU-BLOG-001` y `002` desde `/blog`; `HU-BLOG-003` desde `/admin/articulos/nuevo`. `HU-CERT-004` y `HU-CONTACT-002` están marcadas `Interna`: son efectos —un correo que llega— y no necesitan pantalla.

Entradas por actor: **visitante** y **motor de búsqueda** → `/` y `/blog` · **mujer interesada en el grupo** → `/` sección `grupo-apoyo` · **verificador externo** → `/verificar` o el QR · **Erika** → `/admin/entrar`.

> **El titular de un certificado no tiene entrada al sitio, y es deliberado.** Recibe su certificado por correo y, si lo pierde, se lo pide a Erika (`RN-010`, `FA-005`). No hay pantalla para él porque no hay capacidad que se la dé — no es un hueco de cobertura, es alcance excluido.
