# Requerimientos de Negocio — Erika Caro Psicóloga

> Producido por la Fase 1 (`discover`) el 2026-09-11. Lenguaje de negocio, sin tecnología.
> **IDs estables:** toda regla (`RN-nnn`), caso límite (`CL-nnn`) y exclusión (`FA-nnn`)
> lleva un ID secuencial de 3 dígitos. Los IDs nunca se renumeran ni se reutilizan:
> specs, ROADMAP y `_current/` citan por ID.
> **Modo Adopt:** el sitio ya existe en producción. Las historias marcadas *(ya en producción)*
> describen lo que el sistema hace hoy; el resto es capacidad nueva o pendiente.

## Propósito

Dar credibilidad profesional a Erika Andrea Caro, psicóloga especialista en neuropsicología y educación, ante quien llega a su sitio por referencia o por búsqueda. El objetivo que manda cuando dos cosas compiten es que el visitante se lleve la certeza de que es una profesional seria y calificada, y que termine escribiéndole el mismo día.

Sobre esa base se añade una capacidad que hoy no existe: **emitir certificados verificables**. Erika expide certificados de distintos motivos (apoyo emocional con mascota, asistencia, constancia de atención, valoración psicológica) que sus titulares presentan ante terceros — aerolíneas, empleadores, instituciones educativas, entidades de salud o jurídicas. Hoy eso se resuelve subiendo PDFs sueltos al repositorio del sitio, sin forma de verificarlos y sin control sobre quién accede: una solución rápida que el propio equipo reconoce como mala práctica.

## Actores

- **Visitante** — persona que busca ayuda psicológica para sí misma o para alguien cercano. Llega por referencia, por redes o por búsqueda. Su restricción: llega muchas veces en mal momento emocional y con poca paciencia para navegar.
- **Mujer interesada en el grupo de apoyo** — busca comunidad y acompañamiento psicoeducativo, no necesariamente terapia individual. Entra al grupo "Amiga, no estás sola" por WhatsApp.
- **Titular de certificado** — persona a la que Erika le emitió un certificado. Lo recibe por correo y lo presenta ante un tercero. No tiene cuenta ni acceso al sistema.
- **Verificador externo** *(consumidor externo)* — quien recibe un certificado y necesita confirmar que es auténtico: aerolíneas y empresas de transporte, empleadores e instituciones educativas, entidades de salud o actores de procesos jurídicos. No conoce a Erika, no tiene cuenta y llega al sitio solo para verificar.
- **Erika Caro** — psicóloga, dueña del negocio y única persona autorizada a emitir y anular certificados y a publicar contenido. Su restricción: no es técnica; todo lo que necesite hacer debe poder hacerlo sin ayuda de un desarrollador.
- **Motor de búsqueda** *(consumidor externo, no humano)* — indexa el sitio público. Es la vía por la que debe llegar quien no conoce a Erika.

## Historias de Usuario

> Cada una con ID estable, actor y **Exposición** (`UI` / `API-externa` / `Interna`).

### Sitio público

- **HU-SITE-001:** Como visitante quiero conocer la formación, el enfoque y la experiencia de Erika para decidir si le confío mi proceso · Actor: Visitante · Exposición: `UI` *(ya en producción)*
- **HU-SITE-002:** Como visitante quiero ver qué servicios ofrece y entender cuál me corresponde · Actor: Visitante · Exposición: `UI` *(ya en producción)*
- **HU-SITE-003:** Como visitante quiero leer experiencias de otras personas que la consultaron · Actor: Visitante · Exposición: `UI` *(ya en producción)*
- **HU-SITE-004:** Como visitante quiero contactarla por el canal que me resulte más cómodo — WhatsApp, correo o agendamiento directo · Actor: Visitante · Exposición: `UI` *(ya en producción)*
- **HU-SITE-005:** Como mujer interesada quiero conocer el grupo "Amiga, no estás sola" y pedir unirme · Actor: Mujer interesada en el grupo de apoyo · Exposición: `UI` *(ya en producción)*
- **HU-SITE-006:** Como visitante quiero enterarme al entrar de que el número de contacto cambió, para no escribir al viejo · Actor: Visitante · Exposición: `UI`
- **HU-SITE-007:** Como visitante quiero leer el aviso de privacidad y los términos y condiciones · Actor: Visitante · Exposición: `UI`
- **HU-SITE-008:** Como motor de búsqueda quiero entender de qué trata cada página para mostrarla a quien busca ayuda psicológica · Actor: Motor de búsqueda · Exposición: `UI`

### Contacto

