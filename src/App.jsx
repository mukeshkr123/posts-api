import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useState(() => {
    const fetchUser = async () => {
      try {
        setIsloading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setIsloading(false);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        setIsloading(false);
      }
    };
    fetchUser();
  }, []);

  //delete the posts

  const onDelete = (id) => {
    const originalPost = [...posts];
    setPosts(posts.filter((post) => post.id !== id));
    axios
      .delete("https://jsonplaceholder.typicode.com/posts" + id)
      .catch((err) => {
        setPosts(originalPost);
      });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);

        setUsers(originalUsers);
      });
  };

  const addPost = () => {
    const originalPosts = [...posts];
    const addnewPost = { id: 0, title: "new POST" };
    setPosts([addnewPost, ...posts]);
    axios.post("https://jsonplaceholder.typicode.com/posts" + addnewPost);
  };

  console.log(posts);

  return (
    <>
      <h1>Post api </h1>
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
                <button className="btn btn-outline-secondary mx-1">
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
      {/* posts  */}
    </>
  );
}

export default App;
