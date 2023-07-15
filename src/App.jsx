import { useState } from "react";
import "./App.css";
import apiClient from "./api-client/apiClient";

function App() {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

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
  const addPost = () => {
    const originalPosts = [...posts];
    const addnewPost = { id: 0, title: "new POST" };
    setPosts([addnewPost, ...posts]);
    apiClient
      .post("/posts" + addnewPost)
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
      <h1>Post api </h1>
      {error && <p className="text-danger"> {error} </p>}
      <button onClick={addPost} className=" btn btn-primary">
        ADD
      </button>
      {isloading ? (
        <div className="spinner-border"></div>
      ) : (
        <ul className="list-group ">
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
