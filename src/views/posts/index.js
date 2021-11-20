import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CModal,
  CSpinner,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CRUD from "./component/CRUD";
import CIcon from "@coreui/icons-react";
import * as Type from "../../reusable/Constant";
const axios = require("axios");
const fields = [
  {
    key: "thumbnail",
    label: "Thumbnail",
    sorter: false,
    filter: false,
    _style: { width: "12%" },
  },
  "title",

  {
    key: "description",
    label: "Description",
    _style: { width: "50%" },
  },
  {
    key: "edit",
    label: "",
    sorter: false,
    filter: false,
  },
];
const Partners = () => {
  const [blogList, setBlogList] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [createStatus, setCreateStatus] = useState(true);
  const [thumbnail, setThumbnail] = useState({
    formFile: "",
    VirtualPath: "",
  });
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });
  const getAllBlog = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/store/allPosts`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setBlogList(res.data.posts);
      }
    });
  };
  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };
  const createBlog = () => {
    if (blog.title !== "") {
      setModal(true);
      setLoading(true);
      const formData = new FormData();
      formData.append("thumbnail", thumbnail.formFile);
      formData.append("title", blog.title);
      formData.append("author", sessionStorage.getItem("storeName"));
      formData.append("description", blog.description);
      formData.append("content", content);
      axios({
        method: "post",
        url: `${Type.Url}/store/createPost`,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
        data: formData,
      }).then(() => {
        getAllBlog();
        setModal(false);
        setLoading(false);
      });
    }
  };
  const editBlog = (item) => {
    setModal(true);
    setBlog(item);
    if (item.thumbnail)
      setThumbnail({
        ...thumbnail,
        VirtualPath: item.thumbnail,
      });
    setContent(item.content);
    setCreateStatus(false);
  };
  const onSubmitEdit = () => {
    if (blog.title !== "") {
      setModal(true);
      setLoading(true);
      const formData = new FormData();
      if (thumbnail.formFile !== "")
        formData.append("thumbnail", thumbnail.formFile);
      formData.append("title", blog.title);
      formData.append("author", sessionStorage.getItem("storeName"));
      formData.append("description", blog.description);
      formData.append("content", content);
      axios({
        method: "patch",
        url: `${Type.Url}/store/editPost?id=${blog._id}`,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
        data: formData,
      }).then(() => {
        setCreateStatus(true);
        getAllBlog();
        setModal(false);
        setLoading(false);
      });
    }
  };
  const deleteBlog = (_id) => {
    setModal(true);
    setLoading(true);
    axios({
      method: "delete",
      url: `${Type.Url}store/deletePost`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
      data: { id: _id },
    }).then(() => {
      getAllBlog();
      setModal(false);
      setLoading(false);
    });
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  console.log("blogList", blogList);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-end">
                <div className="btn btn-primary" onClick={() => setModal(true)}>
                  Add New Blog
                </div>
              </div>
              <CDataTable
                columnFilter
                tableFilter
                items={blogList}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  thumbnail: (item, index) => {
                    if (item.thumbnail !== "")
                      return (
                        <img
                          alt=""
                          src={item.thumbnail}
                          className="img-fluid"
                          style={{ padding: "1.5rem" }}
                        ></img>
                      );
                    else
                      return (
                        <img
                          alt=""
                          src="https://via.placeholder.com/150"
                          className="img-fluid"
                          style={{ padding: " 1.5rem" }}
                        ></img>
                      );
                  },
                  edit: (item, index) => {
                    return (
                      <td className="py-2" style={{ textAlign: "center" }}>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            editBlog(item);
                          }}
                        >
                          <CIcon name="cilPencil" className="mr-1" />
                          Edit
                        </CButton>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            deleteBlog(item._id);
                          }}
                        >
                          <CIcon name="cilTrash" className="mr-1" />
                          Delete
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={modal} size="xl" centered>
        {loading ? (
          <CModalBody
            className="d-flex justify-content-center"
            style={{ padding: "3rem" }}
          >
            <CSpinner
              color="warning"
              variant="grow"
              style={{ width: "4rem", height: "4rem" }}
            />
          </CModalBody>
        ) : (
          <>
            <CModalBody
              className="d-flex justify-content-center"
              style={{ padding: "3rem" }}
            >
              <CRUD
                blog={blog}
                handleChange={(e) => handleChange(e)}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                content={content}
                setContent={setContent}
              />
            </CModalBody>
            <CModalFooter>
              {createStatus ? (
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={() => createBlog()}
                >
                  <CIcon name="cil-scrubber" /> Create
                </CButton>
              ) : (
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={() => onSubmitEdit()}
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
              )}
              <CButton
                type="reset"
                size="sm"
                color="danger"
                className="ml-3"
                onClick={() => setModal(false)}
              >
                <CIcon name="cil-ban" /> Cancel
              </CButton>
            </CModalFooter>
          </>
        )}
      </CModal>
    </>
  );
};

export default Partners;
