import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import * as Type from "../../reusable/Constant";
import UpFileImage from "../../reusable/UpFile";
const axios = require("axios");
const Photos = () => {
  const [listPhoto, setListPhoto] = useState([]);
  const [createStatus, setCreateStatus] = useState(true);
  const [imageId, setImgId] = useState("");
  const [avatar, setAvatar] = useState({
    formFile: "",
    VirtualPath: "",
  });
  const getAllPhotos = () => {
    axios({
      method: "get",
      url: `${Type.Url}/store/allPhotos`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setListPhoto(res.data.store);
      }
    });
  };
  const uploadImg = () => {
    const formData = new FormData();
    formData.append("photos", avatar.formFile);
    axios({
      method: "patch",
      url: `${Type.Url}/store/uploadPhotos`,
      data: formData,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setCreateStatus(true);
        getAllPhotos();
        setAvatar({
          formFile: "",
          VirtualPath: "",
        });
      }
    });
  };
  // const updateImg = () => {
  //   const formData = new FormData();
  //   formData.append("photos", avatar.formFile);
  //   axios({
  //     method: "patch",
  //     url: `${Type.Url}/store/uploadPhotos`,
  //     data: formData,
  //     headers: {
  //       Authorization: `Bearer ${Type.token}`,
  //     },
  //   }).then((res) => {
  //     if (res && res.status === 200) {
  //       setCreateStatus(true)
  //       getAllPhotos();
  //       setAvatar({
  //         formFile: "",
  //         VirtualPath: "",
  //       });
  //     }
  //   });
  // };
  const deleteImg = () => {
    axios({
      method: "delete",
      url: `${Type.Url}/store/deletePhoto`,
      data: { id: imageId },
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setCreateStatus(true);
        getAllPhotos();
        setAvatar({
          formFile: "",
          VirtualPath: "",
        });
      }
    });
  };
  useEffect(() => {
    getAllPhotos();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <UpFileImage
                productPictureElement={avatar}
                setProductPictureElement={setAvatar}
              />
              <div className="d-flex justify-content-center mt-4">
                {createStatus ? (
                  <div className="btn btn-primary" onClick={() => uploadImg()}>
                    Upload
                  </div>
                ) : (
                  <div className="d-flex">
                    {/* <div
                      className="btn btn-primary mr-3"
                      onClick={() => updateImg()}
                    >
                      Submit
                    </div> */}
                    <div
                      className="btn btn-danger mr-3"
                      onClick={() => deleteImg()}
                      style={{ color: "#fff" }}
                    >
                      Delete
                    </div>
                    <div
                      className="btn btn-warning"
                      onClick={() => {
                        setCreateStatus(false);
                        setAvatar({
                          formFile: "",
                          VirtualPath: "",
                        });
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-1">
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <CRow>
                {listPhoto.map((item) => (
                  <CCol xs={3}>
                    <div
                      onClick={() => {
                        setCreateStatus(false);
                        setAvatar({
                          VirtualPath: item.url,
                        });
                        setImgId(item._id);
                      }}
                    >
                      <img
                        src={Type.Url + item.url}
                        alt=""
                        className="img-fluid mb-3"
                        style={{ height: "18rem", objectFit: "cover" }}
                      />
                    </div>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Photos;
