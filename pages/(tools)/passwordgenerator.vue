<template>
  <section class="blog">
    <div class="container mx-auto px-4">
      <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
        Password Generator
      </h1>

      <div class="result relative mt-4 rounded bg-secondary p-4 text-center font-semibold tracking-wider text-white">
        <div class="font-mono text-lg" @click="copyPassword">
          {{ password || "CLICK GENERATE" }}
        </div>

        <button v-if="password" @click="copyPassword"
          class="absolute right-2 top-2 flex items-center gap-2 text-lg text-white transition-all duration-300 ease-in-out hover:scale-105">
          copy
          <i class="far fa-copy"></i>
        </button>
      </div>

      <div class="mt-4">
        <label
          class="my-2 inline-block bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center font-bold tracking-wider text-transparent md:text-xl">Length:
          {{ length }}</label>
        <input type="range" v-model="length" min="4" max="32" class="w-full cursor-pointer" />
      </div>

      <div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label class="mx-2 inline-block cursor-pointer text-2xl font-bold text-white"><input type="checkbox"
            v-model="options.uppercase" class="mr-2 cursor-pointer" />
          Uppercase</label>
        <label class="mx-2 inline-block cursor-pointer text-2xl font-bold text-white"><input type="checkbox"
            v-model="options.lowercase" class="mr-2 cursor-pointer" />
          Lowercase</label>
        <label class="mx-2 inline-block cursor-pointer text-2xl font-bold text-white"><input type="checkbox"
            v-model="options.number" class="mr-2 cursor-pointer" />
          Numbers</label>
        <label class="mx-2 inline-block cursor-pointer text-2xl font-bold text-white"><input type="checkbox"
            v-model="options.symbol" class="mr-2 cursor-pointer" />
          Symbols</label>
      </div>

      <button @click="generatePassword"
        class="mx-auto mt-5 block h-fit w-full rounded-xl bg-hookYellow bg-gradient-to-l px-10 py-2.5 text-lg font-bold capitalize tracking-wider text-black md:w-fit">
        Generate Password
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
const toast = useToast({ position: "top-right", duration: 1500 });
const password = ref("");
const length = ref(16);
const options = ref({
  uppercase: true,
  lowercase: true,
  number: true,
  symbol: false,
});

const characters = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: '~!@#$%^&*()_+{}":?><;.,',
};

const generatePassword = () => {
  let availableChars = "";
  Object.keys(options.value).forEach((key) => {
    if (options.value[key]) availableChars += characters[key];
  });
  if (!availableChars) return;

  let newPassword = "";
  for (let i = 0; i < length.value; i++) {
    newPassword +=
      availableChars[Math.floor(Math.random() * availableChars.length)];
  }
  password.value = newPassword;
};

const copyPassword = () => {
  if (!password.value) return;
  navigator.clipboard.writeText(password.value);
  toast.success("Copied to clipboard");
};


definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped>
/* @media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    width: 100%;
    background-color: white;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #092034;
    margin-top: -1px;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 2px;
    -webkit-appearance: none;
    height: 10px;
    cursor: ew-resize;
    background: #434343;
    box-shadow: -80px 0 0 80px #092034;
  }
}*/
</style>
