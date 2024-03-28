/*
This file configurate the cookie config
*/
import Cookies from "js-cookie";

export const storeCookieUser = async (userData) => {
  Cookies.set("user", JSON.stringify(userData), { expires: 730 });
};

/*
Updates the userCookie
Updated userdata from server should be sent in
*/
export const updateCookieUser = async () => {};

/*
Delete cookieuser, should be called if user is deleted from databases
*/
export const deleteCookieUser = async () => {};

/**
 * Get user Cookie
 */
export const getCookieUser = async () => {
  const userCookie = await Cookies.get("user");
  console.log("userCookie: ", userCookie);

  if (userCookie) {
    const user = await JSON.parse(userCookie);
    return user;
  } else {
    return false;
  }
};

/**
 * Look if user exist and if so, returns user
 */
export const doesCookieUser = async () => {
  const doesUserExist = await getCookieUser();
  console.log("doesCookieUser: ", doesCookieUser);
  if (doesUserExist) {
    return doesUserExist;
  } else {
    return false;
  }
};
