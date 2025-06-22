<template>
  <section class="websiteScanner">
    <div class="container mx-auto px-4">
      <h1
        class="mb-8 bg-gradient-to-b bg-clip-text text-center text-3xl font-bold tracking-wider text-transparent text-white md:text-4xl">
        ZeroPointSecurity Scanner
      </h1>
      <WebsiteScannerHero />
      <WebsiteScannerChasing />
      <WebsiteScannerUseCase />
    </div>
  </section>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped></style>
