export interface ParkingState {
  parks: ParkingInfo[];
}

export interface ParkingInfo {
  _id: string;
  unitPrice: string;
  name: string;
  address: string;
  quantity: number;
  image: string;
  longitude: {
    $numberDecimal: number;
  };
  latitude: {
    $numberDecimal: number;
  };
  available: number;
  parkType: 0 | 1;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
