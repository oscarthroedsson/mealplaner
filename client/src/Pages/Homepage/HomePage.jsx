//Components

import PrimeButton from "../../Components/Shared/Buttons/PrimeButton.jsx";
import UserModal from "../../Components/Modals/UserModal.jsx";

//functions
import { useState } from "react";
import { doesCookieUser } from "../../config/cookies/cookie_config.js";
import { createMealplan } from "../../Api/mealpan_Api.js";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../../Components/Shared/Toaster/Toaster.jsx";

// hooks
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  /*
  Checks in cookies if the user have used our page before, if so we take userinfo out. 

  */

  async function handleClick() {
    const userData = await doesCookieUser();

    console.log("doesUserExist: ", userData);

    if (userData) {
      const response = await createMealplan(userData);
      console.log("response: ", response);
      const mealplan = response.data;

      const boolean = Boolean(mealplan);
      console.log("BOOLEAN: ", boolean);
      if (mealplan) {
        console.log("should navigate to Mealplans");
        navigate("/mealplans");
      }
    } else {
      setShowModal(!showModal);
    }
  }

  return (
    <>
      <main>
        <Toaster />
        <section className="text-center space-y-4">
          <h1>FREE MEALPLAN GENERATOR</h1>
          <p className="pb-2">
            Achieve your health goals with our personalized meal plans tailored to your energy needs. Use our free meal
            plan generator to create a customized plan that aligns with your preferences. Health has never been tastier!
          </p>
          <PrimeButton
            textContent="Generate meal plan"
            onClick={() => {
              handleClick();
            }}
          />
        </section>
        {showModal && <UserModal onClose={() => setShowModal(false)} />}
      </main>
    </>
  );
}
