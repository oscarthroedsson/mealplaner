//Components

import PrimeButton from "../../Components/Shared/Buttons/PrimeButton.jsx";
import UserModal from "../../Components/Modals/UserModal.jsx";

//functions
import { useState } from "react";
import { doesCookieUser } from "../../config/cookies/cookie_config.js";
import { createMealplan } from "../../Api/mealpan_Api.js";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  async function handleClick() {
    const doesUserExist = await doesCookieUser();

    console.log("doesUserExist: ", doesUserExist);

    if (doesUserExist) {
      alert("User does exist");
      await createMealplan(doesUserExist);
      // todo ✏️ | skapa kostplan
      // todo ✏️ | redirect till kostplanen -> validera kostplan i json, ok? -> Bygg meal plans sidan -> Connecta att man får sin kostplan när man kommer in på mealplans
      //!     ⛔️ | Innan du connectar ska kostplanen som skapas läggas in i mongo
    } else {
      setShowModal(!showModal);
    }
  }

  return (
    <>
      <main>
        <section className="text-center space-y-4">
          <h1>FREE MEALPLAN GENERATOR</h1>
          <p className="pb-2">
            Achieve your health goals with our personalized meal plans tailored
            to your energy needs. Use our free meal plan generator to create a
            customized plan that aligns with your preferences. Health has never
            been tastier!
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
      {}
    </>
  );
}
