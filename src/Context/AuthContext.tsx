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

export default function AuthContextProvider(props: any) {

  const BaseUrl = `http://upskilling-egypt.com:3003/api/v1`
  const [userData, setUserData] = useState();
  const [userRole, setUserRole] = useState();
  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem('userTkn')}`
  }

  function saveUserData() {
    let encodedData: any = localStorage.getItem("userTkn");
    let decodedData: any = jwtDecode(encodedData);
    setUserData(decodedData);
    setUserRole(decodedData.userGroup)
    console.log(decodedData.userGroup);

  };
  useEffect(() => {
    if (localStorage.getItem("userTkn")) {
      saveUserData();
    }
  }, []);



  return (<AuthContext.Provider value={{
    BaseUrl,
    userData,
    saveUserData,
    requestHeaders,
    userRole
  }}>
    {props.children}
  </AuthContext.Provider>
  );
}
