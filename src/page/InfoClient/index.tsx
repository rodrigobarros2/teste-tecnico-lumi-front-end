import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";

export const InfoClient: React.FC = () => {
  const { users, numberClient, userSelected } = useUserData();

  const handleBaixarFaturaDesseMes = () => {
    console.log("to aqui");
  };

  return (
    <div>
      <h1>InfoClient</h1>
      <Link to="/">Home</Link>

      <h1>usuário</h1>
      <h1>{numberClient}</h1>

      {userSelected.map((v, i) => (
        <div key={i}>
          <h1 onClick={() => handleBaixarFaturaDesseMes()}>{v.referenceMonth}</h1>
        </div>
      ))}

      <button onClick={() => console.log("🚀 ~ users:", users)}>BOTÃO</button>
    </div>
  );
};
