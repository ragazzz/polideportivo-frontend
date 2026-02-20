import { useState } from "react";
import { type Reservation, type ViewType } from "../../shared/types/types";
import { Modal } from "../ui/Modal";
import { ThreeDayView } from "./ThreeDayView";
import { WeekView } from "./WeekView";
import { MonthView } from "./MonthView";
import { getFacilityDisplayName } from "../../shared/utils/reservationUtils";
import logo from '../../assets/logo-unemi.png'

interface DetailViewProps {
    facilityId: string;
    reservations: Reservation[];
    open: boolean;
    onClose: () => void;
}

export function DetailView({
    facilityId,
    reservations,
    open,
    onClose,
}: DetailViewProps) {
    const [ currentView, setCurrentView ] = useState<ViewType>('3day');
    const [ selectedDate, setSelectedDate ] = useState<Date>(new Date());

    const displayName = getFacilityDisplayName(facilityId);

    const canGoBack = currentView !== 'month'

    const handleBack = () => {
        if (currentView === '3day') {
        setCurrentView('week');
        } else if (currentView === 'week') {
        setCurrentView('month');
        }
    };

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
        setCurrentView('3day');
    };

    const handleClose = () => {
        setCurrentView('3day');
        setSelectedDate(new Date());
        onClose();
    };

    const viewTitles = {
        '3day': '3 Días',
        'week': 'Semana',
        'month': 'Mes'
    };

    const handleMonthChange = (newDate: Date) => {
        setSelectedDate(newDate);
    };

    return (
        <Modal open={open} onClose={handleClose} size="xl">
            <div className="flex flex-col gap-4 p-6 h-[85vh]">
                {/* Header */}
                <div className="flex items-center gap-6">
                {/* Botón de retroceso */}
                {canGoBack && (
                    <button
                    onClick={handleBack}
                    className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                    aria-label="Atrás"
                    >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 19l-7-7 7-7" 
                        />
                    </svg>
                    </button>
                )}

                <div className="flex-1 ml-5">
                    <h1 className="text-3xl font-bold text-[#0e183f]" style={{userSelect:'none'}}>
                    {displayName}
                    </h1>
                    <p className="text-sm text-[#0e183f] font-bold mt-1" style={{userSelect:'none'}}>
                    {viewTitles[currentView]}
                    </p>
                </div>
                <div>
                    <img src={logo} width={400} alt="Logo del Centro de Formación y Promoción del Deporte Universitario" draggable={"false"} />
                </div>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                    aria-label="Cerrar"
                >
                    <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                    />
                    </svg>
                </button>
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-auto bg-white rounded-lg">
                {currentView === '3day' && (
                    <ThreeDayView 
                    facilityId={facilityId}
                    reservations={reservations}
                    selectedDate={selectedDate}
                    />
                )}
                
                {currentView === 'week' && (
                    <WeekView
                    facilityId={facilityId}
                    reservations={reservations}
                    selectedDate={selectedDate}
                    />
                )}
                
                {currentView === 'month' && (
                    <MonthView
                    facilityId={facilityId}
                    reservations={reservations}
                    selectedDate={selectedDate}
                    onDayClick={handleDayClick}
                    onMonthChange={handleMonthChange}
                    />
                )}
                </div>
            </div>
        </Modal>
    );
}
