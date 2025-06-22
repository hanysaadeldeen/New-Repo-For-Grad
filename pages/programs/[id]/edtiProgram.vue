<template>
  <div v-if="loading" class="flex h-full flex-col items-center justify-center gap-4">
    <img src="~/assets/img/Spin.svg" class="size-[150px]" width="150" height="150" alt="Spin" />
  </div>
  <Form v-else-if="!loading && programId" @submit="onSubmit" v-slot="{ errors, isSubmitting, values }"
    :validation-schema="schema" :initial-values="{
      title,
      companyName,
      image,
      collaborationType,
      targets,
      inScopeVulnerabilities,
      outOfScopeVulnerabilities,
      programRules,
      disclosureGuidelines,
      eligibility,
      responseEfficiency,
      rewards,
    }" class="w-full rounded-lg p-6 shadow-lg" as="form">
    <h1
      class="mb-8 bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text text-center text-2xl font-bold tracking-wider text-transparent md:text-4xl">
      Edit Bug Bounty Program <br />
      ({{ programId?.title }})
    </h1>

    <!-- program title -->
    <div class="mb-4">
      <label for="title" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">program
        title</label>
      <Field name="title" as="input" id="title" type="text" v-model="title" placeholder="enter program title"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.title }" />
      <span class="text-sm text-red-500">{{ errors.title }}</span>
    </div>
    <!-- company name -->
    <div class="mb-4">
      <label for="companyName" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">company
        Name</label>
      <Field name="companyName" as="input" type="text" id="companyName" v-model="companyName"
        placeholder="Enter company Name"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.companyName }" />
      <span class="text-sm text-red-500">{{ errors.companyName }}</span>
    </div>
    <!-- company logo -->
    <div class="mb-4">
      <label for="image" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">Company
        Image</label>
      <Field name="image" as="input" id="image" type="text" v-model="image" placeholder="enter Company Image"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.image }" />
      <span class="text-sm text-red-500">{{ errors.image }}</span>
      <!-- <Field name="image" v-slot="{ field, errorMessage }">
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageUpload($event, field)"
            class="block w-full text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-gray-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-600"
          />
          <span v-if="errorMessage" class="text-sm text-red-500">{{
            errorMessage
          }}</span>
        </Field>
  
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Preview"
          class="mt-4 h-48 w-full rounded object-cover"
        /> -->
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
            <Field :name="`targets[${index}].url`" as="input" type="text" v-model="targets[index].url"
              placeholder="Enter target (e.g., https://www.cube.exchange)"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              :class="{ 'border-red-500': errors[`targets[${index}].url`] }" />
            <span class="text-sm text-red-500">{{
              errors[`targets[${index}].url`]
            }}</span>
          </div>
          <!-- Type -->
          <div>
            <Field :name="`targets[${index}].type`" as="input" type="text" v-model="targets[index].type"
              placeholder="Enter type (e.g., Web)"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
              :class="{ 'border-red-500': errors[`targets[${index}].type`] }" />
            <span class="text-sm text-red-500">{{
              errors[`targets[${index}].type`]
            }}</span>
          </div>
          <!-- Severity -->
          <div>
            <Field :name="`targets[${index}].severity`" as="input" type="text" v-model="targets[index].severity"
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
            <Field :name="`targets[${index}].reward`" as="input" type="text" v-model="targets[index].reward"
              placeholder="Enter reward (e.g., Bounty)"
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
      <Field name="collaborationType" id="collaborationType" as="input" type="text" v-model="collaborationType"
        placeholder="Enter type (e.g., Retesting)"
        class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.collaborationType }" />
      <span class="text-sm text-red-500">{{ errors.collaborationType }}</span>
    </div>
    <!-- goldStandard -->
    <div class="mb-4">
      <label for="goldStandard"
        class="mr-2 inline-block cursor-pointer text-2xl font-bold text-red-500">goldStandard</label>
      <input type="checkbox" id="goldStandard" v-model="goldStandard" class="h-4 w-4 p-3" />
    </div>

    <!-- In Scope Vulnerabilities -->
    <div class="mb-4">
      <label for="inScopeVulnerabilities" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        In Scope Vulnerabilities
      </label>
      <Field id="inScopeVulnerabilities" name="inScopeVulnerabilities" as="textarea" v-model="inScopeVulnerabilities"
        rows="4" placeholder="List vulnerabilities in scope"
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
      <Field id="outOfScopeVulnerabilities" name="outOfScopeVulnerabilities" as="textarea"
        v-model="outOfScopeVulnerabilities" rows="4" placeholder="List vulnerabilities out of scope"
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
      <Field id="programRules" name="programRules" as="textarea" v-model="programRules" rows="4"
        placeholder="Enter program rules"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.programRules }" />
      <span class="text-sm text-red-500">{{ errors.programRules }}</span>
    </div>

    <!-- Disclosure Guidelines -->
    <div class="mb-4">
      <label for="disclosureGuidelines" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Disclosure Guidelines
      </label>
      <Field id="disclosureGuidelines" name="disclosureGuidelines" as="textarea" v-model="disclosureGuidelines" rows="4"
        placeholder="Enter disclosure guidelines"
        class="min-h-[100px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
        :class="{ 'border-red-500': errors.disclosureGuidelines }" />
      <span class="text-sm text-red-500">{{
        errors.disclosureGuidelines
      }}</span>
    </div>

    <!-- Eligibility -->
    <div class="mb-4">
      <label for="eligibility" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Eligibility and Coordinated Disclosure
      </label>
      <Field id="eligibility" name="eligibility" as="textarea" v-model="eligibility" rows="4"
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
          <Field name="rewards.critical" as="input" type="text" v-model="rewards.critical"
            placeholder="Enter critical (e.g., $10,000)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.critical'] }" />
          <span class="text-sm text-red-500">{{
            errors["rewards.critical"]
          }}</span>
        </div>
        <!-- High -->
        <div>
          <Field name="rewards.high" as="input" type="text" v-model="rewards.high"
            placeholder="Enter high (e.g., $5,000)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.high'] }" />
          <span class="text-sm text-red-500">{{ errors["rewards.high"] }}</span>
        </div>
        <!-- Medium -->
        <div>
          <Field name="rewards.medium" as="input" type="text" v-model="rewards.medium"
            placeholder="Enter medium (e.g., $2,000)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.medium'] }" />
          <span class="text-sm text-red-500">{{
            errors["rewards.medium"]
          }}</span>
        </div>
        <!-- Low -->
        <div>
          <Field name="rewards.low" as="input" type="text" v-model="rewards.low" placeholder="Enter low (e.g., $200)"
            class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white"
            :class="{ 'border-red-500': errors['rewards.low'] }" />
          <span class="text-sm text-red-500">{{ errors["rewards.low"] }}</span>
        </div>
      </div>
    </div>

    <!-- Response Efficiency -->
    <div class="mb-4">
      <label for="responseEfficiency" class="mb-2 inline-block cursor-pointer text-xl font-semibold text-gray-300">
        Response Efficiency ( {{ responseEfficiency }} %)
      </label>
      <Field name="responseEfficiency" as="input" type="range" v-model="responseEfficiency" min="0" max="100" step="1"
        id="responseEfficiency" class="w-full" />
      <div class="mt-2 flex justify-between text-sm text-gray-400">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>

    <!-- Submit Button -->
    <button :disabled="submitLoading" type="submit"
      class="w-full rounded-xl bg-gradient-to-l from-primary to-secondary px-16 py-2 text-2xl font-medium capitalize tracking-wider text-white md:w-fit"
      :class="{ 'cursor-not-allowed opacity-50': submitLoading }">
      {{ submitLoading ? "Submitting..." : "Edit Program" }}
    </button>
  </Form>
