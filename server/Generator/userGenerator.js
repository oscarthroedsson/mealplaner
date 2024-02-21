export const userGenerator = (inputData) => {
  console.log("userGenerator");

  try {
    console.log("userGenerator | BEFORE: ", inputData);
    const user = {
      first_name: String(inputData.firstNameIs),
      last_name: String(inputData.lastNameIs),
      age: Number(inputData.ageIs),
      email: inputData.emailIs,
      isMale: inputData.isMale,
      useImperial: inputData.useImperial,
      height: inputData.height,
      weight: Number(inputData.weightIs),
      health_goal: inputData.goalIs,
      goal_tempo: Number(inputData.getGoalTempo),
      activity_level: parseFloat(inputData.activityLevel),
      bmr: Math.floor(Number(inputData.bmr)),
      energy_intake: Math.floor(Number(inputData.energyIntake)),
    };
    console.log("userGenerator | AFTER: ", user);

    return user;
  } catch (err) {
    return {
      status: "Error",
      Message: `Something went wrong while validating your data`,
      Error: err,
    };
  }
};
