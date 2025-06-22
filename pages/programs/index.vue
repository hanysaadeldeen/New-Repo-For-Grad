<template>
  <div class="bounties container mx-auto mb-16 px-2 max-sm:px-4">
    <!-- <SectionInfo
      about="Opportunity Discovery"
      description="Find the best opportunities for your skills and wallet"
    /> -->
    <div class="sectionInfo relative flex w-full flex-col gap-5">
      <h1 class="w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
        Opportunity Discovery
      </h1>

      <p class="w-full text-center text-2xl font-medium tracking-wide text-white/60 max-sm:text-justify md:text-2xl">
        Find the best opportunities for your skills and wallet
      </p>
    </div>
    <div class="mt-20">
      <h1 v-if="!loading"
        class="w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
        Campaigns & top-paying opportunities
      </h1>
      <div v-if="loading" class="flex h-full flex-col items-center justify-center gap-4">
        <img src="~/assets/img/Spin.svg" class="size-[150px]" width="150" height="150" alt="Spin" />
      </div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ProgramsCard v-for="program in data" :key="program.id" :program="program" @delete="DeleteProgram" />
      </div>
    </div>
    <div class="mt-8" v-if="usereRole === 'Admin'">
      <nuxt-link to="/programs/AddPrograms">
        <button
          class="group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105">
          Add Programs
        </button></nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">

import { programsController } from "~/composables/programs";
const { fetchPrograms, data, error, loading, deleteProgram } =
  await programsController();

const DeleteProgram = async (id: string) => {
  await deleteProgram(id);
  fetchPrograms();
};


let usereRole = useCookie("userRole");

onMounted(() => {
  fetchPrograms();
});

definePageMeta({
  middleware: 'auth',
})

</script>

<style scoped></style>
