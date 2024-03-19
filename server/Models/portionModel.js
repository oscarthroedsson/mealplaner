/**
 * @description Takes in an object en re-construct it so the obj is more user friendlys
 * @param {object} nutrient an object from the nutrition-details API
 * @param {number} servings number of servings on the orginial recipe
 * @returns obj with adjusted nutrient values of one portion
 */

export function portionModel(nutrient, servings) {
  return {
    calories: Math.round(Number(nutrient.calories)),
    protein: Math.round(Number(nutrient.protein.split(/(?<=\d)(?=[a-z])/i)[0] / servings)),
    carbs: {
      total: Math.round(Number(nutrient.carbs.split(/(?<=\d)(?=[a-z])/i)[0]) / servings),
      sugars: {
        amount:
          Number(nutrient.bad.find((sugars) => sugars.title === "Sugar").amount.split(/(?<=\d)(?=[a-z])/i)[0]).toFixed(
            2
          ) / servings,
        type: nutrient.bad.find((sugers) => sugers.title === "Sugar").amount.split(/(?<=\d)(?=[a-z])/i)[1],
      },
    },
    fat: {
      total: Math.round(Number(nutrient.fat.split(/(?<=\d)(?=[a-z])/i)[0] / servings).toFixed(2)),
      saturatedFat: {
        amount:
          Number(
            nutrient.bad
              .find((saturatedFat) => saturatedFat.title === "Saturated Fat")
              .amount.split(/(?<=\d)(?=[a-z])/i)[0]
          ).toFixed(2) / servings,
        type: nutrient.bad
          .find((saturatedFat) => saturatedFat.title === "Saturated Fat")
          .amount.split(/(?<=\d)(?=[a-z])/i)[1],
      },
    },
    cholesterol: {
      amount:
        Number(
          nutrient.bad.find((cholesterol) => cholesterol.title === "Cholesterol").amount.split(/(?<=\d)(?=[a-z])/i)[0]
        ).toFixed(2) / servings,
      type: nutrient.bad
        .find((cholesterol) => cholesterol.title === "Cholesterol")
        .amount.split(/(?<=\d)(?=[a-z])/i)[1],
    },

    vitamins: nutrient.nutrients
      .filter((vitamin) => {
        return (
          vitamin.name !== "Calories" &&
          vitamin.name !== "Fat" &&
          vitamin.name !== "Carbohydrates" &&
          vitamin.name !== "Net Carbohydrates" &&
          vitamin.name !== "Sugar" &&
          vitamin.name !== "Cholesterol" &&
          vitamin.name !== "Protein" &&
          vitamin.name !== "Saturated Fat"
        );
      })
      .map((vitamin) => {
        return {
          name: vitamin.name,
          amount: Math.round(vitamin.amount / servings),
          unit: vitamin.unit,
        };
      }),
  };
}
