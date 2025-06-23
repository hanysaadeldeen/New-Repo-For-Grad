<template>
    <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <!-- Profile Card -->

        <div class="flex flex-col gap-y-4 lg:col-span-2">

            <!-- <div v-if="userRole === 'User'"
                class="flex h-fit flex-col items-center justify-center gap-1 rounded-xl bg-secondary/20 py-8 text-center shadow">
                <div class="rounded-lg bg-blue-100 p-2.5">
                    <Rss class="h-[25px] w-[25px] text-blue-500" />
                </div>
                <h3 class="mt-2 text-xl font-bold text-white">{{ data.reports.length }}</h3>
                <p class="text-paragraph">Completed Reports</p>
            </div> -->
            <div class="rounded-xl bg-secondary/20 p-6 shadow-lg">
                <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                    <font-awesome-icon icon="file-alt" />
                    Program Reports
                </h3>
                <div v-if="userRole === 'Admin'">
                    <div v-for="program in data.programs" :key="program.id"
                        class="mb-4 flex items-center justify-between rounded-lg bg-secondary/20 p-4 shadow">
                        <div class="flex items-center gap-4">
                            <img :src="program.image" alt="program-image" class="h-16 w-16 rounded-full object-cover" />
                            <div>
                                <h4 class="text-lg font-bold text-white">{{ program.title }}</h4>
                                <p class="text-sm text-paragraph">
                                    {{ program.companyName }} • {{ program.collaborationType.toUpperCase() }}
                                </p>
                                <p class="text-xs text-paragraph mt-1">
                                    Vulnerabilities: {{ program.vulnerabilitiesCount }} • Efficiency: {{
                                        program.responseEfficiency
                                    }}%
                                </p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm font-medium text-white">Status:
                                <span :class="program.programStatus === 'activity' ? 'text-green-400' : 'text-red-400'">
                                    {{ program.programStatus }}
                                </span>
                            </p>
                            <div class="mt-2 flex flex-wrap gap-1 text-xs text-white">
                                <span class="rounded bg-red-600/20 px-2 py-1">Critical: {{ program.critical }}</span>
                                <span class="rounded bg-yellow-500/20 px-2 py-1">High: {{ program.high }}</span>
                                <span class="rounded bg-blue-500/20 px-2 py-1">Medium: {{ program.medium }}</span>
                                <span class="rounded bg-green-500/20 px-2 py-1">Low: {{ program.low }}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-else>
                    <div v-if="data.reports && data.reports.length > 0">
                        <div v-for="report in data.reports" :key="report.id"
                            class="mb-3 flex items-center justify-between rounded-lg bg-secondary/20 p-4">
                            <nuxt-link :to="localePath(report.programId)">
                                <div>
                                    <h4 class="font-semibold text-white">{{ report.vulnerabilityTitle }}</h4>
                                    <p class="text-sm text-paragraph">
                                        {{ report.duration }} • Completed: {{ report.completed }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span
                                        class="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                                        {{ report.integrity }}%
                                    </span>
                                    <Trophy class="text-hookYellow" />
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 text-hookYellow">
                        You didn't add any program Report yet
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>