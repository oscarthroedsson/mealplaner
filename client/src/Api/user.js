export const registerUser = async (userData) => {
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
