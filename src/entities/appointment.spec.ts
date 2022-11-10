import {expect, test} from 'vitest'
import { getFutureDate } from '../utils/tests/get-future-date';
import { Appointment } from './appointment'


test("criar um agendamento" , () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11')
    const appointment = new Appointment({
        customer: 'Jhon Doe',
        startsAt,
        endsAt
    });

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('Jhon Doe')
})

test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-09')

    expect(() => {
        return new Appointment({
            customer: 'Jhon Doe',
            startsAt,
            endsAt
        })
    }).toThrow()
})


test('não deveria criar um agendamento anterior a data atual', () => {
    const startsAt = new Date();
    const endsAt = new Date();
    endsAt.setDate(startsAt.getDate() + 2)
    endsAt.setDate(endsAt.getDate() + 1)

    expect(() => {
        return new Appointment({
            customer: 'Jhon Doe',
            startsAt,
            endsAt
        })
    }).toThrow()
})