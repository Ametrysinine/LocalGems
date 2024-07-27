import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App";

import Record from "./components/ModifyRecord";
import RecordList from "./components/RecordList";

// ------ Import Localgems components to render in our router ------ 
import LandingHeader from "./components/LandingHeader"
import LandingFeatures from "./components/LandingFeatures";
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import MyGems from "./components/MyGems";
import Explore from "./components/Explore";


const router = createBrowserRouter([

  // ------ LocalGems React router paths ------ 
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",  element: <LandingHeader />},
      { path: "/login", element: <Login />},
      { path: "/sign-up", element: <SignUp />},
      { path: "/my-gems", element: <MyGems />},
      { path: "/explore", element: <Explore />}
    ]
  },

  // ------------------ Initial react router paths ------------------------- 
  {
    path: "/mongoDB_record",
    element: <App />,
    children: [
      {
        path: "/mongoDB_record",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/mongoDB_record/edit/:id",
    element: <App />,
    children: [
      {
        path: "/mongoDB_record/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/mongoDB_record/create",
    element: <App />,
    children: [
      {
        path: "/mongoDB_record/create",
        element: <Record />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);