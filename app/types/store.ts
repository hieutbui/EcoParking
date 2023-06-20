import { AccountState } from './account';
import { AppState } from './app';

export interface StoreState {
  app: AppState;
  account: AccountState;
}
