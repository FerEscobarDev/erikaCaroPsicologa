# Contrato de API: Erika Caro Psicóloga

> **Fuente de verdad machine-readable:** `docs/02-architecture/api-contract.openapi.yaml` (declarado en `stack.yml.api.contract_file`).
> Este documento es la versión legible del mismo contrato. **Si discrepan, gana el `.openapi.yaml`.**
>
> Este contrato es la **única fuente de verdad de la interfaz backend↔frontend**. Los specs de backend *implementan* operaciones y el mapa de navegación y los specs de frontend las *consumen*, siempre por su `operationId`. Nadie reinventa URLs, métodos ni shapes fuera de aquí.

## 1. Convenciones globales

- **Base URL:** `/api/v1`, **bajo el mismo origen que el sitio público.** No es un detalle de infraestructura: la sesión viaja en una cookie `HttpOnly`, que no sobrevive a orígenes distintos sin CORS con credenciales. ADR-002 despliega dos aplicaciones Dokploy y ambas deben quedar tras el mismo origen (`architecture.md` §3).
- **Versionado:** prefijo de path `/v1`.
- **Esquema de autenticación:** cookie `HttpOnly` llamada `session`, emitida por `verifyAccessCode`. Sin contraseñas (ADR-002). Las operaciones marcadas *Público* no la requieren.
- **Roles:** solo dos — **Público** (visitante y verificador externo, sin identificación) y **Admin** (Erika, única dirección autorizada: `RN-004`, `FA-007`).
- **Idioma:** identificadores en **inglés** (`conventions.md` §8); la prosa descriptiva, en español. Los nombres legibles que ve Erika (como `CertificateType.name`) van en español porque son contenido, no identificadores.
- **Formato de fecha/hora:** ISO-8601 en UTC. Se presenta al usuario en hora de Colombia (UTC−5).
- **Envelope de error estándar:** `{ code: string, message: string, details?: object }`. `code` es un valor de la enumeración de §2; `message` es texto para la persona y **nunca** contiene datos de un titular ni detalles internos.
- **Códigos de estado usados:** 200, 201, 202, 204, 401, 404, 409, 422, 429, 500, 502.
- **Cada operación declara sus códigos de error** en su campo `x-error-codes` del `.openapi.yaml`. Las respuestas compartidas (`BadRequest`, `NotFound`, `Conflict`, `TooManyRequests`) se reutilizan entre operaciones, así que **no** fijan un `code`: el aplicable lo dice la operación. Toda operación puede además devolver `500 INTERNAL_ERROR` ante un fallo de infraestructura (`architecture.md` §5.3).
- **Paginación:** `?page=&size=` → `{ items, total, page, size }`.
- **Filtros / búsqueda:** `?search=&category=&tag=&status=`.

## 2. Esquemas compartidos (DTOs)

### `Error`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `code` | `string` | sí | 15 valores: `INVALID_DATA`, `SESSION_REQUIRED`, `INVALID_ACCESS_CODE`, `TOO_MANY_ACCESS_ATTEMPTS`, `RATE_LIMITED`, `CERTIFICATE_NOT_FOUND`, `CERTIFICATE_NOT_DRAFT`, `CERTIFICATE_NOT_ISSUED`, `CERTIFICATE_NOT_REVOCABLE`, `INVALID_FILE`, `FILE_MISSING_CODE`, `DELIVERY_FAILED`, `ARTICLE_NOT_FOUND`, `ARTICLE_SLUG_TAKEN`, `INTERNAL_ERROR` |
| `message` | `string` | sí | Texto para la persona |
| `details` | `object` | no | Contexto adicional |

> Ninguna capa inventa códigos fuera de esta lista (`architecture.md` §5.3). Si un caso nuevo no encaja, se agrega **aquí** primero.

### `CertificateType`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `slug` | `string` | sí | `emotional-support-animal` · `attendance` · `care-record` · `assessment` (`RN-011`) |
| `name` | `string` | sí | Nombre legible en español, para mostrar a Erika |
| `validityMonths` | `integer\|null` | sí | Nulo = no vence. **Los valores concretos dependen de `D-1`, que sigue abierta.** |

### `NewCertificate`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `typeSlug` | `string` | sí | Uno de los cuatro tipos |
| `holderName` | `string` | sí | 1–200 caracteres |
| `holderEmail` | `string` | sí | Necesario para `RN-008` |

