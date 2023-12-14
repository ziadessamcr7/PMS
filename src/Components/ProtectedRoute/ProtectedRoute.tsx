import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({  children }) {
    let {userData}=useContext(AuthContext);
  
    if (userData && userData.userId ) {
      return children;
    } else {
      <Navigate to="/" />;
    }
  }
  