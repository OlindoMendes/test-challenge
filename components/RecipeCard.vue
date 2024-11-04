<template>
  <div class="flex justify-center">
    <div
      @click="getRecipeDetails(recipe.name)"
      class="max-w-xs max-h-xs bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-4 cursor-pointer"
    >
      <a href="#">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full h-48 rounded-t-lg object-cover"
        />
      </a>
      <div class="p-5 text-center">
        <a href="#">
          <h6
            class="mb-2 text-2xs font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {{ recipe.name }}
          </h6>
        </a>
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="tag in recipe.tags"
            :key="tag"
            class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modal for displaying details -->
    <div
      v-if="showDetails"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
    >
      <RecipeDetail :recipe="recipe" @close-modal="close" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { recipeInfo } from "../server/RecipeAPI.js";
import RecipeDetail from "../components/RecipeDetail.vue";

// Definindo as propriedades que o componente recebe
const props = defineProps({
  recipe: Object,
});

const showDetails = ref(false);

const close = (close) => {
  showDetails.value = close;
};

const getRecipeDetails = (name) => {
  showDetails.value = true;
  recipeInfo(name);

  console.log(props.recipe, name);
  // props.recipe.filter((detail)=>)
};
</script>
