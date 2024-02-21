/*
#Caldulate BMR and energyintake based on activity level
*/

export async function calculateEnergyIntake(user) {
  let bmr = 0;
  let energyIntake = 0;

  const {
    weightIs,
    height,
    ageIs,
    activityLevel,
    getGoalTempo,
    isMale,
    useImperial,
  } = user;

  if (!useImperial) {
    /*
    ✔️ This is validated and compared to othre calculators 
    */
    console.log("räknar metric");
    if (!isMale) {
      // BERÄKNA METRIC FOR FEMALE
      bmr = 655.0955 + 9.5634 * weightIs + 1.8496 * height - 4.6756 * ageIs;
      energyIntake = bmr * activityLevel + getGoalTempo;
    } else {
      // BERÄKNA METRIC FOR MALE
      bmr = parseFloat(
        66.5 + 13.7516 * weightIs + 5.0033 * height - 6.755 * ageIs
      ).toFixed(0);
      energyIntake = parseInt(bmr * activityLevel + getGoalTempo);
    }
    const activity = bmr * activityLevel;
    const total = activity + getGoalTempo;

    console.log("energyIntake: ", energyIntake);
    console.log("activity: ", activity);
    console.log("total: ", total);
  } else {
    //todo validera
    console.log("räknar imperial");
    if (isMale) {
      // BERÄKNA IMPERIAL FOR MALE

      bmr = 66.47 + 6.24 * weightIs + 12.7 * height - 6.755 * ageIs;
      energyIntake = parseInt(bmr * activityLevel + getGoalTempo);
    } else {
      // BERÄKNA IMPERAL FOR FEMALE

      bmr = 65.51 + 4.35 * weightIs + 4.7 * height - 4.7 * ageIs;
      energyIntake = parseInt(bmr * activityLevel + getGoalTempo);
    }
  }

  return { energyIntake: energyIntake, bmr: bmr };
}
