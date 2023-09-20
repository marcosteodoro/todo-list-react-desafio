import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Inicial from "./routes/Inicial.tsx";
import TarefasListadas from "./routes/TarefasListadas.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />,
  },
  {
    path: "completas",
    element: <TarefasListadas completas />,
  },
  {
    path: "incompletas",
    element: <TarefasListadas />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
