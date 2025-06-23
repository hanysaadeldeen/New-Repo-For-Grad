<template>
    <section class="text-white">
        <h1 class="text-3xl font-bold mb-6">Reported Vulnerabilities</h1>

        <div v-if="AllReports.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="report in AllReports" :key="report.id"
                class="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                <h2 class="text-xl font-semibold text-white mb-2">
                    Title: {{ report.vulnerabilityTitle }}
                </h2>

                <div class="mb-2 text-sm text-gray-400">
                    <span class="font-medium text-white">Category:</span> {{ report.vulnerabilityCategory }}
                </div>

                <div class="mb-2 text-sm text-gray-400">
                    <span class="font-medium text-white">Severity: </span>
                    <span :class="[
                        'p-2 mx-2 rounded text-xs font-bold',
                        report.severityLevel === 'Critical' ? 'bg-red-600 text-white' :
                            report.severityLevel === 'High' ? 'bg-orange-600 text-white' :
                                report.severityLevel === 'Medium' ? 'bg-yellow-500 text-black' :
                                    'bg-green-600 text-white'
                    ]">
                        {{ report.severityLevel }}
                    </span>
                </div>

                <div class="mb-2 text-sm text-gray-400">
                    <span class="font-medium text-white">Target:</span> {{ report.vulnerabilityTarget }}
                </div>

                <p class="text-sm text-gray-300 mt-3 line-clamp-3">
                    Details: {{ report.vulnerabilityDetails }}
                </p>

                <div v-if="report.attachment" class="mt-4">
                    <a :href="report.attachment" target="_blank" class="text-blue-400 underline text-sm">
                        View Attachment
                    </a>
                </div>
            </div>
        </div>

        <div v-else class="text-gray-400 text-center mt-20 text-lg">
            No reports available for this program.
        </div>
    </section>
</template>

<script setup lang="ts">


const { params } = useRoute()

const { AllReports, getProgramReports } = ProgramReports()

onMounted(() => {
    if (params.id) {
        getProgramReports(params.id)
    }
})

</script>

<style scoped></style>