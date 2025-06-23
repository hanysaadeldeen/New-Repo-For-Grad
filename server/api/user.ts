import { useCookie } from "nuxt/app";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, "token");
  const userRole = useCookie("userRole"); // خد بالك: لازم تستخدم getCookie هنا

  // لو مش معاه role أو token نرجّعه برفض
  if (!token || !userRole) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // بناءً على الـ role، نختار الرابط المناسب
  const url =
    userRole.value === "Admin"
      ? `${config.public.BaseApi}/Admins/current`
      : `${config.public.BaseApi}/Users/current`;
  const data = await $fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});
