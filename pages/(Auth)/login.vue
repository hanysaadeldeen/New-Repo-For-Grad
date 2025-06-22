<template>
  <div class="relative h-dvh bg-gradient-to-t from-[#092034] to-[#09090B]">
    <img src="~/assets/img/loginPattern.svg" alt="LoginPatter" class="absolute -top-24 left-0 h-[700px] w-[1200px]"
      width="1200px" height="700px" />

    <div class="container relative mx-auto h-full px-4">
      <div class="flex items-center justify-center">
        <div class="relative h-fit w-full overflow-hidden rounded-xl py-10 md:w-[450px]">
          <!-- الخلفية فقط -->
          <div class="absolute inset-0 z-0 bg-black/50 backdrop-blur-sm"></div>
          <h1 class="relative z-10 mb-8 px-10 text-center text-xl text-white md:text-2xl">
            Login In ZeroPointPath?
          </h1>

          <!-- المحتوى -->
          <div class="relative z-10 px-10">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <div class="mb-4">
                <label for="email"
                  class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">Email</label>
                <Field id="email" name="email" type="email" placeholder="Enter Your Email"
                  class="lowercase w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.email }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.email
                }}</span>
              </div>
              <div class="mb-4">
                <label for="password"
                  class="inline-block cursor-pointer text-base font-semibold text-paragraph">Password</label>
                <Field id="password" name="password" type="password" placeholder="Enter Your Password"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.password }" />
                <nuxt-link :to="localePath('ForgetPassword')">
                  <span class="mt-4 block text-sm text-paragraph">
                    Forget Password
                  </span>
                </nuxt-link>
                <span class="mt-2 text-sm text-red-500">{{
                  errors.password
                }}</span>
              </div>
              <Button title="LogIn" :disabled="isLoading" type="submit" class="!mt-4 !rounded-xl"
                :class="{ 'cursor-not-allowed opacity-50': isLoading }" />
            </Form>
            <div class="my-8 flex flex-col gap-5">
              <button
                class="flex w-full items-center justify-center gap-1 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500">
                <img src="~/assets/img/googleIcon.svg" alt="googleIcon" class="inline-block h-5 w-5" />
                <span></span> Sign With Google
              </button>
              <button
                class="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500">
                <span>
                  <i class="fa-brands fa-github text-xl text-white"></i>
                </span>

                <span> sign With Google </span>
              </button>
            </div>

            <span class="block w-full text-center text-paragraph">
              New To ZeroPointPath? Create a new account
              <nuxt-link :to="localePath('Register')" class="tracking-wider text-white underline">
                here
              </nuxt-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from "vee-validate";

import * as yup from "yup";
import { useAuthStore } from "~/stores/authStore";
import { useToast } from "vue-toast-notification";

const toast = useToast({ position: "top-right", duration: 1500 });

const localePath = useLocalePath();
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const { loginUser } = useAuthStore();
const authStore = useAuthStore();
const { isLoading, error } = storeToRefs(authStore);

const onSubmit = async (values: any) => {
  try {
    const response = await loginUser(values);
    if (response?.message) {
      toast.error(response?.message);
    } else if (!response?.errors) {
      toast.success("Login successfully completed");
      navigateTo(localePath("/"));
    }
  } catch (error: any) {
    toast.error("Registration failed");
  }
};
</script>

<style scoped></style>
