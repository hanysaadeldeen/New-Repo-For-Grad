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
                <!-- <span>💬 {{ post.commentCount }}</span> -->
                <button @click="openComments(post.id)" class="text-white hover:underline">
                  💬 {{ post.commentCount }}
                </button>
                <span>🔁 {{ post.shareCount }}</span>
              </div>
            </div>
          </div>
          <div v-if="showModal"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center  justify-center z-50 px-4">
            <div class="bg-gray-800 text-white p-6 rounded-xl w-full max-w-xl relative">
              <button @click="closeModal"
                class="absolute top-3 right-3 text-gray-400 hover:text-white text-4xl">&times;</button>
              <h2 class="text-2xl font-semibold mb-4 text-center">Add a Comment</h2>

              <!-- Comment Textarea -->
              <textarea v-model="commentContent" rows="4"
                class="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment here..."></textarea>

              <p v-if="commentError" class="mt-2 text-sm text-red-400">{{ commentError }}</p>

              <button @click="submitComment"
                class="mt-5 group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105"
                :disabled="loading">
                {{ loading ? 'Submitting...' : 'Submit Comment' }}
              </button>

              <p v-if="message" :class="`mt-3 text-sm text-center ${error ? 'text-red-400' : 'text-green-400'}`">
                {{ message }}
              </p>
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
import * as yup from 'yup'
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const token = useCookie("token");

const page = ref(Number(route.query.page) || 1);
const pageSize = 10;

const data = ref(null);
const pending = ref(false);



// 💬 Comments Modal
const showModal = ref(false)
const commentContent = ref('')
const selectedPostId = ref(null)
const loading = ref(false)
const message = ref('')
const error = ref(false)

const openComments = (postId) => {
  selectedPostId.value = postId
  showModal.value = true
  commentContent.value = ''
  message.value = ''
  error.value = false
}

const commentError = ref('')

const commentSchema = yup.object({
  content: yup.string().required('Comment is required').min(3, 'Comment must be at least 3 characters'),
})

const closeModal = () => {
  showModal.value = false
}

const submitComment = async () => {
  loading.value = true
  message.value = ''
  error.value = false
  commentError.value = ''

  try {
    // ✅ Validate input
    await commentSchema.validate({ content: commentContent.value }, { abortEarly: false })

    const { error: fetchError } = await useFetch(`${runtimeConfig.public.BaseApi}/Comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: {
        content: commentContent.value,
        postId: selectedPostId.value,
      },
    })

    if (fetchError.value) throw new Error(fetchError.value.message)

    message.value = 'Comment submitted successfully!'
    showModal.value = false
    commentContent.value = ''


    // ✅ Optional: update local comment count
    const post = data.value?.posts?.find(p => p.id === selectedPostId.value)
    if (post) post.commentCount++

  } catch (err) {
    if (err.name === 'ValidationError') {
      commentError.value = err.errors[0] // أول رسالة خطأ
    } else {
      error.value = true
      message.value = 'Failed to submit comment.'
      console.error(err)
    }
  } finally {
    loading.value = false
  }
}

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
