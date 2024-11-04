<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Cadastro de Pet</h1>
    <form
      @submit.prevent="handleSubmit"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label for="birthdate" class="block text-sm font-medium"
          >Data de Nascimento</label
        >
        <input
          type="date"
          id="birthdate"
          v-model="form.birthdate"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          :max="maxDate"
          :min="minDate"
          placeholder="Insira a sua data de nascimento..."
        />
      </div>

      <div class="mb-4">
        <label for="fullName" class="block text-sm font-medium"
          >Nome Completo</label
        >
        <input
          type="text"
          id="fullName"
          v-model="form.fullName"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="cpf" class="block text-sm font-medium">CPF</label>
        <input
          type="text"
          id="cpf"
          v-model="form.cpf"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          @input="validateCPF"
        />
        <span v-if="!isCPFValid" class="text-red-500 text-sm"
          >CPF inválido.</span
        >
      </div>

      <div class="mb-4">
        <label for="petType" class="block text-sm font-medium"
          >Espécie do Pet</label
        >
        <select
          id="petType"
          v-model="form.petType"
          @change="updateBreedOptions"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        >
          <option value="">Selecione</option>
          <option value="cão">Cão</option>
          <option value="gato">Gato</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="petBreed" class="block text-sm font-medium"
          >Raça do Pet</label
        >
        <select
          id="petBreed"
          v-model="form.petBreed"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        >
          <option v-for="breed in breedOptions" :key="breed" :value="breed">
            {{ breed }}
          </option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div v-if="form.petBreed === 'outro'" class="mb-4">
        <label for="otherBreed" class="block text-sm font-medium"
          >Especifique a Raça</label
        >
        <input
          type="text"
          id="otherBreed"
          v-model="form.otherBreed"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="monthlyIncome" class="block text-sm font-medium"
          >Renda Mensal</label
        >
        <input
          type="text"
          id="monthlyIncome"
          v-model="form.monthlyIncome"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          placeholder="R$"
          @input="validateIncome"
        />
        <span v-if="!isIncomeValid" class="text-red-500 text-sm"
          >Renda mínima: R$ 1000,00.</span
        >
      </div>

      <div class="mb-4">
        <label for="cep" class="block text-sm font-medium">CEP</label>
        <input
          type="text"
          id="cep"
          v-model="form.cep"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          @blur="fetchAddress"
        />
        <span v-if="!isCepValid" class="text-red-500 text-sm"
          >CEP inválido.</span
        >
      </div>

      <div class="mb-4">
        <label for="street" class="block text-sm font-medium">Rua</label>
        <input
          type="text"
          id="street"
          v-model="form.street"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="neighborhood" class="block text-sm font-medium"
          >Bairro</label
        >
        <input
          type="text"
          id="neighborhood"
          v-model="form.neighborhood"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="city" class="block text-sm font-medium">Cidade</label>
        <input
          type="text"
          id="city"
          v-model="form.city"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="state" class="block text-sm font-medium">Estado</label>
        <input
          type="text"
          id="state"
          v-model="form.state"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          maxlength="2"
          @input="validateState"
        />
        <span v-if="!isStateValid" class="text-red-500 text-sm"
          >O estado deve ser duas letras maiúsculas.</span
        >
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cadastrar
      </button>

      <ModalCadastroInfo :form="form" v-if="showModal" @close-modal="close" />
    </form>
  </div>
</template>

<script setup>
import ModalCadastroInfo from "../components/ModalCadastroInfo.vue";
import { getAddress } from "../server/CadastroAPI.js";
import { ref, computed } from "vue";

const form = ref({
  birthdate: "",
  fullName: "",
  cpf: "",
  petType: "",
  petBreed: "",
  otherBreed: "",
  monthlyIncome: "",
  cep: "",
  street: "",
  neighborhood: "",
  city: "",
  state: "",
});

const isCPFValid = ref(true);
const isIncomeValid = ref(true);
const isCepValid = ref(true);
const isStateValid = ref(true);
const showModal = ref(false);

const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date.toISOString().split("T")[0];
});

const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 65);
  return date.toISOString().split("T")[0];
});

const breedOptions = ref([]);

function validateCPF() {
  isCPFValid.value = form.value.cpf.length === 11;
}

function validateIncome() {
  const incomeValue = parseFloat(
    form.value.monthlyIncome.replace("R$", "").replace(",", ".")
  );
  isIncomeValid.value = !isNaN(incomeValue) && incomeValue >= 1000;
}

function validateState() {
  isStateValid.value = /^[A-Z]{2}$/.test(form.value.state);
}

function updateBreedOptions() {
  if (form.value.petType === "cão") {
    breedOptions.value = ["Labrador", "Poodle", "Bulldog", "Beagle", "Boxer"];
  } else if (form.value.petType === "gato") {
    breedOptions.value = ["Siamês", "Persa", "Maine Coon", "Bengal", "Sphynx"];
  } else {
    breedOptions.value = [];
  }
  form.value.petBreed = "";
  form.value.otherBreed = "";
}

async function fetchAddress() {
  if (!form.value.cep) {
    isCepValid.value = false;
    return;
  }

  try {
    const response = await getAddress(form.value.cep);

    const data = await response.json();

    if (data.erro) {
      isCepValid.value = false;
      return;
    }

    form.value.street = data.logradouro;
    form.value.neighborhood = data.bairro;
    form.value.city = data.localidade;
    form.value.state = data.uf;
    isCepValid.value = true;
  } catch (error) {
    isCepValid.value = false;
  }
}

const close = (close) => {
  showModal.value = close;
};

function handleSubmit() {
  if (
    isCPFValid.value &&
    isIncomeValid.value &&
    isCepValid.value &&
    isStateValid.value
  ) {
    showModal.value = true;
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
}
</script>
