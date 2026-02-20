import { useEffect, useState } from "react";
import { type Reservation } from "../types/types";
import { fetchReservations } from "../api/reservations";

export function useReservations(pollInterval: number = 60000) {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadReservations = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchReservations();
            setReservations(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
            setError(errorMessage);
            console.error('Error loading reservations:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();

        const interval = setInterval(loadReservations, pollInterval);
        return () => clearInterval(interval);
    }, [pollInterval]);

    return {
        reservations,
        loading,
        error,
        refetch: loadReservations,
    };
}
