<template>
  <section
    ref="WebsiteScannerHero"
    class="mt-8 flex items-center justify-between gap-16 max-md:flex-col md:mt-16"
  >
    <div ref="WebsiteScannerHeroLeft" class="w-full md:w-1/2 md:max-w-[600px]">
      <h1
        class="mb-4 bg-gradient-to-b bg-clip-text text-center text-2xl font-bold text-transparent text-white md:mb-6 md:text-4xl"
      >
        Web Vulnerability Management
      </h1>
      <p
        class="mb-4 text-center text-xl font-medium leading-6 text-white/60 md:mb-6"
      >
        Stay ahead of web threats with a powerful, unified vulnerability
        scanning solution. Zero Point provides complete visibility, streamlined
        workflows, and detailed reporting to help you identify and eliminate
        critical injection-based vulnerabilities across dynamic web
        environments.
      </p>
      <div class="flex justify-center">
        <a
          href="https://www.dropbox.com/scl/fi/r68gi2ysb3osl32imvhz5/Zero-Point-Security-Scanner.rar?rlkey=pb7bvlmsd6jsn14sydrk9mem5&st=dyqa3bd4&dl=1"
          class="text-decoration-none cursor-pointer"
        >
          <button
            class="mx-auto w-full rounded-full bg-hookYellow px-7 py-2 text-lg font-medium shadow-[0_0_20px_rgba(255,193,7,0.7)] transition-all duration-500 ease-in-out hover:shadow-[0_0_35px_rgba(255,193,7,0.7)] sm:w-fit"
          >
            Download Now
          </button>
        </a>
      </div>
    </div>
    <div ref="WebsiteScannerImage" class="w-full md:w-1/2 md:max-w-[600px]">
      <img src="~/assets/img/websiteScaner1.png" alt="webScanner Image" />
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";

const WebsiteScannerHero = ref(null);
const WebsiteScannerHeroLeft = ref(null);
const WebsiteScannerImage = ref(null);
onMounted(() => {
  gsap.from(WebsiteScannerHeroLeft.value, {
    opacity: 0,
    duration: 1,
    x: -300,
    ease: "power2.out",
  });
  gsap.from(WebsiteScannerImage.value, {
    opacity: 0,
    duration: 1,
    x: 300,
    ease: "power2.out",
  });
});
</script>

<style scoped></style>
