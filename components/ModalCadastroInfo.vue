<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded shadow-lg">
      <h2 class="text-lg font-bold mb-2">Informações Cadastradas</h2>
      <p><strong>Nome:</strong> {{ form.fullName }}</p>
      <p><strong>CPF:</strong> {{ form.cpf }}</p>
      <p><strong>Data de Nascimento:</strong> {{ form.birthdate }}</p>
      <p>
        <strong>Pet:</strong> {{ form.petType }} <strong>Raça:</strong>
        {{ form.petBreed }}
      </p>
      <p><strong>Renda mensal</strong> {{ form.monthlyIncome }}</p>
      <p><strong>CEP:</strong> {{ form.cep }}</p>
      <p>
        <strong>Endereço:</strong> {{ form.street }} <strong>Bairro:</strong>
        {{ form.neighborhood }} <strong>Cidade:</strong> {{ form.city }}
        <strong>Estado:</strong>
        {{ form.state }}
      </p>
      <button
        @click="emitClose"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Fechar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  form: Object,
});

const showDetails = ref(false);

const emit = defineEmits(["closeModal"]);
const emitClose = () => {
  emit("closeModal", showDetails.value);
};
</script>
