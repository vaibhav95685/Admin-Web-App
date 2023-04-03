import { React, useEffect, useRef, useState } from "react";
import {
  getBlogs,
  getBlogCategories,
  deleteBlogCategory,
  deleteBlog,
  addBlogCategory,
  editBlogCategory,
} from "../../services/index";
import { dateUtil, momentDate } from "../../utility/index";
import "./styles/blogList.css";
import Modal from "react-modal";
import { connect } from "react-redux";
import ConfirmationModal from "../../common/components/confirmationModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogList = ({ store, setAddBlog, setEditBlog, setTempBlog,setEditBlogData }) => {
  const [resultType, setResultType] = useState("posts");
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [removeBlogModal, setRemoveBlogModal] = useState(false);
  const [removeBlogCategoryModal, setRemoveBlogCategoryModal] = useState(false);
  const tempBlogId = useRef("");
  const tempBlogCategoryId = useRef("");

  // const [addBlog, setAddBlog] = useState(false);
  // const [editBlog, setEditBlog] = useState(false);
  // const [tempBlog, setTempBlog] = useState({});

  useEffect(async () => {
    if (resultType === "posts") {
      console.log(store.token, "<<<<token");
      const blogRes = await getBlogs(setBlogs, store.token);
      if (blogRes.success) {
        setBlogs(blogRes.responseData);
      }
    } else if (resultType === "Categories") {
      const categoryRes = await getBlogCategories(
        setBlogCategories,
        store.token
      );
      if (categoryRes.success) {
        setBlogCategories(categoryRes.responseData.categoryContent);
      } else toast.info("Internal server error. Please login again and try.");
    }
  }, [resultType]);

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const addCategoryModalCustomStyles = {
    content: {
      width: "100%",
      height: "100%",
      inset:"0px",
      backgroundColor: "rgb(14, 29, 44,0.5)",
      border: "none",
      paddingTop:"107px"
    },
  };

  const [editCatModal, setEditCatModal] = useState(false);
  const editCatCustomStyles = {
    content: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgb(14, 29, 44,0.5)",
      border: "none",
    },
  };
  const [editCategoryTemporaryValue, setEditCategoryTemporaryValue] =
    useState("");

  const [addCategoryList, setAddCategoryList] = useState([]);
  const [tempCategory, setTempCategory] = useState("");
  const handleAddMoreCategory = (name) => {
    if (tempCategory !== "") {
      let newArray = [...addCategoryList, name];
      setAddCategoryList(newArray);
      setTempCategory("");
    } else
      toast.info("Category cannot be empty.", {
        toastId: "ahdbsssh",
        autoClose: 1000,
      });
  };

  const handleRemoveCategory = (name) => {
    let newArray = addCategoryList.filter((item) => item !== name);
    setAddCategoryList(newArray);
  };

  const handleCategories = async () => {
    if (addCategoryList.length === 0) {
      toast.info("Add categories to the list.", {
        toastId: "ahdbsh",
        autoClose: 1000,
      });
    } else {
      await Promise.all(
        addCategoryList.map(async (item) => {
          const data = {
            categoryName: item,
            addedBy: store._id,
          };
          const result = await addBlogCategory(data, store.token);
          if (result.success) {
            const newArr = [...blogCategories, result.responseData];
            setBlogCategories(newArr);
            toast.info(`Category: ${item} added`);
          } else toast.info(result.message);
        })
      );

      // const data = {
      //   categoryName: addCategoryList[0],
      //   addedBy: store._id,
      // };
      // const result = await addBlogCategory(data, store.token);

      // if (result.success)
      //   toast.info(`Category: ${addCategoryList[0]} added`);
      // else {
      //   result.errors.map(item => toast.info(item.message));
      // }
      setAddCategoryList([]);
      setAddCategoryModal(false);
    }
  };

  const handleEditBlogCategorySubmit = async () => {
    const data = {
      content: editCategoryTemporaryValue,
      _id: tempBlogCategoryId.current,
    };

    const response = await editBlogCategory(data, store.token);
    if (response.success) {
      toast.info("Blog category edited successfully.");
      setEditCatModal(false);
      setEditCategoryTemporaryValue("");
      tempBlogCategoryId.current = "";
    } else {
      console.log(response);
      toast.info(response?.errors[0]?.message);
    }
  };

  const handleRemoveBlog = async () => {
    const response = await deleteBlog(tempBlogId.current, store.token);
    if (response.success) {
      toast.info("Blog removed successfully.");
      const newBlogs = blogs.filter((item) => item._id !== tempBlogId.current);
      setRemoveBlogModal(false);
      tempBlogId.current = "";
      setBlogs(newBlogs);
    } else {
      toast.info(response.message);
      tempBlogId.current = "";
      setRemoveBlogModal(false);
    }
  };

  const handleRemoveBlogCategory = async () => {
    const result = await deleteBlogCategory(
      tempBlogCategoryId.current,
      store.token
    );
    if (result.success) {
      toast.info("Blog category removed successfully.");
      setRemoveBlogCategoryModal(false);
      const newBlogCategories = blogCategories.filter(
        (item) => item._id !== tempBlogCategoryId.current
      );
      tempBlogCategoryId.current = "";
      setBlogCategories(newBlogCategories);
    } else {
      toast.info("Internal server error. Please try again later.");
      tempBlogCategoryId.current = "";
      setRemoveBlogCategoryModal(false);
    }
  };

  // const handleRemoveBlogCategory = async _id => {
  //   const result = await deleteBlogCategory(_id);
  //   if (result) {
  //     const newBlogCategories = blogCategories.filter(item => item._id !== _id);
  //     setBlogCategories(newBlogCategories);
  //   }
  //   console.log(result);
  // };

  return (
    <>
      <div className="blogListContainer">
        <div className="blogListTopContainer">
          <div className="myStoreHeading1">Blog</div>
          {resultType === "posts" && (
            <div
              className="myStoreBillingsaveButton blogListAddButton"
              onClick={() => setAddBlog(true)}
            >
              Add Blog
            </div>
          )}
          {resultType === "Categories" && (
            <div
              className="myStoreBillingsaveButton blogListAddButton"
              onClick={() => setAddCategoryModal(true)}
            >
              Add Categories
            </div>
          )}
        </div>
        <div className="billingPeriodContainer">
          <div
            onClick={() => {
              setResultType("posts");
            }}
            className={`billingPeriod ${
              resultType === "posts" && "billingPeriod--active"
            }`}
          >
            Posts
          </div>
          <div
            onClick={() => {
              setResultType("Categories");
            }}
            className={`billingPeriod ${
              resultType === "Categories" && "billingPeriod--active"
            }`}
          >
            Categories
          </div>
        </div>
        {resultType === "posts" && (
          <div className="bloglistListContainer">
            <div className="blogListHeader">
              <div className="blogListColumn1">
                <div className="myStoreHeading3"> Blog name</div>
              </div>
              <div className="blogListColumn2">
                <div className="myStoreHeading3"> Date</div>
              </div>
              <div className="blogListColumn3">
                <div className="myStoreHeading3"> Status</div>
              </div>
            </div>
            {blogs.map((item) => (
              <div className="blogListRowContainer" key={item._id}>
                <div className="blogListColumn1">
                  <div className="blogListRowContainerText">
                    {item.postTitle}
                  </div>
                </div>
                <div className="blogListColumn2">
                  <div className="blogListRowContainerText">
                    {momentDate(item.addedOn)}
                  </div>
                </div>
                <div className="blogListColumn3">
                  <div className="blogListRowContainerText">{item.status}</div>
                  <div
                    className="blogListRowContainerText blogListRowContainerTextEdit"
                    onClick={() => {
                      setTempBlog(item);
                      setEditBlog(true);
                    }}
                  >
                    Edit{" "}
                  </div>
                  <div
                    className="blogListRowContainerText blogListRowContainerTextRemove"
                    onClick={() => {
                      tempBlogId.current = item._id;
                      setRemoveBlogModal(true);
                      //  handleRemove(item._id)
                    }}
                  >
                    Remove
                  </div>
                </div>
              </div>
            ))}
            <ConfirmationModal
              modalIsOpen={removeBlogModal}
              setModalIsOpen={setRemoveBlogModal}
              handleOk={handleRemoveBlog}
              headingText={"Remove Blog"}
              text={"Are you sure you want to remove this blog?"}
            />
          </div>
        )}
        {resultType === "Categories" && (
          <div className="bloglistListContainer">
            <div className="blogListHeader">
              <div className="blogListCategoryColumn1">
                <div className="myStoreHeading3"> Name</div>
              </div>
              <div className="blogListCategoryColumn2">
                <div className="myStoreHeading3"> Date</div>
              </div>
            </div>
            {blogCategories.map((item) => (
              <div className="blogListRowContainer" key={item._id}>
                <div className="blogListCategoryColumn1">
                  <div className="blogListRowContainerText">
                    {item.categoryName}
                  </div>
                </div>
                <div className="blogListCategoryColumn2">
                  <div className="blogListRowContainerText">
                    {momentDate(item.addedOn)}
                  </div>
                  <div
                    className="blogListRowContainerText blogListRowContainerTextEditCategory"
                    onClick={() => {
                      setEditCatModal(true);
                      tempBlogCategoryId.current = item._id;
                      setEditCategoryTemporaryValue(item.categoryName);
                    }}
                  >
                    Edit{" "}
                  </div>
                  <div
                    className="blogListRowContainerText blogListRowContainerTextRemove"
                    onClick={() => {
                      tempBlogCategoryId.current = item._id;
                      setRemoveBlogCategoryModal(true);
                      //  handleRemoveBlogCategory(item._id)
                    }}
                  >
                    Remove
                  </div>
                </div>
              </div>
            ))}
            <Modal
              isOpen={addCategoryModal}
              style={addCategoryModalCustomStyles}
            >
              <div className="addCategoryContainer">
                <div className="addFeaturedAssestsContainer">
                  <div className="confirmationModalHeading add-category">Add Category</div>
                  <div
                    className=" confirmationModalHeading confirmationModalCross"
                    onClick={() => setAddCategoryModal(false)}
                  >
                    X
                  </div>
                </div>
                <div className="confirmationModalHeading2 category-name">Category Name</div>
                {addCategoryList.map((item) => (
                  <div className="addCategoryInputContainer" key={item._id}>
                    <div className="formInputContainer formInputContainerAddCategory">
                      <div className="formsInput categoryNameModalform">
                        {item}
                      </div>
                    </div>
                    <div
                      className="addAnotherCategory"
                      onClick={() => handleRemoveCategory(item)}
                    >
                      -
                    </div>
                  </div>
                ))}
                <div className="addCategoryInputContainer">
                  <div className="formInputContainer formInputContainerAddCategory">
                    <input
                      type="text"
                      className="formsInput"
                      placeholder="Category Name Here"
                      value={tempCategory}
                      onChange={(e) => setTempCategory(e.target.value)}
                    />
                  </div>
                  <div
                    className="addAnotherCategory"
                    onClick={() => handleAddMoreCategory(tempCategory)}
                  >
                    +
                  </div>
                </div>
                <div
                  className="addCategoryButtonContainer"
                  onClick={handleCategories}
                >
                  <div className="formsaveButton addCategoryButton">Add</div>
                </div>
              </div>
            </Modal>
            <ConfirmationModal
              modalIsOpen={removeBlogCategoryModal}
              setModalIsOpen={setRemoveBlogCategoryModal}
              handleOk={handleRemoveBlogCategory}
              headingText={"Remove Blog Category"}
              text={"Are you sure you want to remove this blog category?"}
            />
            <Modal
              isOpen={editCatModal}
              style={editCatCustomStyles}
              ariaHideApp={false}
            >
              <div className="addCategoryContainer">
                <div className="addFeaturedAssestsContainer">
                  <div className="confirmationModalHeading">Edit Category</div>
                  <div
                    className=" confirmationModalHeading confirmationModalCross"
                    onClick={() => setEditCatModal(false)}
                  >
                    X
                  </div>
                </div>
                <div className="confirmationModalHeading2">Category Name</div>
                <div
                  className="formInputContainer formInputContainerAddCategory"
                  style={{ width: "97%" }}
                >
                  <input
                    type="text"
                    className="formsInput"
                    placeholder="Category Name Here"
                    value={editCategoryTemporaryValue}
                    onChange={(e) =>
                      setEditCategoryTemporaryValue(e.target.value)
                    }
                  />
                </div>
                <div
                  className="addCategoryButtonContainer"
                  onClick={handleEditBlogCategorySubmit}
                >
                  <div className="formsaveButton addCategoryButton">Done</div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.store.store,
  };
};

export default connect(mapStateToProps)(BlogList);
