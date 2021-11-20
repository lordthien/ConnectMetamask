import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardFooter,
  CPagination,
  CSelect,
  CFormText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Reviews = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberClone, setPageNumberClone] = useState(0);
  let data = [
    {
      title: "If You Don't Stop It... You'll Go Blind!!!",
      short_desc:
        "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      author: "Mufinella Chevin",
      rate: 4,
    },
    {
      title: "Cutter, The",
      short_desc:
        "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
      author: "Kennith Amer",
      rate: 5,
    },
    {
      title: "Harry Potter and the Order of the Phoenix",
      short_desc:
        "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
      author: "Anna-diana Kobpal",
      rate: 3,
    },
    {
      title: "Traces of Red",
      short_desc:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      author: "Audry Trigwell",
      rate: 4,
    },
    {
      title: "loudQUIETloud: A Film About the Pixies",
      short_desc:
        "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
      author: "Belvia Saltrese",
      rate: 4,
    },
    {
      title: "Hellsing Ultimate OVA Series",
      short_desc:
        "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      author: "Currey Marlin",
      rate: 5,
    },
    {
      title: "Castle Freak",
      short_desc:
        "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      author: "Averell Dubock",
      rate: 3,
    },
    {
      title: "Miss and the Doctors (Tirez la langue, mademoiselle)",
      short_desc:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      author: "Chelsea Bozward",
      rate: 3,
    },
    {
      title: "Condition Red (Beyond the Law)",
      short_desc:
        "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
      author: "Kiri Brockton",
      rate: 4,
    },
    {
      title: "To Be Twenty",
      short_desc:
        "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      author: "Shauna Duns",
      rate: 5,
    },
  ];
  const postsPerPage = 5;
  const pagesVisited = pageNumberClone * postsPerPage;

  const displayPosts = data
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((item, key) => {
      return (
        <div className="d-flex mb-3" style={{ height: "12rem" }}>
          <img
            src="https://thietkewebchuanseo.com/hoanghung/5/images/Blogging.jpg"
            alt=""
            style={{ height: "100%", objectFit: "cover" }}
          />
          <CCard style={{ width: "100%", marginBottom: "0" }}>
            <CCardHeader style={{ fontWeight: "bold" }}>
              {item.title}
            </CCardHeader>
            <CCardBody className="d-flex justify-content-between align-items-center">
              <div
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {item.short_desc}
              </div>
            </CCardBody>
            <CCardFooter style={{ fontStyle: "italic" }}>
              {item.author} - 12/04/2021 - {item.rate}{" "}
              <CIcon className="mb-1" name="cil-star" />
            </CCardFooter>
          </CCard>
        </div>
      );
    });
  const pageCount = Math.ceil(data.length / postsPerPage);
  const changePage = (selected) => {
    setPageNumber(selected);
    setPageNumberClone(selected - 1);
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>Customer's Review</CCardHeader>
            <CCardBody>
              <div className="mb-3 d-flex">
                <div className="mr-3">
                  <CFormText className="help-block">Sort By Date</CFormText>
                  <CSelect custom name="sortByDate" id="sortByDate">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </CSelect>
                </div>
              </div>
              {displayPosts}
            </CCardBody>
            <CCardFooter>
              <CPagination
                activePage={pageNumber}
                pages={pageCount}
                onActivePageChange={(i) => changePage(i)}
              ></CPagination>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Reviews;
