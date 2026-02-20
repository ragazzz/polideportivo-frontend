import { type ReservaDB, type Reservation } from '../types/types';
import {
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  addHours,
  addDays,
  startOfDay,
  endOfDay
} from 'date-fns';

export const FACILITY_NAME_MAP: Record<string, string> = {
  'Cancha de básquetbol # 1': 'Basketball N1',
  'Cancha de básquetbol # 2': 'Basketball N2',
  'Cancha de básquetbol # 3': 'Basketball N3',
  'Cancha de voleibol # 1': 'Voleyball N1',
  'Cancha de voleibol # 2': 'Voleyball N2',
  'Cancha de voleibol # 3': 'Voleyball N3',
  'Cancha de voleibol de playa': 'Voleyplaya',
  'Cancha de fútbol 11': 'Futbol 11',
  'Piscina semiolímpica': 'Piscina',
  'Piscina': 'Piscina',
  'Gimnasio': 'Gimnasio',
  'Estadio Universitario': 'Estadio',
  'Estadio': 'Estadio',
  'Pista atlética': 'Pista atlética',
  'Bloque Q': 'Bloque Q'
};

export function getSvgIdFromAreaName(areaName: string): string {
  return FACILITY_NAME_MAP[areaName] || areaName;
}

export function getFacilityDisplayName(facilityId: string): string {
  const entry = Object.entries(FACILITY_NAME_MAP).find(([_, id]) => id === facilityId);
  return entry ? entry[0] : facilityId;
}

export function convertReservaToReservation(reserva: ReservaDB): Reservation {
  const areaName = reserva.area.nombre;
  const facilityId = getSvgIdFromAreaName(areaName);
  const baseDate = parseISO(reserva.fecha_reserva);
  const [startHour, startMin, startSec = 0] = reserva.hora_inicio
    .split(':')
    .map(Number);
  
  const [endHour, endMin, endSec = 0] = reserva.hora_fin
    .split(':')
    .map(Number);
  const startDatetime = setSeconds(
    setMinutes(
      setHours(baseDate, startHour),
      startMin
    ),
    startSec
  );
  
  const endDatetime = setSeconds(
    setMinutes(
      setHours(baseDate, endHour),
      endMin
    ),
    endSec
  );
  
  return {
    id: reserva.id,
    facilityId,
    facilityName: areaName,
    startDatetime,
    endDatetime,
    responsable: reserva.responsable,
    cedula: reserva.cedula,
    perfil: reserva.perfil.nombre,
    actividad: reserva.actividad,
    disciplina: reserva.disciplina.nombre,
    carrera: reserva.carrera.nombre,
    modalidad: reserva.modalidad.nombre
  };
}

export function getReservationsForDay(
  facilityId: string,
  date: Date,
  reservations: Reservation[]
): Reservation[] {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);
  
  return reservations.filter(reservation => {
    if (reservation.facilityId !== facilityId) return false;
    return (
      reservation.startDatetime < dayEnd &&
      reservation.endDatetime > dayStart
    );
  });
}

export function generateHourlySlots(
  facilityId: string,
  date: Date,
  reservations: Reservation[],
  startHour: number = 8,
  endHour: number = 19
) {
  const slots = [];
  const dayReservations = getReservationsForDay(facilityId, date, reservations);
  
  for (let hour = startHour; hour < endHour; hour++) {
    const slotStart = setMinutes(setHours(date, hour), 0);
    const slotEnd = addHours(slotStart, 1);
    
    const reservation = dayReservations.find(r => 
      r.startDatetime <= slotStart && r.endDatetime > slotStart
    );
    
    slots.push({
      startTime: slotStart,
      endTime: slotEnd,
      status: reservation ? 'reserved' : 'available',
      reservation
    });
  }
  
  return slots;
}

export function getNextDays(startDate: Date, numberOfDays: number): Date[] {
  return Array.from({ length: numberOfDays }, (_, i) => addDays(startDate, i));
}

export function getDayStatus(
  facilityId: string,
  date: Date,
  reservations: Reservation[]
): 'available' | 'reserved' {
  const dayReservations = getReservationsForDay(facilityId, date, reservations);
  
  if (dayReservations.length === 0) return 'available';
  
  const totalOperatingMinutes = 11 * 60;
  let reservedMinutes = 0;
  
  const dayStart = setHours(startOfDay(date), 8);
  const dayEnd = setHours(startOfDay(date), 20);
  
  dayReservations.forEach(reservation => {
    const overlapStart = reservation.startDatetime > dayStart ? reservation.startDatetime : dayStart;
    const overlapEnd = reservation.endDatetime < dayEnd ? reservation.endDatetime : dayEnd;
    
    if (overlapStart < overlapEnd) {
      reservedMinutes += (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60);
    }
  });
  
  return reservedMinutes >= totalOperatingMinutes * 0.9 ? 'reserved' : 'available';
}

export function isReservedAt(
  facilityId: string,
  checkTime: Date,
  reservations: Reservation[]
): boolean {
  return reservations.some(reservation => {
    if (reservation.facilityId !== facilityId ) return false;

    return (
      checkTime >= reservation.startDatetime && checkTime < reservation.endDatetime
    );
  });
}
