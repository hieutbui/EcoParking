export interface Ticket {
  singleTicket: SingleTicket;
}

export interface SingleTicket {
  _id: string;
  checkedIn: string;
  checkOut: string;
  ticketDetail: string;
  createdAt: string;
  updatedAt: string;
}
