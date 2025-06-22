<template>
  <div class="relative min-h-dvh bg-gradient-to-t from-[#092034] to-[#09090B] pb-10 md:pb-16">
    <img src="~/assets/img/loginPattern.svg" alt="LoginPatter" class="absolute -top-24 left-0 h-[700px] w-[1200px]"
      width="1200px" height="700px" />

    <div class="container relative mx-auto h-full px-4">
      <div class="flex items-center justify-center">
        <div class="relative h-fit w-full overflow-hidden rounded-xl py-10 md:w-[450px]">
          <!-- Background overlay -->
          <div class="absolute inset-0 z-0 bg-black/50 backdrop-blur-sm"></div>
          <h1 class="relative z-10 mb-8 px-10 text-center text-xl text-white md:text-2xl">
            Register In ZeroPointPath
          </h1>

          <!-- Content -->
          <div class="relative z-10 px-10">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <div class="mb-4">
                <label for="firstName" class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">
                  First Name
                </label>
                <Field id="firstName" name="firstName" type="text" placeholder="Enter Your First Name"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.firstName }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.firstName
                }}</span>
              </div>

              <div class="mb-4">
                <label for="lastName" class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">
                  Last Name
                </label>
                <Field id="lastName" name="lastName" type="text" placeholder="Enter Your Last Name"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.lastName }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.lastName
                }}</span>
              </div>

              <div class="mb-4">
                <label for="userName" class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">
                  User Name
                </label>
                <Field id="userName" name="userName" type="text" placeholder="Enter Your User Name"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.userName }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.userName
                }}</span>
              </div>

              <div class="mb-4">
                <label for="email" class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">
                  Email
                </label>
                <Field id="email" name="email" type="email" placeholder="Enter Your Email"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.email }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.email
                }}</span>
              </div>

              <div class="mb-4">
                <label for="password" class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">
                  Password
                </label>
                <Field id="password" name="password" type="password" placeholder="Enter Your Password"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.password }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.password
                }}</span>
              </div>

              <div class="mb-8">
                <label for="confirmPassword"
                  class="mb-2 inline-block cursor-pointer text-base font-semibold text-paragraph">
                  Confirm Password
                </label>
                <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Your Password"
                  class="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :class="{ 'border-red-500': errors.confirmPassword }" />
                <span class="mt-2 inline-block text-sm text-red-500">{{
                  errors.confirmPassword
                }}</span>
              </div>

              <!-- <button :disabled="isLoading" type="submit"
                class="w-full rounded-xl bg-gradient-to-l from-primary to-secondary py-2 text-xl font-bold capitalize tracking-wider text-white"
                :class="{ 'cursor-not-allowed opacity-50': isLoading }">
                Register
              </button> -->
              <Button title="Register" :disabled="isLoading" type="submit" class="!mt-4 !rounded-xl"
                :class="{ 'cursor-not-allowed opacity-50': isLoading }" />
            </Form>

            <div class="my-8 flex flex-col gap-5">
              <button
                class="flex w-full items-center justify-center gap-1 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500">
                <img src="~/assets/img/googleIcon.svg" alt="googleIcon" class="inline-block h-5 w-5" />
                <span>Sign With Google</span>
              </button>
              <button
                class="flex w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/60 transition focus:outline-none focus:ring-2 focus:ring-orange-500">
                <span>
                  <i class="fa-brands fa-github text-xl text-white"></i>
                </span>
                <span>Sign With GitHub</span>
              </button>
            </div>

            <span class="block w-full text-center text-paragraph">
              Already have an account?
              <nuxt-link :to="localePath('login')" class="tracking-wider text-white underline">
                Login here
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
const { locale } = useI18n();

const localePath = useLocalePath();
const schema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  userName: yup
    .string()
    .min(2, "User name must be at least 2 characters")
    .required("User name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const { registerUser } = useAuthStore();
const authStore = useAuthStore();
const { isLoading, error } = storeToRefs(authStore);
import { useToast } from "vue-toast-notification";
const toast = useToast({ position: "top-right", duration: 2500 });

const onSubmit = async (values: any) => {
  try {
    const response = await registerUser(values);

    if (response?.errors) {
      toast.error(response?.errors[0]);
    } else if (!response?.errors) {
      toast.success("register successfully completed");
      navigateTo(localePath("/login"));
    }
  } catch (error: any) {
    toast.error("Registration failed");
  }
};
</script>

<style scoped></style>
