import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInvalidFeedback,
  CValidFeedback,
  CSelect,
} from "@coreui/react";
import * as Type from "../../reusable/Constant";
import UpFileImage from "../../reusable/UpFile";

const axios = require("axios");

const SetupSalon = () => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [avatar, setAvatar] = useState({
    formFile: "",
    VirtualPath: "",
  });
  const [dataSalon, setDataSalon] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    openTime: "",
    closeTime: "",
    email: "",
    password: "",
    storeType: "",
  });
  const [storeType, setStoreType] = useState([]);
  const getSalonInfor = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/store/me`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        var temp = res.data.store.openTime.split(" ").join("").split("-");
        setDataSalon({
          ...dataSalon,
          ...res.data.store,
          openTime: temp[0],
          closeTime: temp[1],
        });
        setAvatar({
          ...avatar,
          VirtualPath: res.data.store.avatar,
        });
      }
    });
  };
  const getStoreType = () => {
    axios({
      method: "get",
      url: `${Type.Url}/manager/allStoreTypes`,
    }).then((res) => {
      if (res && res.status === 200) {
        setStoreType(res.data.storeTypes);
      }
    });
  };
  useEffect(() => {
    getSalonInfor();
    getStoreType();
  }, []);
  const handleInput = (e) => {
    e.persist();
    setDataSalon({
      ...dataSalon,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const onGetSetupData = async () => {
    if (
      dataSalon.name !== "" ||
      dataSalon.address !== "" ||
      dataSalon.phoneNumber !== "" ||
      dataSalon.openTime !== "" ||
      dataSalon.closeTime !== "" ||
      dataSalon.email !== 0 ||
      dataSalon.password !== 0 ||
      dataSalon.storeType !== 0
    ) {
      const formData = new FormData();
      formData.append("name", dataSalon.name);
      if (avatar.formFile !== "") formData.append("avatar", avatar.formFile);
      formData.append("address", dataSalon.address);
      formData.append("phoneNumber", dataSalon.phoneNumber);
      formData.append(
        "openTime",
        dataSalon.openTime + " - " + dataSalon.closeTime
      );
      formData.append("description", "");
      formData.append("createdDate", dataSalon.createdDate);
      formData.append("email", dataSalon.email);
      formData.append("password", dataSalon.password);
      formData.append("storeType", dataSalon.storeType);
      await axios({
        method: "patch",
        url: `${Type.Url}/store/editStoreInformation`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getSalonInfor();
          setEnableEdit(false);
        }
      });
    }
  };
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardBody>
            <div className="d-flex justify-content-end">
              <CButton
                color="warning"
                className="m-2"
                type="submit"
                onClick={() => setEnableEdit(!enableEdit)}
                style={{ color: "#fff" }}
              >
                Edit
              </CButton>
            </div>

            <CForm className="form__partner">
              <CRow>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="name">Name</CLabel>
                      <CInput
                        type="text"
                        id="name"
                        name="name"
                        disabled={enableEdit ? false : true}
                        value={dataSalon.name}
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter Your Name..."
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCol>
                <CCol sm="12">
                  <CFormGroup>
                    <CLabel htmlFor="address">Address</CLabel>
                    <CInput
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter Your Address..."
                      disabled={enableEdit ? false : true}
                      value={dataSalon.address}
                      onChange={(e) => handleInput(e)}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="phoneNumber">Phone Number</CLabel>
                      <CInput
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter Your phoneNumber..."
                        disabled={enableEdit ? false : true}
                        value={dataSalon.phoneNumber}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCol>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="openTime">Open Time</CLabel>
                      <CInput
                        type="time"
                        id="openTime"
                        name="openTime"
                        placeholder="Enter Your Open Time..."
                        disabled={enableEdit ? false : true}
                        value={dataSalon.openTime}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCol>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="closeTime">Close Time</CLabel>
                      <CInput
                        type="time"
                        id="closeTime"
                        name="closeTime"
                        placeholder="Enter Your Close Time..."
                        disabled={enableEdit ? false : true}
                        value={dataSalon.closeTime}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCol>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="email">Email</CLabel>
                      <CInput
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email..."
                        disabled={enableEdit ? false : true}
                        value={dataSalon.email}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CFormGroup>
                  </CForm>
                </CCol>
                <CCol sm="12">
                  <UpFileImage
                    productPictureElement={avatar}
                    setProductPictureElement={setAvatar}
                  />
                </CCol>
                <CCol sm="12" className="d-flex align-items-center">
                  <CForm className="was-validated" style={{ width: "87%" }}>
                    <CFormGroup>
                      <CLabel htmlFor="password">Password</CLabel>
                      <CInput
                        type={showPass ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter Your Password..."
                        required
                        // style={{ width: "95%" }}
                        disabled={enableEdit ? false : true}
                        value={dataSalon.password}
                        onChange={(e) => handleInput(e)}
                      />
                      <CInvalidFeedback className="help-block">
                        Please provide a valid information
                      </CInvalidFeedback>
                      <CValidFeedback className="help-block">
                        Input provided
                      </CValidFeedback>
                    </CFormGroup>
                  </CForm>
                  <div
                    className={
                      enableEdit
                        ? "btn btn-primary ml-4 mb-2"
                        : "btn btn-primary ml-4 mt-2"
                    }
                    onClick={() => setShowPass(!showPass)}
                  >
                    Show Password
                  </div>
                </CCol>
                <CCol sm="12">
                  <CFormGroup>
                    <CLabel htmlFor="storeType">Store Type</CLabel>
                    {storeType.length > 0 && (
                      <CSelect
                        custom
                        name="storeType"
                        id="storeType"
                        disabled
                        value={dataSalon.storeType}
                        onChange={(e) => handleInput(e)}
                      >
                        <option value={0}>No Service</option>
                        {storeType.map((item) => (
                          <option value={item._id}>{item.title}</option>
                        ))}
                      </CSelect>
                    )}
                  </CFormGroup>
                </CCol>
                {enableEdit && (
                  <CCol sm="12">
                    <CButton
                      color="success"
                      className="m-2"
                      onClick={() => onGetSetupData()}
                    >
                      Save
                    </CButton>
                    <CButton
                      color="danger"
                      className="m-2"
                      onClick={() => setEnableEdit(false)}
                    >
                      Cancel
                    </CButton>
                  </CCol>
                )}
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default SetupSalon;
