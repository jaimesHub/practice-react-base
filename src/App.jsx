import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import Contact from "./pages/contact";
import BookPage from "./pages/book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { callFetchAccount } from "./services/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import AdminPage from "./pages/admin";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { message } from "antd";
import './styles/reset.scss';


const Layout = () => {
  return (
    <>
      <div className="layout-app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector(state => state.account.user);
  const userRole = user.role;

  return (
    <>
      <div className="layout-app">
        {isAdminRoute && userRole === "ADMIN" && <Header />}
        <Outlet />
        {isAdminRoute && userRole === "ADMIN" && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  const getAccount = async () => {
    if (window.location.pathname === "/login"
      || window.location.pathname === "/register"
      || window.location.pathname === "/"
    ) return;

    const res = await callFetchAccount();

    console.log(">>> res: ", res);

    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    } else {
      message.error("You need to login first");
    }
  }

  // each F5, FE will call getAccount()
  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "book",
          element: <BookPage />
        },
      ]
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          )
        },
        {
          path: "user",
          element: <Contact />
        },
        {
          path: "book",
          element: <BookPage />
        },
      ]
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />
    }
  ]);

  return (
    <>
      {
        isAuthenticated ||
          window.location.pathname === "/" ||
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ?
          <RouterProvider router={router} /> :
          <Loading />
      }
    </>
  );
};
