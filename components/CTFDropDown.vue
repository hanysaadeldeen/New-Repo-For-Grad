<template>
    <div class="text-cenber absolute -bottom-2   max-lg:left-0 lg:right-0 inline-block">
        <div v-if="isOpen"
            class="absolute max-lg:left-0 lg:right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">

            <a href="https://ramadan-ctf-ieeemansb.me/" target="_blank"
                class="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100">
                <img src="~/assets/img/CTF icon.png" alt="CTF icon" class="w-5 h-5">
                CTF Platform
            </a>
            <nuxt-link :to="localePath('ctfevent')" @click="$emit('toggle-dropdown')"
                class="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100">
                <img src="~/assets/img/CTF event.png" alt="CTF event" class="w-5 h-5">
                CTF Events
            </nuxt-link>
        </div>
    </div>
</template>

<script setup>

const localePath = useLocalePath();

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,

    },
});

const emit = defineEmits(["toggleDropdown"]);

const goToUserInfo = () => {
    emit("toggleDropdown");
};

const logout = () => {
    useCookie("userName", { maxAge: 0 }).value = null;
    useCookie("token", { maxAge: 0 }).value = null;
    useCookie("userRole", { maxAge: 0 }).value = null;
    useCookie("userId", { maxAge: 0 }).value = null;
};
</script>
