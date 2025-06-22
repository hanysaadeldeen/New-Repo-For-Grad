export const ProgramReports = () => {
  const config = useRuntimeConfig();

  interface Report {
    id: string;
    programId: string;
    userId: string;
    vulnerabilityTitle: string;
    vulnerabilityTarget: string;
    vulnerabilityCategory: string;
    severityLevel: string;
    attackVector: string;
    attackComplexity: string;
    privilegesRequired: string;
    userInteraction: string;
    scope: string;
    confidentiality: string;
    integrity: string;
    availability: string;
    vulnerabilityDetails: string;
    validationSteps: string;
    attachment: string | null;
  }

  const AllReports = ref<Report[]>([]);
  const getProgramReports = async (id: any) => {
    try {
      const response = await $fetch<Report[]>(
        `${config.public.BaseApi}/ReportSubmissions/program/${id}`,
      );
      if (response) {
        AllReports.value = response;
      }
      return response;
    } catch (error: any) {
      return error?.response?._data ?? error;
    }
  };

  return { AllReports, getProgramReports };
};
