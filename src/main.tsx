import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicial from './routes/Inicial.tsx';
import ListaTarefas from "./routes/Tarefas.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />
  },
  {
    path: "completas",
    element: <ListaTarefas mostrarCompletas={true} />
  },
  {
    path: "incompletas",
    element: <ListaTarefas mostrarCompletas={false} />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
