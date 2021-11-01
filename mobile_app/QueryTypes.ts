// type models for react query

export enum TravelMethod {
  AIR,
  ROAD,
}

export type Traveller = {
  id: number;
  name: string;
  age: number;
  vaccinated: boolean;
};

export type AirInfo = {
  depTime: string;
  arrTime: string;
  flCode: string;
  depCode: string;
  arrCode: string;
};

export type Trip = {
  id: number;
  travelOrigin: string;
  travelDestination: string;
  travelMethod: TravelMethod;
  travelDate: number;
  travellers: Traveller[];
  airInfo: AirInfo;
};
