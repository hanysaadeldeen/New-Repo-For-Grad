<template>
  <div>
    <div v-if="bountyType === 'programInfo'">
      <ProgramInfo :programId="programId" />
    </div>
    <div v-if="bountyType === 'Reports'" class="mt-10 ">
      <BountiesReports />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgramInfo from "~/components/programs/ProgramInfo.vue";
import BountiesHackers from "./BountiesHackers.vue";
import BountiesReports from "./BountiesReports.vue";
interface Props {
  bountyType: string;
  programId: any;
}

defineProps<Props>();
</script>

<style scoped></style>
