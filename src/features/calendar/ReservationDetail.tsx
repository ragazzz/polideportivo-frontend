import { type Reservation } from "../../shared/types/types";
import { Modal } from "../ui/Modal";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ReservationDetailProps {
    reservation: Reservation | null;
    open: boolean;
    onClose: () => void;
}

export function ReservationDetail({
    reservation,
    open,
    onClose
}: ReservationDetailProps ){
    if(!reservation) return null;

    return(
        <Modal open={open} onClose={onClose} size="md">
            <div className="p-6 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 shrink-0">
                <h2 className="text-2xl font-bold text-gray-800">
                    Espacio reservado
                </h2>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Cerrar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>

                {/* Content */}
                <div className="space-y-4 overflow-y-auto pr-2">
                {/* Horario */}
                <div className="text-center bg-orange-100 rounded-lg p-4 border-2 border-orange-300">
                    <p className="text-3xl font-bold text-gray-800">
                    {format(reservation.startDatetime, 'H:mm')} - {format(reservation.endDatetime, 'H:mm')}
                    </p>
                    <p className="text-lg text-gray-700 mt-2 capitalize">
                    {format(reservation.startDatetime, "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                </div>

                {/* Responsable */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Responsable</p>
                    <p className="text-lg text-gray-800">{reservation.responsable}</p>
                </div>

                {/* Perfil */}
                {reservation.perfil && (
                    <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Perfil</p>
                    <p className="text-lg text-gray-800">{reservation.perfil}</p>
                    </div>
                )}

                {/* Disciplina */}
                {reservation.disciplina && (
                    <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Disciplina</p>
                    <p className="text-lg text-gray-800">{reservation.disciplina}</p>
                    </div>
                )}

                {/* Actividad */}
                {reservation.actividad && (
                    <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Actividad</p>
                    <p className="text-gray-800">{reservation.actividad}</p>
                    </div>
                )}

                {/* Carrera */}
                {reservation.carrera && reservation.carrera !== 'NO REGISTRA' && (
                    <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Carrera</p>
                    <p className="text-lg text-gray-800">{reservation.carrera}</p>
                    </div>
                )}

                {/* Modalidad */}
                {reservation.modalidad && reservation.modalidad !== 'NO REGISTRA' && (
                    <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Modalidad</p>
                    <p className="text-lg text-gray-800">{reservation.modalidad}</p>
                    </div>
                )}
                </div>
            </div>
        </Modal>
    );
}
