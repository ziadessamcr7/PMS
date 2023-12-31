import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children }: any) {
  // console.log(userData);

  if (localStorage.getItem('userTkn') !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
