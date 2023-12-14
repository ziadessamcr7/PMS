import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext=createContext(null);

export default function AuthContextProvider(props:any){

    const url =`http://upskilling-egypt.com:3003/api/v1/`
    const [userData, setUserData] = useState();

    function saveUserData(){
        let encodedData =localStorage.getItem("userTkn");
        let decodedData =jwtDecode(encodedData);
        setUserData(decodedData);
    };
    useEffect(() => {
        if (localStorage.getItem("userTkn")) {
            saveUserData();
        }
    }, []);
    


    return <AuthContext.Provider value={{url,userData,saveUserData}}> 
    {props.children}
     </AuthContext.Provider>
}