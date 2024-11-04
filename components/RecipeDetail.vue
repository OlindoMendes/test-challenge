<template>
  <div class="bg-white p-6 rounded shadow-lg flex flex-col md:flex-row gap-6">
    <img :src="recipe.image" class="w-full md:w-72 rounded object-cover" />

    <div class="flex flex-col">
      <p class="mb-2"><strong>Nome:</strong> {{ recipe.name }}</p>

      <div class="mb-4">
        <strong>Ingredientes:</strong>
        <ol class="list-disc list-inside">
          <li v-for="item in recipe.ingredients" :key="item.id">{{ item }}</li>
        </ol>
      </div>

      <div class="mb-4">
        <strong>Modo de preparo:</strong>
        <ol class="list-decimal list-inside">
          <li v-for="instruction in recipe.instructions" :key="instruction.id">
            {{ instruction }}
          </li>
        </ol>
      </div>

      <button
        @click="emitClose"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  recipe: Object,
});

const showDetails = ref(false);

const emit = defineEmits(["closeModal"]);
const emitClose = () => {
  emit("closeModal", showDetails.value);
};
</script>
