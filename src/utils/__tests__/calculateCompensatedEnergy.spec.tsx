import { IUser } from "../../modules/users";
import { calculateCompensatedEnergyKWh } from "../calculateCompensatedEnergy";

test("Should be calculates compensated energy correctly", () => {
  const dataApi: IUser[] = [
    {
      id: "37072010-0434-4d35-bc89-eaf459edcc87",
      customerNumber: "7005400387",
      referenceMonth: "NOV/2023",
      electricity: [{ quantity: "50", price: "0,95274072", value: "47,62", tariff: "0,74906000" }],
      injectedEnergy: [{ quantity: "625", price: "0,50827076", value: "317,65", tariff: "0,48733000" }],
      compensatedEnergy: [{ quantity: "625", price: "0,48733000", value: "-304,58", tariff: "0,48733000" }],
      contributionPublicLighting: "49,43",
      documents: [],
    },
  ];

  const expected = [625];

  expect(calculateCompensatedEnergyKWh(dataApi)).toEqual(expected);
});
