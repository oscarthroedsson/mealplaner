import React, { useState, useEffect } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Homepage/HomePage.jsx";
import MealPlans from "./Pages/Mealplans/MealPlans.jsx";
import Navbar from "./Components/Shared/Navbar/Navbar.jsx";

import ProfileContext from "./context/userContext.jsx";
import { ProfilProvider } from "./Components/Hooks/ProfilProvider.jsx";

export default function App() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ProfilProvider();
      setProfileData(data);
    };

    fetchData();
  }, []);

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

  return (
    <React.StrictMode>
      {profileData && (
        <ProfileContext.Provider value={profileData}>
          <Navbar />
          <RouterProvider router={router} />
        </ProfileContext.Provider>
      )}
    </React.StrictMode>
  );
}
