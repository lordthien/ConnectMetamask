import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CValidFeedback,
  CInvalidFeedback,
  CSpinner,
} from "@coreui/react";
import React from "react";
import UpFileImage from "../../../reusable/UpFile";

function StaffForm({
  modal,
  setModal,
  avatar,
  setAvatar,
  staff,
  handleInput,
  createStatus,
  createStaff,
  updateStaff,
  loading,
  onCancel,
}) {
  return (
    <div>
      {loading ? (
        <CModal
          show={modal}
          onClose={setModal}
          size="lg"
          style={{ padding: "3rem", textAlign: "center" }}
        >
          <CModalBody>
            <CSpinner
              color="warning"
              variant="grow"
              style={{ width: "4rem", height: "4rem" }}
            />
          </CModalBody>
        </CModal>
      ) : (
        <CModal
          show={modal}
          onClose={setModal}
          size="lg"
          style={{ padding: "1rem" }}
        >
          {createStatus ? (
            <CModalHeader closeButton>Create Staff</CModalHeader>
          ) : (
            <CModalHeader closeButton>Edit Staff</CModalHeader>
          )}
          <CModalBody>
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
                        value={staff.name}
                        onChange={(e) => handleInput(e)}
                        placeholder="Enter Staff's Name..."
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
                      <CLabel htmlFor="username">Username</CLabel>
                      <CInput
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter Staff's Username..."
                        value={staff.username}
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
                        placeholder="Enter Staff's Email..."
                        value={staff.email}
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
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="address">Address</CLabel>
                      <CInput
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter Staff's Address..."
                        required
                        value={staff.address}
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
                </CCol>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="salary">Salary</CLabel>
                      <CInput
                        type="text"
                        id="salary"
                        name="salary"
                        placeholder="Enter Staff's Salary..."
                        required
                        value={staff.salary}
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
                </CCol>
                <CCol sm="12">
                  <CForm className="was-validated">
                    <CFormGroup>
                      <CLabel htmlFor="startWorkingDate">
                        Start Working Date
                      </CLabel>
                      <CInput
                        type="date"
                        id="startWorkingDate"
                        name="startWorkingDate"
                        value={staff.startWorkingDate}
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
              </CRow>
            </CForm>
          </CModalBody>
          <CModalFooter>
            {createStatus ? (
              <CButton color="primary" onClick={() => createStaff()}>
                Create
              </CButton>
            ) : (
              <CButton color="primary" onClick={() => updateStaff()}>
                Submit
              </CButton>
            )}
            <CButton
              color="secondary"
              onClick={() => {
                setModal();
                onCancel();
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </div>
  );
}

export default StaffForm;
