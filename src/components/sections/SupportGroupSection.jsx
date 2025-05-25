import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeartHandshake, ArrowRight } from 'lucide-react';

const SupportGroupSection = ({ setActiveSection }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const scrollToContacto = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('contacto');
  };

  return (
    <section id="grupo-apoyo" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <img 
              alt="Grupo de mujeres apoyándose mutuamente en un círculo"
              className="rounded-xl shadow-xl w-full object-cover aspect-video"
             src="https://images.unsplash.com/photo-1626455935435-7208073e6fbb" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.div variants={itemVariants} className="flex items-center text-accent-purple-mid mb-3">
              <HeartHandshake size={28} className="mr-2"/>
              <span className="text-sm font-semibold tracking-wider uppercase">Comunidad y Empoderamiento</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-serif font-bold text-primary-teal-dark mb-6">
              Grupo de Apoyo: "Amiga, no estás sola"
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-foreground mb-6">
              Un espacio de acompañamiento psicoeducativo para mujeres, activo desde enero de 2021. Aquí exploramos temas cruciales como los tipos de violencia, el fortalecimiento del empoderamiento emocional y el desarrollo del amor propio.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-foreground mb-8">
              Juntas creamos un ambiente seguro y de confianza para crecer, aprender y sanar. Si buscas una comunidad que te entienda y te impulse, este es tu lugar.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button 
                size="lg" 
                className="bg-accent-purple-mid hover:bg-accent-purple-dark text-white rounded-full shadow-md"
                onClick={scrollToContacto}
              >
                Quiero unirme <ArrowRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupportGroupSection;