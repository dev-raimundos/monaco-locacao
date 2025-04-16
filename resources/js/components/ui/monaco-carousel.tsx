import React, { useEffect, useState } from 'react';
import './monaco-carousel.css';

type CarouselImage = {
  id: number;
  image_path: string;
};

const Carousel: React.FC = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/carousel-images');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Erro ao buscar imagens do carrossel:', error);
      }
    };

    fetchImages();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (images.length === 0) {
    return <div className="carousel-loading">Carregando imagens...</div>;
  }

  return (
    <div className="carousel">
      <img
        src={images[currentIndex].image_path}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />

      {/* Botão Anterior */}
      <button onClick={prevSlide} className="carousel-button prev">
        &#10094;
      </button>

      {/* Botão Próximo */}
      <button onClick={nextSlide} className="carousel-button next">
        &#10095;
      </button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
