<template>
  <button
    class="group/edit mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-hookYellow py-2 text-lg font-medium capitalize tracking-wider text-black transition-all duration-300 ease-in-out hover:text-white"
  >
    {{ title }}
    <i
      v-if="isArrow"
      class="fa-solid fa-arrow-right text-blakck cursor-pointer transition-all duration-300 ease-in-out group-hover/edit:translate-x-2 group-hover/edit:text-white"
    ></i>
  </button>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  isArrow?: boolean;
}

defineProps<Props>();
</script>

<style scoped></style>
