export async function fetchRecipes() {
    const response = await fetch('https://dummyjson.com/recipes');
    if (!response.ok) throw new Error('Erro ao carregar receitas');
    return await response.json();
}