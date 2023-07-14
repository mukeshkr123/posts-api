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

  console.log(posts);

  return (
    <>
      <h1>Post api </h1>
      {isloading ? (
        <div className="spinner-border"></div>
      ) : (
        <ul className="list-group ">
          {posts.map((post) => (
            <li
              key={post.id}
              className="list-group-item d-flex justify-content-between"
            >
              {post.title}{" "}
              <div>
                <button className="btn btn-outline-secondary mx-1">
                  Update
                </button>
                <button className="btn btn-primary">Delete</button>
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