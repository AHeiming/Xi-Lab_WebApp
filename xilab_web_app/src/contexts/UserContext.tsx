import React, { useContext } from "react";
import { createContext, useState } from "react";
import { Buffer } from "buffer";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export interface UserContextType {
  signedIn: boolean;
  token: string | null;
  logout(): void;
  login(
    username: string,
    password: string
  ): Promise<{ success: boolean; error: string }>;
}

interface UserContextProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserContextProps) {
  const API_URL = "http://localhost:8080";
  const [signedIn, setSignedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function login(username: string, password: string) {
    return await fetch(`${API_URL}/token/create`, {
      headers: {
        Authorization: `Basic ${Buffer.from(username + ":" + password).toString(
          "base64"
        )}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return { success: false, error: "Something went wrong" };
        }
      })
      .then((json) => {
        localStorage.setItem("token", json.token);
        setToken(json.token);
        setSignedIn(true);
        return { success: true, error: "" };
      })
      .catch((err) => {
        console.error(err);
        setToken("");
        setSignedIn(false);
        return { success: false, error: "Error occurred!" };
      });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setSignedIn(false);
  }

  return (
    <UserContext.Provider value={{ signedIn, token, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
