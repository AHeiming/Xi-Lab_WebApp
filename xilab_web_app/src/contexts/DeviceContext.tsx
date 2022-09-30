import { createContext, useContext, useEffect, useState } from "react";
import ApiService from "../api/api";
import { Device } from "../types/types";

export const DeviceContext = createContext<DeviceContextType>(
  {} as DeviceContextType
);

export interface DeviceContextType {
  devices: Device[];
  refreshDevices(): void;
  filterForEmptyDevices(): void;
  filterForLowBatteryDevice(batteryLevel: number): void;
}

interface DeviceContextProps {
  children: React.ReactNode;
}

export function DeviceProvider({ children }: DeviceContextProps) {
  const [devices, setDevices] = useState<Device[]>([]);

  async function loadDevices() {
    let response = await ApiService.getAllDevices();
    setDevices(response);
  }

  async function refreshDevices() {
    loadDevices();
  }

  async function filterForEmptyDevices() {
    let response = await ApiService.getAllEmptyDevices();
    setDevices(response);
  }

  async function filterForLowBatteryDevice(batteryLevel: number) {
    let response = await ApiService.getAllDevicesBelowBatteryLevel(
      batteryLevel
    );
    setDevices(response);
  }

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        refreshDevices,
        filterForEmptyDevices,
        filterForLowBatteryDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevices = () => useContext(DeviceContext);
