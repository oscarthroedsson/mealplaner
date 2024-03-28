export const registerUser = async (userData) => {
  console.log("registerUser | userData: ", userData);
  const response = await fetch(`http://localhost:3000/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ange innehållstypen till JSON
    },
    body: JSON.stringify(userData),
  });
  const user = await response.json();

  return user;
};

export const getUser = async (userId, includeFoodPref = true) => {
  const response = await fetch(`http://localhost:3000/user/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Ange innehållstypen till JSON
    },
    body: JSON.stringify({ userId, includeFoodPref }),
  });

  const userProfile = await response.json();
  return userProfile;
};
