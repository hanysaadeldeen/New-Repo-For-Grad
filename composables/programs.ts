export const programsController = async () => {
  const runtimeConfig = useRuntimeConfig();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<ProgramCard[] | null>(null);
  const programId = ref<ProgramDetails | null>(null);

  interface ProgramCard {
    id: number;
    companyName: string;
    image: string;
    title: string;
    collaborationType: string;
    goldStandard: boolean;
    minPrice: number;
    maxPrice: number;
    vulnerabilitiesCount: string;
    hackersPaid: string;
    responseEfficiency: string;
  }

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
    rewards: Rewards;
    targets: Target[];
    inScopeVulnerabilities: string;
    outOfScopeVulnerabilities: string;
    programRules: string;
    disclosureGuidelines: string;
    eligibility: string;
  }

  interface FormProgramValues {
    title: string;
    companyName: string;
    image: string;
    collaborationType: string;
    goldStandard: string;
    targets: Target[];
    focusArea: string;
    inScopeVulnerabilities: string;
    outOfScopeVulnerabilities: string;
    programRules: string;
    disclosureGuidelines: string;
    eligibility: string;
    rewards: Rewards;
  }

  const token = useCookie("token");

  const fetchPrograms = async () => {
    loading.value = true;

    try {
      const response = await $fetch<ProgramCard[]>(
        `${runtimeConfig.public.BaseApi}/BBPrograms`,
        { method: "GET" },
      );

      if (response) {
        data.value = response;
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      error.value =
        err?.response?._data?.title || err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  const fetchProgramById = async (id: string) => {
    loading.value = true;
    try {
      const response = await $fetch<ProgramDetails>(
        `${runtimeConfig.public.BaseApi}/BBPrograms/ProgramDetails/${id}`,
        {
          method: "GET",
        },
      );

      if (response) {
        programId.value = response;
      }
    } catch (err: any) {
      console.error("Fetch program by ID error:", err);
      error.value =
        err?.response?._data?.title || err.message || "Unknown error";
      return { data: null, error: error.value, loading: loading.value };
    } finally {
      loading.value = false;
    }
  };
  const addProgram = async (values: any) => {
    loading.value = true;
    error.value = null;

    console.log(values);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (value !== undefined && value !== null) {
        if (typeof value === "object" && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      const data = await $fetch(`${runtimeConfig.public.BaseApi}/BBPrograms`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      return { data, error: null };
    } catch (err: any) {
      const errorData = err?.response?._data;
      if (errorData) {
        if (errorData.errors) {
          for (const key in errorData.errors) {
            console.error(`${key}: ${errorData.errors[key].join(", ")}`);
          }
        }
      }
      return { data: null, error: errorData || err };
    } finally {
      loading.value = false;
    }
  };
  const updateProgram = async (values: any, id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch(
        `${runtimeConfig.public.BaseApi}/BBPrograms/${id}`,
        {
          method: "PUT",
          body: values,
        },
      );

      return { data, error: null };
    } catch (err: any) {
      const errorData = err?.response?._data;
      if (errorData) {
        if (errorData.errors) {
          for (const key in errorData.errors) {
            console.error(`${key}: ${errorData.errors[key].join(", ")}`);
          }
        }
      }
      return { data: null, error: errorData || err };
    } finally {
      loading.value = false;
    }
  };
  const deleteProgram = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch(
        `${runtimeConfig.public.BaseApi}/BBPrograms/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );
      fetchPrograms();
      return { data, error: null };
    } catch (err: any) {
      const errorData = err?.response?._data;
      if (errorData) {
        if (errorData.errors) {
          for (const key in errorData.errors) {
            console.error(`${key}: ${errorData.errors[key].join(", ")}`);
          }
        }
      }
      return { data: null, error: errorData || err };
    } finally {
      loading.value = false;
    }
  };

  return {
    addProgram,
    fetchPrograms,
    fetchProgramById,
    updateProgram,
    deleteProgram,
    data,
    error,
    loading,
    programId,
  };
};
