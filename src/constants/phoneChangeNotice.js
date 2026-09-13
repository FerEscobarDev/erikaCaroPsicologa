// Aviso de cambio de número de WhatsApp. Temporal por diseño.
//
// El aviso deja de mostrarse solo al llegar NOTICE_END_DATE — nadie tiene que acordarse
// de quitarlo. Cuando esa fecha pase, este archivo, el componente PhoneChangeModal y su
// uso en App.jsx se pueden borrar enteros.

/** Último instante en que se muestra el aviso. Fijado con la usuaria: 30/11/2026 (D-4). */
export const NOTICE_END_DATE = new Date('2026-11-30T23:59:59-05:00');

export const NOTICE_STORAGE_KEY = 'aviso-cambio-numero-cerrado';

/** Copy del aviso — RN-023, RN-024, RN-025. */
export const NOTICE_COPY = {
  eyebrow: 'Importante',
  title: 'Nuevo número de contacto',
  reason: 'Por inconvenientes técnicos con mi línea anterior, actualicé mi número de WhatsApp.',
  numberLabel: 'Número oficial para agenda e información',
  retry:
    'Si me escribiste hace poco y no recibiste respuesta, por favor vuelve a comunicarte a este número.',
  telegram: 'El número anterior continuará disponible únicamente por Telegram.',
  cta: 'Escribir por WhatsApp',
  dismiss: 'Continuar al sitio',
  thanks: 'Gracias por tu comprensión.',
};

export const WHATSAPP_MESSAGE_NOTICE =
  'Hola Erika, vi el aviso en tu página web y quiero guardar tu número nuevo. Me gustaría agendar una sesión contigo.';
