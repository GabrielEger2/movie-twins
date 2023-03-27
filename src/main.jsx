import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Movie from "./routes/Movie";
import Search from "./routes/Search";

import "./index.css";

const router = createBrowserRouter([
    { path: "/",
     element: <App />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/movie/:id", element: <Movie /> },
        { path: "/search", element: <Search /> },
    ]
 },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);