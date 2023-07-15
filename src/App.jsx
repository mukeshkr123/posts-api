import { useState } from "react";
import "./App.css";
import apiClient from "./api-client/apiClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//post schema
const postSchema = z.object({
  id: z.string().min(2, "Minimum 2 digits are required"),
  title: z.string().min(2, "Minimum 2 digits are required"),
});

function App() {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  useState(() => {
    const fetchUser = async () => {
      try {
        setIsloading(true);
        const response = await apiClient.get("/posts");
        setIsloading(false);
        setPosts(response.data);
      } catch (error) {
        setError(error.message);
        setIsloading(false);
      }
    };
    fetchUser();
  }, []);

  //delete the posts
  const onDelete = (id) => {
    const originalPost = [...posts];
    setPosts(posts.filter((post) => post.id !== id));
    apiClient.delete("/posts" + id).catch((err) => {
      setError(err.message);
      setPosts(originalPost);
    });
  };

  //add posts
  const addPost = (data) => {
    console.log(data);
    const originalPosts = [...posts];
    setPosts([data, ...posts]);
    apiClient
      .post("/posts" + data)
      .then(({ data: savedPosts }) => setPosts([savedPosts, ...posts]))
      .catch((err) => {
        setError(err.message);
        setPosts(originalPosts);
      });
  };

  const onUpdate = (post) => {
    const originalPosts = [...posts];
    const updatedPosts = { ...post, title: post.title + " !" };
    setPosts(posts.map((p) => (p.id === post.id ? updatedPosts : p)));
    apiClient
      .put("https://jsonplaceholder.typicode.com/posts" + updatedPosts)
      .catch((err) => {
        setError(err.message);
        setPosts(originalPosts);
      });
  };

  return (
    <>
      <h1 className="mx-4">Post api </h1>
      {error && <p className=" mx-4 text-danger"> {error} </p>}
      <form
        onSubmit={handleSubmit((data) => {
          reset();
          addPost(data);
        })}
        className="form-group m-3"
      >
        <label className="my-1" htmlFor="">
          #id
        </label>
        <input
          {...register("id")}
          type="text"
          id="id"
          name="id"
          className="my-1 form-control"
          placeholder="Enter Post Id"
        />
        <label className="my-1" htmlFor="">
          Tittle
        </label>
        <input
          type="text"
          {...register("title")}
          id="title"
          name="title"
          className="my-1 form-control"
          placeholder="Enter Title"
        />
        <input type="submit" className="s m-3 btn btn-primary" value="Submit" />
      </form>
      {isloading ? (
        <div className="spinner-border"></div>
      ) : (
        <ul className="list-group m-3 ">
          {posts.map((post) => (
            <li
              key={post.id}
              className="list-group-item d-flex justify-content-between"
            >
              {post.title}
              <div>
                <button
                  onClick={() => onUpdate(post)}
                  className="btn btn-outline-secondary mx-1"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
