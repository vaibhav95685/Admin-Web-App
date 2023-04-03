import { React, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { BiUpload } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { httpConstants } from "../../constants";
import { getParamTenantId } from "../../utility/global";
import CloseIcon from "../../assets/images/closeIcon.svg";

const createCategoryModal = ({
  createCategoryActive,
  setCreateCategoryActive,
  fetchCategories
}) => {

  const store = useSelector(state=> state.store);
  
  const [loader, setLoader] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const [logoPresent, setLogoPresent] = useState(false);
  const [files, setFiles] = useState([]);
  const categoryName = useRef("");
  const [textareaValue2, setTextareaValue2] = useState("");
  const [error, setError] = useState(false);
  const [message,setMessage]=useState("");

  const handleCategoryInput = (value) => {
    if(value.length <= 30){ 
      setTextareaValue2(value)
      setError(false)
    }else{
      setError('Max allowed characters limit 30')
    }
    
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png,image/svg",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setLogoPresent(true);
    },
    onDropRejected: (error) => {
      toast.info("Non Supported File Format.");
      setLogoPresent(false);
    },
  });
  const images = files.map((file) => (
    <div key={file.name} className="previewImageDragandDrop">
      <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
    </div>
  ));
  const handleUploadAgain = () => {
    setFiles([]);
    setLogoPresent(false);
  };

  const createCategoryCustomStyles = {
    content: {
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      backgroundColor: "#0e1d2c7d",
      position: "absolute",
      top: 0,

      left: 0,
      border: "none",
      borderRadius: 0,
    },
  };
  const handleSubmit = async () => {
    const formData = {
      name: textareaValue2,
      addedBy: storeId
    }
   

    if(textareaValue2.length>2){
      setLoader(true);
      const res = await fetch(
        `${httpConstants.BASE_URL1}/api/v1/category${getParamTenantId()}`,
        {
          method: httpConstants.METHOD_TYPE.POST,
          headers: {      
            "Content-Type": httpConstants.CONTENT_TYPE.APPLICATION_JSON,
            "x-access-token": store?.store.token,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await res.json();
  
      console.log(result, 'result')
  
      if (result.success){ 
        setCreateCategoryActive(false)
        setTextareaValue2("");
        fetchCategories(); 
        setLoader(false);
        setMessage("");
      }else{
        setLoader(false);
        setMessage(result.message);
       
      }

     }
     else{
      if(textareaValue2.length !==0){
        setMessage("Category Name must be 3 character");
      }else{
        setMessage("Enter Category Name");
      }
      
     }    // formData.append("name", textareaValue2);
    // formData.append("addedBy", storeId);
    // formData.append("attachment", files[0]);

   

   
    // const data = {
    //   name: categoryName.current,
    //   imageUrl: ipfsUrl.current,
    // };

    // const addAssetResponse = await addAsset(data, store.token);
    // if (addAssetResponse.success) {
    //   toast.info("Category Added");
      
    //   setcreatedAssetsDropDownData(newDropdown);
    //   setTextareaValue("");
    //   handleUploadAgain();
    //   handleCreateAssests2();
    // } else addAssetResponse.errors.map((item) => toast.info(item.message));
  };

  useEffect(()=>{
    if(store !== null) setStoreId(store?.store?._id);
  }, [JSON.stringify(store)])

  const closeHandler=()=>{
    setCreateCategoryActive(false);
    setLoader(false);
    setMessage("");
    setTextareaValue2("");
  }
  return (
    <>
      <div>
        <Modal
          isOpen={createCategoryActive}
          style={createCategoryCustomStyles}
          ariaHideApp={false}
        >
          <div className="addFeatureAssestsModalContainer">
            <div className="addFeaturedAssestsContainer">
              <div className="confirmationModalHeading">Create Category</div>
              <div
                className=" confirmationModalHeading confirmationModalCross"
                onClick={closeHandler}
              >
                <img src={CloseIcon} className="close-icon-category"/>
              </div>
            </div>
            {/* <div className="myStoreHeading3"> Upload Icon</div> */}
            {/*!logoPresent && (
              <div
                className="draganddropbox addFeatureDropDownModal"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="draganddropboxinnerdiv">
                  <FaCloudUploadAlt className="draganddropboxIcon" />
                  <span className="draganddropboxinnerdivtextspan">
                    Drag and Drop or
                    <span className="draganddropboxinnerdivtextspanbrowse">
                      {" "}
                      Browse
                    </span>
                  </span>
                </div>
              </div>
            )*/}
            {/*logoPresent && (
              <div className="draganddropbox draganddropPreview">{images}</div>
            )*/}
            {/* <div className="formsecondarytext">
              Upload icon in .svg and of size 24x24 px or similar ratio
          </div>*/}

            {/*logoPresent && (
              <div
                className="draganddropboxUploadAgain"
                onClick={handleUploadAgain}
              >
                <BiUpload className="draganddropboxUploadAgainIcon" />
                <div>Upload Again</div>
              </div>
            )*/}
            <div className="myStoreHeading2" style={{marginTop: "2rem"}}> Category name</div>
            <div className="formInputContainer createAssestsInputContainer">
              <input
                type="text"
                className="formsInput"
                placeholder="Enter Category Name"
                onChange={(e) => {
                  categoryName.current = e.target.value;
                  handleCategoryInput(e.target.value);
                }}
                maxlength="50"
                value={textareaValue2}
              />     
                         
            </div>
            <div className="alreadyExistCategory">{message}</div>
            {
              error && <small style={{color: '#ff0000'}}>{error}</small>
              
            }
            <div className="addCategoryButtonContainer" onClick={handleSubmit}>
              <div className="formsaveButton addCategoryButton advanced-setting-category-button">
                {loader ? 'Adding...' : 'Add'}
              </div>
            </div>
          </div>
        </Modal>
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

export default createCategoryModal;
