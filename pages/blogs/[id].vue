<template>
  <section class="blogId">
    <div class="container mx-auto px-4">
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
      <div v-if="!loading && blogId">
        <img
          :src="runtimeConfig.public.BaseApi + blogId?.image"
          alt="BlogImage"
          class="h-full max-h-[500px] w-full object-cover"
          loading="lazy"
        />
      </div>
      <div v-if="!loading && blogId" class="mt-8">
        <nuxt-link to="/blogs">
          <div class="group flex items-center gap-2.5">
            <i
              class="fa-solid fa-arrow-left cursor-pointer text-[#A1A1AA] transition-all duration-300 ease-in-out group-hover:-translate-x-2 group-hover:text-white"
            ></i>
            <h1 class="text-2xl font-medium text-paragraph">Blog</h1>
          </div>
        </nuxt-link>
        <div class="mt-6 flex items-center gap-3 max-md:flex-wrap">
          <p class="mb-5 text-lg font-bold text-white">
            <i class="fa-solid fa-calendar-days mr-1 text-secondary"></i>
            November 25, 2024
          </p>
          <p class="mb-5 text-lg font-bold text-white">
            <i class="fa-solid fa-clock mr-1 text-secondary"></i>
            5 min read
          </p>
          <p class="mb-5 text-lg font-bold text-white">
            <i class="fa-solid fa-user mr-1 text-secondary"></i>
            Zero Point Path
          </p>
        </div>
        <div v-if="blogId" class="mt-8 space-y-8">
          <h1 class="text-2xl font-bold text-white md:text-3xl">
            {{ blogId.title }} Helldown Ransomware Analysis
          </h1>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Introduction
            </h3>
            <p class="text-lg text-paragraph">
              {{ blogId.sections[0].content }}
            </p>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              what is Fog ?
            </h3>
            <p class="text-lg text-paragraph">
              {{ blogId.sections[1].content }}
            </p>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Technical investigation
            </h3>
            <p class="text-lg text-paragraph">
              {{ blogId.sections[2].content }}
            </p>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Data Leak Site (DLS)
            </h3>
            <p class="text-lg text-paragraph">
              {{ blogId.sections[3].content }}
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="!loading && error" class="mt-8">
        <p class="text-center uppercase text-red-500">fail to fetch blog</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();

const blogsStore = useblogsStore();
const { blogId, loading, error } = storeToRefs(blogsStore);

const runtimeConfig = useRuntimeConfig();

onMounted(() => {
  blogsStore.fetchBlogId(route.params.id.toString());
});
</script>

<style scoped></style>
