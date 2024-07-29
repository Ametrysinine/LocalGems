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
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import GemList from "./components/GemList";
import Explore from "./components/Explore";
import MyGems from "./components/MyGems";


//Note - Rendering multiple components on the same app level requires a function like this
const LandingPageComponents = () => (
  <>
    <LandingHeader />
    <LandingFeatures />
  </>
);


const router = createBrowserRouter([

  // ------ LocalGems React router paths ------ 
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/",  element: <LandingPageComponents />},
      { path: "/login", element: <LoginForm />},
      { path: "/sign-up", element: <SignUpForm />},
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