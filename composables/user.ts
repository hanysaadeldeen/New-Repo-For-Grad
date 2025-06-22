export const useUserPage = () => {
  const runtimeConfig = useRuntimeConfig();
  const userRole = useCookie("userRole");
  const token = useCookie("token");
  const loading = ref(false);

  const fetchUserDataTest = async () => {
    loading.value = true;
    if (userRole.value === "User") {
      try {
        const response = await $fetch(
          `${runtimeConfig.public.BaseApi}/Users/current`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          },
        );
        return response;
      } catch (err: any) {
        console.error("Fetch error:", err);
      } finally {
        loading.value = false;
      }
    } else {
      try {
        const response = await $fetch(
          `${runtimeConfig.public.BaseApi}/Admins/current`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          },
        );
        return response;
      } catch (err: any) {
        console.error("Fetch error:", err);
      } finally {
        loading.value = false;
      }
    }
  };
  return {
    fetchUserDataTest,
  };
};
