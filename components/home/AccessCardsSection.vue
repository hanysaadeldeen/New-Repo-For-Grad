<template>
  <section class="relative" id="AccessCardSection">
    <div class="container mx-auto px-4">
      <h1
        class="w-full bg-gradient-to-b bg-clip-text text-center text-3xl font-bold text-white md:text-4xl"
      >
        The Leatest Hacking News
      </h1>
      <div ref="pageContainer" class="mt-20">
        <div class="pin-wrap px-40" ref="pinWrap">
          <AccessCard
            v-for="card in AccessCards"
            :key="card.id"
            :title="card.title"
            :description="card.description"
            :link="card.link"
            :color="card.color"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
const AccessCards = [
  {
    id: 1,
    title:
      "Russian Hackers Exploit Email and VPN Vulnerabilities to Spy on Ukraine Aid Logistics",
    description:
      "Russian cyber threat actors have been attributed  to a state-sponsored campaign targeting Western logistics entities and technology companies since 2022.  The activity has been assessed to be orchestrated by APT28 (aka BlueDelta, Fancy Bear, or Forest Blizzard), which is linked to the Russian General Staff Main Intelligence Directorate (GRU) 85th Main Special Service Center, Military Unit 26165.  Targets of the campaign include companies involved in the coordination, transport",
    link: "https://thehackernews.com/2025/05/russian-hackers-exploit-email-and-vpn.html",
    color: "#6E64EF",
  },
  {
    id: 2,
    title: "GenAI Security Best Practices Cheat Sheet",
    description:
      "Secure your GenAI systems fast with 7 must-know best practices to stop data poisoning, model theft, and more—plus ways AI can boost your defenses.",
    link: "https://www.wiz.io/lp/genai-security-best-practices-cheat-sheet?utm_source=hackernews&utm_medium=display&utm_campaign=FY25Q3_INB_FORM_GenAI-Security-Best-Practices-Cheat-Sheet&sfcid=701Py00000ENEjlIAH&utm_term=FY26Q2-HackerNews-newsfeed&utm_content=GenAIBestPractices",
    color: "#9AE266",
  },
  {
    id: 3,
    title:
      "Fake Kling AI Facebook Ads Deliver RAT Malware to Over 22 Million Potential Victims",
    description:
      " Counterfeit Facebook pages and sponsored ads on the social media platform are being employed to direct users to fake websites masquerading as Kling AI  with the goal of tricking victims into downloading malware.  Kling AI is an artificial intelligence (AI)-powered platform to synthesize images and videos from text and ",
    link: "https://thehackernews.com/2025/05/fake-kling-ai-facebook-ads-deliver-rat.html",
    color: "#F3B059",
  },
  {
    id: 4,
    title: "How to Detect Phishing Attacks Faster: Tycoon2FA Example",
    description:
      "It takes just one email to compromise an entire system. A single well-crafted message can bypass filters, trick employees, and give attackers the access they need. Left undetected, these threats can lead to credential theft, unauthorized access, and even full-scale breaches. As phishing techniques become more evasive, ",
    link: "https://thehackernews.com/2025/05/how-to-detect-phishing-attacks-faster.html",
    color: "#987681",
  },
  {
    id: 5,
    title:
      "100+ Fake Chrome Extensions Found Hijacking Sessions, Stealing Credentials, Injecting Ads",
    description:
      "An unknown threat actor has been attributed to creating several malicious Chrome Browser extensions  since February 2024 that masquerade as seemingly benign utilities but incorporate covert functionality to exfiltrate data, receive commands, and execute arbitrary code.  The actor creates websites that masquerade as legitimate services, productivity tools ",
    link: "https://thehackernews.com/2025/05/100-fake-chrome-extensions-found.html",
    color: "#6E64EF",
  },
];

import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const pageContainer = ref<HTMLElement | null>(null);
const pinWrap = ref<HTMLElement | null>(null);

const isRTL = computed(() => document.documentElement.dir === "rtl");

onMounted(() => {
  if (!pageContainer.value || !pinWrap.value) return;
  const races = document.querySelector(".pin-wrap");
  function getScrollAmount() {
    if (!races || !pageContainer.value) return 0;
    const containerWidth = pageContainer.value.offsetWidth;
    const racesWidth = races.scrollWidth;
    return isRTL.value
      ? racesWidth - containerWidth + 32
      : -(racesWidth - containerWidth + 32);
  }
  const tween = gsap.to(races, {
    x: getScrollAmount,
    duration: 3,
    ease: "none",
  });
  ScrollTrigger.create({
    trigger: "#AccessCardSection",
    start: "top 20%",
    end: () => `+=${Math.abs(getScrollAmount())}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: false,
  });
});
</script>

<style scoped>
#AccessCardSection {
  overflow: hidden;
}
.pin-wrap {
  min-width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 40px;
}
</style>
