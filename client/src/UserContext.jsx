import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get("/api/auth/profile", {
        validateStatus: () => true,   // <-- THIS STOPS 401 FROM LOGGING
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
