import { useEffect, useState } from "react";

type CarouselImage = {
  id: number;
  image_path: string;
};

export default function CarouselImageManager() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/carousel-images");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Erro ao buscar imagens:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/carousel-images", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setFile(null);
        fetchImages();
      }
    } catch (err) {
      console.error("Erro no upload:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar esta imagem?")) return;

    try {
      const res = await fetch(`/api/carousel-images/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setImages(images.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gerenciar Imagens do Carrossel</h2>

      <div className="flex items-center gap-2 mb-4">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img src={img.image_path} alt={`Imagem ${img.id}`} className="w-full h-auto rounded shadow" />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
