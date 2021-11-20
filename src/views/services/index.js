import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCardFooter,
  CModal,
  CModalBody,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as Type from "../../reusable/Constant";
import Form from "./components/ServiceForm";

const axios = require("axios");

const fields = [
  "name",
  "description",
  {
    key: "duration",
    label: "Duration ( minutes )",
  },
  "price",
  {
    key: "edit",
    label: "",
    sorter: false,
    filter: false,
  },
];
const Services = () => {
  const [modal, setModal] = useState(false);
  const [createStatus, setCreateStatus] = useState(true);
  const [serviceList, setServiceList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [service, setService] = useState({
    name: "",
    description: "",
    duration: 0,
    price: 0,
    serviceTypeId: "",
  });
  const [thumbnail, setThumbnail] = useState({
    formFile: "",
    VirtualPath: "",
  });
  const handleChange = (e) => {
    e.persist();
    setService({
      ...service,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const getAllService = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/store/allServices`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setServiceList(res.data.services);
      }
    });
    await axios({
      method: "get",
      url: `${Type.Url}/store/allServicesType`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setServiceTypeList(res.data.services);
      }
    });
  };
  const createService = async () => {
    if (service.name !== "" && service.serviceTypeId !== 0) {
      setModal(true);
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("description", service.description);
      formData.append("duration", service.duration);
      formData.append("price", service.price);
      formData.append("thumbnail", thumbnail.formFile);
      formData.append("serviceTypeId", service.serviceTypeId);
      await axios({
        method: "post",
        url: `${Type.Url}/store/createService`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getAllService();
          setModal(false);
          setService({
            name: "",
            description: "",
            duration: 0,
            price: 0,
            serviceTypeId: "",
          });
          setThumbnail({
            formFile: "",
            VirtualPath: "",
          });
        }
      });
    }
  };
  const getEditService = (data) => {
    setCreateStatus(false);
    setService({
      ...service,
      ...data,
    });
    setThumbnail({
      ...thumbnail,
      VirtualPath: data.thumbnail,
    });
  };
  const updateService = async () => {
    if (service.name !== "" && service.serviceTypeId !== 0) {
      setModal(true);
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("description", service.description);
      formData.append("duration", service.duration);
      formData.append("price", service.price);
      formData.append("serviceTypeId", service.serviceTypeId);
      await axios({
        method: "patch",
        url: `${Type.Url}/store/editService?id=${service._id}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getAllService();
          setModal(false);
          setService({
            name: "",
            description: "",
            duration: 0,
            price: 0,
            serviceTypeId: "",
          });
          setThumbnail({
            formFile: "",
            VirtualPath: "",
          });
        }
      });
    }
  };
  const deleteService = async (Id) => {
    setModal(true);
    await axios({
      method: "delete",
      url: `${Type.Url}/store/deleteService`,
      data: { id: Id },
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        getAllService();
        setModal(false);
        setService({
          name: "",
          description: "",
          duration: 0,
          price: 0,
          serviceTypeId: "",
        });
        setThumbnail({
          formFile: "",
          VirtualPath: "",
        });
      }
    });
  };
  useEffect(() => {
    getAllService();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>CRUD Services</CCardHeader>
            <CCardBody>
              <Form
                service={service}
                handleChange={(e) => handleChange(e)}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                serviceTypeList={serviceTypeList}
              />
            </CCardBody>
            <CCardFooter>
              {createStatus ? (
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={() => createService()}
                >
                  <CIcon name="cil-scrubber" /> Create
                </CButton>
              ) : (
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={() => updateService()}
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
              )}
              {createStatus ? (
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  className="ml-3"
                  onClick={() => {
                    setService({
                      name: "",
                      description: "",
                      duration: 0,
                      price: 0,
                    });
                    setCreateStatus(true);
                  }}
                >
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              ) : (
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  className="ml-3"
                  onClick={() => {
                    setService({
                      name: "",
                      description: "",
                      duration: 0,
                      price: 0,
                    });
                    setCreateStatus(true);
                    setThumbnail({
                      formFile: "",
                      VirtualPath: "",
                    });
                  }}
                >
                  <CIcon name="cil-ban" /> Cancel
                </CButton>
              )}
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <CDataTable
                columnFilter
                tableFilter
                items={serviceList}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  edit: (item, index) => {
                    return (
                      <td className="py-2" style={{ textAlign: "center" }}>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            getEditService(item);
                          }}
                        >
                          <CIcon name={"cilPencil"} className="mr-1" />
                          Edit
                        </CButton>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            deleteService(item._id);
                          }}
                        >
                          <CIcon name={"cilTrash"} className="mr-1" />
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
      <CModal show={modal} centered>
        <CModalBody
          className="d-flex justify-content-center"
          style={{ padding: "5rem" }}
        >
          <CSpinner
            color="warning"
            variant="grow"
            style={{ width: "4rem", height: "4rem" }}
          />
        </CModalBody>
      </CModal>
    </>
  );
};

export default Services;
