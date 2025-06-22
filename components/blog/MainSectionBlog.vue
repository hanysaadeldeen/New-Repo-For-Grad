<template>
  <div class="Last_bolg">
    <h1
      class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl"
    >
      Latest Post
    </h1>
    <div
      class="mb-20 flex items-center justify-between gap-6 rounded-md bg-[#161625] p-5 max-md:flex-wrap"
    >
      <div class="w-full rounded-md md:w-1/2">
        <img
          src="~/assets/img/blog1.webp"
          class="inline-block h-full max-h-[400px] w-full max-w-full object-cover"
          loading="lazy"
          alt="blog1"
        />
      </div>
      <div class="flex w-full flex-col gap-5 md:w-1/2">
        <p class="text-xl text-paragraph">January 13, 2025</p>
        <div class="flex gap-5 max-lg:flex-wrap">
          <button
            class="rounded-md bg-[#152738] px-5 py-4 text-center text-xl font-medium tracking-wider text-white max-md:w-full"
          >
            ZeroPointPath
          </button>
          <button
            class="rounded-md bg-[#152738] px-5 py-4 text-center text-xl font-medium tracking-wider text-white max-md:w-full"
          >
            Network Security
          </button>
        </div>
        <h1 class="text-3xl font-bold text-white">
          Introduction to Network Security
        </h1>
        <p class="line-clamp-5 text-xl text-paragraph">
          <!-- {{ blogs ? blogs[0]?.sections[0].content : "" }} -->
          Network security is the process of protecting and securing networks
          and underlying network infrastructure from different kinds of possible
          threats like unauthorized access, data disclosure, network
          destruction, and so on.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const { locale } = useI18n();
// :src="runtimeConfig.public.BaseApi + blogs[0].image"
const runtimeConfig = useRuntimeConfig();

interface Section {
  title: string;
  content: string;
}
interface Blogs {
  id: string;
  title: string;
  sections: Section[];
  image: string;
  createdAt: string;
  authorName: string;
  authorEmail: string;
}

interface Props {
  blogs: Blogs[] | null;
}

defineProps<Props>();
</script>

<style scoped></style>
