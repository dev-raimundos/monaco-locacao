import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import FacebookLogo from "@/components/ui/icon-facebook";
import InstagramLogo from "@/components/ui/icon-instagram";
import MonacoLogo from "@/components/ui/icon-monaco-logo";
import ArrowHeader from "@/components/ui/icon-arrow-header";
import "./monaco-header.css";

function MonacoHeader({
  galleryRef,
  aboutRef,
  contactRef,
  formRef
}: {
  galleryRef: React.RefObject<HTMLDivElement | null>,
  aboutRef: React.RefObject<HTMLDivElement | null>,
  contactRef: React.RefObject<HTMLDivElement | null>,
  formRef: React.RefObject<HTMLDivElement | null>
}) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <header className="header">
      <a href={route("home")} aria-label="Página inicial" className="logo-link">
        <MonacoLogo className="logo" />
      </a>

      <button
        className="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X className="icon" /> : <Menu className="icon" />}
      </button>

      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li className="social-icons-container">
            <a
              href="https://www.facebook.com/GrupoMonacoOficial/?locale=pt_BR"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookLogo className="social-icon" />
            </a>
            <a
              href="https://www.instagram.com/monacolocacao/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramLogo className="social-icon" />
            </a>
          </li>

          <li>
            <button className="nav-link" onClick={() => scrollToSection(galleryRef)}>
              Nossos Carros
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection(aboutRef)}>
              Sobre a Mônaco Locação
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection(contactRef)}>
              Contato
            </button>
          </li>

          <li className="cta-container">
            <button className="cta" onClick={() => scrollToSection(formRef)}>
              <span>RECEBA UMA PROPOSTA </span>
              <ArrowHeader className="arrow-icon" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MonacoHeader;