- **HU-CONTACT-001:** Como visitante quiero escribirle a Erika desde el sitio sin salir a otra aplicación · Actor: Visitante · Exposición: `UI`
- **HU-CONTACT-002:** Como Erika quiero recibir en mi correo los mensajes que dejan en el sitio · Actor: Erika Caro · Exposición: `Interna`

### Certificados

- **HU-CERT-001:** Como Erika quiero entrar a una zona privada con mis credenciales para gestionar certificados y contenido · Actor: Erika Caro · Exposición: `UI`
- **HU-CERT-002:** Como Erika quiero registrar los datos de un certificado y obtener su código de verificación y su QR, para incorporarlos al diseño antes de imprimirlo · Actor: Erika Caro · Exposición: `UI`
- **HU-CERT-003:** Como Erika quiero subir el PDF ya diseñado, con el código y el QR impresos, para dejar el certificado emitido · Actor: Erika Caro · Exposición: `UI`
- **HU-CERT-004:** Como titular quiero recibir mi certificado en mi correo apenas Erika lo emite · Actor: Titular de certificado · Exposición: `Interna`
- **HU-CERT-005:** Como verificador quiero escanear el QR del certificado y confirmar de inmediato si es auténtico y de quién es · Actor: Verificador externo · Exposición: `UI`
- **HU-CERT-006:** Como verificador quiero escribir el código impreso cuando no puedo escanear, y obtener la misma confirmación · Actor: Verificador externo · Exposición: `UI`
- **HU-CERT-007:** Como Erika quiero anular un certificado emitido, dejando el motivo visible a quien lo verifique · Actor: Erika Caro · Exposición: `UI`
- **HU-CERT-008:** Como Erika quiero consultar el archivo de los certificados que he emitido y recuperar el PDF de cualquiera · Actor: Erika Caro · Exposición: `UI`

### Blog

- **HU-BLOG-001:** Como visitante quiero recorrer los artículos publicados y filtrarlos por tema para encontrar lo que me interesa · Actor: Visitante · Exposición: `UI`
- **HU-BLOG-002:** Como visitante quiero leer un artículo completo · Actor: Visitante · Exposición: `UI`
- **HU-BLOG-003:** Como Erika quiero publicar un artículo por mi cuenta, sin depender de nadie técnico · Actor: Erika Caro · Exposición: `UI`

## Capacidades de Frontera

> Historias marcadas `UI` o `API-externa`, con su consumidor. Es el input directo de la Fase 2.

**Consumidas por el visitante (público, sin identificación):**

- **HU-SITE-001** — consumidor: Visitante — conocer el perfil profesional de Erika.
- **HU-SITE-002** — consumidor: Visitante — conocer la oferta de servicios.
- **HU-SITE-003** — consumidor: Visitante — leer testimonios.
- **HU-SITE-004** — consumidor: Visitante — acceder a los canales de contacto y agendamiento.
- **HU-SITE-005** — consumidor: Mujer interesada en el grupo de apoyo — solicitar ingreso al grupo.
- **HU-SITE-006** — consumidor: Visitante — recibir el aviso de cambio de número de contacto.
- **HU-SITE-007** — consumidor: Visitante — consultar aviso de privacidad y términos.
- **HU-SITE-008** — consumidor: Motor de búsqueda — indexar el contenido público.
- **HU-CONTACT-001** — consumidor: Visitante — enviar un mensaje a Erika.
- **HU-BLOG-001** — consumidor: Visitante — listar y filtrar artículos.
- **HU-BLOG-002** — consumidor: Visitante — leer un artículo.

**Consumidas por el verificador externo (público, sin identificación):**

- **HU-CERT-005** — consumidor: Verificador externo — verificar un certificado por QR.
- **HU-CERT-006** — consumidor: Verificador externo — verificar un certificado por código escrito.

**Consumidas por Erika (requieren identificación):**

- **HU-CERT-001** — consumidor: Erika Caro — acceder a la zona privada.
- **HU-CERT-002** — consumidor: Erika Caro — generar código de verificación y QR de un certificado nuevo.
- **HU-CERT-003** — consumidor: Erika Caro — subir el PDF y dejar el certificado emitido.
- **HU-CERT-007** — consumidor: Erika Caro — anular un certificado.
- **HU-CERT-008** — consumidor: Erika Caro — consultar el archivo de certificados emitidos.
- **HU-BLOG-003** — consumidor: Erika Caro — publicar un artículo.

## Reglas de Negocio

### Certificados

