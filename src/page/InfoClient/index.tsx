import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";
import { IUser, getPdfDownload } from "../../modules/users";
import { Header } from "../../Components/Header";

export const InfoClient: React.FC = () => {
  const { numberClient, userSelected, handleUserDataById } = useUserData();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("filter");

  useEffect(() => {
    handleUserDataById(query ?? "");
  }, []);

  const handleDownloadPdf = async (userData: IUser) => {
    const fileNames = userData.documents[0].id;
    getPdfDownload(fileNames);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-200 py-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-lg border text-card-foreground shadow-sm bg-white">
            <div className="flex flex-col space-y-1.5 p-6 ">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none">Número do Cliente</h3>
            </div>
            <div className="p-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <div className="bg-white rounded-md p-4">
                  <div className="space-y-1">
                    <div className="bg-green-950 text-white font-bold rounded-md p-4">
                      <div className="space-y-1">
                        <h1>Nº DO CLIENTE: {numberClient}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="items-center p-6 flex justify-center">
              <Link to="/">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border-2 border-input h-10 rounded-md px-3 border-green-950">
                  Voltar ao menu
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 col-span-0">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Boletos</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {userSelected.map((value, index) => (
                  <div key={value.id} className="bg-gray-100 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{value.referenceMonth}</div>
                      </div>
                      <div key={index} className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownloadPdf(value)}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium border border-input h-9 rounded-md px-3"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
