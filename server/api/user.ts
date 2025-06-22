export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "token");

  const data = await $fetch(`${config.public.BaseApi}/Users/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});