</template>
<script setup lang="ts">
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { ref, onMounted } from "vue";
import { programsController } from "~/composables/programs";
import { useToast } from "vue-toast-notification";

// Types
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

interface ProgramDetails {
  id: number;
  title: string;
  companyName: string;
  image: string;
  collaborationType: string;
  goldStandard: boolean;
  targets: Target[];
  inScopeVulnerabilities: string;
  outOfScopeVulnerabilities: string;
  programRules: string;
  disclosureGuidelines: string;
  eligibility: string;
  rewards: Rewards;
  responseEfficiency: number;
}

// Composables and utilities
const { fetchProgramById, updateProgram, programId, loading, error } =
  await programsController();
const toast = useToast({ position: "top-right", duration: 1500 });
const route = useRoute();
const router = useRouter();

// Form state
const title = ref("");
const companyName = ref("");
const image = ref("");
const collaborationType = ref("");
const goldStandard = ref(false);
const targets = ref<Target[]>([
  { url: "", type: "", severity: "", reward: "" },
]);
const inScopeVulnerabilities = ref("");
const outOfScopeVulnerabilities = ref("");
const programRules = ref("");
const disclosureGuidelines = ref("");
const eligibility = ref("");
const responseEfficiency = ref(50);
const rewards = ref<Rewards>({
  critical: "",
  high: "",
  medium: "",
  low: "",
});
const submitLoading = ref(false);

