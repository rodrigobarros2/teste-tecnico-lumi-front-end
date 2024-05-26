import { AxiosError } from "axios";
import { backendClient } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

interface ElectricityData {
  quantity: string;
  price: string;
  value: string;
  tariff: string;
}

interface Document {
  id: string;
  fileName: string;
  filePath: string;
  createdAt: string;
  userId: string;
}

export interface IUser {
  id: string;
  customerNumber: string;
  referenceMonth: string;
  electricity: ElectricityData[];
  injectedEnergy: ElectricityData[];
  compensatedEnergy: ElectricityData[];
  contributionPublicLighting: string;
  documents: Document[];
}

export const fetchUser = async (filter?: string) => {
  const { data } = await backendClient.get("/user", { params: { filter } });
  return data;
};

export const getPdfDownload = async (id: string) => {
  window.open(`${import.meta.env.VITE_REACT_API_URL}/download/${id}`);
};

export const extractPDF = async (pdfFile: File) => {
  const formData = new FormData();
  formData.append("file", pdfFile);

  try {
    const { data } = await backendClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("PDF cadastrado com sucesso!");
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 409) {
        toast.error("Usuário com mês de referência já cadastrado");
      } else if (error.response?.status === 400) {
        toast.error("Selecione um arquivo para enviar");
      } else {
        toast.error("Ocorreu um erro. Tente novamente mais tarde.");
      }
    } else {
      toast.error("Erro de rede ou servidor não disponível.");
    }

    throw error;
  }
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
