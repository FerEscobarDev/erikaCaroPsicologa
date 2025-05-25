import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Search, Tag, CalendarDays, FilterX } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const allBlogPosts = [
  {
    id: "como-identificar-ansiedad",
    title: "¿Cómo identificar la ansiedad y manejarla?",
    summary: "Aprende a reconocer los síntomas de la ansiedad y descubre estrategias efectivas para gestionarla en tu día a día.",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    altText: "Persona meditando tranquilamente para manejar la ansiedad",
    category: "Bienestar Emocional",
    date: "2025-05-15",
    tags: ["ansiedad", "salud mental", "mindfulness"]
  },
  {
    id: "autoestima-vida-plena",
    title: "Autoestima: el primer paso hacia una vida plena",
    summary: "Explora la importancia de una autoestima saludable y cómo cultivarla para mejorar tu bienestar general.",
    imageUrl: "https://images.unsplash.com/photo-1599643004946-50169096461a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlbGYlMjBlc3RlZW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    altText: "Persona mirándose con confianza en el espejo, representando autoestima",
    category: "Crecimiento Personal",
    date: "2025-05-01",
    tags: ["autoestima", "desarrollo personal", "confianza"]
  },
  {
    id: "gestion-estres-trabajo",
    title: "5 Técnicas Efectivas para Gestionar el Estrés Laboral",
    summary: "Descubre herramientas prácticas para combatir el estrés en el entorno laboral y mejorar tu calidad de vida.",
    imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZXNzJTIwbWFuYWdlbWVudCUyMHdvcmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    altText: "Escritorio ordenado representando manejo del estrés laboral",
    category: "Productividad",
    date: "2025-04-20",
    tags: ["estrés", "trabajo", "productividad", "bienestar"]
  },
  {
    id: "comunicacion-pareja",
    title: "Mejorando la Comunicación en Pareja: Guía Práctica",
    summary: "Fortalece tu relación aprendiendo a comunicarte de manera efectiva con tu pareja.",
    imageUrl: "https://images.unsplash.com/photo-1543109740-4709900057wh?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y291cGxlJTIwY29tbXVuaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    altText: "Pareja conversando de forma calmada y conectada",
    category: "Relaciones",
    date: "2025-04-10",
    tags: ["pareja", "comunicación", "relaciones", "amor"]
  },
];

const categories = [...new Set(allBlogPosts.map(post => post.category))];
const allTags = [...new Set(allBlogPosts.flatMap(post => post.tags))];

const BlogListPage = ({ onNavigateToHome, onNavigateToArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [activeSection, setActiveSection] = useState('blog-list');

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesCategory && matchesTag;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header sections={['inicio', 'blog-list']} activeSection={activeSection} setActiveSection={(section) => {
        if (section === 'inicio') onNavigateToHome();
        else setActiveSection(section);
      }} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-serif font-bold text-primary-teal-dark mb-4">
              Blog de Erika Caro
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-foreground max-w-2xl mx-auto">
              Encuentra artículos, reflexiones y herramientas para tu bienestar emocional y crecimiento personal.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12 p-6 bg-white rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="relative">
                <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Buscar artículo</label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Escribe palabras clave..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 mt-1.5 h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">Categoría</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal-mid focus:border-primary-teal-mid transition-shadow bg-white"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
               <div>
                <Button onClick={clearFilters} variant="outline" className="w-full md:w-auto text-primary-teal-mid border-primary-teal-mid hover:bg-primary-teal-mid hover:text-white">
                  <FilterX size={16} className="mr-2" />
                  Limpiar Filtros
                </Button>
              </div>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">Etiquetas Populares</label>
                <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map(tag => (
                        <Button 
                            key={tag} 
                            variant={selectedTag === tag ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setSelectedTag(prev => prev === tag ? "" : tag)}
                            className={`rounded-full text-xs ${selectedTag === tag ? 'bg-primary-teal-mid text-white' : 'text-foreground border-gray-300'}`}
                        >
                            <Tag size={12} className="mr-1"/> {tag}
                        </Button>
                    ))}
                </div>
            </div>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl group">
                    <div className="h-56 sm:h-60 overflow-hidden">
                      <img 
                        alt={post.altText}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={post.imageUrl} />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                        <span><Tag size={12} className="inline mr-1" />{post.category}</span>
                        <span><CalendarDays size={12} className="inline mr-1" />{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <CardTitle className="text-xl font-serif text-primary-teal-dark group-hover:text-accent-purple-mid transition-colors">
                        <button onClick={() => onNavigateToArticle(post.id)} className="text-left hover:underline focus:outline-none">
                          {post.title}
                        </button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-foreground text-sm line-clamp-3">{post.summary}</p>
                    </CardContent>
                    <CardFooter>
                       <Button 
                        variant="link" 
                        className="text-primary-teal-mid hover:text-accent-purple-mid p-0 group-hover:underline"
                        onClick={() => onNavigateToArticle(post.id)}
                      >
                        Leer más <ArrowRight size={16} className="ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-foreground">No se encontraron artículos que coincidan con tu búsqueda.</p>
              <p className="text-muted-foreground mt-2">Intenta ajustar los filtros o términos de búsqueda.</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage;