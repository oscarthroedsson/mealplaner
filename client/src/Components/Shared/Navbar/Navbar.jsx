// import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="flex flex-col place-content-center bg-one shadow-lg shadow-slate-100">
      <nav className="max-w-7xl min-h-28 px-4 pt-8 pb-4 flex justify-between items-center md:m-auto md:w-full">
        <img src="/logo/healthyLogo.svg" alt="Logo of mealplaner" />

        <span className="md:hidden">
          <MenuIcon
            onClick={() => {
              setMenuVisible(!menuVisible);
            }}
          />
        </span>

        <ul className="px-4 py-8 space-y-2 hidden md:flex md:space-y-0 md:space-x-6">
          <li className="hover:underline hover:underline-offset-8 hover:decoration-green-500 hover:border-b-10">
            <a href="/mealplans">Meal Plans</a>
          </li>
          <li className="hover:underline hover:underline-offset-8 hover:decoration-green-500 hover:border-b-10">
            <a href="#">Recipes</a>
          </li>
          <li className="hover:underline hover:underline-offset-8 hover:decoration-green-500 hover:border-b-10">
            <a href="#">About us</a>
          </li>
        </ul>
      </nav>

      {menuVisible && (
        <ul className="px-4 py-8 bg-one space-y-2 shadow-lg shadow-slate-100">
          <li className="hover:underline hover:underline-offset-8 hover:decoration-green-500 hover:border-b-10">
            <a href="#">Meal Plans</a>
          </li>
          <li className="hover:underline hover:underline-offset-8 hover:decoration-green-500 hover:border-b-10">
            <a href="#">Recipes</a>
          </li>
          <li className="hover:underline hover:underline-offset-8 hover:decoration-green-500 hover:border-b-10">
            <a href="#">About us</a>
          </li>
        </ul>
      )}
    </div>
  );
}
