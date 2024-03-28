import prisma from "../../prisma.js";

export const registerUser = async (userData) => {
  console.log("SERVER registerUser | ", userData);

  return await prisma.user.create({
    data: userData,
  });
};

/**
 * @description Get user threw prisma from DB
 */
export const getUser = async (userId, includeTolerance = true) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      // Include all relations that we want
      foodpreference: {
        include: {
          Intolerances: includeTolerance, // This line was incorrect
        },
      },
    },
  });
};
