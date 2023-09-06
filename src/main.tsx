import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./components/ErrorPage.tsx";
import History from "./components/History/History.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Community from "./components/Community/Community.tsx";
import Home from "./components/Home/Home.tsx";
import MyPage from "./components/MyPage/MyPage.tsx";
import Mint from "./components/MyPage/Mint/Mint.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "history", element: <History /> },
      { path: "community", element: <Community /> },
      { path: "mint", element: <Mint /> },
      { path: "mypage", element: <MyPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
