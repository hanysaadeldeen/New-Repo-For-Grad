<template>
  <div class="container mx-auto">
    <div class="flex items-start justify-start text-white">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="w-full rounded-lg p-6 shadow-lg">
        <nuxt-link class="flex items-center gap-2 text-lg text-paragraph hover:text-white" :to="$localePath(`/blogs`)">
          <i class="fa-solid fa-arrow-left"></i>
          <span> Back to Reports </span>
        </nuxt-link>
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
          <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="mx-auto mt-4 max-w-xs rounded shadow-lg" />
        </div>

        <!-- titlle -->
        <div class="mb-4">
          <label for="title" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            title
          </label>
          <Field id="title" name="title" rows="4" placeholder="Enter title"
            class=" w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.title }" />
          <span class="text-sm text-red-500">{{ errors.title }}</span>
        </div>
        <!-- Summary -->

        <div class="mb-4">
          <label for="introduction" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Summary
          </label>
          <Field id="introduction" name="introduction" as="textarea" rows="4" placeholder="Enter Summary"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.introduction }" />
          <span class="text-sm text-red-500">{{ errors.introduction }}</span>
        </div>

        <!-- What is Fog -->
        <div class="mb-4">
          <label for="whatIsFog" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            What is Impact
          </label>
          <Field id="whatIsFog" name="whatIsFog" as="textarea" rows="4" placeholder="Enter What is Impact"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.whatIsFog }" />
          <span class="text-sm text-red-500">{{ errors.whatIsFog }}</span>
        </div>

        <!-- Technical Investigation -->
        <div class="mb-4">
          <label for="technicalInvestigation"
            class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Steps to Reproduce
          </label>
          <Field id="technicalInvestigation" name="technicalInvestigation" as="textarea" rows="4"
            placeholder="Enter Steps to Reproduce"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.technicalInvestigation }" />
          <span class="text-sm text-red-500">{{
            errors.technicalInvestigation
          }}</span>
        </div>

        <!-- Data Leak Site (DLS) -->
        <div class="mb-4">
          <label for="dataLeakSite" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
            Suggested Fix
          </label>
          <Field id="dataLeakSite" name="dataLeakSite" as="textarea" rows="4" placeholder="Enter Suggested Fix"
            class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
            :class="{ 'border-red-500': errors.dataLeakSite }" />
          <span class="text-sm text-red-500">{{ errors.dataLeakSite }}</span>
        </div>

        <!-- Submit Button -->
        <button :disabled="isSubmitting" type="submit"
          class="group/edit mx-auto flex w-fit items-center justify-center gap-3 rounded-full bg-hookYellow px-10 py-3 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105"
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
import { useToast } from "vue-toast-notification";
const router = useRouter();


const toast = useToast({ position: "top-right", duration: 1500 });
// Form schema with Yup validation
const schema = object({
  image: mixed().required("Image is required"),
  title: string()
    .required("title is required")
    .min(10, "title must be at least 10 characters"),
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

const handleImageUpload = (event, field) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    field.onChange(file); // تحديث الـ form field
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const { addBlog } = blogsController()

const onSubmit = async (values) => {
  isSubmitting.value = true;
  try {
    console.log("Form submitted:", values);
    const response = await addBlog(values);
    console.log("blog Response", response)
    if (response) {
      toast.success("blogs added successfully");
      setTimeout(() => {
        router.push("/blogs");
      }, 100);
      return;
    }
  } catch (error) {
    console.error("❌ Error while adding blog:", error);
  } finally {
    isSubmitting.value = false;
  }
};

definePageMeta({
  middleware: 'admin',
})
</script>

<style scoped></style>
