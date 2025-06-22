export default defineNuxtRouteMiddleware(() => {
  const token = useCookie("token");
  const role = useCookie("userRole");

  if (!token.value) {
    return navigateTo("/login");
  }
});
