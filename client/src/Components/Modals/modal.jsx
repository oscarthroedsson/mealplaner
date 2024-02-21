import { createPortal } from "react-dom";

/*
.h Build
Modal is built for taking in components that we want to show as a pop-up.

You useit by putting the component that we want to show inside by containing it with Modal element

<Modal>
>Component/>
</Modal>
*/

//ICONS
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

export default function Modal({ children, onClose }) {
  //createportal ska vara här
  return createPortal(
    <div className="absolute h-full w-full inset-0 bg-slate-50 bg-opacity-50 backdrop-blur-sm flex justify-center items-center ">
      <div className=" h-full md:max-h-[90%] xl:max-h-[80%] overflow-x-scroll rounded-md shadow-xl shadow-slate-200 bg-one p-6">
        <nav className="text-end">
          <button onClick={onClose}>
            <DisabledByDefaultRoundedIcon className="lg:text-2xl" />
          </button>
        </nav>
        {children}
      </div>
    </div>,
    document.body
  );
}
