export interface Ticket {
  singleTicket: SingleTicket;
  parkName: string;
  carNumber: string;
  ticketDetailId: string;
}

export interface SingleTicket {
  _id: string;
  checkedIn: string;
  checkedOut: string;
  ticketDetail: string;
  createdAt: string;
  updatedAt: string;
}