// Form validation schema
const schema = Yup.object({
  collaborationType: Yup.string()
    .required("Collaboration Type is required")
    .min(5, "Collaboration Type must be at least 5 characters"),
  title: Yup.string()
    .required("Program title is required")
    .min(5, "Program title must be at least 5 characters"),
  companyName: Yup.string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters"),
  image: Yup.string().required("Company image is required"),
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
      .matches(
        /^\$?\d+(\.\d{1,2})?$/,
        "Must be a valid amount (e.g., $10,000.00)",
      ),
    high: Yup.string()
      .required("High reward is required")
      .matches(
        /^\$?\d+(\.\d{1,2})?$/,
        "Must be a valid amount (e.g., $5,000.00)",
      ),
    medium: Yup.string()
      .required("Medium reward is required")
      .matches(
        /^\$?\d+(\.\d{1,2})?$/,
        "Must be a valid amount (e.g., $2,000.00)",
      ),
    low: Yup.string()
      .required("Low reward is required")
      .matches(
        /^\$?\d+(\.\d{1,2})?$/,
        "Must be a valid amount (e.g., $200.00)",
      ),
  }),
  responseEfficiency: Yup.number()
    .default(50)
    .min(0, "Response Efficiency must be at least 0")
    .max(100, "Response Efficiency must be at most 100"),
});

// Methods
const addTarget = () => {
  targets.value.push({ url: "", type: "", severity: "", reward: "" });
};

const removeTarget = (index: number) => {
  if (targets.value.length > 1) {
    targets.value.splice(index, 1);
  }
};

// Fetch program data on mount
onMounted(async () => {
  try {
    await fetchProgramById(route.params.id.toString());
    if (programId.value) {
      console.log(programId.value);

      // Populate form fields with program data
      title.value = programId.value.title;
      companyName.value = programId.value.companyName;
      image.value = programId.value.image;
      collaborationType.value = programId.value.collaborationType;
      targets.value = programId.value.targets;
      goldStandard.value = programId.value.goldStandard;
      inScopeVulnerabilities.value = programId.value.inScopeVulnerabilities;
      outOfScopeVulnerabilities.value =
        programId.value.outOfScopeVulnerabilities;
      programRules.value = programId.value.programRules;
      disclosureGuidelines.value = programId.value.disclosureGuidelines;
      eligibility.value = programId.value.eligibility;
      responseEfficiency.value = programId.value.responseEfficiency || 50;
      rewards.value = programId.value.rewards;
    }
  } catch (error) {
    toast.error("Failed to load program data");
  }
});

// Form submission
const onSubmit = async (values: any) => {
  submitLoading.value = true;
  try {
    const data = {
      ...values,
      goldStandard: goldStandard.value,
      vulnerabilitiesCount: 0,
      hackersPaid: 0,
      programStatus: "Active",
      focusArea: "Web Security",
      responseEfficiency: Number(values.responseEfficiency) || 50,
    };

    const response = await updateProgram(data, route.params.id.toString());
    if (response.data) {
      toast.success("Program updated successfully");
      setTimeout(() => {
        router.push("/programs");
      }, 1500);
    } else {
      toast.error(response.error?.title || "Failed to update program");
    }
  } catch (error: any) {
    toast.error(
      error?.message || "An error occurred while updating the program",
    );
  } finally {
    submitLoading.value = false;
  }
};


definePageMeta({
  middleware: 'admin',
})
</script>