> `RN-007` acota el conjunto: nada clínico, ningún motivo de emisión.

### `CertificateDraft`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `id` | `uuid` | sí | |
| `code` | `string` | sí | No adivinable, de fuente aleatoria criptográfica (`RN-001`) |
| `verificationUrl` | `uri` | sí | Lo que codifica el QR. **Irreversible una vez impresa en un PDF** |
| `qrSvg` | `string` | sí | El QR como SVG, para pegar en el diseño |
| `status` | `string` | sí | Siempre `draft` |

> Materializa `RN-005`: el código y el QR existen **antes** de que el PDF se diseñe, y un borrador no es verificable.

### `Certificate`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `id` | `uuid` | sí | |
| `code` | `string` | sí | |
| `typeSlug` | `string` | sí | |
| `holderName` | `string` | sí | |
| `holderEmail` | `string` | sí | |
| `status` | `string` | sí | `draft` · `issued` · `revoked`. **`expired` no se almacena**: se deriva de `expiresAt` |
| `issuedAt` | `date-time\|null` | no | Nula mientras es borrador |
| `expiresAt` | `date-time\|null` | no | Nula si el tipo no vence |
| `revocationReason` | `string\|null` | no | |
| `revokedAt` | `date-time\|null` | no | |
| `verificationUrl` | `uri` | sí | Igual que en `CertificateDraft`. Se reexpone para que un borrador cuya pantalla se cerró recupere su QR |
| `qrSvg` | `string` | sí | Igual que en `CertificateDraft`. Solo para Erika |
| `lastDelivery` | `CertificateDelivery\|null` | no | Hace visible `CL-006` |

> Vista completa, **solo para Erika**. Nunca se devuelve en la verificación pública.

### `CertificateDelivery`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `status` | `string` | sí | `sent` · `failed` |
| `attemptedAt` | `date-time` | sí | |
| `errorDetail` | `string\|null` | no | |

### `VerificationResult`
| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `status` | `string` | sí | `valid` · `revoked` · `expired`. `valid` y `expired` salen ambos de `status = issued`, según `expiresAt` |
| `holderName` | `string` | sí | `RN-002`: permite confirmar que el certificado es de quien lo entregó |
| `expiresAt` | `date-time\|null` | no | `CL-003`. Nula si el tipo no vence |
| `revocationReason` | `string\|null` | no | `RN-006` / `CL-002`. Solo cuando `status = revoked` |

> **Lista cerrada.** `architecture.md` §6 enumera exactamente estos cuatro campos. `revokedAt` existe en `Certificate` (la vista de Erika) pero **no aquí**: ninguna regla lo autoriza — `RN-002` no lo incluye y `CL-002` no lo exige.

> ⚠ **Shape provisional — depende de `D-2`.** Hoy modela los tres estados por separado. Si se decide que `revoked` y `expired` deben ser indistinguibles de "no existe", este shape cambia y es un **breaking change con ADR**. El epic de verificación no debe arrancar antes de cerrar `D-2`.
>
> El `motivo` que `RN-002` prohíbe es el de **emisión** (dato clínico); el que `RN-006` exige es el de **anulación** (administrativo). Son datos distintos.

### `NewArticle` — nota sobre el slug

`slug` es **opcional** en la entrada. Si se omite, la API lo deriva del `title` (minúsculas, sin acentos, espacios a guiones). Es la clave única del artículo (`architecture.md` §4) y lo que colisiona en `409 ARTICLE_SLUG_TAKEN`.

### Otros DTOs

`AccessCodeRequest` · `AccessCodeVerification` · `Session` · `Revocation` · `ArticleSummary` · `Article` · `ArticlePage` · `CertificatePage` · `ContactMessage` — ver el `.openapi.yaml`, que es la fuente de verdad de sus campos.

## 3. Operaciones

