import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';

const FixedAppointmentButton = ({ setActiveSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    // Preferiblemente enlazar a Calendly o WhatsApp
    // Opcional: scroll a sección de contacto
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection('contacto');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="lg"
            className="bg-accent-purple-dark hover:bg-accent-purple-mid text-white rounded-full shadow-xl p-4 h-auto"
            onClick={handleClick}
            aria-label="Agendar una cita"
          >
            <CalendarPlus size={28} />
            <span className="ml-2 hidden sm:inline">Agendar Cita</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FixedAppointmentButton;