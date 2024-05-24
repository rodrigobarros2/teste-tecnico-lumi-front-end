import React, { createContext, ReactNode, useContext, useState } from "react";
import { fetchUser } from "../modules/users";

type SelectProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  handleGetUsers: () => void;
};

const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
  handleGetUsers: () => {},
});

export function MailingProvider({ children }: SelectProviderProps) {
  const [users, setUsers] = useState<string[]>([]);

  const handleGetUsers = async () => {
    const response = await fetchUser();
    setUsers(response);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        handleGetUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData(): UserContextProps {
  const context = useContext(UserContext);
  return context;
}
