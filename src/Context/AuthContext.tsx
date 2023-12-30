/** @format */

import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  IAuthContextValue,
  IAuthContextProviderProps,
} from "../interface/authInterFace";

export const AuthContext = createContext<IAuthContextValue | null>(null);

const BaseUrl = `http://upskilling-egypt.com:3003/api/v1`;
const requestHeaders: Record<string, string> = {
  Authorization: `Bearer ${localStorage.getItem("userTkn") || ""}`,
};

export default function AuthContextProvider(props: IAuthContextProviderProps) {
  const [userData, setUserData] = useState<string | undefined>();
  const [userRoll, setUserRoll] = useState<string | undefined>();

  const saveUserData = useCallback(() => {
    const encodedData: any = localStorage.getItem("userTkn");
    const decodedData: any = jwtDecode(encodedData);
    setUserData(decodedData);
    setUserRoll(decodedData?.userGroup);
  }, []);
  console.log(userRoll);

  useEffect(() => {
    if (localStorage.getItem("userTkn")) {
      saveUserData();
    }
  }, []);
  const contextValue = useMemo(() => {
    return {
      BaseUrl,
      userData,
      saveUserData,
      requestHeaders,
      userRoll,
    };
  }, [BaseUrl, userData, saveUserData, requestHeaders, userRoll]);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}
