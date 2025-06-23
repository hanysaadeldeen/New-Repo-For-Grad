import { defineStore } from "pinia";

interface Section {
  title: string;
  content: string;
}

interface Blogs {
  id: string;
  title: string;
  sections: Section[];
  image: string;
  createdAt: string;
  authorName: string;
  authorEmail: string;
}

export const useblogsStore = defineStore("blogs", () => {
  const blogs = ref<Blogs[] | null>(null);
  const blogId = ref<Blogs | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const runtimeConfig = useRuntimeConfig();

  const fetchBlogs = async () => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useFetch<Blogs[]>(
        `http://zeroapi.runasp.net//api/Blog`,
        {
          method: "GET",
        },
      );
      if (fetchError.value) {
        error.value = fetchError.value.message;
        return;
      }
      blogs.value = data.value || [];
    } catch (err: any) {
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };
  const fetchBlogId = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Blogs>(
        `http://zeroapi.runasp.net//api/Blog/${id}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      if (fetchError.value) {
        error.value = fetchError.value.message;
        return;
      }
      if (!data.value) {
        error.value = "Blog not found";
        return;
      } else {
      }
      blogId.value = data.value!;
    } catch (err: any) {
      error.value = err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  return { blogs, blogId, loading, error, fetchBlogs, fetchBlogId };
});
