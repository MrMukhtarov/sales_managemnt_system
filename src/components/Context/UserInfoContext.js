import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const UserContexts = createContext();

export const UserContext = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const values = {
    user,
    setUser,
  };

  return (
    <UserContexts.Provider value={values}>{children}</UserContexts.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContexts);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
