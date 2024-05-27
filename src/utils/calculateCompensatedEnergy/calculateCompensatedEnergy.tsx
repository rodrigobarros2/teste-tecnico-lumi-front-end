import { IUser } from "../../modules/users";

export function calculateCompensatedEnergyKWh(dataApi: IUser[]): number[] {
  return dataApi.map((entry) => {
    return parseFloat((entry.compensatedEnergy.find((e) => e.quantity)?.quantity ?? "0").replace(".", ""));
  });
}