| operationId | Método | Path | Auth / Rol | Request | Response éxito | Response error | Idempotente | Epic(s) |
|-------------|--------|------|------------|---------|----------------|----------------|-------------|---------|
| `requestAccessCode` | POST | `/access/codes` | Público | body: `AccessCodeRequest` | `202` sin cuerpo | `422` `INVALID_DATA` · `429` `RATE_LIMITED` (límite de envíos) | **no** | Epic 3.1 back / Epic 6.1 front |
| `verifyAccessCode` | POST | `/access/sessions` | Público | body: `AccessCodeVerification` | `201` → `Session` + cookie | `401` `INVALID_ACCESS_CODE` · `422` · `429` `TOO_MANY_ACCESS_ATTEMPTS` | no | Epic 3.1 back / Epic 6.1 front |
| `getSession` | GET | `/access/session` | Admin | — | `200` → `Session` | `401` | sí | Epic 3.1 back / Epic 6.1 front |
| `endSession` | DELETE | `/access/session` | Admin | — | `204` | `401` | sí | Epic 3.1 back / Epic 6.1 front |
| `listCertificateTypes` | GET | `/certificate-types` | Admin | — | `200` → `CertificateType[]` | `401` | sí | Epic 4.1 back / Epic 6.2 front |
| `registerCertificate` | POST | `/certificates` | Admin | body: `NewCertificate` | `201` → `CertificateDraft` | `401` · `422` | no | Epic 4.1 back / Epic 6.2 front |
| `listCertificates` | GET | `/certificates` | Admin | query: `search`, `status`, `page`, `size` | `200` → `CertificatePage` (ítems `CertificateSummary`) | `401` | sí | Epic 4.2 back / Epic 6.3 front |
| `getCertificate` | GET | `/certificates/{id}` | Admin | — | `200` → `Certificate` | `401` · `404` | sí | Epic 4.2 back / Epic 6.3 front |
| `issueCertificate` | POST | `/certificates/{id}/issuance` | Admin | multipart: `file` (PDF) | `200` → `Certificate` | `401` · `404` · `409` `CERTIFICATE_NOT_DRAFT` · `422` `FILE_MISSING_CODE` o `INVALID_FILE` · `502` `DELIVERY_FAILED` | no | Epic 4.3 back / Epic 6.3 front |
| `downloadCertificate` | GET | `/certificates/{id}/file` | Admin | — | `200` → `application/pdf` | `401` · `404` · `409` `CERTIFICATE_NOT_ISSUED` | sí | Epic 4.3 back / Epic 6.3 front |
| `revokeCertificate` | POST | `/certificates/{id}/revocation` | Admin | body: `Revocation` | `200` → `Certificate` | `401` · `404` · `409` `CERTIFICATE_NOT_REVOCABLE` · `422` | no | Epic 4.4 back / Epic 6.3 front |
| `verifyCertificate` | GET | `/verification/{code}` | Público | — | `200` → `VerificationResult` | `404` `CERTIFICATE_NOT_FOUND` · `429` `RATE_LIMITED` | sí | Epic 4.5 back / Epic 6.4 front |
| `listArticles` | GET | `/articles` | Público | query: `search`, `category`, `tag`, `page`, `size` | `200` → `ArticlePage` | — | sí | Epic 5.1 back / Epic 7.1 front |
| `getArticle` | GET | `/articles/{slug}` | Público | — | `200` → `Article` | `404` `ARTICLE_NOT_FOUND` | sí | Epic 5.1 back / Epic 7.1 front |
| `publishArticle` | POST | `/articles` | Admin | body: `NewArticle` | `201` → `Article` | `401` · `409` `ARTICLE_SLUG_TAKEN` · `422` | no | Epic 5.1 back / Epic 7.2 front |
| `sendContactMessage` | POST | `/contact-messages` | Público | body: `ContactMessage` | `202` sin cuerpo | `422` `INVALID_DATA` · `429` `RATE_LIMITED` · `502` `DELIVERY_FAILED` | no | Epic 5.2 back / Epic 7.3 front |

### Detalle por operación

#### `requestAccessCode`
- **Propósito:** que Erika pida su código de entrada.
- **Efectos secundarios:** genera un OTP, guarda su hash con expiración, envía el correo.
- **No es idempotente:** cada llamada genera un código nuevo e **invalida el anterior**. Una pantalla que reintente automáticamente dejaría inservible el código que Erika acaba de recibir.
- **El `429` de esta operación es un límite de envíos** (`RATE_LIMITED`), distinto del `429` de `verifyAccessCode`, que cuenta intentos fallidos de canje (`TOO_MANY_ACCESS_ATTEMPTS`, el contador `AccessCode.attempts`).
- **Nota de seguridad:** responde `202` exista o no la dirección. Revelar cuál es la autorizada facilitaría dirigir ataques contra ella.

