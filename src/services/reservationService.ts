export async function uploadExcelReservations(file: File) {
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = new FormData();
    formData.append('file', file);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': token ? `Token ${token}` : '',
        };
    }

    const response = await fetch(`${API_URL}/api/reservas/upload_excel/`, {
        method: 'POST',
        body: formData,
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error('Error al subir el archivo Excel');
    }
    return response.json();
}