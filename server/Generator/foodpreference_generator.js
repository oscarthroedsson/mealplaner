export const foodPreferenceGenerator = (inputData) => {
  console.log("inputData: ", inputData);
  try {
    const foodpreference = {
      userId: 666,
      pref_MealModels: inputData.prefMealModels,
      meals_PerDayIs: inputData.mealsPerDayIs,
      pref_CookingTimeIs: inputData.prefCookingTimeIs,
      intolerances: inputData.tagsIs,
    };

    return user;
  } catch (err) {
    return {
      status: "Error",
      Message: `Something went wrong while validating your data`,
      Error: err,
    };
  }
};
