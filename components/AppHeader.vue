<template>
  <header class="relative z-40 bg-transparent py-5 text-white">
    <div class="container mx-auto px-5">
      <div class="relative z-20">
        <div class="flex items-center justify-between">
          <nuxt-link :to="localePath('index')">
            <img src="~/assets/img/Logo White-H.svg" alt="Zero Point Path" class="inline-block w-48 object-contain"
              width="192" height="48" />
          </nuxt-link>
          <div class="hidden items-center justify-between gap-10 lg:flex">
            <div v-if="isLogin" class="tools relative flex cursor-pointer items-center gap-2" @click="toogleTools">
              <p :class="[
                '/emailScanner',
                '/passwordgenerator',
                '/virusscanner',
                '/whoisScanner',
                '/websiteScanner',
              ].includes(adjustedPath)
                ? 'active'
                : ''
                ">
                {{ $t("tools") }}
              </p>
              <i class="fa-solid fa-angle-down" :class="[
                '/emailScanner',
                '/passwordgenerator',
                '/virusscanner',
                '/whoisScanner',
                '/websiteScanner',
              ].includes(adjustedPath)
                ? 'active'
                : ''
                "></i>
              <transition name="dropdown">
                <div v-if="isToolOpen" class="arrowTools absolute -bottom-[25px] left-1/2 h-5 w-5 -translate-x-1/2">
                </div>
              </transition>
            </div>
            <nuxt-link :to="localePath('blogs')">
              <p :class="adjustedPath === '/blogs' ? 'active' : ''">
                {{ $t("blogs") }}
              </p>
            </nuxt-link>
            <nuxt-link to="login" v-if="!isLogin">
              <p :class="adjustedPath === '/login' ? 'active' : ''">
                {{ $t("login") }}
              </p>
            </nuxt-link>
            <nuxt-link v-if="isLogin" :to="localePath('community')"
              class="relative flex cursor-pointer items-center gap-2">
              <p :class="adjustedPath === '/community' ? 'active' : ''">
                {{ $t("community") }}
              </p>
            </nuxt-link>

            <nuxt-link v-if="isLogin" :to="localePath('programs')"
              class="Bounties relative flex cursor-pointer items-center gap-2">
              <p :class="adjustedPath === '/programs' ? 'active' : ''">
                {{ $t("Bounties") }}
              </p>
              <i class="fa-solid fa-virus"></i>
            </nuxt-link>
            <div v-if="isLogin" class="CTF relative">
              <div class="cursor-pointer flex items-center gap-2" @click="toggleCtfDropdown">
                <p :class="adjustedPath === '/ctfevent' ? 'active' : ''">
                  {{ $t("CTF") }}
                </p>
                <i class="fa-solid fa-angle-down   duration-300 ease-in-out transition-all " :class="[
                  isCTpDropdownOpen ? 'rotate-180' : 'rotate-0',
                  adjustedPath === '/ctfevent' ? 'active' : ''
                ]"></i>
              </div>
              <transition name="dropdown">
                <CTFDropDown v-if="isCTpDropdownOpen" :is-open="isCTpDropdownOpen"
                  @toggle-dropdown="toggleCtfDropdown" />
              </transition>
            </div>

            <div v-if="isLogin" class="relative ">
              <div @click="toggleUserDropdown" class="cursor-pointer flex items-center gap-2">
                <p class=" cursor-pointer" :class="adjustedPath === '/UserPage' ? 'active' : ''">
                  {{ userName }}
                </p>
                <i class="fa-solid fa-angle-down   duration-300 ease-in-out transition-all " :class="[
                  isUserDropdownOpen ? 'rotate-180' : 'rotate-0',
                  adjustedPath === '/UserPage' ? 'active' : ''
                ]"></i>
              </div>
              <transition name="dropdown">
                <UserDropDown v-if="isUserDropdownOpen" :is-open="isUserDropdownOpen"
                  @toggle-sidebar="toggleUserDropdown" />
              </transition>
            </div>

            <!-- <button
              @click="setLocale(locale === 'en' ? 'ar' : 'en')"
              class="cursor-pointer text-xl font-medium"
            >
              {{ locale === "en" ? "العربية" : "English" }}
            </button> -->
          </div>
          <div class="block lg:hidden">
            <i @click="isSideBar = !isSideBar" class="fa-solid fa-bars-staggered cursor-pointer text-3xl"></i>
          </div>
        </div>
        <transition name="dropdown">
          <div v-if="isToolOpen" class="absolute top-16 z-50 h-fit rounded-md bg-white p-4 max-lg:hidden md:w-fit"
            :class="{
              'left-5': locale === 'ar',
              'right-5': locale !== 'ar',
            }">
            <div class="relative grid w-full grid-cols-2 gap-4 xl:grid-cols-3">

              <nuxt-link v-for="tool in tools" class="relative z-30" :key="tool.route" :to="localePath(tool.route)"
                @click="isToolOpen = !isToolOpen">
                <div
                  class="tool mx-auto flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md p-5 transition-all duration-300 ease-in-out hover:bg-[#E8EBF0]">
                  <div :class="{
                    'flex h-[48px] w-[48px] items-center justify-center rounded-md bg-hookYellow':
                      tool.iconType === 'fa',
                  }">
                    <i v-if="tool.iconType === 'fa'" :class="[
                      'fa-solid',
                      tool.icon,
                      'text-2xl text-[#744712]',
                    ]"></i>
                    <img v-else :src="tool.icon" :alt="tool.label.toLowerCase()" />
                  </div>
                  <p class="text-center text-base font-semibold tracking-wider text-black">
                    {{ tool.label }}
                  </p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </transition>
      </div>
      <transition :name="transitionName">
        <div v-if="isSideBar"
          class="sideBar absolute right-0 z-40 flex max-h-fit min-h-[calc(100vh-75px)] w-full flex-col items-start bg-white px-8 pb-5 text-black transition-all lg:hidden"
          :class="[
            {
              'right-0': locale === 'ar',
              'left-0': locale !== 'ar',
            },
          ]">
          <div class="container mx-auto px-5 pl-5">
            <nav class="mt-10 inline-block">
              <ul class="flex w-full flex-col gap-2">

                <nuxt-link :to="localePath('blogs')" @click="isSideBar = !isSideBar">
                  <li :class="adjustedPath === '/blogs' ? 'active' : ''">
                    {{ $t("blogs") }}
                  </li>
                </nuxt-link>
                <nuxt-link v-if="isLogin" :to="localePath('community')" @click="isSideBar = !isSideBar"
                  class="relative flex cursor-pointer items-center gap-2">
                  <li :class="adjustedPath === 'community' ? 'active' : ''">
                    {{ $t("community") }}
                  </li>
                </nuxt-link>
                <nuxt-link v-if="isLogin" :to="localePath('programs')" @click="isSideBar = !isSideBar"
                  class="relative flex cursor-pointer items-center gap-2">
                  <li :class="adjustedPath === '/programs' ? 'active' : ''">
                    {{ $t("Bounties") }}
                  </li>
                  <i class="fa-solid fa-virus"></i>
                </nuxt-link>

                <div v-if="isLogin" class="relative">
                  <div class="cursor-pointer flex items-center gap-2" @click="toggleCtfDropdown">
                    <li class="font-bold" :class="adjustedPath === '/ctfevent' ? 'active' : ''">
                      {{ $t("CTF") }}
                    </li>

                    <i class="fa-solid fa-angle-down   duration-300 ease-in-out transition-all " :class="[
                      isCTpDropdownOpen ? 'rotate-180' : 'rotate-0',
                      adjustedPath === '/ctfevent' ? 'active' : ''
                    ]"></i>

                  </div>
                  <transition name="dropdown">

                    <CTFDropDown v-if="isCTpDropdownOpen" :is-open="isCTpDropdownOpen"
                      @toggle-dropdown="toggleCtfDropdown" @toggle-sidebar="toggleSideBar" />
                  </transition>
                </div>
                <nuxt-link v-if="!isLogin" :to="localePath('login')" @click="isSideBar = !isSideBar">
                  <li :class="adjustedPath === '/login' ? 'active' : ''">
                    {{ $t("login") }}
                  </li>
                </nuxt-link>
                <div v-if="isLogin" class="relative">
                  <div class="flex items-center gap-x-2 cursor-pointer" @click="toggleUserDropdown">

                    <li class=" font-bold" :class="adjustedPath === '/UserPage' ? 'active' : ''">
                      {{ userName }}
                    </li>
                    <i class="fa-solid fa-angle-down   duration-300 ease-in-out transition-all " :class="[
                      isUserDropdownOpen ? 'rotate-180' : 'rotate-0',
                      adjustedPath === '/UserPage' ? 'active' : ''
                    ]"></i>
                  </div>
                  <transition name="dropdown">

                    <UserDropDown v-if="isUserDropdownOpen" @toggle-sidebar="toggleSideBar"
                      :is-open="isUserDropdownOpen" @toggle-dropdown="toggleUserDropdown" />
                  </transition>
                </div>

                <div v-if="isLogin" class="relative flex cursor-pointer items-center gap-2"
                  @click="isToolOpen = !isToolOpen">
                  <!-- <ul>
                    <li :class="adjustedPath === '/UserPage' ? 'active' : ''">
                      {{ $t("tools") }}
                    </li>
                  </ul> -->
                  <li :class="[
                    '/emailScanner',
                    '/passwordgenerator',
                    '/virusscanner',
                    '/whoisScanner',
                    '/websiteScanner',
                  ].includes(adjustedPath)
                    ? 'active'
                    : ''
                    ">
                    {{ $t("tools") }}
                  </li>
                  <i class="fa-solid fa-angle-down" :class="[
                    '/emailScanner',
                    '/passwordgenerator',
                    '/virusscanner',
                    '/whoisScanner',
                    '/websiteScanner',
                  ].includes(adjustedPath)
                    ? 'active'
                    : ''
                    "></i>
                  <!-- <i class="fa-solid fa-angle-down"></i> -->
                  <!-- <transition name="dropdown">
                    <div v-if="isToolOpen" class="arrowTools2 absolute -bottom-[8px] h-5 w-5" :class="{
                      'left-5': locale === 'en',
                      'right-0': locale !== 'ar',
                    }"></div>
                  </transition> -->
                </div>
                <transition name="dropdown">
                  <div v-if="isToolOpen && isLogin" :class="{
                    'left-5': locale === 'ar',
                    'right-5': locale !== 'ar',
                  }">
                    <div class="grid w-full grid-cols-2 gap-5 bg-[#F4F8FD] p-3">
                      <nuxt-link v-for="tool in tools" :key="tool.route" :to="localePath(tool.route)"
                        @click="toggleSideBar">
                        <div
                          class="tool mx-auto flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-[#E8EBF0]">
                          <div :class="{
                            'flex h-[48px] w-[48px] items-center justify-center rounded-md bg-hookYellow':
                              tool.iconType === 'fa',
                          }">
                            <i v-if="tool.iconType === 'fa'" :class="[
                              'fa-solid',
                              tool.icon,
                              'text-2xl text-[#744712]',
                            ]"></i>
                            <img v-else :src="tool.icon" :alt="tool.label.toLowerCase()" />
                          </div>
                          <p class="text-center text-base font-semibold tracking-wider text-black">
                            {{ tool.label }}
                          </p>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </transition>
              </ul>
            </nav>
            <!-- <div class="mt-5 flex flex-col items-start justify-between gap-5">
            <button
              @click="setLocale(locale === 'en' ? 'ar' : 'en')"
              class="text-xl font-medium"
            >
              {{ locale === "en" ? "العربية" : "English" }}
            </button>
          </div> -->
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();
const isSideBar = ref<boolean>(false);
const transitionName = computed(() =>
  locale.value === "ar" ? "sidebar-ar" : "sidebar-en",
);

