<template>
  <div class="overflow-hidden text-white transition-colors duration-200">
    <!-- Main form column -->
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, submitCount }">
      <div class="flex flex-col gap-8 px-2 md:flex-row">
        <div class="report-section1 flex-1">
          <h1 class="mb-6 text-3xl font-bold">Submit Report</h1>
          <!-- General info section -->
          <div class="mb-8">
            <h2 class="mb-4 border-b border-gray-700 pb-2 text-lg font-medium">
              General Info
            </h2>

            <div class="mb-4">
              <label class="mb-1 block cursor-pointer text-base font-medium" for="title">Vulnerability Title</label>
              <Field id="title" name="VulnerabilityTitle" type="text"
                placeholder="Short description of the vulnerability and the affected asset"
                class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
                :class="{ 'border-red-500': errors.VulnerabilityTitle }" v-model="title" />
              <span class="text-sm text-red-500">{{
                errors.VulnerabilityTitle
              }}</span>
            </div>
          </div>

          <!-- Target section -->
          <div class="mb-8">
            <h2 class="mb-4 text-lg font-medium">Target</h2>
            <label for="target" class="mb-2 inline-block cursor-pointer text-base">Specify the vulnerability
              target.</label>

            <Field id="target" name="VulnerabilityTarget" v-model="selectedTarget" as="select"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
              :class="{ 'border-red-500': errors.VulnerabilityTarget }">
              <option value="" disabled>Select the vulnerability target</option>
              <option v-for="target in vulnerabilityTargets" :key="target" :value="target">
                {{ target }}
              </option>
            </Field>
            <span class="text-sm text-red-500">{{
              errors.VulnerabilityTarget
            }}</span>
          </div>

          <!-- Vulnerability category -->
          <div class="mb-8">
            <label for="category" class="mb-2 inline-block cursor-pointer text-base">Vulnerability category</label>

            <Field name="VulnerabilityCategory" as="select" id="category" v-model="selectedCategory"
              class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2">
              <option value="" disabled>
                Select the type of vulnerability you have discovered
              </option>
              <option v-for="category in vulnerabilityCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </Field>
            <span class="text-sm text-red-500">{{
              errors.VulnerabilityCategory
            }}</span>
          </div>

          <!-- Severity level section -->
          <div class="mb-8">
            <h2 class="mb-4 text-lg font-medium">Severity level</h2>

            <div class="rounded-md bg-gray-800 p-6">
              <p class="mb-2 text-base">
                We use the
                <a href="#" class="text-blue-500 hover:underline">Common Vulnerability Scoring System</a>
                to assess the severity of your vulnerability.
              </p>
              <p class="mb-4 text-base">
                Please estimate the severity of this vulnerability by selecting
                a category or using a calculator.
              </p>

              <!-- Severity buttons -->
              <Field name="SeverityLevel" as="input" type="hidden" v-model="selectedSeverity" />

              <!-- Severity Buttons -->
              <div class="mb- border-b border-gray-600 pb-4">
                <div class="6 flex flex-wrap gap-2">
                  <button v-for="severity in severityLevels" :key="severity.value" :class="[
                    'flex items-center gap-2 rounded-md border-4 px-4 py-2',
                    selectedSeverity === severity.value
                      ? `${severity.color} scale-110 border-hookYellow`
                      : `${severity.color} border-transparent`,
                  ]" type="button" @click="selectedSeverity = severity.value">
                    <span v-if="severity.value !== 'none'" :class="`h-2 w-2 rounded-full ${severity.dotColor}`"></span>
                    <span>{{ severity.label }}</span>
                  </button>
                </div>
                <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.SeverityLevel">
                  {{ errors.SeverityLevel }}
                </p>
              </div>

              <!-- CVSS Metrics grid -->
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field name="AttackVector" as="input" type="hidden" v-model="AttackVector" />
                <Field name="Scope" as="input" type="hidden" v-model="scope" />
                <Field name="AttackComplexity" as="input" type="hidden" v-model="attackComplexity" />
                <Field name="Confidentiality" as="input" type="hidden" v-model="confidentiality" />
                <Field name="PrivilegesRequired" as="input" type="hidden" v-model="privilegesRequired" />
                <Field name="Integrity" as="input" type="hidden" v-model="integrity" />
                <Field name="UserInteraction" as="input" type="hidden" v-model="userInteraction" />
                <Field name="Availability" as="input" type="hidden" v-model="availability" />

                <!-- Attack Vector -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Attack Vector</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in attackVectorOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      AttackVector === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="AttackVector = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.AttackVector">
                    {{ errors.AttackVector }}
                  </p>
                </div>

                <!-- Scope -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Scope</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in scopeOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      scope === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="scope = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.Scope">
                    {{ errors.Scope }}
                  </p>
                </div>

                <!-- Attack Complexity -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Attack Complexity</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in complexityOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      attackComplexity === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="attackComplexity = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.AttackComplexity">
                    {{ errors.AttackComplexity }}
                  </p>
                </div>

                <!-- Confidentiality -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Confidentiality</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in impactOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      confidentiality === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="confidentiality = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.Confidentiality">
                    {{ errors.Confidentiality }}
                  </p>
                </div>

                <!-- Privileges Required -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Privileges Required</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in impactOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      privilegesRequired === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="privilegesRequired = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.PrivilegesRequired">
                    {{ errors.PrivilegesRequired }}
                  </p>
                </div>

                <!-- Integrity -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Integrity</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in impactOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      integrity === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="integrity = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.Integrity">
                    {{ errors.Integrity }}
                  </p>
                </div>

                <!-- User Interaction -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">User Interaction</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in userInteractionOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      userInteraction === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="userInteraction = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.UserInteraction">
                    {{ errors.UserInteraction }}
                  </p>
                </div>

                <!-- Availability -->
                <div>
                  <div class="mb-2 flex items-center">
                    <span class="text-base font-medium">Availability</span>
                    <button class="ml-1 text-gray-400 hover:text-gray-300">
                      <span class="h-4 w-4">ℹ️</span>
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="option in impactOptions" :key="option" :class="[
                      'rounded-md border px-3 py-1 text-base',
                      availability === option
                        ? 'border-gray-400 bg-gray-200 text-gray-900'
                        : 'border-gray-600 bg-gray-700',
                    ]" @click="availability = option">
                      {{ option }}
                    </button>
                  </div>
                  <p class="mt-3 text-sm text-red-500" v-if="submitCount > 0 && errors.Availability">
                    {{ errors.Availability }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Vulnerability details -->
          <div class="mb-8">
            <h2 class="mb-4 border-b border-gray-700 pb-2 text-lg font-medium">
              Vulnerability details
            </h2>

            <div class="mb-4">
              <label class="mb-1 block text-base font-medium">Description of the vulnerability</label>
              <Field as="textarea" name="VulnerabilityDetails"
                class="min-h-[200px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
                v-model="vulnerabilityDescription" />
              <span class="text-sm text-red-500">{{
                errors.VulnerabilityDetails
              }}</span>
            </div>
          </div>

          <!-- Validation steps -->
          <div class="mb-8">
            <h2 class="mb-4 border-b border-gray-700 pb-2 text-lg font-medium">
              Validation steps
            </h2>

            <p class="mb-4 text-base">
              A clear, logical explanation helps us validate your vulnerability
              quickly and to notify you of the result. Depending on category,
              each step supports a URL or IPPort and we encourage you to upload
              screenshots or other media to support your submission.
            </p>

            <Field as="textarea" name="ValidationSteps"
              class="min-h-[200px] w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2"
              v-model="validationSteps" />
            <span class="text-sm text-red-500">{{
              errors.ValidationSteps
            }}</span>
          </div>

          <div class="w-full max-w-4xl space-y-4">
            <h2 class="text-xl font-semibold">File Upload</h2>

            <div class="border-t border-gray-700 pt-2">
              <p class="text-sm text-gray-300">
                You Can Attach Multiple Files (Up To 5 Files, Up To 50MB Per
                File).
                <span class="font-semibold">Allowed File Extensions:</span>
                Bmp, Gif, Jpeg, Jpg, Pdf, Png, Mp4, Mov, Csv, Txt, Zip, Json,
                Xml, Md, Ts.
              </p>
            </div>

            <div
              class="flex min-h-[200px] flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 p-6 text-center">
              <i @click="triggerFileUpload" class="fa-solid fa-file cursor-pointer text-3xl text-gray-200"></i>
              <label for="file-upload" class="cursor-pointer text-sm text-gray-300 hover:underline">
                Drag & Drop Or Select More Files From Your Computer (Max. 50MB
                Per File)
              </label>
              <Field id="file-upload" name="Attachment" type="file" multiple
                class="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white hover:file:bg-secondary"
                accept=".bmp,.gif,.jpeg,.jpg,.pdf,.png,.mp4,.mov,.csv,.txt,.zip,.json,.xml,.md,.ts" v-model="files" />
              <span class="text-sm text-red-500">{{ errors.Attachment }}</span>
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="report-section2 w-full md:w-80">
          <div class="rounded-lg border border-gray-700 bg-gray-800 p-4">
            <div class="pb-0">
              <div class="mb-3 flex items-center">
                <div class="mr-2 font-bold text-purple-400">AscendEX</div>
              </div>
              <div class="text-lg font-semibold">
                Report without title (Draft)
              </div>
            </div>
            <div class="pt-4">
              <div class="space-y-3">
                <div class="flex justify-between text-base">
                  <span class="text-gray-400">Report ID:</span>
                  <span>ASCENVM-46</span>
                </div>
                <div class="flex justify-between text-base">
                  <span class="text-gray-400">Status:</span>
                  <span>Created</span>
                </div>
                <div class="flex justify-between text-base">
                  <span class="text-gray-400">State:</span>
                  <span class="flex items-center">
                    New
                    <span class="ml-1 h-4 w-4 text-gray-400">ℹ️</span>
                  </span>
                </div>
                <div class="flex justify-between text-base">
                  <span class="text-gray-400">Severity:</span>
                  <span></span>
                </div>
                <div class="flex justify-between text-base">
                  <span class="text-gray-400">Range of bounty:</span>
                  <span>${{ route.query.low }} - ${{ route.query.critical }}</span>
                </div>

                <div class="pt-4">
                  <div class="flex items-start gap-2">
                    <input type="checkbox" id="terms" class="mt-1" v-model="termsAccepted" />
                    <label for="terms" class="text-base">
                      By pressing the 'Submit Report' or 'Publish' I indicate
                      that I have read the Program Info, agree to the
                      <a href="#" class="ml-1 text-blue-500 hover:underline">Terms & Conditions</a>,
                      <a href="#" class="ml-1 text-blue-500 hover:underline">Code of Conduct</a>
                      and acknowledge that I have read the
                      <a href="#" class="ml-1 text-blue-500 hover:underline">Privacy Policy</a>.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <button :disabled="loading"
                class="group/edit flex w-full items-center justify-center gap-3 rounded-md bg-hookYellow py-2 text-center text-xl font-medium tracking-wider text-black transition-all duration-300 ease-in-out hover:scale-105"
                type="submit" :class="{ 'cursor-not-allowed opacity-50': loading }">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { report } from "~/composables/report";

import { gsap } from "gsap";
import { Form, Field } from "vee-validate";
import { useToast } from "vue-toast-notification";
import * as yup from "yup";

const route = useRoute();

const fileInput = ref(null);
const toast = useToast({ position: "top-right", duration: 1500 });
const schema = yup.object({
  VulnerabilityTitle: yup
    .string()
    .min(3, "title must be at least 6 characters")
    .required("title is required"),
  VulnerabilityTarget: yup
    .string()
    .required("Please select a vulnerability target")
    .notOneOf([""], "Please select a valid target"),
  VulnerabilityCategory: yup
    .string()
    .required("Please select a Vulnerability category")
    .notOneOf([""], "Please select a valid category"),
  VulnerabilityDetails: yup
    .string()
    .min(50, "Description must be at least 50 characters")
    .required("Description is required"),
  ValidationSteps: yup
    .string()
    .min(50, "Validation must be at least 50 characters")
    .required("Description is required"),
  // Attachment: yup.mixed().required("At least one file is required"),
  SeverityLevel: yup.string().required("Please select a severity level"),
  AttackVector: yup.string().required("Please select a Attack Vector"),
  AttackComplexity: yup.string().required("Please select a Attack Complexity"),
  PrivilegesRequired: yup
    .string()
    .required("Please select a Privileges Required"),
  UserInteraction: yup.string().required("Please select a User Interaction"),
  Scope: yup.string().required("Please select a Scope"),
  Confidentiality: yup.string().required("Please select a Confidentiality"),
  Integrity: yup.string().required("Please select a Integrity"),
  Availability: yup.string().required("Please select a Availability"),
});
const triggerFileUpload = () => {
  fileInput.value?.click();
};
onMounted(() => {
  gsap.from(".report-section1", {
    opacity: 0,
    duration: 1,
    x: -200,
    ease: "power3.out",
  });
  gsap.from(".report-section2", {
    opacity: 0,
    duration: 1,
    x: 200,
    ease: "power3.out",
  });
});
// Form data
const title = ref("");
const selectedTarget = ref("");
const selectedCategory = ref("");
const selectedSeverity = ref(null);
const AttackVector = ref(null);
const scope = ref(null);
const attackComplexity = ref(null);
const confidentiality = ref(null);
const privilegesRequired = ref(null);
const integrity = ref(null);
const userInteraction = ref(null);
const availability = ref(null);
const vulnerabilityDescription = ref("");
const validationSteps = ref("");
const files = ref(null);
const termsAccepted = ref(false);

// Options for form fields
const vulnerabilityTargets = [
  "Web Application",
  "Mobile Application",
  "API Endpoint",
  "Database",
  "Network Infrastructure",
  "Cloud Service",
  "IoT Device",
];

const vulnerabilityCategories = [
  "SQL Injection",
  "Cross-Site Scripting (XSS)",
  "Cross-Site Request Forgery (CSRF)",
  "Authentication Bypass",
  "Authorization Bypass",
  "Insecure Direct Object References",
  "Security Misconfiguration",
  "Sensitive Data Exposure",
  "Missing Function Level Access Control",
  "Unvalidated Redirects and Forwards",
];

const severityLevels = [
  {
    value: "none",
    label: "None",
    color: "bg-gray-200 text-gray-700",
    dotColor: "",
  },
  {
    value: "low",
    label: "Low",
    color: "bg-blue-100 text-blue-700",
    dotColor: "bg-blue-500",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 text-yellow-700",
    dotColor: "bg-yellow-500",
  },
  {
    value: "high",
    label: "High",
    color: "bg-red-100 text-red-700",
    dotColor: "bg-red-500",
  },
  {
    value: "critical",
    label: "Critical",
    color: "bg-purple-100 text-purple-700",
    dotColor: "bg-purple-500",
  },
];
const { params } = useRoute();
const router = useRouter();
const attackVectorOptions = ["Network", "Adjacent", "Local", "Physical"];
const scopeOptions = ["Unchanged", "Changed"];
const complexityOptions = ["Low", "High"];
const impactOptions = ["None", "Low", "High"];
const userInteractionOptions = ["None", "Required"];

const { data, error, loading, addReport } = report();
const onSubmit = async (values) => {
  await addReport(params.id, values);
  if (data.value) {
    toast.success("Report added successfully");
    setTimeout(() => {
      router.push("/programs");
    }, 1500);
    return;
  }

  if (error.value) {
    toast.error(error.value || "Something went wrong");
    return;
  }
};
</script>
