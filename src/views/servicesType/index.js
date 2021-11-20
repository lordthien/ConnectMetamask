import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CSpinner,
} from "@coreui/react";
import ServiceForm from "./components/ServiceForm";
import * as Type from "../../reusable/Constant";

const axios = require("axios");
const Services = () => {
  const [modal, setModal] = useState(false);
  const [addServiceType, setAddServiceType] = useState(false);
  const [createStatus, setCreateStatus] = useState(false);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [name, setName] = useState("");
  const [idServiceType, setIdServiceType] = useState("");
  const [iconString, setIconString] = useState("cut");
  const getAllServiceType = async () => {
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
  const createServiceType = async () => {
    if (name !== "") {
      setModal(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("iconString", iconString);
      await axios({
        method: "post",
        url: `${Type.Url}/store/createServiceType`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getAllServiceType();
          setModal(false);
          setName("");
          setAddServiceType(false);
        }
      });
    }
  };
  const updateServiceType = async () => {
    if (name !== "") {
      setModal(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("iconString", iconString);
      await axios({
        method: "patch",
        url: `${Type.Url}/store/editServiceType?id=${idServiceType}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getAllServiceType();
          setModal(false);
          setName("");
          setAddServiceType(false);
          setCreateStatus(false);
        }
      });
    }
  };
  const deleteServiceType = async (Id) => {
    setModal(true);
    await axios({
      method: "delete",
      url: `${Type.Url}/store/deleteServiceType`,
      data: { id: Id },
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        getAllServiceType();
        setModal(false);
      }
    });
  };
  useEffect(() => {
    getAllServiceType();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <div
                className="btn btn-primary mb-3 "
                onClick={() => {
                  setAddServiceType(true);
                  setCreateStatus(true);
                }}
              >
                Add Service
              </div>
              {serviceTypeList.length > 0 &&
                serviceTypeList.map((item) => (
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div
                      onClick={() => {
                        setAddServiceType(true);
                        setIdServiceType(item._id);
                        setIconString(item.iconString);
                        setName(item.name);
                        setCreateStatus(false);
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="btn btn-danger"
                      onClick={() => deleteServiceType(item._id)}
                    >
                      x
                    </div>
                  </div>
                ))}
              {addServiceType && (
                <ServiceForm
                  name={name}
                  iconString={iconString}
                  setName={(e) => setName(e)}
                  setIconString={(e) => setIconString(e)}
                  createServiceType={() => createServiceType()}
                  setAddServiceType={() => setAddServiceType()}
                  createStatus={createStatus}
                  updateServiceType={() => updateServiceType()}
                />
              )}
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
