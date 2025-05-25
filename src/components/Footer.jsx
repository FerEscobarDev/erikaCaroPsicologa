import React from 'react';
import {Instagram, Facebook, Linkedin} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-teal-lighter py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <span className="text-xl font-serif font-bold text-primary-teal-dark mb-2 block">Erika Caro</span>
            <p className="text-sm text-foreground">Psicóloga especialista en Neuropsicología.</p>
            <p className="text-sm text-foreground">Tu bienestar emocional es mi prioridad.</p>
          </div>
          <div>
            <span className="font-semibold text-primary-teal-dark mb-2 block text-center md:text-left">Enlaces</span>
            <ul className="flex flex-wrap justify-center md:justify-start gap-4">
              <li><a href="#inicio" className="text-sm text-foreground hover:text-primary-teal-mid">Inicio</a></li>
              <li><a href="#sobre-mi" className="text-sm text-foreground hover:text-primary-teal-mid">Sobre Mí</a></li>
              <li><a href="#servicios" className="text-sm text-foreground hover:text-primary-teal-mid">Servicios</a></li>
              <li><a href="#contacto" className="text-sm text-foreground hover:text-primary-teal-mid">Contacto</a></li>
            </ul>
          </div>
          <div>
            <span className="font-semibold text-primary-teal-dark mb-2 block">Redes Sociales</span>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.linkedin.com/in/erikacaro/" target="_blank" rel="noopener noreferrer" aria-label="Linkedin de Erika Caro" className="text-primary-teal-dark hover:text-accent-purple-mid transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://www.instagram.com/psic.erikacaro/#" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Erika Caro" className="text-primary-teal-dark hover:text-accent-purple-mid transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/people/Erika-Caro-Psic%C3%B3loga/61552588447493/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Erika Caro" className="text-primary-teal-dark hover:text-accent-purple-mid transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-teal-light pt-8 text-center text-sm text-foreground">
          <p className="mb-1">
            <a href="/aviso-privacidad" className="hover:text-primary-teal-mid">Aviso de Privacidad</a> | <a href="/terminos-condiciones" className="hover:text-primary-teal-mid">Términos y Condiciones</a>
          </p>
          <p>&copy; {new Date().getFullYear()} Erika Caro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;