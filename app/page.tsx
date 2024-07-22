import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./globals.scss";
import { Provider } from "react-redux";
import { reduxStore } from "../lib/redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const Login = lazy(() => import("./Login/page"));
const RootLayout = lazy(() => import("./layout"));
const RootStoreLayout = lazy(() => import("./(store)/layout"));
const RootAdminLayout = lazy(() => import("./(admin)/layout"));
const RootusersLayout = lazy(() => import("./(users)/layout"));
const Dashboard = lazy(() => import("./(store)/store/Dashboard/page"));
const DirectPayment = lazy(() => import("./(store)/store/DirectPayment/page"));
const DepositToTheAccount = lazy(
  () => import("./(store)/store/DepositToTheAccount/page")
);
const StoreManagement = lazy(
  () => import("./(admin)/admin/StoreManagement/page")
);
const ViewStore = lazy(
  () => import("./(admin)/admin/StoreManagement/ViewStore/[id]/page")
);
const ViewTicketUsers = lazy(
  () => import("./(users)/users/Tickets/ViewTickets/[id]/page")
);
const StoresTickets = lazy(() => import("./(store)/store/Tickets/page"));
const StoresAddTickets = lazy(
  () => import("./(store)/store/Tickets/AddTickets/page")
);
const ViewTicketStores = lazy(
  () => import("./(store)/store/Tickets/ViewTickets/[id]/page")
);
const FinancialReports = lazy(
  () => import("./(store)/store/FinancialReports/page")
);
const AddSurvey = lazy(() => import("./(store)/store/Survey/AddSurvey/page"));
const Survey = lazy(() => import("./(store)/store/Survey/page"));
const Groups = lazy(() => import("./(store)/store/Groups/page"));
const Lottery = lazy(() => import("./(store)/store/Lottery/page"));
const SendSms = lazy(() => import("./(store)/store/Sendsms/page"));
const ViewSurvey = lazy(
  () => import("./(store)/store/Survey/ViewSurvey/[id]/page")
);
const ShowLotteryWinners = lazy(
  () => import("./(store)/store/Lottery/ShowLotteryWinners/page")
);
const LotteryResult = lazy(
  () => import("./(store)/store/Lottery/LotteryResult/page")
);
const Account = lazy(() => import("./(store)/store/Account/page"));
const Register = lazy(() => import("./Register/page"));
const OtpValid = lazy(() => import("./otp-valid/page"));
const Page404 = lazy(() => import("./[...not-found]/page"));
const SurveyView = lazy(() => import("./store/SurveyView/page"));
const Setting = lazy(() => import("./(admin)/admin/Setting/page"));
const AddAudience = lazy(() => import("./store/AddAudience/page"));
const FailedPayment = lazy(() => import("./store/FailedPayment/page"));
const PasswordRecovery = lazy(() => import("./PasswordRecovery/page"));
const AdminTickets = lazy(() => import("./(admin)/admin/Tickets/page"));
const UsersTickets = lazy(() => import("./(users)/users/Tickets/page"));
const ViewSmsDeTails = lazy(() => import("./admin/viewSmsDetails/page"));
const ListOfPolls = lazy(() => import("./(admin)/admin/ListOfPolls/page"));
const LotteryList = lazy(() => import("./(admin)/admin/LotteryList/page"));
const ViewTicketAdmin = lazy(() => import("./admin/ViewTickets/[id]/page"));
const AdminDashboard = lazy(() => import("./(admin)/admin/Dashboard/page"));
const UsersDashboard = lazy(() => import("./(users)/users/Dashboard/page"));
const NewPassword = lazy(() => import("./PasswordRecovery/NewPassword/page"));
const SuccessfulPayment = lazy(() => import("./store/SuccessfulPayment/page"));
const Registeration = lazy(() => import("./(users)/users/Registeration/page"));
const SurveyResult = lazy(() => import("./store/SurveyView/SurveyResult/page"));
const UserManagement = lazy(
  () => import("./(admin)/admin/UserManagement/page")
);
const Authentication = lazy(
  () => import("./(users)/users/Authentication/page")
);
const SmsSendingPanel = lazy(
  () => import("./(admin)/admin/SmsSendingPanel/page")
);
const ViewSmsDeTailsReport = lazy(
  () => import("./admin/ViewSmsDetailsReport/page")
);
const ListOfGroups = lazy(() => import("./(admin)/admin/ListOfGroups/page"));
const UsersAddTickets = lazy(
  () => import("./(users)/users/Tickets/AddTickets/page")
);
const ViewUser = lazy(
  () => import("./(admin)/admin/UserManagement/ViewUser/[id]/page")
);
const LotteryWinners = lazy(
  () => import("./(admin)/admin/LotteryList/LotteryWinners/page")
);
const ViewSendReport = lazy(
  () => import("./admin/UserManagement/ViewSendReport/[id]/page")
);
const AddOrEditSurvey = lazy(
  () => import("./(admin)/admin/ListOfPolls/AddOrEditSurvey/page")
);
const NotificationManagement = lazy(
  () => import("./(admin)/admin/NotificationManagement/page")
);
const ListOfFinancialReports = lazy(
  () => import("./(admin)/admin/ListOfFinancialReports/page")
);
const ViewGroup = lazy(
  () => import("./(admin)/admin/ListOfGroups/ViewGroup/[id]/page")
);
const SystemDeposit = lazy(
  () => import("./(admin)/admin/ListOfFinancialReports/systemDeposit/page")
);
const ViewListOfFinancialReport = lazy(
  () => import("./admin/UserManagement/ViewListOfFinancialReports/[id]/page")
);

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
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "otp-valid",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <OtpValid />
          </Suspense>
        ),
      },
      {
        path: "PasswordRecovery",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <PasswordRecovery />,
          </Suspense>
        ),
      },
      {
        path: "PasswordRecovery/NewPassword",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <NewPassword />
          </Suspense>
        ),
      },
      {
        path: "Register",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Register />{" "}
          </Suspense>
        ),
      },
      {
        path: "/store/AddAudience",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <AddAudience />
          </Suspense>
        ),
      },
      {
        path: "/store/SuccessfulPayment",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <SuccessfulPayment />,
          </Suspense>
        ),
      },
      {
        path: "/store/FailedPayment",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <FailedPayment />,
          </Suspense>
        ),
      },
      {
        path: "/store/SurveyView/:id",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <SurveyView />
          </Suspense>
        ),
      },
      {
        path: "/store/SurveyView/SurveyResult",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <SurveyResult />
          </Suspense>
        ),
      },
      {
        path: "store/tickets/viewTicket/:idTicket",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewTicketStores />{" "}
          </Suspense>
        ),
      },
      {
        path: "admin/tickets/viewTicket/:idTicket",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewTicketAdmin />,
          </Suspense>
        ),
      },
      {
        path: "users/tickets/viewTicket/:idTicket",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewTicketUsers />,
          </Suspense>
        ),
      },
      {
        path: "admin/UserManagment/ViewSendReport/:idstore",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewSendReport />,
          </Suspense>
        ),
      },
      {
        path: "admin/UserManagment/ViewListOfFinancialReport/:idstore",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewListOfFinancialReport />
          </Suspense>
        ),
      },
      {
        path: "admin/SmsSendingPanel/viewSmsDetails/:idSms",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewSmsDeTails />,
          </Suspense>
        ),
      },
      {
        path: "admin/SmsSendingPanel/viewSmsDetailsReport/:idSmsReport",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <ViewSmsDeTailsReport />,
          </Suspense>
        ),
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
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "Groups",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Groups />
              </Suspense>
            ),
          },
          {
            path: "Lottery",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Lottery />
              </Suspense>
            ),
          },
          {
            path: "Lottery/LotteryResult",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LotteryResult />
              </Suspense>
            ),
          },
          {
            path: "Lottery/ShowLotteryWinners/:id",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ShowLotteryWinners />
              </Suspense>
            ),
          },
          {
            path: "Survey/AddSurvey",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <AddSurvey />
              </Suspense>
            ),
          },
          {
            path: "SendSms",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <SendSms />
              </Suspense>
            ),
          },
          {
            path: "AddAudience",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <AddAudience />
              </Suspense>
            ),
          },
          {
            path: "Survey",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Survey />
              </Suspense>
            ),
          },
          {
            path: "Survey/ViewSurvey/:idOpinion",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ViewSurvey />
              </Suspense>
            ),
          },
          {
            path: "Tickets",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <StoresTickets />
              </Suspense>
            ),
          },
          {
            path: "Tickets/AddTicket",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <StoresAddTickets />
              </Suspense>
            ),
          },
          {
            path: "FinancialReports",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <FinancialReports />
              </Suspense>
            ),
          },
          {
            path: "DirectPayment",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <DirectPayment />
              </Suspense>
            ),
          },
          {
            path: "DepositToTheAccount",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <DepositToTheAccount />
              </Suspense>
            ),
          },
          {
            path: "Account",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Account />
              </Suspense>
            ),
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
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "Setting",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Setting />
              </Suspense>
            ),
          },
          {
            path: "UserManagement",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <UserManagement />
              </Suspense>
            ),
          },
          {
            path: "UserManagement/viewUser/:idUser",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ViewUser />
              </Suspense>
            ),
          },
          {
            path: "StoreManagement",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <StoreManagement />
              </Suspense>
            ),
          },
          {
            path: "StoreManagement/viewStore/:idStore",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ViewStore />
              </Suspense>
            ),
          },
          {
            path: "NotificationManagement",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <NotificationManagement />
              </Suspense>
            ),
          },
          {
            path: "SmsSendingPanel",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <SmsSendingPanel />
              </Suspense>
            ),
          },
          {
            path: "Tickets",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <AdminTickets />
              </Suspense>
            ),
          },
          {
            path: "ListOfGroups",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ListOfGroups />
              </Suspense>
            ),
          },
          {
            path: "ListOfGroups/viewGroup/:idGroup",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ViewGroup />
              </Suspense>
            ),
          },
          {
            path: "ListOfPolls",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ListOfPolls />
              </Suspense>
            ),
          },
          {
            path: "ListOfPolls/AddOrEditSurvey",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <AddOrEditSurvey />
              </Suspense>
            ),
          },
          {
            path: "LotteryList",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LotteryList />
              </Suspense>
            ),
          },
          {
            path: "LotteryList/ShowLotteryWinners/:id",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <LotteryWinners />
              </Suspense>
            ),
          },
          {
            path: "ListOfFinancialReports",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <ListOfFinancialReports />
              </Suspense>
            ),
          },
          {
            path: "ListOfFinancialReports/SystemDeposit",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <SystemDeposit />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/users/",
        element: <RootusersLayout />,
        children: [
          {
            path: "",
            element: <Navigate to={"Dashboard"} replace={true} />,
          },
          {
            path: "Dashboard",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <UsersDashboard />
              </Suspense>
            ),
          },
          {
            path: "Tickets",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <UsersTickets />
              </Suspense>
            ),
          },
          {
            path: "Tickets/AddTicket",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <UsersAddTickets />
              </Suspense>
            ),
          },
          {
            path: "Tickets/AddTicket",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <UsersAddTickets />
              </Suspense>
            ),
          },
          {
            path: "Authentication",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Authentication />
              </Suspense>
            ),
          },
          {
            path: "Registeration",
            element: (
              <Suspense fallback={<div>loading...</div>}>
                <Registeration />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <Page404 />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={reduxStore}>
    <Suspense fallback={<div>loading ...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
