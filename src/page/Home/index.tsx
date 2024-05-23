import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { extractPDF, fetchUser } from "../../modules/users";
import { IUser } from "../../modules/users";
import Grafico from "../../Components/Grafico";

type FormValues = {
  file: FileList;
  filter: string;
};

export const Home = () => {
  const { register, handleSubmit /* setValue, watch, getValues */ } = useForm<FormValues>();

  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const [valoresFormatados, setValoresFormatados] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchUser();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = users.filter((user) => user.customerNumber.toLowerCase().includes(value));
    setFilteredUsers(filtered);
  };

  const handleFormatandoParaValoresPedidos = () => {
    /* 
    //1 grafico
    Consumo de Energia Elétrica kWh  //electricity + injectedEnergy
    Energia Compensada kWh          //compensatedEnergy
    */
    /* 
    //2 grafico
    Valor Total sem GD R$  // electricity +  injectedEnergy  +  contributionPublicLighting
    Economia GD R$        //compensatedEnergy
    */
  };

  /* 
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
*/

  handleFormatandoParaValoresPedidos();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await extractPDF(data.file[0]);
      console.log("Upload bem-sucedido:", response.data);
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

          <input
            type="text"
            placeholder="Nº DO CLIENTE"
            {...register("filter")} // Registrar o campo de filtro
            onChange={handleFilterChange} // Adicionar o manipulador de eventos onChange para filtrar usuários
          />

          <br />
          <hr />
          <br />

          <div>
            <h2>Users</h2>

            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  <p>customerNumber: {user.customerNumber}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 border border-solid border-red-500">
            <Link to="/user">Info Client</Link>
          </div>
        </div>

        <div className="w-full">
          <Grafico dataApi={users} />
        </div>
      </div>
    </form>
  );
};
