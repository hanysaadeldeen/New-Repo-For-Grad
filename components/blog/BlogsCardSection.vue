<template>
  <section class="pt-20">

    <h1 class="mb-8 w-full bg-gradient-to-b bg-clip-text text-center text-4xl font-bold text-white md:text-4xl">
      Discover the latest articles and insights <br />
      on ZeroPointSecurity
    </h1>
    <div class="mt-16 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </div>
  </section>
</template>

<script setup lang="ts">
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

// const Allblogs = [
//   {
//     id: "1",
//     title: "Introduction to Network Security",
//     sections: [
//       {
//         title: "Section 1",
//         content: "Section 1 Content",
//       },
//     ],
//     image: blog1,
//     createdAt: "2025-05-03",
//     authorName: "Hany Mohamed",
//   },
//   {
//     id: "2",
//     title: "OAuth Misconfiguration Leading to Pre-Account Takeover",
//     sections: [
//       {
//         title: "Section 1",
//         content: "Section 1 Content",
//       },
//     ],
//     image: blog2,
//     createdAt: "2025-05-01",
//     authorName: "ZeroPointPath",
//   },
//   {
//     id: "3",
//     title: "Introduction to DFIR",
//     sections: [
//       {
//         title: "Section 1",
//         content: "Section 1 Content",
//       },
//     ],
//     image: blog3,
//     createdAt: "2023-02-4",
//     authorName: "Fawzy Mohamed",
//   },
//   {
//     id: "4",
//     title: "Cyber Kill Chain and Overview of the MITRE ATT&CK Matrix",
//     sections: [
//       {
//         title: "Section 1",
//         content: "Section 1 Content",
//       },
//     ],
//     image: blog4,
//     createdAt: "2023-03-09",
//     authorName: "eslam mohamed",
//   },
// ];
const { blogs } = defineProps<Props>();

</script>

<style scoped></style>
