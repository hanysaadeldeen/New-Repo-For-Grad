<template>
  <div ref="HeroSectionRef" class="HeroSectionRef startSection heroSection relative h-dvh">
    <div class="absolute -top-24 left-0 h-dvh w-full opacity-70">
      <div class="h-full w-full bg-[url('/assets/img/Pattern.png')] bg-cover bg-top"></div>
    </div>
    <div ref="HeroSectionRefContainer" class="container relative z-10 mx-auto h-full px-4">
      <div class="flex h-full flex-col justify-center">
        <h1
          class="mb-2 bg-gradient-to-r from-[#FFFFFF] to-[#FFFFFF] bg-clip-text pt-4 text-center text-5xl font-bold text-transparent md:text-center md:text-7xl">
          {{ $t("introSectionTitle1") }}
        </h1>

        <div>
          <p class="text-center text-lg font-medium text-paragraph">
            {{ $t("introSectionTitle1Paragraph1") }}
          </p>
          <p class="text-center text-lg font-medium text-paragraph">
            {{ $t("introSectionTitle1Paragraph2") }}.
          </p>
        </div>
        <nuxt-link v-if="!userRole" to="login" class="mx-auto">
          <button
            class="mt-7 w-full rounded-full bg-hookYellow px-7 py-2 text-lg font-medium shadow-[0_0_20px_rgba(255,193,7,0.7)] transition-all duration-500 ease-in-out hover:shadow-[0_0_35px_rgba(255,193,7,0.7)] sm:w-fit">
            <span class="button-text">{{ $t("introSectionButton") }}</span>
          </button>
        </nuxt-link>
        <div class="mx-auto mt-16 size-10 cursor-pointer" @click="scrollToNextSection">
          <img src="~/assets/img/scrollThree2.gif" alt="scroll" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const localePath = useLocalePath(); 
const userRole = useCookie("userRole");


// <div
//       class="absolute left-0 top-0 h-screen w-full bg-gradient-to-b from-primary to-[#09090B]"
//     ></div>
import { gsap } from "gsap";
const route = useRoute();
const HeroSectionRefContainer = ref();
const getPathWithoutLocale = (path: string) => {
  const segments = path.split("/");
  if (segments[1] && segments[1].length === 2) {
    return `/${segments.slice(2).join("/")}`;
  }
  return path;
};
const adjustedPath = computed(() => getPathWithoutLocale(route.path));
onMounted(() => {
  gsap.from(HeroSectionRefContainer.value, {
    opacity: 0,
    y: 200,
    duration: 1,
    ease: "power3.out",
  });
});

const scrollToNextSection = () => {
  const whatUsSection = document.querySelector(".whatUsSection");
  if (whatUsSection) {
    whatUsSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped></style>
