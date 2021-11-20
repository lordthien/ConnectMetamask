/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import * as Type from "../../reusable/Constant";

const axios = require("axios");
const Moralis = require("moralis");

const serverUrl = "https://yvn0zfrbtyje.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "NUQx81P6Gp8DE0z4jAS6KdNM141vRQi7pGUkrLu7"; // Application id from moralis.io
Moralis.start({ serverUrl, appId });

const AccountsSalonStaff = () => {
  const [userName, setUserName] = useState("");
  const [public_key, setPublic_key] = useState("");
  const [link, setLink] = useState(false);
  const [data, setData] = useState([]);

  const getAllStaff = () => {
    axios({
      method: "get",
      url: `${Type.Url}/auth/info`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
        // Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((res) => {
      console.log("res: ", res);
      if (res && res.status === 200) {
        setUserName(res.data.username);
        setPublic_key(res.data.public_key);
        setLink(true);
      }
    });
  };

  const upload = () => {
    axios({
      method: "post",
      url: `${Type.Url}/auth/link`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
      data: {
        data: data.data,
        signature: data.signature,
      },
    }).then((res) => {
      console.log("res: ", res);
      if (res && res.status === 200) {
        console.log(res);
      }
    });
  };

  const connectMeta = () => {
    console.log("connectMeta: ", connectMeta);
    Moralis.authenticate().then(function (user) {
      console.log(user.get("ethAddress"));
      // console.log("user" + JSON.stringify(user));
      setData(user.attributes.authData.moralisEth);
      // console.log("data: ", data);
      upload();
    });
  };

  useEffect(() => {
    getAllStaff();
  }, []);
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardBody>
            <CRow>
              {public_key === null && userName !== "" && (
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th>User</th>
                      <th>Public Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>{userName}</div>
                      </td>

                      {/* <td>
                        <div>{public_key}</div>
                      </td> */}
                      <td>
                        <div
                          className="btn btn-primary mb-3"
                          onClick={() => connectMeta()}
                        >
                          Link to Wallet
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {public_key !== null && (
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th>User</th>
                      <th>Public Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>{userName}</div>
                      </td>

                      <td>
                        <div>{public_key}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AccountsSalonStaff;
