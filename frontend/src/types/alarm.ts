export interface Alarm {
  _id?: string;
  serial: string;
  type: AlarmType;
  checked: boolean;
  deviceType: DeviceType;
  createdAt?: string;
}

export enum AlarmType {
  Intrusion = 1,
  Temperature,
  Leak,
  Battery,
  Connectivity
}

export enum DeviceType {
  DoorSensor = 1,
  TempSensor,
  WaterDetector,
  Tracker,
  Gateway
}

export const AlarmTypeLabels: { [key in AlarmType]: string } = {
  [AlarmType.Intrusion]: 'Intrusão',
  [AlarmType.Temperature]: 'Temperatura',
  [AlarmType.Leak]: 'Vazamento',
  [AlarmType.Battery]: 'Bateria',
  [AlarmType.Connectivity]: 'Conectividade'
};

export const DeviceTypeLabels: { [key in DeviceType]: string } = {
  [DeviceType.DoorSensor]: 'Sensor de Porta',
  [DeviceType.TempSensor]: 'Sensor de Temperatura',
  [DeviceType.WaterDetector]: 'Detector de Água',
  [DeviceType.Tracker]: 'Rastreador',
  [DeviceType.Gateway]: 'Gateway'
};
