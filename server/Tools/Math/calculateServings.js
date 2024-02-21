export function calculateServings(amount, servings) {


    //check if servning is number and one, if so, no need for anything
  if (servings === 1) {
    return amount;
  }

  // check if serving is a number in a string format with out any letters and higher then 1. 
  if(!isNaN(Number(amount))){
    if(Number(amount) > 1){
        return Math.round(Number(amount / servings)) // 
    } else{
        return amount
    }
  }

  const splitted = amount.split()

  for(const i = 0; i < splitted.length; i++){
    if(splitted[i])
  }
}
