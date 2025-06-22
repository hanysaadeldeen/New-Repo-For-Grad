<template>
  <div class="Program_Info mt-8">
    <div class="flex flex-wrap gap-4 border-b border-gray-500 pb-4">
      <p class="cursor-pointer rounded-2xl px-5 py-2 text-lg font-semibold tracking-wide text-black" :class="bountyType === 'All'
        ? 'bg-hookYellow text-white'
        : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200'
        " @click="bountyType = 'All'">
        All
      </p>
      <p class="cursor-pointer rounded-2xl px-5 py-2 text-lg font-semibold tracking-wide text-black" :class="bountyType === 'Scope'
        ? 'bg-secondary text-white'
        : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200'
        " @click="bountyType = 'Scope'">
        Scope
      </p>
      <p class="cursor-pointer rounded-2xl px-5 py-2 text-lg font-semibold tracking-wide text-black" :class="bountyType === 'FocusArea'
        ? 'bg-secondary text-white'
        : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200'
        " @click="bountyType = 'FocusArea'">
        Focus Area
      </p>
      <p class="cursor-pointer rounded-2xl px-5 py-2 text-lg font-semibold tracking-wide text-black" :class="bountyType === 'ProgramRules'
        ? 'bg-secondary text-white'
        : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200'
        " @click="bountyType = 'ProgramRules'">
        Program Rules
      </p>
      <p class="cursor-pointer rounded-2xl px-5 py-2 text-lg font-semibold tracking-wide text-black" :class="bountyType === 'Disclosure'
        ? 'bg-secondary text-white'
        : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200'
        " @click="bountyType = 'Disclosure'">
        Disclosure Guidelines
      </p>
      <p class="cursor-pointer rounded-2xl px-5 py-2 text-lg font-semibold tracking-wide text-black" :class="bountyType === 'Eligibility'
        ? 'bg-secondary text-white'
        : 'bg-white text-black transition-all duration-300 ease-in-out hover:bg-gray-200'
        " @click="bountyType = 'Eligibility'">
        Eligibility and Coordinated Disclosure
      </p>
    </div>
    <div class="mt-8 flex items-start gap-10 max-lg:flex-col-reverse">
      <div class="w-full lg:w-[75%]">
        <!-- <h1 class="border-b border-paragraph pb-10 text-xl font-bold text-white">
          AscendEX is a platform for investors of all experience levels who want
          to make their crypto ascent better. Simple crypto solutions and
          friendly customer support help our users invest, trade, earn, and
          manage their ascents with confidence. All Scope Focus Area
        </h1> -->
        <!-- scope -->
        <div v-if="bountyType === 'Scope' || bountyType === 'All'" class="mr-auto max-w-4xl">
          <h1 class="mb-4 text-2xl font-bold text-white">IN SCOPE</h1>
          <div class="mb-8 overflow-x-auto rounded-lg shadow-md">
            <table class="w-full min-w-[600px] border-collapse rounded-lg bg-white/10 text-left">
              <thead>
                <tr class="bg-primary text-lg text-white">
                  <th class="px-6 py-4 font-normal">Target</th>
                  <th class="px-6 py-4 font-normal">Type</th>
                  <th class="px-6 py-4 font-normal">Severity</th>
                  <th class="px-6 py-4 font-normal">Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="target in programId.targets"
                  class="group cursor-pointer border-b border-secondary transition-all duration-200 ease-in-out hover:bg-secondary">
                  <td class="flex items-center gap-2 px-4 py-3 font-medium capitalize text-white">
                    <span class="inline-block w-[300px] truncate text-blue-600 group-hover:text-white">{{ target.url
                    }}</span>
                    <button @click="copyPassword(target.url)"
                      class="transion-all ml-2 text-gray-400 duration-300 ease-in-out hover:scale-110 group-hover:text-white">
                      <i class="far fa-copy"></i>
                    </button>
                  </td>
                  <td class="px-4 py-3 font-medium capitalize text-white">
                    {{ target.type }}
                  </td>
                  <td class="px-4 py-3 font-medium capitalize text-white">
                    <span class="severity-dot severity-critical text-hookYellow">{{ target.severity }}</span>
                  </td>
                  <td class="px-4 py-3 font-medium capitalize text-white">
                    {{ target.reward }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--Focus Area -->
        <div v-if="bountyType === 'FocusArea' || bountyType === 'All'" class="mt-8">
          <h1 class="mb-4 text-3xl font-bold text-white">Focus Area</h1>
          <div>
            <h2 class="mb-4 border-b-2 border-gray-500 pb-2 text-xl font-bold text-white">
              IN SCOPE VULNERABILITIES (WEB, MOBILE)
            </h2>
            <p class="text-xl text-paragraph">
              We are interested in the following vulnerabilities:
            </p>
            <p class="text-2xl text-paragraph">
              {{ programId.inScopeVulnerabilities }}
            </p>
            <!-- <ul class="mt-5 space-y-4">
              <li class="textDescription text-xl text-white">
                Business logic issues
              </li>
              <li class="textDescription text-xl text-white">
                Payments manipulation
              </li>
              <li class="textDescription text-xl text-white">
                Remote code execution (RCE)
              </li>
              <li class="textDescription text-xl text-white">
                Injection vulnerabilities (SQL, XXE)
              </li>
              <li class="textDescription text-xl text-white">
                Server-Side Request Forgery (SSRF)
              </li>
              <li class="textDescription text-xl text-white">
                Cross-Site Scripting (XSS)
              </li>
            </ul> -->
          </div>
          <div class="mt-8">
            <h2 class="mb-4 border-b-2 border-gray-500 pb-2 text-xl font-bold text-white">
              OUT OF SCOPE: WEB VULNERABILITIES
            </h2>
            <p class="text-xl text-paragraph">
              Vulnerabilities found in out of scope resources are unlikely to be
              rewarded unless they present a serious business risk (at our sole
              discretion). In general, the following vulnerabilities do not
              correspond to the severity threshold:
            </p>
            <p class="text-2xl text-paragraph">
              {{ programId.outOfScopeVulnerabilities }}
            </p>
            <!-- <ul class="mt-5 space-y-4">
              <li class="textDescription text-xl text-white">
                Vulnerabilities in third-party applications
              </li>
              <li class="textDescription text-xl text-white">
                Assets that do not belong to the company
              </li>
              <li class="textDescription text-xl text-white">
                Best practices concerns
              </li>
              <li class="textDescription text-xl text-white">
                Recently (less than 30 days) disclosed 0day vulnerabilities
              </li>
              <li class="textDescription text-xl text-white">
                Vulnerabilities affecting users of outdated browsers or
                platforms
              </li>
              <li class="textDescription text-xl text-white">
                Social engineering, phishing, physical, or other fraud
                activities
              </li>
              <li class="textDescription text-xl text-white">
                Publicly accessible login panels without proof of exploitation
              </li>
              <li class="textDescription text-xl text-white">
                Reports that state that software is out of date / vulnerable
                without a proof of concept
              </li>
              <li class="textDescription text-xl text-white">
                Vulnerabilities involving active content such as web browser
                add-ons
              </li>
              <li class="textDescription text-xl text-white">
                Most brute-forcing issues without clear impact
              </li>
              <li class="textDescription text-xl text-white">
                Denial of service (DoS/DDoS)
              </li>
              <li class="textDescription text-xl text-white">
                Theoretical issues
              </li>
              <li class="textDescription text-xl text-white">
                Moderately Sensitive Information Disclosure
              </li>
              <li class="textDescription text-xl text-white">
                Spam (sms, email, etc)
              </li>
              <li class="textDescription text-xl text-white">
                Missing HTTP security headers
              </li>
            </ul> -->
          </div>
        </div>
        <!--Program Rules -->
        <div class="mt-8" v-if="bountyType === 'ProgramRules' || bountyType === 'All'">
          <h1 class="mb-4 text-3xl font-bold text-white">Program Rules</h1>
          <p class="text-2xl text-paragraph">
            {{ programId.programRules }}
          </p>
          <!-- <ul class="mt-5 space-y-4">
            <li class="textDescription text-xl text-white">
              Avoid using web application scanners for automatic vulnerability
              searching which generates massive traffic
            </li>
            <li class="textDescription text-xl text-white">
              Make every effort not to damage or restrict the availability of
              products, services, or infrastructure
            </li>
            <li class="textDescription text-xl text-white">
              Avoid compromising any personal data, interruption, or degradation
              of any service
            </li>
            <li class="textDescription text-xl text-white">
              Perform testing only within the scope
            </li>
            <li class="textDescription text-xl text-white">
              Don’t exploit any DoS/DDoS vulnerabilities, social engineering
              attacks, or spam
            </li>
            <li class="textDescription text-xl text-white">
              Don’t spam forms or account creation flows using automated
              scanners
            </li>
            <li class="textDescription text-xl text-white">
              In case you find chain vulnerabilities we’ll pay only for
              vulnerability with the highest severity.
            </li>
            <li class="textDescription text-xl text-white">
              Don’t break any law and stay in the defined scope
            </li>
          </ul> -->
        </div>
        <!--Disclosure Guidelines -->
        <div class="mt-8" v-if="bountyType === 'Disclosure' || bountyType === 'All'">
          <h1 class="mb-4 text-3xl font-bold text-white">
            Disclosure Guidelines
          </h1>
          <p class="text-2xl text-paragraph">
            {{ programId.disclosureGuidelines }}
          </p>
          <!-- <ul class="mt-5 space-y-4">
            <li class="textDescription text-xl text-white">
              Do not discuss this program or any vulnerabilities (even resolved
              ones) outside of the program without express consent from the
              organization
            </li>
            <li class="textDescription text-xl text-white">
              No vulnerability disclosure, including partial is allowed for the
              moment.
            </li>
            <li class="textDescription text-xl text-white">
              Please do NOT publish/discuss bugs
            </li>
          </ul> -->
        </div>
        <!--Eligibility and Coordinated Disclosure -->
        <div class="mt-8" v-if="bountyType === 'Eligibility' || bountyType === 'All'">
          <h1 class="mb-4 text-3xl font-bold text-white">
            Eligibility and Coordinated Disclosure
          </h1>
          <p class="text-xl text-paragraph">
            We are happy to thank everyone who submits valid reports which help
            us improve the security. However, only those that meet the following
            eligibility requirements may receive a monetary reward:
          </p>
          <p class="text-2xl text-paragraph">
            {{ programId.eligibility }}
          </p>
          <!-- <ul class="mt-5 space-y-4">
            <li class="textDescription text-xl text-white">
              You must be the first reporter of a vulnerability.
            </li>
            <li class="textDescription text-xl text-white">
              The vulnerability must be a qualifying vulnerability
            </li>
            <li class="textDescription text-xl text-white">
              Any vulnerability found must be reported no later than 24 hours
              after discovery and exclusively through hackenproof.com
            </li>
            <li class="textDescription text-xl text-white">
              You must send a clear textual description of the report along with
              steps to reproduce the issue, include attachments such as
              screenshots or proof of concept code as necessary.
            </li>
            <li class="textDescription text-xl text-white">
              You must not be a former or current employee of us or one of its
              contractor.
            </li>
            <li class="textDescription text-xl text-white">
              Don't break any law and stay in the defined scope
            </li>
            <li class="textDescription text-xl text-white">
              ONLY USE the EMAIL under which you registered your HackenProof
              account (in case of violation, no bounty can be awarded)
            </li>
          </ul> -->
        </div>
      </div>
      <div class="w-full lg:w-2/5">
        <div class="mb-5 rounded-lg border border-paragraph py-4">
          <div class="flex items-center gap-4 border-b border-paragraph px-6 pb-4">
            <i class="fa-solid fa-circle-dollar-to-slot text-hookYellow"></i>
            <h1 class="text-xl font-bold text-white">Rewards</h1>
          </div>
          <div class="px-6 pt-4">
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-white">Range Of Bounty</p>
              <p class="text-lg font-medium text-white">
                ${{ programId.rewards.critical }} - ${{ programId.rewards.low }}
              </p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Critical</p>
              <p class="text-lg font-medium text-white">
                ${{ programId.rewards.critical }}
              </p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">High</p>
              <p class="text-lg font-medium text-white">
                ${{ programId.rewards.high }}
              </p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Medium</p>
              <p class="text-lg font-medium text-white">
                ${{ programId.rewards.medium }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Low</p>
              <p class="text-lg font-medium text-white">
                ${{ programId.rewards.low }}
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="mb-5 rounded-lg border border-paragraph py-4">
          <div
            class="flex items-center gap-4 border-b border-paragraph px-6 pb-4"
          >
            <i class="fa-solid fa-chart-column text-hookYellow"></i>
            <h1 class="text-xl font-bold text-white">Stats</h1>
          </div>
          <div class="px-6 pt-4">
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-white">Scope Review</p>
              <p class="text-lg font-medium text-white">1229</p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Submissions</p>
              <p class="text-lg font-medium text-white">33</p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Total rewards</p>
              <p class="text-lg font-medium text-white">$0</p>
            </div>
          </div>
        </div>
        <div class="rounded-lg border border-paragraph py-4">
          <div
            class="flex items-center gap-4 border-b border-paragraph px-6 pb-4"
          >
            <h1 class="text-xl font-bold text-white">
              SLA (Service Level Agreement)
            </h1>
          </div>
          <div class="px-6 pt-4">
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-white">Response Type</p>
              <p class="text-lg font-medium text-white">Business days</p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">
                First Response
              </p>
              <p class="text-lg font-medium text-white">3d</p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Triage Time</p>
              <p class="text-lg font-medium text-white">3d</p>
            </div>
            <div class="mb-4 flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">Reward Time</p>
              <p class="text-lg font-medium text-white">3d</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-lg font-semibold text-hookYellow">
                Resolution Time
              </p>
              <p class="text-lg font-medium text-white">14d</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "vue-toast-notification";
const toast = useToast({ position: "top-right", duration: 1500 });
const bountyType = ref<string>("All");
const copyPassword = (value: string) => {
  navigator.clipboard.writeText(value);
  toast.success("Copied to clipboard");
};

interface Props {
  programId: any;
}

defineProps<Props>();
</script>

<style scoped>
.severity-dot::before,
.textDescription::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  background-color: #ffb45c;
  margin: 0 8px 2px 0;
}

.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;
}
</style>
