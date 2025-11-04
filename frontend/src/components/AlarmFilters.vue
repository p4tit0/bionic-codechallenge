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

function clearFilters() {
  localFilters.value = {
    type: null,
    deviceType: null,
    checked: null,
    serial: '',
    from: '',
    to: ''
  };
  emit('update:filters', localFilters.value);
  emit('apply');
}
</script>

<template>
  <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:16px">
    <div style="display:flex; flex-direction:column; gap:0.25rem;">
      <label>Tipo de Alarme:</label>
      <select v-model="localFilters.type">
        <option :value="null">Todos</option>
        <option
          v-for="t in Object.values(AlarmType).filter(key => Number(key))"
          :key="t"
          :value="t"
        >
          {{ AlarmTypeLabels[t as AlarmType] || t }}
        </option>
      </select>
    </div>

    <div style="display:flex; flex-direction:column; gap:0.25rem;">
      <label>Tipo de Dispositivo:</label>
      <select v-model="localFilters.deviceType">
        <option :value="null">Todos</option>
        <option
          v-for="t in Object.values(DeviceType).filter(key => Number(key))"
          :key="t"
          :value="t"
        >
          {{ DeviceTypeLabels[t as DeviceType] || t }}
        </option>
      </select>
    </div>

    <div style="display:flex; flex-direction:column; gap:0.25rem;">
      <label>Verificado:</label>
      <select v-model="localFilters.checked">
        <option :value="null">Todos</option>
        <option :value="true">Sim</option>
        <option :value="false">Não</option>
      </select>
    </div>

    <div style="display:flex; flex-direction:column; gap:0.25rem;">
      <label>Serial (contém):</label>
      <input
        v-model="localFilters.serial"
        type="text"
        placeholder="ex: 123ABC"
        style="padding:1px"
      />
    </div>

    <div style="display:flex; flex-direction:column; gap:0.25rem;">
      <label>De (após):</label>
      <input v-model="localFilters.from" type="datetime-local" />
    </div>

    <div style="display:flex; flex-direction:column; gap:0.25rem;">
      <label>Até (antes):</label>
      <input v-model="localFilters.to" type="datetime-local" />
    </div>

    <div style="display:flex; align-items:end; gap:8px;">
      <button @click="applyFilters" style="padding:6px 12px;">Aplicar</button>
      <button @click="clearFilters" style="padding:6px 12px;">Limpar</button>
    </div>
  </div>
</template>
