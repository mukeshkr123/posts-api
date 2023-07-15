const FormList = (props) => {
  const { posts, onUpdate, onDelete } = props;
  return (
    <>
      <ul className="list-group m-3">
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
    </>
  );
};

export default FormList;
