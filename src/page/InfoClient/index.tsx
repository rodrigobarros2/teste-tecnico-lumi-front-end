import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";

export const InfoClient: React.FC = () => {
  const { users, numberClient, userSelected, handleUserDataById } = useUserData();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("filter");

  useEffect(() => {
    handleUserDataById(query ?? "");
  }, [handleUserDataById, query]);

  return (
    <div>
      <h1>InfoClient</h1>
      <Link to="/">Home</Link>

      <h1>usuário</h1>
      <h1>{numberClient}</h1>

      {userSelected.map((v, i) => (
        <div key={i}>
          <h1>{v.referenceMonth}</h1>
        </div>
      ))}

      <button onClick={() => console.log("🚀 ~ users:", users)}>BOTÃO</button>
    </div>
  );
};
