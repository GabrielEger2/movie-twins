// Import React and related modules
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";

// Import the components used in the router
import App from "./App";
import Home from "./routes/Home";
import Movie from "./routes/Movie";
import Search from "./routes/Search";
import PageNotFound from "./routes/PageNotFound";

// Import CSS file
import "./index.css";

// Define the routes using the createBrowserRouter method
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // The App component is the top-level element for the root path
    children: [
      { path: "/", element: <Home /> }, // The Home component is displayed at the root path
      { path: "/movie/:id", element: <Movie /> }, // The Movie component is displayed when the path matches "/movie/:id"
      { path: "/search", element: <Search /> }, // The Search component is displayed when the path matches "/search"
      { path: "*", element: <PageNotFound /> } // The PageNotFound component is displayed when no other routes match
    ]
  },
]);

// Render the app using ReactDOM
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* The RouterProvider provides the router to the app */}
  </React.StrictMode>,
  document.getElementById("root")
);