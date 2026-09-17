// Datos de contacto de Erika. Fuente única: si el número cambia, se cambia aquí.
// Extraídos de los componentes por R-FILE-003 (.specture/rules.yml).

export const WHATSAPP_NUMBER = '573171576141';

export const WHATSAPP_DISPLAY = '+57 317 157 6141';

export const CONTACT_EMAIL = 'desarrollohumano@erikacaropsicologa.com';

export const CALENDLY_URL = 'https://calendly.com/erikacaropsi-qhk/55';

/** Arma un enlace de WhatsApp al número vigente con un mensaje precargado. */
export const whatsappLink = (message) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

export const WHATSAPP_MESSAGE_SESSION =
  'Hola Erika, vi tu página web y me gustaría agendar una sesión contigo. ¿Podrías brindarme información sobre la disponibilidad y el proceso para reservar? ¡Gracias!';

/** Enlace de invitación directa al grupo de WhatsApp "Amiga, no estás sola". */
export const WHATSAPP_SUPPORT_GROUP_URL =
  'https://chat.whatsapp.com/Lv2mVk0UO7rAYDpiZpPIff?s=cl&p=a&mlu=4&ilr=4';
