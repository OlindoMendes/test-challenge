<template>
  <div class="content">
    <TagSelector :tags="availableTags" @updateTags="updateSelectedTags" />

    <div
      v-if="filteredRecipes.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
    >
      <div v-for="recipe in filteredRecipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
    <div v-else class="text-center mt-4">
      <p class="text-gray-600 dark:text-gray-300">
        Não foram encontradas receitas com as tags selecionadas.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TagSelector from "../components/TagSelector.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { fetchRecipes } from "../server/RecipeAPI.js";

const recipes = ref([]);
const availableTags = ref([]);
const selectedTags = ref([]);

const filteredRecipes = computed(() => {
  if (recipes.value)
    return recipes.value.filter((recipe) =>
      selectedTags.value.every((tag) => recipe.tags.includes(tag))
    );
});

const getTags = () => {
  availableTags.value = [
    ...new Set(recipes.value.flatMap((recipe) => recipe.tags)),
  ];
};

const updateSelectedTags = (tags) => {
  selectedTags.value = tags;
};

onMounted(async () => {
  try {
    const response = await fetchRecipes();
    recipes.value = response.recipes;
    getTags();
  } catch (error) {
    console.error("Erro ao tentar obter os dados:", error);
  }
});
</script>

<style scoped>
.content {
  margin-inline: 8rem;
}
</style>