#### `registerCertificate`
- **Propósito:** primer paso de la emisión. Devuelve lo que Erika necesita para diseñar el PDF.
- **Efectos secundarios:** crea el certificado en estado `draft`; genera el `code` con una fuente aleatoria criptográfica (`RN-001`) y el `qrSvg` que lo representa.
- **Notas de consumo frontend:** el `qrSvg` se ofrece para descargar. La pantalla debe dejar claro que el certificado **todavía no está emitido**.

#### `issueCertificate`
- **Propósito:** segundo paso. Convierte el borrador en un certificado verificable.
- **Errores de negocio:** el PDF no lleva impreso el código → `422 FILE_MISSING_CODE` (`CL-005`); el certificado ya no es borrador → `409 CERTIFICATE_NOT_DRAFT`; el archivo no es un PDF válido → `422 INVALID_FILE`.
- **Efectos secundarios:** guarda el PDF en el volumen, marca el certificado como `issued`, calcula `expiresAt` según el tipo, envía el PDF al titular (`RN-008`) y registra el intento (`CL-006`).
- **Caso incómodo, resuelto explícitamente:** si el correo falla, el certificado **ya quedó emitido** y la respuesta es `502 DELIVERY_FAILED`. No se revierte — el certificado es válido aunque no se haya podido entregar, y revertir dejaría a Erika con un código ya impreso en un PDF que no corresponde a nada. La pantalla debe decírselo para que lo reenvíe por otro canal.

#### `verifyCertificate`
- **Propósito:** la operación más expuesta del sistema. Un tercero comprueba un certificado.
- **Response éxito:** `200` → `VerificationResult`, con solo lo que `RN-002` autoriza más lo que `CL-002`/`CL-003` exigen.
- **Errores de negocio:** código inexistente, malformado, o correspondiente a un **borrador** → todos responden igual: `404 CERTIFICATE_NOT_FOUND`, sin revelar cuál es el caso (`CL-001`). Exceso de consultas → `429 RATE_LIMITED` (`CL-004`).
- **Notas de consumo frontend:** sirve las dos vías de acceso — el QR codifica la URL de la pantalla de verificación, que llama a esta misma operación, y quien no puede escanear escribe el código a mano (`CL-009`). La pantalla debe funcionar también sin código en la URL (`CL-012`).

#### `sendContactMessage`
- **Efectos secundarios:** entrega al correo de Erika y **descarta** el mensaje. No se persiste.
- **Notas de consumo frontend:** ante `502`, la pantalla ofrece WhatsApp y el correo directo en el mismo lugar y conserva lo que la persona escribió (`RN-016`).

## 4. Trazabilidad

| operationId | Capacidad / HU origen | Exposición | Implementa (epic back) | Consume (pantalla / consumidor) | Estado |
|-------------|----------------------|------------|------------------------|---------------------------------|--------|
| `requestAccessCode` | HU-CERT-001 | UI | Epic 3.1 | `/admin/entrar` | ☐ |
| `verifyAccessCode` | HU-CERT-001 | UI | Epic 3.1 | `/admin/entrar` | ☐ |
| `getSession` | HU-CERT-001 | UI | Epic 3.1 | todas las pantallas de `/admin` | ☐ |
| `endSession` | HU-CERT-001 | UI | Epic 3.1 | todas las pantallas de `/admin` | ☐ |
| `listCertificateTypes` | HU-CERT-002 | UI | Epic 4.1 | `/admin/certificados/nuevo` | ☐ |
| `registerCertificate` | HU-CERT-002 | UI | Epic 4.1 | `/admin/certificados/nuevo` | ☐ |
| `listCertificates` | HU-CERT-008 | UI | Epic 4.2 | `/admin/certificados` (Epic 6.3 front) | ☐ |
| `getCertificate` | HU-CERT-008 | UI | Epic 4.2 | `/admin/certificados/{id}` | ☐ |
| `issueCertificate` | HU-CERT-003 | UI | Epic 4.3 | `/admin/certificados/{id}` (Epic 6.3 front) | ☐ |
| `downloadCertificate` | HU-CERT-008 | UI | Epic 4.3 | `/admin/certificados/{id}` | ☐ |
| `revokeCertificate` | HU-CERT-007 | UI | Epic 4.4 | `/admin/certificados/{id}` | ☐ |
| `verifyCertificate` | HU-CERT-005, HU-CERT-006 | UI | Epic 4.5 | `/verificar`, `/verificar/{codigo}` · verificador externo | ☐ |
| `listArticles` | HU-BLOG-001 | UI | Epic 5.1 | `/blog` | ☐ |
| `getArticle` | HU-BLOG-002 | UI | Epic 5.1 | `/blog/{slug}` | ☐ |
| `publishArticle` | HU-BLOG-003 | UI | Epic 5.1 | `/admin/articulos/nuevo` | ☐ |
| `sendContactMessage` | HU-CONTACT-001 | UI | Epic 5.2 | `/#contacto` | ☐ |

