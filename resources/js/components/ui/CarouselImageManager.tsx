import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

type CarouselImage = {
    id: number;
    image_path: string;
};

export default function CarouselImageManager() {
    const [images, setImages] = useState<CarouselImage[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

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

    const confirmDelete = (id: number) => {
        setPendingDeleteId(id);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!pendingDeleteId) return;

        try {
            const res = await fetch(`/api/carousel-images/${pendingDeleteId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setImages(images.filter((img) => img.id !== pendingDeleteId));
            }
        } catch (err) {
            console.error("Erro ao deletar:", err);
        } finally {
            setModalOpen(false);
            setPendingDeleteId(null);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gerenciar Imagens do Carrossel</h2>

            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="carouselImageInput"
                        className="text-sm font-medium cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Escolher Arquivo
                    </label>
                    <input
                        id="carouselImageInput"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                    />
                    <button
                        onClick={handleUpload}
                        className="text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Upload
                    </button>
                </div>

                {file && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                        Arquivo selecionado: <span className="font-medium">{file.name}</span>
                    </p>
                )}
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img) => (
                    <div key={img.id} className="relative">
                        <img
                            src={img.image_path}
                            alt={`Imagem ${img.id}`}
                            className="w-full h-auto rounded shadow"
                        />
                        <button
                            onClick={() => confirmDelete(img.id)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                            Excluir
                        </button>
                    </div>
                ))}
            </div>

            <ConfirmationModal
                isOpen={modalOpen}
                title="Confirmar exclusão"
                message="Tem certeza que deseja deletar esta imagem do carrossel?"
                onConfirm={handleConfirmDelete}
                onCancel={() => {
                    setModalOpen(false);
                    setPendingDeleteId(null);
                }}
            />
        </div>
    );
}
