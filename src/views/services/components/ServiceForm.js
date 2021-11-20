import React from "react";
import {
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CValidFeedback,
  CInvalidFeedback,
  CSelect,
} from "@coreui/react";
import UpFileImage from "../../../reusable/UpFile";
function Form({
  service,
  handleChange,
  thumbnail,
  setThumbnail,
  serviceTypeList,
}) {
  return (
    <CForm className="form__partner">
      <CRow>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="name">Name</CLabel>
              <CInput
                type="text"
                id="name"
                name="name"
                value={service.name}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Service's Name..."
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
        <CCol sm="6">
          <CFormGroup>
            <CLabel htmlFor="description">Description</CLabel>
            <CInput
              type="text"
              id="description"
              name="description"
              placeholder="Enter Service's Description..."
              value={service.description}
              onChange={(e) => handleChange(e)}
            />
          </CFormGroup>
        </CCol>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="duration">Duration</CLabel>
              <CInput
                type="number"
                id="duration"
                min={0}
                name="duration"
                placeholder="Enter Service's Duration..."
                value={service.duration}
                onChange={(e) => handleChange(e)}
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
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="price">Price</CLabel>
              <CInput
                type="number"
                id="price"
                min={0}
                name="price"
                placeholder="Enter Service's Price..."
                value={service.price}
                onChange={(e) => handleChange(e)}
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
        <CCol sm="6">
          <CForm className="was-validated mt-4" style={{ width: "100%" }}>
            <CFormGroup>
              <CLabel htmlFor="serviceTypeId">Service Type</CLabel>
              <CSelect
                custom
                id="serviceTypeId"
                name="serviceTypeId"
                value={service.serviceTypeId}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value={""}>No Type</option>
                {serviceTypeList.length > 0 &&
                  serviceTypeList.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
              </CSelect>
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>

        <CCol sm="6">
          <UpFileImage
            productPictureElement={thumbnail}
            setProductPictureElement={setThumbnail}
          />
        </CCol>
      </CRow>
    </CForm>
  );
}

export default Form;
