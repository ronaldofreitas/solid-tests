import { expect, test } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointment-repository";
import { getFutureDate } from "../utils/tests/get-future-date";
import { CreateAppointment } from "./create-appointment";

/*
parou no minuto 46:15
*/

test('deveria ser possível criar um agendamento', () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')

    const appoimentsRepository = new InMemoryAppointmentsRepository()
    // system under test
    const sut = new CreateAppointment(appoimentsRepository);

    expect(sut.execute({
        customer: 'Jhon Doe',
        startsAt,
        endsAt
    })).resolves.toBeInstanceOf(Appointment)
})

test('não deveria ser possível criar um agendamento se já existe com a mesma data', async () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-15')

    const appoimentsRepository = new InMemoryAppointmentsRepository()
    // system under test
    //const sut = new CreateAppointment(appoimentsRepository);
    const createAppointment = new CreateAppointment(appoimentsRepository);
    await createAppointment.execute({
        customer: 'Jhon Doe',
        startsAt,
        endsAt
    })

    expect(
        createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt: getFutureDate('2022-08-14'),
            endsAt: getFutureDate('2022-08-18')
        })
    ).rejects.toBeInstanceOf(Error)

    expect(
        createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-12')
        })
    ).rejects.toBeInstanceOf(Error)

    expect(
        createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-17')
        })
    ).rejects.toBeInstanceOf(Error)

    expect(
        createAppointment.execute({
            customer: 'Jhon Doe',
            startsAt: getFutureDate('2022-08-08'),
            endsAt: getFutureDate('2022-08-17')
        })
    ).rejects.toBeInstanceOf(Error)
})