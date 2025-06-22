<template>
  <div class="min-h-screen bg-gradient-to-t from-[#09090B] via-primary to-[#09090B] px-4 py-10 md:px-16">
    <!-- Title -->
    <div v-if="data">
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-white">{{ data.firstName }} {{ data.lastName }} Profile</h1>
        <p class="mt-1 text-paragraph">
          Manage your account and view your progress
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <!-- Profile Card -->
        <div class="flex flex-col gap-y-4">
          <div class="rounded-xl bg-secondary/20 p-6 shadow-lg">
            <div class="flex flex-col items-center">
              <div class="relative cursor-pointer" @click="triggerFileInput">
                <img :src="previewImage || `https://zeropoint.runasp.net${data.profileImagePath}`" alt="userAvatar"
                  class="h-28 w-28 rounded-full border-4 border-white object-cover shadow" />
                <span class="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>

                <!-- Hidden File Input -->
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleImageChange" />
              </div>
              <h2 v-if="!isLoading" class="mt-4 text-xl font-semibold text-white">
                {{ data.userName }}
              </h2>

            </div>
          </div>
          <div class="h-full rounded-xl bg-secondary/20 p-6 shadow-lg">
            <h3 class="mb-4 text-center text-lg font-semibold text-white">
              <span class="inline-block mr-1">
                📁
              </span>
              <span>
                Personal Information
              </span>
            </h3>
            <div class="flex flex-col items-center justify-center gap-y-3 text-center mt-5">
              <div class="hover:bg-secondary/20/50 flex space-x-3">
                <UserRound class="h-[20px] w-[20px] text-hookYellow" />
                <span class="font-medium text-white">{{ data.firstName }} </span>
              </div>
              <div class="hover:bg-secondary/20/50 flex space-x-3">
                <Mail class="h-[20px] w-[20px] text-hookYellow" />
                <span class="text-white">{{ data.email }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-4 lg:col-span-2">
          <div v-if="userRole === 'Admin'" class="col-span-2 grid gap-4 md:grid-cols-3">
            <div
              class="flex h-fit flex-col items-center justify-center gap-1 rounded-xl bg-secondary/20 py-8 text-center shadow">
              <div class="rounded-lg bg-green-100 p-2.5">
                <CircleCheckBig class="h-[25px] w-[25px] text-green-500" />
              </div>
              <h3 class="mt-2 text-xl font-bold text-white">
                {{ data.programCount }}
              </h3>
              <p class="text-paragraph">Completed Programs</p>
            </div>

            <div
              class="flex h-fit flex-col items-center justify-center gap-1 rounded-xl bg-secondary/20 py-8 text-center shadow">
              <div class="rounded-lg bg-blue-100 p-2.5">
                <Rss class="h-[25px] w-[25px] text-blue-500" />
              </div>
              <h3 class="mt-2 text-xl font-bold text-white">{{ data.blogCount }}</h3>
              <p class="text-paragraph">Completed Blog</p>
            </div>
          </div>
          <div v-if="userRole === 'User'"
            class="flex h-fit flex-col items-center justify-center gap-1 rounded-xl bg-secondary/20 py-8 text-center shadow">
            <div class="rounded-lg bg-blue-100 p-2.5">
              <Rss class="h-[25px] w-[25px] text-blue-500" />
            </div>
            <h3 class="mt-2 text-xl font-bold text-white">{{ data.reports.length }}</h3>
            <p class="text-paragraph">Completed Reports</p>
          </div>
          <div class="rounded-xl bg-secondary/20 p-6 shadow-lg">
            <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <font-awesome-icon icon="file-alt" />
              Program Reports
            </h3>
            <div v-if="userRole === 'Admin'">
              <!-- <div v-for="report in data.programs" :key="report.title"
                class="mb-3 flex items-center justify-between rounded-lg bg-secondary/20 p-4">
                <div>
                  <h4 class="font-semibold text-white">{{ report.title }}</h4>
                  <p class="text-sm text-paragraph">
                    {{ report.duration }} • Completed: {{ report.completed }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="report.score"
                    class="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                    {{ report.score }}%
                  </span>
                  <span v-else class="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                    In Progress
                  </span>
                  <Trophy class="text-hookYellow" />
                </div>
              </div> -->
              <div v-for="program in data.programs" :key="program.id"
                class="mb-4 flex items-center justify-between rounded-lg bg-secondary/20 p-4 shadow">
                <div class="flex items-center gap-4">
                  <img :src="program.image" alt="program-image" class="h-16 w-16 rounded-full object-cover" />
                  <div>
                    <h4 class="text-lg font-bold text-white">{{ program.title }}</h4>
                    <p class="text-sm text-paragraph">
                      {{ program.companyName }} • {{ program.collaborationType.toUpperCase() }}
                    </p>
                    <p class="text-xs text-paragraph mt-1">
                      Vulnerabilities: {{ program.vulnerabilitiesCount }} • Efficiency: {{ program.responseEfficiency
                      }}%
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-white">Status:
                    <span :class="program.programStatus === 'activity' ? 'text-green-400' : 'text-red-400'">
                      {{ program.programStatus }}
                    </span>
                  </p>
                  <div class="mt-2 flex flex-wrap gap-1 text-xs text-white">
                    <span class="rounded bg-red-600/20 px-2 py-1">Critical: {{ program.critical }}</span>
                    <span class="rounded bg-yellow-500/20 px-2 py-1">High: {{ program.high }}</span>
                    <span class="rounded bg-blue-500/20 px-2 py-1">Medium: {{ program.medium }}</span>
                    <span class="rounded bg-green-500/20 px-2 py-1">Low: {{ program.low }}</span>
                  </div>
                </div>
              </div>

            </div>
            <div v-else>
              <div v-if="data.reports && data.reports.length > 0">
                <div v-for="report in data.reports" :key="report.id"
                  class="mb-3 flex items-center justify-between rounded-lg bg-secondary/20 p-4">
                  <nuxt-link :to="localePath(report.programId)">
                    <div>
                      <h4 class="font-semibold text-white">{{ report.vulnerabilityTitle }}</h4>
                      <p class="text-sm text-paragraph">
                        {{ report.duration }} • Completed: {{ report.completed }}
                      </p>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                        {{ report.integrity }}%
                      </span>
                      <Trophy class="text-hookYellow" />
                    </div>
                  </nuxt-link>
                </div>
              </div>
              <div class="flex items-center gap-2 text-hookYellow">
                You didn't add any program Report yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
import {
  Trophy,
  CircleCheckBig,
  Mail,
  UserRound,
  Rss
} from "lucide-vue-next";

const localePath = useLocalePath();
const loading = ref(false);

const runtimeConfig = useRuntimeConfig();
const token = useCookie("token");
const userId = useCookie("userId");
const userRole = useCookie("userRole");

const fileInput = ref(null);
const previewImage = ref(null);
const selectedFile = ref(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  selectedFile.value = file;

  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result;
  };
  reader.readAsDataURL(file);

  await updateImage();
};

const updateImage = async () => {
  if (!selectedFile.value) return;

  loading.value = true;

  try {
    const formData = new FormData();
    formData.append('ProfileImage', selectedFile.value);

    const response = await fetch(
      `${runtimeConfig.public.BaseApi}/Users/${userId.value}/profile-image`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: formData,
      }
    );

    const result = await response.json();
    console.log("✅ Image uploaded:", result);

    await fetchUserData(); // تحديث البيانات بعد رفع الصورة

    return result;
  } catch (err) {
    console.error("❌ Upload failed:", err);
  } finally {
    loading.value = false;
  }
};

