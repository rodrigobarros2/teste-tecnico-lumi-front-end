import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { extractPDF, fetchUser, uploadPdf } from "../../modules/users";
import Grafico from "../../Components/Grafico";
import { useUserData } from "../../hook/useUserData";

type FormValues = {
  file: FileList;
  filter: string;
};

export const Home = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { users, setUsers, handleUserDataById, userSelected, numberClient, handleGetUsers } = useUserData();

  const [filterValue, setFilterValue] = useState<string>("");

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
      const responseExtractPdf = await extractPDF(data.file[0]);
      uploadPdf(data.file[0], responseExtractPdf.id);
      handleUserDataById(responseExtractPdf.customerNumber);
      handleGetUsers();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  const applyFilter = () => {
    if (!filterValue) {
      return users;
    }
    return users.filter((user) => user.includes(filterValue));
  };

  const filteredUsers = applyFilter();

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

          <input
            type="text"
            placeholder="Filtrar users"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />

          <br />
          <hr />
          <br />

          <div>
            <h2>Users</h2>

            <ul>
              {filteredUsers.map((user, i) => (
                <li
                  key={i}
                  className="cursor-pointer"
                  onClick={() => {
                    user === numberClient ? null : handleUserDataById(user);
                  }}
                >
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
