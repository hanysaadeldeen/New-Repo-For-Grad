<template>
  <div class="blog mb-6 min-h-full md:mb-12">
    <div class="container mx-auto min-h-full px-4">
      <div v-if="pending" class="flex h-full flex-col items-center justify-center gap-4">
        <img src="~/assets/img/Spin.svg" class="size-[150px]" width="150" height="150" alt="Spin" />
      </div>
      <div v-if="!pending && blogs">
        <!-- <MainSectionBlog :blogs="blogs" /> -->
        <div class="Last_bolg">
          <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
            Latest Post
          </h1>
          <nuxt-link :to="localePath(`/blogs/${blogs[0].id}`)">
            <div class="mb-20 flex items-center justify-between gap-6 rounded-md bg-[#161625] p-5 max-md:flex-wrap">
              <div class="w-full rounded-md md:w-1/2">
                <img :src="`https://zeropoint.runasp.net${blogs[0].image}`" :alt="blogs[0].title"
                  class="inline-block h-full max-h-[400px] w-full max-w-full object-cover" loading="lazy" />
              </div>
              <div class="flex w-full flex-col gap-5 md:w-1/2">
                <p class="text-xl text-paragraph">{{ formatDate(blogs[0].createdAt) }}</p>
                <div class="flex gap-5 max-lg:flex-wrap">
                  <button
                    class="rounded-md bg-[#152738] px-5 py-4 text-center text-xl font-medium tracking-wider text-white max-md:w-full">
                    ZeroPointPath
                  </button>
                  <!-- <button
            class="rounded-md bg-[#152738] px-5 py-4 text-center text-xl font-medium tracking-wider text-white max-md:w-full">
            Network Security
          </button> -->
                </div>
                <h1 class="text-3xl font-bold text-white">
                  {{ blogs[0].title }}
                </h1>
                <p class="line-clamp-5 text-xl text-paragraph">
                  {{ blogs[0]?.introduction }}
                </p>
              </div>
            </div>
          </nuxt-link>
        </div>
        <BlogsCardSection :blogs="blogs" />
      </div>
      <div v-else-if="error" class="flex h-full items-center justify-center">
        <p class="text-center uppercase text-red-500">fail to fetch blogs</p>
      </div>
      <div class="my-10 text-center" v-else-if="blogs?.length === 0">
        <p class="text-center text-2xl uppercase text-white">
          there is No Blogs
        </p>
      </div>
      <div class="mt-8">
        <nuxt-link to="/blogs/addBlog" v-if="usereRole === 'Admin'">
          <button
            class="group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105">
            Add Blog
          </button></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogsController } from "~/composables/blogs";
let usereRole = useCookie("userRole");
const localePath = useLocalePath();

const config = useRuntimeConfig();


const blogs = ref(null)
const error = ref(null)
const pending = ref(true)


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

onMounted(async () => {
  pending.value = true
  try {
    const { data, error: fetchError } = await useFetch('https://zeropoint.runasp.net/api/Blog', {
      server: false, // ✅ هذه هي النقطة المهمة
    })
    blogs.value = data.value
    error.value = fetchError.value

  } finally {
    pending.value = false
  }

})
</script>

<style scoped></style>
