import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationModal from './ui/ConfirmationModal';

type Vehicle = {
    id: number;
    name: string;
    details: string;
    image_path: string;
    type: 'veiculo' | 'caminhao';
};

type PendingAction = {
    type: 'create' | 'update' | 'delete';
    vehicleId?: number;
};

const VehicleGallery = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [form, setForm] = useState<Partial<Vehicle> & { image?: File | null }>({
        name: '',
        details: '',
        type: 'veiculo',
        image: null,
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);

    const fetchVehicles = async () => {
        const res = await axios.get('/api/vehicles');
        setVehicles(res.data);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, files } = target;

        if (name === 'image' && files?.length) {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const confirmAction = (type: PendingAction['type'], vehicleId?: number) => {
        setPendingAction({ type, vehicleId });
        setModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!pendingAction) return;

        const formData = new FormData();
        if (form.name) formData.append('name', form.name);
        if (form.details) formData.append('details', form.details);
        if (form.type) formData.append('type', form.type);
        if (form.image instanceof File) {
            formData.append('image', form.image);
        }

        try {
            if (pendingAction.type === 'create') {
                await axios.post('/api/vehicles', formData);
            } else if (pendingAction.type === 'update' && editingId) {
                formData.append('_method', 'PUT');
                await axios.post(`/api/vehicles/${editingId}`, formData);
            } else if (pendingAction.type === 'delete' && pendingAction.vehicleId) {
                await axios.delete(`/api/vehicles/${pendingAction.vehicleId}`);
            }

            resetForm();
            fetchVehicles();
        } catch (err) {
            console.error('Erro ao executar ação:', err);
        } finally {
            setModalOpen(false);
            setPendingAction(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        confirmAction(editingId ? 'update' : 'create');
    };

    const handleEdit = (vehicle: Vehicle) => {
        setForm({
            name: vehicle.name,
            details: vehicle.details,
            type: vehicle.type,
            image: null,
        });
        setEditingId(vehicle.id);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleDelete = (id: number) => {
        confirmAction('delete', id);
    };

    const resetForm = () => {
        setForm({
            name: '',
            details: '',
            type: 'veiculo',
            image: null,
        });
        setEditingId(null);
    };

    return (
        <div className="p-6 max-w-5xl text-gray-900 dark:text-gray-100">
            <h2 className="text-xl font-bold mb-4">
                {editingId ? 'Editar Veículo' : 'Cadastrar Veículo'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-sm">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={form.name || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded bg-white dark:bg-gray-800"
                    required
                />
                <textarea
                    name="details"
                    placeholder="Detalhes"
                    value={form.details || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded bg-white dark:bg-gray-800"
                    required
                />
                <select
                    name="type"
                    value={form.type || ''}
                    onChange={handleChange}
                    className="w-full border p-2 rounded bg-white dark:bg-gray-800"
                    required
                >
                    <option value="">Selecione o tipo</option>
                    <option value="veiculo">Veículo</option>
                    <option value="caminhao">Caminhão</option>
                </select>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="vehicleImageInput"
                        className="text-sm font-medium cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Escolher Arquivo
                    </label>
                    <input
                        id="vehicleImageInput"
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="hidden"
                    />
                    <button
                        type="submit"
                        className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    >
                        {editingId ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </div>

                {form.image && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                        Arquivo selecionado: <span className="font-medium">{form.image.name}</span>
                    </p>
                )}

                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                    >
                        Cancelar
                    </button>
                )}

            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle.id}
                        className="border bg-white dark:bg-gray-900 rounded shadow p-4"
                    >
                        {vehicle.image_path && (
                            <img
                                src={vehicle.image_path}
                                alt={vehicle.name}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                        <p className="text-sm">{vehicle.details}</p>
                        <p className="text-xs mt-1 italic text-gray-500">{vehicle.type}</p>
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={() => handleEdit(vehicle)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(vehicle.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmationModal
                isOpen={modalOpen}
                title="Confirmação"
                message={
                    pendingAction?.type === 'delete'
                        ? 'Tem certeza que deseja deletar este veículo?'
                        : pendingAction?.type === 'update'
                            ? 'Deseja realmente atualizar este veículo?'
                            : 'Deseja realmente cadastrar este veículo?'
                }
                onConfirm={handleConfirm}
                onCancel={() => {
                    setModalOpen(false);
                    setPendingAction(null);
                }}
            />
        </div>
    );
};

export default VehicleGallery;
