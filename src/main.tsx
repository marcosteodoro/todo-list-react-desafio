import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicial from './routes/Inicial.tsx';
import StatusTarefa from './routes/StatusTarefa.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />
  },
  {
    path: "completas",
    element: <StatusTarefa titulo='Completas' completa= {true} />
  },
  {
    path: "incompletas",
    element: <StatusTarefa titulo='Incompletas' completa= {false} />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