// Define tools array for v-for

import spider from "~/assets/img/spider.svg";
import password from "~/assets/img/password.svg";

let isLogin = useCookie("token");
let userName = useCookie("userName");
interface Tool {
  route: string;
  label: string;
  icon: string;
  iconType: "fa" | "img";
}

const tools = ref<Tool[]>([
  {
    route: "websiteScanner",
    label: "Website Scanner",
    icon: spider,
    iconType: "img",
  },
  {
    route: "whoisScanner",
    label: "Whois Scanner",
    icon: "fa-eye",
    iconType: "fa",
  },
  {
    route: "emailScanner",
    label: "Email Scanner",
    icon: "fa-envelope",
    iconType: "fa",
  },
  {
    route: "passwordgenerator",
    label: "Password Generator",
    icon: password,
    iconType: "img",
  },
  {
    route: "virusscanner",
    label: "URL Scanner",
    icon: "fa-bug",
    iconType: "fa",
  },
]);

const route = useRoute();
const getPathWithoutLocale = (path: string) => {
  const segments = path.split("/");
  if (segments[1] && segments[1].length === 2) {
    return `/${segments.slice(2).join("/")}`;
  }
  return path;
};
const adjustedPath = computed(() => getPathWithoutLocale(route.path));

const isToolOpen = ref<boolean>(false);
const isUserDropdownOpen = ref(false);
const isCTpDropdownOpen = ref(false);

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
  isCTpDropdownOpen.value = false;
  isToolOpen.value = false
};
const toggleCtfDropdown = () => {
  isCTpDropdownOpen.value = !isCTpDropdownOpen.value;
  isUserDropdownOpen.value = false
  isToolOpen.value = false
};
const toogleTools = () => {
  isToolOpen.value = !isToolOpen.value
  isCTpDropdownOpen.value = false;
  isUserDropdownOpen.value = false
};


