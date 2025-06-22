<template>
  <section class="mt-[90px]">
    <h1
      class="w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl"
    >
      Use cases
    </h1>
    <div
      ref="WebsiteScannerUseCaseOne"
      class="mt-16 flex items-center justify-between gap-16 max-md:flex-col"
    >
      <div class="w-full md:w-1/2 md:max-w-[600px]">
        <img
          src="~/assets/img/websiteScaner2.png"
          alt="useCase1"
          class="rounded-3xl"
        />
      </div>
      <div class="relative mx-auto w-full md:w-1/2 md:max-w-[600px]">
        <div
          class="relative mx-auto my-2.5 w-fit cursor-pointer text-center text-2xl font-bold text-white ease-in-out md:my-5"
        >
          <span class="relative z-40">
            Unified Web Vulnerability <br />
            Scanning
          </span>
          <span
            class="absolute -left-2 -top-3 z-0 h-16 w-16 rounded-full bg-secondary max-md:size-14 md:-left-5"
          ></span>
        </div>

        <p
          class="text-center text-xl font-medium leading-6 text-paragraph md:text-justify"
        >
          Gain complete visibility into your application’s <br />
          exposure by combining multiple tools in one interface.
        </p>
      </div>
    </div>
    <div
      ref="WebsiteScannerUseCaseTwo"
      class="mt-16 flex items-center justify-between gap-16 max-md:flex-col-reverse md:mt-24"
    >
      <div class="relative mx-auto w-full md:w-1/2 md:max-w-[600px]">
        <div
          class="relative mx-auto my-2.5 w-fit cursor-pointer text-center text-2xl font-bold text-white ease-in-out md:my-5"
        >
          <span class="relative z-40">
            Streamlined Remediation <br />
            Process.
          </span>
          <span
            class="absolute -left-2 -top-3 z-0 h-16 w-16 rounded-full bg-secondary max-md:size-14 md:-left-5"
          ></span>
        </div>

        <p
          class="text-center text-xl font-medium leading-6 text-paragraph md:text-justify"
        >
          Easily assign tasks, generate step-by-step fix guides, <br />
          and ensure SLA compliance using actionable, exportable reports.
        </p>
      </div>
      <div class="w-full md:w-1/2 md:max-w-[600px]">
        <img
          src="~/assets/img/websiteScaner3.png"
          alt="useCase1"
          class="rounded-3xl"
        />
      </div>
    </div>
    <div
      ref="WebsiteScannerUseCaseThree"
      class="mt-16 flex items-center justify-between gap-16 max-md:flex-col"
    >
      <div class="w-full md:w-1/2 md:max-w-[600px]">
        <img
          src="~/assets/img/websiteScaner4.png"
          alt="useCase1"
          class="rounded-3xl"
        />
      </div>

      <div class="relative mx-auto w-full md:w-1/2 md:max-w-[600px]">
        <div
          class="relative mx-auto my-2.5 w-fit cursor-pointer text-center text-2xl font-bold text-white ease-in-out md:my-5"
        >
          <span class="relative z-40">
            Clear, Technical <br />
            Reporting.
          </span>
          <span
            class="absolute -left-2 -top-3 z-0 h-16 w-16 rounded-full bg-secondary max-md:size-14 md:-left-5"
          ></span>
        </div>

        <p
          class="text-center text-xl font-medium leading-6 text-paragraph md:text-justify"
        >
          Help security and development teams collaborate <br />
          more effectively using clean, structured outputs.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// const WebsiteScannerUseCaseOne = ref(null);
// const WebsiteScannerUseCaseTwo = ref(null);
// const WebsiteScannerUseCaseThree = ref(null);
// onMounted(() => {
//   if (WebsiteScannerUseCaseOne.value) {
//     const tlOne = gsap.timeline({
//       scrollTrigger: {
//         trigger: WebsiteScannerUseCaseOne.value,
//         start: "top 95%",
//         end: "bottom 80%",
//         scrub: true,
//         markers: true,
//       },
//     });
//     const tlTwo = gsap.timeline({
//       scrollTrigger: {
//         trigger: WebsiteScannerUseCaseTwo.value,
//         start: "top 95%",
//         end: "bottom 80%",
//         scrub: true,
//         markers: true,
//       },
//     });
//     const tlThree = gsap.timeline({
//       scrollTrigger: {
//         trigger: WebsiteScannerUseCaseThree.value,
//         start: "top 95%",
//         end: "bottom 80%",
//         scrub: true,
//         markers: true,
//       },
//     });

//     const animationConfig = {
//       opacity: 0,
//       duration: 1,
//       y: 300,
//     };

//     tlOne.from(WebsiteScannerUseCaseOne.value, animationConfig);
//     tlTwo.from(WebsiteScannerUseCaseTwo.value, animationConfig);
//     tlThree.from(WebsiteScannerUseCaseThree.value, animationConfig);
//   }
// });
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WebsiteScannerUseCaseOne = ref<HTMLElement | null>(null);
const WebsiteScannerUseCaseTwo = ref<HTMLElement | null>(null);
const WebsiteScannerUseCaseThree = ref<HTMLElement | null>(null);

onMounted(() => {
  const useCases = [
    WebsiteScannerUseCaseOne.value,
    WebsiteScannerUseCaseTwo.value,
    WebsiteScannerUseCaseThree.value,
  ].filter((el): el is HTMLElement => el !== null); // Ensure non-null elements

  // Common scrollTrigger configuration
  const scrollTriggerConfig = {
    start: "-70% 85%", // Trigger when element's top is 85% from top of viewport
    end: "30% 65%", // End when element's bottom is 65% from top
    scrub: 0.3, // Smooth scrubbing for natural scroll-tied animation
    markers: false, // Set to true for debugging
  };

  // Common animation configuration
  const animationConfig = {
    opacity: 0,
    y: 300, // Slide up from 300px below
    duration: 1.2, // Slightly longer for smoother effect
    ease: "power3.out", // Smooth easing
  };

  // Apply animation to each use case independently
  useCases.forEach((useCase) => {
    gsap.from(useCase, {
      ...animationConfig,
      scrollTrigger: {
        ...scrollTriggerConfig,
        trigger: useCase, // Each element is its own trigger
      },
    });
  });
});
</script>

<style scoped></style>
