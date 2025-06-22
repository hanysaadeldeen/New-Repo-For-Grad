<template>
  <div class="container mx-auto px-2 max-sm:px-4">
    <nuxt-link class="flex items-center gap-2 text-lg text-paragraph hover:text-white"
      :to="$localePath(`/programs/${params.id}`)">
      <i class="fa-solid fa-arrow-left"></i>
      <span> Back to Reports </span>
    </nuxt-link>
    <section class="mt-16">
      <ReportSection />
    </section>
  </div>
</template>

<script setup lang="ts">
import ReportSection from "~/components/programs/ReportSection.vue";

const { params } = useRoute();


</script>

<style scoped>
.subHeader {
  @apply mb-4 border-b border-secondary pb-2 text-lg font-semibold text-white md:text-2xl;
}
</style>
