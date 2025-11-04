<template>
  <div>
    <div v-if="(alarms?.length ?? 0) === 0">Nenhum alarme</div>
    <table border="1" cellpadding="8" cellspacing="0" style="width:100%;margin-bottom:12px">
      <thead>
        <tr>
          <th>Serial</th>
          <th>Tipo de Alarme</th>
          <th>Device</th>
          <th>Checked</th>
          <th>Recebido em</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in alarms" :key="a._id">
          <td>{{ a.serial }}</td>
          <td>{{ mapType(a.type) }}</td>
          <td>{{ mapDevice(a.deviceType) }}</td>
          <td>{{ a.checked }}</td>
          <td>{{ a.createdAt ? new Date(a.createdAt).toLocaleString() : '' }}</td>
        </tr>
      </tbody>
    </table>

    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>Total: {{ total }}</div>
      <div>
        <button :disabled="(page ?? 1) <= 1" @click="changePage((page ?? 1) - 1)">Anterior</button>
        <span> Página {{ page ?? 1 }} </span>
        <button :disabled="((page ?? 1) * (limit ?? 1)) >= (total ?? 0)" @click="changePage((page ?? 1) + 1)">Próxima</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type Alarm, type AlarmType, type DeviceType, AlarmTypeLabels, DeviceTypeLabels } from '../types/alarm';
  import { defineProps, defineEmits, toRefs } from 'vue';

  const props = defineProps({
    alarms: Array<Alarm>,
    total: Number,
    page: Number,
    limit: Number
  });
  const { alarms, total, page, limit } = toRefs(props);
  const emit = defineEmits(['page-change']);

  function changePage(n: number) {
    emit('page-change', n);
  }

  function mapType(t: AlarmType) {
    return AlarmTypeLabels[t] || t;
  }
  function mapDevice(d: DeviceType) {
    return DeviceTypeLabels[d] || d;
  }
</script>
