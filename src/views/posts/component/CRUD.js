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
} from "@coreui/react";
import UpFileImage from "../../../reusable/UpFile";
import Editor from "../../../reusable/CKEditor";

function Form({
  blog,
  handleChange,
  thumbnail,
  setThumbnail,
  content,
  setContent,
}) {
  return (
    <CForm className="form__partner">
      <CRow>
        <CCol sm="12">
          <CLabel htmlFor="thumbnail">Thumbnail</CLabel>
          <UpFileImage
            productPictureElement={thumbnail}
            setProductPictureElement={setThumbnail}
          />
        </CCol>
        <CCol sm="12">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="title">Title</CLabel>
              <CInput
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title..."
                value={blog.title}
                onChange={(e) => handleChange(e)}
                required
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid title
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="12">
          <CFormGroup>
            <CLabel htmlFor="description">Description</CLabel>
            <CInput
              type="text"
              id="description"
              name="description"
              placeholder="Enter Description..."
              value={blog.description}
              onChange={(e) => handleChange(e)}
            />
          </CFormGroup>
        </CCol>
        <CCol sm="12">
          <CLabel htmlFor="description">Content</CLabel>
          <Editor content={content} setContent={setContent} />
        </CCol>
      </CRow>
    </CForm>
  );
}

export default Form;
