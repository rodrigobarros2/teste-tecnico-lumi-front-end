import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

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

const Grafico = ({ dataApi }: any) => {
  const mesDoBoleto = dataApi.map((entry) => entry.referenceMonth);
  const labels = mesDoBoleto;

  const compensatedEnergyKWh = dataApi.map((entry) =>
    entry.compensatedEnergy.find((e) => e.quantity).quantity.replace(".", "")
  );

  const electricityConsumption = dataApi.map((entry) => {
    const electricityQuantity = parseInt(entry.electricity.find((e) => e.quantity).quantity.replace(".", ""));
    const injectedEnergyQuantity = parseInt(entry.injectedEnergy.find((e) => e.quantity).quantity.replace(".", ""));
    return electricityQuantity + injectedEnergyQuantity;
  });

  const dataKwh = {
    labels,
    datasets: [
      {
        label: "Consumo de Energia Elétrica",
        data: electricityConsumption,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Energia Compensada",
        data: compensatedEnergyKWh,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataMonetaryValues = {
    labels,
    datasets: [
      {
        label: "Valor Total sem GD",
        data: electricityConsumption,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Economia GD",
        data: compensatedEnergyKWh,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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

export default Grafico;
