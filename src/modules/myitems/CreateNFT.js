import { React, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import MyCollectionPopUp from "./MyCollectionPopUp";
import MyNftPopup from "./MyNftPopup";

const HeadingSection = styled.div``;
const HeadingTittle = styled.label`
  text-align: left;
  font: normal normal bold 18px/27px Poppins;
  letter-spacing: 0px;
  color: #191919;
  opacity: 1;
`;

const FileDiv = styled.div`
  margin-top: 42px;
  width: 100%;
`;

const DropFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 341px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  opacity: 1;
`;
const DropFileCollection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 241px;
  width: 241px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  opacity: 1;
  margin-bottom: 2em;
`;
const DropFileBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 341px;
  /* UI Properties */
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c8c8c8;
  border-radius: 7px;
  opacity: 1;
`;
const DropDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DropImage = styled.img``;
const DropTitle = styled.label`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #333333;
`;
const UploadFile = styled.label`
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal 600 16px/19px Segoe UI;
  letter-spacing: 0px;
  color: #000000;
  opacity: 1;
`;
const UploadFileHint = styled.label`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  letter-spacing: 0px;
  color: #333333;
  opacity: 1;
`;

const Fields = styled.div`
  width: 100%;
`;

const ContainerFirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 22px;
`;
const ContainerSecond = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-top: 28px;
`;
const TitleField = styled.label`
  letter-spacing: var(--unnamed-character-spacing-0);
  text-align: left;
  font: normal normal bold 16px/25px Poppins;
  letter-spacing: 0px;
  color: #191919;
  opacity: 1;
`;
const InputField = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d0d0d0;
  border-radius: 7px;
  opacity: 1;
  height: 42px;
`;
const TextAreaField = styled.textarea`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d0d0d0;
  border-radius: 7px;
  opacity: 1;
`;
const SelectField = styled.select`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d0d0d0;
  border-radius: 7px;
  opacity: 1;
  height: 42px;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: 42px;
  margin-bottom: 43px;
  float: right;
`;
const Button = styled.div`
  background: #016dd9 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  color: white;
  font: normal normal 600 16px/25px Poppins;
  padding: 9px 41px 8px 42px;
`;

const CreateNFT = ({ createNFTActive, setcreateNFTActive, location }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [blockchainOption, setBlockchainOption] = useState([]);
  const [blockchains, setBlockChains] = useState([]);
  const [files, setFiles] = useState([]);
  const [saveActive, setSaveActive] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxSize: "30485760",
    onDrop: (acceptedFiles, fileRejections) => {
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error("Image file size should be less than 30 mb");
            return;
          } else if (err.code === "file-invalid-type") {
            toast.error(
              "File type not acceptable. Please use JPG,JPEG,PNG, SVG file"
            );
            return;
          } else {
            toast.error("Image file size should be greater than 136*40 pixel");
            return;
          }
        });
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      acceptedFiles.length > 0 ? setLogoPresent(true) : setLogoPresent(false);
      setSaveActive(true);
    },
  });

  const images = files.map((file) => (
    <div key={file.name} className="previewImageDragandDrop">
      <img src={file.preview} alt="preview" style={{ borderRadius: "12px" }} />
    </div>
  ));

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

  return (
    <>
      {location === "My NFTs" && (
        <div>
          <Modal
            isOpen={createNFTActive}
            style={createCategoryCustomStyles}
            ariaHideApp={false}
          >
            <MyNftPopup setcreateNFTActive={setcreateNFTActive} key="popup_1" />
          </Modal>
        </div>
      )}

      {location === "My Collections" && (
        <div>
          <Modal
            isOpen={createNFTActive}
            style={createCategoryCustomStyles}
            ariaHideApp={false}
          >
            <MyCollectionPopUp
              setcreateNFTActive={setcreateNFTActive}
              key="2"
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default CreateNFT;
