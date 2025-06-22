<template>
  <h1 class="text-2xl font-bold text-secondary">
    this is id {{ param.params.id }}
  </h1>
</template>

<script setup lang="ts">
const param = useRoute();
console.log(param);
</script>

<style scoped></style>
