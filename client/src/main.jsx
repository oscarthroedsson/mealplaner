import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage.jsx";
import MealPlans from "./Pages/Mealplans/MealPlans.jsx";
import Navbar from "./Components/Shared/Navbar/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "mealplans",
    element: <MealPlans />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
