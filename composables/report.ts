import { useToast } from "vue-toast-notification";

export const report = () => {
  const config = useRuntimeConfig();

  const data = ref<any>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);

  interface VulnerabilityReport {
    ProgramId: string;
    UserId: string;
    VulnerabilityTitle: string;
    VulnerabilityTarget: string;
    VulnerabilityCategory: string;
    SeverityLevel: string;
    AttackVector: string;
    AttackComplexity: string;
    PrivilegesRequired: string;
    UserInteraction: string;
    Scope: string;
    Confidentiality: string;
    Integrity: string;
    Availability: string;
    VulnerabilityDetails: string;
    ValidationSteps: string;
    Attachment: File;
  }

  const userId = useCookie("userId");
  const token = useCookie("token");

  const toast = useToast({ position: "top-right", duration: 1500 });

  const addReport = async (programID: string, values: VulnerabilityReport) => {
    loading.value = true;
    error.value = null;

    const allData = {
      ...values,
      programId: programID,
      userId: userId.value,
    };

    const formData = new FormData();

    // أولًا نضيف programId و userId
    formData.append("ProgramId", programID);
    formData.append("UserId", userId.value);

    // بعدين نضيف باقي الحقول من values
    const keys = [
      "VulnerabilityTitle",
      "VulnerabilityTarget",
      "VulnerabilityCategory",
      "SeverityLevel",
      "AttackVector",
      "AttackComplexity",
      "PrivilegesRequired",
      "UserInteraction",
      "Scope",
      "Confidentiality",
      "Integrity",
      "Availability",
      "VulnerabilityDetails",
      "ValidationSteps",
    ];

    keys.forEach((key) => {
      formData.append(key, values[key]);
    });

    // وأخيرًا نضيف الملف
    if (values.Attachment && values.Attachment instanceof File) {
      formData.append("Attachment", values.Attachment);
    }

    // 🔍 تأكد من القيم قبل الإرسال
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    // const formData = new FormData();

    if (!userId.value) {
      toast.error("User ID not found");
      return;
    }
    try {
      const response = await $fetch(
        `${config.public.BaseApi}/ReportSubmissions`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      );
      data.value = response;
    } catch (err: any) {
      error.value =
        err?.response?._data?.title || err.message || "Unknown error";

      console.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const getAllReports = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(
        `${config.public.BaseApi}/ReportSubmissions/${id}`,
        {
          method: "GET",
        },
      );
      data.value = response;
    } catch (err: any) {
      console.error("Get All Reports Error:", err);
      error.value =
        err?.response?._data?.title || err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  const getReportId = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch(
        `${config.public.BaseApi}/ReportSubmissions/${id}`,
        {
          method: "GET",
        },
      );
      data.value = response;
    } catch (err: any) {
      console.error("Get Report By ID Error:", err);
      error.value =
        err?.response?._data?.title || err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    addReport,
    getAllReports,
    getReportId,
  };
};
