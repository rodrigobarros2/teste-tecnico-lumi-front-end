export function calculateCompensatedEnergyKWh(dataApi) {
  return dataApi.map((entry) => {
    return parseFloat((entry.compensatedEnergy.find((e) => e.quantity)?.quantity ?? "0").replace(".", ""));
  });
}
