export const getNutritionDetails = async (id) => {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json${apiKey}`
    );

    if (res.ok) {
      const nutrient = await res.json();
      await delay(500);

      return nutrient;
    } else {
      console.log("getNutritionDetails | Error, something went wrong");
      //res.send svar
    }
  } catch (err) {
    console.log("getNutritionDetails | Couldn´t fetch API", err);
  }
};
