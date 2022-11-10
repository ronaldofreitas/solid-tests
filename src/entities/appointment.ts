export interface AppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    private props: AppointmentProps;
    
    constructor(props: AppointmentProps){
        const { startsAt, endsAt } = props;
        if(startsAt <= new Date()){
            throw new Error('invalid end date')
        }
        if(endsAt <= startsAt){
            throw new Error('invalid end date')
        }
        this.props = props;
    }


    get customer() {
        return this.props.customer;
    }

    get startsAt() {
        return this.props.startsAt;
    }

    get endsAt() {
        return this.props.endsAt;
    }

    /*
    // get e set são entradas e saídas da classe
    // são úteis para 'proteger' os atributos da classe
    // dizendo quais são os atributos que podem ter acesso externo
    set endsAt(date: Date){
        if(date > startsAt){
            this.endsAt = date
        }else{
            // throw new Error
        }
    }
    get customer() {
        return this.customer
    }
    */
}