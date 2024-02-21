// WizardComponent.jsx
import useWizard from "../../Hooks/Wizard/useWizard.jsx"; // Uppdatera sökvägen enligt din struktur
import WizardContext from "../../../context/wizardContext.jsx"; // Uppdatera sökvägen enligt din struktur

export default function WizardComponent({ pages }) {
  const wizard = useWizard(pages);

  return (
    <WizardContext.Provider value={wizard}>
      <div className="">
        <div>{wizard.step}</div>
      </div>
    </WizardContext.Provider>
  );
}
