<template>
  <section class="pt-20">
    <!-- <h1
      class="w-full bg-gradient-to-b from-[#FFFFFF] to-[#71717A] bg-clip-text font-bold text-transparent md:w-[536px]"
      :class="
        locale === 'ar'
          ? 'text-xl md:text-[50px] md:leading-[60px]'
          : 'text-xl md:text-4xl'
      "
    > -->
    <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
      Discover the latest articles and insights <br />
      on ZeroPointSecurity
    </h1>
    <div class="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <BlogCard v-for="blog in Allblogs" :key="blog.id" :blog="blog" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n();
import blog1 from "~/assets/img/blog1.webp";
import blog2 from "~/assets/img/blog2.webp";
import blog3 from "~/assets/img/blog3.webp";
import blog4 from "~/assets/img/blog4.webp";
interface Section {
  title: string;
  content: string;
}
interface Blog {
  id: string;
  title: string;
  sections: Section[];
  image: string;
  createdAt: string;
  authorName: string;
  authorEmail: string;
}
interface Props {
  blogs: Blog[] | null;
}

const Allblogs = [
  {
    id: "1",
    title: "Introduction to Network Security",
    sections: [
      {
        title: "Section 1",
        content: "Section 1 Content",
      },
    ],
    image: blog1,
    createdAt: "2025-05-03",
    authorName: "Hany Mohamed",
  },
  {
    id: "2",
    title: "OAuth Misconfiguration Leading to Pre-Account Takeover",
    sections: [
      {
        title: "Section 1",
        content: "Section 1 Content",
      },
    ],
    image: blog2,
    createdAt: "2025-05-01",
    authorName: "ZeroPointPath",
  },
  {
    id: "3",
    title: "Introduction to DFIR",
    sections: [
      {
        title: "Section 1",
        content: "Section 1 Content",
      },
    ],
    image: blog3,
    createdAt: "2023-02-4",
    authorName: "Fawzy Mohamed",
  },
  {
    id: "4",
    title: "Cyber Kill Chain and Overview of the MITRE ATT&CK Matrix",
    sections: [
      {
        title: "Section 1",
        content: "Section 1 Content",
      },
    ],
    image: blog4,
    createdAt: "2023-03-09",
    authorName: "eslam mohamed",
  },
];
const props = defineProps<Props>();

</script>

<style scoped></style>
