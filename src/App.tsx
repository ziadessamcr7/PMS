/** @format */

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import RequestReset from "./Components/RequestReset/RequestReset";
import ResetPassword from "./Components/DynamicInputs/ResetPassword";
import VerifyUser from "./Components/VerifyUser/VerifyUser";
import Notfound from "./Shared/NotFound/Notfound";
import MasterLayout from "./Shared/MasterLayout/MasterLayout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Projects from "./Components/Projects/Projects";
import Users from "./Components/Users/Users";
import Tasks from "./Components/Tasks/Tasks";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";

function App() {
  let { userData }: any = useContext(AuthContext);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "request-reset", element: <RequestReset /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-user", element: <VerifyUser /> },
        { path: "forgot-password", element: <ForgetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute userData={userData}>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "projects", element: <Projects /> },
        { path: "users", element: <Users /> },
        { path: "tasks", element: <Tasks /> },
        { path: "add-project", element: <AddProject /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
