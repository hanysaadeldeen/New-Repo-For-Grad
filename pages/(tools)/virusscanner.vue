<script setup>
import { ref } from "vue";
import { useScanUrl } from "~/composables/useScanUrl";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toast-notification";
const toast = useToast({ position: "top-right", duration: 1500 });
const urlInput = ref("");
const { scanUrl, scanResults, loading, error } = useScanUrl();

const schema = yup.object({
  urlInput: yup.string().required("url is required"),
});

const handleScan = async (value) => {
  if (!value.urlInput) return;
  await scanUrl(value.urlInput);
};


definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <section class="VirusScanner">
    <div class="container mx-auto p-4">
      <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
        URL Scanner
      </h1>
      <Form @submit="handleScan" :validation-schema="schema" v-slot="{ errors }"
        class="flex items-end justify-center gap-4 rounded-lg p-6 shadow-lg backdrop-blur-md max-md:flex-col">
        <div class="relative w-full md:w-[400px]">
          <label for="urlInput" class="mb-2 cursor-pointer text-xl font-semibold text-paragraph">
            URL Scanner
          </label>
          <Field id="urlInput" name="urlInput" type="text" placeholder="Enter URL"
            class="h-fit w-full rounded-md border border-none border-transparent bg-primary p-3 lowercase text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary"
            :class="{ 'border-red-500': errors.urlInput }" />
          <span class="absolute -bottom-7 left-1 text-sm text-red-500">{{
            errors.urlInput
          }}</span>
        </div>
        <button :disabled="loading" type="submit"
          class="h-fit w-full rounded-xl bg-hookYellow px-10 py-2.5 text-lg font-bold capitalize tracking-wider text-black md:w-fit"
          :class="{ 'cursor-not-allowed opacity-50': loading }">
          Scan URL
        </button>
      </Form>

      <div v-if="error" class="text-red-500">{{ error }}</div>

      <div v-if="scanResults">
        <h2
          class="bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-2xl font-bold tracking-wider text-transparent md:text-3xl">
          Scan Results:
        </h2>
        <table class="mt-2 w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-primary text-white">
              <th class="border p-2 text-lg font-semibold tracking-wide">
                Type
              </th>
              <th class="border p-2 text-lg font-semibold tracking-wide">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="cursor-pointer border-b border-secondary text-white transition-all duration-200 ease-in-out hover:bg-secondary">
              <td class="border p-2 text-lg font-semibold tracking-wide">
                Malicious
              </td>
              <td class="border p-2 text-red-500">
                {{ scanResults.malicious }}
              </td>
            </tr>
            <tr
              class="cursor-pointer border-b border-secondary text-white transition-all duration-200 ease-in-out hover:bg-secondary">
              <td class="border p-2 text-lg font-semibold tracking-wide">
                Harmless
              </td>
              <td class="border p-2 text-green-500">
                {{ scanResults.harmless }}
              </td>
            </tr>
            <tr
              class="cursor-pointer border-b border-secondary text-white transition-all duration-200 ease-in-out hover:bg-secondary">
              <td class="border p-2 text-lg font-semibold tracking-wide">
                Suspicious
              </td>
              <td class="border p-2 text-yellow-500">
                {{ scanResults.suspicious }}
              </td>
            </tr>
            <tr
              class="cursor-pointer border-b border-secondary text-white transition-all duration-200 ease-in-out hover:bg-secondary">
              <td class="border p-2 text-lg font-semibold tracking-wide">
                Last Analysis Date
              </td>
              <td class="border p-2 text-red-500">
                {{ scanResults.lastAnalysisDate }}
              </td>
            </tr>
          </tbody>
        </table>

        <h2
          class="mt-4 bg-gradient-to-b bg-clip-text text-center text-2xl font-bold tracking-wider text-transparent text-white md:text-3xl">
          Vendors Analysis:
        </h2>
        <div v-if="scanResults.vendors">
          <div v-for="(group, key) in scanResults.vendors" :key="key" class="mt-4">
            <h3
              class="mb-4 bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-lg font-bold tracking-wider text-transparent md:text-xl">
              {{ key }} ({{ group.length }})
            </h3>
            <table class="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr class="bg-primary text-white">
                  <th class="border p-2 text-lg font-semibold tracking-wide">
                    Vendor
                  </th>
                  <th class="border p-2 text-lg font-semibold tracking-wide">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="vendor in group" :key="vendor.vendor"
                  class="cursor-pointer border-b border-secondary text-white transition-all duration-200 ease-in-out hover:bg-secondary">
                  <td class="border p-2 text-white">{{ vendor.vendor }}</td>
                  <td class="border p-2 text-lg font-semibold tracking-wide" :class="{
                    'text-red-500': key === 'Phishing',
                    'text-green-500': key === 'Clean',
                    'text-yellow-500': key === 'Unrated',
                  }">
                    {{ vendor.result }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
