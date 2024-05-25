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

export const fetchUser = async (filter?: string) => {
  const { data } = await backendClient.get("/user", { params: { filter } });
  return data;
};

export const getPdfDownload = async (id: string) => {
  window.open(`${import.meta.env.VITE_REACT_API_URL}/download/${id}`, "_blank");
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

export const uploadPdf = async (pdfFile: File, id: string) => {
  const formData = new FormData();
  formData.append("file", pdfFile);
  const { data } = await backendClient.post(`/uploadpdf/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
