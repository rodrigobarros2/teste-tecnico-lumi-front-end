import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { IUser } from "../../modules/users";
import { compareDatesChronologically } from "../../utils/compareDatesChronologically";
import { calculateCompensatedEnergyKWh } from "../../utils/calculateCompensatedEnergy";

interface GraphicProps {
  dataApi: IUser[];
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const optionsKwh = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Energia KWH",
    },
  },
};

const optionsMonetaryValues = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Valores Monetários",
    },
  },
};

const Graphic: React.FC<GraphicProps> = ({ dataApi }) => {
  const ticketMonth = dataApi.map((entry) => entry.referenceMonth);
  const labels = ticketMonth.sort(compareDatesChronologically);

  const compensatedEnergyKWh = calculateCompensatedEnergyKWh(dataApi);

  const electricityConsumption = dataApi.map((entry) => {
    const electricityQuantityString = entry.electricity.find((e) => e.quantity)?.quantity;
    const injectedEnergyQuantityString = entry.injectedEnergy.find((e) => e.quantity)?.quantity;

    const electricityQuantity = electricityQuantityString ? parseInt(electricityQuantityString.replace(".", "")) : 0;
    const injectedEnergyQuantity = injectedEnergyQuantityString
      ? parseInt(injectedEnergyQuantityString.replace(".", ""))
      : 0;

    return electricityQuantity + injectedEnergyQuantity;
  });

  const valueTotalWithoutGD = dataApi.map((entry) => {
    const electricityValueString = entry.electricity.find((e) => e.value)?.value;
    const electricityValue = electricityValueString ? parseFloat(electricityValueString.replace(",", ".")) : 0;

    const injectedEnergyValueString = entry.injectedEnergy.find((e) => e.value)?.value;
    const injectedEnergyValue = injectedEnergyValueString ? parseFloat(injectedEnergyValueString.replace(",", ".")) : 0;

    const contributionPublicLightingValue = parseFloat(entry.contributionPublicLighting.replace(",", "."));

    return electricityValue + injectedEnergyValue + contributionPublicLightingValue;
  });

  const compensatedEnergyValues = dataApi.map((entry) => {
    return parseFloat((entry.compensatedEnergy.find((e) => e.value)?.value ?? "0").replace(",", "."));
  });

  const dataKwh = {
    labels,
    datasets: [
      {
        label: "Consumo de Energia Elétrica",
        data: electricityConsumption,
        backgroundColor: "#00FE88",
      },
      {
        label: "Energia Compensada",
        data: compensatedEnergyKWh,
        backgroundColor: "#02231C",
      },
    ],
  };

  const dataMonetaryValues = {
    labels,
    datasets: [
      {
        label: "Valor Total sem GD",
        data: valueTotalWithoutGD,
        backgroundColor: "#00FE88",
      },
      {
        label: "Economia GD",
        data: compensatedEnergyValues,
        backgroundColor: "#02231C",
      },
    ],
  };

  return (
    <div>
      <Bar options={optionsKwh} data={dataKwh} />
      <Bar options={optionsMonetaryValues} data={dataMonetaryValues} />
    </div>
  );
};

export default Graphic;
