<template>
  <div
    class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
    style="width: 260px"
  >
    <a href="#">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-48 rounded-lg object-cover"
      />
    </a>
    <div class="p-5">
      <a href="#">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ recipe.name }}
        </h5>
      </a>

      <ol class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <li v-for="tag in recipe.tags" :key="tag">
          <p class="w-full bg-aqua truncate">{{ tag }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Definindo as propriedades que o componente recebe
const props = defineProps({
  recipe: Object,
});
</script>

<style scoped>
.recipe-card {
  background-color: aqua;
  width: 300px;
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
