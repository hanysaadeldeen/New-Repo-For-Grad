<template>
  <div class="text-cenber absolute -bottom-2   max-lg:left-0 lg:right-0 inline-block">
    <div v-if="isOpen"
      class="absolute max-lg:left-0 lg:right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
      <nuxt-link :to="localePath('UserPage')" @click="$emit('toggle-sidebar')"
        class="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100">
        <i class="fas fa-user text-hookYellow"></i>
        User Page
      </nuxt-link>
      <a href="#" @click="logout" class="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100">
        <i class="fas fa-right-from-bracket text-hookYellow"></i>
        Logout
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const localePath = useLocalePath();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggleDropdown"]);

const logout = () => {
  useCookie("userName", { maxAge: 0 }).value = null;
  useCookie("token", { maxAge: 0 }).value = null;
  useCookie("userRole", { maxAge: 0 }).value = null;
  useCookie("userId", { maxAge: 0 }).value = null;
};
</script>
