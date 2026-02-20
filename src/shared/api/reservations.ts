import { type ReservaDB, type Reservation } from "../types/types";
import { convertReservaToReservation } from "../utils/reservationUtils";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token ? `Token ${token}` : '',
        'Content-Type': 'application/json',
    };
}

export async function fetchReservations(): Promise<Reservation[]> {
    try {
        const response = await fetch(`${API_URL}/api/reservas/`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ReservaDB[] = await response.json();
 
        return data.map(convertReservaToReservation);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        throw error;
    }
};