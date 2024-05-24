import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { extractPDF, fetchUser } from "../../modules/users";
import Grafico from "../../Components/Grafico";
import { useUserData } from "../../hook/useUserData";

type FormValues = {
  file: FileList;
  filter: string;
};

export const Home = () => {
  const { register, handleSubmit /* setValue, watch, getValues */ } = useForm<FormValues>();
  const { users, setUsers, handleUserDataById, userSelected, numberClient } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUser();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [setUsers]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await extractPDF(data.file[0]);
      handleUserDataById(response.customerNumber);
      console.log("Upload bem-sucedido:", response);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <div className="w-1/3">
          <div>
            <input type="file" {...register("file")} />
            <br />
            <hr />
            <br />
            <button type="submit">Enviar PDF</button>
            <br />
            <hr />
            <br />
          </div>

          <input type="text" placeholder="Nº DO CLIENTE" {...register("filter")} />

          <br />
          <hr />
          <br />

          <div>
            <h2>Users</h2>

            <ul>
              {users.map((user, i) => (
                <li key={i} className="cursor-pointer" onClick={() => handleUserDataById(user)}>
                  <p>Nº DO CLIENTE: {user}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border border-solid border-red-500">
            <Link to={`/user?filter=${numberClient}`}>Info Client</Link>
          </div>
        </div>
        <div className="w-full">{userSelected.length > 0 && <Grafico dataApi={userSelected} />}</div>
      </div>
    </form>
  );
};
