import React, { useRef } from "react";
import { CButton } from "@coreui/react";
import * as Type from "./Constant";
const UpFileTerm = ({ productPictureElement, setProductPictureElement }) => {
  const fileInputIcon = useRef(null);

  const uploadIcon = (event) => {
    if (event.target.files && event.target.files[0]) {
      productPictureElement.formFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        productPictureElement.VirtualPath = e.target.result;
        setProductPictureElement({ ...productPictureElement });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <img
        src={
          productPictureElement.VirtualPath === ""
            ? "https://via.placeholder.com/150"
            : productPictureElement.VirtualPath.trim().substr(0, 4) === "data"
            ? `${productPictureElement.VirtualPath}`
            : `${Type.Url}${productPictureElement.VirtualPath}`
        }
        alt=""
        className="img-thumbnail"
        style={{ width: "100px", height: "100px" }}
      />
      <div className="d-flex align-items-center">
        <input
          ref={fileInputIcon}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => uploadIcon(e)}
        />
        <CButton
          onClick={() => fileInputIcon.current.click()}
          className="ml-3"
          variant="contained"
          style={{
            backgroundColor: "rgb(54, 175, 27)",
            color: "rgb(255, 255, 255)",
            height: "50%",
          }}
        >
          <div className="d-flex">Upload picture</div>
        </CButton>
      </div>
    </div>
  );
};

export default UpFileTerm;