const data = ref(null);
const userError = ref(null);

const fetchUserData = async () => {
  const { data: userData, error } = await useFetch('/api/user');
  data.value = userData.value;
  console.log(data.value)
  userError.value = error.value;
};

onMounted(() => {
  fetchUserData();
});

definePageMeta({
  middleware: 'auth',
});
</script>

<!-- 
<script setup>
import {
  Trophy,
  CircleCheckBig,
  Mail,
  UserRound,
  Rss
} from "lucide-vue-next";

const localePath = useLocalePath();
const loading = ref(false)

const runtimeConfig = useRuntimeConfig();
const token = useCookie("token");
const userId = useCookie("userId");



const fileInput = ref(null);
const previewImage = ref(null); // for showing selected image
const selectedFile = ref(null); // for sending in the 

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  selectedFile.value = file;

  // Preview image in UI
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.value = reader.result;
  };
  reader.readAsDataURL(file);
};
const data = ref(null);
const userError = ref(null);

const fetchUserData = async () => {
  const { data: userData, error } = await useFetch('/api/user');
  data.value = userData.value;
  userError.value = error.value;
};


const updateImage = async () => {
  loading.value = true;
  try {
    const response = await $fetch(
      `${runtimeConfig.public.BaseApi}/Users/${userId.value}/profile-image`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );

    await fetchUserData();

    return response;
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
};

// استدعاء أول مرة
onMounted(() => {
  fetchUserData();
});


const userRole = useCookie("userRole");





// const { data, error } = await useFetch('/api/user');




definePageMeta({
  middleware: 'auth',
})


</script> -->


<style scoped></style>