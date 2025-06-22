<template>
  <section class="PalnSection" ref="PlanSection">
    <div class="container mx-auto px-4">
      <h1
        class="w-full bg-gradient-to-b bg-clip-text text-center text-3xl font-bold text-white md:text-4xl"
      >
        Multiple Subscription Plans, With Flexible Payment.
      </h1>
      <div class="mt-20 flex justify-center gap-10 max-md:flex-col">
        <PlanCard
          v-for="card in PlanCardSection"
          :id="card.id"
          :key="card.id"
          :price="card.price"
          :currency="card.currency"
          :description="card.description"
          :content="card.content"
          :btn="card.btn"
          :classs="card.plan"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const PlanCardSection = [
  {
    id: 1,
    price: "0",
    currency: " Egp",
    description: "Free",
    content: [" Badges", " Active Challenges", " Leaderboard Ranking"],
    btn: "Current Plan",
    plan: "PlanOne",
  },
  {
    id: 2,
    price: "100",
    currency: " Egp",
    description: "Advanced",
    content: [
      "Badges",
      "Active Challenges",
      "Retired Challenges",
      "Leaderboard Ranking",
    ],
    btn: "coming soon",
    plan: "PlanTwo",
  },
];

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PlanSection = ref(null);

onMounted(() => {
  if (PlanSection.value) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: PlanSection.value,
        start: "top 40%",
        end: "30% 70%",
        scrub: false,
        markers: false,
      },
    });
    tl.from(
      ".PlanOne",
      {
        opacity: 0,
        duration: 1,
        x: -200,
        ease: "power3.out",
      },
      0,
    );
    tl.from(
      ".PlanTwo",
      {
        opacity: 0,
        duration: 1,
        // y: 200,
        ease: "power3.out",
      },
      0,
    );
    tl.from(
      ".PlanThree",
      {
        opacity: 0,
        duration: 1,
        x: 200,
        ease: "power3.out",
      },
      0,
    );
  }
});
</script>

<style scoped></style>
