import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CDataTable, CRow } from "@coreui/react";
import * as Type from "../../reusable/Constant";
const axios = require("axios");
const fields = [
  {
    key: "avatar",
    label: "Avatar",
    _style: { width: "15%" },
    sorter: false,
    filter: false,
  },
  "name",
  "email",
];
const Clients = () => {
  const [customer, setCustomer] = useState([]);
  const getAllCustomer = () => {
    axios({
      method: "get",
      url: `${Type.Url}/store/allCustomers`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        setCustomer(res.data.customers);
      }
    });
  };
  useEffect(() => {
    getAllCustomer();
  }, []);
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardBody>
            <CDataTable
              columnFilter
              tableFilter
              items={customer}
              fields={fields}
              itemsPerPage={5}
              pagination
              sorter
              scopedSlots={{
                avatar: (item, index) => {
                  if (item.thumbnail !== "")
                    return (
                      <td className="table__img">
                        <img
                          alt=""
                          src={Type.Url + "/" + item.avatar}
                          style={{
                            padding: "1.5rem",
                            width: "10rem",
                            height: "10rem",
                          }}
                        ></img>
                      </td>
                    );
                  else
                    return (
                      <td className="table__img">
                        <img
                          alt=""
                          src="https://via.placeholder.com/150"
                          style={{
                            padding: " 1.5rem",
                            width: "10rem",
                            height: "10rem",
                          }}
                        ></img>
                      </td>
                    );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Clients;
