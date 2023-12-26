/** @format */

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import {
  IAuthContextValue,
  IAuthContextProviderProps,
} from "../interface/authInterFace";

export const AuthContext = createContext<IAuthContextValue | null>(null);

export default function AuthContextProvider(props: IAuthContextProviderProps) {
  const BaseUrl = `http://upskilling-egypt.com:3003/api/v1`;
  const [userData, setUserData] = useState<string | undefined>();
  const [userRoll, setUserRoll] = useState<string | undefined>();
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("userTkn")}`,
  };
  function saveUserData() {
    const encodedData: any = localStorage.getItem("userTkn");
    const decodedData: any = jwtDecode(encodedData);
    setUserData(decodedData);
    setUserRoll(userData?.userGroup);
  }
  useEffect(() => {
    if (localStorage.getItem("userTkn")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        BaseUrl,
        userData,
        saveUserData,
        requestHeaders,
        userRoll,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
