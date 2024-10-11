import axios from "axios";
import { useEffect, useState } from "react";

export type Blog = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    username: string | null;
  };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios
      .get(`${apiUrl}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (isMounted) {
          setBlogs(response.data.blogs);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.response?.data?.message || "Failed to fetch blogs");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return {
    blogs,
    loading,
    error,
  };
};

export const singleBlog = (id: string) => {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axios
      .get(`${apiUrl}/api/v1/blog/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (isMounted) {
          setBlog(response.data.blog);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error.response?.data?.message || "Failed to fetch blogs");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  return {
    blog,
    loading,
    error,
  };
};
