<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue';
import { AlarmType, DeviceType, AlarmTypeLabels, DeviceTypeLabels } from '../types/alarm';

const props = defineProps({
  filters: Object
});
const emit = defineEmits(['update:filters', 'apply']);

const localFilters = ref({ ...props.filters });

watch(localFilters, (newVal) => {
  emit('update:filters', newVal);
}, { deep: true });

function applyFilters() {
  emit('apply');
}
</script>

<template>
  <div style="display:flex; gap:12px; margin-bottom:16px">
    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      <label>Tipo de Alarme:</label>
      <select v-model="localFilters.type">
        <option :value="null">Todos os tipos</option>
        <option v-for="t in Object.values(AlarmType).filter(key => Number(key))" :key="t" :value="t">{{ AlarmTypeLabels[t as AlarmType] || t }}</option>
      </select>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
      <label>Tipo de Dispositivo:</label>
      <select v-model="localFilters.deviceType">
        <option :value="null">Todos os dispositivos</option>
        <option v-for="t in Object.values(DeviceType).filter(key => Number(key))" :key="t" :value="t ">{{DeviceTypeLabels[t as DeviceType] || t }}</option>
      </select>
    </div>

    <button @click="applyFilters">Aplicar</button>
  </div>
</template>
