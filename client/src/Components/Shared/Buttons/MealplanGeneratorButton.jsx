import PrimButton from "./PrimeButton";

export function MealplanGeneratorButton() {
  /*
   todo 
   skapa state för att hålla koll på om userDetailsDialogOpen är true eller false
    */

  /*
   todo 
   const userHasDetails (variabel som kollar om användren redan har konto  osv)
    */

  function handleClick() {
    /*
   todo
   if (userHasDetails)
    -> anropa generateMealPlan (beroende på hur den är byggd får du kanske hämta ut datan från local storage och skicka in som parametrar)
    -> när klar redirecta till /mealplan
    else  
     -> setUserDetailsDialogOpen(true)
    */
  }

  return (
    <>
      <PrimButton onClick={handleClick} />
      {/* userDetailsDialogOpen && (<UserDetailsDialog onClose={() => setUserDetailsDialogOpen(false)} />) */}
    </>
  );
}

const UserDetailsDialog = ({ onClose }) => {
  /*
   todo 
   useEffect som skapar en tom användare och sparar i local storage
   state för currentStep, setCurrentStep = useState(1)

    Skapa själva formuläret i html (ska man aktivt trycka på en sparaknapp eller uppdateras local storage för varje val som görs?)
    if (currentStep === 1)
    html för aktivitetformulär
    om användaren klickar på choose meal preference sätt currentStep(2)
    

    if (currentStep === 2)
    html för meal preference formulär
    */
};
