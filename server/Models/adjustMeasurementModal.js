export function adjustMeasurementModal(maesure) {
  let amount = 10; // mängden från API

  if (maesure.type.toLowerCase() == "cup") {
    if (amount !== 1 && amount !== 0.75 && amount !== 0.5 && amount !== 0.25) {
      const amountInOz = maesure.imperial.amount * 8;
    }
  }
}
