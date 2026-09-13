import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WHATSAPP_DISPLAY, whatsappLink } from '@/constants/contact';
import {
  NOTICE_COPY,
  NOTICE_END_DATE,
  NOTICE_STORAGE_KEY,
  WHATSAPP_MESSAGE_NOTICE,
} from '@/constants/phoneChangeNotice';
import { Logo } from '@assets';

// Se cierra por sesión, no para siempre: quien vuelve otro día lo vuelve a ver (RN-013).
const wasDismissed = () => {
  try {
    return window.sessionStorage.getItem(NOTICE_STORAGE_KEY) === '1';
  } catch {
    // Modo privado o cookies bloqueadas: el aviso se muestra igual.
    return false;
  }
};

const rememberDismissal = () => {
  try {
    window.sessionStorage.setItem(NOTICE_STORAGE_KEY, '1');
  } catch {
    // Si no se puede recordar, el aviso reaparece. Es el fallo aceptable.
  }
};

const PhoneChangeModal = () => {
  const [isOpen, setIsOpen] = useState(() => new Date() <= NOTICE_END_DATE && !wasDismissed());

  const handleOpenChange = (open) => {
    if (!open) rememberDismissal();
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <div className="relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <DialogClose
            aria-label="Cerrar el aviso"
            className="absolute top-3 right-3 z-10 p-2 rounded-full text-primary-teal-dark/60 hover:text-primary-teal-dark hover:bg-primary-teal-lighter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            <X size={20} aria-hidden="true" />
          </DialogClose>

          <div className="px-6 sm:px-10 pt-8 pb-6 text-center">
            <img src={Logo} alt="Erika Caro, psicóloga" className="h-14 sm:h-16 mx-auto mb-6 object-contain" />

            <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-accent-purple-mid mb-2">
              {NOTICE_COPY.eyebrow}
            </span>

            <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-primary-teal-dark mb-4">
              {NOTICE_COPY.title}
            </DialogTitle>

            <DialogDescription className="text-base text-foreground mb-6">
              {NOTICE_COPY.reason}
            </DialogDescription>

            <div className="bg-primary-teal-dark rounded-xl px-4 sm:px-6 py-5 mb-6">
              <span className="block text-xs sm:text-sm text-primary-teal-lighter mb-2">
                {NOTICE_COPY.numberLabel}
              </span>
              <a
                href={whatsappLink(WHATSAPP_MESSAGE_NOTICE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-white hover:text-primary-teal-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg transition-colors"
              >
                <MessageCircle size={30} className="shrink-0" aria-hidden="true" />
                <span className="text-2xl sm:text-3xl font-bold tracking-tight whitespace-nowrap">
                  {WHATSAPP_DISPLAY}
                </span>
              </a>
            </div>

            <p className="text-sm text-foreground mb-4">{NOTICE_COPY.retry}</p>

            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-primary-teal-lighter rounded-lg px-4 py-3 mb-6">
              <Send size={16} className="shrink-0" aria-hidden="true" />
              <span>{NOTICE_COPY.telegram}</span>
            </p>

            <a href={whatsappLink(WHATSAPP_MESSAGE_NOTICE)} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full bg-accent-purple-mid hover:bg-accent-purple-dark text-white rounded-full text-base shadow-md"
              >
                <MessageCircle size={20} className="mr-2" aria-hidden="true" />
                {NOTICE_COPY.cta}
              </Button>
            </a>

            <DialogClose className="mt-4 text-sm text-muted-foreground hover:text-primary-teal-dark underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded transition-colors">
              {NOTICE_COPY.dismiss}
            </DialogClose>

            <p className="mt-6 text-sm font-serif italic text-accent-purple-mid">{NOTICE_COPY.thanks}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneChangeModal;
