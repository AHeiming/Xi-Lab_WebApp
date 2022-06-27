export type Marker = {
  device: Device;
  water: Water;
  location: Location;
};

type Device = {
  name: string;
  id: string;
  battery: number;
};

type Water = {
  min: number;
  max: number;
  current: number;
};

type Location = {
  latitude: number;
  longitude: number;
};