**Cobertura hacia arriba:** las 16 operaciones trazan a una capacidad de frontera. No hay ninguna sin origen.

> **Las pantallas de `/admin/certificados` y `/admin/certificados/{id}` van juntas en el Epic 6.3 front**: `getCertificate` las carga y `issueCertificate`, `downloadCertificate` y `revokeCertificate` actúan sobre ellas. Repartirlas dejaría un epic consumiendo una pantalla que otro todavía no sabe cargar.

> **La verificación pública va en su propio epic (4.5), separada de la anulación (4.3).** `D-2` bloquea el shape de `VerificationResult`, y agruparlas dejaría la anulación bloqueada por una decisión que no le concierne.

### Capacidades de frontera servidas **sin** operación de API

> Cobertura hacia abajo. Estas capacidades de `business_requirements.md` §Capacidades de Frontera **no** generan operación, y eso es deliberado: son contenido que el sitio sirve directamente, versionado con el código. Inventarles un endpoint sería sobre-diseño — la misma regla que prohíbe operaciones sin capacidad de origen prohíbe endpoints que nadie necesita. **Su contrato es el `navigation_map.md` de la Fase 3**, no este documento.

| Capacidad | Consumidor | Quién la sirve | Por qué no necesita operación |
|-----------|-----------|----------------|-------------------------------|
| HU-SITE-001 | Visitante | `public-site` | El perfil profesional de Erika es texto fijo del sitio. |
| HU-SITE-002 | Visitante | `public-site` | Los cinco servicios son contenido editorial, no un catálogo administrable. |
| HU-SITE-003 | Visitante | `public-site` | Los testimonios son fijos y `RN-019` prohíbe generarlos o alterarlos. |
| HU-SITE-004 | Visitante | `public-site` | Los canales son enlaces externos (Calendly, WhatsApp, `mailto:`). El sistema no los intermedia. |
| HU-SITE-005 | Mujer interesada en el grupo | `public-site` | Enlace de WhatsApp con mensaje precargado. Sale del sistema. |
| HU-SITE-006 | Visitante | `public-site` | El aviso y su fecha límite son configuración del sitio (`RN-014`, `D-4`). |
| HU-SITE-007 | Visitante | `public-site` | Aviso de privacidad y términos son páginas de contenido fijo. |
| HU-SITE-008 | Motor de búsqueda | `public-site`, `public-blog` | La indexación consume las mismas páginas; no hay superficie propia. Cómo se garantiza que el buscador vea el contenido sigue abierto (`architecture.md` §7). |

> HU-CERT-004 (el titular recibe su certificado por correo) está marcada `Interna` en los requerimientos: es un efecto de `issueCertificate`, no una capacidad consumida. Lo mismo HU-CONTACT-002, que es el efecto de `sendContactMessage`.

## 5. Reglas de evolución del contrato

- **Aditivo es seguro:** agregar una operación nueva o un campo opcional no rompe consumidores.
- **Breaking changes requieren ADR:** renombrar o eliminar un `operationId`, cambiar método o path, quitar un campo, o cambiar el tipo de uno existente. Registrar en `.specture/decisions/` y notificar a los epics afectados.
- **Dos cambios ya previstos, ambos con ADR cuando ocurran:** cerrar `D-2` puede alterar `VerificationResult` y las respuestas de `verifyCertificate`; y la ruta pública de la pantalla de verificación queda **congelada a partir del primer certificado emitido**, porque cambiarla invalida los QR ya impresos.
- **El cliente tipado del frontend se regenera desde el `.openapi.yaml`** tras cualquier cambio — nunca se editan URLs a mano.

---

*Mantener sincronizado con `docs/02-architecture/api-contract.openapi.yaml`. Prosa de negocio en español; identificadores en inglés por `conventions.md` §8.*
