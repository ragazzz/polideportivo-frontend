import { type Reservation } from '../../shared/types/types';
import { getDayStatus, getNextDays } from '../../shared/utils/reservationUtils';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek,
  addMonths,
  subMonths,
  isBefore
} from 'date-fns';
import { es } from 'date-fns/locale';

interface MonthViewProps {
  facilityId: string;
  reservations: Reservation[];
  selectedDate?: Date;
  onDayClick?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}

export function MonthView({ 
  facilityId, 
  reservations, 
  selectedDate = new Date(),
  onDayClick,
  onMonthChange
}: MonthViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const totalDays =
    Math.ceil(
      (calendarEnd.getTime() - calendarStart.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  const days = getNextDays(calendarStart, totalDays);

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0));

  const currentMonth = startOfMonth(new Date());
  const isCurrentMonth = selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear();

  const handlePreviousMonth = () => {
    const previousMonth = subMonths(selectedDate, 1);
    if (!isBefore(startOfMonth(previousMonth), currentMonth)) {
      onMonthChange?.(previousMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(selectedDate, 1)

    onMonthChange?.(nextMonth);
  };

  return (
    <div className="w-full h-full bg-white rounded-lg p-6">
      {/* Month header */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <button
          onClick={handlePreviousMonth}
          disabled={isCurrentMonth}
          className={`p-2 rounded-full transition-colors ${
            isCurrentMonth
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
          aria-label="Mes anterior"
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
        <h2
          className="text-3xl font-bold text-gray-800 capitalize"
          style={{ userSelect: 'none' }}
        >
          {format(selectedDate, 'MMMM yyyy', { locale: es })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          aria-label="Mes siguiente"
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
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 py-3"
            style={{ userSelect: 'none' }}
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, idx) => {
          const isCurrentMonth =
            day.getMonth() === selectedDate.getMonth();

          const isPastDay =
            day < todayStart;

          const isDisabled = !isCurrentMonth || isPastDay;

          const dayStatus = getDayStatus(
            facilityId,
            day,
            reservations
          );

          const isToday = day.getTime() === todayStart.getTime()

          let statusColor = 'bg-lime-300';
          if (dayStatus === 'reserved') {
            statusColor = 'bg-red-500';
          }

          return (
            <button
              key={idx}
              onClick={() => {
                if (!isDisabled) {
                  onDayClick?.(day);
                }
              }}
              disabled={isDisabled}
              className={`
                aspect-square rounded-lg border-2 p-4 flex flex-col
                items-center justify-center transition-all
                ${
                  isDisabled
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                    : isToday
                    ? 'border-blue-500 bg-blue-50 hover:border-blue-600 shadow-md cursor-pointer'
                    : 'border-gray-300 hover:border-blue-400 cursor-pointer hover:shadow-lg'
                }
              `}
            >
              <span
                className={`text-xl font-semibold mb-2 ${
                  isDisabled
                    ? 'text-gray-400'
                    : isToday
                    ?  'text-blue-600'
                    : 'text-gray-800'
                }`}
                style={{ userSelect: 'none' }}
              >
                {format(day, 'd')}
              </span>

              {!isDisabled && (
                <div className={`w-3 h-3 rounded-full ${statusColor}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pb-6 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-lime-300" />
          <span className="text-sm text-gray-600">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600">Reservado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-400" />
          <span className="text-sm text-gray-600">No disponible</span>
        </div>
      </div>
    </div>
  );
}