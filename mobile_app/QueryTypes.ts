// type models for react query

enum TravelMethod {
  AIR,
  ROAD,
}

export type Traveller = {
  id: number;
  name: string;
  age: number;
  isVaccinated: boolean;
};

export type Trip = {
  id: number;
  travelOrigin: string;
  travelDestination: string;
  travelMethod: TravelMethod;
  travelDate: number;
  travellers: Traveller[];
};
