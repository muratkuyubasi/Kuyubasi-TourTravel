import { ReservationPerson } from "./reservation-person";

export interface Reservation{
        code?:string;
        activeTourId?:string;
        ReservationCode?:string;
        ContactFirstName?:string;
        ContactLastName?:string;
        ContactEmail?:string;
        ContactPhone?:string;
        Note?:string;
        ContactStreet?:string;
        ContactPostalCode?:string;
        ContactDoorNumber?:string;
        ContactAddress?:string;
        ContactCity?:string;
        ContactState?:string;
        ContactCountry?:string;
        InvoiceTitle?:string;
        TaxNumber?:string;
        TaxAdministration?:string;
        InvoiceAddress?:string;
        InvoicePostalCode?:string;
        InvoiceDoorNumber?:string;
        InvoiceCity?:string;
        InvoiceState?:string;
        InvoiceCountry?:string;
        TotalAmount?:number;
        Uyruk?:string;
        ReservationPersons?:ReservationPerson[];
        //ReservationChilds?: ReservationPerson[];

}