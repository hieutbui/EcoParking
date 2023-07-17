import { ParkingState, Ticket } from '.';
import { AccountState } from './account';
import { AppState } from './app';

export interface StoreState {
  app: AppState;
  account: AccountState;
  parking: ParkingState;
  ticket: Ticket;
}
