
export async function recipeInfo(name) {
    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${name}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar a receita: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}


export async function fetchRecipes() {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
            throw new Error(`Erro ao carregar receitas: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}
