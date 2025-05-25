import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SupportGroupSection from '@/components/sections/SupportGroupSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import FixedAppointmentButton from '@/components/FixedAppointmentButton';
import { Toaster } from '@/components/ui/toaster';

import BlogListPage from '@/pages/BlogListPage';
import ArticlePage from '@/pages/ArticlePage';

const App = () => {
  const landingSections = ['inicio', 'sobre-mi', 'servicios', 'grupo-apoyo', 'testimonios', 'contacto'];
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'blogList', 'article'
  const [currentArticleId, setCurrentArticleId] = useState(null);

  const navigateToBlogList = (articleId = null) => {
    if (articleId) {
      setCurrentArticleId(articleId);
      setCurrentPage('article');
    } else {
      setCurrentPage('blogList');
    }
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('landing');
    setActiveSection('inicio'); // O la sección que corresponda
    setCurrentArticleId(null);
    window.scrollTo(0, 0);
    // Forzar scroll a la sección de inicio si es necesario
    setTimeout(() => {
        const homeElement = document.getElementById('inicio');
        if (homeElement) homeElement.scrollIntoView({behavior: 'smooth'});
    }, 0);
  };
  
  const navigateToArticle = (articleId) => {
    setCurrentArticleId(articleId);
    setCurrentPage('article');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'blogList':
        return <BlogListPage onNavigateToHome={navigateToHome} onNavigateToArticle={navigateToArticle} />;
      case 'article':
        return <ArticlePage articleId={currentArticleId} onNavigateBack={() => navigateToBlogList()} />;
      case 'landing':
      default:
        return (
          <>
            <Header sections={landingSections} activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="flex-grow">
              <HeroSection setActiveSection={setActiveSection} />
              <AboutSection />
              <ServicesSection setActiveSection={setActiveSection} />
              <SupportGroupSection setActiveSection={setActiveSection} />
              <TestimonialsSection />
              {/*<BlogSection onNavigateToBlogList={navigateToBlogList} />*/}
              <ContactSection />
            </main>
            <Footer />
            <FixedAppointmentButton setActiveSection={setActiveSection} />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background antialiased">
      {renderPage()}
      <Toaster />
    </div>
  );
};

export default App;