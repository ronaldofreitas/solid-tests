import { areIntervalsOverlapping } from 'date-fns'
import { Appointment } from "../../entities/appointment";
import { AppintmentsRepository } from "../appointment-repository";

export class InMemoryAppointmentsRepository implements AppintmentsRepository {

    public items: Appointment[] = []

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.items.find(appoinemtn => {
            return areIntervalsOverlapping(
                {start: startsAt, end: endsAt},
                {start: appoinemtn.startsAt, end: appoinemtn.endsAt},
                {inclusive: true}
            );
        })

        if(!overlappingAppointment){
            return null
        }

        return overlappingAppointment
    }
}