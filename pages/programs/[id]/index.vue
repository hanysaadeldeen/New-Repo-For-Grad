<template>
  <div v-if="loading" class="flex h-full flex-col items-center justify-center gap-4">
    <img src="~/assets/img/Spin.svg" class="size-[150px]" width="150" height="150" alt="Spin" />
  </div>
  <div v-if="programId">
    <div class="headerProgram overflow-hidden bg-white/95 px-4 py-5">
      <div class="container mx-auto px-2 max-sm:px-4">
        <div class="relative z-20 mb-4 flex items-center justify-between">
          <div class="flex w-full items-start gap-5 max-md:flex-col">
            <div class="h-24 w-24 overflow-hidden rounded-full">
              <img :src="programId.image
                ? programId.image
                : '~/assets/img/CompanyPlaceholder.svg'
                " width="96" height="96" alt="company1" class="h-24 w-24 object-cover" loading="lazy" />
            </div>
            <div class="max-md:w-full">
              <h1 class="text-3xl font-bold text-white">
                {{ programId.title }}
              </h1>
              <p class="mb-2 text-paragraph">
                Company: {{ programId.companyName }}
              </p>
              <div class="mb-2 flex w-full items-center rounded-lg bg-white px-5 py-1 text-gray-600 shadow">
                <span>BUG BOUNTY</span>
              </div>
              <div class="flex w-full items-center rounded-lg bg-black px-5 py-1 text-white">
                <span>TRIAGED BY Zero-Point-Path </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-2 max-sm:px-4">
        <div class="relative z-20 mb-6 flex items-center md:mb-6 md:justify-end">
          <div class="flex flex-col items-center gap-2 max-md:w-full">
            <button
              class="group/edit flex w-full items-center justify-center gap-3 rounded-md border-2 border-hookYellow bg-transparent px-6 py-3 text-center text-xl font-medium tracking-wider text-white transition-all duration-300 ease-in-out hover:scale-105">
              This program is active now
            </button>

            <nuxt-link v-if="userId" :to="localePath({
              path: `/programs/${params.id}/report`,
              query: {
                critical: programId.rewards.critical,
                low: programId.rewards.low,
              },
            })
              "
              class="group/edit flex w-full items-center justify-center gap-3 rounded-md bg-hookYellow py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105">
              Submit report
              <i
                class="fa-solid fa-arrow-right cursor-pointer text-[#A1A1AA] transition-all duration-300 ease-in-out group-hover/edit:translate-x-2 group-hover/edit:text-white"></i>
            </nuxt-link>
          </div>
        </div>
        <div class="relative z-20 flex space-x-6">
          <p class="cursor-pointer border-hookYellow pb-2 text-lg font-semibold text-white hover:text-[#dddd]" :class="bountyType === 'programInfo' ? 'border-b-2 text-primary' : ''
            " @click="bountyType = 'programInfo'">
            Program info
          </p>
          <!-- <p
            class="cursor-pointer border-hookYellow pb-2 text-lg font-semibold text-white hover:text-[#dddd]"
            :class="bountyType === 'Hackers' ? 'border-b-2 text-primary' : ''"
            @click="bountyType = 'Hackers'"
          >
            Hackers (2)
          </p> -->
          <p class="cursor-pointer pb-2 text-lg font-semibold text-white hover:text-[#dddd]" :class="bountyType === 'Reports'
            ? 'border-b-2 border-hookYellow text-primary'
            : ''
            " @click="bountyType = 'Reports'">
            Reports
          </p>
        </div>
      </div>
    </div>
    <div class="container mx-auto mb-16 px-2 max-sm:px-4">
      <BountiesInfo :bountyType="bountyType" :programId="programId" />
    </div>
  </div>
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
</template>

<script setup lang="ts">
import BountiesInfo from "~/components/programs/BountiesInfo.vue";

const { params } = useRoute();
const localePath = useLocalePath();

const bountyType = ref<string>("programInfo");
const userId = useCookie("userId");

const route = useRoute();
import { programsController } from "~/composables/programs";
const { fetchProgramById, programId, error, loading } =
  await programsController();


onMounted(() => {
  fetchProgramById(route.params.id.toString());
});



definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped>
.headerProgram {
  background-image: url("../../../assets/img/program.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}

.headerProgram::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
