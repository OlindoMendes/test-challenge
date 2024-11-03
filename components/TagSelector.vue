<template>
  <div  class="w-full"">
    <label v-for="tag in tags" :key="tag" class="inline-block">
      <input
        type="checkbox"
        :value="tag"
        v-model="selectedTags"
        @change="emitUpdateTags"
        class="hidden"
      />
      <span
        class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 m-2 cursor-pointer"
        :class="selectedTags.includes(tag) ? 'bg-gray-400 text-white ' : ''"
      >
        {{ tag }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits } from "vue";

// Definição das propriedades e eventos
const props = defineProps({
  tags: Array,
});

const emit = defineEmits(["updateTags"]);

// Estado reativo para as tags selecionadas
const selectedTags = ref([]);

// Emitir as tags selecionadas quando mudar
const emitUpdateTags = () => {
  emit("updateTags", selectedTags.value);
};

// Observar as alterações em selectedTags e emitir mudanças
watch(selectedTags, emitUpdateTags);
</script>
