import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import AuthContextProvider from './Context/AuthContext.tsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<ToastContainer/>
<AuthContextProvider>
    <App />
</AuthContextProvider>

  </React.StrictMode>
)