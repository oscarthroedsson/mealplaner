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

/*
# Hur jag vill att den ska se ut
*/
export const numOfMeals = (numOfMeals) => {
  switch (numOfMeals) {
    case 1:
      return {
        value: 1,
        meals: ["main course"],
      };
    case 2:
      return {
        value: 2,
        meals: ["breakfast", "dinner"],
      };
    case 3:
      return {
        value: 3,
        meals: ["breakfast", "lunch", "dinner"],
      };
    case 4:
      return {
        value: 4,
        meals: ["breakfast", "lunch", "snack", "dinner"],
      };
    case 5:
      return {
        value: 5,
        meals: ["breakfast", "snack", "lunch", "snack", "dinner"],
      };
    case 6:
      return {
        value: 6,
        meals: ["breakfast", "snack", "lunch", "snack", "dinner", "snack"],
      };
    default:
      return {
        value: 4,
        meals: ["breakfast", "lunch", "snack", "dinner"],
      };
  }
};
