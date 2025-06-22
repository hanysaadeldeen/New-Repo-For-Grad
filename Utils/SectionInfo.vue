<template>
  <div class="sectionInfo relative flex w-full flex-col gap-5 sm:max-w-[640px]">
    <h1
      v-html="$t(about)"
      class="w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl"
    ></h1>

    <p class="text-xl font-medium leading-6 text-paragraph">
      {{ description && $t(description) }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Props = {
  about: string;
  description?: string;
};
defineProps<Props>();
</script>

<style scoped>
.sectionInfo {
  width: 640px;
}

@media (max-width: 768px) {
  .sectionInfo {
    width: 100%;
  }
}
</style>
