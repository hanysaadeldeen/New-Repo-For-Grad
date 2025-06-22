<template>
  <section
    class="h-[calc(100vh - 80px)] flex items-center justify-center"
    :style="{ backgroundColor: back }"
    ref="sectionRef"
  >
    <div class="container relative mx-auto px-2 max-sm:px-4">
      <div
        ref="splitTypes"
        class="relative flex w-full items-center justify-between"
      >
        <h1
          class="reveal-type w-[90%] font-semibold sm:text-justify md:max-w-[980px]"
          :class="
            locale === 'ar' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
          "
          :data-bg-color="firstBackgroundColor"
          :data-fg-color="secondBackgroundColor"
        >
          {{ $t(title) }}
        </h1>
        <span
          class="absolute top-0 h-full w-1"
          :class="[locale === 'en' ? 'right-0' : 'left-0', `bg-[${spanBack}]`]"
        ></span>
        <span
          ref="progressLine"
          class="absolute top-0 w-[4px]"
          :class="[locale === 'en' ? 'right-0' : 'left-0', `bg-[#BD292E]`]"
        ></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const { locale } = useI18n();

type Props = {
  title: string;
  firstBackgroundColor: string;
  secondBackgroundColor: string;
  back: string;
  spanBack: string;
  spanColor: string;
  textCBack: string;
  textCColor: string;
};
const props = defineProps<Props>();

gsap.registerPlugin(ScrollTrigger);

const splitTypes = ref();
const progressLine = ref();
const sectionRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (process.client) {
    const SplitType = (await import("split-type")).default;
    gsap.registerPlugin(ScrollTrigger);

    if (splitTypes.value && progressLine.value) {
      const char = splitTypes.value;
      const text = new SplitType(char, { types: "words" });
      const totalWords = text.words ? text.words.length : 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: "top top",
          end: `+=${totalWords * 50}`,
          scrub: 1,
          markers: false,
          toggleActions: "play pause resume none",
          pin: true,
          pinSpacing: true,
        },
      });

      tl.fromTo(
        text.words,
        { color: props.textCBack },
        {
          color: props.textCColor,
          duration: 10,
          stagger: 0.5,
          onUpdate: function () {
            const progress = (this.progress() * totalWords) / totalWords;
            gsap.to(progressLine.value, {
              height: `${progress * 100}%`,
              duration: 0.2,
            });
          },
        },
      );
    }
  }
});
</script>

<style scoped></style>
