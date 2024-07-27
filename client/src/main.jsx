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
import Login from "./components/Login"
import SignUp from "./components/SignUp"


const router = createBrowserRouter([

  // ------ LocalGems React router paths ------ 
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingHeader />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
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