import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicial from './routes/Inicial.tsx';
import ListaFocada from './routes/ListaFocada.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />
  },
  {
    path: "completas",
    element: <ListaFocada titulo='Completas' completa={true} />
  },
  {
    path: "incompletas",
    element: <ListaFocada titulo='Incompletas' completa={false} />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
