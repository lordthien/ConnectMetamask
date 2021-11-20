import React from "react";
import {
  CInput,
  CForm,
  CFormGroup,
  CSelect,
  CValidFeedback,
  CInvalidFeedback,
} from "@coreui/react";
function ServiceForm({
  name,
  iconString,
  setName,
  setIconString,
  createServiceType,
  setAddServiceType,
  createStatus,
  updateServiceType,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <CForm className="was-validated mt-4 mr-3" style={{ width: "100%" }}>
        <CFormGroup>
          <CInput
            type="text"
            placeholder="Enter Service Type's name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <CInvalidFeedback className="help-block">
            Please provide a valid information
          </CInvalidFeedback>
          <CValidFeedback className="help-block">Input provided</CValidFeedback>
        </CFormGroup>
      </CForm>
      <CForm className="was-validated mt-4" style={{ width: "100%" }}>
        <CFormGroup>
          <CSelect
            custom
            value={iconString}
            onChange={(e) => setIconString(e.target.value)}
            required
          >
            <option value="cut">Cut Hair</option>
            <option value="broom">Broom</option>
            <option value="th-large">Other</option>
          </CSelect>
          <CInvalidFeedback className="help-block">
            Please provide a valid information
          </CInvalidFeedback>
          <CValidFeedback className="help-block">Input provided</CValidFeedback>
        </CFormGroup>
      </CForm>
      {createStatus ? (
        <div
          className="btn btn-warning ml-2 mb-2"
          onClick={() => createServiceType()}
        >
          o
        </div>
      ) : (
        <div
          className="btn btn-warning ml-2 mb-2"
          onClick={() => updateServiceType()}
        >
          o
        </div>
      )}
      <div
        className="btn btn-danger ml-2 mb-2"
        onClick={() => setAddServiceType(false)}
      >
        x
      </div>
    </div>
  );
}

export default ServiceForm;
