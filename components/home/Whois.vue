<template>
  <section class="WhoIs relative flex h-[486px] items-center justify-center">
    <div
      class="containerPoligon absolute left-0 top-0 hidden h-full w-full md:block"
    ></div>

    <div
      class="container relative z-20 mx-auto flex h-[70%] items-center justify-center px-4"
    >
      <div class="flex w-full flex-col items-center justify-between gap-5">
        <h1
          class="w-fit text-center text-xl font-semibold text-hookYellow md:text-xl"
        >
          Who is it for?
        </h1>
        <div>
          <p
            class="w-full text-center text-2xl font-extrabold tracking-wide text-white md:max-w-[1000px] md:text-4xl"
          >
            A Cybersecurity Learner? You're in the Right Place!
          </p>
          <p
            class="mt-5 w-full text-center text-2xl font-medium tracking-wide text-white/60 max-sm:text-justify md:max-w-[1000px] md:text-2xl"
          >
            ZeroPointPath is for anyone interested in the cybersecurity field,
            whether you're a beginner, amateur or expert. Start your journey
            into the hacking world with us and unleash your potential in
            cybersecurity with our distinctive challenges and labs.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.containerPoligon {
  background-color: #1f1f1f;
  clip-path: polygon(0 23%, 100% 0, 100% 100%, 0 80%);
}
</style>
