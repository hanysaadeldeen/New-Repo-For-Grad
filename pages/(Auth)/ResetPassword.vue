<template>
  <div class="startSection w-full bg-gradient-to-t from-primary to-[#09090B] text-white">
    <div class="container relative mx-auto h-full px-4">
      <div class="flex h-full justify-between">
        <div class="hidden h-full w-1/2 items-center justify-center lg:flex">
          <img src="~/assets/img/LogoWhite-V.svg" alt="Logo" class="w-[350px]" width="350" height="70" />
        </div>

        <div class="flex w-full items-center justify-center border-secondary lg:w-1/2"
          :class="locale === 'ar' ? 'lg:border-r' : 'lg:border-l'">
          <div class="flex w-full flex-col items-center justify-center px-5 lg:px-10">
            <h1
              class="mb-5 bg-gradient-to-r from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
              Reset Password
            </h1>
            <div class="w-full">
              <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="mb-4">
                  <label for="password" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-paragraph">
                    Password
                  </label>
                  <Field id="password" name="password" type="password" placeholder="Enter Your Password"
                    class="w-full rounded-md border border-none border-transparent bg-primary p-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                    :class="{ 'border-red-500': errors.password }" />
                  <span class="text-sm text-red-500">{{
                    errors.password
                  }}</span>
                </div>

                <div class="mb-8">
                  <label for="confirmPassword"
                    class="mb-2 inline-block cursor-pointer text-xl font-semibold text-paragraph">
                    Confirm Password
                  </label>
                  <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Your Password"
                    class="w-full rounded-md border border-none border-transparent bg-primary p-2 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                    :class="{ 'border-red-500': errors.confirmPassword }" />
                  <span class="text-sm text-red-500">{{
                    errors.confirmPassword
                  }}</span>
                </div>
                <button :disabled="isLoading" type="submit"
                  class="w-full rounded-xl bg-gradient-to-l from-primary to-secondary py-2 text-2xl font-bold capitalize tracking-wider text-white"
                  :class="{ 'cursor-not-allowed opacity-50': isLoading }">
                  Reset Password
                </button>
              </Form>
              <nuxt-link :to="localePath('login')">
                <h1 class="mt-5 text-center text-xl text-paragraph">
                  Return to <span class="text-white">login</span>
                </h1>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";
const { locale } = useI18n();
import * as yup from "yup";
import { useAuthStore } from "~/stores/authStore";
import { useToast } from "vue-toast-notification";

const toast = useToast({ position: "top-right", duration: 1500 });

const localePath = useLocalePath();
const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
const { resetPass } = useAuthStore();
const authStore = useAuthStore();
const { isLoading, error } = storeToRefs(authStore);
const onSubmit = async (values: any) => {
  try {
    const response = await resetPass(values);
    if (response) {
      toast.success("Reset Password successfully completed");
      navigateTo(localePath("login"));
    }
  } catch (error: any) {
    toast.error(error);
  }
};
</script>

<style scoped></style>
