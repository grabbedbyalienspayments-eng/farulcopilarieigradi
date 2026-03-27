import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Inscrieri from "../pages/inscrieri/page";
import AfterSchool from "../pages/afterschool/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/inscrieri",
    element: <Inscrieri />,
  },
  {
    path: "/after-school",
    element: <AfterSchool />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
