<template>
  <!-- :validation-schema="schema" -->
  <Form @submit="onSubmit" v-slot="{ errors, isSubmitting, values }" class="w-full rounded-lg p-6 shadow-lg" as="form">
    <h1
      class="mb-8 bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-2xl font-bold tracking-wider text-transparent md:text-4xl">
      Add Bug Bounty Program
    </h1>

    <!-- program title -->
    <div class="mb-4">
      <label for="title" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">program
        title</label>
      <Field name="title" as="input" id="title" type="text" placeholder="enter program title"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.title }" />
      <span class="text-sm text-red-500">{{ errors.title }}</span>
    </div>
    <!-- company name -->
    <div class="mb-4">
      <label for="companyName" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">company
        Name</label>
      <Field name="companyName" as="input" type="text" id="companyName" placeholder="Enter company Name"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.companyName }" />
      <span class="text-sm text-red-500">{{ errors.companyName }}</span>
    </div>
    <!-- company logo -->
    <div class="mb-4">
      <label for="image" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">Company
        Image</label>
      <!-- <Field name="image" as="input" id="image" type="text" placeholder="enter Company Image"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.title }" />
      <span class="text-sm text-red-500">{{ errors.image }}</span> -->
      <Field name="image" v-slot="{ field, errorMessage }">
        <input id="image" type="file" accept="image/*" @change="handleImageUpload($event, field)"
          class="block w-full text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-gray-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-600" />
        <span v-if="errorMessage" class="text-sm text-red-500">{{
          errorMessage
        }}</span>
      </Field>

      <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="mt-4 h-48 w-full rounded object-cover" />
    </div>
    <!-- Targets -->
    <div class="mb-4">
      <label class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        In Scope Targets
      </label>
      <div v-for="(target, index) in targets" :key="index" class="mb-4 border-b border-gray-600 pb-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
          <!-- Target URL -->
          <div>
            <Field :name="`targets[${index}].url`" as="input" type="text"
              placeholder="Enter target (e.g., https://www.cube.exchange)"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              :class="{ 'border-red-500': errors[`targets[${index}].url`] }" />
            <span class="text-sm text-red-500">{{
              errors[`targets[${index}].url`]
            }}</span>
          </div>
          <!-- Type -->
          <div>
            <Field :name="`targets[${index}].type`" as="input" type="text" placeholder="Enter type (e.g., Web)"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              :class="{ 'border-red-500': errors[`targets[${index}].type`] }" />
            <span class="text-sm text-red-500">{{
              errors[`targets[${index}].type`]
            }}</span>
          </div>
          <!-- Severity -->
          <div>
            <Field :name="`targets[${index}].severity`" as="input" type="text"
              placeholder="Enter severity (e.g., Critical)"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white" :class="{
                'border-red-500': errors[`targets[${index}].severity`],
              }" />
            <span class="text-sm text-red-500">{{
              errors[`targets[${index}].severity`]
            }}</span>
          </div>
          <!-- Reward -->
          <div>
            <Field :name="`targets[${index}].reward`" as="input" type="text" placeholder="Enter reward (e.g., Bounty)"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              :class="{ 'border-red-500': errors[`targets[${index}].reward`] }" />
            <span class="text-sm text-red-500">{{
              errors[`targets[${index}].reward`]
            }}</span>
          </div>
        </div>
        <button type="button" @click="removeTarget(index)"
          class="mt-4 cursor-pointer rounded-lg bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-800"
          v-if="targets.length > 1">
          Remove Target
        </button>
      </div>
      <button type="button" @click="addTarget"
        class="mb-4 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
        Add Target
      </button>
    </div>
    <!-- collaboration Type -->
    <div class="mb-4">
      <label for="collaborationType"
        class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">collaboration Type</label>
      <Field name="collaborationType" id="collaborationType" as="input" type="text"
        placeholder="Enter type (e.g., Retesting)"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.collaborationType }" />
      <span class="text-sm text-red-500">{{ errors.collaborationType }}</span>
    </div>
    <!-- goldStandard -->
    <div class="mb-4">
      <label for="goldStandard"
        class="mr-2 inline-block cursor-pointer text-2xl font-bold text-red-500">goldStandard</label>
      <input type="checkbox" id="goldStandard" class="h-4 w-4 p-3" v-model="goldStandard" />
    </div>

    <!-- In Scope Vulnerabilities -->
    <div class="mb-4">
      <label for="focusArea" class="mb-2 block cursor-pointer text-xl font-semibold text-gray-300">
        Focus Area
      </label>
      <label for="inScopeVulnerabilities" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        In Scope Vulnerabilities
      </label>
      <Field id="inScopeVulnerabilities" name="inScopeVulnerabilities" as="textarea" rows="4"
        placeholder="List vulnerabilities in scope"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.inScopeVulnerabilities }" />
      <span class="text-sm text-red-500">{{
        errors.inScopeVulnerabilities
      }}</span>
    </div>

    <!-- Out of Scope Vulnerabilities -->
    <div class="mb-4">
      <label for="outOfScopeVulnerabilities"
        class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Out of Scope Vulnerabilities
      </label>
      <Field id="outOfScopeVulnerabilities" name="outOfScopeVulnerabilities" as="textarea" rows="4"
        placeholder="List vulnerabilities out of scope"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.outOfScopeVulnerabilities }" />
      <span class="text-sm text-red-500">{{
        errors.outOfScopeVulnerabilities
      }}</span>
    </div>

    <!-- Program Rules -->
    <div class="mb-4">
      <label for="programRules" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Program Rules
      </label>
      <Field id="programRules" name="programRules" as="textarea" rows="4" placeholder="Enter program rules"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.programRules }" />
      <span class="text-sm text-red-500">{{ errors.programRules }}</span>
    </div>

    <!-- Disclosure Guidelines -->
    <div class="mb-4">
      <label for="disclosureGuidelines" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Disclosure Guidelines
      </label>
      <Field id="disclosureGuidelines" name="disclosureGuidelines" as="textarea" rows="4"
        placeholder="Enter disclosure guidelines"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.disclosureGuidelines }" />
      <span class="text-sm text-red-500">{{
        errors.disclosureGuidelines
      }}</span>
    </div>

    <!-- Eligibility and Coordinated Disclosure -->
    <div class="mb-4">
      <label for="eligibility" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Eligibility and Coordinated Disclosure
      </label>
      <Field id="eligibility" name="eligibility" as="textarea" rows="4"
        placeholder="Enter eligibility and disclosure details"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.eligibility }" />
      <span class="text-sm text-red-500">{{ errors.eligibility }}</span>
    </div>

    <!-- Rewards -->
    <div class="mb-4">
      <label class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Rewards
      </label>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- Critical -->
        <div>
          <Field name="rewards.critical" as="input" type="text" placeholder="Enter critical (e.g., $10,000)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.critical'] }" />
          <span class="text-sm text-red-500">{{
            errors["rewards.critical"]
          }}</span>
        </div>
        <!-- High -->
        <div>
          <Field name="rewards.high" as="input" type="text" placeholder="Enter high (e.g., $5,000)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.high'] }" />
          <span class="text-sm text-red-500">{{ errors["rewards.high"] }}</span>
        </div>
        <!-- Medium -->
        <div>
          <Field name="rewards.medium" as="input" type="text" placeholder="Enter medium (e.g., $2,000)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.medium'] }" />
          <span class="text-sm text-red-500">{{
            errors["rewards.medium"]
          }}</span>
        </div>
        <!-- Low -->
        <div>
          <Field name="rewards.low" as="input" type="text" placeholder="Enter low (e.g., $200)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.low'] }" />
          <span class="text-sm text-red-500">{{ errors["rewards.low"] }}</span>
        </div>
      </div>
    </div>

    <!-- Response Efficiency -->
    <div class="mb-4">
      <label for="responseEfficiency" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Response Efficiency ( {{ values?.responseEfficiency || 50 }} %)
      </label>
      <Field name="responseEfficiency" as="input" type="range" min="0" max="100" step="1" id="responseEfficiency"
        class="w-full" :class="{ 'border-red-500': errors.responseEfficiency }" />
      <div class="mt-2 flex justify-between text-sm text-gray-400">
        <span>0%</span>
        <span>100%</span>
      </div>
      <span class="text-sm text-red-500">{{ errors.responseEfficiency }}</span>
    </div>

    <!-- Submit Button -->
    <button :disabled="submitLoading" type="submit"
      class="w-full rounded-xl bg-gradient-to-l from-primary to-secondary px-16 py-2 text-2xl font-medium capitalize tracking-wider text-white md:w-fit"
      :class="{ 'cursor-not-allowed opacity-50': submitLoading }">
      {{ submitLoading ? "Submitting..." : "Add Program" }}
    </button>
  </Form>
