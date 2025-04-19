import "./monaco-footer.css";
import { RefObject } from "react";

type FooterProps = {
  headerRef: RefObject<HTMLDivElement>;
};

function Footer({ headerRef }: FooterProps) {

  const scrollToTop = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="footer-container">
      <div className="footer-top-links">
        <h2 onClick={scrollToTop} style={{ cursor: "pointer" }} className="scroll-to-top">Voltar ao início {'\u02C4'}</h2>
        <div className="footer-contact">
          <h2 className="text-highlight">CONTATO</h2>
          <h2><u>Fale Conosco</u></h2>
        </div>
      </div>
      <div className="follow-us-text">
        <p>Siga-nos nas <br /> nossas redes sociais</p>
      </div>
      <div className="social-media">
        <a
          href="https://www.facebook.com/GrupoMonacoOficial/?locale=pt_BR"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50">
            <path d="M32,11h5c0.552,0,1-0.448,1-1V3.263c0-0.524-0.403-0.96-0.925-0.997C35.484,2.153,32.376,2,30.141,2C24,2,20,5.68,20,12.368 V19h-7c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1h7v19c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1V28h7.222 c0.51,0,0.938-0.383,0.994-0.89l0.778-7C38.06,19.518,37.596,19,37,19h-8v-5C29,12.343,30.343,11,32,11z"></path>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/monacolocacao/"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
      </div>
      <div className="footer-bottom-links">
        <p>Legal</p>
        <p>Privacy</p>
        <p>Etiqueta de Segurança</p>
        <p>Ofertas</p>
      </div>
      <div className="copyright">
        <p>Copyright © 2025 Mônaco Locação.</p>
      </div>
    </div>
  );
}

export default Footer;
