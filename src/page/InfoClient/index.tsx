import React from "react";
import { Link } from "react-router-dom";
import { useUserData } from "../../hook/useUserData";

export const InfoClient: React.FC = () => {
  const { users, numberClient } = useUserData();

  return (
    <div>
      <h1>InfoClient</h1>
      <Link to="/">Home</Link>

      <h1>usuário</h1>
      <h1>{numberClient}</h1>

      <button onClick={() => console.log("🚀 ~ users:", users)}>BOTÃO</button>
    </div>
  );
};
