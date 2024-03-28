import { getMealplans } from "../../Api/mealpan_Api";
import { getUser } from "../../Api/user";
import { getCookieUser } from "../../config/cookies/cookie_config";

export const ProfilProvider = async () => {
  const cookieUser = await getCookieUser();

  console.log("cookieUser: ", cookieUser);
  console.log("cookieUser ID: ", cookieUser.id);

  if (cookieUser) {
    const mealplans = await getMealplans(cookieUser.id);

    const userData = await getUser(cookieUser.id);
    const user = userData.data;

    return {
      user,
      mealplans,
      hej: "test",
      bajs: "test",
    };
  } else {
    return false;
  }
};
