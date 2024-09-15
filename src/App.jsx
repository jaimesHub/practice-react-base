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
  const getAccount = async () => {
    const res = await callFetchAccount();

    if (res && res.data) {
      console.log(">>> res", res);
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
      errorElement: <div>404 Not Found</div>,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "book",
          element: <BookPage />
        }
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
      <RouterProvider router={router} />
    </>
  );
};
