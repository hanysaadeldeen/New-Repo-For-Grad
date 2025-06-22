<template>
  <div
    class="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#131619] px-5 py-7"
  >
    <div class="mb-8 flex items-center justify-between gap-3">
      <i
        :class="[
          icon,
          'relative z-20 text-2xl transition-all duration-500 ease-in-out group-hover:text-white',
        ]"
        :style="{ color: color }"
      ></i>
      <h2 class="relative z-20 text-xl font-medium text-white">
        {{ $t(title) }}
      </h2>
    </div>

    <p
      class="relative z-20 text-base font-normal text-[#A1A1AA] transition-all duration-500 ease-in-out group-hover:text-white"
    >
      {{ $t(description) }}
    </p>
    <div
      class="absolute top-0 z-10 h-full w-1 transition-all duration-500 ease-in-out group-hover:h-full group-hover:w-full"
      :class="locale === 'ar' ? 'left-0' : 'right-0'"
      :style="{ background: color }"
    ></div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  description: string;
  color: string;
  icon: string;
};

defineProps<Props>();

const { locale } = useI18n();
</script>

<style scoped>
.group:hover i {
  color: white !important;
}
</style>
