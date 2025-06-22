<!-- pages/whois.vue -->
<template>
  <section class="blog">
    <div class="container mx-auto px-4">
      <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
        Whois Scanner
      </h1>

      <Form @submit="getWhoisData" :validation-schema="schema" v-slot="{ errors }"
        class="flex items-end justify-center gap-4 max-md:flex-col">
        <div class="relative w-full md:w-[400px]">
          <label for="domain" class="mb-2 cursor-pointer text-xl font-semibold text-paragraph">
            Domain or IP
          </label>
          <Field id="domain" name="domain" type="text"
            placeholder="Enter Domain or IP (e.g., google.com or https://google.com)"
            class="h-fit w-full rounded-md border border-none border-transparent bg-primary p-3 lowercase text-white focus:outline-none focus:ring-2 focus:ring-secondary md:w-[400px]"
            :class="{ 'border-red-500': errors.domain }" v-model="domain" />
          <span class="absolute -bottom-7 left-1 text-sm text-red-500">{{
            errors.domain
          }}</span>
        </div>
        <button :disabled="isLoading" type="submit"
          class="h-fit w-full rounded-xl bg-hookYellow px-10 py-2.5 text-lg font-bold capitalize tracking-wider text-black md:w-fit"
          :class="{ 'cursor-not-allowed opacity-50': isLoading }">
          {{ isLoading ? "Searching..." : "scan" }}
        </button>
      </Form>

      <div v-if="whoisData" class="mt-10 overflow-x-auto">
        <h2
          class="mb-2 bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-xl font-bold tracking-wider text-transparent md:text-2xl">
          Whois Results
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
            <tr v-for="[key, value] in domainInfoEntries" :key="key"
              class="cursor-pointer border-b border-secondary transition-all duration-200 ease-in-out hover:bg-secondary">
              <td class="px-4 py-3 font-medium capitalize text-white">
                {{ formatKey(key) }}
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
import { ref, computed } from "vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toast-notification";
const toast = useToast({ position: "top-right", duration: 1500 });
// Reactive variables
const domain = ref("");
const whoisData = ref(null);
const isLoading = ref(false);
const apiUrl = "https://www.whoisxmlapi.com/whoisserver/WhoisService";

// Validation schema
const schema = yup.object({
  domain: yup
    .string()
    .required("Domain is required")
    .test(
      "is-valid-domain-or-ip",
      "Please enter a valid domain or IP address",
      (value) => {
        const domainRegex =
          /^(https?:\/\/)?([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}\/?$/;
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        return domainRegex.test(value) || ipRegex.test(value);
      },
    ),
});
// Computed properties
const domainInfo = computed(() => {
  if (!whoisData.value?.WhoisRecord?.registryData) return {};
  const data = whoisData.value.WhoisRecord.registryData;
  return {
    "Raw Whois": whoisData.value.WhoisRecord.rawText,
    "Domain Name": data.domainName,
    "Registry Domain ID": data.domainId,
    Registrar: data.registrarName,
    "Registrar WHOIS Server": data.whoisServer,
    "Registrar URL": data.registrarUrl,
    "Updated Date": data.updatedDate,
    "Creation Date": data.createdDate,
    "Expiration Date": data.expiresDate,
    "Registrant Name": data.registrant?.name,
    "Registrant Organization": data.registrant?.organization,
    "Registrant Email": data.registrant?.email,
    "Registrant Phone": data.registrant?.telephone,
    "Registrant Country": data.registrant?.country,
    "Admin Name": data.administrativeContact?.name,
    "Admin Organization": data.administrativeContact?.organization,
    "Admin Email": data.administrativeContact?.email,
    "Admin Phone": data.administrativeContact?.telephone,
    "Admin Country": data.administrativeContact?.country,
    "Tech Name": data.technicalContact?.name,
    "Tech Organization": data.technicalContact?.organization,
    "Tech Email": data.technicalContact?.email,
    "Tech Phone": data.technicalContact?.telephone,
    "Tech Country": data.technicalContact?.country,
  };
});
const runtimeConfig = useRuntimeConfig();

const domainInfoEntries = computed(() => Object.entries(domainInfo.value));

// Methods
const getWhoisData = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      `${apiUrl}?apiKey=${runtimeConfig.public.portApi}&domainName=${domain.value}&outputFormat=JSON`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.ErrorMessage || `HTTP error! Status: ${response.status}`,
      );
    }
    const data = await response.json();
    if (data.WhoisRecord) {
      whoisData.value = data;
      toast.success("Domain Scan successfully");
    } else {
      whoisData.value = null;
      domain.value = "";
    }
  } catch (error) {
    toast.error("Error in This Domain");
    whoisData.value = null;
  } finally {
    isLoading.value = false;
  }
};
const formatKey = (key) => {
  return key.replace(/([A-Z])/g, " $1").trim();
};



definePageMeta({
  middleware: 'auth',
})
</script>

<style scoped>
.text-paragraph {
  color: #e0e0e0;
}

.bg-primary {
  background-color: #2a2a4e;
}

.border-secondary {
  border-color: #3a3a6e;
}

.bg-gradient-to-l {
  background: linear-gradient(to left, #2a2a4e, #3a3a6e);
}

.focus\:ring-secondary:focus {
  --tw-ring-color: #3a3a6e;
}

.hover\:bg-secondary:hover {
  background-color: #3a3a6e;
}
</style>
