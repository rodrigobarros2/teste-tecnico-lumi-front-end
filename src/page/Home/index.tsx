import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { extractPDF, fetchUser, uploadPdf } from "../../modules/users";
import { useUserData } from "../../hook/useUserData";
import Graphic from "../../Components/Graphic";
import { Header } from "../../Components/Header";

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
    return users.filter((clientNumber) => clientNumber.includes(filterValue));
  };

  const filteredUsers = applyFilter();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 bg-gray-200 py-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border bg-white text-card-foreground shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Arquivo</h3>
              </div>
              <div className="p-6">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="picture"
                  >
                    Arquivo
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="fileInput"
                      type="file"
                      className="cursor-pointer flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                      {...register("file")}
                    />

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-10 border-green-900 border px-4 py-2"
                    >
                      Enviar PDF
                    </button>
                  </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="customer-number"
                  >
                    Filtrar por número do cliente
                  </label>

                  <input
                    type="text"
                    placeholder="Filtrar Nº do cliente"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                  <label className="text-sm font-medium " htmlFor="customer-numbers">
                    Lista de números de clientes
                  </label>

                  <div className="bg-gray-100 rounded-md p-4">
                    <ul className="space-y-3">
                      {filteredUsers.map((clientNumber, index) => (
                        <li
                          key={index}
                          className={`cursor-pointer flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                            clientNumber === numberClient
                              ? "bg-green-950 text-white"
                              : "bg-green-700 text-white hover:bg-green-950"
                          }`}
                          onClick={() => {
                            clientNumber === numberClient ? null : handleUserDataById(clientNumber);
                          }}
                        >
                          <p>Nº DO CLIENTE: {clientNumber}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="items-center p-6 flex justify-center">
                <Link to={`/user?filter=${numberClient}`}>
                  <button className="border-green-950 text-sm font-medium border border-input h-9 rounded-md px-3">
                    Ver informações dos clientes
                  </button>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Gráficos</h3>
                <div className="w-full">{userSelected.length > 0 && <Graphic dataApi={userSelected} />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
