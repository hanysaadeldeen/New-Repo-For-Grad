<template>
  <div class="group/item min-h-fit w-full rounded-xl bg-[#161625] px-5 py-5">
    <img :src="`https://zeropoint.runasp.net${blog.image}`" :alt="blog.title"
      class="h-full max-h-[220px] w-full max-w-full rounded-xl object-cover" />
    <div class="mt-5">
      <p class="mb-5 text-lg font-bold text-white">
        <i class="fa-solid fa-calendar-days mr-2 text-hookYellow"></i>
        {{ formatDate(blog.createdAt) }}
      </p>
      <nuxt-link :to="localePath(`/blogs/${blog.id}`)">
        <h1
          class="my-4 line-clamp-1 cursor-pointer text-2xl font-bold text-white transition-all duration-300 ease-in-out group-hover/item:text-hookYellow md:my-5">
          {{ blog.title }}
        </h1>
      </nuxt-link>
      <button
        class="rounded-md bg-[#152738] px-5 py-2 text-center text-xl font-medium tracking-wider text-white max-md:w-full">
        {{ blog.authorName }}
      </button>
      <!-- <p class="line-clamp-3 text-xl text-paragraph">
        {{ blog?.sections[0].content }}
      </p> -->
      <nuxt-link :to="localePath(`/blogs/${blog.id}`)">

        <Button title="Read More" isArrow />
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();


function formatDate(value) {
  const date = new Date(value);

  // Format: "June 20, 2025, 9:44 PM"
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}

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
