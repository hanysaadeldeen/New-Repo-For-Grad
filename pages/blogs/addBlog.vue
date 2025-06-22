<template>
  <div class="container mx-auto">
    <div class="flex items-start justify-start text-white">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="w-full rounded-lg p-6 shadow-lg">
        <h1
          class="mb-8 bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-2xl font-bold tracking-wider text-transparent md:text-4xl">
          Add New Blog
        </h1>
        <!-- Image Upload -->
        <div class="mb-4">
          <label for="image" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Blog Image
          </label>
          <Field id="image" name="image" v-slot="{ field }">
            <input type="file" accept="image/*" @change="handleImageUpload($event, field)"
              class="w-full rounded-md border border-none border-transparent bg-gray-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.image }" />
          </Field>
          <span class="text-sm text-red-500">{{ errors.image }}</span>
          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="mx-auto mt-4 size-24 w-1/2 object-contain"
            width="96" height="96" />
        </div>

        <!-- Introduction -->
        <div class="mb-4">
          <label for="introduction" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Introduction
          </label>
          <Field id="introduction" name="introduction" as="textarea" rows="4" placeholder="Enter Introduction"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.introduction }" />
          <span class="text-sm text-red-500">{{ errors.introduction }}</span>
        </div>

        <!-- What is Fog -->
        <div class="mb-4">
          <label for="whatIsFog" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            What is Fog
          </label>
          <Field id="whatIsFog" name="whatIsFog" as="textarea" rows="4" placeholder="Enter What is Fog"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.whatIsFog }" />
          <span class="text-sm text-red-500">{{ errors.whatIsFog }}</span>
        </div>

        <!-- Technical Investigation -->
        <div class="mb-4">
          <label for="technicalInvestigation"
            class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Technical Investigation
          </label>
          <Field id="technicalInvestigation" name="technicalInvestigation" as="textarea" rows="4"
            placeholder="Enter Technical Investigation"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.technicalInvestigation }" />
          <span class="text-sm text-red-500">{{
            errors.technicalInvestigation
          }}</span>
        </div>

        <!-- Data Leak Site (DLS) -->
        <div class="mb-4">
          <label for="dataLeakSite" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Data Leak Site (DLS)
          </label>
          <Field id="dataLeakSite" name="dataLeakSite" as="textarea" rows="4" placeholder="Enter Data Leak Site Details"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.dataLeakSite }" />
          <span class="text-sm text-red-500">{{ errors.dataLeakSite }}</span>
        </div>

        <!-- Submit Button -->
        <button :disabled="isSubmitting" type="submit"
          class="w-full rounded-xl bg-gradient-to-l from-primary to-secondary px-16 py-2 text-2xl font-medium capitalize tracking-wider text-white md:w-fit"
          :class="{ 'cursor-not-allowed opacity-50': isSubmitting }">
          {{ isSubmitting ? "Submitting..." : "Add Blog" }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { object, string, mixed } from "yup";
// Form schema with Yup validation
const schema = object({
  image: mixed().required("Image is required"),
  introduction: string()
    .required("Introduction is required")
    .min(10, "Introduction must be at least 10 characters"),
  whatIsFog: string()
    .required("What is Fog is required")
    .min(10, "What is Fog must be at least 10 characters"),
  technicalInvestigation: string()
    .required("Technical Investigation is required")
    .min(10, "Technical Investigation must be at least 10 characters"),
  dataLeakSite: string()
    .required("Data Leak Site is required")
    .min(10, "Data Leak Site must be at least 10 characters"),
});

// Image preview
const isSubmitting = ref(false);
const imagePreview = ref(null);

// Handle image upload
const handleImageUpload = (event, field) => {
  const file = event.target.files[0];
  if (file) {
    field.onChange(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const onSubmit = (values) => {
  isSubmitting.value = true;
  console.log("Form submitted:", values);
  isSubmitting.value = false;
};


definePageMeta({
  middleware: 'admin',
})
</script>

<style scoped></style>
