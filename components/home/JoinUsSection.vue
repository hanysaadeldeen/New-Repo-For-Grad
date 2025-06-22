<template>
  <section class="JoinUs">
    <div ref="JoinUsSection" class="container mx-auto px-4">
      <h1
        class="w-full bg-gradient-to-b bg-clip-text text-center text-3xl font-bold text-white md:text-4xl"
      >
        {{ $t("joinUsTitle") }}
      </h1>

      <div
        class="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <JoinUsCard
          v-for="card in JoinUsCards"
          :key="card.id"
          :title="card.title"
          :description="card.description"
          :color="card.color"
          :icon="card.icon"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const JoinUsCards = [
  {
    id: 1,
    title: "Integrated Security Tools",
    description:
      "Use built-in scanning and data analysis tools like WHOIS to gather intelligence efficiently.",
    icon: "fa-brands fa-searchengin",
    color: "#4060F8",
  },
  {
    id: 2,
    title: "Capture the Flag (CTF) Challenges",
    description:
      "Test and improve your hacking skills with interactive CTF challenges that simulate real-world attacks.",
    icon: "fa-solid fa-user-secret",
    color: "#FF832A",
  },
  {
    id: 4,
    title: "Regular Content Updates",
    description:
      "Stay ahead with continuously updated challenges, tools, and cybersecurity techniques.",
    icon: "fa-solid fa-calendar-check",
    color: "#F0004F",
  },
  {
    id: 5,
    title: "Cybersecurity Blog & News",
    description:
      "Keep up with the latest cybersecurity trends, tools, and research with our dedicated blog.",
    icon: "fa-solid fa-newspaper",
    color: "#00D356",
  },
  {
    id: 6,
    title: "24/7 Chatbot Support",
    description:
      "Get instant assistance with our AI-driven cybersecurity chatbot, available anytime.",
    icon: "fa-solid fa-comment-dots",
    color: "#46494D",
  },
  {
    id: 7,
    title: "Bug Bounty Participation",
    description:
      "Gain real-world experience by identifying security vulnerabilities and earning rewards..",
    icon: "fa-solid fa-bug",
    color: "#9AE266",
  },
  {
    id: 8,
    title: "Cybersecurity Community",
    description:
      "Join a network of learners, professionals, and ethical hackers to share knowledge and grow together.",
    icon: "fa-solid fa-network-wired",
    color: "#F3B059",
  },
  {
    id: 9,
    title: "Flexible Learning Experience",
    description:
      "Choose challenges that match your skill level, from beginner to expert, and learn at your own pace.",
    icon: "fa-solid fa-graduation-cap",
    color: "#987681",
  },
];

const JoinUsSection = ref<HTMLElement | null>(null);

onMounted(() => {
  if (JoinUsSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: JoinUsSection.value,
        start: "-20% 80%",
        end: "top 35%",
        scrub: false,
        markers: false,
      },
    });
    tl.from(JoinUsSection.value, {
      opacity: 0,
      y: 500,
      duration: 1,
    });
  }
});
</script>

<style scoped></style>
