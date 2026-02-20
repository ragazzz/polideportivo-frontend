import React, { useState } from 'react';
import { type Reservation } from '../../shared/types/types';
import { ReservationDetail } from './ReservationDetail';
import { 
  generateHourlySlots, 
  getNextDays
} from '../../shared/utils/reservationUtils';
import { format, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';

interface WeekViewProps {
  facilityId: string;
  reservations: Reservation[];
  selectedDate?: Date;
}

export function WeekView({ 
  facilityId, 
  reservations, 
  selectedDate = new Date() 
}: WeekViewProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [detailOpenModal, setDetailOpenModal] = useState(false);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const days = getNextDays(weekStart, 7);

  const startHour = 8;
  const endHour = 19;
  const hours = Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i
  );

  const now = new Date();
  const currentHour = now.getHours();

  const handleSlotClick = (reservation?: Reservation) => {
    if (reservation) {
      setSelectedReservation(reservation);
      setDetailOpenModal(true);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-white overflow-auto">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-white border-b-2 border-[#fcf9f9]">
          <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-0">
            <div className="bg-[#0F1252] border-r-2 border-[#fcf9f9] p-2" />

            {days.map((day, idx) => (
              <div 
                key={idx}
                className="bg-[#0F1252] border-r border-[#fcf9f9] p-3 text-center"
              >
                <div className="text-sm text-[#D9DCD9] font-bold capitalize" style={{ userSelect: 'none' }}>
                  {format(day, 'EEE', { locale: es })}
                </div>
                <div className="text-sm text-[#D9DCD9] font-bold" style={{ userSelect: 'none' }}>
                  {format(day, 'd MMM', { locale: es })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-0">
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* Hour label */}
              <div className="border-b border-r-2 border-[#fcf9f9] p-2 flex items-center justify-center bg-[#0F1252] sticky left-0 z-5">
                <span className="text-sm text-[#D9DCD9] font-semibold" style={{ userSelect: 'none' }}>
                  {`${hour}:00`}
                </span>
              </div>

              {days.map((day, dayIdx) => {
                const slots = generateHourlySlots(
                  facilityId,
                  day,
                  reservations,
                  hour,
                  hour + 1
                );

                const slot = slots[0];

                const isToday =
                  day.toDateString() === now.toDateString();

                const isPastDay =
                  day < new Date(now.setHours(0, 0, 0, 0));

                const isPastHourToday =
                  isToday && hour < currentHour;

                const isDisabled = isPastDay || isPastHourToday;

                let bgColor = 'bg-lime-400';
                let bgColorHover = 'bg-lime-400';
                let textColor = 'text-black';
                let textColorHover = 'text-black';
                let displayText = 'Disponible';

                if (isDisabled) {
                  bgColor = 'bg-gray-100';
                  bgColorHover = 'bg-gray-300';
                  textColor = 'text-gray-500';
                  textColorHover = 'text-gray-500';
                  displayText = '-';
                } 
                else if (slot.status === 'reserved') {
                  bgColor = 'bg-orange-400';
                  bgColorHover = 'bg-amber-700';
                  textColor = 'text-black';
                  textColorHover = 'text-black';
                  displayText = 'Reservado';
                }

                return (
                  <div
                    key={`${hour}-${dayIdx}`}
                    onClick={() => {
                      if (!isDisabled && slot.reservation) {
                        handleSlotClick(slot.reservation);
                      }
                    }}
                    className={`
                      border-b border-r border-[#fcf9f9]
                      group p-2 flex items-center justify-center min-h-16
                      transition-colors duration-200
                      ${bgColor}
                      ${
                        !isDisabled
                          ? slot.reservation ? `hover:${bgColorHover} cursor-pointer` : ''
                          : 'cursor-not-allowed'
                      }
                    `}
                  >
                    <span
                      className={`
                        text-xs font-bold transition-colors duration-200
                        ${textColor}
                        ${
                          !isDisabled
                            ? `group-hover:${textColorHover}`
                            : ''
                        }
                      `}
                      style={{ userSelect: 'none' }}
                    >
                      {displayText}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
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