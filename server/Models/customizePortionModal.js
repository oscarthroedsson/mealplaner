export function customizePortionModal(mealplan, typeOfMeal) {
  console.log("🥫 customizePortionModal was run");
  console.log("👴🏼 | OLD MEALPLAN: ", mealplan);

  // TODO | Kolla vilka keys som ska gångas och vad som ska loopas

  // Loopa igenom varje måltidstyp (breakfast, lunch, snack, dinner)
  Object.keys(mealplan).forEach((mealType, index) => {
    // Hämta recepten för den aktuella måltidstypen
    const recipes = mealplan[mealType];

    recipes.forEach((key) => {
      key.nutrients.calories *= typeOfMeal[index].split;
      key.nutrients.protein *= typeOfMeal[index].split;

      // 🍞 | Handle carbs
      if (key.nutrients.carbs) {
        key.nutrients.carbs.total *= typeOfMeal[index].split;
        key.nutrients.carbs.sugars.amount *= typeOfMeal[index].split;
      }

      // 🧀 | Handle fat
      if (key.nutrients.fat) {
        parseFloat((key.nutrients.fat.total *= typeOfMeal[index].split));
        key.nutrients.fat.saturatedFat.amount *= typeOfMeal[index].split;
      }

      if (key.nutrients.cholesterol) {
        key.nutrients.cholesterol.amount *= typeOfMeal[index].split;
      }

      // 🍒 | Handle vitamins
      if (key.nutrients.vitamins) {
        key.nutrients.vitamins.forEach((vitamin) => {
          vitamin.amount *= typeOfMeal[index].split;
          vitamin.amount = parseFloat(vitamin.amount.toFixed(2));
        });
      }

      // 🥕 | Handle ingridient
      if (key.nutrients.ingridients) {
        key.nutrients.ingridients.forEach((ingridient) => {
          ingridient.amount.imperial.amount = "hej";

          ingridient.amount.metric.amount = typeOfMeal[index].split;
          ingridient.amount.metric.amount = parseFloat(ingridient.amount.metric.amount).toFixed(2);
        });
      }
    });
    // 🚦 | End of Object.keys...
  });

  console.log("🏁 | NEW MEALPLAN: ", mealplan);
  return mealplan;
}
