<template>
  <div class="Bounties_hacker mt-8">
    <div class="overflow-auto">
      <table class="w-full min-w-[600px] rounded-lg bg-white/10 shadow-md">
        <thead>
          <tr class="bg-primary text-lg text-white">
            <th class="px-6 py-4 font-normal">Rank</th>
            <th class="px-6 py-4 font-normal">Name</th>
            <th class="px-6 py-4 font-normal">Reputation</th>
            <th class="px-6 py-4 font-normal">Solutions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="cursor-pointer rounded-lg border-b border-secondary transition-all duration-200 ease-in-out hover:bg-secondary"
          >
            <td
              class="px-4 py-3 text-center text-xl font-medium capitalize text-white"
            >
              1
            </td>
            <td
              class="flex justify-center px-4 py-2 font-medium capitalize text-white"
            >
              <img
                src="~/assets/img/avatar.png"
                alt="Avatar"
                class="mr-3 h-12 w-12 rounded-full"
              />
              <div>
                <div class="font-semibold">@dheeraj15</div>
                <div class="text-lg text-paragraph">DHEERAJ LAKHARA</div>
              </div>
            </td>
            <td
              class="px-4 py-3 text-center text-xl font-medium capitalize text-white"
            >
              1
            </td>
            <td
              class="px-4 py-3 text-center text-xl font-medium capitalize text-white"
            >
              1
            </td>
          </tr>
          <tr
            class="cursor-pointer border-b border-secondary transition-all duration-200 ease-in-out hover:bg-secondary"
          >
            <td
              class="px-4 py-3 text-center text-xl font-medium capitalize text-white"
            >
              1
            </td>
            <td
              class="flex justify-center px-4 py-2 font-medium capitalize text-white"
            >
              <img
                src="~/assets/img/avatar.png"
                alt="Avatar"
                class="mr-3 h-12 w-12 rounded-full"
              />
              <div>
                <div class="font-semibold">@dheeraj15</div>
                <div class="text-lg text-paragraph">DHEERAJ LAKHARA</div>
              </div>
            </td>
            <td
              class="px-4 py-3 text-center text-xl font-medium capitalize text-white"
            >
              1
            </td>
            <td
              class="px-4 py-3 text-center text-xl font-medium capitalize text-white"
            >
              1
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav class="mt-5 flex justify-center">
      <ul class="inline-flex h-10 text-sm md:text-xl">
        <li
          class="xs:px-2 text-hookYellow ms-0 flex h-10 cursor-pointer items-center justify-center rounded-s-lg border border-e-0 border-gray-700 bg-gray-800 px-4 leading-tight hover:bg-gray-700 sm:px-3"
          @click.prevent="updateRoute('previous')"
        >
          Previous
        </li>
        <li
          v-for="(page, index) in pages"
          :key="index"
          class="xs:px-2 hover:bg-hookYellow flex h-10 cursor-pointer items-center justify-center border border-gray-700 px-4 leading-tight hover:text-white sm:px-3"
          :class="
            page === activePage
              ? 'bg-hookYellow text-white'
              : 'bg-gray-800 text-gray-400'
          "
          @click="updateManual(page)"
        >
          {{ page }}
        </li>
        <li
          class="xs:px-2 text-hookYellow flex h-10 cursor-pointer items-center justify-center rounded-e-lg border border-gray-700 bg-gray-800 px-4 leading-tight hover:bg-gray-700 sm:px-3"
          @click.prevent="updateRoute('next')"
        >
          Next
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
const activePage = ref<number>(1);
const pages = ref<number[]>([1, 2, 3, 4, 5]);

const route = useRoute();
const router = useRouter();

const updateManual = (num: number) => {
  if (activePage.value !== num) {
    router.push({
      query: {
        ...route.query,
        page: num.toString(),
      },
    });
  }
};

const updateRoute = (direction: string) => {
  let nextPage = activePage.value;

  if (direction === "previous" && activePage.value > 1) {
    nextPage--;
  } else if (direction === "next" && activePage.value < pages.value.length) {
    nextPage++;
  }

  if (nextPage !== activePage.value) {
    activePage.value = nextPage;
  }

  router.push({
    query: {
      ...route.query,
      page: nextPage.toString(),
    },
  });
};

watchEffect(() => {
  const pageFromRoute = parseInt(route.query.page as string);
  if (!isNaN(pageFromRoute) && pageFromRoute !== activePage.value) {
    activePage.value = pageFromRoute;
  } else if (!route.query.page) {
    router.replace({
      query: {
        ...route.query,
        page: activePage.value.toString(),
      },
    });
  }
});
</script>

<style scoped></style>
