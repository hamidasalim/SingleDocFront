
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import UserList from "views/UserList.js";
import PatientList from "views/PatientList";
import SecretaryList from "views/SecretaryList";
import AppointmentList from "views/AppointmentList";
import AppointmentListUser from "views/AppointmentListUser";
import MessageInterface from "views/MessageInterface";
import ChatList from "views/ChatList";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    roles: ["doctor", "secretary", "patient", "user"] // Example roles allowed to access the route

  },
  {
    path: "/list/appointment",
    name: "Appointment List",
    icon: "nc-icon nc-notes",
    component: AppointmentList,
    layout: "/admin",
 roles: ["doctor", "secretary"] // Example roles allowed to access the route
  },
  {
    path: "/list/user",
    name: "User List",
    icon: "nc-icon nc-notes",
    component: UserList,
    layout: "/admin",
 roles: ["doctor"] // Example roles allowed to access the route
  },
  {
    path: "/list/patient",
    name: "Patient List",
    icon: "nc-icon nc-notes",
    component: PatientList,
    layout: "/admin",
 roles: ["doctor"] // Example roles allowed to access the route
  },
  {
    path: "/list/secretary",
    name: "Secretary List",
    icon: "nc-icon nc-notes",
    component: SecretaryList,
    layout: "/admin",
 roles: ["doctor"] // Example roles allowed to access the route
  },

  {
    path: "/appointmentlist",
    name: "My Appointment List",
    icon: "nc-icon nc-notes",
    component: AppointmentListUser,
    layout: "/admin",
 roles: ["patient"] // Example roles allowed to access the route
  },
  {
    path: "/messageinterface",
    name: "Messages",
    icon: "nc-icon nc-notes",
    component: MessageInterface,
    layout: "/admin",
 roles: ["doctor", "patient"] // Example roles allowed to access the route
  },
  {
    path: "/chatlist",
    name: "Chat List",
    icon: "nc-icon nc-notes",
    component: ChatList,
    layout: "/admin",
 roles: ["doctor"] // Example roles allowed to access the route
  },


];

export default dashboardRoutes;
 


