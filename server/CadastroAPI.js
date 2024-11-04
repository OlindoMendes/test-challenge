

export async function getAddress(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar receitas: ${response.status} ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}