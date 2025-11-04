import axios from 'axios';
import { io } from 'socket.io-client';
import { type AlarmType, type DeviceType } from '../types/alarm';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8082';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

export const socket = io(API_BASE, { transports: ['websocket', 'polling'] });

export interface FetchAlarmsParams {
  page: number | null;
  limit: number | null;
  type: AlarmType | null;
  deviceType: DeviceType | null;
  checked: boolean | null;
  serial: string | null;
  to: string | null;
  from: string | null;
}


export async function fetchAlarms(params: FetchAlarmsParams = {
  page: null,
  limit: null,
  type: null,
  deviceType: null,
  checked: null,
  serial: null,
  to: null,
  from: null
}) {
  const query: Record<string, string | number | boolean> = {
    page: params.page ?? 1,
    limit: params.limit ?? 50
  };

  if (params.type) query.type = params.type;
  if (params.deviceType) query.deviceType = params.deviceType;
  if (params.checked) query.checked = params.checked;
  if (params.serial) query.serial = params.serial;

  if (params.to && !params.from) query.before = params.to;
  if (!params.to && params.from) query.after = params.from;
  if (params.to && params.from) {
    query.from = params.from;
    query.to = params.to;
  }

  const res = await api.get('/alarms', { params: query });
  return res.data;
}
