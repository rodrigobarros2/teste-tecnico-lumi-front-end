import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";
import { IUser, getPdfDownload } from "../../modules/users";

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
    <div>
      <h1>InfoClient</h1>
      <Link to="/">Home</Link>

      <br />

      <h1>usuário</h1>
      <h1>{numberClient}</h1>

      {userSelected.map((value, index) => (
        <div key={index} className="flex">
          <h1 className="p-8 cursor-pointer border border-red-950 border-solid">{value.referenceMonth}</h1>

          <button onClick={() => handleDownloadPdf(value)}>Download</button>
        </div>
      ))}
    </div>
  );
};
