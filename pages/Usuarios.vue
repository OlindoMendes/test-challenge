<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Lista de Usuários</h1>
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Buscar por nome..."
      @input="filterUsers"
      class="mb-4 p-2 border rounded w-full"
    />
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Foto</th>
          <th class="p-2 border">Nome Completo</th>
          <th class="p-2 border">Data de Nascimento</th>
          <th class="p-2 border">Gênero</th>
          <th class="p-2 border">Localização</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="p-2 border">
            <img
              :src="user.picture"
              alt="Foto do usuário"
              class="w-10 h-10 rounded-full"
            />
          </td>
          <td class="p-2 border">{{ user.name }}</td>
          <td class="p-2 border">{{ formatDate(user.dob) }}</td>
          <td class="p-2 border">{{ user.gender }}</td>
          <td class="p-2 border">
            <button
              @click="openMap(user.location)"
              class="text-blue-500 hover:underline"
            >
              Ver no mapa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
// import axios from "axios";
onMounted(() => {
  fetchUsers();
});

const users = ref([]);
const searchTerm = ref("");

const fetchUsers = async () => {
  try {
    const response = await fetch("https://api.example.com/users");
    users.value = response.data; // Ajuste conforme a estrutura da API
    users.value.sort((a, b) => a.name.localeCompare(b.name)); // Ordena em ordem alfabética
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
};

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

const openMap = (location) => {
  const { latitude, longitude } = location;
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(url, "_blank");
};

const filteredUsers = computed(() => {
  if (!searchTerm.value) {
    return users.value;
  }
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(fetchUsers);
</script>

<style scoped>
/* Adicione estilos adicionais se necessário */
</style>
