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
import LayoutAdmin from "./components/Admin/LayoutAdmin";


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

export default function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async () => {
    if (window.location.pathname === "/login"
      || window.location.pathname === "/register"
    ) return;

    const res = await callFetchAccount();

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
        !isLoading || //
          window.location.pathname === "/" ||
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ?
          <RouterProvider router={router} /> :
          <Loading />
      }
    </>
  );
};
