<template>
  <div
    class="flex w-full flex-col justify-between rounded-lg bg-primary p-6 shadow-lg"
  >
    <div
      class="relative flex items-center justify-between border-b border-gray-200 pb-3"
    >
      <div class="flex items-center space-x-3">
        <img
          :src="
            program.image !== null
              ? program.image
              : '~/assets/img/CompanyPlaceholder.svg'
          "
          alt="Image"
          class="h-10 w-10 rounded-full"
          width="40"
          height="40"
        />
        <span class="text-lg font-semibold text-white">{{
          program.companyName
        }}</span>
      </div>
      <div class="flex items-center gap-4" v-if="usereRole === 'Admin'">
        <nuxt-link :to="localePath(`/programs/${program.id}/edtiProgram`)">
          <span
            ><i
              class="fa-regular fa-pen-to-square cursor-pointer text-2xl font-light text-hookYellow transition-all duration-200 ease-in-out hover:text-hookYellow/70"
            ></i
          ></span>
        </nuxt-link>
        <button @click="emit('delete', program.id)">
          <i
            class="fa-regular fa-trash-can cursor-pointer text-2xl font-light text-red-500 transition-all duration-200 ease-in-out hover:text-red-600"
          ></i>
        </button>
      </div>
    </div>

    <h2 class="mt-4 text-xl font-bold text-white">{{ program.title }}</h2>
    <p class="text-sm text-paragraph">{{ program.collaborationType }}</p>

    <!-- <div class="mt-4 flex flex-wrap gap-2">
      <span
        class="rounded-full bg-[#E0E9FF] px-3 py-1 text-xs font-medium text-[#002375]"
        >Domain <span class="border-l border-[#002375] pl-1">7</span></span
      >
      <span
        class="rounded-full bg-[#E0E9FF] px-3 py-1 text-xs font-medium text-[#002375]"
        >Wildcard <span class="border-l border-[#002375] pl-1">7</span></span
      >
      <span
        class="rounded-full bg-[#E0E9FF] px-3 py-1 text-xs font-medium text-[#002375]"
        >AndroidPlaySt
        <span class="border-l border-[#002375] pl-1">7</span></span
      >
      <span
        class="rounded-full bg-[#E0E9FF] px-3 py-1 text-xs font-medium text-[#002375]"
        >iOSAppStore <span class="border-l border-[#002375] pl-1">7</span></span
      >
      <span
        class="rounded-full bg-[#E0E9FF] px-3 py-1 text-xs font-medium text-[#002375]"
        >y Program <span class="border-l border-[#002375] pl-1">7</span></span
      >
    </div> -->

    <div class="mt-6">
      <div class="flex items-center space-x-2" v-if="program.goldStandard">
        <span
          class="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-medium text-pink-600"
          >Gold Standard</span
        >
      </div>
      <div class="mt-2 flex items-center">
        <span class="mr-2 text-green-500">💰</span>
        <span class="text-lg font-semibold text-white"
          >${{ program.high }}k - ${{ program.low }}k</span
        >
      </div>
    </div>

    <div class="mt-4 flex space-x-4 text-sm text-white">
      <!-- <div class="flex items-center text-lg font-bold">
        <i class="fa-solid fa-bug mr-1.5 text-paragraph"></i>
        35
      </div> -->
      <div class="flex items-center text-lg font-bold">
        <svg
          class="mr-1.5 h-5 w-5 text-paragraph"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        {{ program.hackersPaid }}
      </div>
      <div class="flex items-center text-lg font-bold">
        <span
          class="mb-0.5 mr-1.5 h-2.5 w-2.5 rounded-full bg-green-300"
        ></span>
        % {{ program.responseEfficiency }}
      </div>
    </div>

    <nuxt-link :to="localePath(`/programs/${program.id}`)">
      <!-- <button
        class="group/edit mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-hookYellow py-2 text-lg font-medium capitalize tracking-wider"
      >
        See Details
        <i
          class="fa-solid fa-arrow-right cursor-pointer text-white transition-all duration-300 ease-in-out group-hover/edit:translate-x-2"
        ></i>
      </button> -->

      <Button title="See Details" isArrow />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
import { programsController } from "~/composables/programs";

interface Props {
  program: any;
}

defineProps<Props>();
const emit = defineEmits(["delete"]);

let usereRole = useCookie("userRole");
</script>

<style scoped></style>
