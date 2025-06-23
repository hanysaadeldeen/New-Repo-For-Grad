<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-900 p-4 text-white">
    <Form @submit="onSubmit" class="w-full max-w-lg rounded-lg bg-gray-800 p-6 shadow-lg">
      <h2 class="mb-6 text-center text-2xl font-bold">Add New Blog</h2>

      <!-- Image Upload -->
      <div class="mb-4">
        <label for="image" class="mb-2 block text-sm font-medium">Blog Image</label>
        <Field name="image" v-slot="{ field, errorMessage }">
          <input id="image" type="file" accept="image/*" @change="handleImageUpload($event, field)"
            class="block w-full text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-gray-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-600" />
          <span v-if="errorMessage" class="text-sm text-red-500">{{
            errorMessage
          }}</span>
        </Field>
        <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="mt-4 h-48 w-full rounded object-cover" />
      </div>

      <!-- Introduction -->
      <div class="mb-4">
        <label for="introduction" class="mb-2 block text-sm font-medium">Introduction</label>
        <Field name="introduction" v-slot="{ field, errorMessage }">
          <textarea id="introduction" v-bind="field" rows="4"
            class="w-full rounded border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': errorMessage }"></textarea>
          <span v-if="errorMessage" class="text-sm text-red-500">{{
            errorMessage
          }}</span>
        </Field>
      </div>

      <!-- What is Fog -->
      <div class="mb-4">
        <label for="whatIsFog" class="mb-2 block text-sm font-medium">What is Fog</label>
        <Field name="whatIsFog" v-slot="{ field, errorMessage }">
          <textarea id="whatIsFog" v-bind="field" rows="4"
            class="w-full rounded border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': errorMessage }"></textarea>
          <span v-if="errorMessage" class="text-sm text-red-500">{{
            errorMessage
          }}</span>
        </Field>
      </div>

      <!-- Technical Investigation -->
      <div class="mb-4">
        <label for="technicalInvestigation" class="mb-2 block text-sm font-medium">Technical Investigation</label>
        <Field name="technicalInvestigation" v-slot="{ field, errorMessage }">
          <textarea id="technicalInvestigation" v-bind="field" rows="4"
            class="w-full rounded border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': errorMessage }"></textarea>
          <span v-if="errorMessage" class="text-sm text-red-500">{{
            errorMessage
          }}</span>
        </Field>
      </div>

      <!-- Data Leak Site (DLS) -->
      <div class="mb-4">
        <label for="dataLeakSite" class="mb-2 block text-sm font-medium">Data Leak Site (DLS)</label>
        <Field name="dataLeakSite" v-slot="{ field, errorMessage }">
          <textarea id="dataLeakSite" v-bind="field" rows="4"
            class="w-full rounded border border-gray-600 bg-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': errorMessage }"></textarea>
          <span v-if="errorMessage" class="text-sm text-red-500">{{
            errorMessage
          }}</span>
        </Field>
      </div>

      <!-- Submit Button -->
      <button type="submit"
        class="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition duration-200 hover:bg-blue-700"
        :disabled="isSubmitting">
        {{ isSubmitting ? "Submitting..." : "Add Blog" }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, useForm } from "vee-validate";
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

// Initialize vee-validate form
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

// Form data
const form = ref({
  image: null,
  introduction: "",
  whatIsFog: "",
  technicalInvestigation: "",
  dataLeakSite: "",
});

// Image preview
const imagePreview = ref(null);

// Handle image upload
const handleImageUpload = (event, field) => {
  console.log("imagePreview", imagePreview.value);

  const file = event.target.files[0];
  if (file) {
    form.value.image = file;
    field.onChange(file); // Update vee-validate field
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// Form submission
const onSubmit = handleSubmit(async (values) => {
  try {
    // Simulate API call
    console.log("Form submitted:", values);
    alert("Blog added successfully!");
    form.value = {
      image: null,
      introduction: "",
      whatIsFog: "",
      technicalInvestigation: "",
      dataLeakSite: "",
    };
    imagePreview.value = null;
  } catch (error) {
    console.error("Submission error:", error);
    alert("Failed to add blog.");
  }
});
</script>

<style scoped>
textarea:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
