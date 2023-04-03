import { React, useState } from "react";
import AddBlog from "./addBlog";
import BlogList from "./blogList";
import EditBlog from "./editBlog";
import "./styles/myStore.css";
// import "./styles/apperance.css";

const Blog = () => {
  const [addBlog, setAddBlog] = useState(false);
  const [editBlog, setEditBlog] = useState(false);
  const [tempBlog, setTempBlog] = useState({});
  return (
    <div className="myStoreFormContainer">
      {/* {!addBlog ? (
        <BlogList setAddBlog={setAddBlog} />
      ) : (
        <AddBlog setAddBlog={setAddBlog} />
      )} */}
      {!addBlog && !editBlog && (
        <BlogList
          setAddBlog={setAddBlog}
          setEditBlog={setEditBlog}
          setTempBlog={setTempBlog}
        />
      )}
      {addBlog && <AddBlog setAddBlog={setAddBlog} />}
      {editBlog && (
        <EditBlog
          setEditBlog={setEditBlog}
          tempBlog={tempBlog}
          setTempBlog={setTempBlog}
        />
      )}
    </div>
  );
};

export default Blog;
