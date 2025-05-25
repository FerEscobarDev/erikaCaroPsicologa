import React from 'react';
import { motion } from 'framer-motion';
import { Star, UserCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Gracias a Erika comprendí mi ansiedad y aprendí a manejarla con más tranquilidad. Su empatía y profesionalismo fueron clave.",
    name: "Ana G.",
    avatarText: "AG"
  },
  {
    quote: "El bootcamp me dio claridad y herramientas prácticas para iniciar como profesional. Erika es una excelente mentora.",
    name: "Carlos M.",
    avatarText: "CM"
  },
  {
    quote: "Recomiendo totalmente las sesiones con Erika. Me sentí escuchada y encontré nuevas perspectivas para mis problemas.",
    name: "Laura P.",
    avatarText: "LP"
  }
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-primary-teal-lighter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-serif font-bold text-primary-teal-dark mb-4">
            Lo que dicen mis pacientes
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-foreground max-w-2xl mx-auto">
            Experiencias reales de personas que han transformado sus vidas.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground italic mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full bg-accent-purple-lighter flex items-center justify-center text-accent-purple-dark font-semibold text-lg mr-4">
                      {testimonial.avatarText || <UserCircle size={28}/>}
                    </div>
                    <div>
                      <p className="font-semibold text-primary-teal-dark">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;