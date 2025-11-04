import axios from 'axios';
import { io } from 'socket.io-client';
import {type AlarmType, type DeviceType } from '../types/alarm';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8082';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

export const socket = io(API_BASE, { transports: ['websocket', 'polling'] });

export async function fetchAlarms({ page = 1, limit = 50, type, deviceType }: { page?: number; limit?: number; type?: AlarmType; deviceType?: DeviceType } = {}) {
  const params: { page?: number; limit?: number; type?: AlarmType; deviceType?: DeviceType } = { page, limit };
  if (type) params.type = type;
  if (deviceType) params.deviceType = deviceType;
  const res = await api.get('/alarms', { params });
  return res.data;
}
