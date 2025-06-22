<template>
  <section class="blog">
    <div class="container mx-auto px-4">
      <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
        Email Scanner
      </h1>

      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }"
        class="flex items-end justify-center gap-4 max-md:flex-col">
        <div class="relative w-full md:w-[400px]">
          <label for="email" class="mb-2 cursor-pointer text-xl font-semibold text-paragraph">Email</label>
          <Field id="email" name="email" type="email" placeholder="Enter Email"
            class="h-fit w-full rounded-md border border-none border-transparent bg-primary p-3 lowercase text-white focus:outline-none focus:ring-2 focus:ring-secondary md:w-[400px]"
            :class="{ 'border-red-500': errors.email }" />
          <span class="absolute -bottom-7 left-1 text-sm text-red-500">{{
            errors.email
          }}</span>
        </div>
        <button :disabled="isLoading" type="submit"
          class="h-fit w-full rounded-xl bg-hookYellow px-10 py-2.5 text-lg font-bold capitalize tracking-wider text-black md:w-fit"
          :class="{ 'cursor-not-allowed opacity-50': isLoading }">
          Email Scanner
        </button>
      </Form>
      <div v-if="emailData" class="mt-10 overflow-x-auto">
        <h2
          class="mb-2 bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-xl font-bold tracking-wider text-transparent md:text-2xl">
          Email Scanner Results
        </h2>
        <table
          class="mx-auto w-full border-collapse overflow-hidden rounded-lg bg-white/10 backdrop-blur-md md:w-[616px]">
          <thead>
            <tr class="bg-primary text-white">
              <th class="px-4 py-3 text-left">Attribute</th>
              <th class="px-4 py-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in emailData" :key="index"
              class="cursor-pointer border-b border-secondary transition-all duration-200 ease-in-out hover:bg-secondary">
              <td class="px-4 py-3 font-medium capitalize text-white">
                {{ formatKey(index) }}
              </td>
              <td class="px-4 py-3 text-gray-300">{{ value || "N/A" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toast-notification";
const toast = useToast({ position: "top-right", duration: 1500 });
const emailData = ref(null);
const isLoading = ref(false);

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const onSubmit = async (values) => {
  const runtimeConfig = useRuntimeConfig();
  const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${runtimeConfig.public.emailApi}&email=${values.email}`;

  try {
    isLoading.value = true;
    const response = await fetch(apiUrl);
    isLoading.value = false;
    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();
    if (data.email) {
      emailData.value = {
        Email: data.email,
        Autocorrect: data.autocorrect,
        Deliverability: data.deliverability,
        "Quality Score": data.quality_score,
        "Valid Format": data.is_valid_format?.text,
        "Free Email": data.is_free_email?.text,
        "Disposable Email": data.is_disposable_email?.text,
        "Role Email": data.is_role_email?.text,
        "MX Found": data.is_mx_found?.text,
        "SMTP Valid": data.is_smtp_valid?.text,
      };
      toast.success("Email Scan successfully");
    } else {
      emailData.value = null;
    }
  } catch (error) {
    toast.error("Error in This Email");

    emailData.value = null;
  }
};

const formatKey = (key) => key.replace(/_/g, " ");



definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped></style>
