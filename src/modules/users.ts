import { backendClient } from "../services/api";

interface ElectricityData {
  quantity: string;
  price: string;
  value: string;
  tariff: string;
}

export interface IUser {
  id: string;
  customerNumber: string;
  referenceMonth: string;
  electricity: ElectricityData[];
  injectedEnergy: ElectricityData[];
  compensatedEnergy: ElectricityData[];
  contributionPublicLighting: string;
}

export const fetchUser = async (): Promise<string[]> => {
  const { data } = await backendClient.get("/user");
  return data;
};

export const getUserData = async (id: string): Promise<IUser[]> => {
  const { data } = await backendClient.get(`/user/${id}`);
  return data;
};

export const extractPDF = async (pdfFile: File) => {
  const formData = new FormData();
  formData.append("file", pdfFile);
  const { data } = await backendClient.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};