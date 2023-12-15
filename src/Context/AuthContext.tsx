import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext: any = createContext(null);

export default function AuthContextProvider(props: any) {

    const BaseUrl = `http://upskilling-egypt.com:3003/api/v1`
    const [userData, setUserData] = useState();
    let requestHeaders = {
        Authorization: `Bearer ${localStorage.getItem('userTkn')}`
    }

    function saveUserData() {
        let encodedData: any = localStorage.getItem("userTkn");
        let decodedData: any = jwtDecode(encodedData);
        setUserData(decodedData);
    };
    useEffect(() => {
        if (localStorage.getItem("userTkn")) {
            saveUserData();
        }
    }, []);



    return <AuthContext.Provider value={{
        BaseUrl,
        userData,
        saveUserData,
        requestHeaders
    }}>
        {props.children}
    </AuthContext.Provider>
}