<template>
  <section class="blogId">
    <div class="container mx-auto px-4">
      <div v-if="pending" class="flex h-full flex-col items-center justify-center gap-4">
        <img src="~/assets/img/Spin.svg" class="size-[150px]" width="150" height="150" alt="Spin" />
      </div>
      <div v-if="blog">
        <img :src="`https://zeropoint.runasp.net${blog.image}`" :alt="blog.title"
          class="h-full max-h-[500px] w-full object-cover" loading="lazy" />
      </div>
      <div v-if="!pending && blog" class="mt-8">
        <nuxt-link to="/blogs">
          <div class="group flex items-center gap-2.5">
            <i
              class="fa-solid fa-arrow-left cursor-pointer text-[#A1A1AA] transition-all duration-300 ease-in-out group-hover:-translate-x-2 group-hover:text-white"></i>
            <h1 class="text-2xl font-medium text-paragraph">Blog</h1>
          </div>
        </nuxt-link>
        <div class="mt-6 flex items-center gap-3 max-md:flex-wrap">
          <p class="mb-5 text-lg font-bold text-white">
            <i class="fa-solid fa-calendar-days mr-1 text-secondary"></i>
            {{ formatDate(blog.createdAt) }}
          </p>

          <p class="mb-5 text-lg font-bold text-white">
            <i class="fa-solid fa-user mr-1 text-secondary"></i>
            Zero Point Path
          </p>
        </div>
        <div v-if="blog" class="mt-8 space-y-8">
          <h1 class="text-2xl font-bold text-white md:text-3xl">
            {{ blog.title }} Helldown Ransomware Analysis
          </h1>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Summary
            </h3>
            <p class="text-lg text-paragraph">
              {{ blog.introduction }}
            </p>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              what is Impact ?
            </h3>
            <p class="text-lg text-paragraph">
              {{ blog.whatIsFog }}
            </p>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Steps to Reproduce
            </h3>
            <p class="text-lg text-paragraph">
              {{ blog.technicalInvestigation }}
            </p>
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="text-xl font-bold text-white md:text-2xl">
              Suggested Fix
            </h3>
            <p class="text-lg text-paragraph">
              {{ blog.dataLeakSite }}
            </p>
          </div>
        </div>
      </div>
      <div v-else-if="!pending && error" class="mt-8">
        <p class="text-center uppercase text-red-500">fail to fetch blog</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();


console.log(route.params.id.toString());

const blogId = ref(route.params.id.toString());
const blog = ref(null)
const error = ref(null)
const pending = ref(true)


console.log("blogId", blogId);
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
    const { data, error: fetchError } = await useFetch(`https://zeropoint.runasp.net/api/Blog/${blogId.value}`, {
      server: false, // ✅ هذه هي النقطة المهمة
    })
    blog.value = data.value
    error.value = fetchError.value
    console.log("blogSpecific response", blog.value);
  } finally {
    pending.value = false
  }

})
</script>

<style scoped></style>
