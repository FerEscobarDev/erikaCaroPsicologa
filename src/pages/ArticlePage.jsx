import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Tag, UserCircle, Share2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Datos de ejemplo, en una app real vendrían de una API o CMS
const allBlogPosts = [
  {
    id: "como-identificar-ansiedad",
    title: "¿Cómo identificar la ansiedad y manejarla?",
    summary: "Aprende a reconocer los síntomas de la ansiedad y descubre estrategias efectivas para gestionarla en tu día a día.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80",
    altText: "Persona meditando tranquilamente para manejar la ansiedad",
    category: "Bienestar Emocional",
    date: "2025-05-15",
    author: "Erika Caro",
    tags: ["ansiedad", "salud mental", "mindfulness", "bienestar"],
    content: `
      <p class="mb-4 text-lg">La ansiedad es una respuesta natural del cuerpo al estrés. Sin embargo, cuando se vuelve abrumadora o persistente, puede afectar significativamente nuestra calidad de vida. Identificarla es el primer paso para aprender a manejarla.</p>
      
      <h2 class="text-2xl font-serif font-semibold text-primary-teal-dark my-6">Síntomas Comunes de la Ansiedad</h2>
      <ul class="list-disc list-inside mb-6 space-y-2 text-lg">
        <li>Preocupación excesiva y difícil de controlar.</li>
        <li>Inquietud o sensación de estar "al límite".</li>
        <li>Fatiga fácil.</li>
        <li>Dificultad para concentrarse.</li>
        <li>Irritabilidad.</li>
        <li>Tensión muscular.</li>
        <li>Problemas de sueño (dificultad para conciliar o mantener el sueño, o sueño insatisfactorio).</li>
      </ul>
      <p class="mb-4 text-lg">Es importante recordar que no todas las personas experimentan los mismos síntomas, y la intensidad puede variar.</p>

      <h2 class="text-2xl font-serif font-semibold text-primary-teal-dark my-6">Estrategias para Manejar la Ansiedad</h2>
      <img  class="rounded-lg shadow-md my-6 w-full h-auto object-cover max-h-96" alt="Diagrama de técnicas de relajación" src="https://images.unsplash.com/photo-1543069190-9d380c458bc2" />
      <ol class="list-decimal list-inside mb-6 space-y-3 text-lg">
        <li><strong>Técnicas de respiración:</strong> La respiración diafragmática profunda puede ayudar a calmar el sistema nervioso. Inhala lentamente por la nariz, siente cómo tu abdomen se expande y exhala lentamente por la boca.</li>
        <li><strong>Mindfulness y meditación:</strong> Practicar la atención plena te ayuda a centrarte en el presente y a observar tus pensamientos sin juzgarlos. Incluso unos pocos minutos al día pueden marcar la diferencia.</li>
        <li><strong>Ejercicio regular:</strong> La actividad física es un potente ansiolítico natural. Encuentra una actividad que disfrutes y muévete con regularidad.</li>
        <li><strong>Establecer rutinas de sueño saludables:</strong> Un descanso adecuado es fundamental para regular el estado de ánimo y reducir la ansiedad.</li>
        <li><strong>Limitar cafeína y alcohol:</strong> Estas sustancias pueden exacerbar los síntomas de ansiedad en algunas personas.</li>
        <li><strong>Buscar apoyo profesional:</strong> Si la ansiedad interfiere con tu vida diaria, no dudes en buscar la ayuda de un psicólogo. La terapia cognitivo-conductual (TCC) es especialmente efectiva.</li>
      </ol>

      <p class="mb-4 text-lg">Recuerda, manejar la ansiedad es un proceso. Sé paciente contigo mismo y celebra cada pequeño avance. No estás solo en esto.</p>
      
      <div class="mt-8 p-6 bg-primary-teal-lighter rounded-lg">
        <h3 class="text-xl font-serif font-semibold text-primary-teal-dark mb-3">Reflexión Final</h3>
        <p class="text-foreground">Aprender a vivir con la ansiedad no significa eliminarla por completo, sino desarrollar herramientas para que no controle tu vida. Con las estrategias adecuadas y, si es necesario, el apoyo profesional, puedes recuperar la calma y el bienestar.</p>
      </div>
    `
  },
  // Añadir más artículos completos aquí si es necesario
];

