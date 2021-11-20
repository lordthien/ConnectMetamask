/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { lazy, useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import * as Type from "../../reusable/Constant";

const axios = require("axios");

const getInfo = async () => {
  const [userName, setUserName] = useState("");
  const [public_key, setPublic_key] = useState("");
  await axios({
    method: "get",
    url: `${Type.Url}/auth/info`,
    headers: {
      Authorization: `Bearer ${Type.token}`,
    },
  }).then((res) => {
    console.log("res: ", res);
    if (res && res.status === 200) {
      setUserName(res.username);
      setPublic_key(res.public_key);
    }
  });
};

const Dashboard = () => {
  // useEffect(() => {
  //   getInfo();
  // }, []);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">
                      <CIcon name="cil-people" />
                    </th>
                    <th>User</th>
                    <th>Public Key</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img
                          src={"avatars/1.jpg"}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                    </td>

                    <td>
                      <div className="clearfix">
                        {/* <div className="float-left">
                          <strong>{userName}</strong>
                        </div> */}
                        <div>userName</div>
                        {/* <div className="float-right">
                          <small className="text-muted">
                            Jun 11, 2015 - Jul 10, 2015
                          </small>
                        </div> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
