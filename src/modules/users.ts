import { backendClient } from "../services/api";

interface IUser {}

export const fetchUser = async (): Promise<IUser[]> => {
  const { data } = await backendClient.get("/user");
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
