export interface AccountState {
  userInfo: {
    _id: string;
    name: string;
    avatar: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    password: string;
    phoneNumber: string;
    address: string;
    role: 0 | 1 | 2;
    createdAt: Date;
    updatedAt: Date;
    accessToken: string;
    refreshToken: string;
  };
  ongoing: [];
  completed: [];
  canceled: [];
  status: 'loggingIn' | 'loggedIn' | 'loggedOut' | 'loggingOut';
}
