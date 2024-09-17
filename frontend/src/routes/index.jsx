import Login from "../pages/account/login";
import Home from "../pages/home";
import { useRoutes } from "react-router-dom";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return routeElements;
}
