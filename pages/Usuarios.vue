<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Lista de Usuários</h1>
    <input
      v-model="search"
      placeholder="Buscar por nome"
      class="mb-4 p-2 border border-gray-300 rounded shadow-sm w-full"
    />
    <table
      class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg"
    >
      <thead class="bg-gray-50">
        <tr>
          <th class="py-3 px-6 text-left">Foto</th>
          <th class="py-3 px-6 text-left">Nome Completo</th>
          <th class="py-3 px-6 text-left">Data de Nascimento</th>
          <th class="py-3 px-6 text-left">Gênero</th>
          <th class="py-3 px-6 text-left">Localização</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filterUsers" :key="user.id" class="border-t">
          <td class="py-3 px-6">
            <img
              :src="user.image"
              :alt="user.firstName"
              class="w-12 h-12 rounded-full object-cover"
            />
          </td>
          <td class="py-3 px-6">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="py-3 px-6">{{ formatDate(user.birthDate) }}</td>
          <td class="py-3 px-6">{{ user.gender }}</td>
          <td class="py-3 px-6">
            <a
              :href="
                'https://www.google.com/maps?q=' +
                user.address.latitude +
                ',' +
                user.address.longitude
              "
              target="_blank"
              class="text-blue-600 hover:text-blue-800"
              >Ver no Mapa</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getUsers } from "../server/UsersAPI.js";

const users = ref([]);
const search = ref("");

const fetchUsers = async () => {
  try {
    const response = await getUsers();
    if (!response.ok) {
      throw new Error(
        `Erro ao buscar usuários: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return (users.value = data.users);
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};

const filterUsers = computed(() => {
  return users.value.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("pt-BR");
};

onMounted(async () => await fetchUsers());
</script>

<style scoped>
.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
