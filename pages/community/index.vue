<template>
  <div class="container mx-auto min-h-full px-4 text-white">
    <section>


      <div class="mb-10">

        <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
          Community Posts
        </h1>

        <div v-if="pending" class="flex h-full flex-col items-center justify-center gap-4">
          <img src="~/assets/img/Spin.svg" class="size-[150px]" width="150" height="150" alt="Spin" />
        </div>

        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2  gap-5 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="post in data?.posts" :key="post.id"
              class="mb-6 rounded-lg border border-gray-700 bg-gray-900 p-4 shadow">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-semibold capitalize">{{ post.authorName }}</h2>
                <p class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</p>
              </div>

              <p class="text-sm text-gray-300 mb-3">{{ post.content }}</p>

              <div v-if="post.imageUrl" class="mb-3">
                <img :src="post.imageUrl" alt="Post image" class="w-full rounded" />
              </div>

              <div class="flex gap-4 text-sm text-gray-400">

                <!-- <button @click="toggleLike(post)" class="flex items-center gap-1">
                  <span :class="post.isLikedByCurrentUser ? 'text-red-500' : ''">❤️</span>
                  <span>{{ post.likeCount }}</span>
                </button> -->
                <button @click="toggleLike(post)" class="flex items-center gap-1">
                  <span>{{ post.isLikedByCurrentUser ? "❤️" : "💛" }}</span>
                  <span>{{ post.likeCount }}</span>
                </button>
                <span>💬 {{ post.commentCount }}</span>
                <span>🔁 {{ post.shareCount }}</span>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="flex justify-center gap-4 mt-8">
            <button :disabled="page <= 1" @click="changePage(page - 1)"
              class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50">
              Prev
            </button>

            <button :disabled="page >= totalPages" @click="changePage(page + 1)"
              class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>

      <nuxt-link to="/community/addPost">
        <button
          class="group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105">
          Add Post
        </button></nuxt-link>


    </section>

  </div>
</template>
<script setup>
import { useRoute, useRouter, useRuntimeConfig } from "#app";
import { ref, computed, watch } from "vue";

const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const token = useCookie("token");

const page = ref(Number(route.query.page) || 1);
const pageSize = 10;

const data = ref(null);
const pending = ref(false);

const toggleLike = async (post) => {
  try {
    const postId = post.id;
    const isLiked = post.isLikedByCurrentUser;

    await $fetch(`${runtimeConfig.public.BaseApi}/Likes/${postId}`, {
      method: isLiked ? "DELETE" : "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    // تعديل البيانات محليًا
    post.likeCount += isLiked ? -1 : 1;
    post.isLikedByCurrentUser = !isLiked;
  } catch (err) {
    console.error("❌ Failed to toggle like:", err);
  }
};
const fetchPosts = async () => {
  pending.value = true;
  const response = await $fetch(`${runtimeConfig.public.BaseApi}/Posts`, {
    query: {
      page: page.value,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  data.value = response;
  console.log(response);

  pending.value = false;
};

// استدعاء أولي
await fetchPosts();

// راقب التغيير في الرابط
watch(() => route.query.page, (newPage) => {
  page.value = Number(newPage) || 1;
  fetchPosts();
});

// تغيير الصفحة
const changePage = (newPage) => {
  router.push({ path: "/community", query: { page: newPage } });
};

// عدد الصفحات
const totalPages = computed(() => Math.ceil(data?.value?.total / pageSize));

// تنسيق التاريخ
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

definePageMeta({
  middleware: 'auth',
})
</script>
