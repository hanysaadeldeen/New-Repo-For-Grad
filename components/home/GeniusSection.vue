<template>
  <section ref="GeniusSection" class="Genius relative overflow-hidden">
    <div ref="GeniusSectionOne" id="GeniusSection" class="container mx-auto px-4">
      <div class="sectionInfo relative mb-20 flex w-full flex-col gap-5">
        <h1 class="w-full bg-gradient-to-b bg-clip-text text-center text-3xl font-bold text-white md:text-4xl">
          Meet Sentinel
        </h1>
        <div class="text-center">
          <p class="text-center text-base font-medium leading-6 text-paragraph md:text-xl">
            Your Al Assistant For Cybersecurity - Here To Answer Your Questions,
            Explain Threats, And Help You Stay Safe Online.
          </p>
          <span class="mt-2 inline-block text-center text-base font-medium leading-6 text-[#9AE266] md:text-xl">
            Cybersecurity, Explained Simply</span>
        </div>
      </div>
      <div class="flex justify-center">
        <div ref="ginusChat" class="card relative w-full rounded-2xl bg-[#18181B] py-7 md:w-[700px]">
          <div class="flex h-full flex-col justify-between gap-12">
            <div class="px-4 py-3 lg:px-8">
              <div class="flex w-full flex-col gap-y-8 md:gap-y-14">
                <button
                  class="mx-auto mt-7 w-full rounded-full bg-hookYellow px-7 py-2 text-lg font-medium shadow-[0_0_20px_rgba(255,193,7,0.7)] transition-all duration-500 ease-in-out hover:shadow-[0_0_35px_rgba(255,193,7,0.7)] sm:w-fit">
                  <span class="button-text"> Hey! How can I help you?</span>
                </button>

                <div
                  class="flex w-full items-center justify-between gap-5 rounded-full border border-gray-700 px-4 py-3 max-sm:flex-wrap md:gap-3">
                  <TypeWriter />
                  <nuxt-link :to="localePath('chat')">
                    <button
                      class="buttonAskChat rounded-full border border-gray-700 bg-black px-6 py-2 text-base font-medium text-white">
                      Ask Genius
                    </button>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="mb-7 px-5 text-center lg:px-12">
              <p class="mb-2 text-lg font-medium text-white">
                Chat With Sentinel
              </p>
              <p class="font-normal text-[#A1A1AA]">
                Just Ask. Whether You're Curious About Phishing, Malware, <br />
                Or How To Stay Secure - Sentinel Makes Cybersecurity Simple.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();


const GeniusSection = ref(null);
const ginusCritical = ref(null);
const ginusChat = ref(null);

onMounted(() => {
  if (GeniusSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: GeniusSection.value,
        start: "top 40%",
        end: "center center",
        scrub: false,
        markers: false,
      },
    });
    tl.from(
      ginusCritical.value,
      {
        opacity: 0,
        duration: 1,
        y: -200,
        ease: "power3.out",
      },
      0,
    );
    tl.from(
      ginusChat.value,
      {
        opacity: 0,
        duration: 1,
        y: 200,
        ease: "power3.out",
      },
      0,
    );
  }
});
</script>

<style scoped>
.ginusBackground {
  background-image: url("~/assets/img/GinusBackgournd.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.buttonAskChat {
  background-image: url("~/assets/img/GinusBackgourndChat.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
