// apenas o contrato, a interface 

import { Appointment } from "../entities/appointment";

export interface AppintmentsRepository {
    create(appointment: Appointment): Promise<void>;
    findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>;
}