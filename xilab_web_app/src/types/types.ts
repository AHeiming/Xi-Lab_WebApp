export type Marker = {
  device: Device;
};

export type Device = {
  deviceData: DeviceData;
  locationData: Location;
  waterSensorData: Water;
};

type DeviceData = {
  name: string;
  uuid: string;
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
