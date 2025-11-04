<script setup lang="ts">
import { type Alarm } from './types/alarm';
import { ref, onMounted } from 'vue';
import AlarmFilters from './components/AlarmFilters.vue';
import AlarmList from './components/AlarmList.vue';
import { fetchAlarms, socket } from './services/api';

const filters = ref({
  type: null,
  deviceType: null,
  checked: null,
  serial: '',
  from: null,
  to: null,
});

const alarms = ref<Alarm[]>([]);
const total = ref(0);
const page = ref(1);
const limit = ref(20);

async function loadAlarms() {
  const params = {
    page: page.value,
    limit: limit.value,
    type: filters.value.type,
    deviceType: filters.value.deviceType,
    checked: filters.value.checked,
    serial: filters.value.serial,
    from: filters.value.from,
    to: filters.value.to
  };

  const data = await fetchAlarms(params);
  alarms.value = data.alarms;
  total.value = data.total;
}

function onPageChange(newPage: number) {
  page.value = newPage;
  loadAlarms();
}

onMounted(async () => {
  await loadAlarms();

  socket.on('connect', () => console.log('connected to socket', socket.id));

  socket.on('newAlarm', (alarm: Alarm) => {
    const f = filters.value;
    if (
      (f.type && f.type !== alarm.type) ||
      (f.deviceType && f.deviceType !== alarm.deviceType) ||
      (f.checked !== null && f.checked !== alarm.checked) ||
      (f.serial && !alarm.serial.toLowerCase().includes(f.serial.toLowerCase()))
    ) {
      total.value += 1;
      return;
    }

    alarms.value.unshift(alarm);
    total.value += 1;
    if (alarms.value.length > limit.value) alarms.value.pop();
  });
});
</script>

<template>
  <div style="max-width:1000px;margin:0 auto;padding:16px">
    <h1>Bionic CodeChallenge — Alarms</h1>
    <AlarmFilters v-model:filters="filters" @apply="loadAlarms" />
    <AlarmList
      :alarms="alarms"
      :total="total"
      :page="page"
      :limit="limit"
      @page-change="onPageChange"
    />
  </div>
</template>

<style scoped></style>