- **RN-001:** El código de verificación de un certificado no puede deducirse a partir de otro. Nada de numeración secuencial ni predecible: quien no tenga el certificado en la mano no puede llegar al código.
- **RN-002:** La verificación muestra únicamente el estado del certificado y el nombre de su titular. Nunca el motivo, ningún dato clínico, ni el archivo del certificado.
- **RN-003:** Todo certificado tiene una vigencia que depende de su tipo. Las vigencias concretas de cada tipo están `sin definir` y deben cerrarse antes de construir esta capacidad.
- **RN-004:** Erika Caro es la única persona autorizada a emitir y a anular certificados.
- **RN-005:** El código de verificación y el QR se generan **antes** de que Erika diseñe el PDF. Ella los incorpora a su diseño y después sube el archivo terminado: un certificado no queda emitido hasta que su PDF está cargado.
- **RN-006:** Un certificado anulado muestra, al verificarse, que está anulado y por qué.
- **RN-007:** Del titular solo se guardan nombre, correo electrónico, tipo de certificado, fecha de emisión y vigencia. Ningún dato clínico, ningún diagnóstico, ningún motivo detallado.
- **RN-008:** Al quedar emitido, el certificado se envía como adjunto al correo del titular.
- **RN-009:** El PDF queda archivado para Erika. No es accesible al verificador ni descargable desde la verificación.
- **RN-010:** Si el titular pierde su certificado, debe solicitárselo a Erika por un canal directo. El sitio no ofrece re-descarga.
- **RN-011:** Los cuatro tipos de certificado que Erika emite son: apoyo emocional asistido por mascota, asistencia o participación, constancia de atención psicológica, y valoración o concepto psicológico.

### Contacto y comunicación

- **RN-012:** El número de contacto vigente es **+57 317 157 6141**. Debe ser el mismo en todos los puntos del sitio donde aparezca un teléfono o un enlace de WhatsApp.
- **RN-013:** El aviso de cambio de número se muestra a todo visitante al entrar, puede cerrarse, y vuelve a mostrarse en la siguiente visita.
- **RN-014:** El aviso de cambio de número deja de mostrarse solo, al cumplirse su fecha límite, sin que nadie tenga que intervenir. Su vigencia es de dos meses contados desde su publicación.
- **RN-015:** Los mensajes del formulario de contacto llegan al correo `desarrollohumano@erikacaropsicologa.com`.
- **RN-016:** Si el envío de un mensaje falla, se le ofrecen al visitante WhatsApp y el correo directo en el mismo lugar, para que el contacto no se pierda.
- **RN-017:** La atención de Erika es exclusivamente online. El sitio no comunica dirección física ni atención presencial.
- **RN-023:** El aviso de cambio de número **explica el motivo**: inconvenientes técnicos con la línea anterior. *(añadido por hotfix `nuevo-numero-contacto`, 2026-09-12)*
- **RN-024:** El número anterior **sigue disponible, pero únicamente por Telegram**. El aviso lo dice, para que quien lo tenga guardado sepa que no está muerto sino que cambió de canal. *(añadido por hotfix `nuevo-numero-contacto`, 2026-09-12)*
- **RN-025:** El aviso pide explícitamente a quien escribió al número anterior y no recibió respuesta que **vuelva a escribir** al nuevo. Es el mensaje que recupera contactos perdidos durante el corte. *(añadido por hotfix `nuevo-numero-contacto`, 2026-09-12)*
- **RN-026:** El aviso se presenta como **modal a pantalla completa al entrar**, no como una franja: es el único momento en que el sitio interrumpe al visitante, y se reserva para esto. Ofrece un enlace directo al WhatsApp nuevo. *(añadido por hotfix `nuevo-numero-contacto`, 2026-09-12)*

### Contenido y marca

- **RN-018:** Erika publica y gestiona los artículos del blog por su cuenta, sin intervención técnica.
- **RN-019:** Ningún agente ni colaborador genera, parafrasea ni "mejora" testimonios, credenciales, títulos, resultados terapéuticos o copy clínico sin aprobación explícita de Erika.
- **RN-020:** El sitio no promete resultados terapéuticos ni emite diagnósticos.

### Datos y cumplimiento

- **RN-021:** El tratamiento de datos personales se rige por la Ley 1581 de 2012 (protección de datos personales) y por la reserva profesional de la Ley 1090 de 2006 (código deontológico del psicólogo en Colombia).
- **RN-022:** El aviso de privacidad y los términos y condiciones deben existir y ser accesibles antes de que el sitio recolecte cualquier dato de un titular de certificado.

## Casos Límite