const toggleSideBar = () => {
  isSideBar.value = !isSideBar.value
  isCTpDropdownOpen.value = false;
  isUserDropdownOpen.value = false
  isToolOpen.value = false
}

</script>

<style scoped>
a {
  text-decoration: none;
}

ul li {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  display: inline-block;
  position: relative;
  list-style: none;
  width: fit-content;
  padding: 10px 0;
  cursor: pointer;
}

ul li::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1.9px;
  background: linear-gradient(to right, #bd292e 75%, #f9ae31 25%);
  bottom: 0;
  left: 0;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-in-out;
}

.gradient-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #e91c2b 65%, #f9ae31 100%);
  z-index: 0;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.button-text {
  position: relative;
  z-index: 1;
}

.gradient-button:hover .gradient-bg {
  opacity: 1;
}

ul li:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

ul li.active::before {
  transform: scaleX(1);
}

.active {
  color: #f9ae31;
}

.sidebar-en-enter-active,
.sidebar-en-leave-active,
.sidebar-ar-enter-active,
.sidebar-ar-leave-active {
  transition: all 0.5s ease;
}

.sidebar-en-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar-en-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar-ar-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.sidebar-ar-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.arrowTools,
.arrowTools2 {
  border-width: 10px;
  border-style: solid;
}

.arrowTools {
  border-color: transparent transparent white transparent;
}

.arrowTools2 {
  border-color: transparent transparent #f4f8fd transparent;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* .toolsDropdown {
  filter: blur(5px);
  opacity: 0.5;
} */
</style>
