import "./globals.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { reduxStore } from "../lib/redux";
import RootStoreLayout from "./(store)/layout";
import Notes from "./(store)/store/Notes/page";
import Login from "./Login/page";
import Survey from "./(store)/store/Survey/page";
import Groups from "./(store)/store/Groups/page";
import Lottery from "./(store)/store/Lottery/page";
import Account from "./Account/page";
import SendSms from "./(store)/store/Sendsms/page";
import Tickets from "./(store)/store/Tickets/page";
import Register from "./Register/page";
import AddGroup from "./(store)/store/Groups/AddGroup/page";
import Dashboard from "./(store)/store/Dashboard/page";
import AddSurvey from "./(store)/store/Survey/AddSurvey/page";
import ViewGroup from "./(store)/store/Groups/ViewGroup/[id]/page";
import ViewSurvey from "./(store)/store/Survey/ViewSurvey/[id]/page";
import ViewOccasionalMessage from "./(store)/store/OccasionalMessage/ViewOccasionalMessage/[id]/page";
import ViewTicket from "./store/Tickets/ViewTickets/[id]/page";
import AddTickets from "./(store)/store/Tickets/AddTickets/page";
import AddLottery from "./(store)/store/Lottery/AddLottery/page";
import SendReports from "./(store)/store/SendReports/page";
import AddNotePhone from "./(store)/store/Notes/AddNotePhone/page";
import ChargeAccount from "./(store)/store/ChargeAccount/page";
import DirectPayment from "./(store)/store/DirectPayment/page";
import LotteryResult from "./(store)/store/Lottery/LotteryResult/page";
import FinancialReports from "./(store)/store/FinancialReports/page";
import OccasionalMessage from "./(store)/store/OccasionalMessage/page";
import SupplementaryForm from "./SupplementaryForm/page";
import AddOccasionalMesssage from "./(store)/store/OccasionalMessage/AddOccasionalMessage/page";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./layout";
import ViewNotePhone from "./(store)/store/Notes/ViewNotePhone/[id]/page";
import ShowLotteryWinners from "./(store)/store/Lottery/ShowLotteryWinners/page";
import DepositToTheAccount from "./(store)/store/DepositToTheAccount/page";
import RootAdminLayout from "./(admin)/layout";
import AdminDashboard from "./(admin)/admin/Dashboard/page";
import Setting from "./(admin)/admin/Setting/page";
import UserManagement from "./(admin)/admin/UserManagement/page";
import ManagingTexts from "./(admin)/admin/ManagingTexts/page";
import NotificationManagement from "./(admin)/admin/NotificationManagement/page";
import SmsSendingPanel from "./(admin)/admin/SmsSendingPanel/page";
import AdminTickets from "./(admin)/admin/Tickets/page";
import ListOfPhonebooks from "./(admin)/admin/ListOfPhonebooks/page";
import ListOfPolls from "./(admin)/admin/ListOfPolls/page";
import LotteryList from "./(admin)/admin/LotteryList/page";
import ListOfFinancialReports from "./(admin)/admin/ListOfFinancialReports/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"Login"} replace={true} />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Account",
        element: <Account />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "supplementaryForm",
        element: <SupplementaryForm />,
      },
      {
        path: "store/tickets/viewTicket/:idTicket",
        element: <ViewTicket />,
      },
      {
        path: "/store/",
        element: <RootStoreLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"Dashboard"} replace={true} />,
          },
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "Groups",
            element: <Groups />,
          },
          {
            path: "Groups/AddGroup",
            element: <AddGroup />,
          },
          {
            path: "Groups/ViewGroup/:idGroup",
            element: <ViewGroup />,
          },
          {
            path: "OccasionalMessage",
            element: <OccasionalMessage />,
          },
          {
            path: "OccasionalMessage/AddOccasionalMesssage",
            element: <AddOccasionalMesssage />,
          },
          {
            path: "OccasionalMessage/ViewOccasionalMessage/:idMessage",
            element: <ViewOccasionalMessage />,
          },
          {
            path: "Lottery",
            element: <Lottery />,
          },
          {
            path: "Lottery/AddLottery",
            element: <AddLottery />,
          },
          {
            path: "Lottery/LotteryResult",
            element: <LotteryResult />,
          },
          {
            path: "Lottery/ShowLotteryWinners",
            element: <ShowLotteryWinners />,
          },
          {
            path: "Survey/AddSurvey",
            element: <AddSurvey />,
          },
          {
            path: "Notes",
            element: <Notes />,
          },
          {
            path: "Notes/addNotePhone",
            element: <AddNotePhone />,
          },
          {
            path: "Notes/viewNote/:idNote",
            element: <ViewNotePhone />,
          },
          {
            path: "SendSms",
            element: <SendSms />,
          },
          {
            path: "Survey",
            element: <Survey />,
          },
          {
            path: "Survey/ViewSurvey/:idOpinion",
            element: <ViewSurvey />,
          },
          {
            path: "Tickets",
            element: <Tickets />,
          },
          {
            path: "Tickets/AddTicket",
            element: <AddTickets />,
          },
          {
            path: "SendReports",
            element: <SendReports />,
          },
          {
            path: "FinancialReports",
            element: <FinancialReports />,
          },
          {
            path: "ChargeAccount",
            element: <ChargeAccount />,
          },
          {
            path: "DirectPayment",
            element: <DirectPayment />,
          },
          {
            path: "DepositToTheAccount",
            element: <DepositToTheAccount />,
          },
        ],
      },
      {
        path: "/admin/",
        element: <RootAdminLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"Dashboard"} replace={true} />,
          },
          {
            path: "Dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "Setting",
            element: <Setting />,
          },
          {
            path: "UserManagement",
            element: <UserManagement />,
          },
          {
            path: "ManagingTexts",
            element: <ManagingTexts />,
          },
          {
            path: "NotificationManagement",
            element: <NotificationManagement />,
          },
          {
            path: "SmsSendingPanel",
            element: <SmsSendingPanel />,
          },
          {
            path: "Tickets",
            element: <AdminTickets />,
          },
          {
            path: "ListOfPhonebooks",
            element: <ListOfPhonebooks />,
          },
          {
            path: "ListOfPolls",
            element: <ListOfPolls />,
          },
          {
            path: "LotteryList",
            element: <LotteryList />,
          },
          {
            path: "ListOfFinancialReports",
            element: <ListOfFinancialReports />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
