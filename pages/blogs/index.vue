<template>
  <div class="blog mb-6 min-h-full md:mb-12">
    <div class="container mx-auto min-h-full px-4">
      <div
        v-if="loading"
        class="flex h-full flex-col items-center justify-center gap-4"
      >
        <img
          src="~/assets/img/Spin.svg"
          class="size-[150px]"
          width="150"
          height="150"
          alt="Spin"
        />
      </div>
      <div v-if="!loading && blogs">
        <MainSectionBlog :blogs="blogs" />
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
            class="group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105"
          >
            Add Blog
          </button></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogsController } from "~/composables/blogs";
let usereRole = useCookie("userRole");

const { blogs, fetchBlogs, error, loading } = blogsController();

onMounted(() => {
  fetchBlogs();
});
</script>

<style scoped></style>
