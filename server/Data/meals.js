// Exportera funktionen så den kan användas i andra filer
export const meals = (numOfMeals) => {
  switch (numOfMeals) {
    case 1:
      return ["main course"];
    case 2:
      return ["breakfast", "dinner"];
    case 3:
      return ["breakfast", "lunch", "dinner"];
    case 4:
      return ["breakfast", "lunch", "snack", "dinner"];
    case 5:
      return ["breakfast", "snack", "lunch", "snack", "dinner"];
    case 6:
      return ["breakfast", "snack", "lunch", "snack", "dinner", "snack"];
    default:
      return ["breakfast", "lunch", "snack", "dinner"];
  }
};

export const mealsTwo = (numOfMeals) => {
  switch (numOfMeals) {
    case 1:
      return [
        {
          type: "main course",
          split: 0.15,
        },
      ];
    case 2:
      return [
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "dinner",
          split: 0.35,
        },
      ];
    case 3:
      return [
        {
          type: "breakfast",
          split: 0.2,
        },
        {
          type: "lunch",
          split: 0.4,
        },
        {
          type: "dinner",
          split: 0.4,
        },
      ];
    case 4:
      return [
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "lunch",
          split: 0.35,
        },
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "breakfast",
          split: 0.35,
        },
      ];
    case 5:
      //! räkna ut fördelningen
      [
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "lunch",
          split: 0.35,
        },
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "breakfast",
          split: 0.35,
        },
        {
          type: "breakfast",
          split: 0.35,
        },
      ];
      break;
    case 6:
      //! räkna ut fördelningen
      return [
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "lunch",
          split: 0.35,
        },
        {
          type: "breakfast",
          split: 0.15,
        },
        {
          type: "breakfast",
          split: 0.35,
        },
        {
          type: "breakfast",
          split: 0.35,
        },
      ];
    default:
      return ["breakfast", "lunch", "snack", "dinner"];
  }
};
