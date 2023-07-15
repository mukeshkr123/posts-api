const PostForm = (props) => {
  const { handleSubmit, reset, addPost, IdErrors, register, TitleErrors } =
    props;
  return (
    <>
      {" "}
      <form
        onSubmit={handleSubmit((data) => {
          reset();
          addPost(data);
        })}
        className="form-group m-3"
      >
        <label className="my-1" htmlFor="id">
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
        {IdErrors && <p className="text-danger">{IdErrors}</p>}
        <label className="my-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          {...register("title")}
          id="title"
          name="title"
          className="my-1 form-control"
          placeholder="Enter Title"
        />
        {TitleErrors && <p className="text-danger">{TitleErrors}</p>}

        <input type="submit" className="s m-3 btn btn-primary" value="Submit" />
      </form>
    </>
  );
};

export default PostForm;
