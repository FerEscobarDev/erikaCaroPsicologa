import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, BookOpen } from 'lucide-react';

const AboutSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="sobre-mi" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-serif font-bold text-primary-teal-dark mb-4">
            Sobre Mí
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-foreground max-w-3xl mx-auto">
            Conoce mi enfoque y experiencia profesional.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex justify-center"
          >
            <img 
              alt="Erika Caro en un entorno profesional y acogedor"
              className="rounded-lg shadow-xl w-full max-w-md object-cover aspect-[4/5]"
             src="https://images.unsplash.com/photo-1612944095914-33fd0a85fcfc" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="md:col-span-3"
          >
            <motion.p variants={itemVariants} className="text-lg text-foreground mb-6">
              Soy Erika Caro, Psicóloga con especialización en Neuropsicología y Educación. Mi trayectoria se ha centrado en el tratamiento de condiciones como la ansiedad, depresión, desregulación emocional, dependencia emocional y trastorno de estrés postraumático.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-foreground mb-6">
              Trabajo desde el enfoque Cognitivo Conductual y técnicas de tercera generación (como ACT y DBT), brindando una atención empática, humanizada y personalizada. Para mí, cada persona es única y merece un acompañamiento adaptado a sus necesidades.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-foreground mb-8">
              Además, lidero el grupo de apoyo <strong className="text-primary-teal-dark">Amiga, no estás sola</strong>, un espacio seguro donde promovemos el empoderamiento femenino a través del amor propio y la comprensión mutua.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-2 sm:grid-cols-2 gap-6 text-center"
            >
              <div className="bg-primary-teal-lighter p-4 rounded-lg shadow-sm">
                <Brain className="mx-auto text-primary-teal-mid mb-2" size={36} />
                <span className="font-semibold text-sm text-primary-teal-dark">Neuropsicología</span>
              </div>
              <div className="bg-primary-teal-lighter p-4 rounded-lg shadow-sm">
                <Heart className="mx-auto text-primary-teal-mid mb-2" size={36} />
                <span className="font-semibold text-sm text-primary-teal-dark">Atención Empática</span>
              </div>
              <div className="bg-primary-teal-lighter p-4 rounded-lg shadow-sm">
                <Users className="mx-auto text-primary-teal-mid mb-2" size={36} />
                <span className="font-semibold text-sm text-primary-teal-dark">Enfoque Personalizado</span>
              </div>
              <div className="bg-primary-teal-lighter p-4 rounded-lg shadow-sm">
                <BookOpen className="mx-auto text-primary-teal-mid mb-2" size={36} />
                <span className="font-semibold text-sm text-primary-teal-dark">Terapias Basadas en Evidencia</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;