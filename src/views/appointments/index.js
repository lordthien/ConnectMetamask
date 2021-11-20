import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import * as Type from "../../reusable/Constant";
import moment from "moment";

const axios = require("axios");

const AppointmentsPage = () => {
  const [resources, setResources] = useState([
    {
      fieldName: "members",
      title: "Members",
      allowMultiple: true,
      instances: [],
    },
  ]);
  const [appointments, setAppointments] = useState([]);
  const getAllStaff = () => {
    axios({
      method: "get",
      url: `${Type.Url}/store/allStaffs`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        var staffClone = {
          fieldName: "members",
          title: "Members",
          allowMultiple: true,
          instances: [],
        };
        res.data.staffs.forEach((item) => {
          staffClone.instances.push({
            id: item._id,
            text: item.name,
          });
        });
        setResources([staffClone]);
      }
    });
  };
  const getAllBooking = () => {
    axios({
      method: "get",
      url: `${Type.Url}/store/allBooks`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        var bookingClone = [];
        res.data.books.forEach((item) => {
          var day = 0;
          var time = 0;
          if (item.schedule) {
            day = item.schedule.split("T")[0];
            time = item.schedule.split("T")[1];
          }
          var hours = Math.floor(item.totalDuration / 60);
          var minutes = item.totalDuration % 60;
          bookingClone.push({
            title: item.status,
            startDate: new Date(
              day === 0 ? day : parseInt(day.split("-")[0]),
              day === 0 ? day : parseInt(day.split("-")[1]) - 1,
              day === 0 ? day : parseInt(day.split("-")[2]),
              time === 0 ? time : parseInt(time.split(":")[0]),
              time === 0 ? time : parseInt(time.split(":")[1])
            ),
            endDate: new Date(
              day === 0 ? day : parseInt(day.split("-")[0]),
              day === 0 ? day : parseInt(day.split("-")[1]) - 1,
              day === 0 ? day : parseInt(day.split("-")[2]),
              time === 0
                ? time
                : parseInt(time.split(":")[0]) + parseInt(hours),
              time === 0
                ? time
                : parseInt(time.split(":")[1]) + parseInt(minutes)
            ),
            id: item._id,
            members: [item.staff._id],
          });
        });
        setAppointments(bookingClone);
      }
    });
  };
  useEffect(() => {
    getAllStaff();
    getAllBooking();
  }, []);
  const [currentDate, setCurrentDate] = useState(moment());
  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <Scheduler data={appointments}>
                <ViewState
                  currentDate={currentDate}
                  onCurrentDateChange={currentDateChange}
                />
                <WeekView startDayHour={0} endDayHour={19} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <AppointmentTooltip />
                <Resources data={resources} mainResourceName="members" />
              </Scheduler>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AppointmentsPage;
