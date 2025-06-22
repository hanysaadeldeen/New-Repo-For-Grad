export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");
  const role = useCookie("userRole");

  if (token.value && role.value !== "Admin") {
    return navigateTo("/");
  }
});
