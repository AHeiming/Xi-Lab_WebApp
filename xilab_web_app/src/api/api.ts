import { Device } from "../types/types";

const API_URL = "http://localhost:8080";

const getAllDevices = async () => {
  return await fetch(`${API_URL}/device/all`)
    .then((res) => res.json())
    .then((json) => {
      return json as Device[];
    })
    .catch((err) => {
      console.error(err);
      return {} as Device[];
    });
};

const getAllDevicesBelowBatteryLevel = async (batteryLevel: number) => {
  return await fetch(`${API_URL}/device/battery?value=${batteryLevel}`)
    .then((res) => res.json())
    .then((json) => {
      return json as Device[];
    })
    .catch((err) => {
      console.error(err);
      return {} as Device[];
    });
};

const getAllEmptyDevices = async () => {
  return await fetch(`${API_URL}/device/minimum`)
    .then((res) => res.json())
    .then((json) => {
      return json as Device[];
    })
    .catch((err) => {
      console.error(err);
      return {} as Device[];
    });
};

const createDevice = async (
  name: string,
  minWaterCapacity: number,
  maxWaterCapacity: number
) => {
  let token = localStorage.getItem("token");
  if (token) {
    return await fetch(
      `${API_URL}/admin/new/device?name=${encodeURIComponent(
        name
      )}&min=${encodeURIComponent(minWaterCapacity)}&max=${encodeURIComponent(
        maxWaterCapacity
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          return Promise.reject({
            success: false,
            error: "Something went wrong creating the device",
            file: null,
          });
        }
      })
      .then((blob) => {
        console.log("Blob!");
        console.log(blob);
        return { success: true, error: "", file: blob };
      });
  }
  return { success: false, error: "Not authenticated!", file: null };
};

const editDevice = async (device: Device) => {
  let token = localStorage.getItem("token");
  if (token) {
    return await fetch(`${API_URL}/admin/patch`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceData: device.deviceData,
        locationData: device.locationData,
        waterSensorData: device.waterSensorData,
      }),
    }).then((res) => {
      if (res.ok) {
        return { success: true, error: "" };
      } else {
        console.log(res);
        console.log(res.json());
        return { success: false, error: "Something went wrong" };
      }
    });
  }
  return { success: false, error: "Not authenticated!" };
};

const deleteDevice = async (uuid: string) => {
  let token = localStorage.getItem("token");
  if (token) {
    return fetch(`${API_URL}/admin/remove/device?uuid=${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return { success: true, error: "" };
      } else {
        return { success: true, error: "Something went wrong" };
      }
    });
  }
  return { success: false, error: "Not authenticated!" };
};

const ApiService = {
  createDevice,
  editDevice,
  deleteDevice,
  getAllDevices,
  getAllDevicesBelowBatteryLevel,
  getAllEmptyDevices,
};

export default ApiService;
