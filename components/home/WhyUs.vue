<template>
  <div class="WhyUs relative h-screen">
    <div
      class="containerPoligon absolute left-0 top-0 hidden h-3/4 w-full md:block"
    ></div>

    <div
      class="container relative z-20 mx-auto flex h-[70%] items-center justify-center px-4"
    >
      <div class="flex w-full flex-col items-center justify-between gap-5">
        <h1
          class="w-fit text-center text-xl font-semibold text-hookYellow md:text-xl"
        >
          Why ZeroPointPath?
        </h1>
        <div>
          <p
            class="w-full text-center text-2xl font-extrabold tracking-wide text-white md:max-w-[1000px] md:text-4xl"
          >
            Learn Cybersecurity the Practical Way!
          </p>
          <p
            class="mt-5 w-full text-center text-2xl font-medium tracking-wide text-white/60 max-sm:text-justify md:max-w-[1000px] md:text-2xl"
          >
            ZeroPointPath makes cybersecurity learning hands-on and engaging.
            With realworld challenges, interactive CTFs, and smart tools, we
            bridge the gap between theory and practice, helping you build real
            skills for real threats. Whether you're just starting or already
            experienced, we've got the right challenges for you!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.containerPoligon {
  background-color: #1f1f1f;
  clip-path: polygon(0 0, 100% 25%, 100% 75%, 0 100%);
}
</style>
