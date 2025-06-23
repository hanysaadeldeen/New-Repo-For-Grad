export const blogsController = () => {
  const blogs = ref<Blogs[] | null>(null);
  const blogId = ref<Blogs | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const config = useRuntimeConfig();

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

  interface SectionsJson {
    introduction: string;
    whatIsFog: string;
    Technicalinvestigation: string;
    DataLeakSite_DLS: string;
  }

  interface AddBlog {
    image: string;
    title: string;
    introduction: string;
    whatIsFog: string;
    technicalInvestigation: string;
    dataLeakSite: string;
  }

  const fetchBlogs = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<Blogs[]>(`${config.public.BaseApi}/Blog`);
      blogs.value = res;
    } catch (err: any) {
      error.value = err.data?.message || err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  const fetchBlogId = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<Blogs>(`${config.public.BaseApi}/Blog/${id}`);
      blogId.value = res;
    } catch (err: any) {
      error.value = err.data?.message || err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };
  const token = useCookie("token");

  const addBlog = async (data: AddBlog) => {
    loading.value = true;
    error.value = null;

    const formdata = new FormData();
    formdata.append("image", data.image);
    formdata.append("title", data.title);
    formdata.append("introduction", data.introduction);
    formdata.append("whatIsFog", data.whatIsFog);
    formdata.append("technicalInvestigation", data.technicalInvestigation);
    formdata.append("dataLeakSite", data.dataLeakSite);

    console.log("here");

    try {
      const res = await $fetch(`${config.public.BaseApi}/Blog`, {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      return res;
    } catch (err: any) {
      error.value = err.data?.message || err.message || "Unknown error";
    } finally {
      loading.value = false;
    }
  };

  return {
    blogs,
    blogId,
    loading,
    error,
    fetchBlogs,
    fetchBlogId,
    addBlog,
  };
};
