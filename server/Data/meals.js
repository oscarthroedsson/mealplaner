/**
 * @description Returns an object containing meal types and their respective split percentages based on the given number of meals.
 * @param {number} numOfMeals - The number of meals to consider.
 * @returns {Array<Object>|Array<string>} An array of objects representing meal types and split percentages if the number of meals is 1 to 6. If the number of meals is not within this range, returns an array of strings representing generic meal types.
 */

export const meals = (numOfMeals, energyNeed) => {
  switch (numOfMeals) {
    case 1:
      return [
        {
          type: "main course",
          split: 0.15,
          amount: energyNeed ? Number(energyNeed) * 0.15 : null,
        },
      ];
    case 2:
      return [
        {
          type: "breakfast",
          split: 0.15,
          amount: energyNeed ? Number(energyNeed) * 0.15 : null,
        },
        {
          type: "dinner",
          split: 0.35,
          amount: energyNeed ? Number(energyNeed) * 0.35 : null,
        },
      ];
    case 3:
      return [
        {
          type: "breakfast",
          split: 0.2,
          amount: energyNeed ? Number(energyNeed) * 0.2 : null,
        },
        {
          type: "lunch",
          split: 0.4,
          amount: energyNeed ? Number(energyNeed) * 0.4 : null,
        },
        {
          type: "dinner",
          split: 0.4,
          amount: energyNeed ? Number(energyNeed) * 0.4 : null,
        },
      ];
    case 4:
      return [
        {
          type: "breakfast",
          split: 0.15,
          amount: energyNeed ? Number(energyNeed) * 0.15 : null,
        },
        {
          type: "lunch",
          split: 0.35,
          amount: energyNeed ? Number(energyNeed) * 0.35 : null,
        },
        {
          type: "snack",
          split: 0.15,
          amount: energyNeed ? Number(energyNeed) * 0.15 : null,
        },
        {
          type: "dinner",
          split: 0.35,
          amount: energyNeed ? Number(energyNeed) * 0.35 : null,
        },
      ];
    case 5:
      [
        {
          type: "breakfast",
          split: 0.25,
          amount: energyNeed ? Number(energyNeed) * 0.25 : null,
        },
        {
          type: "lunch",
          split: 0.25,
          amount: energyNeed ? Number(energyNeed) * 0.25 : null,
        },
        {
          type: "snack",
          split: 0.125,
          amount: energyNeed ? Number(energyNeed) * 0.125 : null,
        },
        {
          type: "dinner",
          split: 0.25,
          amount: energyNeed ? Number(energyNeed) * 0.25 : null,
        },
        {
          type: "snack",
          split: 0.125,
          amount: energyNeed ? Number(energyNeed) * 0.125 : null,
        },
      ];
      break;
    case 6:
      return [
        {
          type: "breakfast",
          split: 0.25,
          amount: energyNeed ? Number(energyNeed) * 0.25 : null,
        },
        {
          type: "lunch",
          split: 0.25,
          amount: energyNeed ? Number(energyNeed) * 0.25 : null,
        },
        {
          type: "snack",
          split: 0.1,
          amount: energyNeed ? Number(energyNeed) * 0.1 : null,
        },
        {
          type: "dinner",
          split: 0.25,
          amount: energyNeed ? Number(energyNeed) * 0.25 : null,
        },
        {
          type: "snack",
          split: 0.1,
          amount: energyNeed ? Number(energyNeed) * 0.1 : null,
        },
        {
          type: "snack",
          split: 0.1,
          amount: energyNeed ? Number(energyNeed) * 0.1 : null,
        },
      ];
    default:
      return ["breakfast", "lunch", "snack", "dinner"];
  }
};
