import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Users, Briefcase, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <User size={36} className="text-accent-purple-mid" />,
    title: "Terapia Psicológica Individual",
    description: "Apoyo emocional personalizado para superar ansiedad, depresión, estrés y otros desafíos emocionales.",
    cta: "Más información"
  },
  {
    icon: <Users size={36} className="text-accent-purple-mid" />,
    title: "Terapia de Pareja",
    description: "Mejora la comunicación, resuelve conflictos y reconstruye vínculos afectivos sólidos y saludables.",
    cta: "Más información"
  },
  {
    icon: <Briefcase size={36} className="text-accent-purple-mid" />,
    title: "Orientación Vocacional",
    description: "Para jóvenes o adultos que desean tomar decisiones claras y alineadas con sus pasiones sobre su futuro profesional.",
    cta: "Más información"
  },
  {
    icon: <Zap size={36} className="text-accent-purple-mid" />,
    title: "Bootcamp Profesional",
    description: "Dirigido a psicólogos recién egresados o profesionales con dificultades para ejercer, fortaleciendo sus habilidades.",
    cta: "Más información"
  },
];

const ServicesSection = ({ setActiveSection }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const scrollToContacto = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('contacto');
  };

  return (
    <section id="servicios" className="py-16 sm:py-24 bg-primary-teal-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-serif font-bold text-primary-teal-dark mb-4">
            Mis Servicios
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-foreground max-w-2xl mx-auto">
            Descubre cómo puedo ayudarte a alcanzar tu bienestar emocional y desarrollo personal.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-accent-purple-lighter mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-primary-teal-dark">{service.title}</h3>
              </div>
              <p className="text-foreground mb-6 flex-grow">{service.description}</p>
              <Button 
                variant="outline" 
                className="mt-auto border-primary-teal-mid text-primary-teal-mid hover:bg-primary-teal-mid hover:text-white w-full sm:w-auto self-start rounded-full"
                onClick={scrollToContacto}
              >
                {service.cta} <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;