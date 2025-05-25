import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {BackgroundHeader, Hero_1} from '@assets'

const HeroSection = ({ setActiveSection }) => {
  const scrollToContacto = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('contacto');
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary-teal-lighter py-20 md:py-0">
      <div className="absolute inset-0 opacity-20">
        <img 
          alt="Fondo abstracto con formas suaves en tonos pastel"
          className="w-full h-full object-cover"
         src={ BackgroundHeader } />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary-teal-dark mb-6">
              Tu bienestar emocional es mi prioridad
            </h1>
            <p className="text-lg sm:text-xl text-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Hola, soy Erika Caro. <br />
              Psicóloga, especialista en neuropsicología y educación.
              Acompaño procesos de bienestar emocional, crecimiento personal y desarrollo profesional.
              <br /><br />
              <blockquote className="border-l-4 border-accent-purple-mid pl-4 italic text-lg text-foreground max-w-2xl mx-auto">
                “Conozca todas las teorías, domine todas las técnicas, pero al tocar un alma humana sea apenas otra alma humana.”
                <footer className="mt-2 text-sm font-medium text-primary-teal-mid">— Carl G. Jung</footer>
              </blockquote>
            </p>
            <Button
              size="lg"
              className="bg-accent-purple-mid hover:bg-accent-purple-dark text-white rounded-full text-lg px-8 py-3 shadow-lg transform hover:scale-105 transition-transform duration-300"
              onClick={scrollToContacto}
            >
              Agendar una sesión <ArrowRight size={20} className="ml-2" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden sm:flex justify-center mt-12 md:mt-0"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-teal-light to-accent-purple-lighter rounded-full opacity-50 transform -rotate-12"></div>
              <img 
                alt="Retrato profesional de Erika Caro sonriendo"
                className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
               src={Hero_1} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;