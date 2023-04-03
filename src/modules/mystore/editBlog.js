import { React, useMemo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "./styles/addBlog.css";
import { BiArrowBack } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { httpConstants } from "../../constants";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useDropzone } from "react-dropzone";
import { editBlog, getBlogCategories } from "../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from '@mui/material/Tooltip';
import { textAlign } from "@mui/system";
const styles = {
  tooltip: {
      width: "226px",
      borderRadius: "18px",
      fontSize:"14px !important",
      boxShadow: "0 20px 80px 0",
      backgroundColor: "red",
      textAlign:"center",
      backgroundColor: "rgba(97, 97, 97, 0.92) !important"
  }
};
const CustomTooltip = withStyles(styles)(Tooltip);
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // padding: "20px",
  paddingTop: "48px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "240px",
};
const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const EditBlog = ({ store, setEditBlog, tempBlog, setTempBlog }) => {
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [categoryType, setCategoryType] = useState("Select Category");
  const [blogCategories, setBlogCategories] = useState([]);
  const [saveActive, setSaveActive] = useState(false);
  const postTitle = useRef(tempBlog.postTitle);
  const selectedCategoryId = useRef(tempBlog.tenantBlogCategoryId);
  const postTitleInputRef = useRef("");
  const [files, setFiles] = useState([
    {
      name: tempBlog?.coverUrl !="" ? tempBlog.coverUrl :"",
      preview:tempBlog?.coverUrl !="" ?tempBlog ?.coverUrl:""
    }
  ]);
  const cdnUrl = useRef("");


  useEffect(async () => {
    const blogCatRes = await getBlogCategories(setBlogCategories, store.token);
    if (blogCatRes.success) {
      setBlogCategories(blogCatRes.responseData.categoryContent);
    } else toast.info("Internal server error. Please login again and try.");
  }, []);

  console.log(tempBlog, "11111",files);

  useEffect(() => {
    let name = blogCategories.find(
      ({ _id }) => _id === tempBlog.tenantBlogCategoryId
    )?.categoryName;
    if (name) setCategoryType(name);
    else setCategoryType("Select Category");

    return () => {
      name = null;
    };
  }, [blogCategories]);

  const handleDropDown = () => {
    if (categoryDropDown === true) {
      setCategoryDropDown(false);
    } else {
      setCategoryDropDown(true);
    }
  };

  const handleCategory = (_id, name) => {
    setSaveActive(true);
    setCategoryType(name);
    selectedCategoryId.current = _id;
    setCategoryDropDown(false);
  };

  // const handleWhoCanUploadNft = () => {
  //   setCategoryType('Technology');
  //   setCategoryDropDown(false);
  // };
  // const handleWhoCanUploadNft2 = () => {
  //   setCategoryType('Crypto');
  //   setCategoryDropDown(false);
  // };

  const [statusType, setStatusType] = useState("Draft");
  const [statusDropDown, setStatusDropDown] = useState(false);
  const handleDropDown2 = () => {
    if (statusDropDown === true) {
      setStatusDropDown(false);
    } else {
      setStatusDropDown(true);
    }
  };
  const handleWhoCanUploadNft3 = () => {
    setStatusType("Draft");
    setStatusDropDown(false);
  };
  const handleWhoCanUploadNft4 = () => {
    setStatusType("Active");
    setStatusDropDown(false);
  };
  const handleWhoCanUploadNft5 = () => {
    setStatusType("InActive");
    setStatusDropDown(false);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlContent, setHtmlContent] = useState(tempBlog.content);
  const onEditorStateChange = (editorState) => {
    setSaveActive(true);
    setEditorState(editorState);
    sendContent();
  };

  const sendContent = () => {
    getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const getContent = (htmlContentProp) => {
    setHtmlContent(htmlContentProp);
    // console.log(htmlContentProp);
  };

  const handleSubmit = async () => {
    // console.log(htmlContent, "<<< htmlContent");

   

    const data = {
      tenantId:localStorage.getItem('tenantUserId'),
      postTitle: postTitle.current,
      tenantBlogCategoryId: selectedCategoryId.current,
      content: htmlContent,
      coverUrl: cdnUrl.current!=""? cdnUrl.current :tempBlog.coverUrl,
      status:statusType
    };
    console.log(cdnUrl.current)

    const blogRes = await editBlog(tempBlog._id, data, store.token);
    if (blogRes.success) {
      toast.info("Blog edited successfully.");
      postTitleInputRef.current.value = "";
      postTitle.current = "";
      selectedCategoryId.current = "";
      setHtmlContent("");
      setCategoryType("Select Category");
      setEditorState(EditorState.createEmpty());
      setTimeout(() => {
        setEditBlog(false);
      }, 1000);
    } else {
      blogRes.errors.map((item) => toast.info(item.message));
    }

    // if (blogRes) {
    // postTitleInputRef.current.value = '';
    // postTitle.current = '';
    // selectedCategoryId.current = '';
    // setHtmlContent('');
    // setCategoryType('Select Category');
    // setEditorState(EditorState.createEmpty());
    // setAddBlog(false);
    // }
    // console.log(blog, '<<< blog added successfully');
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      let formData = new FormData();
      formData.append("folderName", "blogCover");
      formData.append("createdBy", store._id);
      formData.append("attachment",acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )[0]);

      (async () => {
        const res = await fetch(
          `${httpConstants.BASE_URL2}/api/v1/upload-documents`,
          {
            method: httpConstants.METHOD_TYPE.POST,
            body: formData,
          }
        );
        const result = await res.json();
        if (result.success) cdnUrl.current = result.responseData;
        console.log(result);

      })();

    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));
  function PreviewUrl() {  
    return(
    <div style={thumb}>
      <div style={thumbInner}>
        <img src={tempBlog?.coverUrl} style={img} />
      </div>
    </div>)}
  ;

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div className="addBlogContainer">
        <div className="addBlogHeaderContainer">
          <BiArrowBack
            className="addBlogHeaderIcon"
            onClick={() => setEditBlog(false)}
          />
          <div className="myStoreHeading1">Edit Blog</div>
        </div>
        <div className="container-fluid">
          <p className="thumbnail">Thumbnail</p>
          {/* <div {...getRootProps({ style })} onClick={open}> */}
          <CustomTooltip title="Click to change cover image">

          <div>
            {files?.length === 0 ? (
                      <div
                      className={tempBlog?.length === 0 ? "div-zone" : "div-drop"}
                      onClick={open}
                    >
                {tempBlog?.length === 0 ? (
                  <div>
                    <div style={{ textAlign: "center" }}>
                      <img src="/images/Upload.svg" />
                    </div>
                    <input {...getInputProps()} />
                    <p className="drag-drop">
                      Drag and Drop or{" "}
                      <button className="browse-button">Browse</button>
                    </p>
                  </div>
                ) : (

                    <aside style={thumbsContainer}> <PreviewUrl /> </aside>
       
                 
                )}
              </div>
            ) : (
              <div
              className="div-drop"
              onClick={open}
            >
              <aside style={thumbsContainer}>{thumbs}</aside></div>
            )}
          </div>
          </CustomTooltip>
        </div>
        <div className="formInputContainer formInputContainerAddBlog">
          <input
            ref={postTitleInputRef}
            type="text"
            className="formsInput formsInputAddBlog"
            placeholder="Enter Blog Title"
            defaultValue={tempBlog.postTitle}
            onChange={(e) => {
              setSaveActive(true);
              postTitle.current = e.target.value;
            }}
          />
        </div>
        <div className="addBlogSelectorContainer">
          <div className="addBlogCategorySelector">
            <div className="myStoreHeading3"> Category</div>
            <div onClick={() => handleDropDown()} className="formInputContainer  formInputContainerAdvancedSetting">
              <div>{categoryType}</div>
              <div onClick={() => handleDropDown()}>
                <BsChevronDown className="saleTypeandPricingdowmarrow" />
              </div>
            </div>
            {categoryDropDown && (
              <div className="canUploadDropdown">
                {blogCategories.map((item) => (
                  <div
                    key={item._id}
                    className="canUploadDropdownEach"
                    onClick={() => handleCategory(item._id, item.categoryName)}
                  >
                    {item.categoryName}
                  </div>
                ))}
                {/* <div
                className='canUploadDropdownEach'
                onClick={() => handleWhoCanUploadNft2()}
              >
                Crypto
              </div> */}
              </div>
            )}
          </div>
          <div className="addBlogCategorySelector">
            <div className="myStoreHeading3"> Status</div>
            <div onClick={() => handleDropDown2()} className="formInputContainer  formInputContainerAdvancedSetting">
              <div>{statusType}</div>
              <div onClick={() => handleDropDown2()}>
                <BsChevronDown className="saleTypeandPricingdowmarrow" />
              </div>
            </div>
            {statusDropDown && (
              <div className="canUploadDropdown">
                <div
                  className="canUploadDropdownEach"
                  onClick={() => handleWhoCanUploadNft3()}
                >
                  Draft
                </div>
                <div
                  className="canUploadDropdownEach"
                  onClick={() => handleWhoCanUploadNft4()}
                >
                  Active
                </div>
                <div
                  className="canUploadDropdownEach"
                  onClick={() => handleWhoCanUploadNft5()}
                >
                  InActive
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="myStoreHeading3 myStoreHeading3AddBlog"> Content</div>
        <div className="textEditorContainer">
          <Editor
            // editorState={editorState}
            // editorState={EditorState.createWithContent(
            //   ContentState.createFromBlockArray(
            //     convertFromHTML(tempBlog.content)
            //   )
            // )}
            defaultEditorState={EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(tempBlog.content)
              )
            )}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        {saveActive ? (
          <div className="formsaveButtonContainer" onClick={handleSubmit}>
            <div className="formsaveButton">Save</div>
          </div>
        ) : (
          <div className="formsaveButtonContainer" style={{ opacity: "0.55" }}>
            <div className="formsaveButton">Save</div>
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

export default connect(mapStateToProps)(EditBlog);