- **CL-001:** Se verifica un código que no corresponde a ningún certificado → se responde "No encontramos este certificado", sin revelar por qué.
- **CL-002:** Se verifica un certificado anulado → se muestra que está anulado y el motivo de la anulación (`RN-006`). *Ver decisión abierta D-2: entra en tensión con `CL-001`.*
- **CL-003:** Se verifica un certificado cuya vigencia ya venció → se muestra que está vencido, junto con su fecha de vencimiento.
- **CL-004:** Alguien prueba códigos de forma masiva buscando titulares → los códigos no adivinables (`RN-001`) lo hacen inútil; aun así el sistema debe resistir el intento sin exponer información.
- **CL-005:** Erika sube un PDF que no lleva impreso el código ni el QR → el certificado no puede quedar emitido; ella debe corregir el diseño y volver a subirlo.
- **CL-006:** El correo del titular rebota o es inválido → Erika debe enterarse de que el certificado no llegó, para gestionarlo por otro canal.
- **CL-007:** Un mismo titular tiene varios certificados → cada uno es independiente, con su propio código, vigencia y estado. Verificar uno no revela la existencia de los otros.
- **CL-008:** Erika pierde el acceso a la zona privada → debe existir una forma de recuperarlo que no dependa de un desarrollador.
- **CL-009:** El QR está dañado, borroso o el verificador no puede escanear → el código impreso en el certificado permite verificar igual (`HU-CERT-006`).
- **CL-010:** El blog queda publicado sin ningún artículo → la sección debe comportarse dignamente en vacío, no mostrar una página rota ni una lista de ejemplo.
- **CL-011:** El visitante llega al sitio después de que venció el aviso de cambio de número → no ve ningún aviso, y todos los canales muestran el número nuevo.
- **CL-012:** El visitante llega directo a la página de verificación sin ningún código (por ejemplo desde un buscador) → debe entender qué es ese lugar y poder escribir un código.
- **CL-013:** Erika anula un certificado que el titular ya presentó ante un tercero → el verificador que lo consulte después verá el estado anulado; no hay forma de notificar a quien ya lo verificó antes.

## Identidad de Marca

- **MK-001 — Marca preexistente:** Sí, y existe **manual de marca formal**. Su ubicación está `sin definir` — debe entregarse antes de la Fase 3. Lo que hoy vive en el sitio y se considera oficial: logo (`src/assets/images/Logo.png`, `marca.png`), paleta teal (`#025157` · `#00a19b` · `#19d3c5` · `#dfe1df`) y púrpura (`#382246` · `#7c4182` · `#a05cbf` · `#d79dd7`), tipografías Acumin Pro (texto) y Slabo 27px (titulares).
- **MK-002 — Objetivo emocional:** A los 5 segundos, **confianza**: "esta profesional es seria y calificada". Al terminar de recorrer el sitio, **decisión**: "a esta persona le escribo hoy".
- **MK-003 — Atributos:** cálido, no meloso · profesional, no clínico · claro, no simplón.
- **MK-004 — Anti-referencias:** no debe parecerse a **una EPS o clínica institucional** (fría, burocrática, despersonaliza a quien consulta); ni a **un marketplace de terapia** tipo BetterHelp (terapeutas intercambiables, nadie tiene cara, todo optimizado a la conversión); ni a **un coach de Instagram** (frases motivacionales, promesas de transformación, estética de infoproducto — confunde psicología con autoayuda); ni a **una web corporativa genérica** (plantilla azul con fotos de stock, podría ser de cualquier negocio).
- **MK-005 — Tono de voz:** primera persona y tuteo — "te acompaño en…". Prohibido: tecnicismos clínicos sin explicar, diagnosticar a la ligera, y prometer resultados.
- **MK-006 — Referencias:** `sin definir` — el usuario no aportó URLs de referencia.

## Restricciones No Funcionales (de Negocio)

- **Protección de datos:** Ley 1581 de 2012 (habeas data). Los datos del titular de un certificado son datos personales y su tratamiento requiere aviso de privacidad vigente.
- **Reserva profesional:** Ley 1090 de 2006, código deontológico del psicólogo en Colombia. La relación terapéutica es confidencial: nada en el sitio puede permitir deducir que una persona concreta es o fue paciente de Erika.
- **Idioma:** español únicamente. No hay requerimiento de segundo idioma.
- **Zona horaria:** Colombia (UTC−5). Las fechas de emisión y vigencia de certificados se leen en ese huso.
- **Modalidad:** atención exclusivamente online, sin sede física.
- **Autonomía de Erika:** todo lo que Erika necesite hacer de forma recurrente — emitir certificados, anular, publicar artículos — debe poder hacerlo sin asistencia técnica.
- **Alcance geográfico:** Colombia, sin restricción explícita de atender desde el exterior.

## Fuera de Alcance

