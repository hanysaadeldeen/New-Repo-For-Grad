<template>
  <span ref="target" class="typed-text"></span>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Writer from "t-writer.js";

const target = ref(null);

onMounted(() => {
  const writer = new Writer(target.value, {
    loop: true,
    typeColor: "white",
  });

  writer
    .type("💬 Ask me anything about cybersecurity...")
    .rest(1000)
    .clear()
    .type("🛡 Got a security question? Type it here...")
    .rest(1000)
    .clear()
    .type("🔍 Curious about phishing, malware, or privacy? Ask away...")
    .rest(1000)
    .clear()
    .type("🧠 I'm here to help with anything cybersecurity-related...")
    .rest(1000)
    .clear()
    .start();
});
</script>

<style scoped>
.typed-text {
  font-weight: 500;
  font-size: 16px;
}
</style>
