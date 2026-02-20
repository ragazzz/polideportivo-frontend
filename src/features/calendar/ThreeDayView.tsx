import React from "react";
import { useState, useRef, useEffect } from "react";
import { type Reservation } from "../../shared/types/types";
import { ReservationDetail } from "./ReservationDetail";
import { generateHourlySlots, getNextDays } from "../../shared/utils/reservationUtils";
import { format } from 'date-fns';
import { es } from "date-fns/locale";

interface ThreeDayViewProps {
    facilityId: string;
    reservations: Reservation[];
    selectedDate?: Date;
}

export function ThreeDayView({ facilityId, reservations, selectedDate = new Date() }: ThreeDayViewProps) {
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [detailOpenModal, setDetailOpenModal] = useState(false);

    const days = getNextDays(selectedDate, 3);

    const now = new Date();
    const currentHour = now.getHours();

    const currentHourRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        if (currentHourRef.current) {
            currentHourRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, []);

    const startHour = 8;
    const endHour = 19;
    const timeSlots = Array.from({ length: endHour - startHour }, (_, i) => startHour + i);

    const handleSlotClick = (reservation?: Reservation) => {
        if (reservation) {
            setSelectedReservation(reservation);
            setDetailOpenModal(true)
        }
    };

    return (
        <>
            <div className="w-full h-full bg-white overflow-auto">
                <div className="sticky top-0 z-10">
                    <div className="grid grid-cols-[120px_1fr_1fr_1fr] gap-0">
                        
                        {/* Header Row */}
                        <div className="bg-gray-100 border-b-2 border-r-2 border-neutral-600" />
                        
                        {days.map((day, idx) => (
                        <div 
                            key={idx}
                            className="bg-gray-100 border-r-2 border-b-2 border-neutral-600 p-4 text-center"
                        >
                            <div className="text-lg font-bold capitalize" style={{ userSelect: 'none' }}>
                            {format(day, 'EEEE', { locale: es })}
                            </div>
                            <div className="text-sm text-gray-600 mt-1"  style={{ userSelect: 'none' }}>
                            {format(day, 'd MMM', { locale: es })}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-[120px_1fr_1fr_1fr] gap-0">
                    {/* Time slots rows */}
                    {timeSlots.map((hour) => {
                        const isCurrentHour = hour === currentHour;

                        return (
                        <React.Fragment key={hour}>
                            {/* Time label */}
                            <div ref={isCurrentHour ? currentHourRef : null } className={`border-r-2 border-b-2 border-neutral-600 p-4 flex items-center justify-center bg-gray-100 ${isCurrentHour ? 'scroll-mt-20': ''}`}>
                            <span className="text-sm font-semibold"  style={{ userSelect: 'none' }}>
                                {`${hour}:00 - ${hour}:59`}
                            </span>
                            </div>

                            {/* Day columns */}
                            {days.map((day, dayIdx) => {
                                const slots = generateHourlySlots(facilityId, day, reservations, hour, hour + 1);
                                const slot = slots[0];

                                const isToday = day.toDateString() === now.toDateString()
                                const isPastHour = isToday && hour < now.getHours();
                                
                                let bgColor = 'bg-lime-200';
                                let bgColorHover = 'bg-lime-200';
                                let textColor = 'text-lime-500';
                                let textColorHover = 'text-lime-500';
                                let displayText = 'Disponible';
                                let isClickable = true;

                                if (isPastHour) {
                                    bgColor = "bg-gray-100";
                                    bgColorHover = "bg-gray-300";
                                    textColor = "text-neutral-600";
                                    textColorHover = "text-gray-500";
                                    displayText = "-";
                                    isClickable = false;
                                }
                                
                                if (slot.status === 'reserved' && !isPastHour) {
                                    bgColor = 'bg-orange-200';
                                    bgColorHover = 'bg-amber-600';
                                    textColor = 'text-orange-500';
                                    textColorHover = 'text-orange-200';
                                    displayText = 'Reservado';
                                }

                                return (
                                    <div
                                    key={`${hour}-${dayIdx}`}
                                    onClick={() => {
                                        if (isClickable && slot.reservation) {
                                            handleSlotClick(slot.reservation);
                                        }
                                    }}
                                    className={`border-b-2 border-r-2 border-neutral-600 group p-4 flex items-center justify-center ${bgColor}
                                    ${slot.status == 'reserved' ? 'cursor-pointer' : 'none'}
                                    ${isClickable ? `hover:${bgColorHover}` : `cursor-not-allowed`}
                                    min-h-20 transition-colors duration-200`}
                                    >
                                    <span
                                        className={`
                                            text-base font-bold transition-colors duration-200
                                            ${textColor}
                                            ${
                                                isClickable
                                                    ? `group-hover:${textColorHover}`
                                                    : ""
                                            }
                                        `}
                                        style={{ userSelect: "none" }}
                                    >
                                        {displayText}
                                    </span>
                                    </div>
                                );
                            })}
                        </React.Fragment>
                        );
                    })}
                </div>
            </div>
            <ReservationDetail
                reservation={selectedReservation}
                open={detailOpenModal}
                onClose={() => setDetailOpenModal(false)}
            />
        </>
    );
}
