export async function getUsers() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status} ${response.statusText}`);
        }

        return response
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};
