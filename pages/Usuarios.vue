<template>
  <div>
    <h1>Lista de Usuários</h1>
    <input v-model="search" placeholder="Buscar por nome" />
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nome Completo</th>
          <th>Data de Nascimento</th>
          <th>Gênero</th>
          <th>Localização</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filterUsers" :key="user.id">
          <td>
            <img :src="user.image" :alt="user.firstName" class="user-image" />
          </td>
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ formatDate(user.birthDate) }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <a
              :href="
                'https://www.google.com/maps?q=' +
                user.address.latitude +
                ',' +
                user.address.longitude
              "
              target="_blank"
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

const users = ref([]);
const search = ref("");

const fetchUsers = async () => {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      users.value = data.users;
      return users.value;
    });
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
