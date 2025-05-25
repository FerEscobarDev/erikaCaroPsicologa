import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {Mail, Phone, MapPin, Instagram, Facebook, Send, Linkedin} from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // toast({
    //   title: "Mensaje Enviado",
    //   description: "Gracias por tu mensaje, Erika se pondrá en contacto contigo pronto.",
    //   variant: "default",
    //   className: "bg-primary-teal-mid text-white",
    // });
    toast({
      title: "Mensaje No Enviado",
      description: "En este momento tu mensaje no pudo ser enviado.",
      variant: "default",
      className: "bg-red-500 text-white",
    });
    e.target.reset();
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-primary-teal-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-serif font-bold text-primary-teal-dark mb-4">
            Agenda tu Sesión o Contáctame
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-foreground max-w-2xl mx-auto">
            Estoy aquí para ayudarte. Elige la forma de contacto que prefieras.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl"
          >
            <h3 className="text-2xl font-serif font-semibold text-primary-teal-dark mb-6">Formulario de Contacto</h3>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nombre Completo</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal-mid focus:border-primary-teal-mid transition-shadow" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Correo Electrónico</label>
                <input type="email" name="email" id="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal-mid focus:border-primary-teal-mid transition-shadow" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Mensaje</label>
                <textarea name="message" id="message" rows="4" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal-mid focus:border-primary-teal-mid transition-shadow resize-none"></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent-purple-mid hover:bg-accent-purple-dark text-white rounded-full shadow-md">
                Enviar Mensaje <Send size={18} className="ml-2" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-serif font-semibold text-primary-teal-dark mb-6">Información Adicional</h3>
              <div className="space-y-5">
                <div className="flex items-center">
                  <Mail size={22} className="text-accent-purple-mid mr-4" />
                  <div>
                    <span className="font-medium text-foreground block">Correo Electrónico</span>
                    <a href="mailto:desarrollohumano@erikacaropsicologa.com" className="text-primary-teal-mid hover:text-accent-purple-dark transition-colors break-all">desarrollohumano@erikacaropsicologa.com</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone size={22} className="text-accent-purple-mid mr-4" />
                  <div>
                    <span className="font-medium text-foreground block">WhatsApp</span>
                    <a href="https://api.whatsapp.com/send?phone=573243874221&text=Hola%20Erika%2C%20vi%20tu%20p%C3%A1gina%20web%20y%20me%20gustar%C3%ADa%20agendar%20una%20sesi%C3%B3n%20contigo.%20%C2%BFPodr%C3%ADas%20brindarme%20informaci%C3%B3n%20sobre%20la%20disponibilidad%20y%20el%20proceso%20para%20reservar%3F%20%C2%A1Gracias%21"
                       target="_blank" rel="noopener noreferrer" className="text-primary-teal-mid hover:text-accent-purple-dark transition-colors">+57 3243874221</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin size={22} className="text-accent-purple-mid mr-4" />
                  <div>
                    <span className="font-medium text-foreground block">Atención</span>
                    <p className="text-foreground">Online</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <span className="font-medium text-foreground block mb-3">Sígueme en Redes</span>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/in/erikacaro/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin de Erika Caro" className="p-2 bg-primary-teal-lighter rounded-full text-primary-teal-dark hover:bg-accent-purple-lighter hover:text-accent-purple-dark transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://www.instagram.com/psic.erikacaro/#" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Erika Caro" className="p-2 bg-primary-teal-lighter rounded-full text-primary-teal-dark hover:bg-accent-purple-lighter hover:text-accent-purple-dark transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.facebook.com/people/Erika-Caro-Psic%C3%B3loga/61552588447493/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Erika Caro" className="p-2 bg-primary-teal-lighter rounded-full text-primary-teal-dark hover:bg-accent-purple-lighter hover:text-accent-purple-dark transition-colors">
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-primary-teal-mid hover:bg-primary-teal-dark text-white rounded-full text-lg py-4 shadow-lg"
              onClick={() => window.open('https://calendly.com/erikacaropsi-qhk/60min', '_blank')}
            >
              Agendar Cita Vía Calendly
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;