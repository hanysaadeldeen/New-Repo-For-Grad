export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["swiper/css", "~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@vee-validate/nuxt", "@nuxtjs/i18n"],
  plugins: ["~/plugins/toast.client", "~/plugins/vue-typed.client.js"],
  components: [
    "~/components",
    { path: "~/components/home/", extensions: ["vue"] },
    { path: "~/components/blog/", extensions: ["vue"] },
    { path: "~/components/Utils", extensions: ["vue"] },
    { path: "~/components/tools/websiteScanner/", extensions: ["vue"] },
  ],
  i18n: {
    strategy: "prefix",
    locales: [
      { code: "en", iso: "en-US", name: "English" },
      { code: "ar", iso: "ar-EG", name: "Arabic" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  app: {
    head: {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyC5UbwjShNViPsTd7E_mKvUZE8Nl5G2vKM&libraries=places`,
          async: true,
          defer: true,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/LogoTap.svg",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=League+Spartan:wght@100..900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
        },
      ],
      title: "ZeroPointPath",
      meta: [
        {
          name: "description",
          content:
            "ZeroPointPath: Hands-on cybersecurity training with interactive challenges in PWN, WEB, MISC, Forensics, Mobile, and Hardware. Learn in a gamified environment with personalized feedback.",
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      BaseApi: "https://zeropoint.runasp.net/api",
      emailApi: "e58f3f35bf94474ab7b92caf1de5c7fe",
      portApi: "at_3lNiCgasU9k2naFPfhn2fIU8FGnLp",
    },
  },
});
