import prisma from "../../prisma.js";

export const addFoodpreferenceToUser = async (foodprefData) => {
  console.log(
    "SERVER | Services | addFoodpreferenceToUser | foodprefData: ",
    foodprefData
  );

  const addedPreference = await prisma.foodpreference.create({
    data: {
      user: {
        connect: {
          id: foodprefData.userId, //userID
        },
      },
      pref_MealModels: foodprefData.pref_MealModels,
      meals_PerDayIs: foodprefData.meals_PerDayIs,
      pref_CookingTimeIs: foodprefData.pref_CookingTimeIs,
      Intolerances: {
        create: foodprefData.intolerances.map((name) => ({
          name,
        })),
      },
    },
  });

  console.log("addedPreference: ", addedPreference);

  return addedPreference;
};

export const getFoodPreference = async (userId) => {
  console.log("getFoodPreference | userId: ", userId);
  return await prisma.foodpreference.findUniqueOrThrow({
    where: {
      userId: userId,
    },
    include: {
      Intolerances: true,
    },
  });
};
