<template>
  <div class="content">
    
    <TagSelector :tags="availableTags" @updateTags="updateSelectedTags" />
    <div
      v-if="filteredRecipes"
      style="
        display: grid;
        column-gap: 100px;
        grid-template-columns: 220px 220px 220px 220px;
        padding: 10px;
      "
    >
      <div v-for="recipe in filteredRecipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" />
      </div>
    </div>
    <div v-else>
      <p>Não foram encontradas receitas com as tags selecionadas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TagSelector from "../components/TagSelector.vue";
import RecipeCard from "../components/RecipeCard.vue";
import { fetchRecipes } from "../server/RecipeAPI.js";

const recipes = ref([]);
const filteredRecipes = computed(() => {
  if (recipes.value)
    return recipes.value.filter((recipe) =>
      selectedTags.value.every((tag) => recipe.tags.includes(tag))
    );
});
onMounted(async () => {
  try {
    const response = await fetchRecipes();
    console.log(response.recipes);
    recipes.value = response.recipes;
    getTags();
  } catch (error) {
    console.log(`Something goes wrong while trying to get data ${error}`);
  }
});
// Dados reativos
const availableTags = ref([]);
const selectedTags = ref([]);

// Computed para filtrar receitas

// Método para buscar receitas
const getTags = () => {
  availableTags.value = [
    ...new Set(recipes.value.flatMap((recipe) => recipe.tags)),
  ];
};

// Atualiza as tags selecionadas
const updateSelectedTags = (tags) => {
  selectedTags.value = tags;
};

// Monta o componente e busca as receitas
</script>

<style scoped>
.content {
  display: flexbox;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  margin-inline:16rem ;
}
</style>