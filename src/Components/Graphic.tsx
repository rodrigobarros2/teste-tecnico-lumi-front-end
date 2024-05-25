import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { IUser } from "../modules/users";

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

  function compareDatesChronologically(a: string, b: string): number {
    const [monthA, yearA] = a.split("/");
    const [monthB, yearB] = b.split("/");

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    const months: Record<string, number> = {
      JAN: 0,
      FEV: 1,
      MAR: 2,
      ABR: 3,
      MAI: 4,
      JUN: 5,
      JUL: 6,
      AGO: 7,
      SET: 8,
      OUT: 9,
      NOV: 10,
      DEZ: 11,
    };

    return months[monthA] - months[monthB];
  }

  const labels = ticketMonth.sort(compareDatesChronologically);

  const compensatedEnergyKWh = dataApi.map((entry) => {
    return parseFloat((entry.compensatedEnergy.find((e) => e.quantity)?.quantity ?? "0").replace(".", ""));
  });

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
