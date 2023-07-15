import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "./api-client/apiClient";
import PostForm from "./components/form";
import FormList from "./components/formList";

const postSchema = z.object({
  id: z.string().min(2, "Minimum 2 digits are required"),
  title: z.string().min(10, "Please add a Topic at least 10 words"),
});

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/posts");
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const onDelete = async (id) => {
    try {
      await apiClient.delete(`/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const addPost = async (data) => {
    const originalPosts = [...posts];
    try {
      const response = await apiClient.post("/posts", data);
      setPosts([response.data, ...posts]);
    } catch (err) {
      setError(err.message);
      setPosts(originalPosts);
    }
  };

  const onUpdate = async (post) => {
    const originalPosts = [...posts];
    const updatedPosts = { ...post, title: post.title + " !" };
    try {
      await apiClient.put(`/posts/${updatedPosts.id}`, updatedPosts);
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p.id === post.id ? updatedPosts : p))
      );
    } catch (err) {
      setError(err.message);
      setPosts(originalPosts);
    }
  };
  return (
    <>
      <h1 className="mx-4">Post api</h1>
      {error && <p className="mx-4 text-danger">{error}</p>}
      {/* form  */}
      <PostForm
        handleSubmit={handleSubmit}
        reset={reset}
        addPost={addPost}
        IdErrors={errors.id?.message}
        TitleErrors={errors.title?.message}
        register={register}
      />
      {isLoading ? (
        <div className="spinner-border"></div>
      ) : (
        <FormList posts={posts} onDelete={onDelete} onUpdate={onUpdate} />
      )}
    </>
  );
}

export default App;