</template>
<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { ref } from "vue";
import { programsController } from "~/composables/programs";
const { addProgram } = await programsController();
const toast = useToast({ position: "top-right", duration: 1500 });

// Define interfaces for TypeScript
interface Target {
  url: string;
  type: string;
  severity: string;
  reward: string;
}

interface Rewards {
  critical: string;
  high: string;
  medium: string;
  low: string;
}

interface FormValues {
  targets: Target[];
  focusArea: string;
  inScopeVulnerabilities: string;
  outOfScopeVulnerabilities: string;
  programRules: string;
  disclosureGuidelines: string;
  eligibility: string;
  rewards: Rewards;
}

// Reactive state for targets
const targets = ref<Target[]>([
  { url: "", type: "", severity: "", reward: "" },
]);

const router = useRouter();
// Define Yup schema
const schema = Yup.object({
  // image: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileType", "Unsupported file format", (value) =>
  //     value
  //       ? ["image/jpeg", "image/png", "image/JPG", "image/webp"].includes(
  //           value.type,
  //         )
  //       : true,
  //   )
  //   .test(
  //     "fileSize",
  //     "File is too large",
  //     (value) => (value ? value.size <= 5 * 1024 * 1024 : true), // 5MB
  //   ),

  collaborationType: Yup.string()
    .required("collaboration Type are required")
    .min(10, "collaboration Type must be at least 10 characters"),
  title: Yup.string()
    .required("program title are required")
    .min(5, "program title must be at least 10 characters"),
  companyName: Yup.string()
    .required("company Name are required")
    .min(2, "company Name must be at least 2 characters"),
  image: Yup.string().required("company image are required"),

  targets: Yup.array()
    .of(
      Yup.object({
        url: Yup.string()
          .required("Target URL is required")
          .min(5, "Target URL must be at least 5 characters"),
        type: Yup.string()
          .required("Type is required")
          .min(2, "Type must be at least 2 characters"),
        severity: Yup.string()
          .required("Severity is required")
          .min(2, "Severity must be at least 2 characters"),
        reward: Yup.string()
          .required("Reward is required")
          .min(2, "Reward must be at least 2 characters"),
      }),
    )
    .min(1, "At least one target is required"),

  inScopeVulnerabilities: Yup.string()
    .required("In Scope Vulnerabilities are required")
    .min(10, "In Scope Vulnerabilities must be at least 10 characters"),

  outOfScopeVulnerabilities: Yup.string()
    .required("Out of Scope Vulnerabilities are required")
    .min(10, "Out of Scope Vulnerabilities must be at least 10 characters"),
  programRules: Yup.string()
    .required("Program Rules are required")
    .min(10, "Program Rules must be at least 10 characters"),
  disclosureGuidelines: Yup.string()
    .required("Disclosure Guidelines are required")
    .min(10, "Disclosure Guidelines must be at least 10 characters"),
  eligibility: Yup.string()
    .required("Eligibility and Coordinated Disclosure are required")
    .min(
      10,
      "Eligibility and Coordinated Disclosure must be at least 10 characters",
    ),
  rewards: Yup.object({
    critical: Yup.string()
      .required("Critical reward is required")
      .matches(/^\$?\d+$/, "Must be a valid amount (e.g., $10,000)"),
    high: Yup.string()
      .required("High reward is required")
      .matches(/^\$?\d+$/, "Must be a valid amount (e.g., $5,000)"),
    medium: Yup.string()
      .required("Medium reward is required")
      .matches(/^\$?\d+$/, "Must be a valid amount (e.g., $2,000)"),
    low: Yup.string()
      .required("Low reward is required")
      .matches(/^\$?\d+$/, "Must be a valid amount (e.g., $200)"),
  }),
  responseEfficiency: Yup.number()
    .required("Response Efficiency is required")
    .min(0, "Response Efficiency must be at least 0")
    .max(100, "Response Efficiency must be at most 100"),
});
const goldStandard = ref<boolean>(false);

const image = ref(null);
const imagePreview = ref<any>(null);

const handleImageUpload = (event: any, field: any) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    field.onChange(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result || null;
    };
    reader.readAsDataURL(file);
  }
};
// Methods
const addTarget = () => {
  targets.value.push({ url: "", type: "", severity: "", reward: "" });
};

const removeTarget = (index: number) => {
  targets.value.splice(index, 1);
};
import { useToast } from "vue-toast-notification";

const submitLoading = ref<boolean>(false);
const onSubmit = async (values: any) => {
  submitLoading.value = true;
  const data = {
    ...values,
    goldStandard: goldStandard.value,
    vulnerabilitiesCount: 0,
    hackersPaid: 0,
    programStatus: "Active",
    focusArea: "Web Security",
    responseEfficiency: Number(values.responseEfficiency) || 50,
  };
  // console.log(data);

  const response = await addProgram(data);
  if (response) {
    if (response.data) {
      toast.success("Program added successfully");
      setTimeout(() => {
        router.push("/programs");
      }, 1500);
    } else {
      toast.error("something went wrong");
    }
  }
  submitLoading.value = false;
};



definePageMeta({
  middleware: 'auth',
})
</script>
