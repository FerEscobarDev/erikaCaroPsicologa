import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit3 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: "como-identificar-ansiedad",
    title: "¿Cómo identificar la ansiedad y manejarla?",
    summary: "Aprende a reconocer los síntomas de la ansiedad y descubre estrategias efectivas para gestionarla en tu día a día.",
    imageName: "ansiedad-blog",
    altText: "Persona meditando tranquilamente para manejar la ansiedad",
    category: "Bienestar Emocional",
    date: "2025-05-15",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "autoestima-vida-plena",
    title: "Autoestima: el primer paso hacia una vida plena",
    summary: "Explora la importancia de una autoestima saludable y cómo cultivarla para mejorar tu bienestar general.",
    imageName: "autoestima-blog",
    altText: "Persona mirándose con confianza en el espejo, representando autoestima",
    category: "Crecimiento Personal",
    date: "2025-05-01",
    imageUrl: "https://images.unsplash.com/photo-1599643004946-50169096461a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlbGYlMjBlc3RlZW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  }
];

const BlogSection = ({ onNavigateToBlogList }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleNavigateToArticle = (articleId) => {
    // Placeholder: en una app con router, navegaría a /blog/{articleId}
    console.log(`Navegar al artículo: ${articleId}`);
    // Para este ejemplo, podemos simular la navegación llamando a onNavigateToBlogList
    // y pasando el ID del artículo para que la página de lista lo maneje (si es necesario)
    if (onNavigateToBlogList) {
       onNavigateToBlogList(articleId);
    }
  };
  
  const handleViewAllArticles = () => {
    if (onNavigateToBlogList) {
      onNavigateToBlogList(); // Llama sin ID para mostrar todos los artículos
    }
  };


  return (
    <section id="blog" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center text-accent-purple-mid mb-3">
            <Edit3 size={24} className="mr-2"/>
            <span className="text-sm font-semibold tracking-wider uppercase">Recursos y Reflexiones</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-serif font-bold text-primary-teal-dark mb-4">
            Artículos Destacados
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-foreground max-w-2xl mx-auto">
            Explora ideas y consejos para tu bienestar emocional y crecimiento personal.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="h-full flex flex-col bg-primary-teal-lighter shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl group">
                <div className="h-56 sm:h-64 overflow-hidden">
                  <img 
                    alt={post.altText}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={post.imageUrl} />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-serif text-primary-teal-dark group-hover:text-accent-purple-mid transition-colors">
                    <button onClick={() => handleNavigateToArticle(post.id)} className="text-left hover:underline focus:outline-none">
                      {post.title}
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground text-sm sm:text-base">{post.summary}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="link" 
                    className="text-primary-teal-mid hover:text-accent-purple-mid p-0 group-hover:underline"
                    onClick={() => handleNavigateToArticle(post.id)}
                  >
                    Leer más <ArrowRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary-teal-mid text-primary-teal-mid hover:bg-primary-teal-mid hover:text-white rounded-full"
            onClick={handleViewAllArticles}
          >
            Ver todos los artículos
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;