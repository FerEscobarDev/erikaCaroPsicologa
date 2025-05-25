import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ sections, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      let currentSection = '';
      sections.forEach(sectionId => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sectionId;
          }
        }
      });
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection, setActiveSection]);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-serif font-bold text-primary-teal-dark"
        >
          Erika Caro
        </motion.div>

        <nav className="hidden md:flex items-center space-x-6">
          {sections.map((sectionId) => (
            <motion.button
              key={sectionId}
              onClick={() => scrollToSection(sectionId)}
              className={`text-sm font-medium transition-colors ${
                activeSection === sectionId
                  ? 'text-primary-teal-mid font-semibold'
                  : 'text-foreground hover:text-primary-teal-mid'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ')}
            </motion.button>
          ))}
          <Button 
            size="sm" 
            className="bg-accent-purple-mid hover:bg-accent-purple-dark text-white rounded-full"
            onClick={() => scrollToSection('contacto')}
          >
            <Phone size={16} className="mr-2" />
            Agendar Sesión
          </Button>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
            className="text-primary-teal-dark"
          >
            <Menu />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-white shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="text-primary-teal-dark"
                >
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col space-y-5">
                {sections.map((sectionId) => (
                  <motion.button
                    key={sectionId}
                    onClick={() => scrollToSection(sectionId)}
                    className={`text-lg font-medium transition-colors py-2 text-left ${
                      activeSection === sectionId
                        ? 'text-primary-teal-mid font-semibold'
                        : 'text-foreground hover:text-primary-teal-mid'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                  >
                    {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ')}
                  </motion.button>
                ))}
                <Button 
                  className="bg-accent-purple-mid hover:bg-accent-purple-dark text-white rounded-full mt-4 w-full"
                  onClick={() => scrollToSection('contacto')}
                >
                  <Phone size={16} className="mr-2" />
                  Agendar Sesión
                </Button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;