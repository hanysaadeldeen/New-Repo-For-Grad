<template>
  <div class="relative h-fit rounded-xl bg-[#131619] px-5 py-7 md:w-[400px]">
    <div :class="id === 2 ? 'label' : 'hidden'"></div>
    <div class="flex flex-col justify-between">
      <span class="relative text-lg font-medium tracking-wider text-paragraph">
        {{ description }}
      </span>
      <div class="relative mt-1 text-3xl tracking-wider text-white">
        <span class="font-bold"> {{ price }}</span>
        <span class="ml-1 text-xl font-semibold uppercase text-white/90">
          {{ currency }}</span
        >
        <span
          class="text-base uppercase text-white/80"
          :class="id === 1 ? 'hidden' : ''"
        >
          /Year</span
        >
      </div>
      <div class="content mt-7 flex flex-col gap-7">
        <div
          class="flex items-center gap-4"
          v-for="(item, index) in content"
          :key="index"
        >
          <i class="fa-solid fa-check text-hookYellow"></i>
          <p class="text-white">{{ item }}</p>
        </div>
      </div>
      <button
        :class="
          id === 2 ? 'cursor-not-allowed bg-hookYellow/50 text-black/50' : ''
        "
        class="mt-7 w-full rounded-full bg-hookYellow py-2 text-lg font-medium capitalize tracking-wider"
      >
        {{ btn }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  id: number;
  price: string;
  currency: string;
  description: string;
  content: string[];
  btn: string;
  classs: string;
};
defineProps<Props>();
</script>

<style scoped>
.label {
  position: absolute;
  writing-mode: vertical-rl;
  height: 70px;
  background-color: #ffb45c;
  color: white;
  font-weight: bold;
  padding: 10px 10px 35px 10px;
  font-size: 18px;
  top: 0;
  right: 20px;
  width: 30px;
}
.label::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-style: solid;
  border-color: transparent transparent #131619;
  border-width: 15px;
}
</style>
