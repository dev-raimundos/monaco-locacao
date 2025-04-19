import { useState, useRef, useEffect } from "react";
import "./monaco-gallery.css";
import { motion } from "framer-motion";

type Vehicle = {
  id: number;
  name: string;
  image_path: string;
  details: string;
  type: "veiculo" | "caminhao";
};

type Props = {
  vehicles?: Vehicle[];
};

type Category = "todos" | "veiculos" | "caminhoes";

export default function Gallery({ vehicles = [] }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("todos");
  const [vehiclesState, setVehicles] = useState<Vehicle[]>(vehicles);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");
        const data = await response.json();
        console.log("Dados recebidos da API:", data);
        setVehicles(data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = (() => {
    if (selectedCategory === "todos") {
      const veiculos = vehiclesState.filter((v) => v.type === "veiculo");
      const caminhoes = vehiclesState.filter((v) => v.type === "caminhao");
      return [...veiculos, ...caminhoes];
    } else if (selectedCategory === "veiculos") {
      return vehiclesState.filter((v) => v.type === "veiculo");
    } else {
      return vehiclesState.filter((v) => v.type === "caminhao");
    }
  })();

  const categoryLabels: Record<Category, string> = {
    todos: "Todos",
    veiculos: "Veículos",
    caminhoes: "Caminhões",
  };

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    document.body.style.userSelect = "none";
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  const onDragging = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="container-gallery-all">
      <h1 className="title">Explore o nosso portfólio</h1>
      <div className="list-option-container">
        <ul className="list-option">
          {(["todos", "veiculos", "caminhoes"] as Category[]).map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryLabels[category]}
            </li>
          ))}
        </ul>
        <div className="gallery-buttons-inline">
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -350, behavior: "smooth" })}
            className="gallery-single-button prev"
          >
            &#10094;
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 350, behavior: "smooth" })}
            className="gallery-single-button next"
          >
            &#10095;
          </button>
        </div>
      </div>
      <div className="container-gallery">
        <motion.div
          className="gallery-scroll"
          ref={scrollRef}
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={startDragging}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={onDragging}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {filteredVehicles.map((car) => (
            <div className="image-container" key={car.id}>
              <img
                src={`${car.image_path}`}
                alt={car.name}
                draggable="false"
              />
              <h3>{car.name}</h3>
              <p>{car.details}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="gallery-indicator">
        <motion.div
          className="indicator-bar"
          animate={{
            width: `${(scrollPosition / (scrollRef.current?.scrollWidth || 1)) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
