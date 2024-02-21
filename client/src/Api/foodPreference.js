/**
Handles all API-CALLS related to foodpreference
 */

export const registerFoodPreference = async (preferenceData) => {
  console.log("registerFoodPreference | preferenceData: ", preferenceData);
  const response = await fetch(`http://localhost:3000/foodpreference/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferenceData),
  });
  const user = await response.json();

  console.log("client | registerUser | ", user);
};
