import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/ModifyRecord";
import RecordList from "./components/RecordList";
import "./index.css";

const router = createBrowserRouter([

  // ------------------ LocalGems React router paths ------------------------- 


  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element: <RecordList />,
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