- **FA-001:** Agenda propia. Las citas se seguirán reservando en Calendly; el sitio no gestiona disponibilidad ni horarios.
- **FA-002:** Pagos en línea. El cobro de sesiones, bootcamp o certificados se sigue haciendo por fuera del sitio.
- **FA-003:** Zona privada para pacientes. Los pacientes no tienen cuenta ni acceso a documentos propios.
- **FA-004:** Historia clínica, notas de sesión o cualquier registro clínico. Nada de eso vive en el sitio.
- **FA-005:** Re-descarga del certificado por parte del titular desde el sitio. Si lo pierde, lo pide a Erika (`RN-010`).
- **FA-006:** Segundo idioma.
- **FA-007:** Más de una persona emisora de certificados. El sistema se construye para Erika como única emisora (`RN-004`).
- **FA-008:** Búsqueda de certificados por documento de identidad del titular. Se descartó por permitir averiguar si una persona cualquiera tiene certificados.

## Objetivos de Búsqueda (SEO)

> Qué debería buscar en Google quien tendría que encontrar a Erika. Prioriza el trabajo de contenido; no es una lista de palabras clave técnica.

- **Su nombre** — quien la escuchó nombrar y la busca. Es el mínimo: hoy debe funcionar.
- **Certificado de apoyo emocional con mascota** — nicho específico y poco competido; probablemente el de mejor retorno.
- **Servicio + modalidad** — "psicóloga online", "terapia de pareja virtual". Menos tráfico, mucha más intención de agendar.
- **Desarrollo personal y profesional, orientación vocacional** — diferencia a Erika de una consulta clínica pura.
- **Síntomas y problemas** — "cómo manejar la ansiedad", "dependencia emocional". Tráfico alto e intención baja: es lo que alimentaría el blog.

## Decisiones Abiertas

> Puntos que el levantamiento dejó sin cerrar. Cada uno debe resolverse **antes** de construir la capacidad que depende de él. No se rellenan por iniciativa de ningún agente.

- **D-1 — Vigencia por tipo de certificado (`RN-003`).** Se sabe que la vigencia depende del tipo, no cuáles son. Bloquea la emisión y la verificación.
- **D-2 — Contradicción entre `CL-001` y `CL-002`/`RN-006`.** Se pidió a la vez que un código inválido dé un mensaje neutro *sin distinguir entre inexistente, anulado o vencido*, y que un certificado anulado muestre el motivo de anulación. Ambas cosas no pueden ser ciertas: o el verificador distingue los tres estados, o no distingue ninguno. Hay que elegir.
- **D-3 — Ubicación del manual de marca (`MK-001`).** Existe, pero no se indicó dónde. Bloquea la Fase 3.
- **D-4 — Fecha de publicación del aviso de cambio de número (`RN-014`).** Los dos meses se cuentan desde que salga a producción; la fecha límite concreta se fija al desplegar.
- **D-5 — Edición y despublicación de artículos.** Se confirmó que Erika publica sola (`HU-BLOG-003`); no se preguntó si además necesita editar o retirar un artículo ya publicado.
- **D-6 — Destino de los artículos de ejemplo existentes.** Hoy hay tres listas de artículos contradictorias entre sí, con imágenes de banco. Se confirmó que el blog va con contenido real posterior, pero no qué pasa con ese contenido de ejemplo.
- **D-7 — Recuperación de acceso de Erika (`CL-008`).** Se identificó el caso límite; no se definió el mecanismo.

## Glosario

- **Certificado** — documento en PDF que Erika emite a una persona, con un código de verificación y un QR impresos, que el titular presenta ante un tercero.
- **Titular** — persona a cuyo nombre se emite un certificado.
- **Verificador** — tercero que recibe un certificado y consulta el sitio para confirmar que es auténtico.
- **Código de verificación** — identificador único y no adivinable de un certificado, impreso en el PDF junto al QR.
- **Anulación** — acción por la que Erika deja sin validez un certificado ya emitido, quedando visible el motivo para quien lo verifique.
- **Vigencia** — periodo durante el cual un certificado se considera válido, determinado por su tipo.
- **Amiga, no estás sola** — grupo de apoyo psicoeducativo para mujeres liderado por Erika, activo desde enero de 2022. Temas: tipos de violencia, empoderamiento emocional, amor propio.
- **Bootcamp profesional** — programa dirigido a psicólogos recién egresados o con dificultades para ejercer, orientado a fortalecer sus habilidades profesionales.
- **Tercera generación** — terapias como ACT (Aceptación y Compromiso) y DBT (Dialéctico Conductual), que Erika combina con el enfoque cognitivo-conductual.
