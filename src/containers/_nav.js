import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Salon Owner"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Appointment",
    to: "/appointments",
    icon: "cil-calendar",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Clients",
    to: "/clients",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Staffs",
    to: "/staffs",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Reviews",
    to: "/reviews",
    icon: "cil-paper-plane",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Posts",
    to: "/post",
    icon: "cil-speech",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Services",
    to: "/services",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Services Type",
    to: "/services-type",
    icon: "cil-paper-plane",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Photos",
    to: "/photos",
    icon: "cil-calendar",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Setup",
    to: "/setup",
    icon: "cil-moon",
  },
];

export default _nav;
