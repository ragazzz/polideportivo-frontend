import { useState } from "react";
import { Modal } from "../ui/Modal";
import { uploadExcelReservations } from "../../services/reservationService";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function UploadExcelModal({ open, onClose }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleUpload() {
        if (!file) return;
        try {
            setLoading(true);
            setError(null);
            await uploadExcelReservations(file);
            onClose();
            location.reload();
            
        } catch (err) {
            setError("Error al subir el archivo. Por favor, inténtelo de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal open={open} onClose={onClose} size="md">
            <h2 className="text-lg font-bold mb-4 font-mono m-4">Cargar reservas (Archivo Excel)</h2>

            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4 cursor-pointer ml-4"
            />

            {error && (
                <p className="text-red-600 text-sm mb-2 font-mono">{error}</p>
            )}
            
            <div className="flex justify-end gap-2 mb-2 mr-2">
                <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 rounded hover:bg-red-500 cursor-pointer text-white font-mono"
                >
                Cancelar
                </button>

                <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-green-700 font-mono"
                >
                {loading ? "Subiendo..." : "Subir"}
                </button>
            </div>
        </Modal>
    );
}