import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import * as Type from "../../../reusable/Constant";
const axios = require("axios");

function StaffForm({ modal, setModal, idStaff }) {
  const [listServices, setListServices] = useState([]);
  const [service, setService] = useState([]);
  const [addService, setAddService] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const getStaffById = async () => {
    var serviceClone = [];
    await axios({
      method: "get",
      url: `${Type.Url}/store/staffById?id=${idStaff}`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    })
      .then((res) => {
        if (res && res.status === 200) {
          setService(res.data.staff.services);
          serviceClone = res.data.staff.services;
        }
      })
      .then(async () => {
        await axios({
          method: "get",
          url: `${Type.Url}/store/allServices`,
          headers: {
            Authorization: `Bearer ${Type.token}`,
          },
        }).then((res) => {
          if (res && res.status === 200) {
            var arrayClone = res.data.services.filter(
              ({ _id: id1 }) =>
                !serviceClone.some(({ _id: id2 }) => id2 === id1)
            );
            setListServices(arrayClone);
          }
        });
      });
  };
  const addServiceToStaff = async () => {
    await axios({
      method: "patch",
      url: `${Type.Url}/store/addServiceToStaff?id=${idStaff}`,
      data: { serviceId: serviceId },
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setAddService(false);
        getStaffById();
        setServiceId("");
      }
    });
  };
  const removeServiceFromStaff = async (Id) => {
    await axios({
      method: "patch",
      url: `${Type.Url}/store/removeServiceFromStaff?id=${idStaff}`,
      data: { serviceId: Id },
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setAddService(false);
        getStaffById();
        setServiceId("");
      }
    });
  };
  useEffect(() => {
    getStaffById();
  }, [idStaff]);
  return (
    <div>
      <CModal
        show={modal}
        onClose={() => {
          setModal();
          setAddService(false);
        }}
        style={{ padding: "1rem" }}
      >
        <CModalHeader closeButton>List Services</CModalHeader>
        <CModalBody>
          <div
            className="btn btn-primary mb-3"
            onClick={() => setAddService(true)}
          >
            Add Service
          </div>
          {service.length > 0 &&
            service.map((item) => (
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>{item.name}</div>
                <div
                  className="btn btn-danger"
                  onClick={() => removeServiceFromStaff(item._id)}
                >
                  x
                </div>
              </div>
            ))}
          {addService && (
            <div className="d-flex justify-content-between align-items-center">
              {listServices.length > 0 && (
                <CSelect
                  custom
                  name="service"
                  id="service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  <option value={0}>No Service</option>
                  {listServices.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </CSelect>
              )}
              <div
                className="btn btn-warning ml-2"
                onClick={() => addServiceToStaff()}
              >
                o
              </div>
              <div
                className="btn btn-danger ml-2"
                onClick={() => setAddService(false)}
              >
                x
              </div>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setModal();
              setAddService(false);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default StaffForm;
