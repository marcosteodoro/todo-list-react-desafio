import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicial from './routes/Inicial.tsx';
import Completas from './routes/Completas.tsx';
import Incompletas from './routes/Incompletas.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />
  },
  {
    path: "completas",
    element: <Completas />
  },
  {
    path: "incompletas",
    element: <Incompletas />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
