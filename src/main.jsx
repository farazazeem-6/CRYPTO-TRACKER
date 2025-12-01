import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout/Layout.jsx";
import Banner from "./Pages/Banner.jsx";
import Coin from "./Pages/Coin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./store/store.js";

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/coin/:id",
        element: <Coin />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={appRoute} />
  </Provider>
);
