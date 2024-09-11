import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login/login";

const Layout = () => {
  return (
    <>
      Main Page
    </>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 Not Found</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
