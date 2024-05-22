import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { extractPDF, fetchUser } from "../../modules/users";

type FormValues = {
  file: FileList;
};

export const Home: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    /* fetchUser(); */
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data.file[0]);

    try {
      const response = await extractPDF(data.file[0]);
      console.log("Upload bem-sucedido:", response.data);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file")} />
      <button type="submit">Enviar PDF</button>
      <Link to="/user">Info Client</Link>
    </form>
  );
};
