// todo caso de uso tem uma única responsabilidade

import { Appointment } from "../entities/appointment";
import { AppintmentsRepository } from "../repositories/appointment-repository";

interface CreateAppointmentRequest {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
    
    // inversão de dependencia
    constructor(
        private appoimentsRepository: AppintmentsRepository
    ){}

    //async execute(request: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{
    async execute({
        customer,
        startsAt,
        endsAt
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse>{
        const overlappingAppointment = await this.appoimentsRepository.findOverlappingAppointment(
            startsAt,
            endsAt
        )
        if(overlappingAppointment){
            throw new Error('Outro appoinment já existe com essas datas')
        }
        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        })

        await this.appoimentsRepository.create(appointment)

        return appointment
    }
}