const ArticlePage = ({ articleId, onNavigateBack }) => {
  const article = allBlogPosts.find(p => p.id === articleId) || allBlogPosts[0]; // Fallback al primer artículo si no se encuentra

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header sections={['inicio', 'blog']} activeSection="blog" setActiveSection={() => {}} />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-primary-teal-dark mb-4">Artículo no encontrado</h1>
            <p className="text-lg text-foreground mb-8">Lo sentimos, no pudimos encontrar el artículo que estás buscando.</p>
            <Button onClick={onNavigateBack} variant="outline" className="text-primary-teal-mid border-primary-teal-mid hover:bg-primary-teal-mid hover:text-white">
              <ArrowLeft size={18} className="mr-2" /> Volver al Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''; // Asegurarse de que window está definido

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header sections={['inicio', 'blog']} activeSection="blog" setActiveSection={() => {}} />
      <main className="flex-grow pt-20 sm:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button onClick={onNavigateBack} variant="ghost" className="text-primary-teal-mid hover:text-primary-teal-dark px-0 hover:bg-transparent">
              <ArrowLeft size={20} className="mr-2" /> Volver a todos los artículos
            </Button>
          </motion.div>

          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <header className="mb-8">
              <div className="mb-4">
                <span className="inline-block bg-accent-purple-lighter text-accent-purple-dark text-sm font-semibold px-3 py-1 rounded-full">
                  <Tag size={14} className="inline mr-1.5" />{article.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary-teal-dark mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <UserCircle size={18} className="mr-1.5 text-primary-teal-mid" />
                  <span>Por {article.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays size={16} className="mr-1.5 text-primary-teal-mid" />
                  <span>{new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </header>

            <div className="mb-8 h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-lg">
              <img 
                alt={article.altText}
                className="w-full h-full object-cover"
                src={article.imageUrl} />
            </div>
            
            <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary-teal-dark prose-h2:font-serif prose-a:text-primary-teal-mid hover:prose-a:text-accent-purple-mid prose-strong:text-primary-teal-dark prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-img:rounded-lg prose-img:shadow-md" 
                 dangerouslySetInnerHTML={{ __html: article.content.replace(/<img-replace[^>]*>([^<]+)<\/img-replace>/g, (match, p1) => `<div class="my-6 p-4 bg-gray-100 border-l-4 border-primary-teal-mid rounded"><p class="italic text-gray-700">${p1}</p></div>`) }} 
            />
            
            <hr className="my-12 border-gray-300" />

            <footer className="mt-8">
              <div className="mb-6">
                <span className="font-semibold text-primary-teal-dark mr-2">Etiquetas:</span>
                {article.tags.map(tag => (
                  <span key={tag} className="inline-block bg-primary-teal-lighter text-primary-teal-dark text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-foreground">Compartir este artículo:</span>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-primary-teal-mid border-primary-teal-mid hover:bg-primary-teal-mid hover:text-white"
                    onClick={() => navigator.clipboard.writeText(shareUrl).then(() => alert('Enlace copiado!'))}
                >
                  <Share2 size={16} className="mr-2" /> Copiar Enlace
                </Button>
              </div>
            </footer>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16"
          >
            <Card className="bg-primary-teal-lighter border-primary-teal-light shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <img 
                      alt="Retrato de Erika Caro"
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary-teal-mid"
                     src="https://images.unsplash.com/photo-1665113361900-b9720957d41a" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-semibold text-primary-teal-dark mb-1">Sobre Erika Caro</h4>
                    <p className="text-sm text-foreground mb-3">
                      Psicóloga especialista en Neuropsicología, comprometida con tu bienestar emocional. 
                      Conoce más sobre mi enfoque y cómo puedo ayudarte.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-accent-purple-mid hover:text-accent-purple-dark p-0"
                      onClick={onNavigateBack}
                    >
                      Contactar a Erika <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;