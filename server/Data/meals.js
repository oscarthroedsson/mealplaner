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
