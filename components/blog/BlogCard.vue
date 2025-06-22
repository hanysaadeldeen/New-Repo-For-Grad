<template>
  <div class="group/item h-fit w-full rounded-xl bg-[#161625] px-5 py-4">
    <img
      :src="blog.image"
      :alt="blog.title"
      class="h-full max-h-[220px] w-full max-w-full rounded-xl object-cover"
    />
    <div class="mt-5">
      <p class="mb-5 text-lg font-bold text-white">
        <i class="fa-solid fa-calendar-days mr-2 text-hookYellow"></i>
        {{ blog.createdAt }}
      </p>
      <nuxt-link :to="localePath(`/blogs/${blog.id}`)">
        <h1
          class="my-4 line-clamp-2 cursor-pointer text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover/item:text-hookYellow md:my-5"
        >
          {{ blog.title }}
        </h1>
      </nuxt-link>
      <button
        class="rounded-md bg-[#152738] px-5 py-2 text-center text-xl font-medium tracking-wider text-white max-md:w-full"
      >
        {{ blog.authorName }}
      </button>
      <!-- <p class="line-clamp-3 text-xl text-paragraph">
        {{ blog?.sections[0].content }}
      </p> -->
      <nuxt-link :to="localePath(`/blogs/${blog.id}`)">
        <!-- <button
          class="group/edit mt-8 flex w-full items-center justify-center gap-3 rounded-md bg-gradient-to-r from-primary to-[#09090B] py-3 text-center text-xl font-medium tracking-wider text-white opacity-0 transition-all duration-300 ease-in-out hover:scale-105 group-hover/item:opacity-100"
        > -->
        <!-- <button
          class="group/edit mb-4 mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-hookYellow py-2 text-lg font-medium capitalize tracking-wider"
        >
          Read More
          <i
            class="fa-solid fa-arrow-right cursor-pointer text-white transition-all duration-300 ease-in-out group-hover/edit:translate-x-2"
          ></i>
        </button> -->
        <Button title="Read More" isArrow />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

interface Section {
  title: string;
  content: string;
}
interface blogs {
  id: string;
  title: string;
  sections: Section[];
  image: string;
  createdAt: string;
  authorName: string;
}

interface Props {
  blog: blogs;
}
defineProps<Props>();
</script>

<style scoped></style>
