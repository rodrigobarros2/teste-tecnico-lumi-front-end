import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { fetchUser, IUser } from "../modules/users";

type SelectProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  userSelected: IUser[];
  setUserSelected: Dispatch<SetStateAction<IUser[]>>;
  handleGetUsers: () => void;
  handleUserDataById: (user: string) => Promise<void>;
  numberClient: string;
  setNumberClient: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
  handleGetUsers: () => {},
  userSelected: [],
  setUserSelected: () => {},
  handleUserDataById: async () => {},
  numberClient: "",
  setNumberClient: () => {},
});

export function MailingProvider({ children }: SelectProviderProps) {
  const [users, setUsers] = useState<string[]>([]);
  const [userSelected, setUserSelected] = useState<IUser[]>([]);
  const [numberClient, setNumberClient] = useState("");

  const handleGetUsers = async () => {
    const response = await fetchUser();
    setUsers(response);
  };

  const handleUserDataById = async (user: string) => {
    try {
      const response = await fetchUser(user);
      setNumberClient(user);
      setUserSelected(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        handleGetUsers,
        userSelected,
        numberClient,
        setNumberClient,
        setUserSelected,
        handleUserDataById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = (): UserContextProps => {
  const context = useContext(UserContext);
  return context;
};
