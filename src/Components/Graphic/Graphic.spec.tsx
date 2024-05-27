import { calculateCompensatedEnergyKWh } from "../../utils/calculateCompensatedEnergy";

test("calculates compensated energy correctly", () => {
  const dataApi = [
    {
      compensatedEnergy: [{ quantity: "1.000" }],
    },
    {
      compensatedEnergy: [{ quantity: "2.500" }],
    },
    {
      compensatedEnergy: [{ quantity: null }],
    },
    {
      compensatedEnergy: [{ quantity: "3.300" }],
    },
    {
      compensatedEnergy: [],
    },
  ];

  const expected = [1000, 2500, 0, 3300, 0];

  expect(calculateCompensatedEnergyKWh(dataApi)).toEqual(expected);
});
