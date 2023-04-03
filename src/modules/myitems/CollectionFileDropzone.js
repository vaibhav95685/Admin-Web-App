import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// const [bannerCdn, setbannerCdn] = useState("");
// const [bannerIpfs, setbannerIpfs] = useState("");
import { useDropzone } from "react-dropzone";
// import Image from "../../assets/images/img-format.svg";

import { addIpfs } from "../../utility/global";
// import getCollection from "../../services/contentMicroservice";
// import { Oval } from "react-loader-spinner";
import { FaCloudUploadAlt } from "react-icons/fa";
import styled from "styled-components";

const DropAndDrag=styled.p`
font: normal normal normal 14px/21px Poppins;
text-align: left;
margin: 0px;
padding: 0px;
font: normal normal normal 14px/21px Poppins;
letter-spacing: 0px;
color: #333333;
`;

function parseResponse(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}

let checkFile = "image";

function CollectionFileDropzone({
  bannerCdn,
  setbannerIpfs,
  setbannerCdn,
  bannerIpfs,
  setCompressedUrl,
  setExtension,
  config,
  setPreviewLogoImage,
}) {
  const [isBannerSelected, setisBannerSelected] = useState(false);
  const [isloader, setisLoader] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: config.accept,
    maxSize: config.size,
    onDrop: (acceptedFiles, fileRejections) => {
      setisLoader(true);
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error("Image file size should be less than 10 mb");
            setisLoader(false);
            return;
          } else if (err.code === "file-invalid-type") {
            toast.error(
              "File type not acceptable. Please use JPG,JPEG, PNG, GIF file"
            );
            setisLoader(false);
            return;
          } else {
            toast.error("Image file size should be greater than ……. pxl");
            setisLoader(false);
            return;
          }
        });
      });

      acceptedFiles.map((file) => {
        console.log(file, "<<<File Type");

        if (config.accept.includes("video") || config.accept.includes("audio"))
          setExtension(file.type);

        setFileType(file.type);
        checkFile = file.type;
      });

      let formData = new FormData();
      formData.append(
        "attachment",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )[0]
      );
      // const [err, ipfsRes] = addIPFS(formData)

      (async () => {
        const [err, ipfsRes] = await parseResponse(addIpfs(formData));
        if (!ipfsRes.ipfsUrl) {
          //   toast.error("unable to upload image");
          setisLoader(false);
          return;
        } else {
          // alert("banner");

          console.log(ipfsRes, "<<<<ipfs Res");

          setbannerIpfs(ipfsRes.ipfsUrl);

          if (checkFile.includes("video") || checkFile.includes("audio")) {
            setbannerCdn(ipfsRes.cdnUrl);
          } else {
            setFileUrl(ipfsRes.cdnUrl);
            setPreviewLogoImage(ipfsRes.cdnUrl);            
          }
          setbannerCdn(ipfsRes.cdnUrl);
          setCompressedUrl(ipfsRes.compressedURL);
          setisLoader(false);
          setisBannerSelected(true);
        }
      })();
    },
  });

  return (
    <>
      {" "}
      <div>
        {!isBannerSelected && (
          <div className="img-sec-div" {...getRootProps()}>
            <input onChange={(e) => {}} {...getInputProps()} name="banner" />

            {!isloader ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                  <FaCloudUploadAlt className="draganddropboxIcon" />

                <div>
                    
                  <DropAndDrag>   Drag and Drop or <span style={{ color: `#016DD9`,font:`normal normal 600 14px/21px Poppins` }}>Browse</span> </DropAndDrag>
                  
                </div>
              </div>
            ) : (
              <div className="">
                {" "}
                <p>Loading...</p>
              </div>
            )}
          </div>
        )}
        {isBannerSelected && fileType.includes("image") && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner" />
            {!isloader ? (
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={fileUrl != "" ? fileUrl : ""}
                alt="upload-icon"
                className="upload-icon"
              />
            ) : (
              <div className="">
                {" "}
                <p>Loading...</p>
              </div>
            )}
          </div>
        )}

        {isBannerSelected && fileType.includes("video") && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner" />
            {!isloader ? (
              <video
                style={{
                  width: "100%",
                  background: "#E7E7E7 0% 0% no-repeat padding-box",
                }}
                controls
              >
                <source src={bannerCdn} type="video/mp4" />
              </video>
            ) : (
              <div className="">
                {" "}
                <p>Loading...</p>
              </div>
            )}
          </div>
        )}

        {isBannerSelected && fileType.includes("audio") && (
          <div className="img-sec-div" {...getRootProps()}>
            <input {...getInputProps()} name="banner" />
            {!isloader ? (
              <audio
                controls
                controlslist="nodownload"
                loop
                preload="auto"
                style={{
                  width: "100%",
                  background: "#E7E7E7 0% 0% no-repeat padding-box",
                }}
              >
                <source src={bannerCdn} />
              </audio>
            ) : (
              <div className="">
                {" "}
                <p>Loading...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CollectionFileDropzone;
