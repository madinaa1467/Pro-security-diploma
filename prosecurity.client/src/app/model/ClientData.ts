import {Phone} from "./Phone";
import {Tickets} from "./Tickets";

export class ClientData {

  name: string;
  surname: string;
  midname: string;

  phoneList: Phone[] = [];
  tickets: Tickets[] = [];

  addFakePhone(): any {
    this.phoneList.push(new Phone("+77757776655"));
    this.phoneList.push(new Phone("+77017785441"));
    this.phoneList.push(new Phone("+77027713254"));
  }

  addFakeTickets(): any {
    let ticket = new Tickets();
    ticket.startDate = "2018-12-20";
    ticket.endDate = new Date("2018-12-31");
    ticket.id = 124452;
    ticket.isClosed = true;
    ticket.title = "Обращение по кск";
    ticket.description = "Абонент пожаловался на высокое напряжение в сети";

    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
    this.tickets.push(ticket);
  }
}