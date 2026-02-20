// Types matching database schema
export interface AreaDB {
  id: number;
  nombre: string;
}

export interface DisciplinaDB {
  id: number;
  nombre: string;
}

export interface CarreraDB {
  id: number;
  nombre: string;
}

export interface ModalidadDB {
  id: number;
  nombre: string;
}

export interface PerfilDB {
  id: number;
  nombre: string;
}

export interface ReservaDB {
  id: number;
  area: AreaDB;            
  disciplina: DisciplinaDB;
  carrera: CarreraDB;      
  modalidad: ModalidadDB;  
  perfil: PerfilDB;        
  responsable: string;
  cedula: string;
  fecha_reserva: string;
  hora_inicio: string;
  hora_fin: string;
  actividad: string;
}

export interface Reservation {
  id: number;
  facilityId: string;
  facilityName: string;
  startDatetime: Date; 
  endDatetime: Date;
  responsable: string;
  cedula: string;
  perfil?:string;
  actividad: string;
  disciplina?:string;
  carrera?:string;
  modalidad?:string;
}

export type ViewType = '3day' | 'week' | 'month';

export type AvailabilityStatus = 'available' | 'reserved' | 'maintenance';

export interface TimeSlot {
    startTime: Date;
    endTime: Date;
    status: AvailabilityStatus;
    reservation?: Reservation;
}

export interface DailySchedule {
    date: Date;
    slots: TimeSlot[];
}

export interface ReservaResponse {
  reservas: ReservaDB[];
  areas: AreaDB[];
  disciplinas: DisciplinaDB[];
  carreras: CarreraDB[];
  modalidades: ModalidadDB[];
  perfiles: PerfilDB[];
}