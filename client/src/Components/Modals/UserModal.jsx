//COMPONENTS
import Modal from "../../Components/Modals/modal";
import Wizard from "../Shared/Wizard-Component/WizardComponant.jsx";
import ProfileForm from "../Modals/ProfileModal";
import FoodPrefrenceModal from "../Modals/FoodPreferenceModal";

export default function UserModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <Wizard
        pages={[<ProfileForm key={1} />, <FoodPrefrenceModal key={2} />]}
      />
    </Modal>
  );
}
